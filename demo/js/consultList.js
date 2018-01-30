var myApp = angular.module("myApp", []);
/**
 * filter 自定义筛选
 */
myApp.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
myApp.controller("ConsultListCtl", function ($scope, $http, $sce, $location, $timeout) {
    $scope.logo_size = "跨境天地";
    var disTitle = GetQueryString("disTitle");
    $scope.disReplyAn = {};
    $scope.initUeditor = function () {
        ueditor()
    }
    $scope.page1 = 5;
    $scope.page2 = 5;
    $scope.page3 = 10;
    $scope.loadMore = false;
    $scope.page = {
        pageNumber: 1,
        pageSize: 5,
        totalRow: 0,
        totalPage: 0
    };
    if (GetQueryString("p_navactive") == null) {
        $scope.p_navactive = 1;
    } else {
        $scope.p_navactive = GetQueryString("p_navactive");
    }
    $scope.init = function () {
        $http({
            method: "post",
            url: "consult/consultList",
            data: {
                "pageNumber": $scope.page.pageNumber,
                "pageSize": $scope.page.pageSize,
            }
        }).success(function (rs, status, headers, config) {
            if (rs.code == 0) {
                var objs = [];
                angular.forEach(rs.result.page.list, function (data, index, array) {
                    array[index].attrs.content = $sce.trustAsHtml(delHtmlTag(array[index].attrs.content));
                    objs[index] = array[index];
                });
                $scope.page.list = objs;
                $scope.page = rs.result.page;
                $scope.pageDefault = rs.result.page;
                $scope.categoryList = rs.result.categoryList;
                $scope.advertMainList = rs.result.advertMainList;
                $scope.advertCenterList = rs.result.advertCenterList;
                $scope.advertLeftList = rs.result.advertLeftList;
                $scope.sel = '';

            } else {
                layer.msg(rs.errmsg);
            }
        }).error(function (rs, status, headers, config) {
            layer.msg("页面信息取得时发生系统异常");
        });
    };
    if ($scope.p_navactive == 1) {
        $scope.getByParam = function (categoryID) {
            $scope.sel = categoryID;
            $scope.page = {
                pageNumber: 1,
                pageSize: 5,
                totalRow: 0,
                totalPage: 0,
                list: []
            };
            $scope.page1 = 5;
            $http({
                method: "post",
                url: "consult/consultList",
                data: {
                    "pageNumber": $scope.page.pageNumber,
                    "pageSize": $scope.page.pageSize,
                    "name": "",
                    "categoryID": categoryID
                }
            }).success(function (rs, status, headers, config) {
                if (rs.code == 0) {

                    var objs = [];
                    angular.forEach(rs.result.page.list, function (data, index, array) {
                        array[index].attrs.content = $sce.trustAsHtml(delHtmlTag(array[index].attrs.content));
                        objs[index] = array[index];
                    });
                    $scope.page.list = objs;
                    $scope.page = rs.result.page;
                    $scope.categoryList = rs.result.categoryList;
                    $scope.categoryID = categoryID;
                } else {
                    layer.msg(rs.errmsg);
                }
            }).error(function (rs, status, headers, config) {
                layer.msg("页面信息取得时发生系统异常");
            });
        };
        $scope.selMenu = function (categoryID) {
            if ($scope.sel == categoryID) {
                return "consulis_active";
            }
            return "";
        }
    } else if ($scope.p_navactive == 2) {
        $scope.disQues ={}
        $scope.cutwrite = null;
        $scope.writeArticle = function (cutCon,btn1,width,height) {
            layer.open({
                btn: [btn1, '取消']
                , yes: function (index, layero) {
                    if (cutCon == 'talkMsg'){
                        $scope.disQues.disContent = getContent();
                        save ();
                    }else {
                        save ()
                    }


                }
                , btn2: function (index, layero) {
                    layer.closeAll();
                },
                type: 1,
                resize:true,
                resizing: function(layero){
                    console.log(layero);
                },
                shadeClose:true,
                area: [width,height],
                maxWidth:'100%',
                title: false,
                maxmin:true,
                content: $("#"+cutCon),
                success: function(layero, index){
                    $scope.disQues = {};
                    $scope.error = null;
                    setContent()
                }
            });
        }
        $scope.page = {
            pageNumber: 1,
            pageSize: 10,
            totalRow: 0,
            totalPage: 0
        };
        liaotian ()
        $scope.count = 50;
        $scope.tolCount = function () {
            $scope.count = 50 - $scope.disQues.disTitle.length;
        };
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
        function save (){
            if(!$scope.disQues){
                $scope.error="内容不能为空";
                $scope.$apply();
                return;
            }
            if (!$scope.disQues.disTitle) {
                $scope.error="问题必须填写";
                $scope.$apply();
                return;
            }
            if (!$scope.disQues.categoryID) {
                $scope.error="请选择分类";
                $scope.$apply();
                return;
            }
            if (!$scope.disQues.disContent) {
                $scope.error="问题具体描述必须填写";
                $scope.$apply();
                return;
            }
            $http({
                method : "post",
                url : "dis/addDisQues",
                data : $scope.disQues,
            }).success(function(rs, status, headers, config) {
                if (rs.code == 0) {
                    layer.msg("恭喜您提交成功");
                    liaotian ()
                } else {
                    layer.msg(rs.errmsg);
                }
            }).error(function(rs, status, headers, config) {
                layer.msg("页面信息取得时发生系统异常");
            });
        }
        function liaotian () {
            $http({
                method: "post",
                url: "dis/disMain",
                data: {
                    "pageNumber": $scope.page.pageNumber,
                    "pageSize": $scope.page.pageSize,
                    "disTitle": disTitle
                }
            }).success(function (rs, status, headers, config) {
                if (rs.code == 0) {
                    $scope.isClass = 1;
                    $scope.DisQuesList = rs.result.DisQuesList;
                    $scope.DisQuesAllList = rs.result.DisQuesAllList;
                    $scope.allCategory = rs.result.allCategory;
                    $scope.consultList = rs.result.consultList
                    $scope.pageNumber = rs.result.pageNumber;
                    $scope.pageSize = rs.result.pageSize;
                    $scope.page.pageNumber = rs.result.DisQuesList.pageNumber;
                    $scope.page.pageSize = rs.result.DisQuesList.pageSize;
                    $scope.page.totalRow = rs.result.DisQuesList.totalRow;
                    $scope.page.totalPage = rs.result.DisQuesList.totalPage;
                    ($scope.page.pageSize < $scope.page.totalRow) ? $scope.loadMore = true : $scope.loadMore = false;
                    layer.closeAll();
                    $scope.error = null
                } else {
                    layer.msg(rs.errmsg);
                }
            }).error(function (rs, status, headers, config) {
                layer.msg("页面信息取得时发生系统异常");
            });
        }
        $scope.orderIs = '-attrs.reply_id';
        $scope.orderFn = function () {
            if ($scope.orderIs == '-attrs.reply_id') {
                $scope.orderIs = 'attrs.reply_id'
            } else {
                $scope.orderIs = '-attrs.reply_id'
            }
        }
        $scope.pagePages = {
            pageNumber: 1,
            pageSize: 5,
            totalRow: 0,
            totalPage: 0
        };
        $scope.pagePage = 5;
        $scope.funDisID = function (id) {
            applyScope(id)
            $scope.nextPage = function (id) {
                if ($scope.pagePages.totalRow > 0
                    && $scope.pagePages.pageSize < $scope.pagePages.totalRow) {
                    $scope.pagePage += 5;
                    pagePage(id)
                } else {
                    layer.msg("到底了...")
                }
            }
        }
        $scope.emoji = function () {
            $(function () {

                $('.emotion').qqFace({

                    id: 'facebox',

                    assign: 'saytext',

                    path: 'vender/qqFace/img/qq/'	//表情存放的路径

                });

                //提交回答
                $scope.saveAn = function (id) {
                    if (!replace_em($("#saytext").val())) {
                        $scope.error = "内容必须填写";
                        alert($scope.error)
                        return;
                    }
                    $http({
                        method: "post",
                        url: "dis/addDisReply",
                        data: {
                            disID: id,
                            replyContent: replace_em($("#saytext").val()),
                        }
                    }).success(function (rs, status, headers, config) {
                        if (rs.code == 0) {
                            layer.msg("回复成功");
                            var timer = $timeout(applyScope(id), 2000);
                            var timer = $timeout($scope.scoll(id), 2000);
                            $scope.disReplyAn.replyContent = '';

                        } else {
                            layer.msg(rs.errmsg);
                        }
                    }).error(function (rs, status, headers, config) {
                        layer.msg("页面信息取得时发生系统异常");
                    });
                }

            });
            //查看结果

            function replace_em(str) {

                str = str.replace(/\</g, '&lt;');

                str = str.replace(/\>/g, '&gt;');

                str = str.replace(/\n/g, '<br/>');

                str = str.replace(/\[em_([0-9]*)\]/g, '<img src="vender/qqFace/img/qq/$1.gif" border="0" />');

                return str;

            }
        }
        $scope.huiFuID = null;
        $scope.huifu = function (id) {
            $scope.huiFuID = id;
        }
        $scope.emoji1 = function () {
            $(function () {

                $('.emotion').qqFace({

                    id: 'facebox',

                    assign: 'huifu',

                    path: 'vender/qqFace/img/qq/'	//表情存放的路径

                });
                //评论提交
                $scope.plSubmit = function (id) {
                    var replyID = this.anwer.attrs.reply_id;
                    var replyToName = this.anwer.attrs.reply_user;
                    var replyContent = replace_em($("#huifu").val());
                    var disID = this.anwer.attrs.dis_id;
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
                            var timer = $timeout(applyScope(id), 2000);
                            var timer = $timeout($scope.scoll(id), 2000);
                            $scope.huiFuID = null;
                            $scope.disReplyAn.reply_content_new = null;
                        } else {
                            layer.msg(rs.errmsg);
                        }
                    }).error(function (rs, status, headers, config) {
                        layer.msg("提交评论异常");
                    });
                }
            });
            //查看结果

            function replace_em(str) {

                str = str.replace(/\</g, '&lt;');

                str = str.replace(/\>/g, '&gt;');

                str = str.replace(/\n/g, '<br/>');

                str = str.replace(/\[em_([0-9]*)\]/g, '<img src="vender/qqFace/img/qq/$1.gif" border="0" />');

                return str;

            }
        }


        function pagePage(id) {
            $http({
                method: "post",
                url: "dis/getDisReplyListByDisID",
                params: {
                    disID: id,
                    "pageNumber": $scope.pagePages.pageNumber,
                    "pageSize": $scope.pagePage,
                }
            }).success(function (rs1) {
                if (rs1.code == 0) {
                    $scope.DisReplyList = rs1.result.DisReplyList.list;
                    console.log($scope.DisReplyList)
                    $scope.disId = id;
                    $scope.pagePages = rs1.result.DisReplyList;
                    emoji()
                } else {
                    layer.msg(rs1.errmsg);
                }
            }).error(function (rs1) {
                layer.msg("查询回复失败");
            });
        }


        var timeoutflag = null;
        $scope.addReplyUpvote = function () {
            var replyID = this.anwer.attrs.reply_id;
            $scope.upvoteCount = this.anwer.attrs.upvote_count++;
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
        function applyScope(id) {
            $http({
                method: "post",
                url: "dis/getDisReplyListByDisID",
                params: {
                    disID: id,
                    "pageNumber": $scope.pagePages.pageNumber,
                    "pageSize": $scope.pagePages.pageSize,
                }
            }).success(function (rs1) {
                if (rs1.code == 0) {
                    $scope.DisReplyList = rs1.result.DisReplyList.list;
                    $scope.disId = id;
                    $scope.pagePages = rs1.result.DisReplyList;
                } else {
                    layer.msg(rs1.errmsg);
                }
            }).error(function (rs1) {
                layer.msg("查询回复失败");
            });
        }
    }


    function delHtmlTag(str, obj) {
        var title = str.replace(/<[^>]+>/g, "");//去掉所有的html标记
        if (title.length > 100) {
            title = title.substring(0, 100);
        }
        return title;
    }

    function getList(categoryID) {
        if (categoryID == 1) {//左侧带图片的资讯加载更多
            $http({
                method: "post",
                url: "consult/consultList",
                data: {
                    "pageNumber": $scope.page.pageNumber,
                    "pageSize": $scope.page1,
                    "categoryID": $scope.sel
                }
            }).success(function (rs, status, headers, config) {
                if (rs.code == 0) {
                    $scope.page = rs.result.page;
                    console.log($scope.page)
                    $scope.categoryList = rs.result.categoryList;
                    var objs = [];
                    angular.forEach(rs.result.page.list, function (data, index, array) {
                        array[index].attrs.content = $sce.trustAsHtml(delHtmlTag(array[index].attrs.content));
                        objs[index] = array[index];
                    });
                    $scope.page.list = objs;
                } else {
                    layer.msg(rs.errmsg);
                }
            }).error(function (rs, status, headers, config) {
                layer.msg("页面信息取得时发生系统异常");
            });
        } else if (categoryID == 2) {//右侧的加载更多
            $http({
                method: "post",
                url: "consult/consultList",
                data: {
                    "pageNumber": $scope.page.pageNumber,
                    "pageSize": $scope.page2,
                }
            }).success(function (rs, status, headers, config) {
                if (rs.code == 0) {
                    $scope.pageDefault = rs.result.page;
                } else {
                    layer.msg(rs.errmsg);
                }
            }).error(function (rs, status, headers, config) {
                layer.msg("页面信息取得时发生系统异常");
            });
        } else if (categoryID == 3) {
            $http({
                method: "post",
                url: "dis/disMain",
                data: {
                    "pageNumber": $scope.page.pageNumber,
                    "pageSize": $scope.page3,
                    "disTitle": disTitle
                }
            }).success(function (rs, status, headers, config) {
                if (rs.code == 0) {
                    $scope.isClass = 1;
                    $scope.DisQuesList = rs.result.DisQuesList;
                    $scope.DisQuesAllList = rs.result.DisQuesAllList;
                    $scope.allCategory = rs.result.allCategory;
                    $scope.consultList = rs.result.consultList
                    $scope.pageNumber = rs.result.pageNumber;
                    $scope.pageSize = rs.result.pageSize;
                    $scope.page.pageNumber = rs.result.DisQuesList.pageNumber;
                    $scope.page.pageSize = rs.result.DisQuesList.pageSize;
                    $scope.page.totalRow = rs.result.DisQuesList.totalRow;
                    $scope.page.totalPage = rs.result.DisQuesList.totalPage;
                    ($scope.page.pageSize < $scope.page.totalRow) ? $scope.loadMore = true : $scope.loadMore = false;
                } else {
                    layer.msg(rs.errmsg);
                }
            }).error(function (rs, status, headers, config) {
                layer.msg("页面信息取得时发生系统异常");
            });
        }
    }

    $scope.next = function (categoryID) {
        if (categoryID == 1) {
            if ($scope.page.totalRow > 0
                && $scope.page.pageSize < $scope.page.totalRow) {
                $scope.page1 += 5;
                console.log($scope.page1)
                console.log($scope.page2)
                getList(categoryID);
            } else {
                layer.msg("到底了...")
            }
        } else if (categoryID == 2) {
            if ($scope.page.totalRow > 0
                && $scope.page.pageSize < $scope.page.totalRow) {
                $scope.page2 += 5;
                getList(categoryID);
            } else {
                layer.msg("到底了...")
            }
        } else if (categoryID == 3) {
            if ($scope.page.totalRow > 0
                && $scope.page.pageSize < $scope.page.totalRow) {
                $scope.page3 += 10;
                getList(categoryID);
            } else {
                layer.msg("到底了...")
            }
        }
    };
    $scope.scoll = function (id) {
        scoll(id)
    }

});
