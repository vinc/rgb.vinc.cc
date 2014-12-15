angular.module('rgbApp', [])
  .controller('RGBController', ['$scope', function($scope) {
    $scope.i = 0;
    $scope.rgb = ['0', '0', '0'];

    $scope.rand = function() {
      $scope.rgb = $scope.rgb.map(function(c) {
        return Math.floor(Math.random() * (16)).toString(16);
      });
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

    $scope.up = function() {
      $scope.rgb[$scope.i] = ((parseInt($scope.rgb[$scope.i], 16) + 1) % 16).toString(16);
    };

    $scope.down = function() {
      $scope.rgb[$scope.i] = ((parseInt($scope.rgb[$scope.i], 16) + 15) % 16).toString(16);
    };

    $scope.right = function() {
      $scope.i = ($scope.i + 1) % 3;
    };

    $scope.left = function() {
      $scope.i = ($scope.i + 2) % 3;
    };

    $scope.keydown = function(e) {
      switch(e.keyCode) {
        case 13: $scope.rand(); break;
        case 32: $scope.rand(); break;
        case 37: $scope.left(); break;
        case 38: $scope.up(); break;
        case 39: $scope.right(); break;
        case 40: $scope.down(); break;
      }
    };

    $scope.rand();
  }]);
