myApp.controller("MyWithdrawCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 0;
	$scope.ckNav("my_account");
	$scope.initPage = function() {
		$scope.$emit("checkLogin", "申请提现");
	}
	$scope.$on("checkLoginEnd", function(e, data) {
		dataValidate();
	});

	$scope.apply = function() {
		$("form").ajaxSubmit(function() {
			var load = loadJava();
			$http({
				method : "post",
				url : "uc/user/withdraw",
				data : $scope.info
			}).success(function(rs, status, headers, config) {
				layer.close(load);
				if (rs.code == 0) {
					$state.go("my_account");
				} else {
					layer.msg(rs.errmsg);
				}
			}).error(function(rs, status, headers, config) {
				layer.close(load);
				layer.msg("申请提现时发生系统异常");
			});
		});
	}

	$scope.bread = function() {
		$state.go("my_account");
	}
});
