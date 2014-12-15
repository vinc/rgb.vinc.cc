angular.module('rgbApp', [])
  .controller('RGBController', ['$scope', '$location', function($scope, $location) {
    $scope.i = 0;

    $scope.rgb = ['0', '0', '0'];

    $scope.keydown = function(e) {
      switch(e.keyCode) {
        case 13: rand(); break;
        case 32: rand(); break;
        case 37: left(); break;
        case 38: up(); break;
        case 39: right(); break;
        case 40: down(); break;
      }
    };

    $scope.bg = function() {
      return '#' + $scope.rgb.join('').toUpperCase();
    };

    $scope.fg = function() {
      var hue = $scope.rgb.reduce(function(r, c, i, a) {
        return r + parseInt(c, 16);
      }, 0) / 3;

      return hue > 8 ? 'black' : 'white';
    };

    function up() {
      $scope.rgb[$scope.i] = ((parseInt($scope.rgb[$scope.i], 16) + 1) % 16).toString(16);
      replaceHash();
    }

    function down() {
      $scope.rgb[$scope.i] = ((parseInt($scope.rgb[$scope.i], 16) + 15) % 16).toString(16);
      replaceHash();
    }

    function right() {
      $scope.i = ($scope.i + 1) % 3;
    };

    function left() {
      $scope.i = ($scope.i + 2) % 3;
    };

    function replaceHash() {
      $location.path($scope.rgb.join('').toUpperCase()).replace();
    }

    function rand() {
      $scope.rgb = $scope.rgb.map(function(c) {
        return Math.floor(Math.random() * (16)).toString(16);
      });
      replaceHash();
    }

    if ($location.path() === '') {
      rand();
    } else {
      $scope.rgb = $location.path().slice(1, 4).split('');
    }
  }]);
