myApp.controller("BasicListCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 0;
	$scope.ckNav("basic_list");
	$scope.initPage = function() {
		$scope.$emit("checkCompany", "跟踪基础服务订单");
	}

	$scope.$on("checkCompanyEnd", function(e, data) {
		$scope.all();
	});
	
	$scope.page = {
			pageNumber : 1,
			pageSize : 4,
			totalRow : 0,
			totalPage : 0
	};

	$scope.all = function() {
		$scope.searched = false;
		$scope.srhKey = null;
		$http({
			method : "post",
			url : "uc/basic/getList",
			data : {
				"pageNumber" : $scope.page.pageNumber,
				"pageSize" : $scope.page.pageSize,
			}	
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.basicList = rs.result.basicList;
                $scope.pageNumber = rs.result.pageNumber;
                $scope.pageSize = rs.result.pageSize;
                $scope.page.pageNumber = rs.result.basicList.pageNumber;
                $scope.page.pageSize = rs.result.basicList.pageSize;
                $scope.page.totalRow = rs.result.basicList.totalRow;
                $scope.page.totalPage = rs.result.basicList.totalPage;
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
			url : "uc/basic/search",
			data : {
				"pageNumber" : $scope.page.pageNumber,
				"pageSize" : $scope.page.pageSize,
				"srhKey" : $scope.srhKey
			}	
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.basicList = rs.result.basicList;
                $scope.pageNumber = rs.result.pageNumber;
                $scope.pageSize = rs.result.pageSize;
                $scope.page.pageNumber = rs.result.basicList.pageNumber;
                $scope.page.pageSize = rs.result.basicList.pageSize;
                $scope.page.totalRow = rs.result.basicList.totalRow;
                $scope.page.totalPage = rs.result.basicList.totalPage;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("搜索数据时发生系统异常");
		});
	}

	$scope.details = function(id, state) {
		var url;
		if (state == "1") {
			url = "basic_confirm";
		} else {
			url = "basic_details";
		}
		$state.go(url, {
			id : id
		});
	}
	
	 $scope.previous = function(srhKey) {
	        if ($scope.page.totalRow > 0 && $scope.page.pageNumber > 1) {
	            $scope.page.pageNumber -= 1;
	            $scope.all();
	            //initiss($scope.isClass)
	        }
	    };
	    $scope.next = function(srhKey) {
	        if ($scope.page.totalRow > 0
	            && $scope.page.pageNumber < $scope.page.totalPage) {
	            $scope.page.pageNumber += 1;
	            $scope.all();
	            //initiss($scope.isClass)
	        }
	    };
	    $scope.first = function(srhKey) {
	        if ($scope.page.totalRow > 0 && $scope.page.pageNumber > 1) {
	            $scope.page.pageNumber = 1;
	            $scope.all();
	            //initiss($scope.isClass)
	        }
	    };
	    $scope.last = function(srhKey) {
	        if ($scope.page.totalRow > 0
	            && $scope.page.pageNumber < $scope.page.totalPage) {
	            $scope.page.pageNumber = $scope.page.totalPage;
	            $scope.all();
	           // initiss($scope.isClass)
	        }
	    };
});