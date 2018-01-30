var myApp = angular.module("myApp", ['ui.router']);

myApp.directive("ngRepeatFinish", function () {
    return {
        link: function (scope, element, attr) {
            if (scope.$last == true) {
                scope.$eval(attr.ngRepeatFinish)
            }
        }
    }
})

myApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state("agent_apply", {
        url: "/agent_apply",
        controller: "AgentApplyCtl",
        templateUrl: "page/agent/apply.html"
    }).state("agent_list", {
        url: "/agent_list",
        controller: "AgentListCtl",
        templateUrl: "page/agent/list.html"
    }).state("agent_details", {
        url: "/agent_details?id",
        controller: "AgentDetailsCtl",
        templateUrl: "page/agent/details.html"
    }).state("basic_apply", {
        url: "/basic_apply?id",
        controller: "BasicApplyCtl",
        templateUrl: "page/basic/apply.html"
    }).state("basic_list", {
        url: "/basic_list",
        controller: "BasicListCtl",
        templateUrl: "page/basic/list.html"
    }).state("basic_confirm", {
        url: "/basic_confirm?id",
        controller: "BasicConfirmCtl",
        templateUrl: "page/basic/confirm.html"
    }).state("basic_update", {
        url: "/basic_update?id",
        controller: "BasicUpdateCtl",
        templateUrl: "page/basic/update.html"
    }).state("basic_details", {
        url: "/basic_details?id",
        controller: "BasicDetailsCtl",
        templateUrl: "page/basic/details.html"
    }).state("college_video", {
        url: "/college_video",
        controller: "CollegeVideoCtl",
        templateUrl: "page/college/video.html"
    }).state("college_play", {
        url: "/college_play?id",
        controller: "CollegePlayCtl",
        templateUrl: "page/college/play.html"
    }).state("college_faq", {
        url: "/college_faq",
        controller: "CollegeFaqCtl",
        templateUrl: "page/college/faq.html"
    }).state("my_info", {
        url: "/my_info",
        controller: "MyInfoCtl",
        templateUrl: "page/my/info.html"
    }).state("my_user_info", {
        url: "/my_user_info",
        controller: "MyUserInfoCtl",
        templateUrl: "page/my/userInfo.html"
    }).state("my_modify", {
        url: "/my_modify",
        controller: "MyModifyCtl",
        templateUrl: "page/my/modify.html"
    }).state("my_edit", {
        url: "/my_edit",
        controller: "MyEditCtl",
        templateUrl: "page/my/edit.html"
    }).state("my_account", {
        url: "/my_account",
        controller: "MyAccountCtl",
        templateUrl: "page/my/account.html"
    }).state("my_withdraw", {
        url: "/my_withdraw",
        controller: "MyWithdrawCtl",
        templateUrl: "page/my/withdraw.html"
    }).state("my_messageInfo", {
        url: "/my_messageInfo",
        controller: "MyMessageInfoCtl",
        templateUrl: "page/my/messageInfo.html"
    }).state("b2c9610", {
        url: "/b2c9610",
        controller: "b2c9610Ctl",
        templateUrl: "b2c9610.html"
    }).state("9610_orderlist", {
        url: "/9610_orderlist",
        controller: "9610OrderListCtl",
        templateUrl: "page/9610/my_order.html"
    }).state("9610_chargeback", {
        url: "/9610_chargeback",
        controller: "9610ChargeBackCtl",
        templateUrl: "page/9610/my_chargeback.html"
    }).state("9610_batchexport", {
        url: "/9610_batchexport",
        controller: "9610BatchExportCtl",
        templateUrl: "page/9610/batch_Dr.html"
    }).state("9610_balance", {
        url: "/9610_balance",
        controller: "9610BalanceCtl",
        templateUrl: "page/9610/my_balance.html"
    }).state("9610_itemlist", {
        url: "/9610_itemlist",
        controller: "9610ItemListCtl",
        templateUrl: "page/9610/shangpinMsg.html"
    }).state("9610_sendaddress", {
        url: "/9610_sendaddress",
        controller: "9610SendAddressCtl",
        templateUrl: "page/9610/my_address.html"
    }).state("9610_reciveaddress", {
        url: "/9610_reciveaddress",
        controller: "9610ReciveAddressCtl",
        templateUrl: "page/9610/my_shouaddress.html"
    }).state("9610_itemDetail", {
        url: "/9610_itemDetail?itemID",
        controller: "9610ItemDetailCtl",
        templateUrl: "page/9610/itemDetail.html"
    }).state("9610_recAddressDetail", {
        url: "/9610_recAddressDetail?recAddressID",
        controller: "9610ReciveAddressDetailCtl",
        templateUrl: "page/9610/recAddressDetail.html"
    }).state("9610_sendAddressDetail", {
        url: "/9610_sendAddressDetail?sendAddressID",
        controller: "9610SendAddressDetailCtl",
        templateUrl: "page/9610/sendAddressDetail.html"
    });
});

myApp.filter('htmlContent', ['$sce', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
}]);
myApp.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
function msg(errmsg) {
    layer.msg(errmsg, {
        btn: "前往登录",
        closeBtn: 0,
        shade: [0.3, '#393D49'],
        time: 0,
        yes: function () {
            location.href = "./login";
        }
    });
}

myApp.controller("UsercenterCtl", function ($scope, $http, $rootScope) {
    $rootScope.indexID = 0;
    $scope.logo_size = "个人中心"
    dataValidate();
    $scope.openMenu = function (target) {
        var el;
        if ($(target).is("span")) {
            el = $(target).parent();
        } else {
            el = $(target);
        }
        var navChild = $(".nav .nav-child:visible");
        if (navChild[0] != el.next()[0]) {
            navChild.slideUp();
            navChild.prev().children("span").removeClass("icon-angle-down").addClass("icon-angle-up");
            el.next().slideDown();
            el.children("span").removeClass("icon-angle-up").addClass("icon-angle-down");
        }
    }

    $scope.ckNav = function (p) {
        $scope.sel = p;
        var id = "#" + p.split("_")[0];
        if (!$(id).next().is(":visible")) {
            $(id).next().slideDown();
            $(id).children("span").removeClass("icon-angle-up").addClass("icon-angle-down");
        }
    }

    $scope.selMenu = function (p) {
        if ($scope.sel == p) {
            return "active";
        }
        return "";
    }
    $scope.selMenu1 = function (p) {
        if ($scope.sel == p||$scope.sel == '9610_all') {
            return "active";
        }
        return "";
    }

    $scope.$on("checkContract", function (e, data) {
        e.stopPropagation();
        $http({
            method: "post",
            url: "usercenter/getLoginInfo"
        }).success(
            function (rs, status, headers, config) {
                if (rs.code == 0) {
                    $scope.loginInfo = rs.result;
                    if (!$scope.loginInfo) {
                        msg("登录后才能" + data + "！");
                        return;
                    }
                    if ($scope.loginInfo.attrs.identity != "1") {
                        msg("目前只支持企业用户" + data + "！");
                        return;
                    }
                    if ($scope.loginInfo.attrs.joint_contract != "1") {
                        msg("只有签署过联合出口合同的企业用户才能" + data + "！（请下载"
                            + "<a class=\"text-green\" href=\"downloadExportContract\">" + "《联合出口合同》</a>）");
                        return;
                    }
                    $scope.$broadcast("checkContractEnd");
                } else {
                    msg(rs.errmsg);
                }
            }).error(function (rs, status, headers, config) {
            msg("页面信息取得时发生系统异常");
        });
    });

    $scope.$on("checkCompany", function (e, data) {
        e.stopPropagation();
        $http({
            method: "post",
            url: "usercenter/getLoginInfo"
        }).success(function (rs, status, headers, config) {
            if (rs.code == 0) {
                $scope.loginInfo = rs.result;
                if (!$scope.loginInfo) {
                    msg("登录后才能" + data + "！");
                    return;
                }
                if ($scope.loginInfo.attrs.identity != "1") {
                    msg("目前只支持企业用户" + data + "！");
                    return;
                }
                $scope.$broadcast("checkCompanyEnd");
            } else {
                msg(rs.errmsg);
            }
        }).error(function (rs, status, headers, config) {
            msg("页面信息取得时发生系统异常");
        });
    });

    $scope.$on("checkLogin", function (e, data) {
        e.stopPropagation();
        $http({
            method: "post",
            url: "usercenter/getLoginInfo"
        }).success(function (rs, status, headers, config) {
            if (rs.code == 0) {
                $scope.loginInfo = rs.result;
                console.log(rs.result)
                if (!$scope.loginInfo) {
                    msg("登录后才能" + data + "！");
                    return;
                }
                $scope.$broadcast("checkLoginEnd");
            } else {
                msg(rs.errmsg);
            }
        }).error(function (rs, status, headers, config) {
            msg("页面信息取得时发生系统异常");
        });
    });

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
    // $scope.userIconupload = function () {
        layui.use('upload', function () {
            layui.upload({
                url: 'uploadLicense',
                elem: '#userIcon',
                success: function (res) {
                    console.log(res)
                    if (res.code == 0) {
                        $scope.loginInfo.attrs.user_icon = res.result.url
                        editIcon ($scope.loginInfo.attrs)
                    } else {
                        layer.msg(res.errmsg);
                        $scope.isUrl1 = 0;
                    }

                }
            });
        })
    function editIcon (parms) {
        $http({
            method : "post",
            url : "uc/user/edit",
            data : parms
        }).success(function(rs, status, headers, config) {
            // layer.close(load);
            if (rs.code == 0) {
                layer.msg('头像修改成功');
            } else {
                layer.msg(rs.errmsg);
            }
        }).error(function(rs, status, headers, config) {
            layer.close(load);
            layer.msg("编辑信息时发生系统异常");
        });
    }

    // }

});