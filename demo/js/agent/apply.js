myApp.controller("AgentApplyCtl", function($scope, $http, $rootScope, $state) {
	$scope.ckNav("agent_apply");
	dataValidate();

	$scope.info = {
		stock : "1"
	};

	$scope.initPage = function() {
		$scope.$emit("checkCompany", "申请代运营服务");
	}

	$scope.$on("checkCompanyEnd", function(e, data) {
		$scope.info.maker = $scope.loginInfo.attrs.name;
		$scope.info.tel = $scope.loginInfo.attrs.tel;
		$http({
			method : "post",
			url : "uc/agent/getMarketList"
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.marketList = rs.result.marketList;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	});

	$scope.dataValidate = function() {
		dataValidate();
	}

	$scope.renderFinish = function() {
		radioSelect();
		if ($scope.marketList && $scope.marketList.length > 0) {
			$scope.info.market = $scope.marketList[0].attrs.id;
		}
	}

	$scope.seldRadio = function(first) {
		if (first) {
			return "active";
		}
	}

	$scope.submit = function() {
		$("form").ajaxSubmit(function() {
			var load = loadJava();
			$http({
				method : "post",
				url : "uc/agent/apply",
				data : $scope.info
			}).success(function(rs, status, headers, config) {
				layer.close(load);
				if (rs.code == 0) {
					layer.confirm("恭喜您提交成功", {
						btn : [ "继续提交新的订单", "查看订单状态" ],
						closeBtn : 0,
						title : "提示消息",
						area : "310"
					}, function(index) {
						$state.reload($state.$current);
						layer.close(index);
					}, function() {
						$state.go("agent_list");
					});
				} else {
					layer.msg(rs.errmsg);
				}
			}).error(function(rs, status, headers, config) {
				layer.close(load);
				layer.msg("申请服务时发生系统异常");
			});
		});
	};
});