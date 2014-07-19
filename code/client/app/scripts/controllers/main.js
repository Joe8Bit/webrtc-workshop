'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $timeout, SimpleWebRTCSrv) {

    // Set a default room for people to join, can be overridden in the UI
  	$scope.room = 'JsChannelConf';

    // Set out connected state to false
  	$scope.connected = false;

    // Set participant volume
    $scope.volume = 0.8;

    // Initialise our SimpleWebRTC service
    SimpleWebRTCSrv.init(function (rtc) {

        // Set the connected state to true, to show the room selection UI
    	$scope.connected = true;

        // We're updating the $scope in an async function, so make sure we update our view
    	$scope.$digest();

        // Add an event handler for the joinedRoom event and set the currentRoom value so we can have a nice title in the UI
    	rtc.on('joinedRoom', function (room) {
	    	$scope.currentRoom = room;
	    	$scope.$digest();
	    });

        // Handle the leftRoom event so we can show the successful room leaving message and rejoin
	    rtc.on('leftRoom', function (room) {
	    	$scope.exRoom = room;
	    });

        // Handle the videoAdded event so we can show a message when a new user has joined the room
	    rtc.on('videoAdded', function () {
	    	$scope.newUser = true;
	    	$scope.$digest();

            // Only show the message for 5 seconds, then hide it
	    	$timeout(function () {
	    		$scope.newUser = false;
	    		$scope.$digest();
	    	}, 5000);
	    });

	    // Debugging, log all of the events emitted to the console
	    rtc.on('*', function (e) {
            // Don't log colume change as it logs constantly on audio speech events
	    	if (e !== 'volumeChange') {
	    		console.log(arguments);
	    	}
	    });
    });

    // The joinRoom scope method takes an optonal room as an argmument, else if grabs it from the input box and calls the SimpleWebRTCSrv to join the current peer to the requested room
    $scope.joinRoom = function (room) {
    	SimpleWebRTCSrv.joinRoom(room || $scope.room);
        // Toggle the state of the joinedRoom value
    	$scope.joinedRoom = !$scope.joinedRoom;
        $scope.exRoom = false;
    }

    // Leave the current room
    $scope.leaveRoom = function () {
    	SimpleWebRTCSrv.leaveRoom();
    	$scope.joinedRoom = !$scope.joinedRoom;
    }

    // Close all connections to the signalling server as well as any connected clients
    $scope.disconnect = function () {
    	SimpleWebRTCSrv.disconnect();
    	$scope.connected = false;
    	$scope.disconnected = true;
    }

    // Watch the value of the slider, and set the colume for all of the connected peers acdordingly
    $scope.$watch('volume', function () {
    	SimpleWebRTCSrv.volume($scope.volume);
    });

  });
