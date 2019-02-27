let app = angular.module('app', [
	'ui.router',
	'user',
	'common',
	'ui.bootstrap',
	'angularUtils.directives.dirPagination'
]);

app.factory('testTaskFactory', ['$http', function ($http) {
	return {
		testTaskRequest: $http.get("data/users.json")
	};
}]);

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
