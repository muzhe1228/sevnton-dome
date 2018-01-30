angular.module("myApp", []).controller("ConsultCtl", function($scope, $http, $sce, $timeout) {
	
    $scope.logo_size = "资讯详情"
    $scope.page = {
        pageNumber : 1,
        pageSize : 5,
        totalRow : 0,
        totalPage : 0
    };
    $scope.pageComments = {
            pageNumber : 1,
            pageSize : 5,
            totalRow : 0,
            totalPage : 0
        };
    $scope.comments = {
    		introdPcID:"",	
    		commentsText:""
    } 
    $scope.count = {
    		praiseType:"",
    		likeType:"",
    		likeCount:"",
    		treadCount:""
    } 
	$scope.init = function() {
		$http({
			method : "post",
			url : "consult/init",
			params : {
				id : GetQueryString("id")
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.info = rs.result;
				if ($scope.info) {
					$scope.picUrl = $sce.trustAsResourceUrl($scope.info.attrs.picUrl);
//					$scope.content = $sce.trustAsHtml($scope.info.attrs.content);
//					$scope.name = $scope.info.attrs.name;
					$scope.keyword = $scope.info.attrs.key_word;
					$scope.comments.introdPcID = $scope.info.attrs.id;
					$("meta[name=keywords]").attr("content",$scope.keyword);
					comments();
					likeCount();
				}
				 $http({
			            method : "post",
			            url : "consult/consultList",
			            data : {
			                "pageNumber" : $scope.page.pageNumber,
			                "pageSize" : $scope.page.pageSize,
			            }
			        }).success(function(rs, status, headers, config) {
			        	
			                $scope.pageDefault = rs.result.page;
			        }).error(function(rs, status, headers, config) {
			            layer.msg("页面信息取得时发生系统异常");
			        });
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
		
	
		
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
	
	

	
	$scope.checkLogin = function() {			
		$http({ 
			method : "post",
			url : "usercenter/getLoginInfo",
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
				$scope.loginInfo = rs.result;
				if (!$scope.loginInfo) {
					layer.msg("登录后才能操作！");
					return;
				}else{
					saveComments();
					
				}
				$scope.$broadcast("checkLoginEnd");
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	};
	

	
function saveComments(){
	$http({ 
		method : "post",
		url : "comments/consult/saveComments",
		data : $scope.comments
		
	}).success(function(rs, status, headers, config) {
		if (rs.code == 0) {
			$scope.loginInfo = rs.result;
			if (!$scope.loginInfo) {
					layer.msg("评论失败！");
				return;
			}else{
				$scope.comments.commentsText = "";
				layer.msg("评论成功！");
				comments ();
				
			}
			$scope.$broadcast("checkLoginEnd");
		} else {
			layer.msg(rs.errmsg);
		}
	}).error(function(rs, status, headers, config) {
		layer.msg("页面信息取得时发生系统异常");
	});
	
}

	
	function comments () {
	    $http({
	        method : "post",
	        url : "comments/consult/commentsPageList",
	        data : {
	            "pageNumber" : $scope.pageComments.pageNumber,
	            "pageSize" : $scope.pageComments.pageSize,
	            "introdPcID":$scope.comments.introdPcID,
	        }
	    }).success(function(rs, status, headers, config) {
	            $scope.pageComments = rs.result.page;
	            
	    }).error(function(rs, status, headers, config) {
	        layer.msg("页面信息取得时发生系统异常");
	    });
	};	
	
	function getListComments(introdPcID){
		$http({
			method : "post",
			url : "comments/consult/commentsPageList",
			data : {
				"pageNumber" : $scope.pageComments.pageNumber,
				"pageSize" : $scope.pageComments.pageSize,
				"introdPcID":introdPcID
			}
		}).success(function(rs, status, headers, config) {
			if (rs.code == 0) {
                $scope.pageComments = rs.result.page;
                $scope.introdPcID=introdPcID;
			} else {
				layer.msg(rs.errmsg);
			}
		}).error(function(rs, status, headers, config) {
			layer.msg("页面信息取得时发生系统异常");
		});
	}
	
	$scope.next = function(introdPcID) {
		
		if ($scope.pageComments.totalRow > 0&& $scope.pageComments.pageSize < $scope.pageComments.totalRow) {
			$scope.pageComments.pageSize += 5;
			getListComments(introdPcID);
		}
	};
	

	
	
	function likeCount () {
	    $http({
	        method : "post",
	        url : "consult/findLike",
	        data : {
	            "introdID" :$scope.comments.introdPcID
	        }
	    }).success(function(rs, status, headers, config) {
	    	$scope.count=rs.result;
	    	if(rs.result.likeCount.attrs.like_count==null){
	    		$scope.count.likeCount=0;
	    	}else{
	    		$scope.count.likeCount=rs.result.likeCount.attrs.like_count;
	    	}
	    	
	    	if(rs.result.treadCount.attrs.tread_count==null){
	    		$scope.count.treadCount=0;
	    	}else{
	    		
	    		$scope.count.treadCount=rs.result.treadCount.attrs.tread_count;
	    	}
	    	
	            
	    }).error(function(rs, status, headers, config) {
	        layer.msg("页面信息取得时发生系统异常");
	    });
	};	
	
	
	
	
	
	
	$scope.like =function () {
	    $http({
	        method : "post",
	        url : "consult/updateLikeCount",
	        data : {
	            "introdID" :$scope.comments.introdPcID
	        }
	    }).success(function(rs, status, headers, config) {
	    	
	    	if (rs.code == 0) {
	    		layer.msg("点赞成功");
	    		likeCount();
			} else {
				layer.msg("点赞失败");
			}
	            
	    }).error(function(rs, status, headers, config) {
	        layer.msg("页面信息取得时发生系统异常");
	    });
	};	
	
	
	$scope.tread = function () {
	    $http({
	        method : "post",
	        url : "consult/updateTreadCount",
	        data : {
	            "introdID" :$scope.comments.introdPcID
	        }
	    }).success(function(rs, status, headers, config) {
	    	if (rs.code == 0) {
	    		layer.msg("吐槽成功");
	    		likeCount();
			} else {
				layer.msg("吐槽失败");
			}
	    	
	    }).error(function(rs, status, headers, config) {
	        layer.msg("页面信息取得时发生系统异常");
	    });
	};	
	
	
});
