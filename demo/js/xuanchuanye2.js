angular.module("myApp", []).controller("xuanchuanye2Ctl", function($scope, $http, $sce, $timeout) {
    $scope.logo_size = "跨境贸易综合服务平台"
    $scope.page = {
        pageNumber : 1,
        pageSize : 5,
        totalRow : 0,
        totalPage : 0
    };
	$scope.init = function() {
		$("meta[name=keywords]").attr("content","跨境电商，百万美金，四海商州，赛乐营，电商操盘手，亚马逊，wish，速卖通，外贸公共服务，外贸综合服务，跨境贸易公共服务平台，浙江出口，浙江外贸，代理出口，外贸服务，跨境贸易综合服务，通关报关，外贸B2B");
		$("meta[name=description]").attr("content","圣云通跨境电商进修班提供跨境电商在线学习线下沙龙等培训教育课程");
	
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