### WebRTC Workshop

An introduction to WebRTC and a workshop to implement a socket.io based signalling server and a simple AngularJS powered multi person video chat room.

####Running
To run the slides:

    cd slides
    python -m SimpleHTTPServer // or any static server you wish

To run the demos

    cd demos
    python -m SimpleHTTPServer // or any static server you wish
    
To run the code

	cd code/client
	npm install
	bower install
	grunt serve
	
	cd code/server
	npm install
	node server.js