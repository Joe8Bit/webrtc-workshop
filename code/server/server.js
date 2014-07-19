var port = 8888,
    io = require('socket.io').listen(port);

// Set the Socket.io log level to 3 e.g. show me everything
io.set('log level', 3);

// When a client connects...
io.sockets.on('connection', function (client) {

    // Default profile for room members, to allow connecting clients to bootstrap their connections with the correct listeners
    client.resources = {
        screen: false,
        video: true,
        audio: false
    };

    // Listen for events from the connect client
    client.on('message',    handleMessage);
    client.on('join',       join);
    client.on('disconnect', removeFeed);
    client.on('leave',      removeFeed);

    // The handleMessage event handler
    function handleMessage (details) {

        // If it's an empty message, don't process
        if (!details) return;

        // Check that the client you want to connect to exists, and has an open socket...
        if (io.sockets.sockets[details.to]) {
            // Else look in the message envelope for the recipient and create a reference to their socket
            var otherClient = io.sockets.sockets[details.to];

            // Make sure we include the sender in the message envelope
            details.from = client.id;

            // Emit the message to the recipient
            otherClient.emit('message', details);
        }
    }

    // The join event handler
    function join (name, ack) {
        // make sure we have a name defined, else socket.io will throw a fit...
        if (!name) return;

        // Remove the user from any currently connected rooms...
        removeFeed();

        // Join the specified room
        client.join(name);

        // Store a reference to the currently connected room on the socket
        client.room = name;

        // Send an acknowledegment containing the current state of the room...
        ack(null, describeRoom(name));
    }

    // A method to return the contents of a particular room...
    function describeRoom (name) {
        // Get an arrat of the all the connected clients in a room
        var clients = io.sockets.clients(name);

        // Construct and object, in the format SimpleWebRTC expects for a room description
        var result = {
            clients: {}
        };

        // Iterate over the clients...
        clients.forEach(function (client) {

            // ... and push our default profile
            result.clients[client.id] = client.resources;

        });

        // Return our results object to be ack'd back to the connected client
        return result;
    }

    // Remove a client from a room...
    function removeFeed () {

        // Make sure we know which room the client is currently connected to
        if (client.room) {

            // Emit a message to all the occupants that the peer is leaving the room
            io.sockets.in(client.room).emit('remove', {
                id: client.id,
            });

            // Remove the socket from the socket.io room
            client.leave(client.room);

            // Reset the room on the client socket
            client.room = undefined;
        }

    }

    // When a client connects, emit a list of STUN servers in case they're necessary
    client.emit('stunservers', [{
        url: 'stun:stun.l.google.com:19302'
    }]);
});

console.log('Signal master is running at: http://localhost:' + port);
