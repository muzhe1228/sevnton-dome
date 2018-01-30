angular.module("myApp", []).controller("RegainedCtl", function($scope, $http) {
    $scope.logo_size = "跨境贸易综合服务平台"
	$scope.reset = function() {
		$("form").ajaxSubmit(function() {
			var load = loadJava();
			$http({
				method : "post",
				url : "uc/auth/regained",
				data : $scope.info
			}).success(function(rs, status, headers, config) {
				layer.close(load);
				if (rs.code == 0) {
					$scope.info = {};
					$scope.error = null;
					$scope.success = "重置密码已成功发送到您的邮箱，请前往邮箱确认。";
				} else {
					$scope.success = null;
					$scope.error = rs.errmsg;
				}
			}).error(function(rs, status, headers, config) {
				layer.close(load);
				layer.msg("重置密码时发生系统异常");
			});
		});
	};

	$scope.backHome = function() {
		location.href = "./";
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
	$scope.up=function () {
        var fd = new FormData();
        fd.append("upload", 1);
        fd.append("upfile", $("#upfile").get().files);
        console.log(fd);
        $.ajax({
            url: "uploadLicense",
            type: "POST",
            processData: false,
            contentType: false,
            data: fd,
            success: function(d) {
                console.log(d);
            }
    });
	}

});