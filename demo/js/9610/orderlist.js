myApp.controller("9610OrderListCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 1;
	$scope.ckNav("9610_all");
	layui.use("laydate");
	$scope.page = {
			pageNumber : 1,
			pageSize : 20,
			totalRow : 0,
			totalPage : 0
	};
	$scope.order = {
		logistics_id:"",	
		out_no:"",
		from_date:"",
		end_date:"",
	}
	$scope.initPage = function() {
		$scope.$emit("checkLogin", "查看我的信息");
	}
	$scope.$on("checkLoginEnd", function(e, data) {
		$scope.all();
	});
	$scope.all = function(){
		$scope.searched = false;
		$scope.srhKey = null;
		$http({
			method : "post",
			url : "9610/getOrderList",
			data : {
				"pageNumber" : $scope.page.pageNumber,
				"pageSize" : $scope.page.pageSize,
				"logistics_id":$scope.order.logistics_id,
				"out_no":$scope.order.out_no,
				"from_date":$("#startDate").val(),
				"end_date":$("#endDate").val(),
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.orderlist = rs.result.page.list;
				$scope.page.pageNumber = rs.result.page.pageNumber;
				$scope.page.pageSize = rs.result.page.pageSize;
				$scope.page.totalRow = rs.result.page.totalRow;
				$scope.page.totalPage = rs.result.page.totalPage;
				$scope.logisticsProductList = rs.result.logisticsProductList;
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
	
	$scope.orderDel = function(id){
		  layer.confirm('确定要删除？', {
	            btn: ['确定','取消'] //按钮
	        }, function(){
	        	$http({
	    			method : "post",
	    			url : "9610/delOrder",
	    			data : {orderID:id}
	    		}).success(function(rs, status, headers, config) {
	    			if (rs.code == 0) {
	    				 layer.msg('删除成功',{icon: 1},location.reload());
	    			} else {
	    				layer.msg(rs.errmsg);
	    			}
	    		}).error(function(rs, status, headers, config) {
	    			layer.msg("删除订单信息出错");
	    		});
	        }, function(){
	        	
	        });
	}

	function getList(){
		$http({
			method : "post",
			url : "9610/getOrderList",
			data : {
				"pageNumber" : $scope.page.pageNumber,
				"pageSize" : $scope.page.pageSize,
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.itemlist = rs.result.page.list;
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
	
	$scope.details = function(id) {
		$state.go("agent_details", {
			id : id
		});
	}
});