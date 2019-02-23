app.controller('testTaskCTL', ['$http', '$scope', '$q', '$log', 'testTaskFactory', function ($http, $scope, $q, $log, testTaskFactory) {
    $log.log("Data biding start");
    $q.all([
        testTaskFactory.testTaskRequest
    ]).then(function (data) {
        $scope.usersData = data[0].data;
    }).catch(function (data) {
        $log.error("Data binding failed with:", data.status, data.statusText, data.data);
    }).finally(function () {
        $log.log("Finally finished data biding.");
    });
}]);