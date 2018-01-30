myApp.controller("MyAccountCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 0;
    tabSelect();
	$scope.ckNav("my_account");
	$scope.initPage = function() {
		$scope.$emit("checkLogin", "查看我的账户");
	}
	$scope.$on("checkLoginEnd", function(e, data) {
		tabSelect();
		$http({
			method : "post",
			url : "uc/user/getAccount"
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.account = rs.result.account;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
		$scope.incPage = {
			totalRow : 0,
			pageNumber : 0,
			totalPage : 0
		};
		$scope.witPage = {
			totalRow : 0,
			pageNumber : 0,
			totalPage : 0
		};
		$scope.incSrh = {
			pageNumber : 1,
			pageSize : 10
		};
		$scope.witSrh = {
			pageNumber : 1,
			pageSize : 10
		};
		getIncTableDate();
		getWitTableDate();
	});
	$scope.incPrevious = function() {
		if ($scope.incPage.totalRow > 0 && $scope.incPage.pageNumber > 1) {
			$scope.incSrh.pageNumber -= 1;
			getIncTableDate();
		}
	};
	$scope.incNext = function() {
		if ($scope.incPage.totalRow > 0 && $scope.incPage.pageNumber < $scope.incPage.totalPage) {
			$scope.incSrh.pageNumber += 1;
			getIncTableDate();
		}
	};
	$scope.incFirst = function() {
		if ($scope.incPage.totalRow > 0 && $scope.incPage.pageNumber > 1) {
			$scope.incSrh.pageNumber = 1;
			getIncTableDate();
		}
	};
	$scope.incLast = function() {
		if ($scope.incPage.totalRow > 0 && $scope.incPage.pageNumber < $scope.incPage.totalPage) {
			$scope.incSrh.pageNumber = $scope.incPage.totalPage;
			getIncTableDate();
		}
	};
	$scope.incChangePageSize = function() {
		$scope.incSrh.pageNumber = 1;
		getIncTableDate();
	};
	function getIncTableDate() {
		$http({
			method : "post",
			url : "uc/user/searchIncome",
			params : $scope.incSrh
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.incPage = rs.result;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("取收入明细时发生系统异常");
		});
	}
	$scope.witPrevious = function() {
		if ($scope.witPage.totalRow > 0 && $scope.witPage.pageNumber > 1) {
			$scope.witSrh.pageNumber -= 1;
			getWitTableDate();
		}
	};
	$scope.witNext = function() {
		if ($scope.witPage.totalRow > 0 && $scope.witPage.pageNumber < $scope.witPage.totalPage) {
			$scope.witSrh.pageNumber += 1;
			getWitTableDate();
		}
	};
	$scope.witFirst = function() {
		if ($scope.witPage.totalRow > 0 && $scope.witPage.pageNumber > 1) {
			$scope.witSrh.pageNumber = 1;
			getWitTableDate();
		}
	};
	$scope.witLast = function() {
		if ($scope.witPage.totalRow > 0 && $scope.witPage.pageNumber < $scope.witPage.totalPage) {
			$scope.witSrh.pageNumber = $scope.witPage.totalPage;
			getWitTableDate();
		}
	};
	$scope.witChangePageSize = function() {
		$scope.witSrh.pageNumber = 1;
		getWitTableDate();
	};
    $scope.tabIncome = function(row) {
        $scope.income = row;
        layer.open({
            type : 1,
            skin : "layui-layer-rim",
            area : [ "90%", "90%" ],
            title : [ "收入明细", "font-size:medium;" ],
            content : $("#tabIncome")
        });
    };
    $scope.tabWithdraw = function(row) {
        $scope.withdra = row;
        layer.open({
            type : 1,
            skin : "layui-layer-rim",
            area : [ "90%", "90%" ],
            title : [ "提现明细", "font-size:medium;" ],
            content : $("#tabWithdraw")
        });
    };
	function getWitTableDate() {
		$http({
			method : "post",
			url : "uc/user/searchWithdraw",
			params : $scope.witSrh
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.witPage = rs.result;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("取提现明细时发生系统异常");
		});
	}

	$scope.withdraw = function() {
		$state.go("my_withdraw");
	}
});
