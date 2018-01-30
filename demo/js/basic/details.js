myApp.controller("BasicDetailsCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 0;
	$scope.ckNav("basic_list");
	tabSelect();
	$scope.initPage = function() {
		$scope.$emit("checkCompany", "跟踪基础服务订单");
	}
	
	$scope.$on("checkCompanyEnd", function(e, data) {
		$http({
			method : "post",
			url : "uc/basic/getDetail",
			params : {
				orderId : $state.params.id
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.basicDetail = rs.result.basicDetail;
				$scope.goodsList = rs.result.goodsList;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	});
	
	
	$scope.toUpdate=function(id){
		var url;
			url = "basic_update";
		$state.go(url, {
			id : id
		});
		
		
	}
	$scope.toCopy=function(id){
		var url;
			url = "basic_apply";
		$state.go(url, {
			id : id
		});
		
		
	}
    $scope.goodDetails = function(row) {
        $scope.goods = row;
        layer.open({
            type : 1,
            skin : "layui-layer-rim",
            area : [ "90%", "90%" ],
            title : [ "商品详情", "font-size:medium;" ],
            content : $("#goodDetails")
        });
    };

	$scope.trackingImg = function(index, first, last) {
		if (first) {
			$scope.tracking_img[index] = "img/uc/tracking_end.png";
		} else if (last) {
			$scope.tracking_img[index] = "img/uc/tracking_fir.png";
		} else {
			$scope.tracking_img[index] = "img/uc/tracking_mid.png";
		}
	}

	$scope.colClass = function(first, last) {
		if (first) {
			return "text-blue";
		}
		if (last) {
			return "text-yellow";
		}
	}
	$scope.bread = function() {
		$state.go("basic_list");
	}
});