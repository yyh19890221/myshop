var popupStatus = 0;
var showNeweggGiftConfirmStatus = 1;
var IsBlank = "TRUE";

var BizShopping = {
	/**  */
    ValidExpriesUnionCard: function(obj) {
        $.ajax({
            type: "post",
            dataType: "html",
            url: $.newegg.buildWWW("Ajax/Shopping/ValidUnionCard.aspx"),
            timeout: 100000,
            beforeSend: function(XMLHttpRequest) {
                var prompt = "<span class=\"cmnLoadB\"><img src=\"" + resource_Image_Shopping.iconLoadingA + "\" align=\"absmiddle\" />" + resources_Shopping.PopupInfo + "</span>";
                $(obj).hide();
                $(obj).after(prompt);
            },
            success: function(data, textStatus) {
                if (data == 'Expries') {
                    var popup = $("#pop1");
                    $("#popBack").css({ opacity: "0" });
                    $("#popBack").show();
                    popup.show();
                    $("#checkOut1").show();
                    $(".cmnLoadB").remove();
                }
                else {
                    window.location.href = $.newegg.buildWWW("Default.aspx");
                }
            },
            complete: function(XMLHttpRequest, textStatus) {
                $(obj).show();
            },
            error: function() {
                BizShopping.systemError();
                $(obj).show();
            }
        });
    },
    goCheckout: function(obj, url, checkOutTimer) {
        if (this.ShowNeweggGiftConfirm()) {

            var isAllowReplace = $('#IsAllowReplace').attr('checked');
            if (isAllowReplace == true || isAllowReplace == 'checked') {
                $.newegg.cookie.set('IsAllowReplace', 'true');
            } else {
                $.newegg.cookie.set('IsAllowReplace', 'false');
            }

            if (mini.enable) {
                //omniture
                try {
                    s = s_gi(s_account);
                    s.pageName = '购物流程:登录';
                    s.prop1 = reportsuite;
                    s.channel = '购物流程:登录';
                    s.prop7 = '购物流程:登录';
                    s.prop8 = '购物流程:登录';
                    s.prop4 = '购物流程:登录';
                    s.prop9 = '购物流程:登录';
                    s.events = 'event16';
                    s.t();
                } catch (ex) { }

                mini.returnUrl = url;
                if (mini.checkLogin(obj, checkOutTimer)) {

                    BizShopping.AsynCall(obj, url);

                } 
                else {
                    $.newegg.cookie.set('GetCass', '1', { topdomain: true, expires: 9999 });
                }
            }
            else {
                BizShopping.AsynCall(obj, url);
            }
        }
        return false;
    },
    goCheckoutMini: function(obj, url, checkOutTimer) {
        if (this.ShowNeweggGiftConfirm()) {

            var isAllowReplace = $('#IsAllowReplace').attr('checked');
            if (isAllowReplace == true || isAllowReplace == 'checked') {
                $.newegg.cookie.set('IsAllowReplace', 'true');
            } else {
                $.newegg.cookie.set('IsAllowReplace', 'false');
            }

            if (mini.enable) {
                //omniture
                try {
                    s = s_gi(s_account);
                    s.pageName = '购物流程:登录';
                    s.prop1 = reportsuite;
                    s.channel = '购物流程:登录';
                    s.prop7 = '购物流程:登录';
                    s.prop8 = '购物流程:登录';
                    s.prop4 = '购物流程:登录';
                    s.prop9 = '购物流程:登录';
                    s.events = 'event16';
                    s.t();
                } catch (ex) { }

                mini.returnUrl = url;
                if (mini.checkLogin(obj, checkOutTimer)) {

                    //                    BizShopping.AsynCall(obj, url);
                    window.location = url;
                }
                else {
                    $.newegg.cookie.set('GetCass', '1', { topdomain: true, expires: 9999 });
                }
            }
            else {
                BizShopping.AsynCall(obj, url);
            }
        }
        return false;
    },
    goCheckoutCass: function(obj, url, checkOutTimer) {
        $.newegg.cookie.set('GetCass', '2', { topdomain: true, expires: 9999 });
        if (this.ShowNeweggGiftConfirm()) {

            var isAllowReplace = $('#IsAllowReplace').attr('checked');
            if (isAllowReplace == true || isAllowReplace == 'checked') {
                $.newegg.cookie.set('IsAllowReplace', 'true');
            } else {
                $.newegg.cookie.set('IsAllowReplace', 'false');
            }

            if (mini.enable) {
                //omniture
                try {
                    s = s_gi(s_account);
                    s.pageName = '购物流程:登录';
                    s.prop1 = reportsuite;
                    s.channel = '购物流程:登录';
                    s.prop7 = '购物流程:登录';
                    s.prop8 = '购物流程:登录';
                    s.prop4 = '购物流程:登录';
                    s.prop9 = '购物流程:登录';
                    s.events = 'event16';
                    s.t();
                } catch (ex) { }

                mini.returnUrl = url;
                if (mini.checkLogin(obj, checkOutTimer)) {
                    BizShopping.AsynCall(obj, url);
                }
            }
            else {
                BizShopping.AsynCall(obj, url);
            }
        }
        return false;
    },
    AsynCall: function(obj, url) {

        ///获取个性属性样式
        var propertyStyle = $(obj).parent().parent().parent().attr('style');
        var propertyID = '';

        ///是否替代品适用
        var isAllowReplace = false;
        if ($('#IsAllowReplace').length > 0) {
            isAllowReplace = $('#IsAllowReplace').attr('checked');
        }

        var baseUrl = $.newegg.buildWWW("Ajax/Shopping/AjaxShoppingPanel.aspx");
        var productID = '';
        var productNameAndCategoryName = '';
        var data;
        var id = $(obj).attr("id");
        var actionType = $(obj).attr("ref3");
        var currentSOType = $.newegg.querystring.get("buytype");
        var paramSoType = currentSOType == '' ? '' : '&buytype=' + currentSOType;
        var paramSoType2 = currentSOType == '' ? '' : 'buytype=' + currentSOType;
        if (id == 'del1') {
            var notDel = $(obj).attr('cannotdel');
            if (typeof notDel == 'string' && notDel == 1) return;

            var shoppingcartasyncalldel = '确认要从购物车中移除该商品？';
            var isyearpro = $(obj).attr('isyearpro');
            if (typeof isyearpro == 'string' && isyearpro == "1") {
                shoppingcartasyncalldel = '确认要从购物车中移除该年费商品？（如需添加请到“我的山姆>会籍管理”页面添加。）';
            }

            if (confirm(shoppingcartasyncalldel)) {
                productID = $(obj).attr("ref1");
                productNameAndCategoryName = $(obj).attr("ref4");
                data = 'action=del&productno=' + productID + paramSoType;

                var propertyids = $(obj).attr('propertyids');
                var valueids = $(obj).attr('valueids');

                //omniture
                try {
                    var s = s_gi(s_account);
                    s.linkTrackVars = 'products,events,prop1,eVar21,eVar22';
                    s.linkTrackEvents = 'scRemove';
                    s.events = 'scRemove';
                    s.prop1 = reportsuite;
                    s.products = ';' + productID + productNameAndCategoryName; //购物车中删除的产品，前缀一个分号[20140321--改版 + productNameAndCategoryName]
                    s.tl(obj, 'o', 'Shopping Cart Remove');
                } catch (ex) { }
                if (typeof propertyids == 'string' && typeof valueids == 'string') {
                    var propertyIDList = propertyids.split(',');
                    var valueIDList = valueids.split(',');
                    if (propertyIDList.length == valueIDList.length) {
                        var urlProperty = '&PersonalPropertySysNo=' + propertyids + '&PersonalPropertyValueSysNo=' + valueids;
                        data += urlProperty;
                    }

                    propertyStyle = $(obj).parent().parent().attr('style');
                    propertyID = $(obj).parent().parent().parent().attr('id');
                }

            }
            else {
                return;
            }
        }
        else if (actionType == 'addNewItem') {
            productID = $(obj).attr("ref1");
            data = 'action=add&productno=' + productID + paramSoType;
        }
        else if (actionType == "updateItemQuantityAdd" || actionType == "updateItemQuantitySubtraction" || actionType == "updateItemQuantity") {
            var isLoad = $(obj).attr('isload');
            if (typeof isLoad == 'string' && isLoad == 'true') return;

            productID = $(obj).attr("ref1");
            var oldQty = $(obj).attr("ref2");
            var minPerOrder = parseInt($(obj).parents('td').prev().attr('minperorder'), 10);
            var bufferQty = parseInt($(obj).parents('td').prev().attr('bufferqty'), 10);

            if (! ~ ~bufferQty || bufferQty < 1) {
                bufferQty = 1;
            }

            var currentQty;
            if (actionType == "updateItemQuantity") {
                currentQty = $(obj).val();
                if (oldQty == currentQty) { return; }
            }
            else {
                currentQty = $('#' + $(obj).attr("refId")).val();
            }
            var curQty = parseInt(currentQty, 10);
            if (isNaN(curQty) == true) {
                alert(resources_Shopping.ShoppingCartCheckQty1);
                $('#' + $(obj).attr("refId")).val(oldQty);
                obj.focus();
                return;
            }
            if (curQty <= 0) {
                if (actionType == "updateItemQuantityAdd" || actionType == "updateItemQuantitySubtraction") {
                    $(obj).bind("click", function() { BizShopping.AsynCall(obj); })
                }
                alert(resources_Shopping.ShoppingCartCheckQty2);
                if (actionType == "updateItemQuantityAdd" || actionType == "updateItemQuantitySubtraction") {
                    $('#' + $(obj).attr("refId")).val(oldQty);
                }
                else {
                    $(obj).val(oldQty);
                }
                obj.focus();
                return;
            }
            if (actionType == "updateItemQuantityAdd") {
                curQty += bufferQty;
                id = $(obj).attr("refId");
            }
            if (actionType == "updateItemQuantitySubtraction") {
                if (curQty > 1) curQty -= bufferQty; else { return; }
                if (curQty < minPerOrder) return;

                id = $(obj).attr("refId");
            }

            if (curQty < minPerOrder) {
                alert('当前购买数量低于商品起购数量！');
                $(obj).val(oldQty);
                obj.focus();
                return;
            }

            ///如果是修改个性属性数量，则当前修改数量为当前商品所有个性属性数量之和
            var total = curQty;
            if (typeof propertyStyle == 'string') {
                var currentObj = $(obj).closest('.op').find(':input.intxt');
                $(obj).closest('.tipPop').find('.op :input.intxt').each(function() {
                    if ($(this).is(currentObj) == false) {
                        total += parseInt($(this).val(), 10);
                    }
                });
            }

            var maxPerOrder = parseInt($(obj).parents('tr').find('.limit').attr('maxperorder'), 10);
            if (total > maxPerOrder) {
                var maxHtml = '<p class="red">（已达到最大限购数）</p>';

                if (typeof propertyStyle == 'string') {
                    var perObj = $(obj).closest('.tipPop').find('p.mt15');

                    if (perObj.find('p.red').length == 0) {
                        perObj.append(maxHtml);

                        if (typeof propertyStyle == 'string') {
                            propertyStyle = 'true';
                        }
                        setTimeout("BizShopping.HideMaxPerOrder('" + id + "', '" + propertyStyle + "')", 2000);
                    }
                } else {
                    var perObj = $(obj).closest("td");

                    if (perObj.find('p.red').length == 0) {
                        perObj.append(maxHtml);

                        setTimeout("BizShopping.HideMaxPerOrder('" + id + "', '" + propertyStyle + "')", 2000);
                    }
                }

                $(obj).val(oldQty);
                obj.focus();
                return;
            }

            $('#' + $(obj).attr("refId")).val(curQty);
            data = 'action=update&productno=' + productID + '&quantity=' + curQty + paramSoType;

            //增加个性属性参数
            var propertyids = $.trim($(obj).attr('propertyids'));
            var valueids = $.trim($(obj).attr('valueids'));

            if (typeof propertyids == 'string' && typeof valueids == 'string') {
                var propertyIDList = propertyids.split(',');
                var valueIDList = valueids.split(',');
                if (propertyIDList.length == valueIDList.length) {
                    var urlProperty = '&PersonalPropertySysNo=' + propertyids + '&PersonalPropertyValueSysNo=' + valueids;
                    data += urlProperty;
                }
            }
        }
        else if (id == 'applyCode1') {
            var promotionCode = $("#ticket").val();
            if (BizShopping.IsNullOrEmpty(BizShopping.Trim(promotionCode)) == true) {
                alert(resources_Shopping.ShoppingCartCheckPromotionCode);
                $("#ticket").focus();
                return;
            }
            data = 'action=apply&promotionCode=' + $.newegg.urlEncode(promotionCode) + paramSoType;
        }
        else if (id == 'cancelCode1') {
            data = 'action=cancel' + paramSoType;
        }
        else if (id == 'delGift1') {
            productID = $(obj).attr("ref1");
            data = 'action=giftdel&productno=' + productID + paramSoType;
        }
        else if (id == 'itemGiftDel1') {
            productID = $(obj).parents("tr").find("input").attr("ref1");
            giftProductID = $(obj).attr("ref1");
            data = 'action=itemgiftdel&productno=' + productID + '&giftDelID=' + giftProductID + paramSoType;
        }
        else if (id == 'moveOut1') {
            productID = $(obj).attr("ref1");
            data = 'action=moveout&productno=' + productID + paramSoType;
            url = url + '?' + 'action=add&productno=' + productID;
        }
        else if (id == 'removeInventory1' || id == 'removeInventory2') {
            $(obj).parent().find("span").each(function() {
                var removeId = $(this).attr("ref1");
                if (removeId) {
                    productID += removeId + ',';
                }
            }
            )
            productID = BizShopping.TrimEnd(productID, ',');
            data = 'action=del&productno=' + productID + paramSoType;
        }
        else if (id == 'moveInventory1' || id == 'moveInventory2') {
            $(obj).parent().find("span").each(function() {
                var removeId = $(this).attr("ref1");
                if (removeId) {
                    productID += removeId + ',';
                }
            }
            )
            productID = BizShopping.TrimEnd(productID, ',');
            data = 'action=moveout&productno=' + productID + paramSoType;
            url = url + '?' + 'action=add&productno=' + productID;
        }
        else if (id == 'moveAirCondition1' || id == 'moveCountrySide1' || id == 'moveDCItem1') {
            productID = $(obj).attr("ref1");
            data = 'action=moveout&productno=' + productID + paramSoType;
            url = url + '?' + 'action=add&productno=' + productID;
        }
        else if (id == 'removeAirCondition1' || id == 'removeCountrySide1' || id == 'removeDCItem1') {
            productID = $(obj).attr("ref1");
            data = 'action=del&productno=' + productID + paramSoType;
        }
        else if (id == 'clearCart1') {
            if (confirm(resources_Shopping.ShoppingCartClearPrompt)) {
                data = 'action=clear' + paramSoType;
            }
        }
        else if (id == 'checkOut1') {
            data = 'action=checkout' + paramSoType;
            if (paramSoType2 != "") {
                url = url + '?' + paramSoType2;
            }
        }
        else if (id == 'submitWarranty1') {
            var extendWrap = $(obj).attr("ref1");
            var isChecked = false;
            var warrantyID = '';
            productID = $(extendWrap).attr("ref1");
            $(extendWrap).find("input").each(function(i) {
                isChecked = $(this).attr("checked");
                if (isChecked == true || isChecked == 'checked') {
                    warrantyID = $(this).attr("ref2");
                }
            });
            if (BizShopping.IsNullOrEmpty(warrantyID) == true) {
                alert(resources_Shopping.ShoppingCartWarrantySelect);
                return;
            }
            if ($(obj).attr("ref2") == warrantyID) {
                $(obj).closest('div').hide();
                $(obj).closest('tr').hide();
                return;
            }
            data = 'action=warrantymodify&productno=' + productID + '&warrantyID=' + warrantyID + paramSoType;
        }
        else if (id == 'warrantyDel1') {
            var extendWrap = $(obj).attr("ref1");
            productID = $(extendWrap).attr("ref1");
            data = 'action=warrantydel&productno=' + productID + paramSoType;
        }
        else if (id == 'neweggGiftDel1') {
            productID = $(obj).attr("ref1");
            data = 'action=newegggiftdel&productno=' + productID + paramSoType;
        }
        else if (id == 'clearNeweggGift1') {
            data = 'action=clearnewegggift' + paramSoType;
        }
        else if (id == 'addNeweggGift_Single1') {
            var pID = $(obj).attr("ref1");
            var gID = $(obj).attr("ref2");
            data = 'action=addnewegggift&PID=' + pID + '&GID=' + gID + paramSoType;
        }
        else if (id == 'addNeweggGift_Multi1') {
            var pID = $(obj).attr("ref1");
            var gID = "";
            var selectCount = 0;
            $("#addNeweggGift_Multi_" + pID).find(":checkbox").each(function() {
                var val = $(this).attr("checked")
                if (val == true || val == 'checked') {
                    var removeId = $(this).attr("ref2");
                    if (removeId) {
                        selectCount++;
                        gID += removeId + ',';
                    }
                }
            }
            )
            if (selectCount == 0)
                return;
            gID = BizShopping.TrimEnd(gID, ',');
            data = 'action=addnewegggift&PID=' + pID + '&GID=' + gID + paramSoType;
        }
        //为了识别是否点击结帐时登录的
        data = data + '&shoppingIsLogin=' + shoppingIsLogin;
        //防止多次点击加载
        var isLoad = $(obj).attr('isload');
        if (typeof isLoad == 'string' && isLoad == 'true') return;
        $(obj).attr('isload', 'true');

        $.ajax({
            type: "GET",
            dataType: "html",
            url: baseUrl,
            cache: false,
            data: data,
            beforeSend: function(XMLHttpRequest) {
                centerPopB.open();

                var currentURL = document.location.href;
                if (currentURL.lastIndexOf("?") >= 0) {
                    currentURL = currentURL.substr(0, currentURL.lastIndexOf("?"));
                }
                XMLHttpRequest.setRequestHeader("Referer", currentURL);
                var prompt = "<span class=\"cmnLoadB\"><img src=\"" + resource_Image_Shopping.iconLoadingA + "\" align=\"absmiddle\" />" + resources_Shopping.PopupInfo + "</span>";
                if (id == 'applyCode1') {
                    //prompt = "<span  class=\"cmnLoadB\">"+resources_Shopping.PopupInfo+"</span>";
                    $("#ticket").next("a").remove();
                    $("#ticket").after(prompt);
                }
                else if (id == 'cancelCode1') {
                    //prompt = "<span  class=\"cmnLoadB\">"+resources_Shopping.PopupInfo+"</span>";
                    $("#cancelCode1").after(prompt);
                    $("#cancelCode1").remove();
                }
                else if (id == 'checkOut1') {
                    $('#checkOut1').hide();
                    $('.loading').show();
                }
                else if (id == 'submitWarranty1') {
                    $(obj).after(prompt);
                    $(obj).remove();
                }
                else if (actionType == 'addNewItem') {
                    prompt = "<span  class=\"cmnLoadB\">" + resources_Shopping.PopupInfo + "</span>";
                    $(obj).hide();
                    $(obj).after(prompt);
                }
                else if (id == 'addNeweggGift_Single1') {
                    $(obj).hide();
                    $(obj).after(prompt);
                }
                else if (id == 'addNeweggGift_Multi1') {
                    $(obj).hide();
                    $(obj).after(prompt);
                }
                else if (id == 'clearNeweggGift1') {
                    $(obj).hide();
                    $(obj).after("<span class=\"cmnLoadB\" style=\"float: left;\"><img src=\"" + resource_Image_Shopping.iconLoadingA + "\" align=\"absmiddle\" />" + resources_Shopping.PopupInfo + "</span>");
                }
            },
            complete: function(XMLHttpRequest, textStatus) {
                if (actionType == 'addNewItem') {
                    $(".cmnLoadB").remove();
                    $(obj).show();
                }
                else if (id == 'addNeweggGift_Single1') {
                    $(".cmnLoadB").remove();
                    $(obj).show();
                }
                else if (id == 'addNeweggGift_Multi1') {
                    $(".cmnLoadB").remove();
                    $(obj).show();
                }
                BizShopping.disablePopup();
                centerPopB.close();
            },
            error: function() {
                if (id == 'checkOut1') {
                    $(".cmnLoadB").remove();
                    $("#checkOut1").show();
                }
                BizShopping.systemError();
                $(obj).attr('isload', '');
            },
            success: function(ajaxData) {
                $(obj).attr('isload', '');
                BizShopping.proccessed(ajaxData, url, data, id, actionType, propertyStyle, propertyID, obj);
                if (isAllowReplace == true || isAllowReplace == 'checked') {
                    if ($('#IsAllowReplace').length > 0) {
                        $('#IsAllowReplace').attr('checked', 'checked');
                    }
                }
            }
        });
    },
    Trim: function(v) {
        return v.replace(/^\s+|\s+$/g, "")
    },
    systemError: function() {
        alert(resources_Shopping.SystemErrorInfo);
    },
    TrimEnd: function(v, c) {
        if (BizShopping.IsNullOrEmpty(c)) {
            c = "\\s";
        };
        var re = new RegExp(c + "*$", "ig");
        return v.replace(re, "");
    },
    IsNullOrEmpty: function(v) {
        return !(typeof (v) === "string" && v.length != 0);
    },
    disablePopup: function() {
        //disables popup only if it is enabled
        if (popupStatus == 1) {
            $("#backgroundPopup").hide();
            $(objElement).hide();
            popupStatus = 0;
        }
    },
    loadPopup: function(obj) {
        //loads popup only if it is disabled
        objElement = "#" + obj;
        if (popupStatus == 0) {
            $("#backgroundPopup").css({
                "opacity": "0"  // 
            });
            $("#backgroundPopup").show();
            $(objElement).show();
            popupStatus = 1;
        }
    },
    centerPopup: function(obj) {
        objElement = "#" + obj;
        //request data for centering
        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var popupHeight = $(objElement).height();
        var popupWidth = $(objElement).width();
        //centering
        $(objElement).css({
            "position": "absolute",
            "top": windowHeight / 2 - popupHeight / 2 + document.documentElement.scrollTop,
            "left": windowWidth / 2 - popupWidth / 2
        });
    },
    proccessed: function(ajaxData, url, data, id, actionType, propertyStyle, propertyID, obj) {
        /*
        * comment by bill.s.li
        * create date 2011-6-13
        * 实际AJAX回CALL业务处理函数
        */
        var resultQuery = $(ajaxData);
        var eorMessage;
        var resultType;
        $.each(resultQuery, function(index) {
            if (typeof (resultQuery[index]) != 'undefinded') {
                if (resultQuery[index].id == "AjaxShoppingPanelEorMessage") {
                    eorMessage = resultQuery[index].value;
                }
                else if (resultQuery[index].id == "AjaxShoppingPanelResultType") {
                    resultType = resultQuery[index].value;
                }
            }
        });
        if (resultType == 'CheckOut') {
            // 如果是第三方用户登录，直接跳转到CheckOut页面 
            if ($.newegg.cookie.get('LoginValidate', "Type").length > 0
            || ($.newegg.cookie.get('ThirdPartyLogin', "LogonType").length > 0 && $.newegg.cookie.get('ThirdPartyLogin', "LogonType") != "None")
            || openCheckOutForceLogin == "False") {

                window.location = url;
            }
            else {
                // 如果大于1小时强制登录
                if (CheckLoginTime(resources_Shopping.confCheckOutTimer)) {
                    window.location = url;
                } else {
                    window.location = $.newegg.buildWWW("Customer/Login.aspx", "secure") + "?ReturnUrl=" + encodeURIComponent(url);
                }


            }
            return;
        }
        if (resultType == 'CheckOutAZ') {
            window.location = url;
            return;
        }
        else if (resultType == 'SecondHandNotice') {
            var returnUrl = window.location.href;
            window.location.href = $.newegg.buildWWW("Shopping/SecondHandNotice.aspx?ProceedUrl=" + encodeURIComponent(url) + "&ReturnUrl=" + encodeURIComponent(returnUrl));
            return;
        }
        else if (resultType == 'Login') {
            var pageUrl = window.location.href;
            var urlIndex = pageUrl.indexOf("?");
            if (urlIndex > 0) {
                pageUrl = pageUrl.substring(0, urlIndex);
            }
            var qs = $.newegg.querystring.set("ReturnUrl", pageUrl + "?" + data);
            window.location = url + qs;
            return;
        }
        else if (resultType == 'Expries') {
            var popup = $("#pop1");
            $("#popBack").css({ opacity: "0" });
            $("#popBack").show();
            popup.show();
            $("#checkOut1").show();
            $(".process").remove();
            $(".cmnLoadB").remove();
            return;
        }
        else if (resultType == 'LoadShopping') {
            shoppingIsLogin = 0;
            alert("亲爱的山姆会员，您有新的商品优惠券哦！");
            var loadurl = window.location.href;
            window.location.href = loadurl;
            return;
        }
        else if (resultType == "SIMUserInfoFill") {
            window.location.href = $.newegg.buildWWW("Shopping/SIMUserInfoFill.aspx");
            return;
        }
        else if (resultType == "NoData") {
            var popup = $("#pop2");
            $("#popBack").css({ opacity: "0" });
            $("#popBack").show();
            popup.show();
            $("#checkOut1").show();
            $(".process").remove();
            $(".cmnLoadB").remove();
            return;
        }
        else if (resultType == "ContractPhoneError") {
            centerPopCheckOut("pop3", true);
            var popup = $("#pop3");
            $("#pop3MessageData").html(eorMessage);
            $("#popBack").css({ opacity: "0" });
            $("#popBack").show();
            popup.show();
            $("#checkOut1").show();
            $(".process").remove();
            $(".cmnLoadB").remove();
            return;
        }
        else if (resultType == "ContentPhoneUserInfo") {
            window.location.href = $.newegg.buildWWW("Shopping/ContractPhoneUserInfo.aspx");
            return;
        }
        else if (resultType == 'YearCostProductError') {
            /*暂时这样写，看情况修改*/
            centerPopCheckOut("pop3", true);
            var popup = $("#pop3");
            $("#pop3MessageData").html(eorMessage);
            $("#popBack").css({ opacity: "0" });
            $("#popBack").show();
            popup.show();
            $("#checkOut1").show();
            $(".process").remove();
            $(".cmnLoadB").remove();
            return;
        }

        var originalQty;
        if (actionType == "updateItemQuantity" || actionType == "updateItemQuantityAdd" || actionType == "updateItemQuantitySubtraction") {
            originalQty = parseInt($("#" + id).val(), 10);
        }
        $("#shoppingPanel").html(resultQuery);
        if (typeof propertyStyle == 'string') {
            if (id == 'del1') {
                $('#' + propertyID).find('.tipPop').attr('style', propertyStyle);
                Sam.ShoppingCartInit();
            } else {
                if (id != 'submitWarranty1') {
                    $('#' + id).parent().parent().parent().attr('style', propertyStyle);
                }
            }
        }

        $("#divTips p:last").addClass("noBdrBot");
        if (id == 'checkOut1') {
            window.scrollTo(0, 0);
        }
        if (actionType == "updateItemQuantityAdd" || actionType == "updateItemQuantitySubtraction" || actionType == "updateItemQuantity") {
            var currentQty = parseInt($("#" + id).attr("ref2"), 10);
            if (originalQty > currentQty) {
                alert('超出商品可购数量！');
            }
            else {
                var minQty = parseInt($("#" + id).parent().parent().prev().attr("minperorder"), 10);
                if (originalQty < minQty) {
                    alert('低于商品起购数量！');
                }
            }
            Sam.ShoppingCartInit();
            if (typeof propertyStyle == 'string') {
                propertyStyle = 'true';
                $('#' + id).parent().parent().parent().find('a.show').show();
            } else {
                $("#" + id).parent().next().show();
            }
            setTimeout("BizShopping.ChangeQtyHide('" + id + "', '" + propertyStyle + "')", 2000);
        }
        if (id == 'moveOut1') {
            BizShopping.showbasket(url);
        }
        else if (id == 'moveAirCondition1' || id == 'moveCountrySide1' || id == 'moveDCItem1') {
            BizShopping.showbasket(url);
        }
        else if (id == 'moveInventory1' || id == 'moveInventory2') {
            BizShopping.showbasket(url);
        }

        loadingMiniCart = false;
        miniCart('', 'refresh');
        Sam.ShoppingCartInit();

        if (id == 'clearNeweggGift1') {
            url = window.location.href.split("#")[0] + '#divPromList';
            window.location = url;
        }

        ///清空购物车后隐藏凑单推荐
        if ($('#shoppingPanel .bg_lightblue').length == 0) {
            $('.shoppingcart .recomend').hide();
        }
        //清空购物车，omniture代码
        if (id == 'clearCart1') {
            var productIds = resultQuery.filter("#clearProductId").val();
            try {
                var s = s_gi(s_account);
                s.linkTrackVars = 'products,events,prop1,eVar21,eVar22';
                s.linkTrackEvents = 'event3,scRemove';
                s.events = 'event3,scRemove';
                s.prop1 = reportsuite;
                s.products = productIds;
                s.tl(obj, 'o', 'Clear Shopping Cart');
            } catch (ex) { }
        }
    },
    ShowNeweggGiftConfirm: function() {
        if ($("#hidCouldSelectGift").val() === "1" && showNeweggGiftConfirmStatus == 1) {
            var flg = confirm(resources_Shopping.NeweggGiftSelectConfirm);
            if (flg === false) {
                $(".cmnLoadB").remove();
                $("#checkOut1").show();
                location = "#divPromList";
            }
            else if (flg === true) {
                showNeweggGiftConfirmStatus = 0;
            }
            return flg;
        }
        else {
            return true;
        }
    },
    ChangeQtyHide: function(id, propertyStyle) {
        if (propertyStyle == 'true') {
            $('#' + id).parent().parent().parent().find('a.show').hide();
        } else {
            $("#" + id).parent().next().hide();
        }
    },
    HideMaxPerOrder: function(id, propertyStyle) {
        if (propertyStyle == 'true') {
            $('#' + id).closest('.tipPop').find('p.mt15 .red').remove();
        } else {
            $("#" + id).closest('td').find('.red').remove();
        }
    },
    showbasket: function(url) {
        window.open(url, 'basketlist');
    }

};
var BizHideCtrl = {
    hide: function(switcher, obj) {
        if ($(obj).css("display") != "none") {
            var temp = $(obj).prev().length;
            if (temp == 0) {
                $(obj).closest('tr').hide();
            }
            $(obj).hide();

        } else {
            $(obj).closest('tr').show();
            $(obj).show();
        }
    },
    show: function(switcher, obj) {
        if ($(obj).css("display") != "none") {
            $(obj).closest('tr').hide();
            $(obj).hide();
        } else {
            $(obj).closest('tr').show();
            $(obj).show();
        }
    },
    show2: function(obj) {
        if ($(obj).css("display") != "none") {
            $(obj).hide();
        } else {
            $(obj).show();
        }
    }
};
var BizTradeIn = {
	validTextCountOldChangeNew:function(textareaName,em,strLength) {
	
		if($(textareaName).val().length>strLength)
			$(textareaName).val($(textareaName).val().substring(0,strLength));
	    if(em!=null)
			$(em).html(strLength - $(textareaName).val().length);	 
    },
    isLicence:function(value){
		var validateReg=/^[A-Za-z]{10}[0-9]{10}$/;
		return validateReg.test(value);
	},
    validLicence:function(value){
		BizTradeIn.clearMessage($("#code"));
		if(BizShopping.IsNullOrEmpty(BizShopping.Trim(value)))
		{
			BizTradeIn.buildWarningMessage($('#code +strong+ span'),resources_Shopping.OldChangeNewLicenceNotEmpty);
			return false;
		}
		else if(BizTradeIn.isLicence(BizShopping.Trim(value))==false)
		{
			BizTradeIn.buildWarningMessage($('#code +strong+ span') 
				,resources_Shopping.OldChangeNewInputFormatError);
			return false;							
		}
		else
		{
			return true;
		}
    },
    isPersonalCard:function(value){
		var validateReg=/(^\d{15}$)|(^\d{17}(\d|[A-Za-z]{1})$)/;
		return validateReg.test(value);
	},
	isOrganizationCodeCard:function(value){
		var validateReg=/^[A-Za-z0-9]{9}$/;
		return validateReg.test(value);
	},
    clearMessage:function(jqueryObj)
	{
	    var emObj = $(jqueryObj.parent().find('span')[0]);
	    emObj.empty();
	},
    validPersonalCard:function(value)
    {
		
		BizTradeIn.clearMessage($("#CertificateAccount"));
		BizTradeIn.ValidateHelper.clearMessage($("#code3"));
		var sentTypeValue = $("#certificate").val();
	
        if(sentTypeValue==0)//身份证
        {
			if(BizShopping.IsNullOrEmpty(BizShopping.Trim(value)))
			{  
				BizTradeIn.buildWarningMessage($('#CertificateAccount +strong+ span') 
					,resources_Shopping.OldChangeNewOldChangeNewCertificateAccountNotEmpty);
				return 1;																						
			}
           else if($("#HiddenCertificateAccount").val() != value
				&& BizTradeIn.isPersonalCard(BizShopping.Trim(value))==false)
           { 
				BizTradeIn.buildWarningMessage($('#CertificateAccount +strong+ span') 
					,resources_Shopping.OldChangeNewInputPersonalCardFormatError);
				return 1;
           }
           else
           {
				return 0;
           }           
        }
		else  if(sentTypeValue==1)//军官证
        {			
			if(BizTradeIn.validCode2($("#code2").val())==false)
			{
				return 2;
			}
			if(BizTradeIn.validCode3($("#code3").val())==false)
			{
				return 3;
			}
			return 0;
        }
        else  if(sentTypeValue==2)//士兵证
        {
			if(BizTradeIn.validCode2($("#code2").val())==false)
			{
				return 2;
			}
			if(BizTradeIn.validCode3($("#code3").val())==false)
			{
				return 3;
			}
			return 0;		
        }
        else  if(sentTypeValue==3)//组织机构代码证
        {
			if(BizShopping.IsNullOrEmpty(BizShopping.Trim(value)))
			{
				
				BizTradeIn.buildWarningMessage($('#CertificateAccount +strong+ span') 
					,resources_Shopping.OldChangeNewOldChangeNewCertificateAccountNotEmpty);
				return 4;
			}
			else if(BizTradeIn.isOrganizationCodeCard(BizShopping.Trim(value))==false)
			{
				BizTradeIn.buildWarningMessage($('#CertificateAccount +strong+ span') 
					,resources_Shopping.OldChangeNewInputOrganizationCodeCardFormatError);
				return 4;
			}
			else
			{
				return 0;
			}
        }
        else
        {
			return 0;
        }
    },
    validCode2:function(value)
    {		
		BizTradeIn.clearMessage($("#code3"));
		if(BizShopping.IsNullOrEmpty(BizShopping.Trim(value)))
		{
			BizTradeIn.buildWarningMessage($('#code3 +strong+ span') 
				,resources_Shopping.OldChangeNewOldChangeNewCertificateAccountNotEmpty);
			return false;
		}
		else if(BizShopping.Trim(value).length>24)
		{
			BizTradeIn.buildWarningMessage($('#code3 +strong+ span') 
				,resources_Shopping.OldChangeNewInputFormatError);
			return false;
		}
		else
		{
			return true;
		}		
    },  
    validCode3:function(value)
    {		
		BizTradeIn.clearMessage($("#code3"));
		if(BizShopping.IsNullOrEmpty($String.Trim(value)))
		{
			BizTradeIn.buildWarningMessage($('#code3 +strong+ span') 
				,resources_Shopping.OldChangeNewOldChangeNewCertificateAccountNotEmpty);
			return false;
		}
		else if(BizShopping.Trim(value).length>24)
		{
			BizTradeIn.buildWarningMessage($('#code3 +strong+ span') 
				,resources_Shopping.OldChangeNewInputFormatError);
			return false;
		}
		else
		{
			return true;
		}		
    },
    validCode:function()
    {	    
		if(BizTradeIn.validCode2($("#code2").val()) == false)
		{		
			return false;
		}
		else if(BizTradeIn.validCode3($("#code3").val()) == false)
		{			
			return false;
		}		
		else
		{
			return true;
		}			
    },
     validateStringValueForShippingAddress:function(obj,normalKey,warningKey)
    {
        var jqueryObj = $(obj);
        BizTradeIn.clearMessage(obj);
        if(BizShopping.IsNullOrEmpty($.trim(jqueryObj.val())))
        {
            BizTradeIn.warningMessageForPersonalInfo(jqueryObj,warningKey);
            return false;
        }
        else
        {
            if($.trim(jqueryObj.val()).length>20 && (normalKey=='AccountCenter_ModifyShippingAddress_ReceiveNameDesc' || normalKey=='AccountCenter_ModifyShippingAddress_ReceiveContactDesc')) 
           {
                BizTradeIn.warningMessageForPersonalInfo(jqueryObj,'AccountCenter_ModifyShippingAddress_InfoMaxLength');
                return false;
           } 
           else
           {
               BizTradeIn.normalMessageForShippingAddress(jqueryObj,normalKey);
               return true;
           }
        }
    },
    validCertificateName:function(value){
	
		BizShopping.clearMessage($("#contactor"));
		$('#contactor +strong+ span').removeAttr("style");
		
		if(BizShopping.IsNullOrEmpty(BizShopping.Trim(value)))
		{
			BizTradeIn.buildWarningMessage($('#contactor +strong+ span') 
				,resources_Shopping.OldChangeNewCertificateNameNotEmpty);
			return false;
		}
		else
		{
			return BizTradeIn.validateStringValueForShippingAddress($('#contactor') ,'OldChangeNew_CertificaterNameMessage','OldChangeNew_CertificaterNameMessage');
		}
    },
    validBankCustomerName:function(value){
		 BizTradeIn.clearMessage($("#mobi"));
		if(BizShopping.IsNullOrEmpty(BizShopping.Trim(value)))
		{
			BizTradeIn.buildWarningMessage($('#mobi +strong+ span') 
				,resources_Shopping.OldChangeNewBankCustomerNameNotEmpty);
			return false;
		}
		else
		{
			return true;
		}
    },
    validBankName:function(value)
    {
		BizTradeIn.clearMessage($("#bankname"));
		if(BizShopping.IsNullOrEmpty(BizShopping.Trim(value)))
		{
			BizTradeIn.buildWarningMessage($('#bankname +strong+ span') 
				,resources_Shopping.OldChangeNewBankNameNotEmpty);
			return false;
		}
		else
		{
			 return BizTradeIn.validateStringValueForShippingAddress($('#bankname') ,'OldChangeNew_BankNameMessage','OldChangeNew_BankNameMessage');
		}
    },
    validBranchBankName:function(value){
		BizTradeIn.clearMessage($("#BranchBankName"));
		if(BizShopping.IsNullOrEmpty(BizShopping.Trim(value)))
		{
			BizTradeIn.buildWarningMessage($('#BranchBankName +strong+ span') 
				,resources_Shopping.OldChangeNewBranchBankNameNotEmpty);
			return false;
		}
		else
		{
			 return BizTradeIn.validateStringValueForShippingAddress($('#BranchBankName') ,'OldChangeNew_BranchBankNameMessage','OldChangeNew_BranchBankNameMessage');
		}
    },
    validBankAccount:function(value)
    {		
		BizTradeIn.clearMessage($("#BankAccount"));		
		if(BizShopping.IsNullOrEmpty(BizShopping.Trim(value)))
		{
			BizTradeIn.buildWarningMessage($('#BankAccount +strong+ span') 
				,resources_Shopping.OldChangeNewBankAccountNotEmpty);
			return false;
		}
		else
		{
			return true;
		}
    },
    buildWarningMessage:function(emObj,msg)
    {
        var spanElement =  "<span style='background:transparent url("+ resource_Image_Shopping.iconA3_1//$Resource.BuildImage("icon/iconA3_1.gif")
+") no-repeat scroll 12px -1938px;color:#FF4C31;float:left;height:23px;line-height:23px;padding:0 10px 0 35px;margin-top:-3px;min-width:200px;'>"
            + msg
            + "</span>";
        emObj.empty().append(spanElement);
        emObj.css("margin-top","1px");
        emObj.css("float","left");
    },    
	reSetInputValue:function(obj,flag) 
	{
		BizTradeIn.clearMessage($("#CertificateAccount"));
		BizTradeIn.clearMessage($("#code3"));
		$("#code2").val("");
		$("#code3").val("");
		$("#CertificateAccount").val("");
		$("#contactor").val("");
		var selectedTypeObj= $("#certificate");
		if(selectedTypeObj.val()=="0")
		{
			document.getElementById("CertificateAccount").setAttribute("maxLength","18");
			$("#lblCardName").html(resources_Shopping.OldChangeNewIdentityLabelName);	
		}
		else if(selectedTypeObj.val()=="3")
		{
			document.getElementById("CertificateAccount").setAttribute("maxLength","9");
			$("#lblCardName").html(resources_Shopping.OldChangeNewOrganizationLabelName);
		}
		else
		{
			$("#lblCardName").html(resources_Shopping.OldChangeNewCertificateName);
		}    
		var o = document.getElementById(obj);
		var o1 = $("#" + obj + "_1");
		var o2 = $("#" + obj + "_2");
		if(flag=="0")
		{
			if (o.options[1].selected || o.options[2].selected) 
				{
					o1.hide();
					o2.show();
				}
				else
				{
					o2.hide();
					o1.show();
				}
				if(o.options[0].selected)
				{
					$("#certificate_title1").html(resources_Shopping.OldChangeNewIdentificationCardCode);
				}
				else if(o.options[1].selected )
				{
					$("#certificate_title2").html(resources_Shopping.OldChangeNewMilitaryOfficerCardCode);
				}
				else if(o.options[2].selected )
				{
					$("#certificate_title2").html(resources_Shopping.OldChangeNewSoldierCardCode);
				}
				else if(o.options[3].selected )
				{
					$("#certificate_title1").html(resources_Shopping.OldChangeNewOrganizationCodeCardCode);
				}
		}
		else
		{
			if(o.options[0].selected || o.options[3].selected)
				{
					o1.show();
					o2.hide();
				}
				else if (o.options[1].selected || o.options[2].selected) {
					o1.hide();
					o2.show();
				}
				if(o.options[0].selected )
				{
					$("#certificate_title1").html(resources_Shopping.OldChangeNewIdentificationCardCode);
				}
				else if(o.options[1].selected )
				{
					$("#certificate_title2").html(resources_Shopping.OldChangeNewMilitaryOfficerCardCode);
				}
				else if(o.options[2].selected )
				{
					$("#certificate_title2").html(resources_Shopping.OldChangeNewSoldierCardCode);
				}
				else if(o.options[3].selected )
				{
					$("#certificate_title1").html(resources_Shopping.OldChangeNewOrganizationCodeCardCode);
				}
		}
		
	} ,
	ShowTradeInCodeInputPop:function(productID,url,urlReferer)
    {	
        var chkConfirm = $("#confirm");
        if (chkConfirm != null)
        {
          var emChkObj = $($("#tradeInCode").parent().find('span')[1]);
	      emChkObj.empty();
	      emChkObj.removeClass("warning error");
          if ($("input[name='confirm']:checked").val() == "on")
          {
             $("#confirm").removeAttr("checked");
           }
        }
		BizShopping.loadPopup("pop4");
		BizShopping.centerPopup("pop4");
		var emObj = $($("#tradeInCode").parent().find('span')[0]);
	    emObj.empty();
	    emObj.removeClass();
	    var cookieValue = $.newegg.cookie.get('TradedIn',"TradeInCode");  //$State.GetValue($State.Name.TradedIn,"TradeInCode");	    
	    if(BizShopping.IsNullOrEmpty(cookieValue) == false)
	    {
			$('#tradeInCode').val(cookieValue);
		}
		$('#tradeInProductCodeInputInfoID').val(productID);
		$('#tradeInProductCodeInputInfoUrl').val(url);
		$('#tradeInProductCodeInputInfoUrlReferer').val(urlReferer);
		return false;
    },
    validLicenceForPop:function(){
		var emObj = $($("#tradeInCode").parent().find('span')[0]);
	    emObj.empty();
	    var value = BizShopping.Trim($("#tradeInCode").val());
		if(BizShopping.IsNullOrEmpty(value))
		{
			emObj.append(resources_Shopping.OldChangeNewTradeInCodeInputEmptyPrompt);			
			emObj.addClass("cmnErrorTip");
			return false;
		}
		else if(BizTradeIn.isLicence(value)==false)
		{
			emObj.append(resources_Shopping.OldChangeNewTradeInCodeInputErrorPrompt);
			emObj.addClass("cmnErrorTip");
			return false;							
		}
		else
		{
		    emObj.removeClass("cmnErrorTip");
			return true;
		}
    },
    validCheckedForPop:function()
    {
        var emObj = $($("#tradeInCode").parent().find('span')[1]);
	    emObj.empty();
	    if($("input[name='confirm']:checked").val()=="on")
		{
		    emObj.removeClass("cmnErrorTip");
            return true;
		}
	    else
		{
		    emObj.append(resources_Shopping.OldChangeNewTradeInCodeInputreadError);			
			emObj.addClass("cmnErrorTip");
			return false;
		}
    },
    removeCheck:function()
    {
        if($("input[name='confirm']:checked").val()=="on")
		{
		   $("#confirm").removeAttr("checked") ;
		}
    },
    CheckOutByTradeIn:function(checkOutTimer)
	{
		if(BizTradeIn.validLicenceForPop() && BizTradeIn.validCheckedForPop())
		{
			var tradeInCode = BizShopping.Trim($('#tradeInCode').val());
			var productID = BizShopping.Trim($('#tradeInProductCodeInputInfoID').val());
			var url = BizShopping.Trim($('#tradeInProductCodeInputInfoUrl').val());
			var urlReferer = BizShopping.Trim($('#tradeInProductCodeInputInfoUrlReferer').val());
			//$State.Save($State.Name.TradedIn, $Json.FromJson('{"Product":"'+productID+'","UrlReferer":"'+urlReferer+'","TradeInCode":"'+tradeInCode+'"}'));
			var jsonObject = JSON.parse('{"Product":"'+productID+'","UrlReferer":"'+urlReferer+'","TradeInCode":"'+tradeInCode+'"}');
			$.newegg.cookie.set("TradedIn",jsonObject,{topdomain:true,expires:0});
			if($.newegg.cookie.get("LoginValidate", "Type").length>0||($.newegg.cookie.get("ThirdPartyLogin", "LogonType").length>0&&$.newegg.cookie.get("ThirdPartyLogin", "LogonType")!="None")||openCheckOutForceLogin=="False") 
            {
               window.location = url;
            }
            else
            {
                // modify by bill.s.li
                // modify date 2011-6-17
                // 以旧换新，增加判断新蛋帐户是否是一个小时以内登录
                // 新蛋账户，检查是否是一小时以内登录，如果不是跳转到登陆页面强制登录  
                // 如果大于1小时强制登录
                if(CheckLoginTime(checkOutTimer))
                {
                    window.location = url;
                }
                else
                {
                    window.location = $.newegg.buildWWW("Customer/Login.aspx", "secure") + "?ReturnUrl=" + encodeURIComponent(url);
                }
            }
            
			BizShopping.disablePopup('pop4');
			return true;
		}
		else
		{
			return false;
		}		
	},
	normalMessageForShippingAddress:function(jqueryObj,msgKey)
	{
	    var emObj = $(jqueryObj.parent().find('span')[0]);
	    if(emObj != null)
	    {
	        var msg =  resources_Shopping[msgKey];
	        emObj.empty().append(msg);
	    }
	},
    warningMessageForPersonalInfo:function(jqueryObj,msgKey)
	{
	    if(jqueryObj[0] == null)return false;
	    var emObj = $(jqueryObj.parent().find('span')[0]);
	    var msg = resources_Shopping[msgKey];
	    var msglength=BizTradeIn.getLength(msg)*6;
        var spanElement ="<span style='background:transparent url("+resource_Image_Shopping.iconA3_1
+") no-repeat scroll 10px -1938px;color:#FF4C31;float:left;width:"+msglength+"px;height:23px;line-height:23px;padding:0 10px 0 35px;margin-top:0px'>"
            + msg + "</span>";
        emObj.empty().append(spanElement);
	    emObj.css("margin-top","0px");
	},
    getLength :function(value)
    {
       return value.replace(/[^\x00-\xff]/g,"**").length;
    }
};

var BizGetPingAnPoint = {
   post:function() 
    {
		var customerName = decodeURI(escape($.newegg.cookie.get("CustomerLogin", "ID")));
		
		var thridLogin = $.newegg.cookie.get("ThirdPartyLogin", "LogonType");
		if(customerName != "" && thridLogin == "PingAn")
		{
	        $.ajax({
            type: "post",
            dataType: "json",
            url: $.newegg.buildWWW("Ajax/Shopping/ShoppingCartRequest.aspx"),
            timeout: 100000,
            data: {Action:''},
            beforeSend: function(XMLHttpRequest) {
                //Loading show
            },
            success: function(data, textStatus) {
                //Process result data
               if(data.Data)
                {
				   $("#pingAnSpan").text(data.Description); 
                }
            },
            complete: function(XMLHttpRequest, textStatus) {
                //Loading hide
            },
            error: function() {
            }
			});
		}
    }
};
var slideProA = function() {
	var obj;
	var cell;
	var step;
	var total;
	var btnPre;
	var btnNext;
	var stepTime;
	var currLeft;
	var self = this;
	var dir;
	this.loading = function(o,num,moveStep,time, isAutoPlay, autoTime) { /*参数：包围对象id，每屏显示数量，每次滚动数量，滚动时间,是否自动滚动,自动滚动间隔时间*/
		obj = $("#" + o);
		cell = $("#" + o + " .moveable .itemCell");
		stepTime = time;
		
		step = moveStep;
		total = cell.length;
		btnPre = $("#" + o + " .pre");
		btnNext = $("#" + o + " .next");

		currLeft = 0;
		dir = "right";
		screenNum = num
		
		if(total <= screenNum) {
			btnPre.addClass("preDisable");
			btnNext.addClass("nextDisable");
		}
		else {
			//点击向右滚动按钮
			btnNext.click(function() {
				dir = "right";
				self.moveCell();
				currLeft = currLeft + step;
				if(currLeft >= total) {
					currLeft = 0;
					self.showAll();
				}
			});
		
			//点击向右滚动按钮
			btnPre.click(function() {
				currLeft = currLeft - step;
				dir = "left";
				if(currLeft <= 0-step) {
					currLeft = total - step;
					self.hideAll();
					self.moveCell();
				}
				else {
					self.moveCell();
				}
			});
			
			//自动播放
			if(isAutoPlay == true) {
				var autoPlay = setInterval(function(){
					btnNext.click();
				},autoTime);
				obj.mouseenter(function(){
					clearInterval(autoPlay);
				});
				obj.mouseleave(function(){
					autoPlay = setInterval(function(){
						btnNext.click();
					},autoTime);
				});
			}
		}
	}
	
	this.showAll = function() { /*显示全部单元*/
		cell.fadeIn(stepTime);
	}
	this.hideAll = function() { /*隐藏全部单元*/
		cell.fadeOut(stepTime);
	}
	
	this.moveCell = function() { /*滚动缩略图*/
		if(dir == "right") {
			for(i=currLeft;i<=currLeft+step-1;i++) {
				cell.eq(i).fadeOut(stepTime);
			}
		}
		else {
			for(i=currLeft;i<=currLeft+step-1;i++) {
				cell.eq(i).fadeIn(stepTime);
			}
		}
	}
}
$("#divTips p:last").addClass("noBdrBot");
var slidePro1 = new slideProA();
slidePro1.loading("hotSale", 4, 4, 400, false,3000);
var slidePro2 = new slideProA();
slidePro2.loading("relatedPro", 4, 4, 400, false,3000);
function centerPopCheckOut(o,clickOut) {
	var popup = $("#" + o);
	letCenter(o);
	$(".shuter").click(function(){
		popup.hide();
		$("#popBack").hide();
	});
	if(clickOut == true) {
		$("#popBack").click(function(){
			popup.hide();
			$("#popBack").hide();
		});
	}
}
centerPopCheckOut("pop1",true);
centerPopCheckOut("pop2",true);
centerPopCheckOut("pop3",true);
if($.newegg.cookie.get("Blank") != "C" && IsBlank.toUpperCase() == 'TRUE')
{
    var regexProductDetail=/Product\/\w{2}-\w{2,3}-\w{3,5}\.htm/i;
    var regexHelpCenter=/Service\/HelpCenter.aspx/i;
    
    $("#shoppingPanel .tips").find("a").each(function(i,link){
        if(regexProductDetail.test(link) || regexHelpCenter.test(link))
        {
            $(link).attr("target",'_blank');
        }
    });
    
    $("#shopCart").find("a").each(function(i,link){
        if(regexProductDetail.test(link) || regexHelpCenter.test(link))
        {
            $(link).attr("target",'_blank');
        }
    });
}
//Press Escape event!
	$(document).keypress(function(e){
		if(e.keyCode==27 && popupStatus==1){
			BizShopping.disablePopup();
		}
	});
	
	
var BizShoppingGift={
    MultiSelect:function(obj){
        var curCheckbox=$(obj);
        var promotionNo=curCheckbox.attr("ref1");
        var maxNum=parseInt(curCheckbox.attr("ref3"),10);
        var count=0;
        $("#addNeweggGift_Multi_"+promotionNo).find(":checkbox").each(function(){
            if( $(this).attr("checked") == true){	
			    count++;
			    if(count>maxNum){
			        curCheckbox.attr("checked",'');
			        $("#cmnErrorTip_"+promotionNo).show();
			        return;
			    }
            }       
          });
        if(count<=maxNum){
            $("#cmnErrorTip_"+promotionNo).hide();
        }
    }
};

var Sam = Sam || {}
Sam.ShoppingCartInit = function() {

    UI.Xslider(".recomend", {
        unitDisplayed: 4,
        numtoMove: 4
    });

    $(".ashowtip").hover(function() {
        if ($.trim($(this).next().html()) == '') {
            return false;
        }
        $(this).siblings(".tipPop").css({
            left: $(this).offset().left,
            top: $(this).offset().top + $(this).height() - $("#main").offset().top
        }).show();
    }, function() {
        $(this).siblings(".tipPop").hide();
    });

    $(".op_limit").find(".oper,.intxt").click(function() {
        var obj = $(this).parent().siblings(".amtPop");
        if ($.trim(obj.html()) == '') {
            return false;
        }

        obj.css({
            left: $(this).offset().left,
            top: $(this).offset().top + $(this).height() - $("#main").offset().top
        }).show();
        return false;
    });

    $(".amtPop").find(".btn, .close").click(function() {
        $(".amtPop").hide();
        return false;
    });

    var allowReplace = $('.wmallowreplace').length;
    if (allowReplace == 0) {
        $('#IsAllowReplace').parent().parent().hide();
    } else {
        $('#IsAllowReplace').parent().parent().show();
    }

    ///附加优惠券事件
    $('.ticketinfo ul label').unbind('click').bind('click', function() {
        var val = $(this).attr('num');
        $('#ticket').val(val);
    });

    //运费提示
    var mouseon = false;
    var tooltip = $('<div id="tooltip"><p class="info"></p></div>');
    $("body").append(tooltip);
    $(".hint").unbind().bind({
        mouseover: function(e) {
        var tip = $(this).attr('title');
        mouseon = true;
        $(this).attr('title', '');
        tooltip.find('.info').text(tip);
        tooltip.css({
            'top': e.pageY + 10,
            'left': e.pageX
        }).show();
        },
        mousemove: function(e) {
        tooltip.css({
            'top': e.pageY + 10,
            'left': e.pageX
        })
        },
        mouseout: function(e) {
        if (mouseon == true) {
            $(this).attr('title', tooltip.find('.info').html());
            tooltip.hide();
            mouseon = false;
            }
        }
    });
}

Sam.MultiSelect = function(obj) {
    var curCheckbox = $(obj);
    var promotionNo = curCheckbox.attr("ref1");
    var maxNum = parseInt(curCheckbox.attr("ref3"), 10);
    var count = 0;
    $("#addNeweggGift_Multi_" + promotionNo).find(":checkbox").each(function() {
        var val = $(this).attr("checked");
        if (val == true || val == 'checked') {
            count++;
            if (count > maxNum) {
                curCheckbox.attr("checked", false);
                $("#cmnErrorTip_" + promotionNo).show();
                return;
            }
        }
    });
    if (count <= maxNum) {
        $("#cmnErrorTip_" + promotionNo).hide();
    }
}

///加入常购清单
Sam.JoinOftenBuyList = function(obj) {
    if (mini.enable) {
        mini.returnUrl = $.newegg.buildWWW("Shopping/ShoppingCart.aspx");
        if (mini.checkLogin(obj, 3600)) {
            often_AlwaysList.add(obj, 'main_wrap');
        }
    }
    else {
        often_AlwaysList.add(obj, 'main_wrap');
    }
    return false;
}

///凑单推荐
Sam.CollectSingle = function(addobj) {

    //Ga
    try { _gaq.push(['_trackEvent', 'Click', 'addtocart']); } catch (ex) { }

    var obj = $(addobj);
    productid = parseInt(obj.attr('ref1'), 10);
    var omnitrueCategoryAndProductName = obj.attr('ref2');
    quantity = parseInt(obj.parent().parent().find('.op :input.intxt').val(), 10);

    if (! ~ ~productid || ! ~ ~quantity) {
        return;
    }

    //omniture addCart
   // omnitureAddCartOrBuy(productid, addobj);
    omnitureAddCartOrBuyName(productid, addobj, omnitrueCategoryAndProductName);
    var url = $.newegg.buildWWW("Shopping/ShoppingCart.aspx");
    url += $.newegg.format('?action=Add&productno={0}&quantity={1}', productid, quantity);

    window.location.href = url;
}

