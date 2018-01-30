function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return (r[2]);
    return null;
}

function dataValidate() {
    $('textarea, input, select').blur(function () {
        var e = $(this);
        if (e.attr("data-validate")) {
            e.closest('.fields').find(".input-help").remove();
            var $checkdata = e.attr("data-validate").split(',');
            var $checkvalue = e.val();
            var $checkstate = true;
            var $checktext = "";
            if (e.attr("placeholder") == $checkvalue) {
                $checkvalue = "";
            }
            if ($checkvalue != "" || e.attr("data-validate").indexOf("required") >= 0) {
                for (var i = 0; i < $checkdata.length; i++) {
                    var $checktype = $checkdata[i].split(':');
                    if (!$pintuercheck(e, $checktype[0], $checkvalue)) {
                        $checkstate = false;
                        $checktext = $checktext + "<li>" + $checktype[1] + "</li>";
                    }
                }
            }
            ;
            if ($checkstate) {
                e.closest('.form-group').removeClass("check-error");
                e.parent().find(".input-help").remove();
                e.closest('.form-group').addClass("check-success");
            } else {
                e.closest('.form-group').removeClass("check-success");
                e.closest('.form-group').addClass("check-error");
                e.closest('.fields').append('<div class="input-help"><ul>' + $checktext + '</ul></div>');
            }
        }
    });
}

function setImagePreviews(avalue) {
    var docObj = document.getElementById("doc");
    var dd = document.getElementById("dd");
    dd.innerHTML = "";
    var fileList = docObj.files;
    for (var i = 0; i < fileList.length; i++) {
        dd.innerHTML += "<div style='float: left;margin-top: 10px;' > <img id='img" + i + "'  /> </div>";
        var imgObjPreview = document.getElementById("img"+i);
        if (docObj.files && docObj.files[i]) {
            //火狐下，直接设img属性
            // imgObjPreview.style.display = 'block';
            imgObjPreview.style.width = '160px';
            imgObjPreview.style.height = '130px';
            imgObjPreview.style.margin = '5px';
            imgObjPreview.style.borderRadius = '5px';
            //imgObjPreview.src = docObj.files[0].getAsDataURL();
            //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
            imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);
        }
        else {
            //IE下，使用滤镜
            docObj.select();
            var imgSrc = document.selection.createRange().text;
            var localImagId = document.getElementById("img" + i);
            //必须设置初始大小
            localImagId.style.width = "160px";
            localImagId.style.height = "130px";
            imgObjPreview.style.margin = '5px';
            imgObjPreview.style.borderRadius = '5px';
            //图片异常的捕捉，防止用户修改后缀来伪造图片
            try {
                localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
            }
            catch (e) {
                alert("您上传的图片格式不正确，请重新选择!");
                return false;
            }
            imgObjPreview.style.display = 'none';
            document.selection.empty();
        }
    }
    return true;

}


function radioSelect() {
    $('.radio label').each(function () {
        var e = $(this);
        e.click(function () {
            e.closest('.radio').find("label").removeClass("active");
            e.addClass("active");
        });
    });
}
function tabSelect() {
    $('.tab .tab-nav li').each(function () {
        var e = $(this);
        if (e.hasClass("nonav")) {
            return;
        }
        var trigger = e.closest('.tab').attr("data-toggle");
        if (trigger == "hover") {
            e.mouseover(function () {
                $showtabs(e);
            });
            e.click(function () {
                return false;
            });
        } else {
            e.click(function () {
                $showtabs(e);
                return false;
            });
        }
    });
    $.fn.ajaxSubmit = function (fn) {
        $(this).find('input[data-validate],textarea[data-validate],select[data-validate]').trigger("blur");
        $(this).find('input[placeholder],textarea[placeholder]').each(function () {
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
    $showtabs = function (e) {
        var detail = e.children("a").attr("href");
        e.closest('.tab .tab-nav').find("li").removeClass("active");
        e.closest('.tab').find(".tab-body .tab-panel").removeClass("active");
        e.addClass("active");
        $(detail).addClass("active");
    };
}
function tips() {
    $(".tips").each(function () {
        var e = $(this);
        var title = e.attr("title");
        var trigger = e.attr("data-toggle");
        e.attr("title", "");
        if (trigger == "" || trigger == null) {
            trigger = "hover"
        }
        if (trigger == "hover") {
            e.mouseover(function () {
                $showtips(e, title)
            })
        } else {
            if (trigger == "click") {
                e.click(function () {
                    $showtips(e, title)
                })
            } else {
                if (trigger == "show") {
                    e.ready(function () {
                        $showtips(e, title)
                    })
                }
            }
        }
    });
}
function vaildate(form) {
    form.find('input[data-validate],textarea[data-validate],select[data-validate]').trigger("blur");
    var numError = form.find('.check-error').length;
    if (numError) {
        form.find('.check-error').first().find('input[data-validate],textarea[data-validate],select[data-validate]')
            .first().focus().select();
        return false;
    }
    return true;
}

function clearVaild(form) {
    form.find('.form-group').removeClass("check-error");
    form.find('.form-group').removeClass("check-success");
    form.find(".input-help").remove();
}

function returnTop() {
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
}

function fomateDate(oDate, sFomate, bZone) {
    sFomate = sFomate.replace("YYYY", oDate.getFullYear());
    sFomate = sFomate.replace("YY", String(oDate.getFullYear()).substr(2))
    sFomate = sFomate.replace("MM", oDate.getMonth() + 1)
    sFomate = sFomate.replace("DD", oDate.getDate());
    sFomate = sFomate.replace("hh", oDate.getHours());
    sFomate = sFomate.replace("mm", oDate.getMinutes());
    sFomate = sFomate.replace("ss", oDate.getSeconds());
    if (bZone)
        sFomate = sFomate.replace(/\b(\d)\b/g, '0$1');
    return sFomate;
}

function addZero(str, length) {
    return new Array(length - str.length + 1).join("0") + str;
}

function loadJava() {
    return layer.load(1, {
        shade: [0.3, '#393D49']
    });
}

function verifyImg() {
    var arr = new Array();
    $(".upload_img").each(function() {
        arr.push($(this).attr("src"));
    });
   for (var i= 0;i<arr.length;i++){
       if (arr[i]==undefined&&arr[i]==null){

           return true
       }
   }
}
$(function () {
    // 拼图的手机号码校验缺少153*,18*等号段。这里改为1开头的11位号码都正确
    // （覆盖pintuer.js方法$$pintuercheck）
    $pintuercheck = function (element, type, value) {
        $pintu = value.replace(/(^\s*)|(\s*$)/g, "");
        switch (type) {
            case "required":
                return /[^(^\s*)|(\s*$)]/.test($pintu);
                break;
            case "chinese":
                return /^[\u0391-\uFFE5]+$/.test($pintu);
                break;
            case "number":
                return /^\d+$/.test($pintu);
                break;
            case "integer":
                return /^[-\+]?\d+$/.test($pintu);
                break;
            case "plusinteger":
                return /^[+]?\d+$/.test($pintu);
                break;
            case "double":
                return /^[-\+]?\d+(\.\d+)?$/.test($pintu);
                break;
            case "plusdouble":
                return /^[+]?\d+(\.\d+)?$/.test($pintu);
                break;
            case "english":
                return /^[A-Za-z]+$/.test($pintu);
                break;
            case "username":
                return /^[a-z]\w{3,}$/i.test($pintu);
                break;
            case "mobile":
                return /^((\(\d{3}\))|(\d{3}\-))?1[0-9]\d{9}?$/.test($pintu);
                break;
            case "phone":
                return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);
                break;
            case "tel":
                return /^((\(\d{3}\))|(\d{3}\-))?1[0-9]\d{9}?$/.test($pintu)
                    || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);
                break;
            case "inter_tel":
                return /^\s*\+?\s*(\(\s*\d+\s*\)|\d+)(\s*-?\s*(\(\s*\d+\s*\)|\s*\d+\s*))*\s*$/.test($pintu);
                break;
            case "email":
                return /^[^@]+@[^@]+\.[^@]+$/.test($pintu);
                break;
            case "url":
                return /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test($pintu);
                break;
            case "ip":
                return /^[\d\.]{7,15}$/.test($pintu);
                break;
            case "qq":
                return /^[1-9]\d{4,10}$/.test($pintu);
                break;
            case "currency":
                return /^\d+(\.\d+)?$/.test($pintu);
                break;
            case "zip":
                return /^[1-9]\d{5}$/.test($pintu);
                break;
            case "radio":
                var radio = element.closest('form').find('input[name="' + element.attr("name") + '"]:checked').length;
                return eval(radio == 1);
                break;
            case "identity":
                return /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test($pintu);
                break;
            case "decimal":
                return /^\d{1,8}(\.\d{1,2})?$/.test($pintu);
                break;
            case "decimal4":
                return /^\d{1,8}(\.\d{1,4})?$/.test($pintu);
                break;
            case "decimal3":
                return /^\d{1,8}(\.\d{1,3})?$/.test($pintu);
                break;
            case "ennumsym":
                return /^[A-Za-z0-9!-/:-@¥[-`{-~\s]+$/.test($pintu);
                break;
            default:
                var $test = type.split('#');
                if ($test.length > 1) {
                    switch ($test[0]) {
                        case "compare":
                            return eval(Number($pintu) + $test[1]);
                            break;
                        case "cprnext":
                            return eval(Number($pintu) + $test[1]
                                + Number(jQuery('input[name="' + $test[2] + '"]').eq(0).val()));
                            break;
                        case "regexp":
                            return new RegExp($test[1], "gi").test($pintu);
                            break;
                        case "length":
                            var $length;
                            if (element.attr("type") == "checkbox") {
                                $length = element.closest('form').find('input[name="' + element.attr("name") + '"]:checked').length;
                            } else {
                                $length = $pintu.replace(/[\u4e00-\u9fa5]/g, "***").length;
                            }
                            return eval($length + $test[1]);
                            break;
                        case "ajax":
                            var $getdata;
                            var $url = $test[1] + $pintu;
                            $.ajaxSetup({
                                async: false
                            });
                            $.getJSON($url, function (data) {
                                $getdata = data.getdata;
                            });
                            if ($getdata == "true") {
                                return true;
                            }
                            break;
                        case "repeat":
                            return $pintu == jQuery('input[name="' + $test[1] + '"]').eq(0).val();
                            break;
                        default:
                            return true;
                            break;
                    }
                    break;
                } else {
                    return true;
                }
        }
    };
});
function scoll (id){
    $('html, body').animate({
        scrollTop: $('#a'+id).offset().top-90
    }, 1000);
};
function ueditor() {
    var um = UM.getEditor('myEditor');
    um.addListener('blur',function(){
        $('#focush2').html('编辑器失去焦点了')
    });
    um.addListener('focus',function(){
        $('#focush2').html('')
    });
}

