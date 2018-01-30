var myApp = angular.module("myApp", []);

myApp.directive("ngRepeatFinish", function () {
    return {
        link: function (scope, element, attr) {
            if (scope.$last == true) {
                scope.$eval(attr.ngRepeatFinish)
            }
        }
    }
})
myApp.controller("IntrodCtl", function($scope, $http, $sce, $timeout) {
        $scope.init = function() {
            $scope.path = 1;
            $http({
                method: "post",
                url: "index/init"
            }).success(function (rs, status, headers, config) {
                if (rs.code == 0) {
                    $scope.consultList = rs.result.consultList;
                    //$scope.exampleList = rs.result.exampleList;
                    //$scope.praiseList = rs.result.praiseList;
                    $scope.videoList = rs.result.videoList;
                    $scope.bannerList = rs.result.bannerList;
                } else {
                    layer.msg(rs.errmsg);
                }
            }).error(function (rs, status, headers, config) {
                layer.msg("页面信息取得时发生系统异常");
            });
            $http({
                method : "post",
                url : "introd/init"
            }).success(function(rs, status, headers, config) {
                if (rs.code == 0) {
                    $scope.agentMainIntrod = rs.result.agentMainIntrod;
                    $scope.basicMainIntrod = rs.result.basicMainIntrod;
                    $scope.financeMainIntrod = rs.result.financeMainIntrod;
                    $scope.agentChildIntrod = rs.result.agentChildIntrod;
                    $scope.basicChildIntrod = rs.result.basicChildIntrod;
                    $scope.financeChildIntrod = rs.result.financeChildIntrod;
                    $scope.teaching = rs.result.teaching;
                    $scope.bottomContent = rs.result.bottomContent;
                    $timeout(function() {
                        $scope.sel = GetQueryString("sel");
                        switch ($scope.sel) {
                            case "agent":
                                if ($scope.agentMainIntrod) {
                                    $scope.logo_size = "代运营服务"
                                    $scope.ckNav("#agentlink", $scope.agentMainIntrod.attrs);
                                    $scope.oSeo = {
                                    		title :"圣云通-外贸代运营_代运营托管_外贸代运营服务",
                                    		keywords:'代运营，外贸代运营，代运营托管，代运营服务',
                                    		description:'圣云通跨境贸易综合服务平台，提供外贸代运营、代运营托管服务.圣云通,定位准、服务好、运营精、收费合理、流程简单.国内大平台，有保障！'
                                    		
                                    };
                                }
                                break;
                            case "basic":
                                if ($scope.basicMainIntrod) {
                                    $scope.logo_size = "基础服务"
                                    $scope.ckNav("#basiclink", $scope.basicMainIntrod.attrs);
                                    $scope.oSeo = {
                                    		title :"圣云通-通关_外汇结算_退税_跨境贸易一站式服务平台",
                                    		keywords:'通关，物流，外汇结算，退税，跨境贸易，外贸服务',
                                    		description:'圣云通是外贸综合服务平台，为用户提供通关、商检、外汇结算、退税等综合服务.圣云通让外贸环节更安全，出口更快捷.国内大平台，有保障！'
                                    		
                                    };
                                }
                                break;
                            case "finance":
                                if ($scope.financeMainIntrod) {
                                    $scope.logo_size = "金融服务"
                                    $scope.ckNav("#financelink", $scope.financeMainIntrod.attrs);
                                    $scope.oSeo = {
                                    		title :"圣云通-外贸融资_信保_赊销_外贸金融服务",
                                    		keywords:'外贸融资、信保、赊销、金融服务',
                                    		description:'圣云通提供丰富的外贸融资、信保、赊销等一站式外贸金融服务,为国内的外贸企业快速、有效的解决外贸各环节的融资需求.'
                                    		
                                    };
                                }
                                break;
                            case "teaching":
                                if ($scope.teaching) {
                                    $scope.link = $sce.trustAsResourceUrl($scope.teaching.attrs.link);
                                    $scope.content = $sce.trustAsHtml($scope.teaching.attrs.content);
                                }
                                break;
                            case "bottom":
                                if ($scope.bottomContent && $scope.bottomContent.length > 0) {
                                    $scope.snd = GetQueryString("snd");
                                    $.each($scope.bottomContent, function(i, n) {
                                        if (n.attrs.id == $scope.snd) {
                                            $scope.link = $sce.trustAsResourceUrl(n.attrs.link);
                                            $scope.content = $sce.trustAsHtml(n.attrs.content);
                                            return false;
                                        }
                                    });
                                }
                                break;
                            default:
                                break;
                        }
                        $("title").text($scope.oSeo.title);
                        $("meta[name=keywords]").attr("content",$scope.oSeo.keywords);
                        $("meta[name=description]").attr("content",$scope.oSeo.description);
                    }, 100);
                } else {
                    layer.msg(rs.errmsg);
                }
            }).error(function(rs, status, headers, config) {
                layer.msg("页面信息取得时发生系统异常");
            });
        };

        $scope.ckNav = function(target, item) {
            $(".container .nav li a").filter(".active").removeClass("active");
            var el;
            if ($(target).is("span")) {
                el = $(target).parent();
            } else {
                el = $(target);
            }
            el.addClass("active");
            if (!el.parent().parent().hasClass("nav-child") && $(".nav ul:visible")[0] != el.next()[0]) {
                $(".container .nav ul:visible").slideUp();
                $(".container .nav ul:visible").prev().children("span").removeClass("icon-angle-down").addClass(
                    "icon-angle-up");
                el.next().slideDown();
                el.children("span").removeClass("icon-angle-up").addClass("icon-angle-down");
            }
            $scope.link = $sce.trustAsResourceUrl(item.link);
            $scope.content = $sce.trustAsHtml(item.content);
        }

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
        $scope.bannerFinish = function () {
            carousel();
        }
    });

