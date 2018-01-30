myApp.controller("9610BatchExportCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 1;
	$scope.ckNav("9610_all");
	$scope.exportop = {fileName:""};
	$scope.initPage = function() {
		$scope.$emit("checkLogin", "查看我的信息");
	}
	$scope.$on("checkLoginEnd", function(e, data) {
		$http({
			method : "post",
			url : "9610/initExportOrderPage"
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.logisticsProductList = rs.result.logisticsProductList;
				$scope.logisticsSupplierList = rs.result.logisticsSupplierList;
				$scope.logisticsInventoryList = rs.result.logisticsInventoryList;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
		
		layui.use('upload', function(){
	    	layui.upload({
	  		  url: '9610/upload'
	  		  ,success: function(res){
	  			if (res.code == 0) {
	  				var fileName = res.result.result.filePath;
	  				$("#fileNameID").text(fileName);
					$scope.exportop.fileName = res.result.result.filePath;
				} else {
					layer.msg(res.errmsg);
				}
	  		  }
	  		});
	    });
	});
	
	$(".batch_Dr_downlond").click(function(){
		location.href="./page/9610/order_model.xls"
	});
	$scope.orderExport = function() {
		if(!$scope.exportop.fileName){
			layer.msg("请选择导入文件");
			return;
		}
        var upLoa = layer.load(1, {
            shade: [0.3,'#000']
        });
		$http({
			method : "post",
			url : "9610/exportOrder",
			data:$scope.exportop,
			}).success(function(rs, status, headers, config) {
				if (rs.code == 0) {
                    layer.close(upLoa);
					layer.msg('导入成功',{icon: 1},$state.go("9610_orderlist"));
				} else {
                    layer.close(upLoa);
                    layer.msg(rs.errmsg);
				}
			}).error(function(rs, status, headers, config) {
				layer.msg("页面信息取得时发生系统异常");
			});
	}
});