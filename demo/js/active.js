angular.module("myApp", []).controller("ActiveCtl", function($scope, $http) {
	$scope.active = function() {
		var email = $("#email").text();
		var arr = email.split("@");
		location.href = "http://email." + arr[1];
	};

	$scope.backHome = function() {
		location.href = "./";
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