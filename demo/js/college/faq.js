myApp.controller("CollegeFaqCtl", function($scope, $http, $rootScope) {
	$scope.ckNav("college_faq");

	$scope.page = {
		pageNumber : 1,
		pageSize : 10,
		totalRow : 0,
		totalPage : 0
	};

	// 画面初期化
	$scope.initPage = function() {
		$http({
			method : "post",
			url : "uc/college/initFaq",
			data : {
				"type" : "",
				"keyword" : "",
				"pageNumber" : $scope.page.pageNumber,
				"pageSize" : $scope.page.pageSize,
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.faqTypeList = rs.result.faqTypeList;
				$scope.page = rs.result.page;
				// faq 列表表示flag
				$scope.dispList = true;
			} else {
				layer.msg("系统异常");
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	};

	$scope.selectType = "";
	// 切换faqtype
	$(document).on("click", ".faq_type_li", function() {
		if ($scope.selectType == this.id) {
			return;
		}
		$scope.selectType = this.id;
		$(".faq_type_li").removeClass("active");
		$(this).addClass("active");
		// 1.清空搜索关键字
		$scope.keyword = "";
		$scope.page.keyword = "";
		$scope.page.type = this.id;
		$scope.dispList = true;
		$scope.page.pageNumber = 1;
		// 2.取得当前type的faq
		getList();
	});

	// 根据关键字检索faq
	$scope.search = function() {
		if (!$scope.keyword) {
			return;
		}

		$scope.selectType = "-1";
		$scope.page.type = "";
		$(".faq_type_li").removeClass("active");
		// $(".faq_type_ul .all").addClass("active");
		$scope.page.pageNumber = 1;
		$scope.page.keyword = $scope.keyword;
		getList();
	};

	function getList() {
		$http({
			method : "post",
			url : "uc/college/getFaqList",
			data : {
				"type" : $scope.page.type,
				"keyword" : $scope.page.keyword,
				"pageNumber" : $scope.page.pageNumber,
				"pageSize" : $scope.page.pageSize,
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				var tp = $scope.page.type; 
				var kw = $scope.page.keyword; 
				$scope.page = rs.result.page;
				$scope.page.type = tp;
				$scope.page.keyword = kw;
			} else {
				layer.msg("系统异常");
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	}

	$scope.previous = function() {
		if ($scope.page.totalRow > 0 && $scope.page.pageNumber > 1) {
			$scope.page.pageNumber -= 1;
			getList();
		}
	};
	$scope.next = function() {
		if ($scope.page.totalRow > 0
				&& $scope.page.pageNumber < $scope.page.totalPage) {
			$scope.page.pageNumber += 1;
			getList();
		}
	};
	$scope.first = function() {
		if ($scope.page.totalRow > 0 && $scope.page.pageNumber > 1) {
			$scope.page.pageNumber = 1;
			getList();
		}
	};
	$scope.last = function() {
		if ($scope.page.totalRow > 0
				&& $scope.page.pageNumber < $scope.page.totalPage) {
			$scope.page.pageNumber = $scope.page.totalPage;
			getList();
		}
	};

	// 点击问题
	$(document).on("click", ".faq_li", function() {
		// 1.清空搜索关键字
		$scope.keyword = "";
		// 2.取得当前type的faq
		$scope.dispList = false;
		var faq = getFaq(this.id);
		if (faq != null) {
			$scope.selectQuestion = faq.attrs.question;
			$scope.selectAnswer = faq.attrs.answer;
		}

		$scope.$apply();
	});

	$scope.showFaqList = function() {
		$scope.dispList = true;
	};

	function getFaq(id) {

		var faq;
		if ($scope.page.list) {
			for (var i = 0; i < $scope.page.list.length; i++) {
				if ($scope.page.list[i].attrs.id == id) {
					faq = $scope.page.list[i];
					break;
				}
			}
		}

		return faq;
	}

});