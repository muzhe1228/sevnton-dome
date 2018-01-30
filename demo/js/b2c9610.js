// var myApp = angular.module("myApp", [ 'ui.router' ]);
// myApp.directive("ngRepeatFinish", function() {
// 	return {
// 		link : function(scope, element, attr) {
// 			if (scope.$last == true) {
// 				scope.$eval(attr.ngRepeatFinish)
// 			}
// 		}
// 	}
// })
// myApp.config(function($stateProvider, $urlRouterProvider) {
// 	$stateProvider.state("9610_orderlist", {
// 		url : "/9610_orderlist",
// 		controller : "9610OrderListCtl",
// 		templateUrl : "page/9610/my_order.html"
// 	}).state("9610_chargeback", {
// 		url : "/9610_chargeback",
// 		controller : "9610ChargeBackCtl",
// 		templateUrl : "page/9610/my_chargeback.html"
// 	}).state("9610_batchexport", {
// 		url : "/9610_batchexport",
// 		controller : "9610BatchExportCtl",
// 		templateUrl : "page/9610/batch_Dr.html"
// 	}).state("9610_balance", {
// 		url : "/9610_balance",
// 		controller : "9610BalanceCtl",
// 		templateUrl : "page/9610/my_balance.html"
// 	}).state("9610_itemlist", {
// 		url : "/9610_itemlist",
// 		controller : "9610ItemListCtl",
// 		templateUrl : "page/9610/shangpinMsg.html"
// 	}).state("9610_sendaddress", {
// 		url : "/9610_sendaddress",
// 		controller : "9610SendAddressCtl",
// 		templateUrl : "page/9610/my_address.html"
// 	}).state("9610_reciveaddress", {
// 		url : "/9610_reciveaddress",
// 		controller : "9610ReciveAddressCtl",
// 		templateUrl : "page/9610/my_shouaddress.html"
// 	}).state("9610_itemDetail", {
// 		url : "/9610_itemDetail?itemID",
// 		controller : "9610ItemDetailCtl",
// 		templateUrl : "page/9610/itemDetail.html"
// 	}).state("9610_recAddressDetail", {
// 		url : "/9610_recAddressDetail?recAddressID",
// 		controller : "9610ReciveAddressDetailCtl",
// 		templateUrl : "page/9610/recAddressDetail.html"
// 	}).state("9610_sendAddressDetail", {
// 		url : "/9610_sendAddressDetail?sendAddressID",
// 		controller : "9610SendAddressDetailCtl",
// 		templateUrl : "page/9610/sendAddressDetail.html"
// 	})
// });

// myApp.filter('htmlContent', [ '$sce', function($sce) {
// 	return function(input) {
// 		return $sce.trustAsHtml(input);
// 	}
// } ]);
//
// function msg(errmsg) {
// 	layer.msg(errmsg, {
// 		btn : "前往登录",
// 		closeBtn : 0,
// 		shade : [ 0.3, '#393D49' ],
// 		time : 0,
// 		yes : function() {
// 			location.href = "./login";
// 		}
// 	});
// }

myApp.controller("b2c9610Ctl", function($scope, $http, $rootScope) {
	// $scope.ckNav = function(p) {
	// 	$scope.sel = p;
	// }
	//
	// $scope.selMenu = function(p) {
	// 	if ($scope.sel == p) {
	// 		return "active_color";
	// 	}
	// 	return "";
	// }
    $rootScope.indexID = 1;
    $scope.ckNav("b2c9610");
	$scope.$on("checkLogin", function(e, data) {
		e.stopPropagation();
		$http({
			method : "post",
			url : "usercenter/getLoginInfo"
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.loginInfo = rs.result;
				if (!$scope.loginInfo) {
					msg("登录后才能" + data + "！");
					return;
				}
				$scope.$broadcast("checkLoginEnd");
			} else {
				msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			msg("页面信息取得时发生系统异常");
		});
	});
	
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