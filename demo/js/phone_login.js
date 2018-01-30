angular.module("myApp", []).controller("phoneLoginCtl",function($scope, $http, $sce, $timeout) {
		
	 $scope.sendVerifCode = function() {
			 if (typeof($scope.auth) == "undefined"){ 
				 $scope.error = "请输入正确的手机号码";
					return;
			 }
			if(!(/^((\(\d{3}\))|(\d{3}\-))?1[0-9]\d{9}?$/.test($scope.auth.phone_number))){
				$scope.error = "请输入正确的手机号码";
				return;
			}
			if(null==$scope.auth.phone_number){
				$scope.error = "请输入手机号码";
				return;
			}
			var s = $scope.auth.phone_number;
			$(".login form").ajaxSubmit(function() {
				var load = loadJava();
				$http({
					method : "post",
					url : "uc/auth/sendVerifCode",
					params : {phone_number:$scope.auth.phone_number}
				}).success(function(rs, status, headers, config) {
					layer.close(load);
					if (rs.code != 0) {
						$scope.error = rs.errmsg;
					}else{
						$("#sendVerifCode").attr("disabled","disabled");
					}
				}).error(function(rs, status, headers, config) {
					layer.close(load);
					$scope.error = "登录过程中发生系统异常";
				});
			});
		 };
		 
		//登录
	        $scope.login = function() {
				$(".login form").ajaxSubmit(function() {
					var load = loadJava();
					$http({
						method : "post",
						url : "uc/auth/phoneLogin",
						params : $scope.auth
					}).success(function(rs, status, headers, config) {
						layer.close(load);
						if (rs.code == 0) {
							location.href = "./";
						} else {
							$scope.error = rs.errmsg;
						}
					}).error(function(rs, status, headers, config) {
						layer.close(load);
						$scope.error = "登录过程中发生系统异常";
					});
				});
			 };
});