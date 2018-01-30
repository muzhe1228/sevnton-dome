myApp.controller("9610ReciveAddressDetailCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 1;
    $scope.ckNav("9610_all");
	$scope.initPage = function() {
		$scope.edit = '0';
		if($state.params.recAddressID){
			$scope.edit = '1';
			$http({
				method : "post",
				url : "9610/getRecAddressDetail",
				data : {
					"recAddressID" : $state.params.recAddressID
				}
			}).success(function(rs, status, headers, config) {
				if (rs.code == 0) {
					$scope.b2cRecAddress = rs.result.b2cRecAddress;
				} else {
					layer.msg(rs.errmsg);
				}
			}).error(function(rs, status, headers, config) {
				layer.msg("页面信息取得时发生系统异常");
			});
		}
	}
	$scope.updateRecAddress = function(){
		$("#jia_shoujianren").checkForm();
		$http({
			method : "post",
			url : "9610/updateRecAddress",
			data : $scope.b2cRecAddress.attrs
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$state.go("9610_reciveaddress", {
				});
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	}
	
	$scope.saveRecAddress = function(){
		$("#jia_shoujianren").checkForm();
		$http({
			method : "post",
			url : "9610/saveRecAddress",
			data : $scope.b2cRecAddress.attrs
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$state.go("9610_reciveaddress", {
				});
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	}
	
});