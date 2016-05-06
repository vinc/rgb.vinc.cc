angular.module('rgbApp', [])
  .controller('RGBController', ['$scope', '$location', function($scope, $location) {

    $scope.help = true;
    $scope.i = 0;
    $scope.rgb = ['0', '0', '0'];

    $scope.keydown = function(e) {
      $scope.help = false;
      switch(e.keyCode) {
      case 13:
      case 32:
        $scope.rand();
        break;
      case 37:
        $scope.left();
        break;
      case 38:
        $scope.up();
        break;
      case 39:
        $scope.right();
        break;
      case 40:
        $scope.down();
        break;
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
      case 65:
      case 66:
      case 67:
      case 68:
      case 69:
      case 70:
        $scope.rgb[$scope.i] = String.fromCharCode(e.keyCode);
        right();
        break;
      }
    };

    $scope.bg = function() {
      return '#' + $scope.rgb.join('').toUpperCase();
    };

    $scope.fg = function() {
      var hue = $scope.rgb.reduce(function(r, c, i, a) {
        return r + parseInt(c, 16);
      }, 0) / 3;

      return hue > 8 ? '#333' : '#eee';
    };

    $scope.up = function() {
      $scope.rgb[$scope.i] = ((parseInt($scope.rgb[$scope.i], 16) + 1) % 16).toString(16);
      updateLocation();
    }

    $scope.down = function() {
      $scope.rgb[$scope.i] = ((parseInt($scope.rgb[$scope.i], 16) + 15) % 16).toString(16);
      updateLocation();
    }

    $scope.right = function() {
      $scope.i = ($scope.i + 1) % 3;
    };

    $scope.left = function() {
      $scope.i = ($scope.i + 2) % 3;
    };

    $scope.rand = function() {
      $scope.rgb = $scope.rgb.map(function(c) {
        return Math.floor(Math.random() * (16)).toString(16);
      });
      updateLocation();
    }

    function updateLocation() {
      $location.path($scope.rgb.join('').toUpperCase()).replace();
    }

    function loadLocation() {
      if ($location.path() === '') {
        rand();
      } else {
        $scope.rgb = $location.path().slice(1, 4).split('');
      }
    }

    $scope.$on('$locationChangeSuccess', function() {
      loadLocation();
    });
  }]);
