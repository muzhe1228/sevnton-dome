myApp.controller("9610SendAddressCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 1;
    $scope.ckNav("9610_all");
	$scope.page = {
			pageNumber : 1,
			pageSize : 10,
			totalRow : 0,
			totalPage : 0
	};
	$scope.initPage = function() {
		$scope.$emit("checkLogin", "查看我的信息");
	}
	$scope.$on("checkLoginEnd", function(e, data) {
		$http({
			method : "post",
			url : "9610/getSendAddressList",
			data : {
				"pageNumber" : $scope.page.pageNumber,
				"pageSize" : $scope.page.pageSize,
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.sendAddresslist = rs.result.page.list;
				$scope.page.pageNumber = rs.result.page.pageNumber;
				$scope.page.pageSize = rs.result.page.pageSize;
				$scope.page.totalRow = rs.result.page.totalRow;
				$scope.page.totalPage = rs.result.page.totalPage;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	});
	

	$scope.sendAddressEdit = function(id){
		$state.go("9610_sendAddressDetail", {
			sendAddressID : id
		});
	}
	
	$scope.sendAddressDel = function(id){
		layer.confirm('确定要删除？', {
            btn: ['确定','取消'] //按钮
	    }, function(){
	    	$http({
				method : "post",
				url : "9610/delSendAddressItem",
				data : {sendAddressID:id}
			}).success(function(rs, status, headers, config) {
				if (rs.code == 0) {
	   				 layer.msg('删除成功',{icon: 1},location.reload());
	   			} else {
	   				layer.msg(rs.errmsg);
	   			}
			}).error(function(rs, status, headers, config) {
				layer.msg("删除收件人地址信息出错");
			});
	    },function(){
	    	
	    });
	}
	
	function getList(){
		$http({
			method : "post",
			url : "9610/getSendAddressList",
			data : {
				"pageNumber" : $scope.page.pageNumber,
				"pageSize" : $scope.page.pageSize,
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.sendAddresslist = rs.result.page.list;
				$scope.page.pageNumber = rs.result.page.pageNumber;
				$scope.page.pageSize = rs.result.page.pageSize;
				$scope.page.totalRow = rs.result.page.totalRow;
				$scope.page.totalPage = rs.result.page.totalPage;
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
});