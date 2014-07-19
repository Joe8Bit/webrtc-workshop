'use strict';

/**
 * @ngdoc service
 * @name clientApp.SimpleWebRTC
 * @description
 * # SimpleWebRTC
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('SimpleWebRTCSrv', function SimpleWebRTCSrv () {
  	var rtc;

  	function init (cb) {
  		rtc = new SimpleWebRTC({
            url: 'http://jschannel-webrtc.herokuapp.com:80',
            // the id/element dom element that will hold "our" video
            localVideoEl: 'simplewebrtc-local',
            // the id/element dom element that will hold remote videos
            remoteVideosEl: 'simplewebrtc-remote',
            // immediately ask for camera access
            autoRequestMedia: true
        });
        // we have to wait until it's ready
        rtc.on('readyToCall', function () {
        	cb && cb(rtc);
        });
  	}

  	function joinRoom (room) {
  		return rtc.joinRoom(room);
  	}

  	function leaveRoom (room) {
  		return rtc.leaveRoom();
  	}

  	function disconnect (room) {
  		return rtc.disconnect();
  	}

  	function volume (volume) {
  		return rtc.setVolumeForAll(volume);
  	}
    
    return {
    	init: init,
    	joinRoom: joinRoom,
    	leaveRoom: leaveRoom,
    	disconnect: disconnect,
    	volume: volume
    };
  });
