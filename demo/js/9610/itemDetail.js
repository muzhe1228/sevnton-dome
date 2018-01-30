myApp.controller("9610ItemDetailCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 1;
    $scope.ckNav("9610_all");
	$scope.initPage = function(){
		$scope.edit = '0';
		if($state.params.itemID){
			$scope.edit = '1';
			$http({
				method : "post",
				url : "9610/getItemDetail",
				data : {
					"itemID" : $state.params.itemID
				}
			}).success(function(rs, status, headers, config) {
				if (rs.code == 0) {
					$scope.b2cItemMsg = rs.result.b2cItemMsg;
				} else {
					layer.msg(rs.errmsg);
				}
			}).error(function(rs, status, headers, config) {
				layer.msg("页面信息取得时发生系统异常");
			});
		}
	}
	
	$scope.updateItem = function(){
		$("#xiugai_SP").checkForm();
		$http({
			method : "post",
			url : "9610/updateItem",
			data : $scope.b2cItemMsg.attrs
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$state.go("9610_itemlist", {
				});
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	}
	
	$scope.saveItem = function(){
		$("#xiugai_SP").checkForm();
		$http({
			method : "post",
			url : "9610/saveItem",
			data : $scope.b2cItemMsg.attrs
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$state.go("9610_itemlist", {
				});
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	}
});


