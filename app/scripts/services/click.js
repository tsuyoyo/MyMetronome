'use strict';

angular.module('130810HackathonApp')
  .factory('click', function () {

    var clickSound = new Audio('./sounds/tone13.mp3');
    var clickSoundHead = new Audio('./sounds/tone14.mp3');    

    var timer;

    var canvas;

    var shouldFillCircle;

    function tempoToInterval (tempo) {
      var interval = 60 * 1000 / tempo;
      return interval;
    }

    function drawNeedle (canvas, rhythm, number) {
      var ctx = canvas.getContext('2d');

      var center_x = canvas.width / 2;
      var center_y = canvas.height;
      var angle = 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var img = new Image();
      img.src = "./appicon/fokusuke_01.png";
      img.onload = function() {
        var imgWidgh = img.width * 0.1;
        var imgHeight = img.height * 0.1;
        ctx.drawImage(img, center_x - imgWidgh / 2, center_y - imgHeight,
          imgWidgh, imgHeight);
      };

      for (var i = 0; i < number; i++) {
        var radius = (canvas.width > canvas.height) ? canvas.height * 0.9 : canvas.width * 0.9;

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(center_x, center_y);
        ctx.lineTo(center_x + radius * Math.cos(angle), center_y + radius * Math.sin(angle));
        ctx.stroke();

        angle -= Math.PI / (rhythm - 1);
      }

    }

    // Public API here
    return {
      startClick : function (tempo, c) {
      	if (!timer) {
      	  canvas = c;
      	  shouldFillCircle = false;

          var beats = 0;
          var rhythm = 4;
          var increase = true;

          timer = setInterval(function() {
            // clickSound.mozAudioChannelType = 'content';
            // clickSound.play();

            if (navigator.vibrate) {
              navigator.vibrate(100);
            }

            ++beats;
            var n = (0 == beats % rhythm) ? rhythm : beats;
            drawNeedle(canvas, rhythm , n);
            beats %= rhythm;

          }, tempoToInterval(tempo));
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
