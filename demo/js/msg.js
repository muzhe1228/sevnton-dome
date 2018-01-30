angular.module("myApp", []).controller("MsgCtl", function($scope, $http) {
    $scope.logo_size = "跨境贸易综合服务平台"
	$scope.page = {
		totalRow : 0,
		pageNumber : 0,
		totalPage : 0
	};
	$scope.srh = {
		pageNumber : 1,
		pageSize : 10
	};

	$scope.init = function() {
		getTableDate();
	};
	$scope.previous = function() {
		if ($scope.page.totalRow > 0 && $scope.page.pageNumber > 1) {
			$scope.srh.pageNumber -= 1;
			getTableDate();
		}
	};
	$scope.next = function() {
		if ($scope.page.totalRow > 0 && $scope.page.pageNumber < $scope.page.totalPage) {
			$scope.srh.pageNumber += 1;
			getTableDate();
		}
	};
	$scope.first = function() {
		if ($scope.page.totalRow > 0 && $scope.page.pageNumber > 1) {
			$scope.srh.pageNumber = 1;
			getTableDate();
		}
	};
	$scope.last = function() {
		if ($scope.page.totalRow > 0 && $scope.page.pageNumber < $scope.page.totalPage) {
			$scope.srh.pageNumber = $scope.page.totalPage;
			getTableDate();
		}
	};
	$scope.changePageSize = function() {
		$scope.srh.pageNumber = 1;
		getTableDate();
	};
	function getTableDate() {
		$http({
			method : "post",
			url : "uc/msg/search",
			params : $scope.srh
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.page = rs.result;
				$scope.page.offset = ($scope.page.pageNumber - 1) * $scope.page.pageSize + 1;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("取系统消息时发生系统异常");
		});
	}

	$scope.readed = function(row) {
		$http({
			method : "post",
			url : "uc/msg/readed",
			params : {
				id : row.attrs.id
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				row.attrs.readed = "1";
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("变更消息状态时发生系统异常");
		});
	}

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
