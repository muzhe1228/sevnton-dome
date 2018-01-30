var myApp = angular.module("myApp", []);

myApp.directive("ngRepeatFinish", function() {
	return {
		link : function(scope, element, attr) {
			if (scope.$last == true) {
				scope.$eval(attr.ngRepeatFinish)
			}
		}
	}
})

myApp.controller("IndexCtl", function($scope, $http, $sce,$location) {
	$scope.logo_size = "跨境贸易综合服务平台"
	$scope.init = function() {
		$http({
			method : "post",
			url : "index/init"
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.indexAdvert = rs.result.indexAdvert;
				//$scope.exampleList = rs.result.exampleList;
				//$scope.praiseList = rs.result.praiseList;
				$scope.videoList = rs.result.videoList;
				$scope.bannerList = rs.result.bannerList;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	};
	$(".closeWin").click(function(){
		  $(".floatcss").css('display','none');
	});
	$scope.register = function() {
		$(".showWin form").ajaxSubmit(function() {
			var load = loadJava();
			$http({
				method : "post",
				url : "uc/auth/speedRegister",
				params : $scope.regauth
			}).success(function(rs, status, headers, config) {
				layer.close(load);
				if (rs.code == 0) {
					layer.msg("您已成功申请服务，我们的服务经理将在24小时内电话联系您，请保持电话畅通！");
					$(".floatcss").css('display','none');
				} else {
					$scope.speederror = rs.errmsg;
				}
			}).error(function(rs, status, headers, config) {
				layer.close(load);
				layer.msg("用户注册时发生系统异常");
			});
		});
	};
	$scope.login = function() {
		$(".login form").ajaxSubmit(function() {
			var load = loadJava();
			$http({
				method : "post",
				url : "uc/auth/login",
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

	$("input").keydown(function(event) {
		if (event.keyCode == 13) {
			$scope.login();
		}
	});
	$scope.usercenter = function(page) {
		$http({
			method : "post",
			url : "index/checkCompany"
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				location.href = "usercenter#/" + page;
			} else {
				if(page=="agent_apply"||page=="basic_apply"){
					$(".floatcss").css('display','block');
				}else{
					layer.msg(rs.errmsg);
				}
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("确认用户权限时发生系统异常");
		});
	};
	
	$scope.finance = function() {
		layer.alert("正在开发，敬请期待");
	};

	// $scope.introd = function(sel) {
	// 	location.href = "introd?listslid=" + sel;
	// };
    $scope.introd = function(sel) {
    	if("consult"==sel){
    		 location.href = "consultList";
    	}else{
    		location.href = "introd?sel=" + sel;
    	}
    };

	$scope.bannerFinish = function() {
		carousel();
	}
});