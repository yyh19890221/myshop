usingNamespace("Biz.Common")["OpenWindow"] = {
    showbasket:function (url) 
    {
        window.open(url, 'basketlist');
    },
    ShowPicture1:function (url)
    {
        window.open(url, '', 'width=715,height=800,top=60,left=300,resizable=1,scrollbars=1,status=no,toolbar=no,location=no,menu=no');
    },
    ShowPicture2:function (url)
    {
        window.open(url, '', 'width=1000,height=800,top=60,left=100,resizable=1,scrollbars=1,status=no,toolbar=no,location=no,menu=no');
    },
    openMemberPriceInfo:function (url)
    {
        window.open(url, '', 'width=410,height=400,top=60,left=300,resizable=1,scrollbars=1,status=no,toolbar=no,location=no,menu=no');
    },
    showbasket:function (url,modality,attribute) 
    {
        window.open(url, modality, attribute);
    },
    openTransmitGiftCard: function(theURL, winName, features, code) {
        if ($("#BindCard_" + code).length > 0 && $("#BindCard_" + code).is(":hidden") == false) {
            window.open(theURL, winName, features);
        }
        else {
            alert(My_GiftCard.CantForward);
        }

    }
};

usingNamespace("Biz.Common")["RecommendProduct"] = {
    Delay:function(url) 
    {
        var baseUrl = url;

        $.ajax({
            type: "GET",
            dataType: "html",
            url: baseUrl,
            cache: false,

            beforeSend: function(XMLHttpRequest) {
            },
            success: function(data) {
                Biz.Common.RecommendProduct.proccessed(data);
            },
            complete: function(XMLHttpRequest, textStatus) {
            },
            error: function() {
            }
        });
    },
    proccessed:function(data)
    {
        if($String.IsNullOrEmpty($String.Trim(data)))
        {
            return;
        }

        var resultQuery = $(data);
        $("#recommendProductWrapper").html(resultQuery);
        $("#recommendProductWrapper").hide();
        $("#recommendProductWrapper").fadeIn("slow");
    }

}



usingNamespace("Biz.Common")["RelatedRecommendProducts"] = {
    Scroll:function(direction,pagesize) 
    {
        var total = parseInt($("#relatedRecommendProductHide").attr("totalItem"));

        if(total <=pagesize)
        {
            return;
        }
        var curpage = parseInt($("#relatedRecommendProductHide").attr("currentPage"));
        var totalPage = Math.ceil(total / pagesize);

        if(direction=='next')
        {
            if(curpage >= totalPage)
            {
                curpage = 1;
            }
            else
            {
                curpage++;
            }
        }
        else
        {
            if(curpage<=1)
            {
                curpage = totalPage;
            }
            else
            {
                curpage--;
            }
        }

        var preLimit = (curpage - 1) * pagesize;
        var nextLimit = curpage * pagesize - 1;

        $("#relatedRecommendProductList").hide();
        $("#relatedRecommendProductList").fadeOut("slow");
        $("#relatedRecommendProductList").empty();

        $("#relatedRecommendProductHide ul").each(function(i) {
            var index = parseInt($(this).attr("index"));
               if(index >=preLimit && index <= nextLimit)
               {
                $("#relatedRecommendProductList").append($(this).clone());
            }
        });

        $("#relatedRecommendProductHide").attr("currentPage", curpage);
        $("#relatedRecommendProductList").hide();
        $("#relatedRecommendProductList").fadeIn("slow");
    }
};

usingNamespace("Biz.Common")["PageHeader"] = {
    DoSearch:function(forName) 
    {
        var searchKeyWord = $.trim($("#txtKeyWord" + forName).val());
        var searchValue = $Resource.BuildContent("SearchValueNull");
        if(searchKeyWord==null || searchKeyWord==searchValue || $String.IsNullOrEmpty(searchKeyWord)==true)
        {        
            var message = $Resource.BuildContent("MustInputKeyWords");
            alert(message);
            return;
        }
        var encodedKeyWord = searchKeyWord.replace(/\#/g, "%23").replace(/\&/g, "%26").replace(/\+/g, "%2B");
        location.href = $Url.BuildUrl("Search.aspx?keyword=" + encodedKeyWord, "WWW");
    },
    OnInit:function(formName) 
    {
        if ($('#txtKeyWord' + formName) == null) { return; }
        $('#txtKeyWord' + formName).keydown(function(event) {
          if(event.keyCode==13) 
          {
                Biz.Common.PageHeader.DoSearch(formName);
                return false;
            }
        });
    },
    CurrentTabStore:function()
    {
        var currentPage = Environment.PageName;
        if(currentPage == "TabStore" || currentPage == "Category" || currentPage == "SubCategory" || currentPage == "Product")
        {
            var string = Web.Utils.String;
            var tabStoreValue = string.Trim($(".crumb a:eq(1)").text());
            if (tabStoreValue == "") {
                tabStoreValue = $(".crumb em").text()
            }
            $("#topNav .topNav li").each(function(i) {
                var topMenuValue = string.Trim($(this).find("span span").text());
                if (tabStoreValue == topMenuValue) {
                    $(this).addClass("current");
                }
            });
        }
    }
};

usingNamespace("Biz.Common")["PromptText"] = {
    systemError:function ()
    {
        alert($Resource.BuildContent("SystemErrorInfo"));
    },
    textBoxFocus:function (obj)
    {
        obj[0].style.color = "#000000";
        if($.trim(obj.val())==obj.attr("init_value"))
        {
            obj.val("");
        }
    },
    textBoxBlur:function (obj)
    {
        if($.trim(obj.val())=="")
        {
           if(obj[0].id=="orderMemo")
           {
                obj[0].style.color = "#666666";
            }
           else
           {
                obj[0].style.color = "#999999";
            }
            obj.val(obj.attr("init_value"));
        }
        if($.trim(obj.val())==obj.attr("init_value"))
        {
           if(obj[0].id=="orderMemo")
           {
                obj[0].style.color = "#666666";
            }
           else
           {
                obj[0].style.color = "#999999";
            }
        }
    },
    textBoxValueOrEmpty:function (textBoxID,initValue)
    {
        var obj = $("#" + textBoxID);
        if(obj[0]==null)
        {
            return;
        }

        obj.attr("init_value", initValue);

        obj.focus(function() { Biz.Common.PromptText.textBoxFocus(obj); });
        obj.blur(function() { Biz.Common.PromptText.textBoxBlur(obj); });
        Biz.Common.PromptText.textBoxBlur(obj);
    }
};

usingNamespace("Biz.Common")["TabCtrl"] = {
    tabs: function(s) {
        var styleWrap = "." + s;
        var tabsClass = $(styleWrap);
        if (tabsClass.length) {
            styleWrap = "." + s;
            $(styleWrap + " .tabHead a").click(function() {
                var tabsIdName = $(this).parents(styleWrap).get(0).id;
                var tab = $(this).parents(".tabHead").children("*");
                var tabNum = tab.length;
                tab.removeClass("currentBtn");

                if ($(this).parents(".tabHead").children("a").length > 0)
                    $(this).addClass("currentBtn");
                else
                    $(this).parent().addClass("currentBtn");

                for (var i = 1; i <= tabNum; i++) {
                    $("#" + tabsIdName + "_" + i).css("display", "none");
                }
                $("#" + tabsIdName + "_" + this.rel).css("display", "").show();
                $("#" + tabsIdName).data("currSubName", tabsIdName + "_" + this.rel);
                return false;
            });
        }
    }
};

usingNamespace("Biz.Common")["HideCtrl"] = {
    hide: function(switcher, obj) {
        if ($(obj).css("display") != "none") {
            $(obj).hide();
            $(switcher).removeClass("show");
            $(switcher).addClass("hide");
        } else {
            $(obj).show();
            $(switcher).removeClass("hide");
            $(switcher).addClass("show");
        }
    },
    show: function(switcher, obj) {
        if ($(obj).css("display") != "none") {
            $(obj).hide();
            $(switcher).removeClass("hide");
            $(switcher).addClass("show");
        } else {
            $(obj).show();
            $(switcher).removeClass("show");
            $(switcher).addClass("hide");
        }
    }
};

usingNamespace("Biz.Common")["TableCtrl"] = {
    odd: function() {
        var targetTable1 = document.getElementById("specialTable");
        if (!targetTable1) return false;

        var odd = false;
        var specialTR = targetTable1.getElementsByTagName("tr");
        if (!specialTR) return false;
        for (i = 1; i < specialTR.length; i++) {
            if (odd == true) {
                specialTR[i].className = "";
                odd = false;
            } else {
                specialTR[i].className = "odd";
                odd = true;
            }
        }

    }
};

usingNamespace("Biz.Common")["OnOffCtrl"] = {
    onoff_2: function(s) {
        var obj = $(s);
        if (obj.length) {
            obj.mouseover(function() {
                obj.removeClass("over");
                $(this).addClass("over");
            });
        }
    },
    onoff: function onoff(s) {
        var objStyle = "." + s;
        var obj = $(objStyle);
        if (obj.length) {
            if (Browser.IE) {
                obj.parent().hover(function() {
                    $(this).addClass("over");
                }, function() {
                    obj.parent().removeClass("over");
                });
            } else {
                obj.parent().mouseover(function() {
                    $(this).addClass("over");
                }).mouseout(function() {
                    $(this).removeClass("over");
                });
            }
        }
    },
    onoffDelay: function onoffDelay(s) {
        var timer, timer2;
        var objStyle = "." + s;
        var obj = $(objStyle);
        obj.parent().mouseover(function() {
            var current = $(this);
            if ($(this).find(objStyle).css("display") == "block") {
                current.addClass('over');
                clearTimeout(timer2);
            } else {
                timer = setTimeout(function() {
                    current.addClass('over');
                }, 350);
            }
        }).mouseout(function() {
            var current = $(this);
            if (timer) {
                clearTimeout(timer);
                timer2 = setTimeout(function() {
                    current.removeClass('over');
                }, 350);
            }
        });
        obj.mouseover(function() {
            $(this).parent().addClass('over');
        });
    }
};

usingNamespace("Biz.Common")["MoveCtrl"] = {
    iniUnit: function(wrapId, id, dftNum, intStep) {
        var obj = $("#" + id).find(".moveUnit");
        var objNum = obj.length;
        if (objNum > dftNum) {
            Biz.Common.MoveCtrl.addEvent(wrapId, id, dftNum, "next", intStep)
        }
    },
    addEvent: function(wrapId, id, dftNum, strPN, intStep) {
        var strTitle;
        var objClick = $("#" + wrapId + " ." + strPN + "View");
        var objNumHref = objClick.find("a").length;
        objClick.removeClass(strPN + "Stop");

        if (objNumHref != 0)
            objClick = objClick.find("a");

        strTitle = objClick.find("span").text();
        objClick.attr("title", strTitle);
        objClick.click(function() {
            Biz.Common.MoveCtrl.moveUnit(wrapId, id, dftNum, strPN, intStep);
            return false;
        });
    },
    moveUnit: function(wrapId, id, dftNum, strPN, intStep) {
        if ($("#" + wrapId).data("currSubName") != null)
            id = $("#" + wrapId).data("currSubName");
        var n = $("#" + id).data("nowUnit");
        if (isNaN(n)) n = 0;

        var objClick = $("#" + wrapId + " ." + strPN + "View");
        var objNumHref = objClick.find("a").length;
        objClick.removeClass(strPN + "Stop");
        if (objNumHref != 0)
            objClick = objClick.find("a");

        var obj = $("#" + id).find(".moveUnit");
        var objNum = obj.length;

        if (strPN == "next") {
            for (var i = 0; i < intStep; i++) {
                $(obj[n]).hide("fast");
                if (n == 0) {
                    $("#" + wrapId + " .prevView").removeClass("prevStop");
                    Biz.Common.MoveCtrl.addEvent(wrapId, id, dftNum, "prev", intStep);
                }
                n = n + 1;
                if (n > (objNum - dftNum - 1)) {
                    n = objNum - dftNum;
                    $("#" + wrapId + " .nextView").addClass("nextStop");
                    objClick.unbind("click").attr("title", "");
                }
            }
        } else {
            for (var i = 0; i < intStep; i++) {
                n = n - 1;
                $(obj[n]).show("fast");
                if (n + dftNum + intStep == objNum) {
                    $("#" + wrapId + " .nextView").removeClass("nextStop");
                    Biz.Common.MoveCtrl.addEvent(wrapId, id, dftNum, "next", intStep);
                }
                if (n <= 0) {
                    n = 0;
                    $("#" + wrapId + " .prevView").addClass("prevStop");
                    objClick.unbind("click").attr("title", "");
                }
            }
        }

        $("#" + id).data("nowUnit", n);
    }
};

//SETTING UP OUR POPUP
//0 means disabled; 1 means enabled;
var popupStatus = 0;

usingNamespace("Biz.Common")["PopCtrl"] = {
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
    disablePopup: function() {
        //disables popup only if it is enabled
        if (popupStatus == 1) {
            $("#backgroundPopup").hide();
            $(objElement).hide();
            popupStatus = 0;
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
    }
};

usingNamespace("Biz.Common")["ShowPicture"] = {
    openDialog:function (url,sysNo)
    {
        window.open(url + '?sysno=' + sysNo, '', 'width=715,height=800,top=60,left=300,resizable=1,scrollbars=1,status=no,toolbar=no,location=no,menu=no');
    }
};

usingNamespace("Biz.Common")["Poll"] = {
    clickPoll: function(pollUrl, pollSysNo, type) {
        var pollItemSysNo = $('input[@name=vote4NewYear][@checked]').val();
        if(typeof(pollItemSysNo)=='undefined')
        {
            pollItemSysNo = 0;
        }
        var url = pollUrl + "?" + "PollSysno=" + pollSysNo + "&PollType=" + type;
        if (type == "1") {
            url += "&PollItemSysno=" + pollItemSysNo;
        }
        window.open(url, "", "");
    }
};
usingNamespace("Biz.Common")["BrowseHistory"] = {
    ClearHistory:function(id) 
    {
        $State.Clear($State.Name.BrowsedProductSysNoList);
        document.getElementById(id).style.display = "none";
    }
};
usingNamespace("Biz.Common")["Validation"] = {

    textCount:function(field,counter,maxLimit) 
    {
        var message = $(field).val();
        if ($(field).val().length > maxLimit)
            $(field).val(message.substring(0, maxLimit))
        //$(counter).text(maxLimit-field.value.length);     
    },
     refreshValidator:function(img,input)
       {
        $(img).attr('src', $(img).attr('src') + "&r=" + Math.random());
        $(input).focus();
    },
    isUrl:function(s){var strRegex =  
                            /^((http(s)?|ftp|telnet|news|rtsp|mms):\/\/)?(((\w(\-*\w)*\.)+[a-zA-Z]{2,4})|(((1\d\d|2([0-4]\d|5[0-5])|[1-9]\d|\d).){3}(1\d\d|2([0-4]\d|5[0-5])|[1-9]\d|\d).?))(:\d{0,5})?(\/+.*)*$/;
                            return strRegex.test(s);},
    isDecimal: function(d) { var pattern = /^(([1-9]\d{0,12})|0)(\.\d{1,2})?$/; return pattern.test(d); },
    isEmail: function(s) {
        var pattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        return pattern.test(s);
    },
    isLowEmail: function(s) {
        var b, e;
        b = s.indexOf("@");
        e = s.indexOf(".");
        if (b <= 0) return false;
        if (e < 0 || e == (s.length - 1)) { return false; }
        return true;
    },
    clearNoNum: function(event, obj) {
        event = window.event || event;
        if (event.keyCode == 37 | event.keyCode == 39) {
            return;
        }
        obj.value = obj.value.replace(/[^\d.]/g, "");
        obj.value = obj.value.replace(/^\./g, "");
        obj.value = obj.value.replace(/\.{2,}/g, ".");
        obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    },
    checkNum: function(obj) {
        obj.value = obj.value.replace(/\.$/g, "");
    },
	isInteger:function(value)
	{
        var integerReg = new RegExp(/^\d+$/);
        return integerReg.test(value);
    },
	isValidateReg:function(value)
	{
        var validateReg = /^([A-Za-z0-9\s\-\_\~\!\@\#\$\%\^\&\*\(\)\|\<\>\?\:\;\"\'\.\[\]\{\}\,\+\`\/\\\=]){6,20}$/;
	   if(validateReg.test(value))
	   {
            return true;
        }
        return false;
    },
	isDate:function(strValue)
	{
        var objRegExp = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/

        if (!objRegExp.test(strValue))
            return false;
        else {
            var arrayDate = strValue.split(RegExp.$1);
            var intDay = parseInt(arrayDate[2], 10);
            var intYear = parseInt(arrayDate[0], 10);
            var intMonth = parseInt(arrayDate[1], 10);
            if (intMonth > 12 || intMonth < 1) {
                return false;
            }
            var arrayLookup = { '1': 31, '3': 31, '4': 30, '5': 31, '6': 30, '7': 31,
        '8' : 31,'9' : 30,'10' : 31,'11' : 30,'12' : 31} 
            if (arrayLookup[parseInt(arrayDate[1])] != null) {
                if (intDay <= arrayLookup[parseInt(arrayDate[1])] && intDay != 0)
                    return true;
            }
            if (intMonth - 2 == 0) {
                var booLeapYear = (intYear % 4 == 0 && (intYear % 100 != 0 || intYear % 400 == 0));
                if (((booLeapYear && intDay <= 29) || (!booLeapYear && intDay <= 28)) && intDay != 0)
                    return true;
            }
        }
        return false;
    },
    isZip: function(value) {
        var validateReg = /^[0-9]{6}$/;
        return validateReg.test(value);
    },
    checkSpecialChar: function(value) {
        var validateReg = /([~!@#$%^&*\/\\,.\(\)]){6,16}$/;
        return validateReg.test(value);
    },
    CheckSpecialString :function(value)
    {
        var validateReg = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/;
        return validateReg.test(value);
    },
    isTel: function(s) {
        var patrn = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/
        if (!patrn.exec(s)) return false
        return true
    },

    isMobile:function(value)
    {
        var validateReg = /^1\d{10}$/;
        return validateReg.test(value);
    },
    getLength :function(value)
    {
        return value.replace(/[^\x00-\xff]/g, "**").length;
    },
    isLicence: function(value) {
        var validateReg = /^[A-Za-z]{10}[0-9]{10}$/;
        return validateReg.test(value);
    },
    isPersonalCard: function(value) {
        var validateReg = /(^\d{15}$)|(^\d{17}(\d|[A-Za-z]{1})$)/;
        return validateReg.test(value);
    },
    isOrganizationCodeCard: function(value) {
        var validateReg = /^[A-Za-z0-9]{9}$/;
        return validateReg.test(value);
    },
    isBankAccount: function(value) {
        var validateReg = /^[1-9]{1}[0-9]*$/;
        return validateReg.test(value);
    },
    MaxLength:function(field,maxlimit)
    { 
        var j = field.value.replace(/[^\x00-\xff]/g, "**").length;
        var tempString = field.value;
        var tt = "";
       if(j > maxlimit)
       {
        for(var i=0;i<maxlimit;i++)
        {
                if (tt.replace(/[^\x00-\xff]/g, "**").length < maxlimit)
                    tt = tempString.substr(0, i + 1);
                else
                    break;
            }
        if(tt.replace(/[^\x00-\xff]/g,"**").length > maxlimit) 
        {
                tt = tt.substr(0, tt.length - 1);
                field.value = tt;
            }
       else
       { 
                field.value = tt;
            }
        }
    }
};

usingNamespace("Biz.Common")["ValidateHelper"] = {
    normalMessage: function(jqueryObj, msgKey) {
        var emObj = $(jqueryObj.parent().find('em')[0]);
        var subSpan = emObj.find('span')[0];
        if (subSpan != null) {
            var msg = $Resource.BuildContent(msgKey);
            emObj.empty().append(msg);
            emObj.css("margin-top", "2px");
        }
    },
    normalMessageForShippingAddress: function(jqueryObj, msgKey) {
        var emObj = $(jqueryObj.parent().find('em')[0]);
        if (emObj != null) {
            var msg = $Resource.BuildContent(msgKey);
            emObj.empty().append(msg);
        }
    },
    normalMessageForCheckOut: function(jqueryObj, msgKey) {
        var emObj = $(jqueryObj.parent().find('em')[0]);
        var subSpan = emObj.find('span')[0];
        if (subSpan != null) {
            var msg = $Resource.BuildContent(msgKey);
            emObj.empty().append(msg);
            //emObj.css("margin-top","8px");
        }
    },
    warningMessageForPersonalInfo: function(jqueryObj, msgKey) {
        if (jqueryObj[0] == null) return false;
        var emObj = $(jqueryObj.parent().find('em')[0]);
        var msg = $Resource.BuildContent(msgKey);
        var msglength = Biz.Common.Validation.getLength(msg) * 6;
        var spanElement = "<span style='background:transparent url(" + $Resource.BuildImage("icon/iconA3_1.gif")
+ ") no-repeat scroll 10px -1938px;color:#FF4C31;float:left;width:" + msglength + "px;height:23px;line-height:23px;padding:0 10px 0 35px;margin-top:0px'>"
            + msg + "</span>";
        emObj.empty().append(spanElement);
        emObj.css("margin-top", "0px");
    },
    warningMessageForDay: function(jqueryObj, msgKey) {
        if (jqueryObj[0] == null) return false;
        var emObj = $(jqueryObj.parent().find('em')[0]);
        var msg = $Resource.BuildContent(msgKey);
        var spanElement = "<span style='background:transparent url(" + $Resource.BuildImage("icon/iconA3_1.gif")
+ ") no-repeat scroll 10px -1938px;color:#FF4C31;float:left;width:270px;height:23px;line-height:23px;padding:0 10px 0 35px;margin-top:0px'>"
            + msg + "</span>";
        emObj.empty().append(spanElement);
        emObj.css("margin-top", "0px");
    },
    warningMessage: function(jqueryObj, msgKey) {
        if (jqueryObj[0] == null) return false;
        var emObj = $(jqueryObj.parent().find('em')[0]);
        var msg = $Resource.BuildContent(msgKey);

        var spanElement = "<span style='background:transparent url(" + $Resource.BuildImage("icon/iconA3_1.gif")
+ ") no-repeat scroll 12px -1938px;color:#FF4C31;float:left;height:23px;line-height:23px;padding:0 10px 0 35px;font-weight:lighter;width:140px'>"
            + msg
            + "</span>";
        emObj.empty().append(spanElement);
        emObj.css("margin-top", "1px");
    },
    areaWarningMessage: function(jqueryObj, msgKey) {
        var emObj = $(jqueryObj.parent().find('em')[0]);
        emObj.empty();
        emObj.hide();
        var provinceObj = $(jqueryObj.parent().find('#region')[0])
        var cityObj = $(jqueryObj.parent().find('#city')[0])
        if (provinceObj.val() == '-1') {
            Biz.Common.ValidateHelper.areaShowWarningMessage(emObj, provinceObj, 'AccountCenter_ModifyShippingAddress_ProvinceError');
        }
        else if (cityObj.val() == '-1') {
            Biz.Common.ValidateHelper.areaShowWarningMessage(emObj, cityObj, 'AccountCenter_ModifyShippingAddress_CityError');
        }
        else if (jqueryObj.val() == '-1') {
            Biz.Common.ValidateHelper.areaShowWarningMessage(emObj, jqueryObj, msgKey);
        }
    },
    areaShowWarningMessage: function(emObj, jqueryObj, msgKey) {
        if (jqueryObj.val() == '-1') {
            var msg = $Resource.BuildContent(msgKey);
            //            var spanElement = "<span style='background:transparent url("+$Resource.BuildImage("icon/iconA3_1.gif")
            //+") no-repeat scroll 12px -1938px;color:#FF4C31;float:left;width:60px;height:23px;line-height:23px;padding:0 10px 0 35px;margin-top:0px;font-weight:lighter'>"
            //                + msg
            //                + "</span>";
            emObj.empty().append(msg);
            emObj.attr("class", "Validform_checktip Validform_wrong");
            emObj.attr("style", "");
            // emObj.show();
        }
        else {
            emObj.empty();
            emObj.hide();
        }
    },
    warningMessageForShippingAddress: function(jqueryObj, msgKey) {
        Biz.Common.ValidateHelper.clearMessage(jqueryObj);
        if ($String.IsNullOrEmpty($.trim(jqueryObj.val()))) {
            var emObj = $(jqueryObj.parent().find('em')[0]);
            var msg = $Resource.BuildContent(msgKey);

            var spanElement = "<span style='background:transparent url(" + $Resource.BuildImage("icon/iconA3_1.gif")
+ ") no-repeat scroll 12px -1938px;color:#FF4C31;float:left;height:23px;line-height:23px;padding:0 10px 0 35px;'>"
                + msg
                + "</span>";
            emObj.empty().append(spanElement);
            emObj.css("margin-top", "1px");
        }
    },
    warningMessageInclueReplace: function(jqueryObj, msgKey, replaceValue) {
        var emObj = $(jqueryObj.parent().find('em')[0]);
        var msg = $Resource.BuildContent(msgKey);
        msg = msg.replace('{0}', replaceValue);
        var spanElement = "<span style='background:transparent url(" + $Resource.BuildImage("icon/iconA3_1.gif")
+ ") no-repeat scroll 12px -1938px;color:#FF4C31;float:left;height:23px;line-height:23px;padding:0 10px 0 35px;'>"
            + msg
            + "</span>";
        emObj.empty().append(spanElement);
        emObj.css("margin-top", "1px");
    },
    clearMessage: function(jqueryObj) {
        var emObj = $(jqueryObj.parent().find('em')[0]);
        emObj.empty();
    },
    clearMessageForShippingAddress: function(jqueryObj, normalKey) {
        var emObj = $(jqueryObj.parent().find('em')[0]);
        emObj.empty();
        Biz.Common.ValidateHelper.normalMessageForShippingAddress($(jqueryObj), normalKey);
    },
    validateStringValue: function(obj, normalKey, warningKey) {
        var jqueryObj = $(obj);
        Biz.Common.ValidateHelper.clearMessage(obj);
        if ($String.IsNullOrEmpty($.trim(jqueryObj.val()))) {
            Biz.Common.ValidateHelper.warningMessage(jqueryObj, warningKey);
        }
        else {
            Biz.Common.ValidateHelper.normalMessage(jqueryObj, normalKey);
        }
    },
    validateStringValueForShippingAddress: function(obj, normalKey, warningKey) {
        var jqueryObj = $(obj);
        Biz.Common.ValidateHelper.clearMessage(obj);
        if ($String.IsNullOrEmpty($.trim(jqueryObj.val()))) {
            Biz.Common.ValidateHelper.warningMessageForPersonalInfo(jqueryObj, warningKey);
            return false;
        }
        else {
            if ($.trim(jqueryObj.val()).length > 20 && (normalKey == 'AccountCenter_ModifyShippingAddress_ReceiveNameDesc' || normalKey == 'AccountCenter_ModifyShippingAddress_ReceiveContactDesc')) {
                Biz.Common.ValidateHelper.warningMessageForPersonalInfo(jqueryObj, 'AccountCenter_ModifyShippingAddress_InfoMaxLength');
                return false;
            }
            else {
                Biz.Common.ValidateHelper.normalMessageForShippingAddress(jqueryObj, normalKey);
                return true;
            }
        }
    },
    validateStringValueForCellPhone: function(obj, normalKey, warningKey, checkempty) {
        var jqueryObj = $(obj);
        Biz.Common.ValidateHelper.clearMessageForShippingAddress(obj, normalKey);
        if (checkempty == 'yes') {
            Biz.Common.ValidateHelper.warningMessageForPersonalInfo(jqueryObj, warningKey);
            return;
        }
        if ($.trim(jqueryObj.val()) != '') {
            if (!Biz.Common.Validation.isMobile($.trim(jqueryObj.val()))) {
                Biz.Common.ValidateHelper.warningMessageForPersonalInfo(jqueryObj, warningKey);
            }
        }
        else {
            Biz.Common.ValidateHelper.normalMessage(jqueryObj, normalKey);
        }
    },
    validateStringValueForZip: function(obj, warningKey) {
        var jqueryObj = $(obj);
        Biz.Common.ValidateHelper.clearMessage(obj);
        if (!$String.IsNullOrEmpty($.trim(jqueryObj.val()))) {
            if (!Biz.Common.Validation.isZip(jqueryObj.val())) {
                Biz.Common.ValidateHelper.warningMessageForPersonalInfo(jqueryObj, warningKey);
            }
        }
        else {
            Biz.Common.ValidateHelper.warningMessageForPersonalInfo(jqueryObj, 'AccountCenter_PersonalInfo_ZipEmpty');
        }
    },

    validationSystemAddressArea: function(obj, warningKey) {
        var jqueryObj = $(obj);
        var areaID = parseInt(jqueryObj.val());
        if (areaID <= 0) {
            Biz.Common.ValidateHelper.warningMessage(jqueryObj, warningKey);
        }
        else {
            var emObj = $(jqueryObj.parent().find('em')[0]);
            var subSpan = emObj.find('strong span')[0];
            if (subSpan != null) {
                emObj.empty().append('<strong>*</strong>');
                emObj.css("margin-top", "2px");
            }
            else {
                subSpan = emObj.find('span')[0];
                if (subSpan != null) {
                    emObj.empty().append('*');
                    emObj.css("margin-top", "8px");
                }
            }
        }
    }
};

usingNamespace("Biz.Common")["Loading"] = {
    showForRemoveElement: function(jqueryObj) {
        if (jqueryObj[0] != null) {
            var displayContent = $Resource.BuildContent("PopupInfo");
            jqueryObj.after('<p id="divLoading" class="process" style="width:150px" ><span>' + displayContent + '</span></p>');
            jqueryObj.hide();
        }
    },
    showChangeSOElement: function(jqueryObj) {
        if (jqueryObj[0] != null) {
            var displayContent = $Resource.BuildContent("PopupInfo");
            jqueryObj.after('<p id="divLoading" class="process" style="width:150px;position: absolute;margin:0 10px;" ><span>' + displayContent + '</span></p>');
            jqueryObj.hide();
        }
    },
    removeLoadingForShowElement: function(jqueryObj) {
        if (jqueryObj[0] != null) {
            var divObj = jqueryObj.parent().find('#divLoading');
            if (divObj[0] != null) {
                divObj.remove();
            }
            jqueryObj.show();
        }
    },

    show: function(jqueryObj) {
        if (jqueryObj[0] != null) {
            var displayContent = $Resource.BuildContent("PopupInfo");

            var left = jqueryObj.offset().left;
            var top = jqueryObj.offset().top;
            var width = jqueryObj.width();
            var height = jqueryObj.height();

            left += width + 20;
            top += height / 2 - 24;

            var divObj = $('<p id="divLoading" class="process" style="position: absolute;width:150px;height:14px"><span>' + displayContent + '</span></p>');
            divObj.css('zindex', 100);
            divObj.css('left', left.toString() + "px");
            divObj.css('top', top.toString() + "px");
            jqueryObj.append(divObj);
        }
    },

    showAreaCenter: function(jqueryObj) {
        if (jqueryObj[0] != null) {
            var left = jqueryObj.offset().left;
            var top = jqueryObj.offset().top;
            var displayContent = $Resource.BuildContent("PopupInfo");

            var width = jqueryObj.width();
            var height = jqueryObj.height();

            left += width / 2 - 75;
            top += height / 2 - 20;

            var divObj = $('<p id="divLoading" class="process" style="position: absolute;width:150px"><span>' + displayContent + '</span></p>');
            divObj.css('zindex', 100);
            divObj.css('left', left.toString() + "px");
            divObj.css('top', top.toString() + "px");
            jqueryObj.append(divObj);
        }
    },

    showAreaCenterForCheckOut: function(jqueryObj) {
        if (jqueryObj[0] != null) {
            var left = jqueryObj.offset().left;
            var top = jqueryObj.offset().top;
            var displayContent = $Resource.BuildContent("PopupInfo");

            var width = jqueryObj.width();
            var height = jqueryObj.height();

            left += width / 2 - 75;
            top += height / 2 - 28;

            var divObj = $('<p id="divLoading" class="process" style="position: absolute;width:150px"><span>' + displayContent + '</span></p>');
            divObj.css('zindex', 100);
            divObj.css('left', left.toString() + "px");
            divObj.css('top', top.toString() + "px");
            jqueryObj.append(divObj);
        }
    },

    removeLoading: function(jqueryObj) {
        if (jqueryObj[0] != null) {

            var divObj = jqueryObj.find('#divLoading');
            if (divObj[0] != null) {
                divObj.remove();
            }
        }
    },

    showLoadingForPersonalInfo: function(jqueryObj) {
        if (jqueryObj[0] != null) {

            var displayContent = $Resource.BuildContent("PopupInfo");
            var divObj = $('<p id="divLoading" style="background:#FFFEE2 none repeat scroll 0 0;margin:0px auto 0 310px;border:1px solid #FFB903;padding:8px 12px;list-style-image:none;list-style-position:outside;list-style-type:none;width:150px;height:4px;" ><span style="text-align:center; margin-top:-6px;padding-left:23px;color:#FF6600;background:transparent url(' + $Resource.BuildImage("icon/iconE.gif")
+ ') no-repeat scroll center left;">' + displayContent + '</span></p>');
            jqueryObj.before(divObj);
            jqueryObj.hide();
        }
    }
};
usingNamespace("Biz.Common")["GetPingAnPoint"] = {
   post:function() 
    {
        var customerName = decodeURI(escape($State.GetValue("CustomerLogin", "ID")));
        var thridLogin = $State.GetValue("ThirdPartyLogin", "LogonType");

		if(customerName != "" && thridLogin == "PingAn")
		{
            $.ajax({
                type: "post",
                dataType: "json",
                url: $Url.BuildCurrentUrl("Ajax/Shopping/ShoppingCartRequest.aspx"),
                timeout: 100000,
                data: { Action: '' },
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

usingNamespace("Biz.Common")["Browser"] = {
    FixIE6PNG:function() 
    {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            var imgurl = $Resource.BuildImage("common/blank.gif");

            var rslt = navigator.appVersion.match(/MSIE (\d+\.\d+)/, '');
            var itsAllGood = (rslt != null && Number(rslt[1]) >= 5.5);
            if (itsAllGood) {
                for (var i = 0; i < document.all.length; i++) {
                    var obj = document.all[i];
                    var bg = obj.currentStyle.backgroundImage;
                    var img = document.images[i];
                    if (bg && bg.match(/\.png/i) != null) {
                        var img = bg.substring(5, bg.length - 2);
                        var offset = obj.style["background-position"];
                        obj.style.filter =
            "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img + "', sizingMethod='crop')";
                        obj.style.backgroundImage = "url('" + imgurl + "')";
                        obj.style["background-position"] = offset; // reapply
                    } else if (img && img.src.match(/\.png$/i) != null) {
                        var src = img.src;
                        img.style.width = img.width + "px";
                        img.style.height = img.height + "px";
                        img.style.filter =
            "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='crop')"
                        img.src = imgurl;
                    }
                }
            }
        }
    }
};
usingNamespace("Biz.Common")["CoreMetrics"] = {
    BuildCoreMetricsLink:function (category ,index) 
    {
        return;
    }
};

usingNamespace("Biz.Common")["Ajax"] = {
    HandleCommonAjaxData: function(ajaxResponse) {
        if(typeof(ajaxResponse) == 'undefined')
        {
            return true;
        }

        var jsonResult = Web.Utils.Json.FromJson(ajaxResponse);
        if(jsonResult == false)
        {
            return true;
        }

	    if(jsonResult.Type==MessageType.Error && jsonResult.Description=="Tag:Login")
	    {
            window.location.href = window.location.href;
            return false;
        }

        //put your logic here

        return true;
    }
};

///Sam
var Sam = Sam || {};
Sam.Purchase = Sam.Purchase || {};

///加减数量
Sam.ChangeQty = function(qtyobj, action) {
    var obj;
    if (action == 'add') {
        obj = $(qtyobj).prev();
    } else if (action == 'subtract') {
        obj = $(qtyobj).next();
    } else if (action == 'add1') { //由于改版后顺序不同，故后加上这两个add1,subtract1
        obj = $(qtyobj).next("input");
    } else if (action == 'subtract1') {
      obj = $($(qtyobj).siblings("input")[0]);
    }
    else {
        obj = $(qtyobj);
    }

    currentQty = parseInt(obj.val(), 10);
    maxPerOrder = parseInt(obj.attr('maxperorder'), 10);
    minPerOrder = parseInt(obj.attr('minperorder'), 10);
    bufferQty = parseInt(obj.attr('bufferqty'), 10);

    if (! ~ ~currentQty) {
        obj.val(minPerOrder);
        return;
    }

    if (action == 'add' || action == 'add1') {
        currentQty += bufferQty;
        if (currentQty > maxPerOrder) {
            //alert('不能再加啦，每日限购数' + maxPerOrder + '哦');
        }
    } else if (action == 'subtract' || action == 'subtract1') {
        currentQty -= bufferQty;
        if (currentQty < minPerOrder) {
            //alert('不能再减啦，最低起购数' + minPerOrder + '哦');
        }
    }

    if (currentQty < 1 || currentQty < minPerOrder) {
        currentQty = minPerOrder;
    } else if (currentQty > maxPerOrder) {
        currentQty = maxPerOrder;
    }

    obj.val(currentQty);
}

///购买
Sam.Purchase = function(addobj, quantity) {
    //Ga
    try { _gaq.push(['_trackEvent', 'Click', 'addtocart']); } catch (ex) { }

    var obj = $(addobj);
    productid = parseInt(obj.attr('value'), 10);
    var omnitrueCategoryAndProductName = obj.attr('ref1');
    if (quantity == null) {
        quantity = parseInt(obj.parent().parent().find('.op :input.intxt').val(), 10);
    }

    if (! ~ ~productid || ! ~ ~quantity) {
        return;
    }

    //omniture addCart
   // omnitureAddCartOrBuy(productid, addobj);
    omnitureAddCartOrBuyName(productid, addobj, omnitrueCategoryAndProductName);
    Sam.Purchase.Ajax(productid, quantity);
}


Sam.BuyToBuyPurchase = function(addobj, quantity) {
    //Ga
    try { _gaq.push(['_trackEvent', 'Click', 'addtocart']); } catch (ex) { }

    var obj = $(addobj);
    productid = parseInt(obj.attr('value'), 10);
    var omnitrueCategoryAndProductName = obj.attr('ref1');
    quantity = 1;
    if (quantity == null) {
        quantity = parseInt(obj.parent().parent().find('.op :input.intxt').val(), 10);
    }

    if (! ~ ~productid || ! ~ ~quantity) {
        return;
    }

    //omniture addCart
    //omnitureAddCartOrBuy(productid, addobj);
    omnitureAddCartOrBuyName(productid, addobj, omnitrueCategoryAndProductName);
    Sam.Purchase.Ajax(productid, quantity);
}

///批量购买
Sam.BatchPurchase = function(productidList, quantityList,objE) {
    //Ga
try { _gaq.push(['_trackEvent', 'Click', 'addtocart']); } catch (ex) { }

    //omniture addCart
    omnitureAddCartOrBuy(productidList, objE);
    
    Sam.Purchase.Ajax(productidList, quantityList);
}

///
Sam.Purchase.doingAjax = false;
Sam.Purchase.Ajax = function(productid, quantity) {
    Sam.Purchase.notHideMiniCart = true;


    if (Sam.Purchase.doingAjax == true) {
        Sam.Purchase.addLazyAjax(productid, quantity);
        return;
    }
    Sam.Purchase.doingAjax = true;

    $.ajax({
        type: 'post',
        dataType: 'json',
        data: { productid: productid, quantity: quantity },
        url: $.newegg.buildWWW('Ajax/Shopping/AddCart.aspx'),
        timeout: 30000,
        cache: false,
        success: function(data, textStatus) {
            if (data.Description == 'YES') {
                Sam.Purchase.loadMiniCart();
            }
        },
        complete: function() {
            Sam.Purchase.exeLazyAjax();
            Sam.Purchase.doingAjax = false;
        }
    });
}
Sam.Purchase.lazyAjaxSet = [];
Sam.Purchase.addLazyAjax = function(productid, quantity) {
    Sam.Purchase.lazyAjaxSet.push(function() {
        Sam.Purchase.Ajax(productid, quantity);
    });
}
Sam.Purchase.exeLazyAjax = function() {
    if (Sam.Purchase.lazyAjaxSet && Sam.Purchase.lazyAjaxSet.length > 0) {
        var funAjax = Sam.Purchase.lazyAjaxSet.pop();
        if (funAjax) {
            funAjax();
        }
    }
}
Sam.Purchase.loadMiniCart = function() {
    var miniCartObj = $('#wmminicart');
    var loadCallBack = function() {
        miniCartObj.show('slow');
        Sam.Purchase.notHideMiniCart = true;
        Sam.Purchase.lazyHideMiniCart(miniCartObj);
    }
    miniCart('', 'loading', miniCartObj, loadCallBack);
}
Sam.Purchase.NoloadMiniCart = function() {
    var miniCartObj = $('#wmminicart');
    var loadCallBack = function() {
        // miniCartObj.show('slow');
        // Sam.Purchase.notHideMiniCart = true;
        //  Sam.Purchase.lazyHideMiniCart(miniCartObj);
    }
    miniCart('', 'loading', miniCartObj, loadCallBack);
}

Sam.Purchase.notHideMiniCart = false;
Sam.Purchase.lazyHideMiniCart = function(miniCartObj) {
    if (Sam.Purchase.notHideMiniCart) {
        Sam.Purchase.notHideMiniCart = false;
        
        setTimeout(function() {
            Sam.Purchase.lazyHideMiniCart(miniCartObj);
        }, 3000);
        
    } else {
        miniCartObj.hide('slow');
    }
}


closeTipPopFunction = function() {
    $.ajax({
        type: "post",
        url: $.newegg.buildWWW("Ajax/Customer/AjaxAlwaysListIndexShow.aspx"),
        dataType: "json",
        //async: false,
        timeout: 30000,
        data: { alwayslist: $(".tipPop").find(".icon_tip").attr("alwayslist") },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //Biz.Common.PromptText.systemError();
        },
        success: function(data, textStatus) {
        },
        complete: function(XMLHttpRequest, textStatus) {
        }
    });

    $(".tipPop").hide();
}

gotoOftenShoppingList = function() {
    if ($(".tipPop").find(".icon_tip").attr("alwayslist") == "Y") {
        $.ajax({
            type: "post",
            url: $.newegg.buildWWW("Ajax/Customer/AjaxAlwaysListIndexShow.aspx"),
            dataType: "json",
            //async: false,
            timeout: 30000,
            data: { alwayslist: $(".tipPop").find(".icon_tip").attr("alwayslist") },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //Biz.Common.PromptText.systemError();
            },
            success: function(data, textStatus) {
                window.location = $.newegg.buildCurrent('Customer/OftenShoppingList.aspx');
            },
            complete: function(XMLHttpRequest, textStatus) {
            }
        });
    }
    $(".tipPop").hide();
}


