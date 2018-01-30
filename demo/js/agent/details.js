myApp.controller("AgentDetailsCtl", function($scope, $http, $rootScope, $state) {
	$scope.ckNav("agent_list");
	$scope.initPage = function() {
		$scope.$emit("checkCompany", "查询代运营状况");
	}

	$scope.srh = {};
	layui.use("laydate", function() {
		$("#srh_start").click(function() {
			layui.laydate({
				elem : this,
				festival : true,
				choose : function(datas) {
					$scope.$apply(function() {
						$scope.srh.start = datas;
					});
					$scope.searchSales();
				}
			});
		});
		$("#srh_end").click(function() {
			layui.laydate({
				elem : this,
				festival : true,
				choose : function(datas) {
					$scope.$apply(function() {
						$scope.srh.end = datas;
					});
					$scope.searchSales();
				}
			});
		});
	});

	$scope.$on("checkCompanyEnd", function(e, data) {
		$http({
			method : "post",
			url : "uc/agent/getDetail",
			params : {
				orderId : $state.params.id
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.agentDetail = rs.result.agentDetail;
				$scope.sales = rs.result.sales;
				$scope.platformList = rs.result.platformList;
				$scope.warning = rs.result.warning;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	});

	$scope.searchSales = function() {
		$scope.srh.orderId = $state.params.id;
		$http({
			method : "post",
			url : "uc/agent/searchSales",
			params : $scope.srh
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.sales = rs.result.sales;
				$scope.agentDetail.attrs.count = rs.result.count;
				$scope.agentDetail.attrs.amount = rs.result.amount;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("搜索数据时发生系统异常");
		});
	}

	$scope.download = function() {
		location.href = $scope.agentDetail.attrs.document;
	}

	$scope.carouselInit = function() {
		carousel();
	}
	$scope.bread = function() {
		$state.go("agent_list");
	}
});