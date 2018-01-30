myApp.controller("MyEditCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 0;
	$scope.ckNav("my_info");
	$scope.initPage = function() {
		$scope.$emit("checkLogin", "编辑我的信息");
	}

	$scope.$on("checkLoginEnd", function(e, data) {
		dataValidate();
		$scope.info = $.extend(true, {}, $scope.loginInfo.attrs);
	});

	$scope.chgIdentity = function() {
		dataValidate();
		if ($scope.info.identity == '1') {
			layui.use('upload', function() {
				layui.upload({
					url : 'uploadLicense',
					success : function(res) {
						if (res.code == 0) {
							$scope.$apply(function() {
								$scope.info.license = res.result.url;
							});
						} else {
							layer.msg(res.errmsg);
						}
					}
				});
			});
		}
	};

	$scope.edit = function() {
		if ($scope.info.identity == '1' && !$scope.info.license) {
			layer.msg("请先上传营业执照");
			return;
		}
		$("form").ajaxSubmit(function() {
			var load = loadJava();
			$http({
				method : "post",
				url : "uc/user/edit",
				data : $scope.info
			}).success(function(rs, status, headers, config) {
				layer.close(load);
				if (rs.code == 0) {
					$state.go("my_info");
				} else {
					layer.msg(rs.errmsg);
				}
			}).error(function(rs, status, headers, config) {
				layer.close(load);
				layer.msg("编辑信息时发生系统异常");
			});
		});
	}

	$scope.bread = function() {
		$state.go("my_info");
	}
});