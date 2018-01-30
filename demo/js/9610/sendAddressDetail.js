myApp.controller("9610SendAddressDetailCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 1;
    $scope.ckNav("9610_all");
	$scope.initPage = function() {
		$scope.edit = '0';
		if($state.params.sendAddressID){
			$scope.edit = '1';
			$http({
				method : "post",
				url : "9610/getSendAddressDetail",
				data : {
					"sendAddressID" : $state.params.sendAddressID
				}
			}).success(function(rs, status, headers, config) {
				if (rs.code == 0) {
					$scope.b2cSendAddress = rs.result.b2cSendAddress;
				} else {
					layer.msg(rs.errmsg);
				}
			}).error(function(rs, status, headers, config) {
				layer.msg("页面信息取得时发生系统异常");
			});
		}
	}
	
	$scope.updateSendAddress = function(){
		$("#jia_jijianran").checkForm();
		$http({
			method : "post",
			url : "9610/updateSendAddress",
			data : $scope.b2cSendAddress.attrs
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$state.go("9610_sendaddress", {
				});
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	}
	
	$scope.saveSendAddress = function(){
		$("#jia_jijianran").checkForm();
		$http({
			method : "post",
			url : "9610/saveSendAddress",
			data : $scope.b2cSendAddress.attrs
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$state.go("9610_sendaddress", {
				});
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	}
});