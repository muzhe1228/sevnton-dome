myApp.controller("MyMessageInfoCtl", function ($rootScope,$scope, $http, $state) {
    $rootScope.indexID = 0;
    $scope.ckNav("my_messageInfo");
    $scope.page = {
        pageNumber: 1,
        pageSize: 5,
        totalRow: 0,
        totalPage: 0
    }
    $scope.page1 = {
        pageNumber: 1,
        pageSize: 5,
        totalRow: 0,
        totalPage: 0
    }
    $scope.initPage = function() {
        $http({
            method: "post",
            url: "usercenter/getLoginInfo"
        }).success(function (rs, status, headers, config) {
            if (rs.code == 0) {
                $scope.loginInfo = rs.result;
                if (!$scope.loginInfo) {
                    msg("登录后才能" + data + "！");
                    return;
                }else {
                    ByUser(rs.result.attrs.id)
                    ByReplyUser (rs.result.attrs.id)
                }
            } else {
                msg(rs.errmsg);
            }
        }).error(function (rs, status, headers, config) {
            msg("页面信息取得时发生系统异常");
        });
    }
    function ByUser(id) {
        $http({
            method: "post",
            url: "dis/getDisListByUser",
            data: {
                'creator': id,
                "pageNumber": $scope.page1.pageNumber,
                "pageSize": $scope.page1.pageSize,

            }
        }).success(function (rs, status, headers, config) {
            if (rs.code == 0) {
                $scope.page1.pageNumber = rs.result.disListByUser.pageNumber;
                $scope.page1.pageSize = rs.result.disListByUser.pageSize;
                $scope.page1.totalPage = rs.result.disListByUser.totalPage;
                $scope.page1.totalRow = rs.result.disListByUser.totalRow;
                $scope.disListByUser = rs.result.disListByUser.list;

            } else {

                msg(rs.errmsg);
            }
        }).error(function (rs, status, headers, config) {
            msg("页面信息取得时发生系统异常");
        });
    }
    function ByReplyUser (id) {
        $http({
            method: "post",
            url: "dis/getReplyListByReplyUser",
            data:{
                'replyUser':id,
                "pageNumber" : $scope.page.pageNumber,
                "pageSize" : $scope.page.pageSize,

            }
        }).success(function (rs, status, headers, config) {
            if (rs.code == 0) {
                $scope.page.pageNumber = rs.result.replyListByUser.pageNumber;
                $scope.page.pageSize = rs.result.replyListByUser.pageSize;
                $scope.page.totalPage = rs.result.replyListByUser.totalPage;
                $scope.page.totalRow = rs.result.replyListByUser.totalRow;
                $scope.replyListByUser = rs.result.replyListByUser.list;
            } else {
                msg(rs.errmsg);
            }
        }).error(function (rs, status, headers, config) {
            msg("页面信息取得时发生系统异常");
        });
    }
    $scope.previous = function(id,clas) {
        if (clas == 'bottom'){
            if ($scope.page.totalRow > 0 && $scope.page.pageNumber > 1) {
                $scope.page.pageNumber -= 1;
                ByReplyUser(id)
            }
        }else {
            if ($scope.page1.totalRow > 0 && $scope.page1.pageNumber > 1) {
                $scope.page1.pageNumber -= 1;
                ByUser(id)
            }
        }

    };
    $scope.next = function(id,clas) {
        if (clas == 'bottom'){
            if ($scope.page.totalRow > 0
                && $scope.page.pageNumber < $scope.page.totalPage) {
                $scope.page.pageNumber += 1;
                ByReplyUser(id)

            }
        }else {
            if ($scope.page1.totalRow > 0
                && $scope.page1.pageNumber < $scope.page.totalPage) {
                $scope.page1.pageNumber += 1;
                ByUser(id)

            }
        }

    };
    $scope.first = function(id,clas) {
        if (clas == 'bottom'){
            if ($scope.page.totalRow > 0 && $scope.page.pageNumber > 1) {
                $scope.page.pageNumber = 1;
                ByReplyUser(id)

            }
        }else {
            if ($scope.page1.totalRow > 0 && $scope.page1.pageNumber > 1) {
                $scope.page1.pageNumber = 1;
                ByUser(id)

            }
        }

    };
    $scope.last = function(id,clas) {
        if (clas == 'bottom'){
            if ($scope.page.totalRow > 0
                && $scope.page.pageNumber < $scope.page.totalPage) {
                $scope.page.pageNumber = $scope.page.totalPage;
                ByReplyUser(id)

            }
        }else {
            if ($scope.page1.totalRow > 0
                && $scope.page1.pageNumber < $scope.page.totalPage) {
                $scope.page1.pageNumber = $scope.page1.totalPage;
                ByUser(id)

            }
        }

    };

});