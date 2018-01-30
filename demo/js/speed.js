angular.module("myApp", []).controller("SpeedCtl", function($scope, $http, $sce, $timeout) {
    $scope.logo_size = "跨境贸易综合服务平台"
	$scope.register = function() {
		$(".showWin form").ajaxSubmit(function() {
			$http({
				method : "post",
				url : "uc/auth/speedRegister",
				params : $scope.regauth
			}).success(function(rs, status, headers, config) {
				if (rs.code == 0) {
					layer.msg("您已成功申请服务，我们的服务经理将在24小时内电话联系您，请保持电话畅通！");
				} else {
					layer.msg(rs.errmsg);
				}
			}).error(function(rs, status, headers, config) {
				layer.msg("用户快速申请服务时发生系统异常");
			});
		});
	};
	$scope.usercenter = function(page) {
		$http({
			method : "post",
			url : "index/checkCompany"
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				location.href = "usercenter#/" + page;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("确认用户权限时发生系统异常");
		});
	};
});
