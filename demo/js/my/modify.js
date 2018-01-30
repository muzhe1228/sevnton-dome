myApp.controller("MyModifyCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 0;
	$scope.ckNav("my_info");
	$scope.initPage = function() {
		$scope.$emit("checkLogin", "变更我的密码");
		dataValidate();
	}

	$scope.modify = function() {
		$("form").ajaxSubmit(function() {
			var load = loadJava();
			$http({
				method : "post",
				url : "uc/user/modify",
				data : $scope.info
			}).success(function(rs, status, headers, config) {
				layer.close(load);
				if (rs.code == 0) {
					layer.msg("修改成功");
					$state.go("my_info");
				} else {
					layer.msg(rs.errmsg);
				}
			}).error(function(rs, status, headers, config) {
				layer.close(load);
				layer.msg("变更密码时发生系统异常");
			});
		});
	}

	$scope.bread = function() {
		$state.go("my_info");
	}
});