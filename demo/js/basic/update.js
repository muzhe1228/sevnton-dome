myApp.controller("BasicUpdateCtl", function ($scope, $http, $rootScope, $state, $timeout) {
    $rootScope.indexID = 0;
    $scope.ckNav("basic_apply");
    layui.use("laydate");
    dataValidate();
    radioSelect();
    tips();
    $scope.info = {};
    $scope.step = 1;
    $scope.activeIndex = 0;
    var ghArray;
    var ghList;
    $scope.goods = {};
    $scope.initPage = function () {
        $scope.$emit("checkContract", "在线修改基础服务");
    }
    $scope.dataChange = function(){
		if($("#logisticsCompany  option:selected").text()=='用户自选物流'){
			$("#logisticsCompanyName").attr("style","display:block")
		}else{
			$("#logisticsCompanyName").attr("style","display:none")
		}
	}
    function checkContractEnd() {
    	
        $http({
            method: "post",
            url: "uc/basic/getOrderDetail",
            params: {
                orderId: $state.params.id
            }
        }).success(function (rs, status, headers, config) {
            if (rs.code == 0) {
                $scope.infoo = rs.result.basicDetail;
                $scope.goods = rs.result.goodsList;
                $scope.info.deliveryDate = $scope.infoo.attrs.delivery_date;
                $scope.info.consigneeName = $scope.infoo.attrs.consignee_name;
                $scope.info.consigneeAddress = $scope.infoo.attrs.consignee_address;
                $scope.info.consigneeContacts = $scope.infoo.attrs.consignee_contacts;
                $scope.info.consigneeTel = $scope.infoo.attrs.consignee_tel;
                $scope.info.agentName = $scope.infoo.attrs.agent_name;
                $scope.info.agentCode = $scope.infoo.attrs.agent_code;
                $scope.info.payType = $scope.infoo.attrs.pay_type;
                $scope.info.postMode = $scope.infoo.attrs.post_mode;
                $scope.info.tradeMethod = $scope.infoo.attrs.trade_method;
                $scope.info.tPort = $scope.infoo.attrs.t_port;
                $scope.info.dPort = $scope.infoo.attrs.d_port;
                $scope.info.originCountry =  $scope.infoo.attrs.origin_country;
                $scope.info.tradingCountry = $scope.infoo.attrs.trading_country;
                $scope.info.destinationCountry=$scope.infoo.attrs.destination_country;
                $scope.info.currency=$scope.infoo.attrs.currency_id;
                $scope.info.payNum = $scope.infoo.attrs.pay_num;
                $scope.info.issuingBank = $scope.infoo.attrs.issuing_bank;
                $scope.info.contacts = $scope.infoo.attrs.contacts;
                $scope.info.contact_tel = $scope.infoo.attrs.contact_tel;
                $scope.info.contact_emal = $scope.infoo.attrs.contact_emal;
                $scope.info.origin = $scope.infoo.attrs.origin;
                $scope.info.insurance = $scope.infoo.attrs.insurance;
                $scope.info.feeAmount = $scope.infoo.attrs.fee_amount;
                $scope.info.specialRelationship = $scope.infoo.attrs.special_relationship;
                $scope.info.priceEffect = $scope.infoo.attrs.price_effect;
                $scope.info.royaltyFee = $scope.infoo.attrs.royalty_fee;
                $scope.info.ePort = $scope.infoo.attrs.e_port;
                $scope.info.shipmentDate = $scope.infoo.attrs.shipment_date;
                $scope.info.storageAddress = $scope.infoo.attrs.storage_address;

                $scope.info.advanceDrawback = $scope.infoo.attrs.advance_drawback;
                $scope.info.attachment = $scope.infoo.attrs.attachment;
                $scope.info.remarks = $scope.infoo.attrs.remarks;


                $scope.info.id = $scope.infoo.attrs.id;
            } else {
                layer.msg(rs.errmsg);
            }
        }).error(function (rs, status, headers, config) {
            layer.msg("页面信息取得时发生系统异常");
        });
    };
    $scope.$on("checkContractEnd", function (e, data) {
        var load = loadJava();
        $scope.info.agentName = $scope.loginInfo.attrs.name;
        $scope.info.agentCode = $scope.loginInfo.attrs.r_code;
        $http({
            method: "post",
            url: "uc/basic/getApplyPageInfo"
        }).success(function (rs, status, headers, config) {
            if (rs.code == 0) {

                $scope.payTypes = rs.result.payTypes;
               // $scope.info.payType = "2";
                $scope.currencies = rs.result.currencies;
              //  $scope.info.currency = "502";
                $scope.units = rs.result.units;
                $scope.packingTypes = rs.result.packingTypes;
                $scope.logisticsCompanies = rs.result.logisticsCompanies;
                if ($scope.logisticsCompanies && $scope.logisticsCompanies.length > 0) {
                    $scope.info.logisticsCompany = $scope.logisticsCompanies[0].attrs.id;
                }
                $scope.countries = rs.result.countries;
               // $scope.info.originCountry = "142";
               // $scope.info.destinationCountry = "502";
                //$scope.info.tradingCountry = "502";
                $scope.ports = rs.result.ports;
                //$scope.info.dPort = "3154";
                $scope.postModes = rs.result.postModes;
               // $scope.info.postMode = "2";
                $scope.tradeMethods = rs.result.tradeMethods;
             //   $scope.info.tradeMethod = "1";
               // $scope.info.specialRelationship = "0";
              //  $scope.info.priceEffect = "0";
             //   $scope.info.royaltyFee = "0";
              //  $scope.info.advanceDrawback = "1";
                //$scope.info.insurance = 0;
               // $scope.info.feeAmount = 0;
                if (rs.result.chArray && rs.result.chArray.length > 0) {
                    $("#consigneeName").completer({
                        suggest: true,
                        source: rs.result.chArray,
                        complete: function (e) {
                            var val = e.val();
                            $.each(rs.result.chList, function (i, n) {
                                if (val == n.attrs.consignee_name) {
                                    $scope.$apply(function () {
                                        $scope.info.consigneeContacts = n.attrs.consignee_contacts;
                                        $scope.info.consigneeTel = n.attrs.consignee_tel;
                                        $scope.info.consigneeAddress = n.attrs.consignee_address;
                                    });
                                    return false;
                                }
                            });
                        }
                    });
                }
                ghArray = rs.result.ghArray;
                ghList = rs.result.ghList;
                if (rs.result.recordBasic) {
                    $scope.info = rs.result.recordBasic;
                    $scope.info.advanceDrawback = "1";
                }
                /*			if (rs.result.recordGoods) {
                 $scope.goods = rs.result.recordGoods;

                 }*/
                $timeout(function () {
                    $("#originCountry").chosen({
                        width: 200
                    });
                    $("#destinationCountry").chosen({
                        width: 200
                    });
                    $("#tPort").chosen({
                        width: 200
                    });
                    $("#dPort").chosen({
                        width: 200
                    });
                    $("#tradingCountry").chosen({
                        width: 170
                    });
                });
                checkContractEnd();
                layer.close(load);
            } else {
                layer.close(load);
                layer.msg(rs.errmsg);
            }
        }).error(function (rs, status, headers, config) {
            layer.close(load);
            layer.msg("页面信息取得时发生系统异常");
        });
    });

    function completerComplete(e) {
        var id = e.attr("id");
        var index = id.substring(6, id.length);
        var val = e.val();
        $.each(ghList, function (i, n) {
            if (val == n.attrs.hs_code) {
                $scope.$apply(function () {
                    $scope.goods[index].companyNo = n.attrs.company_no;
                    $scope.goods[index].nameCn = n.attrs.name_cn;
                    $scope.goods[index].nameEn = n.attrs.name_en;
                    $scope.goods[index].model = n.attrs.model;
                    $scope.goods[index].realCount = n.attrs.real_count;
                    $scope.goods[index].brand = n.attrs.brand;
                    $scope.goods[index].realUnit = n.attrs.real_unit;
                    $scope.goods[index].unitPrice = n.attrs.unit_price;
                    $scope.goods[index].packingCount = n.attrs.packing_count;
                    $scope.goods[index].firstCount = n.attrs.first_count;
                    $scope.goods[index].firstUnit = n.attrs.first_unit;
                    $scope.goods[index].secondCount = n.attrs.second_count;
                    $scope.goods[index].secondUnit = n.attrs.second_unit;
                    $scope.goods[index].packingType = n.attrs.packing_type;
                    $scope.goods[index].volume = n.attrs.volume;
                    $scope.goods[index].netWeight = n.attrs.net_weight;
                    $scope.goods[index].grossWeight = n.attrs.gross_weight;
                    $scope.goods[index].mark = n.attrs.mark;
                    $scope.goods[index].elements = n.attrs.elements;
                    $scope.goods[index].description = n.attrs.description;
                    $scope.goods[index].remarks = n.attrs.remarks;
                    $scope.goods[index].entiretyImg = n.attrs.entiretyImg;
                    $scope.goods[index].sideImg = n.attrs.sideImg;
                    $scope.goods[index].modelImg = n.attrs.modelImg;
                    $scope.goods[index].trademarkImg = n.attrs.trademarkImg;
                });
                return false;
            }
        });
    }

    $scope.dataValidate = function () {
        dataValidate();
    }

    $scope.next2 = function () {
        $scope.info.deliveryDate = $("#deliveryDate").val();
        $(".step1 form").ajaxSubmit(function () {
            $scope.step = 2;
            if (!$scope.goods || $scope.goods.length < 1) {
                $scope.goods = [{
                    realUnit: "011",
                    firstUnit: "011",
                    secondUnit: "",
                    packingType: "2"
                }];
            }
            $timeout(function () {
                $("#realUnit0").chosen({
                    width: 170
                });
                $("#firstUnit0").chosen({
                    width: 170
                });
                $("#secondUnit0").chosen({
                    width: 170
                });
                if (ghArray && ghArray.length > 0) {
                    $("#hsCode0").completer({
                        suggest: true,
                        source: ghArray,
                        complete: completerComplete
                    });
                }
                allupLoad(0)
            });
        });
    }

    $scope.selTab = function (index) {
        $timeout(function () {
            $("#realUnit" + index).chosen({
                width: 170
            });
            $("#firstUnit" + index).chosen({
                width: 170
            });
            $("#secondUnit" + index).chosen({
                width: 170
            });
            if (ghArray && ghArray.length > 0) {
                $("#hsCode" + index).completer({
                    suggest: true,
                    source: ghArray,
                    complete: completerComplete
                });
            }
            allupLoad(index);
        });
    }

    $scope.addGood = function () {
        if (verifyImg()) {
            layer.msg("请先上传商品照片！");
            return;
        } else {
            $(".step2 form").ajaxSubmit(function () {
                $scope.activeIndex = $scope.goods.length;
                $scope.goods.push({
                    realUnit: "011",
                    firstUnit: "011",
                    secondUnit: "",
                    packingType: "2"
                });
                $(".step2 .tab .tab-nav li").removeClass("active");
                $(".step2 .tab .tab-body .tab-panel").removeClass("active");
                $timeout(function () {
                    $("#tab-nav" + $scope.activeIndex).addClass("active");
                    $("#tab-good" + $scope.activeIndex).addClass("active");
                    $("#realUnit" + $scope.activeIndex).chosen({
                        width: 170
                    });
                    $("#firstUnit" + $scope.activeIndex).chosen({
                        width: 170
                    });
                    $("#secondUnit" + $scope.activeIndex).chosen({
                        width: 170
                    });
                    if (ghArray && ghArray.length > 0) {
                        $("#hsCode" + $scope.activeIndex).completer({
                            suggest: true,
                            source: ghArray,
                            complete: completerComplete
                        });
                    }
                    allupLoad($scope.activeIndex);
                });
            });
        }
    }

    $scope.delGood = function (last, index) {
        if ($scope.goods.length > 1) {
            if (last) {
                $scope.activeIndex = index - 1;
            } else {
                $scope.activeIndex = index;
            }
            $scope.goods.splice(index, 1);
            $(".step2 .tab .tab-nav li").removeClass("active");
            $(".step2 .tab .tab-body .tab-panel").removeClass("active");
            $timeout(function () {
                $("#tab-nav" + $scope.activeIndex).addClass("active");
                $("#tab-good" + $scope.activeIndex).addClass("active");
                allupLoad(index);
            });
        } else {
            layer.msg("至少要一种商品");
        }
    }
    function delGoods(id) {

        $http({
            method: "post",
            url: "uc/basic/delGoods",
            data: {
                goodsId: id
            }
        }).success(function (rs, status, headers, config) {
            if (rs.code == 0) {
            	 layer.msg("删除成功");
            } else {
                layer.msg(rs.errmsg);
            }
        }).error(function (rs, status, headers, config) {
            layer.msg("页面信息取得时发生系统异常");
        });
    };
    
    
    
    
    $scope.prev1 = function () {
        $scope.step = 1;
    }
    $scope.next3 = function () {
        if (verifyImg()) {
            layer.msg("请先上传商品照片！");
            return;
        } else {
            $(".step2 form").ajaxSubmit(function () {
                $scope.info.goods = $scope.goods;
                $scope.step = 3;
            });
        }
    }

    $scope.tabFinish = function (index) {
        tabSelect();
        $(".step2 .tab .tab-nav li").removeClass("active");
        $(".step2 .tab .tab-body .tab-panel").removeClass("active");
        $timeout(function () {
            $("#tab-nav" + $scope.activeIndex).addClass("active");
            $("#tab-good" + $scope.activeIndex).addClass("active");
        });
    }

    $scope.prev2 = function () {
        $scope.step = 2;
    }
    $scope.next4 = function () {
        $scope.info.shipmentDate = $("#shipmentDate").val();
        $(".step3 form").ajaxSubmit(function () {
            $scope.step = 4;
        });
    }

    layui.use("upload", function () {
        layui.upload({
            url: "uploadBasic",
            title: "SHIPPING ORDER",
            type: "file",
            success: function (res) {
                if (res.code == 0) {
                    $scope.$apply(function () {
                        $scope.info.original = res.result.original;
                        $scope.info.attachment = res.result.url;
                    });
                } else {
                    layer.msg(res.errmsg);
                }
            }
        });
    });

    $scope.prev3 = function () {
        $scope.step = 3;
    }
    $scope.submit = function () {
        console.log($scope.info)
        $("form").ajaxSubmit(function () {
            var load = loadJava();
            $http({
                method: "post",
                url: "uc/basic/update",
                data: $scope.info
            }).success(function (rs, status, headers, config) {
                layer.close(load);
                if (rs.code == 0) {
                    layer.confirm("恭喜您提交成功", {
                        btn: ["继续提交新的订单", "前往【状况查询】页面，查看订单状态"],
                        closeBtn: 0,
                        title: "提示消息",
                        area: "460px"
                    }, function (index) {
                        $state.reload($state.$current);
                        layer.close(index);
                    }, function () {
                        $state.go("basic_list");
                    });
                } else {
                    layer.msg(rs.errmsg);
                }
            }).error(function (rs, status, headers, config) {
                layer.close(load);
                layer.msg("在线修改时发生系统异常");
            });
        });
    }

    $scope.save = function () {
        $scope.info.deliveryDate = $("#deliveryDate").val();
        $scope.info.shipmentDate = $("#shipmentDate").val();
        $scope.info.goods = $scope.goods;
        var load = loadJava();
        $http({
            method: "post",
            url: "uc/basic/save",
            data: $scope.info
        }).success(function (rs, status, headers, config) {
            layer.close(load);
            if (rs.code != 0) {
                layer.msg(rs.errmsg);
            }
        }).error(function (rs, status, headers, config) {
            layer.close(load);
            layer.msg("保存数据时发生系统异常");
        });
    }

    $scope.radioClass = function (val1, val2) {
        if (val1 == val2) {
            return "active";
        }
    }
    function allupLoad(index) {
        layui.use('upload', function () {
            layui.upload({
                url: 'uploadLicense',
                elem: '#test1' + index,
                success: function (res) {
                	//Console.log(res.code);
                    if (res.code == 0) {
                    	
                        $scope.$apply(function () {
                            $scope.goods[index].entiretyImg = res.result.url;
                            $scope.isUrl1 = 1;
                        });
                    } else {
                        layer.msg(res.errmsg);
                        $scope.isUrl1 = 0;
                    }

                }
            });
            layui.upload({
                url: 'uploadLicense',
                elem: '#test2' + index,
                success: function (res) {
                    if (res.code == 0) {
                        $scope.$apply(function () {
                            $scope.goods[index].sideImg = res.result.url;
                            $scope.isUrl2 = 1;
                        });
                    } else {
                        layer.msg(res.errmsg);
                        $scope.isUrl2 = 0;
                    }

                }
            });
            layui.upload({
                url: 'uploadLicense',
                elem: '#test3' + index,
                success: function (res) {
                    if (res.code == 0) {
                        $scope.$apply(function () {
                            $scope.goods[index].trademarkImg = res.result.url;
                            $scope.isUrl3 = 1;
                        });
                    } else {
                        layer.msg(res.errmsg);
                        $scope.isUrl3 = 0;
                    }

                }
            });
            layui.upload({
                url: 'uploadLicense',
                elem: '#test4' + index,
                success: function (res) {
                    if (res.code == 0) {
                        $scope.$apply(function () {
                            $scope.goods[index].modelImg = res.result.url;
                            $scope.isUrl4 = 1;
                        });
                    } else {
                        layer.msg(res.errmsg);
                        $scope.isUrl4 = 0;
                    }

                }
            });
        })
    }
});