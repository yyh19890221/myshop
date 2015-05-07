$(function() {

    $("#pwd").keydown(function(e) {
        var key = window.event ? e.keyCode : e.which;
        if (key.toString() == '9') {
            $("#validator").focus();
            return false;
        }

    });
    $(".issam label,.issam input").click(function() {
        var me = $(this).parent();
        var p = $(".issam");
        p.find("label").addClass("gray");
        p.find(".msg").hide();

        var ipts = me.parent().find(":radio:checked");
        var pipts = ipts.parent();
        pipts.find("label").removeClass("gray");
        pipts.find(".msg").show();
        $(".regBox1,.regBox2,.regBox3").hide();
        $("." + $(this).attr("tabPanel")).show();
    });

    $(".boxbody input[type=text],.boxbody input[type=password]").focus(function() {
        var me = $(this)
        var li = me.parent().parent().parent();
        li.addClass("over");

    });

    $(".boxbody input[type=text],.boxbody input[type=password]").focusout(function() {
        var me = $(this)
        var li = me.parent().parent().parent();
        li.removeClass("over");

    });

    $.fn.Validform && $(".formsub").Validform({
        //btnSubmit: ".formInput .btn_Submit",
        //showAllError:true,
        tiptype: function(msg, o, cssctl) {
            if (!o.obj.is("form")) {
                var inputobj = o.obj;
                var objtip = o.obj.parents(".inputText").siblings(".Validform_checktip");
                //cssctl(objtip, o.type);
                //objtip.hasClass("MyDefine") || objtip.text(msg);
                if (objtip.hasClass("MyDefine")) {//不为空的时候我们可以定义MyDefine类自己定义显示的文字
                    if (inputobj.val().length > 0) {
                        if ($String.Trim(inputobj.val()) == "") {
                            if (inputobj.attr("ignore") != "ignore") {
                                cssctl(objtip, o.type);
                                objtip.text(msg);
                            }
                            else {
                                objtip.removeClass("Validform_wrong").text("");
                            }
                        }
                    }
                    else {
                        if (inputobj.attr("ignore") == "ignore") {
                            objtip.removeClass("Validform_wrong").text("");
                        }
                        else {
                            cssctl(objtip, o.type);
                            objtip.text(msg);
                        }
                    }
                    //                if (objtip.hasClass("MyDefine")) {//不为空的时候我们可以定义MyDefine类自己定义显示的文字
                    //                    if ($String.Trim(inputobj.val()) != "") {
                    //                        cssctl(objtip, o.type);
                    //                        objtip.text(msg);
                    //                    }
                } else {
                    cssctl(objtip, o.type);
                    objtip.text(msg);
                }

            } else {
                //var objtip=o.obj.find("#msgdemo");
                //cssctl(objtip,o.type);
                //objtip.text(msg);
            }
        },
        usePlugin: {
            passwordstrength: {
                minLen: 6,
                maxLen: 20
            }
        },
        datatype: {//传入自定义datatype类型，可以是正则，也可以是函数（函数内会传入一个参数）;
            "memberCardNum": function(gets, obj) {//参数gets是获取到的表单元素值，obj为当前表单对象;
                var memberCardNum = $String.Trim(gets);

                if (memberCardNum != null && memberCardNum.length == 15) {
                    memberCardNum = memberCardNum.substr(0, 8) + "00" + memberCardNum.substr(8, 7);
                }
                if (memberCardNum != null && memberCardNum.length != 17) {
                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(obj.attr("errormsg"));
                    return false;
                }
                $.ajax({
                    type: "post",
                    url: $Url.BuildCurrentUrl("Ajax/Shopping/CheckCustomerInfo.aspx"),
                    dataType: "json",
                    timeout: 30000,
                    data: { Type: "CardNum", MemberCardNum: memberCardNum },
                    beforeSend: function(XMLHttpRequest) {

                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        Biz.Common.PromptText.systemError();
                    },
                    success: function(data, textStatus) {
                        if (data.Type == MessageType.Error) {
                            var returnInfo = data.Description.split(':');
                            if (returnInfo.length > 0) {
                                //Biz.Login.Register.buildWarningMessage($("#emailAgain"), returnInfo[1]);
                                obj.parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                                return false; //true和false有什么区别
                            }
                        } else {
                            obj.parents("li").find(".Validform_checktip").removeClass("Validform_wrong").addClass("Validform_right").text("通过信息验证！");
                            return true;
                        }
                    },
                    complete: function(XMLHttpRequest, textStatus) {
                        Biz.Common.PopCtrl.disablePopup();
                    }
                });
                //return false;
            },
            "userName": function(gets, obj) {//参数gets是获取到的表单元素值，obj为当前表单对象;
                var userName = $String.Trim(gets);
                if (userName.length > 20 || userName.length < 4) {
                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text("用户名长度不能小于4或者大于20");
                    return;
                }
                var customerInfo = {
                    CustomerCode: $String.Trim(userName)
                };
                $.ajax({
                    type: "post",
                    url: $Url.BuildCurrentUrl("Ajax/Shopping/CheckCustomerInfo.aspx"),
                    dataType: "json",
                    timeout: 30000,
                    data: { Flag: 'customercode', CustomerCode: encodeURI(customerInfo.CustomerCode) },
                    success: function(data, textStatus) {
                        if (data.Type == MessageType.Error) {
                            var returnInfo = data.Description.split(':');
                            if (returnInfo.length > 0) {
                                if (returnInfo[0] == 'userError') {
                                    //Biz.Login.Register.buildWarningMessage($("#email"), returnInfo[1]);
                                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                                    return false;
                                }
                            }
                        }
                        else {
                            obj.parents("li").find(".Validform_checktip").removeClass("Validform_wrong").addClass("Validform_right").text("通过信息验证！");
                            return true;
                        }
                    },
                    complete: function(XMLHttpRequest, textStatus) {
                        Biz.Common.PopCtrl.disablePopup();
                    }
                });
                //return false;
            },


            "userEmail": function(gets, obj) {//参数gets是获取到的表单元素值，obj为当前表单对象;
                var userEmail = $String.Trim(gets);
                var reg1 = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                if (!reg1.test(gets)) {
                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(obj.attr("errormsg"));
                    return false;
                }
                var customerInfo = {
                    Email: $String.Trim(userEmail)
                };
                $.ajax({
                    type: "post",
                    url: $Url.BuildCurrentUrl("Ajax/Shopping/CheckCustomerInfo.aspx"),
                    dataType: "json",
                    timeout: 30000,
                    data: { Flag: 'email', Email: customerInfo.Email },
                    success: function(data, textStatus) {
                        if (data.Type == MessageType.Error) {
                            var returnInfo = data.Description.split(':');
                            if (returnInfo.length > 0) {
                                if (returnInfo[0] == 'emailError') {
                                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                                    return false;
                                }
                            }
                        }
                        else {
                            obj.parents("li").find(".Validform_checktip").removeClass("Validform_wrong").addClass("Validform_right").text("通过信息验证！");
                            return true;
                        }
                    },
                    complete: function(XMLHttpRequest, textStatus) {
                        Biz.Common.PopCtrl.disablePopup();
                    }
                });
                //return false;
            },
            "userBirthYear": function(gets, obj) {//参数gets是获取到的表单元素值，obj为当前表单对象;
                var userBirthYear = $String.Trim(gets);
                if ($String.IsNullOrEmpty(userBirthYear) || !Biz.Common.Validation.isInteger(userBirthYear)) {
                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(obj.attr("errormsg"));
                    return false;
                }
                else if (Biz.Common.Validation.isInteger(userBirthYear)) {
                    if (parseInt(userBirthYear) < 1900 || parseInt(userBirthYear) > new Date().getFullYear()) {
                        obj.parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(obj.attr("errormsg"));
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_wrong").addClass("Validform_right").text("通过信息验证！");
                }
                //return false;
            },
            "personalCard": function(gets, obj) {//参数gets是获取到的表单元素值，obj为当前表单对象;
                var personalCard = $String.Trim(gets);
                var reg1 = /(^\d{15}$)|(^\d{17}(\d|[A-Za-z]{1})$)/;
                if (!reg1.test(gets)) {
                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(obj.attr("errormsg"));
                    return false;
                }
                else {
                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_wrong").addClass("Validform_right").text("通过信息验证！");
                }
                //return false;
            },
            "mobileTel": function(gets, obj) {//参数gets是获取到的表单元素值，obj为当前表单对象;
                var mobileTel = $String.Trim(gets);
                var reg1 = /^1\d{10}$/;
                if (!reg1.test(mobileTel)) {
                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(obj.attr("errormsg"));
                    return false;
                }
                else {
                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_wrong").addClass("Validform_right").text("通过信息验证！");
                }
                //return false;
            },
            "telephone": function(gets, obj) {//参数gets是获取到的表单元素值，obj为当前表单对象;
                var telephone = $String.Trim(gets);
                var reg1 = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
                var reg2 = /^1\d{10}$/;
                if (reg1.test(telephone)) {
                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_wrong").addClass("Validform_right").text("通过信息验证！");
                }
                else if (reg2.test(telephone)) {
                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_wrong").addClass("Validform_right").text("通过信息验证！");
                }
                else {
                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(obj.attr("errormsg"));
                }
                //return false;
            },
            "zip": function(gets, obj) {//参数gets是获取到的表单元素值，obj为当前表单对象;
                var zip = $String.Trim(gets);
                var reg1 = /^[0-9]{6}$/;
                if (!reg1.test(zip)) {
                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(obj.attr("errormsg"));
                    return false;
                }
                else {
                    obj.parents("li").find(".Validform_checktip").removeClass("Validform_wrong").addClass("Validform_right").text("通过信息验证！");
                }
                //return false;
            }
        }
    });


    /***
    Register Step2
	
**/
    $(".regBox2 h4 a").click(function() {
        var me = $(this)
        if (me.is(".close")) {
            me.removeClass("close");
            $("." + me.attr("expanel")).hide();
            me.parent().find(".exmsg").show();
        } else {
            me.addClass("close");
            $("." + me.attr("expanel")).show();
            me.parent().find(".exmsg").hide();
        }
    });
    $(".regBox2 h4 .exmsg").click(function() {
        $(this).next(".expand").trigger("click");
    });
    if ($(".formInput select").length > 0) {
        $(".formInput select").chosen().change(function() {
            $(this).next(".chzn-container-single").find(".chzn-single").addClass("chzn-single-selected");
        });
    }
    var bsp = $("#business");
    var psp = $("#personal");
    $("#ispersonalRadio :radio").click(function() {
        if ($(this).val() == 1) {
            bsp.hide();
            psp.show();
        }
        else {
            bsp.show();
            psp.hide();
        }

    });
    //    $("#ispersonal_r2").click(function() {
    //        bsp.show();
    //        psp.hide();
    //    })

    $("#nocordSubmit").click(function() {
        //omniture
        var huiyuan = "";
        if ($("#ispersonal_r1").attr("checked") == "checked") {
            huiyuan = "个人会员"
        } else {
            huiyuan = "商业会员"
        }
        try {
            s.pageName = '开始注册';
            s.prop1 = reportsuite;
            s.channel = '开始注册';
            s.prop7 = '开始注册';
            s.prop8 = '开始注册';
            s.prop4 = '开始注册';
            s.prop9 = '开始注册';
            s.events = 'event4';
            s.eVar6 = huiyuan;
        } catch (ex) { }


        if ($("#chk_3").attr("checked") != "checked") {
            $("#chk_3").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text("请选择同意山姆会籍使用条款");
            return false;
        }

        if ($("#companyType").val() == -1) {
            $("#companyType").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text("请选择");
        }

        if ($("#ispersonal_r1").attr("checked") == "checked") {
            $("#personal [nullmsg]").trigger("blur");

            //    判断js的验证是否全部通过
            if ($("#personal").find(".Validform_wrong").length == 0) {
                if ($("#personal .userRegion").val() == -1 || $("#personal .userCity").val() == -1 || $("#personal .userArea").val() == -1) {
                    $("#personal .userRegion").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text("请选择地区");
                    return false;
                }

                $("#Step1").hide();
                $("#Step2").show().find(".regBox1").show();
                return false;
            }
            else {
                //alert("ERROR");
            }
        } else if ($("#ispersonal_r2").attr("checked") == "checked") {
            $("#business [nullmsg]").trigger("blur");
            //    判断js的验证是否全部通过
            if ($("#business").find(".Validform_wrong").length == 0) {
                if ($(".memberPersonInfo .userRegion").val() == -1 || $(".memberPersonInfo .userCity").val() == -1 || $(".memberPersonInfo .userArea").val() == -1) {
                    $(".memberPersonInfo .userRegion").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text("请选择地区");
                    return false;
                }
                if ($("#companyType").val() == -1) {
                    $("#companyType").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text("请选择公司类型");
                    return false;
                }
                if ($(".memberCompanyInfo .userRegion").val() == -1 || $(".memberCompanyInfo .userCity").val() == -1 || $(".memberCompanyInfo .userArea").val() == -1) {
                    $(".memberCompanyInfo .userRegion").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text("请选择地区");
                    return false;
                }
                $("#Step1").hide();
                $("#Step2").show().find(".regBox1").show();
                return false;
            }
        }

        //$("#Step1").hide();
        //$("#Step2").show().find(".regBox1").show();
        //return false;
    })
    $("#selfunum").change(function() {
        var v = ~ ~$(this).val();
        $(".fuInfo").hide().filter(":lt(" + v + ")").show();
    });

    $(".WMpersonalCardType").change(function() {
        var me = $(this);
        if (me.val() != 1) {
            me.parents("li").find(".CardTypeandcardnumber").attr("datatype", "*");
            me.parents("li").find(".Validform_checktip").removeClass("MyDefine");
        }
        else {
            me.parents("li").find(".CardTypeandcardnumber").attr("datatype", "personalCard");
            me.parents("li").find(".Validform_checktip").addClass("MyDefine");
        }
    });

    $("#companyType").change(function() {
        var me = $(this);
        var companyType = me.val();
        if (companyType != -1) {
            me.parents("li").find(".Validform_checktip").removeClass("Validform_wrong").addClass("Validform_right").text("通过信息验证！");
        }
    });

    $("#chk_3").click(function() {
        $(this).parents("li").find(".Validform_checktip").removeClass("Validform_wrong").addClass("Validform_right").text("通过信息验证！");
    });

    setTimeout(function() { $("#ispersonal_r1,#ispersonal_r2,.issam input").filter(":checked").click(); }, 0);

    $(".userBirthMonth").change(function() {//
        //year = $('#personal .userBirthYear').val();
        var me = $(this);
        var year = me.parents("li").find(".userBirthYear").val();
        //month = $('#personal .userBirthMonth').val();
        var month = me.val();
        if ($String.IsNullOrEmpty(year) || !Biz.Common.Validation.isInteger(year)) {
            $(this).parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text("请输入正确的年份");
            return;
        }
        var birthDay = {
            Year: year,
            Month: month,
            IsShowConstellation: false
        };

        $.ajax({
            type: "post",
            dataType: "json",
            url: $Url.BuildCurrentUrl("Ajax/Customer/AjaxBirthDay.aspx"),
            timeout: 30000,
            data: birthDay,
            success: function(data, textStatus) {
                //Process result data
                //$('#birthDayArea').empty().append(data);
                if (data.Type == MessageType.Error) {
                    me.parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text("请输入正确的年份");
                } else {
                    //console.log(me);
                    me.parents("li").find(".userBirthDay").empty().html(data.Data);
                    me.parents("li").find(".userBirthDay").trigger("liszt:updated");
                }

            },
            complete: function(XMLHttpRequest, textStatus) {
            },
            error: function() {
                Biz.Common.PromptText.systemError();
            }
        });
    });

    $("#companyTypeselected").change(function() {//
        //year = $('#personal .userBirthYear').val();
        var me = $(this);
        //var subcompanyType = $("#companyType").val();
        //month = $('#personal .userBirthMonth').val();
        var selectedcompanyType = me.val();
        if (selectedcompanyType == -1) {
            $(this).parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text("请选择");
            me.parents("li").find("#companyType").empty().html("<option value='-1'> 请选择 </option>");
            me.parents("li").find("#companyType").trigger("liszt:updated");
            return;
        }

        $.ajax({
            type: "post",
            dataType: "json",
            url: $Url.BuildCurrentUrl("Ajax/Customer/AjaxGetSubCompanyType.aspx"),
            timeout: 30000,
            data: { SelectedCompanyType: selectedcompanyType },
            success: function(data, textStatus) {
                //Process result data
                //$('#birthDayArea').empty().append(data);

                //console.log(me);
                me.parents("li").find("#companyType").empty().html(data.Data);
                me.parents("li").find("#companyType").trigger("liszt:updated");

            },
            complete: function(XMLHttpRequest, textStatus) {
            },
            error: function() {
                Biz.Common.PromptText.systemError();
            }
        });
    });

    $("#personal .userRegion,#business .userRegion").change(function() {
        var me = $(this);
        var provinceID = me.val();
        var addressAreaInfo = {
            ProvinceID: provinceID,
            CityID: ""
        };
        //var area = $('#personal .userArea')[0];
        var area = me.parents("li").find(".userArea")[0];
        //var city = $('#personal .userCity')[0];
        var city = me.parents("li").find(".userCity")[0];

        var citytext = city.options[0].text;
        city.options.length = 0;
        city.options.add(new Option(citytext, "-1"));
        //var areatext = area.options[0].text;
        //area.options.length = 0;
        //area.options.add(new Option(areatext, "-1"));
        $.ajax({
            type: "post",
            dataType: "json",
            url: $Url.BuildCurrentUrl("Ajax/Customer/AjaxSystemAreaAddressInfo.aspx"),
            timeout: 30000,
            data: addressAreaInfo,
            success: function(data, textStatus) {
                //Process result data
                //Biz.AccountCenter.SystemAddressAreaInfo.proccessed(jqueryObj, data);
                if (data.Type == MessageType.Error) {
                    alert(data.Description);
                    return;
                }

                var addressInfo = data.Data;

                if (addressInfo == null) {
                    city.selectedIndex = 0;
                    area.selectedIndex = 0;
                    me.parents("li").find(".userCity").trigger("liszt:updated");
                    return;
                }

                if (addressInfo.AreaType == 1) //City
                {
                    if (addressInfo.AreaList.length > 0) {
                        $.each(addressInfo.AreaList, function(index, item) {
                            city.options.add(new Option(item.Name, item.ID));
                        });
                    }
                }
                else if (addressInfo.AreaType == 2) {
                    if (addressInfo.AreaList.length > 0) {
                        $.each(addressInfo.AreaList, function(index, item) {
                            area.options.add(new Option(item.Name, item.ID));
                        });
                    }
                }

                me.parents("li").find(".userCity").trigger("liszt:updated");

            },
            complete: function(XMLHttpRequest, textStatus) {
                //Loading hide
            },
            error: function() {
                Biz.Common.PromptText.systemError();
            }
        });
    });

    $("#personal .userCity,#business .userCity").change(function() {
        var me = $(this);
        //var provinceID = $('#personal .userRegion').val();
        //var cityID = $('#personal .userCity').val();
        //var area = $('#personal .userArea')[0];
        var provinceID = me.parents("li").find(".userRegion").val();
        //var city = $('#personal .userCity')[0];
        var cityID = me.val();


        var addressAreaInfo = {
            ProvinceID: provinceID,
            CityID: cityID
        };
        var area = me.parents("li").find(".userArea")[0];
        //var city = $('#city')[0];
        //var citytext = city.options[0].text;
        //city.options.length = 0;
        //city.options.add(new Option(citytext, "-1"));
        var areatext = area.options[0].text;
        area.options.length = 0;
        area.options.add(new Option(areatext, "-1"));
        $.ajax({
            type: "post",
            dataType: "json",
            url: $Url.BuildCurrentUrl("Ajax/Customer/AjaxSystemAreaAddressInfo.aspx"),
            timeout: 30000,
            data: addressAreaInfo,
            success: function(data, textStatus) {
                //Process result data
                //Biz.AccountCenter.SystemAddressAreaInfo.proccessed(jqueryObj, data);
                if (data.Type == MessageType.Error) {
                    alert(data.Description);
                    return;
                }

                var addressInfo = data.Data;

                if (addressInfo == null) {
                    me[0].selectedIndex = 0;
                    area.selectedIndex = 0;
                    me.parents("li").find(".userArea").trigger("liszt:updated");
                    return;
                }

                if (addressInfo.AreaType == 1) //City
                {
                    if (addressInfo.AreaList.length > 0) {
                        $.each(addressInfo.AreaList, function(index, item) {
                            me[0].options.add(new Option(item.Name, item.ID));
                        });
                    }
                }
                else if (addressInfo.AreaType == 2) {
                    if (addressInfo.AreaList.length > 0) {
                        $.each(addressInfo.AreaList, function(index, item) {
                            area.options.add(new Option(item.Name, item.ID));
                        });
                    }
                }
                me.parents("li").find(".userArea").trigger("liszt:updated");


            },
            complete: function(XMLHttpRequest, textStatus) {
                //Loading hide
            },
            error: function() {
                Biz.Common.PromptText.systemError();
            }
        });
    });
    $("#personal .userArea,#business .userArea").change(function() {
        var me = $(this);
        var areaID = me.val();
        if (areaID != -1) {
            me.parents("li").find(".Validform_checktip").removeClass("Validform_wrong").addClass("Validform_right").text("通过信息验证！");
        }
    });

});

var AjaxRequest = {
    CheckRegisterInfo: function() {
        $("#bandingMemberNumber [nullmsg]").trigger("blur");
        //    判断js的验证是否全部通过
        if ($("#bandingMemberNumber").find(".Validform_wrong").length == 0) {
            //alert("OK");
            return true;
        }
        else {
            //alert("ERROR");
            return false;
        }

    },
    CheckRegisterInfo1: function() {
        $("#registerInfo1 [nullmsg]").trigger("blur");
        //    判断js的验证是否全部通过
        if ($("#registerInfo1").find(".Validform_wrong").length == 0) {
            //alert("OK");
            return true;
        }
        else {
            //alert("ERROR");
            return false;
        }

    },
    CheckRegisterByFee: function() {
        $("#registerInfo3 [nullmsg]").trigger("blur");
        //    判断js的验证是否全部通过
        if ($("#registerInfo3").find(".Validform_wrong").length == 0) {
            //alert("OK");
            return true;
        }
        else {
            //alert("ERROR");
            return false;
        }
    },

    RegisterCustomer: function() {
        if ($(".btn_Submit").hasClass("loading")) {
            return;
        }
        $(".btn_Submit").addClass("loading").text("正在提交...");

        var validatorRegCode = $("#validatorReg").val();
        var rssWmEmail = 1;
        if (typeof (validatorRegCode) == "undefined") {
            validatorRegCode = "";
        }
        var recommendedByCustomerID = $.newegg.querystring.get("c");
        // var recommendedByCustomerID = $String.Trim($('#friend1').val());
        var invitedWay = $.newegg.querystring.get("f");
        recommendedByCustomerID = "-1";
        invitedWay = "";
        //        if (recommendedByCustomerID == 'undefined' || recommendedByCustomerID == "") {
        //            recommendedByCustomerID = "-1";
        //            invitedWay = "";
        //        }
        //        if (invitedWay == 'undefined' || invitedWay == "") {
        //            invitedWay = "";
        //            recommendedByCustomerID = "-1";
        //        }
        var memberCardNum = $String.Trim($("#memberCardNum").val());
        if (memberCardNum != null && memberCardNum.length == 15) {
            memberCardNum = memberCardNum.substr(0, 8) + "00" + memberCardNum.substr(8, 7);
        }
        var samsMemberDate = $('#bandingMemberNumber .userBirthYear').val() + '-' + $('#bandingMemberNumber .userBirthMonth').val() + '-' + $('#bandingMemberNumber .userBirthDay').val();
        var customerInfo = {
            Code: $String.Trim(validatorRegCode), //验证码
            CardNum: memberCardNum,
            Email: $String.Trim($("#userEmail").val()),
            CustomerCode: $String.Trim($("#userName").val()),
            Password: $String.Trim($("#setPwd").val()),
            SoreName: $String.Trim(typeof ($("#soreName").val()) == 'undefined' ? '' : $("#soreName").val()),
            StoreUserName: $String.Trim(typeof ($("#storeUserName").val()) == 'undefined' ? '' : $("#storeUserName").val()),
            Date: $String.Trim(typeof ($("#date").val()) == 'undefined' ? '' : $("#date").val()),
            RecommendedByCustomerID: $String.Trim(recommendedByCustomerID),
            InvitedWay: $String.Trim(invitedWay)
        };
        if ($("#chk_2").attr("checked") != "checked") {
            rssWmEmail = 0;
        }
        if (AjaxRequest.CheckRegisterInfo()) {
            $.ajax({
                type: "post",
                url: $Url.BuildCurrentUrl("Ajax/Shopping/CheckRegister.aspx"),
                dataType: "json",
                //async: false,
                timeout: 30000,
                data: {
                    RssWmEmail: escape(rssWmEmail),
                    CardNum: escape(customerInfo.CardNum),
                    SamsMemberDate: escape(samsMemberDate),
                    Type: "bandingMember",
                    CustomerCode: escape(customerInfo.CustomerCode), Code: escape(customerInfo.Code), //验证码
                    Email: escape(customerInfo.Email), Password: escape(customerInfo.Password),
                    SoreName: escape(customerInfo.SoreName), StoreUserName: escape(customerInfo.StoreUserName),
                    Date: customerInfo.Date, PassportMethod: $String.Trim($("#passportMethod").val()), PassportAction: $String.Trim($("#passportAction").val()),
                    RecommendedByCustomerID: escape(customerInfo.RecommendedByCustomerID), InvitedWay: escape(customerInfo.InvitedWay)
                },
                success: function(data, textStatus) {
                    if (data.Type == MessageType.Error) {
                        $(".btn_Submit").removeClass("loading").text("提交");
                        var returnInfo = data.Description.split(':');
                        if (returnInfo.length > 0) {
                            var usererror;
                            if (returnInfo[0] == 'validateError') {
                                //验证码
                                $("#validatorReg").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                            }
                            if (returnInfo[0] == 'userError') {
                                usererror = 1;
                                $("#userName").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                            }
                            else if (returnInfo[0] == 'emailError') {
                                $("#userEmail").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                            }
                            else if (returnInfo[0] == 'pwdError') {
                                $("#setPwd").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                                //Biz.Login.Register.buildWarningMessage($("#setPwd"), returnInfo[1]);
                                //$(".pwdStrength").hide();
                                //$("#pwdinfo").show();
                                //Biz.Login.Register.buildWarningMessage($("#validatorReg"),$Resource.BuildContent("LoginArea_LoginValiatorError"));//验证码
                            }
                            //验证会员卡号
                            else if (returnInfo[0] == 'memberNumberError') {
                                $("#memberCardNum").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                            }
                            //验开卡日期
                            else if (returnInfo[0] == 'samsMemberDate') {
                                $("#registerSamsMemYear").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                            }
                        }
                        else {
                            //Biz.Common.ValidateHelper.clearMessage($("#email"));
                        }
                        //Biz.Register.GetPassword.refreshValidator('#imgValidator', '#validatorReg'); //验证码

                    }
                    else {
                        var redirectUrl = $("#redirectUrl").val();
                        if (redirectUrl.length > 0) {
                            window.location = redirectUrl;
                        }
                    }
                },
                complete: function(XMLHttpRequest, textStatus) {
                    $(".btn_Submit").removeClass("loading").text("提交");
                }
            });
        }
        else {
            $(".btn_Submit").removeClass("loading").text("提交");
        }
    },
    RegisterCustomer1: function() {
        if ($(".btn_Submit").hasClass("loading")) {
            return;
        }
        $(".btn_Submit").addClass("loading").text("正在提交...");
        var personalInfo;
        var memberInfo;
        var PostType;
        var userSelectedPayCardCount = 0;
        var rssWmEmail = 1;
        var savePersonAddress = 0;
        var saveCompanyAddress = 0;
        var recommendedByCustomerID = "";
        var invitedWay = "";
        if ($("#wmemailinfo").attr("checked") != "checked") {
            rssWmEmail = 0;
        }
        if ($("#ispersonal_r1").attr("checked") == "checked") {
            PostType = "personalMember";
            var name = $String.Trim($('#trueUserName').val());
            var personalCardType = $('#personalCardType').val();
            var personalCard = $('#personalCard').val();
            var birthday = $('#personal .userBirthYear').val() + '-' + $('#personal .userBirthMonth').val() + '-' + $('#personal .userBirthDay').val();
            var mobile = $String.Trim($('#userMobileTel').val());
            var tel = $String.Trim($('#userTelephone').val());
            var area = $String.Trim($('#personal .userArea').val());
            var address = $String.Trim($('#userDetailedAddress').val());
            var zip = $String.Trim($('#userZip').val());
            var isDefaultAddress = 0;
            if ($("#chk_6").attr("checked") == "checked") {
                isDefaultAddress = 1;
            }
            var contacts = {
                CellPhone: mobile,
                Phone: $String.Trim(tel),
                AddressAreaID: area,
                Address: $String.Trim(address),
                Zip: $String.Trim(zip)
            };
            personalInfo = {
                Name: name,
                BirthDay: birthday,
                Contacts: contacts,
                IsDefaultAddress: isDefaultAddress
            };
            memberInfo = {
                DBCustomerIDType: personalCardType,
                CustomerIDNumber: personalCard
            };
            var friend = $String.Trim($('#friend').val());
            recommendedByCustomerID = friend;
            invitedWay = $.newegg.querystring.get("f");
            if (invitedWay == 'undefined' || invitedWay == "") {
                invitedWay = "";
            }

        } else {
            PostType = "companyMember";
            var name = $String.Trim($('#trueUserName1').val());
            var personalCardType = $String.Trim($('#personalCardType1').val());
            var personalCard = $String.Trim($('#personalCard1').val());
            var birthday = $('#business .userBirthYear').val() + '-' + $('#business .userBirthMonth').val() + '-' + $('#business .userBirthDay').val();
            var mobile = $String.Trim($('#userMobileTel1').val());
            var tel = $String.Trim($('#userTelephone1').val());
            var area = $String.Trim($('.memberPersonInfo .userArea').val());
            var address = $String.Trim($('#userDetailedAddress1').val());
            var zip = $String.Trim($('#userZip1').val());

            var companyName = $String.Trim($('#companyName').val());
            var companyType = $String.Trim($('#companyType').val());
            var companyCode = $String.Trim($('#companyCode').val());
            var companyArea = $String.Trim($('.memberCompanyInfo .userArea').val());
            var companyDetailedAddress = $String.Trim($('#companyDetailedAddress').val());
            var companyTelephone = $String.Trim($('#companyTelephone').val());
            var companyZip = $String.Trim($('#companyZip').val());
            var companyFax = $String.Trim($('#companyFax').val());
            //用户选择的默认收货地址是个人的 还是公司的
            var isDefaultAddress = 0;
            var isDefaultAddress1 = 0;
            if ($("#ad_r1").attr("checked") == "checked") {
                isDefaultAddress = 1;
            } else if ($("#ad_r2").attr("checked") == "checked") {
                isDefaultAddress1 = 1;
            }

            if (isDefaultAddress == 0) {
                if ($("#chk_5").attr("checked") == "checked") {//是否保存个人地址
                    savePersonAddress = 1;
                }
            }


            if (isDefaultAddress1 == 0) {
                if ($("#chk_4").attr("checked") == "checked") {//是否保存公司地址
                    saveCompanyAddress = 1;
                }
            }


            var contacts = {
                CellPhone: mobile,
                Phone: $String.Trim(tel),
                AddressAreaID: area,
                Address: $String.Trim(address),
                Zip: $String.Trim(zip)
            };
            personalInfo = {
                Name: name,
                BirthDay: birthday,
                Contacts: contacts,
                IsDefaultAddress: isDefaultAddress
            };
            memberInfo = {
                DBCustomerIDType: personalCardType,
                CustomerIDNumber: personalCard,
                CompanyName: companyName,
                CompanyTel: companyTelephone,
                DBCompanyType: companyType,
                CompanyIDNumber: companyCode,
                CompanyReceiveAreaSysNo: companyArea,
                CompanyReceiveAddress: companyDetailedAddress,
                CompanyFax: companyFax,
                CompanyZipCode: companyZip,
                IsDefaultAddress: isDefaultAddress1
            };

            var friend = $String.Trim($('#friend1').val());
            recommendedByCustomerID = friend;
            invitedWay = $.newegg.querystring.get("f");
            if (invitedWay == 'undefined' || invitedWay == "") {
                invitedWay = "";
            }

            userSelectedPayCardCount = $("#selfunum").val();
        }

        var validatorRegCode = $String.Trim($("#validatorReg1").val());
        if (typeof (validatorRegCode) == "undefined") {
            validatorRegCode = "";
        }

        var customerInfo = {
            Code: $String.Trim(validatorRegCode), //验证码
            Email: $String.Trim($("#userEmail1").val()),
            CustomerCode: $String.Trim($("#userName1").val()),
            Password: $String.Trim($("#setPwd1").val()),
            SoreName: $String.Trim(typeof ($("#soreName").val()) == 'undefined' ? '' : $("#soreName").val()),
            StoreUserName: $String.Trim(typeof ($("#storeUserName").val()) == 'undefined' ? '' : $("#storeUserName").val()),
            Date: $String.Trim(typeof ($("#date").val()) == 'undefined' ? '' : $("#date").val()),
            RecommendedByCustomerID: $String.Trim(recommendedByCustomerID),
            InvitedWay: $String.Trim(invitedWay)
        };
        if (AjaxRequest.CheckRegisterInfo1()) {
            $.ajax({
                type: "post",
                url: $Url.BuildCurrentUrl("Ajax/Shopping/CheckRegister.aspx"),
                dataType: "json",
                timeout: 30000,
                data: {
                    //CardNum: escape(customerInfo.CardNum),
                    RssWmEmail: escape(rssWmEmail),
                    PersonalInfo: escape($Json.ToJson(personalInfo)),
                    MemberInfo: escape($Json.ToJson(memberInfo)),
                    Type: PostType,
                    CustomerCode: escape(customerInfo.CustomerCode), Code: escape(customerInfo.Code), //验证码
                    Email: escape(customerInfo.Email), Password: escape(customerInfo.Password),
                    SoreName: escape(customerInfo.SoreName), StoreUserName: escape(customerInfo.StoreUserName),
                    Date: customerInfo.Date, PassportMethod: $String.Trim($("#passportMethod").val()), PassportAction: $String.Trim($("#passportAction").val()),
                    RecommendedByCustomerID: escape(customerInfo.RecommendedByCustomerID), InvitedWay: escape(customerInfo.InvitedWay),
                    UserSelectedPayCardCount: userSelectedPayCardCount,
                    SavePersonAddress: savePersonAddress,
                    SaveCompanyAddress: saveCompanyAddress
                },
                success: function(data, textStatus) {
                    if (data.Type == MessageType.Error) {
                        $(".btn_Submit").removeClass("loading").text("提交");
                        var returnInfo = data.Description.split(':');
                        if (returnInfo.length > 0) {
                            var usererror;
                            if (returnInfo[0] == 'validateError') {
                                //验证码
                                $("#validatorReg1").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                            }
                            if (returnInfo[0] == 'userError') {
                                usererror = 1;
                                $("#userName1").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                            }
                            else if (returnInfo[0] == 'emailError') {
                                $("#userEmail1").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                            }
                            else if (returnInfo[0] == 'pwdError') {
                                $("#setPwd1").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                                //Biz.Login.Register.buildWarningMessage($("#setPwd"), returnInfo[1]);
                                //$(".pwdStrength").hide();
                                //$("#pwdinfo").show();
                                //Biz.Login.Register.buildWarningMessage($("#validatorReg"),$Resource.BuildContent("LoginArea_LoginValiatorError"));//验证码
                            }
                            else if (returnInfo[0] == 'membercardAddError') {
                                alert(returnInfo[1]);
                            }
                            else if (returnInfo[0] == 'cellPhone') {
                                alert(returnInfo[1]);
                            }
                            else if (returnInfo[0] == 'myCellPhoneErroe') {
                                alert(returnInfo[1]);
                            }
                        }
                        //Biz.Register.GetPassword.refreshValidator('#imgValidator', '#validatorReg'); //验证码

                    }
                    else {
                        var redirectUrl = $("#redirectUrl").val();
                        if (redirectUrl.length > 0) {
                            window.location = redirectUrl;
                        }
                    }
                },
                complete: function(XMLHttpRequest, textStatus) {
                    $(".btn_Submit").removeClass("loading").text("提交");
                }
            });
        }
        else {
            $(".btn_Submit").removeClass("loading").text("提交");
        }
    },

    //一日会员体验卡注册
    RegisterCustomerByFee: function() {

        var PostType = "personalMember";
        var name = $String.Trim($('#txtUserNameByFee').val());
        var personalCard = $('#txtPersonalTypeByFee').val();

        var mobile = $String.Trim($('#txtCellPhoneByFee').val()); //手机号码
        var mobileCode = $String.Trim($('#txtCellPhoneCodeByFee').val()); //手机验证码

        var code = $String.Trim($('#txtValidatorRegByFee').val()); //验证码
        var email = $String.Trim($('#txtEmailByFee').val());
        var customerCode = $String.Trim($('#txtCodeByFee').val());
        var password = $String.Trim($('#txtPasswordByFee').val());

        var contacts = {
            CellPhone: mobile
        };

        personalInfo = {
            Name: name,
            Contacts: contacts
        };
        memberInfo = {
            DBCustomerIDType: 1,
            CustomerIDNumber: personalCard
        };

        var customerInfo = {
            Code: code, //验证码
            Email: email,
            CustomerCode: customerCode,
            Password: password
        };
        if (AjaxRequest.CheckRegisterByFee()) {
            $.ajax({
                type: "post",
                url: $Url.BuildCurrentUrl("Ajax/Shopping/CheckFeeOneRegister.aspx"),
                dataType: "json",
                async: false,
                timeout: 30000,
                data: {
                    PersonalInfo: escape($Json.ToJson(personalInfo)),
                    MemberInfo: escape($Json.ToJson(memberInfo)),
                    Type: PostType,
                    CustomerCode: escape(customerInfo.CustomerCode), Code: escape(customerInfo.Code), //验证码
                    Email: escape(customerInfo.Email), Password: escape(customerInfo.Password),
                    CellPhoneCode: escape(mobileCode), //手机验证码
                    CellPhone: escape(mobile)
                },
                beforeSend: function() {
                    $("#btnSubmitByFee").after("<a class=\"btn_Submit loading\">正在提交...</a>");
                },
                success: function(data, textStatus) {
                    if (data.Type == MessageType.Error) {
                        $("#btnSubmitByFee").siblings(".loading").remove();
                        var returnInfo = data.Description.split(':');
                        if (returnInfo.length > 0) {
                            var usererror;
                            if (returnInfo[0] == 'validateError') {
                                //验证码
                                $("#txtValidatorRegByFee").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                            }
                            if (returnInfo[0] == 'userError') {
                                usererror = 1;
                                $("#txtCodeByFee").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                            }
                            else if (returnInfo[0] == 'emailError') {
                                $("#txtEmailByFee").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                            }
                            else if (returnInfo[0] == 'pwdError') {
                                $("#txtPasswordByFee").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);

                            }
                            else if (returnInfo[0] == 'cellPhoneError') {
                                $("#txtCellPhoneByFee").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                            }
                            else if (returnInfo[0] == 'cellPhoneCodeError') {
                                $("#txtCellPhoneCodeByFee").parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(returnInfo[1]);
                            }

                            else if (returnInfo[0] == 'membercardAddError') {
                                alert(returnInfo[1]);
                            }
                            else if (returnInfo[0] == 'cellPhone') {
                                alert(returnInfo[1]);
                            }
                            else if (returnInfo[0] == 'myCellPhoneErroe') {
                                alert(returnInfo[1]);
                            }
                        }

                    }
                    else {
                        var redirectUrl = $("#redirectUrl").val();
                        if (redirectUrl.length > 0) {
                            window.location = redirectUrl;
                        }
                    }
                },
                complete: function(XMLHttpRequest, textStatus) {
                    $("#btnSubmitByFee").siblings(".loading").remove();
                }
            });
        } else {
            $("#btnSubmitByFee").siblings(".loading").remove();
            $("#mobileCode").show();
        }

    },

    //创建验证码
    createValidate: function(obj) {
        var verifyBtn = $(obj);
        verifyBtn.prev().find("input").trigger("blur");


        var mobile = $String.Trim($('#txtCellPhoneByFee').val()); //手机号码
        if ($String.IsNullOrEmpty(mobile) || !Biz.Common.Validation.isMobile(mobile)) {
            return;
        }

        //一分钟验证
        if (!CountDownTime.checkRefreshGet(120)) //每次请求的时候，js检查60s时间间隔
        {
            $(obj).parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text("120秒内不能重复获取，请稍后再获取").show();
            return;
        }

        var phoneValidation = {
            CellPhone: mobile,
            Process: 1
        };
        var strPhoneValidation = $Json.ToJson(phoneValidation);

        $.ajax({
            type: "post",
            dataType: "html",
            url: $Url.BuildCurrentUrl("Ajax/Customer/AjaxCellPhoneValidationFeeRegister.aspx"),
            timeout: 30000,
            data: { PhoneValidation: strPhoneValidation },

            beforeSend: function(XMLHttpRequest) {
                if (verifyBtn.prev().find("input").is(".Validform_error")) {
                    //If not mobile number
                }
                else {
                    verifyBtn.siblings(".loading").show();
                    verifyBtn.siblings(".Validform_right").hide();

                }
            },
            success: function(data, textStatus) {
                var message = $(data);
                var resultType = message.filter("#resultType").val();
                var resultMessage = message.filter("#resultMessage").val();
                if (resultType == "right") {
                    // setTimeout(function() {
                    verifyBtn.hide();
                    verifyBtn.siblings(".loading").hide();
                    $(obj).parents("li").find(".Validform_checktip").removeClass("Validform_wrong").addClass("Validform_right").text("验证码已经发送到您的手机上，请注意查收！").show();
                    $("#mobileCode").show();
                    //  }, 3000)

                    // $("#txtCellPhoneByFee").attr("disabled","disabled");
                    //倒计时
                    CountDownTime.dynamicMessage(120); //倒计时
                    CountDownTime.resetRefreshGet(); //重置时间   

                } else {
                    //setTimeout(function() {
                    verifyBtn.show();
                    verifyBtn.siblings(".loading").hide();
                    $(obj).parents("li").find(".Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(resultMessage).show();
                    $("#mobileCode").hide();
                    //}, 3000)
                }
            },
            complete: function(XMLHttpRequest, textStatus) {

            },
            error: function() {

            }
        });

    }


}

//60秒倒计时效果
var CountDownTime = {
    refreshTime: 0, //变量 
    checkRefreshGet: function(timeLimit) //检查时间，timelimit为传入请求需要间隔的时间（单位秒），比如：60
    {
        var nowTime = new Date();
        var nowMinitePoint = nowTime.getHours() * 3600 + nowTime.getMinutes() * 60 + nowTime.getSeconds();
        if (nowMinitePoint - CountDownTime.refreshTime < timeLimit) {
            return false;
        }
        return true;
    },

    resetRefreshGet: function() //请求成功之后，调用的方法，把定义的变量重置为当前时间
    {
        var nowTime = new Date();
        var nowMinitePoint = nowTime.getHours() * 3600 + nowTime.getMinutes() * 60 + nowTime.getSeconds();
        CountDownTime.refreshTime = nowMinitePoint;
    },

    dynamicMessage: function(timeSecond) //倒计时方法 timeSecond为从多少秒开始，比如：60
    {
        var showTimmer;
        if (showTimmer) {
            clearTimeout(showTimmer);
        }

        if (timeSecond == 120) {
            var messageRefresh = $.newegg.format("({0}秒后)重新获取验证码", timeSecond);
            $("#btnCreateAgain").html("<span>" + messageRefresh + "</span>");
            $("#btnCreateAgain").attr("class", "btn_agray");
            timeSecond--;
        }

        showTimmer = setTimeout(function() {
            var messageRefresh = $.newegg.format("({0}秒后)重新获取验证码", timeSecond);
            $("#btnCreateAgain").html("<span>" + messageRefresh + "</span>");
            timeSecond--;
            if (timeSecond < 0) {
                clearTimeout(showTimmer);
                $("#btnCreateAgain").attr("class", "btn_agreen");
                $("#btnCreateAgain").html("<span>重新获取验证码</span>");
            } else {
            CountDownTime.dynamicMessage(timeSecond);
                $("#btnCreateAgain").attr("class", "btn_agray");
            }
        }, 1000);
    }
}

///刷新验证码
RegisterRefreshValidator = function(img, input) {
    var url = $(img).attr('ref1');
    newurl = url + "&r=" + Math.random();
    $(img).attr('src', newurl);
    $(input).focus();
};


ResetValivateCode = function(url) {
    document.getElementById("Img").src = url + "&r=" + Math.random();
    document.getElementById("validator").focus();
}

LoginCheck = function() {
    var num = 0;

    $("#name").trigger("blur");
    if ($("#LoginForm").find(".Validform_wrong").length > 0) {
        $(".Validform_checktip").show();
        return;
    }

    $("#pwd").trigger("blur");
    if ($("#LoginForm").find(".Validform_wrong").length > 0) {
        $(".Validform_checktip").show();
        return;
    }

        $("#action").val("Get");
        $("#LoginForm").submit();
}

