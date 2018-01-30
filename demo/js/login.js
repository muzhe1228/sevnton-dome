angular.module("myApp", []).controller(
	"LoginCtl",function($scope, $http, $sce, $timeout) {
		//登录
        $scope.login = function() {
			$(".login form").ajaxSubmit(function() {
				var load = loadJava();
				$http({
					method : "post",
					url : "uc/auth/login",
					params : $scope.auth
				}).success(function(rs, status, headers, config) {
					layer.close(load);
					if (rs.code == 0) {
						location.href = "./";
					} else {
						$scope.error = rs.errmsg;
					}
				}).error(function(rs, status, headers, config) {
					layer.close(load);
					$scope.error = "登录过程中发生系统异常";
				});
			});
		 };
		 //快捷登录
		$("input").keydown(function(event) {
			if (event.keyCode == 13) {
				$scope.login();
			}
		});
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
