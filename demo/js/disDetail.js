var myApp = angular.module("myApp", []);
/**
 * filter 自定义筛选
 */
angular.module('ng').filter('cut', function () {
    return function (value, wordwise, max) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }
        // || ' …'
        return value;
    };
});

myApp.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
myApp.controller("DisDetailCtl",
    function ($scope, $http, $sce, $timeout) {
        $scope.logo_size = "公共服务";
        $scope.logo_href = "./dis";
        $scope.disReplyAn = {}
        $scope.page = {
            pageNumber: 1,
            pageSize: 10,
            totalRow: 0,
            totalPage: 0
        };
        var disID = GetQueryString("disID");
        var disType = GetQueryString("disType");
        var isSlove = GetQueryString("isSlove");
        $scope.init = function () {
            $http({
                method: "post",
                url: "dis/getDisQuesDetail",
                params: {
                    disID: disID,
                    disType: disType,
                    isSlove: isSlove,
                }
            }).success(function (rs, status, headers, config) {
                if (rs.code == 0) {
                    rs.result.DisQues.attrs.disContent = $sce.trustAsHtml(rs.result.DisQues.attrs.disContent);
                    $scope.DisQues = rs.result.DisQues;
                    $scope.disType = disType;
                    $scope.disID = disID;
                    $scope.isSlove = isSlove;
                    $http({
                        method: "post",
                        url: "dis/getDisReplyListByDisID",
                        params: {
                            disID: disID,
                            "pageNumber": $scope.page.pageNumber,
                            "pageSize": $scope.page.pageSize,
                        }
                    }).success(function (rs1) {
                        if (rs1.code == 0) {
                            $scope.DisReplyList = rs1.result.DisReplyList.list;
                            console.log($scope.DisReplyList)
                            $scope.page = rs1.result.DisReplyList;
                            //右边的待回答问题
                            $http({
                                method: "post",
                                url: "dis/getDisQuesList",
                                data: {
                                    "pageNumber": 1,
                                    "pageSize": 10,
                                }
                            }).success(function (rs2, status, headers, config) {
                                if (rs2.code == 0) {
                                    $scope.DisQuesList = rs2.result.DisQuesList;
                                } else {
                                    layer.msg(rs2.errmsg);
                                }
                            })

                        } else {
                            layer.msg(rs1.errmsg);
                        }
                    }).error(function (rs1) {
                        layer.msg("查询回复失败");
                    });
                } else {
                    layer.msg(rs.errmsg);
                }
            }).error(function (rs, status, headers, config) {
                layer.msg(rs.errmsg);
            });
        }
        //提交回答
        $scope.saveAn = function () {
            if (!$scope.disReplyAn) {
                $scope.error = "内容必须填写";
                return;
            }
            if (!$scope.disReplyAn.replyContent) {
                $scope.error = "内容必须填写";
                return;
            }
            $http({
                method: "post",
                url: "dis/addDisReply",
                data: {
                    disID: disID,
                    replyContent: $scope.disReplyAn.replyContent,
                }
            }).success(function (rs, status, headers, config) {
                if (rs.code == 0) {
                    layer.msg("回复成功");
                    var timer = $timeout(
                        function () {
                            location.reload();
                        },
                        2000
                    );

                } else {
                    layer.msg(rs.errmsg);
                }
            }).error(function (rs, status, headers, config) {
                layer.msg("页面信息取得时发生系统异常");
            });
        }

        //回复点赞
        var timeoutflag = null;
        $scope.addReplyUpvote = function () {
            var replyID = this.disReply.attrs.reply_id;
            $scope.upvoteCount = this.disReply.attrs.upvote_count++;
            if (timeoutflag != null) {
                clearTimeout(timeoutflag);
            }
            timeoutflag = setTimeout(function () {
                $http({
                    method: "post",
                    url: "dis/addReplyUpvote",
                    data: {
                        "replyID": replyID,
                        "upvoteCount": $scope.upvoteCount + 1,
                    }
                }).success(function (rs, status, headers, config) {
                    if (rs.code == 0) {
                        layer.msg("点赞成功");
                    } else {
                        layer.msg(rs.errmsg);
                    }
                }).error(function (rs, status, headers, config) {
                    layer.msg("提交回复点赞异常");
                });
            }, 1000);
        }
        //打开评论
        $(document).on('click', '.pingLun', function () {
            $(this).parents(".WM_daAn_PL").find(".pingLun_kuang").addClass("a");
            $(this).parents(".WM_daAn_PL").find(".pingLun_kuang").slideDown();
            $(".pingLun_kuang").not(".a").slideUp();
            $(this).parents(".WM_daAn_PL").find(".pingLun_kuang").removeClass("a");
        });

        //取消评论
        $(document).on('click', ".PL_close", function () {
            $(this).parents(".WM_daAn_PL").find(".pingLun_kuang").slideUp(300)
            $(this).parents(".WM_daAn_PL").find(".pingLun_kuang").slideUp(300);
        });

        //评论提交
        $scope.plSubmit = function () {
            var replyID = this.disReply.attrs.reply_id;
            var replyToName = this.disReply.attrs.reply_user;
            var replyContent = this.disReply.attrs.reply_content_new;
            var disID = this.disReply.attrs.dis_id;
            $http({
                method: "post",
                url: "dis/addDisReply",
                data: {
                    "replyID": replyID,
                    "replyToName": replyToName,
                    "replyContent": replyContent,
                    "disID": disID,
                }
            }).success(function (rs, status, headers, config) {
                if (rs.code == 0) {
                    layer.msg("提交评论成功");
                    var timer = $timeout(
                        function () {
                            location.reload();
                        },
                        2000
                    );
                } else {
                    layer.msg(rs.errmsg);
                }
            }).error(function (rs, status, headers, config) {
                layer.msg("提交评论异常");
            });
        }

        //分页
        function getList() {
            $http({
                method: "post",
                url: "dis/getDisReplyListByDisID",
                data: {
                    "pageNumber": $scope.page.pageNumber,
                    "pageSize": $scope.page.pageSize,
                    "disID": disID
                }
            }).success(function (rs, status, headers, config) {
                if (rs.code == 0) {
                    $scope.DisReplyList = rs.result.DisReplyList.list;
                    $scope.page = rs.result.DisReplyList;
                } else {
                    layer.msg(rs.errmsg);
                }
            }).error(function (rs, status, headers, config) {
                layer.msg("页面信息取得时发生系统异常");
            });
        }

        $scope.next = function () {
            if ($scope.page.totalRow > 0
                && $scope.page.pageSize < $scope.page.totalRow) {
                $scope.page.pageSize += 10;
                getList();
            } else {
                layer.msg("没有更多了");
            }
        };

        $scope.usercenter = function (page) {
            $http({
                method: "post",
                url: "index/checkCompany"
            }).success(function (rs, status, headers, config) {
                if (rs.code == 0) {
                    location.href = "usercenter#/" + page;
                } else {
                    layer.msg(rs.errmsg);
                }
            }).error(function (rs, status, headers, config) {
                layer.msg("确认用户权限时发生系统异常");
            });
        };
    });