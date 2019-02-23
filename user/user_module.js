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
            link: function ($scope, scope, elem, attrs) { },
            controller: function ($scope) {

            }
        };
    });


}());