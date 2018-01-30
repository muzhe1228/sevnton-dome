angular.module("myApp", []).controller("RegisterCtl", function($scope, $http) {
    $scope.logo_size = "跨境贸易综合服务平台"
	$scope.info = {
		identity : "1"
	}

	$scope.init = function() {
		$http({
			method : "post",
			url : "register/init"
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.content = rs.result;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	};

	$scope.read = function() {
		layer.open({
			type : 1,
			skin : "layui-layer-rim",
			area : [ "1000px", "600px" ],
			title : [ "圣云通注册协议", "font-size:medium;" ],
			content : $scope.content,
			btn : "已阅读并同意协议",
			yes : function(index, layero) {
				$scope.$apply(function() {
					$scope.info.readed = true;
				});
				layer.close(index);
			}
		});
	};

	$scope.register = function() {
		if ($scope.info.identity == '1' && !$scope.info.license) {
			layer.msg("请先上传营业执照");
			return;
		}
		$("form").ajaxSubmit(function() {
			var load = loadJava();
			$http({
				method : "post",
				url : "uc/auth/register",
				data : $scope.info
			}).success(function(rs, status, headers, config) {
				layer.close(load);
				if (rs.code == 0) {
					location.href = "active?id=" + $scope.info.userId;
				} else {
					layer.msg(rs.errmsg);
				}
			}).error(function(rs, status, headers, config) {
				layer.close(load);
				layer.msg("用户注册时发生系统异常");
			});
		});
	};

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