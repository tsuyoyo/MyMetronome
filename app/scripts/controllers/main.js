'use strict';

angular.module('130810HackathonApp')
  .controller('MainCtrl', function ($scope, $document, click) {

    var DEFAULT_TEMPO = 70;

    var needleArea = $document.context.getElementById('needle');

    $(function() {
      var seekBar = $("#tempo-seek-bar");
      seekBar.slider({
        min: 10,
        max: 200,
        value: DEFAULT_TEMPO,
        orientation: "horizontal",        
        range: "min",
        animate: true,
        change: function (event, ui) {
          $scope.changeTempo(ui.value);
          $scope.$apply();
        },
      });
    });

    $scope.changeTempo = function (t) {
      $scope.tempo = t.valueOf();
    };

    $scope.addTempo = function (t) {
      $scope.tempo += t.valueOf();
    };    

    $scope.start = function () {
      click.startClick($scope.tempo, needleArea);
    };

    $scope.stop = function () {
      click.stopClick();
    };
    
    $scope.tempo = DEFAULT_TEMPO;
    
    var isInitDone = false; // 苦肉の策

    $scope.$watch('tempo', function() {
      if (isInitDone) {
        click.stopClick();
        click.startClick($scope.tempo, needleArea);
      } else {
        isInitDone = true;
      }
  	});
    
  });
