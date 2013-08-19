'use strict';

angular.module('130810HackathonApp')
  .factory('click', function () {

    var clickSound = new Audio('./sounds/tone13.mp3');
    var clickSoundHead = new Audio('./sounds/tone14.mp3');    

    var timer;

    var needle;

    var click;

    function tempoToInterval (tempo) {
      var interval = 60 * 1000 / tempo;
      return interval;
    }

 
    // Public API here
    return {
      startClick : function (tempo, needleCanvas, clickCanvas, rhythm) {
      	if (!timer) {
      	  needle = needleCanvas;
          click = clickCanvas;

          var initAngle = Math.PI * (-1.0) / 6.0;
          var endAngle = Math.PI * (-5.0) / 6.0;
          var swing = Math.PI * (2.0) / 3.0;
          var animInterval = 10; // millisec

          var angle = initAngle;
          var dAngle = swing * tempo / 60.0 * (animInterval / 1000.0) ;
          var isLeftSwing = true;
          var needleLength = Math.max(needle.width, needle.height) * 0.5; // 100px?
          var beat = 1;

          var clickSound = new Audio('./sounds/tone13.mp3');
          var clickSoundHead = new Audio('./sounds/tone14.mp3'); 
          clickSound.preload = "auto";
          clickSoundHead.preload = "auto";

          timer = setInterval(function() {
            var ctxNeedle = needle.getContext('2d');
            var ctxClick = click.getContext('2d');

            var center_x = needle.width / 2;
            var center_y = needle.height;

            ctxNeedle.clearRect(0, 0, needle.width, needle.height);
            ctxNeedle.beginPath();
            ctxNeedle.lineWidth = 3;
            ctxNeedle.moveTo(center_x, center_y);
            ctxNeedle.lineTo(center_x + needleLength * Math.cos(angle), 
              center_y + needleLength * Math.sin(angle));
            ctxNeedle.stroke();

            ctxClick.clearRect(0, 0, click.width, click.height);
            ctxClick.beginPath();
            ctxClick.lineWidth = 2;
            ctxClick.strokeRect(click.width / 2 - Math.abs(needleLength * Math.cos(endAngle)), click.height * 0.42,
             needleLength * (Math.cos(initAngle) - Math.cos(endAngle)), click.height * 0.16);
            ctxClick.arc(center_x + needleLength * Math.cos(angle), 
              click.height / 2.0, click.height * 0.07, 0, Math.PI*2, true);
            ctxClick.fill();

            if (isLeftSwing) {
              angle -= dAngle;
            } else {
              angle += dAngle;
            }

            if ((isLeftSwing && angle <= endAngle) || (!isLeftSwing && angle >= initAngle)) {
              isLeftSwing = !isLeftSwing;

              if (beat % rhythm == 0) {
                clickSoundHead.play();
                beat = 1;
              } else {
                clickSound.play();
                beat++;
              }

            }

          }, animInterval);

      	}
      },

      stopClick : function () {
      	if (timer) {
      	  clearInterval(timer);
      	  timer = null;
      	}
      },
    };
 
  });
