angular.module("myApp", []).controller("xuanchuanye3Ctl", function($scope, $http, $sce, $timeout) {
    $scope.logo_size = "跨境贸易综合服务平台"
    $scope.page = {
        pageNumber : 1,
        pageSize : 5,
        totalRow : 0,
        totalPage : 0
    };
	$scope.init = function() {
       
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