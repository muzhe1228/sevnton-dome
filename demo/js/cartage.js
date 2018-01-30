angular.module("myApp", []).controller("CartageCtl", function($scope, $http, $sce, $timeout) {
	$scope.more_company1 = true;
	$scope.more_portFrom1 = true;
	$scope.more_portTo1 = true;
	$scope.more_storage1 = true;
	$scope.more_company2 = true;
	$scope.more_portFrom2 = true;
	$scope.more_portTo2 = true;
	$scope.more_storage2 = true;

	$scope.srh1 = {
		pageNumber : 1,
		pageSize : 10
	};
	$scope.srh2 = {
		pageNumber : 1,
		pageSize : 10
	};
	$scope.page1 = {
		totalRow : 0,
		pageNumber : 0,
		totalPage : 0
	};
	$scope.page2 = {
		totalRow : 0,
		pageNumber : 0,
		totalPage : 0
	};

	$scope.init = function() {
		$http({
			method : "post",
			url : "cartage/init"
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.companyList = rs.result.companyList;
				$scope.portFromList = rs.result.portFromList;
				$scope.portToList = rs.result.portToList;
				$scope.storage1List = rs.result.storage1List;
				$scope.storage2List = rs.result.storage2List;

				$scope.companyArray = rs.result.companyArray;
				$scope.portFromArray = rs.result.portFromArray;
				$scope.portToArray = rs.result.portToArray;
				$scope.storage1Array = rs.result.storage1Array;
				$scope.storage2Array = rs.result.storage2Array;

				$timeout(function() {
					$("#company1").completer({
						suggest : true,
						source : $scope.companyArray
					});
					$("#portFrom1").completer({
						suggest : true,
						source : $scope.portFromArray
					});
					$("#portTo1").completer({
						suggest : true,
						source : $scope.portToArray
					});
					$("#storage1").completer({
						suggest : true,
						source : $scope.storage1Array
					});
				});
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	};
    $scope.cageDetails = function(row) {
        $scope.detail = row;
        layer.open({
            type : 1,
            skin : "layui-layer-rim",
            area : [ "90%", "90%" ],
            title : [ "海运整柜运费详情", "font-size:medium;" ],
            content : $("#cartDetails")
        });
    };
    $scope.cageDetails1 = function(row) {
        $scope.detail1 = row;
        layer.open({
            type : 1,
            skin : "layui-layer-rim",
            area : [ "90%", "90%" ],
            title : [ "海运拼柜运费详情", "font-size:medium;" ],
            content : $("#cartDetails1")
        });
    };
	$scope.selTab = function() {
		$timeout(function() {
			$("#company2").completer({
				suggest : true,
				source : $scope.companyArray
			});
			$("#portFrom2").completer({
				suggest : true,
				source : $scope.portFromArray
			});
			$("#portTo2").completer({
				suggest : true,
				source : $scope.portToArray
			});
			$("#storage2").completer({
				suggest : true,
				source : $scope.storage2Array
			});
		});
	};

	$scope.search1 = function() {
		getTableDate1();
	};

	$scope.search2 = function() {
		getTableDate2();
	};

	$scope.itemClass = function(sValue, iValue) {
		if (sValue == iValue) {
			return "selected";
		}
	};

	$scope.previous1 = function() {
		if ($scope.page1.totalRow > 0 && $scope.page1.pageNumber > 1) {
			$scope.srh1.pageNumber -= 1;
			getTableDate1();
		}
	};
	$scope.next1 = function() {
		if ($scope.page1.totalRow > 0 && $scope.page1.pageNumber < $scope.page1.totalPage) {
			$scope.srh1.pageNumber += 1;
			getTableDate1();
		}
	};
	$scope.first1 = function() {
		if ($scope.page1.totalRow > 0 && $scope.page1.pageNumber > 1) {
			$scope.srh1.pageNumber = 1;
			getTableDate1();
		}
	};
	$scope.last1 = function() {
		if ($scope.page1.totalRow > 0 && $scope.page1.pageNumber < $scope.page1.totalPage) {
			$scope.srh1.pageNumber = $scope.page1.totalPage;
			getTableDate1();
		}
	};
	$scope.changePageSize1 = function() {
		$scope.srh1.pageNumber = 1;
		getTableDate1();
	};
	function getTableDate1() {
		console.log("getTableDate1");
		$http({
			method : "post",
			url : "cartage/getList1",
			params : $scope.srh1
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.page1 = rs.result;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("取运费列表时发生系统异常");
		});
	}

	$scope.previous2 = function() {
		if ($scope.page2.totalRow > 0 && $scope.page2.pageNumber > 1) {
			$scope.srh2.pageNumber -= 1;
			getTableDate2();
		}
	};
	$scope.next2 = function() {
		if ($scope.page2.totalRow > 0 && $scope.page2.pageNumber < $scope.page2.totalPage) {
			$scope.srh2.pageNumber += 1;
			getTableDate2();
		}
	};
	$scope.first2 = function() {
		if ($scope.page2.totalRow > 0 && $scope.page2.pageNumber > 1) {
			$scope.srh2.pageNumber = 1;
			getTableDate2();
		}
	};
	$scope.last2 = function() {
		if ($scope.page2.totalRow > 0 && $scope.page2.pageNumber < $scope.page2.totalPage) {
			$scope.srh2.pageNumber = $scope.page2.totalPage;
			getTableDate2();
		}
	};
	$scope.changePageSize2 = function() {
		$scope.srh2.pageNumber = 1;
		getTableDate2();
	};
	function getTableDate2() {
		$http({
			method : "post",
			url : "cartage/getList2",
			params : $scope.srh2
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.page2 = rs.result;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("取运费列表时发生系统异常");
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
