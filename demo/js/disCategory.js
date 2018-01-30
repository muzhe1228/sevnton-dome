angular.module("myApp", []).controller("DisCategoryCtl",
		function($scope, $http, $sce, $timeout) {
            $scope.logo_size = "公共服务";
            $scope.logo_href = "./dis";
	$scope.page = {
			pageNumber : 1,
			pageSize : 10,
			totalRow : 0,
			totalPage : 0
	};
	var categoryID = GetQueryString("categoryID");
	var disTitle = GetQueryString("disTitle");
	var disType = GetQueryString("disType");
	var isSolve = GetQueryString("isSolve");
	$scope.init = function(){
		$http({
			method : "post",
			url : "dis/disMain",
			data : {
				"pageNumber" : $scope.page.pageNumber,
				"pageSize" : $scope.page.pageSize,
				"categoryID":categoryID,
				"disTitle":disTitle,
				"disType":disType,
				"isSolve":isSolve,
				
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.DisQuesList = rs.result.DisQuesList;
				$scope.DisQuesAnList = rs.result.DisQuesAnList;
				$scope.DisQuesAllList = rs.result.DisQuesAllList.list;
				$scope.allCategory = rs.result.allCategory;
				$scope.consultList = rs.result.consultList
				$scope.pageNumber = rs.result.pageNumber;
				$scope.DisQuesPageList = rs.result.DisQuesPageList;
				$scope.disTitle = rs.result.disTitle
				$scope.pageSize = rs.result.pageSize;
				$scope.page = rs.result.DisQuesAllList;
				$scope.disType = disType;
				$scope.isSolve = isSolve;
				$scope.categoryID = categoryID;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	}
	
	//分页
	function getList(){
		$http({
			method : "post",
			url : "dis/disMain",
			data : {
				"pageNumber" : $scope.page.pageNumber,
				"pageSize" : $scope.page.pageSize,
				"categoryID":categoryID,
				"disTitle":disTitle,
				"disType":disType,
				"isSolve":isSolve,
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.DisQuesList = rs.result.DisQuesList;
				$scope.DisQuesAnList = rs.result.DisQuesAnList;
				$scope.DisQuesAllList = rs.result.DisQuesAllList.list;
				$scope.allCategory = rs.result.allCategory;
				$scope.consultList = rs.result.consultList
				$scope.pageNumber = rs.result.pageNumber;
				$scope.DisQuesPageList = rs.result.DisQuesPageList;
				$scope.disTitle = rs.result.disTitle
				$scope.pageSize = rs.result.pageSize;
				$scope.disType = disType;
				$scope.isSolve = isSolve;
				$scope.page = rs.result.DisQuesAllList;
				$scope.categoryID = categoryID;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	}
	$scope.previous = function() {
		if ($scope.page.totalRow > 0 && $scope.page.pageNumber > 1) {
			$scope.page.pageNumber -= 1;
			getList();
		}
	};
	$scope.next = function() {
		if ($scope.page.totalRow > 0
				&& $scope.page.pageNumber < $scope.page.totalPage) {
			$scope.page.pageNumber += 1;
			getList();
		}
	};
	$scope.first = function() {
		if ($scope.page.totalRow > 0 && $scope.page.pageNumber > 1) {
			$scope.page.pageNumber = 1;
			getList();
		}
	};
	$scope.last = function() {
		if ($scope.page.totalRow > 0
				&& $scope.page.pageNumber < $scope.page.totalPage) {
			$scope.page.pageNumber = $scope.page.totalPage;
			getList();
		}
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