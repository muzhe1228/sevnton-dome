myApp.controller("AgentListCtl", function($scope, $http, $rootScope, $state) {
	$scope.ckNav("agent_list");
	$scope.initPage = function() {
		$scope.$emit("checkCompany", "查询代运营状况");
	}

	$scope.$on("checkCompanyEnd", function(e, data) {
		$scope.all();
	});

	$scope.all = function() {
		$scope.searched = false;
		$scope.srhKey = null;
		$http({
			method : "post",
			url : "uc/agent/getList"
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.agentList = rs.result.agentList;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	}

	$scope.search = function() {
		if (!$scope.srhKey) {
			layer.msg("请输入搜索关键字");
			return;
		}
		$scope.searched = true;
		$http({
			method : "post",
			url : "uc/agent/search",
			params : {
				srhKey : $scope.srhKey
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.agentList = rs.result.agentList;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("搜索数据时发生系统异常");
		});
	}

	$scope.details = function(id) {
		$state.go("agent_details", {
			id : id
		});
	}
});