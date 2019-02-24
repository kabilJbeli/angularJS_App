(function () {
    'use strict';
    let common = angular.module('common', []);
    common.directive('modal', function () {
        return {
            restrict: 'EA',
            templateUrl: 'Templates/modal.html',
            scope: {
                modalcontent: "="
            },
            link: function ($scope, scope) { },
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
                let reg = /^[^`~!@#$%\^&*()_+-={}|[\]\\:';"<>?,./1-9]*$/;
                if (viewValue.match(reg)) {
                    scope.valid = true;
                    return viewValue;

                } else {
                    scope.valid = false;
                    return viewValue;
                }
            });
        }
        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };
    });
    common.filter('ageFilter', function () {
        return function (birthday) {
            let birthdayDate = new Date(birthday);
            let today = new Date();
            let age = ((today - birthdayDate) / (31557600000));
            age = Math.floor(age);
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
            link: function ($scope, scope) {
                $scope.export = function (e) {
                    let newData = [];
                    let selected = 0;
                    angular.forEach($scope.userscontent, function (user) {
                        if (user.isSelected) {
                            newData.push(user);
                            selected++;
                        }
                    });
                    $scope.csvContent = newData;
                    let table = $scope.csvContent;
                    let csvString = '';
                    table.map(function (obj) {
                        Object.keys(obj).forEach(function (key) {
                            if (key !== 'isSelected' && key !== '$$hashKey' && key !== 'undefined') {
                                let value = obj[key];
                                csvString = csvString + value + ";";
                            }
                        });
                        csvString = csvString.substring(0, csvString.length - 1);
                        csvString = csvString + "\n";
                    });
                    csvString = csvString.substring(0, csvString.length - 1);
                    if (selected !== 0) {
                        let a = $('<a/>', {
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
                    let newDataList = [];
                    angular.forEach($scope.userscontent, function (userC) {
                        if (!userC.isSelected) {
                            if (userC !== user) {
                                newDataList.push(userC);
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
                $scope.goToDetailPage = function (user) {
                    $scope.userDetail = user;
                    $scope.showDetailPage = true;
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
            },
            link: function ($scope, scope) { },
            controller: function ($scope) {
                $scope.back = function () {
                    $scope.$parent.$parent.userscontent[$scope.$parent.$parent.userscontent.indexOf($scope.$parent.$parent.userDetail)] = $scope.$parent.$parent.oldUserDetailValue;
                    $scope.$parent.$parent.showDetailPage = false;
                    $('#confirm-delete').toggleClass('active');
                }
                $scope.closeModal = function () {
                    $('#confirm-delete').toggleClass('active');
                }
            }
        };
    });
}());

