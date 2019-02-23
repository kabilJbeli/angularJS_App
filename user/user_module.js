(function () {
    'use strict';
    let users = angular.module('user', []);
    users.directive('usersRow', function () {
        return {
            restrict: 'EA',
            templateUrl: 'Templates/userRow.html',
            scope: {
                usercontent: "="
            },
            link: function ($scope, scope) { },
            controller: function ($scope) {
            }
        };
    });
    users.directive('userDetail', function () {
        return {
            restrict: 'EA',
            templateUrl: 'Templates/userDetails.html',
            scope: {
            },
            link: function ($scope, scope) { },
            controller: function ($scope) {
                $scope.valid = true;
            }
        };
    });
}());