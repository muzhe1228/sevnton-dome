myApp.controller("9610ChargeBackCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 1;
	$scope.ckNav("9610_all");
	$scope.initPage = function() {
		debugger
		$scope.$emit("checkLogin", "查看我的信息");
	}
});