myApp.controller("BasicConfirmCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 0;
	$scope.ckNav("basic_list");
	$scope.step = 1;

	$scope.initPage = function() {
		$scope.$emit("checkCompany", "跟踪基础服务订单");
	}

	$scope.$on("checkCompany", function(e, data) {
		$http({
			method : "post",
			url : "uc/basic/getDetail",
			params : {
				orderId : $state.params.id
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.info = rs.result.basicDetail;
				$scope.goods = rs.result.goodsList;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	});

	$scope.activeClass = function(flag) {
		if (flag) {
			return "active";
		}
	}

	$scope.next2 = function() {
		$scope.step = 2;
	}
	$scope.prev1 = function() {
		$scope.step = 1;
	}
	$scope.next3 = function() {
		$scope.step = 3;
	}
	$scope.prev2 = function() {
		$scope.step = 2;
	}
	$scope.next4 = function() {
		$scope.step = 4;
	}
	$scope.prev3 = function() {
		$scope.step = 3;
	}
	$scope.confirmed = function() {
		var load = loadJava();
		$http({
			method : "post",
			url : "uc/basic/confirmed",
			params : {
				orderId : $scope.info.attrs.id
			}
		}).success(function(rs, status, headers, config) {
			layer.close(load);
			if (rs.code == 0) {
				$state.go("basic_list");
			} else if (rs.code == -1) {
				var err = layer.msg(rs.errmsg, {
					btn : "前往订单跟踪列表",
					closeBtn : 0,
					shade : [ 0.3, '#393D49' ],
					time : 0,
					yes : function() {
						layer.close(err);
						$state.go("basic_list");
					}
				});
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.close(load);
			layer.msg("确认订单时发生系统异常");
		});
	}

	$scope.tabFinish = function() {
		$('.tab .tab-nav li').each(function() {
			var e = $(this);
			var trigger = e.closest('.tab').attr("data-toggle");
			if (trigger == "hover") {
				e.mouseover(function() {
					$showtabs(e);
				});
				e.click(function() {
					return false;
				});
			} else {
				e.click(function() {
					$showtabs(e);
					return false;
				});
			}
		});
		$.fn.ajaxSubmit = function(fn) {
			$(this).find('input[data-validate],textarea[data-validate],select[data-validate]').trigger("blur");
			$(this).find('input[placeholder],textarea[placeholder]').each(function() {
				$hideplaceholder($(this));
			});
			var numError = $(this).find('.check-error').length;
			if (numError) {
				$(this).find('.check-error').first().find(
						'input[data-validate],textarea[data-validate],select[data-validate]').first().focus().select();
				return false;
			}
			if (fn && typeof fn == "function") {
				fn()
			}
		};
		$showtabs = function(e) {
			var detail = e.children("a").attr("href");
			e.closest('.tab .tab-nav').find("li").removeClass("active");
			e.closest('.tab').find(".tab-body .tab-panel").removeClass("active");
			e.addClass("active");
			$(detail).addClass("active");
		};
	}
	$scope.bread = function() {
		$state.go("basic_list");
	}
});