(function () {
    'use strict';
    var common = angular.module('common', []);
    common.directive('modal', function () {
        return {
            restrict: 'EA',
            templateUrl: 'Templates/modal.html',
            scope: {
                modalcontent: "="
            },
            link: function ($scope, scope, elem, attrs) { },
            controller: function ($scope) {
                $('.close').on("click", function (e) {
                    $('.modal').removeClass('active')
                });
            }
        };
    });

    common.directive('validation', function () {
        function link(scope, elem, attrs, ngModel) {
            ngModel.$parsers.push(function (viewValue) {
                var reg = /^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./1-9]*$/;
                // if view values matches regexp, update model value
                if (viewValue.match(reg)) {
                    return viewValue;
                }
                // keep the model value as it is
                var transformedValue = ngModel.$modelValue;
                ngModel.$setViewValue(transformedValue);
                ngModel.$render();
                return transformedValue;
            });
        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };
    });
    common.directive('userDetail', function () {
        return {
            restrict: 'EA',
            templateUrl: 'Templates/userDetails.html',
            scope: {
            },
            link: function ($scope, scope, elem, attrs) { },
            controller: function ($scope) {
            }
        };
    });
    common.filter('ageFilter', function () {
        return function (birthday) {
            var birthday = new Date(birthday);
            var today = new Date();
            var age = ((today - birthday) / (31557600000));
            var age = Math.floor(age);
            return age;
        }
    });
    common.directive('mainTableApp', function () {
        return {
            restrict: 'EA',
            templateUrl: 'Templates/mainTableApp.html',
            scope: {
                userscontent: "="
            },
            link: function ($scope, scope, elem, attrs) {
                $scope.export = function (e) {
                    var newData = [];
                    var selected = 0;
                    angular.forEach($scope.userscontent, function (v) {
                        if (v.isSelected) {
                            newData.push(v);
                            selected++;
                        }
                    });
                    $scope.csvContent = newData;
                    var table = $scope.csvContent;
                    var csvString = '';
                    table.map(function (obj) {
                        var newObject = {};
                        Object.keys(obj).forEach(function (key) {
                            if (key !== 'isSelected' && key !== '$$hashKey' && key !== 'undefined') {
                                var value = obj[key];
                                csvString = csvString + value + ";";
                            }
                        });
                        csvString = csvString.substring(0, csvString.length - 1);
                        csvString = csvString + "\n";
                    });
                    csvString = csvString.substring(0, csvString.length - 1);
                    if (selected !== 0) {
                        var a = $('<a/>', {
                            style: 'display:none',
                            href: 'data:application/octet-stream;base64,' + btoa(csvString),
                            download: 'userExport.csv'
                        }).appendTo('body')
                        a[0].click()
                        a.remove();
                    }
                };
            },
            controller: function ($scope) {
                $scope.formHasChanged = function () {
                    $scope.formChanged = 1;

                }
                $scope.saveUpdatedContent = function () {
                    $scope.showDetailPage = false;
                }
                $scope.showDetailPage = false;
                $scope.remove = function (user) {
                    var newDataList = [];
                    angular.forEach($scope.userscontent, function (v) {
                        if (!v.isSelected) {
                            if (v !== user) {
                                newDataList.push(v);
                            }
                        }
                    });
                    $scope.userscontent = newDataList;
                    $scope.count = 0;
                };
                $scope.init = function () {
                    $scope.count = 0;
                }
                $scope.updateTotal = function (item) {
                    if (item) {
                        $scope.count++;
                    } else {
                        $scope.count--;
                    }
                }
                $scope.init();
                $scope.slectedButton = function (user) {
                    $scope.mContent = user;
                    $('.modal').toggleClass('active');
                }
                $scope.goToDetailPage = function (user, $index) {
                    $scope.userDetail = user;
                    $scope.showDetailPage = true;
                    $scope.userIndex = $index;
                    $scope.formChanged = 0;
                    $scope.oldUserDetailValue = angular.copy($scope.userDetail);
                }
                $scope.goBack = function (oldDetail) {
                    if ($scope.formChanged !== 1) {
                        $scope.showDetailPage = false;
                    } else {
                        $('#confirm-delete').toggleClass('active');
                    }
                }
            }
        };
    });
    common.directive('cancelModal', function () {
        return {
            restrict: 'EA',
            templateUrl: 'Templates/cancelModal.html',
            scope: {
                index: '='
            },
            link: function ($scope, scope, elem, attrs) { },
            controller: function ($scope) {
                $scope.back = function () {
                    $scope.$parent.$parent.userscontent[$scope.$parent.$parent.userIndex] = $scope.$parent.$parent.oldUserDetailValue;
                    $scope.$parent.$parent.showDetailPage = false;
                    $('#confirm-delete').toggleClass('active');
                }
                $('.close').on("click", function (e) {
                    $('.modal').removeClass('active')
                });
                $scope.closeModal = function () {
                    $('#confirm-delete').toggleClass('active');
                }
            }
        };
    });
}());

