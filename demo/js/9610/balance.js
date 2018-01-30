myApp.controller("9610BalanceCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 1;
    $scope.ckNav("9610_all");
	$scope.initPage = function() {
		$scope.$emit("checkLogin", "查看我的信息");
	}
	
	$scope.$on("checkLoginEnd", function(e, data) {
		$http({
			method : "post",
			url : "9610/initBlance",
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.payList = rs.result.payList;
				$scope.loginUser = rs.result.loginUser;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	});
	$scope.payDlghtml = $('#payDlg').html();
	$('#payDlg').remove();
	$scope.topay = function(){
		layer.open({
			type : 1,
			title : '充值',
			area : [ '300px', '170px' ],
			content : $scope.payDlghtml
		});
	}
	$(document).on( "click", ".btnPay", function() {
		if(typeof($('#payPrice').val())!=undefined&&$('#payPrice').val()>0){
			location.href = "9610/pay?totalFee="+ $('#payPrice').val();
		}
		/* $http({
				method : "post",
				url : "9610/pay",
				data:{
					totalFee:$("#payPrice").val()
				},
			}).success(function(rs, status, headers, config) {
				if (rs.code == 0) {
					debugger;
				} else {
					layer.msg(rs.errmsg);
				}
			}).error(function(rs, status, headers, config) {
				layer.msg("页面信息取得时发生系统异常");
			});*/
		});
});