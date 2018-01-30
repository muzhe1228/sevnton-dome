angular.module("myApp", []).controller("DisCtl",
function($scope, $http, $sce, $timeout) {
    $scope.logo_size = "公共服务";
	$scope.page = {
			pageNumber : 1,
			pageSize : 10,
			totalRow : 0,
			totalPage : 0
	};
	var disTitle = GetQueryString("disTitle");
    $scope.isClass= 1;
	//初始化页面数据
	$scope.init = function(){
		$http({
			method : "post",
			url : "dis/disMain",
			data : {
				"pageNumber" : $scope.page.pageNumber,
				"pageSize" : $scope.page.pageSize,
				"disTitle":disTitle
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
                $scope.isClass= 1;
				$scope.DisQuesList = rs.result.DisQuesList;
				$scope.DisQuesAllList = rs.result.DisQuesAllList;
				$scope.allCategory = rs.result.allCategory;
				$scope.consultList = rs.result.consultList
                $scope.pageNumber = rs.result.pageNumber;
                $scope.pageSize = rs.result.pageSize;
                $scope.page.pageNumber = rs.result.DisQuesList.pageNumber;
                $scope.page.pageSize = rs.result.DisQuesList.pageSize;
                $scope.page.totalRow = rs.result.DisQuesList.totalRow;
                $scope.page.totalPage = rs.result.DisQuesList.totalPage;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	}
    $scope.initis = function(id){
        $scope.isClass = id;
        $scope.page.pageNumber = 1;
        initiss(id)
    }
    function initiss (id){
        $http({
            method : "post",
            url : "dis/disMain",
            data : {
                "pageNumber" : $scope.page.pageNumber,
                "pageSize" : $scope.page.pageSize,
                "disTitle":disTitle
            }
        }).success(function(rs, status, headers, config) {
            if (rs.code == 0) {
                if ($scope.isClass == 1){
                    $scope.DisQuesList = rs.result.DisQuesList;
                    $scope.page.pageNumber = rs.result.DisQuesList.pageNumber;
                    $scope.page.pageSize = rs.result.DisQuesList.pageSize;
                    $scope.page.totalRow = rs.result.DisQuesList.totalRow;
                    $scope.page.totalPage = rs.result.DisQuesList.totalPage;
                }else if ($scope.isClass == 2){
                    $scope.DisQuesList = rs.result.DisQuesAnList;
                    $scope.page.pageNumber = rs.result.DisQuesAnList.pageNumber;
                    $scope.page.pageSize = rs.result.DisQuesAnList.pageSize;
                    $scope.page.totalRow = rs.result.DisQuesAnList.totalRow;
                    $scope.page.totalPage = rs.result.DisQuesAnList.totalPage;
                }
            } else {
                layer.msg(rs.errmsg);
            }
        }).error(function(rs, status, headers, config) {
            layer.msg("页面信息取得时发生系统异常");
        });
    }
	//按分类搜索
	$scope.searchByCat = function(categoryID,pageSize,pageNumber){
		$http({
			method : "post",
			url : "dis/disMain",
			data : {
				"pageNumber" : $scope.pageNumber,
				"pageSize" : $scope.pageSize,
				"categoryID" : categoryID,
				"disTitle" : disTitle,
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.DisQuesList = rs.result.DisQuesList;
				$scope.DisQuesAnList = rs.result.DisQuesAnList;
				$scope.DisQuesAllList = rs.result.DisQuesAllList;
				$scope.allCategory = rs.result.allCategory;
				$scope.consultList = rs.result.consultList
				$scope.pageNumber = rs.result.pageNumber;
				$scope.pageSize = rs.result.pageSize;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	}
	
	//个人中心相关
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
    $scope.previous = function(categoryID) {
        if ($scope.page.totalRow > 0 && $scope.page.pageNumber > 1) {
            $scope.page.pageNumber -= 1;
            initiss($scope.isClass)
        }
    };
    $scope.next = function(categoryID) {
        if ($scope.page.totalRow > 0
            && $scope.page.pageNumber < $scope.page.totalPage) {
            $scope.page.pageNumber += 1;
            initiss($scope.isClass)
        }
    };
    $scope.first = function(categoryID) {
        if ($scope.page.totalRow > 0 && $scope.page.pageNumber > 1) {
            $scope.page.pageNumber = 1;
            initiss($scope.isClass)
        }
    };
    $scope.last = function(categoryID) {
        if ($scope.page.totalRow > 0
            && $scope.page.pageNumber < $scope.page.totalPage) {
            $scope.page.pageNumber = $scope.page.totalPage;
            initiss($scope.isClass)
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