angular.module("myApp", []).controller("xuanchuanyeCtl", function($scope, $http, $sce, $timeout) {
    $scope.logo_size = "跨境贸易综合服务平台"
    $scope.page = {
        pageNumber : 1,
        pageSize : 5,
        totalRow : 0,
        totalPage : 0
    };
	$scope.init = function() {
		$("meta[name=keywords]").attr("content","E揽全球，Google，pingpong，百万补贴，企业报名，服务对接,外贸公共服务，外贸综合服务，跨境贸易公共服务平台，浙江出口，浙江外贸，代理出口，外贸服务，跨境贸易综合服务，通关报关，外贸B2B");
		$("meta[name=description]").attr("content","杭州跨境电商综试区E揽全球专题资讯页，提供跨境贸易通关，外汇，退税等外贸服务");
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