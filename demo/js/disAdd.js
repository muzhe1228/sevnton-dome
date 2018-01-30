angular.module("myApp", []).controller("DisAddCtl",
function($scope, $http, $sce, $timeout) {
        $scope.count = 50;
        $scope.tolCount = function () {
            console.log($scope.disQues.disTitle.length);
            $scope.count = 50 - $scope.disQues.disTitle.length;
        };
    $scope.logo_size = "公共服务";
    $scope.logo_href = "./dis";
	$scope.init = function(){
		$http({
			method : "post",
			url : "dis/getAllCategorList",
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.allCategory = rs.result.allCategory;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});	
	}
	
	$scope.save = function(){
		if(!$scope.disQues){
			$scope.error="内容不能为空";
			return;
		}
		if (!$scope.disQues.disTitle) {
			$scope.error="问题必须填写";
			return;
		}
		if (!$scope.disQues.categoryID) {
			$scope.error="请选择分类";
			return;
		}
		if (!$scope.disQues.disContent) {
			$scope.error="问题具体描述必须填写";
			return;
		}
		$http({
			method : "post",
			url : "dis/addDisQues",
			data : $scope.disQues,
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				layer.msg("恭喜您提交成功");
				var timer = $timeout(
                    function() {
                    	location.href="dis";
                    },
                    2000
                );
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});	
	}
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
