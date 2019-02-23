app.factory('testTaskFactory', ['$http', function ($http) {
    return {
        testTaskRequest: $http.get("data/users.json")
    };
}]);