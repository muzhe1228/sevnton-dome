angular.module("myApp", []).controller("ContentCtl", function($scope, $http, $sce, $timeout) {
    $scope.logo_size = "跨境贸易综合服务平台"
	$scope.init = function() {
		$http({
			method : "post",
			url : "introd/content",
			params : {
				type : GetQueryString("type"),
				id : GetQueryString("id")

			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.info = rs.result;
				if ($scope.info) {
					$scope.link = $sce.trustAsResourceUrl($scope.info.attrs.link);
					$scope.content = $sce.trustAsHtml($scope.info.attrs.content);
				}
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
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
