
var MiniLogin = {

    isKeyPressValidateClick: 0,

    init: function(sourcePage) {

        $(document).keydown(function(e) {
            var key = window.event ? e.keyCode : e.which;
            if (key == 13) {
                MiniLogin.isKeyPressValidateClick = 1;
                return sourcePage == "MiniLogin" ? MiniLogin.Check() : MiniLogin.RegisterCustomer();
            } else {
                MiniLogin.isKeyPressValidateClick = 0;

            }
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

    },

    Check: function() {
        var num = 0, 
        	username = $("#j_username").val(),
        	password = $("#j_password").val();
        
        if ($.trim(username) == "" || $.trim(username) == '用户名/邮箱') {
            $("#msgError").html('请输入用户名/邮箱');
            $("#msgError").attr("style", "display:inline-block");
            return;
        }

        if ($.trim(password) == "") {
            $("#msgError").html('请输入密码');
            $("#msgError").attr("style", "display:inline-block");
            return;
        }

        if (num == 0) {
            $.ajax({
                type: "post",
                url: $.newegg.buildSSL("j_spring_security_check"),
                dataType: "json",
                timeout: 100000,
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: { j_username: $.trim(username), j_password: $.trim(password)},
                beforeSend: function(XMLHttpRequest) {

                },
                complete: function(data, textStatus) {

                },
                success: function(data, textStatus) {
                    if (data.Type == 2) {
                        //Ga
                        try { _gaq.push(['_trackEvent', 'login', 'loginfailed']); } catch (ex) { }
                        
                        if (data.Description == "CustomerCodeEmpry") {
                            $("#msgError").html('用户名或密码不能为空');
                        } else if (data.Description == "CustomerPWDEmpty") {
                            $("#msgError").html('用户名或密码不能为空');
                        } else if (data.Description == "CustomerValationEmpty") {
                            $("#msgError").html('验证码不能为空');
                        } else if (data.Description == "LoginArea_LoginFailture") {
                            $("#msgError").html('请输入正确的用户名或者密码');
                            $("#txtUserName").val("");
                            $("#txtPwd").val("");
                        } else if (data.Description == "LoginArea_LoginValiatorError") {
                            $("#msgError").html('请输入正确的验证码');
                        } else if (data.Description == "LoginArea_UserError") {
                            $("#msgError").html('您的账号已经作废');
                            $("#txtUserName").val("");
                            $("#txtPwd").val("");
                        } else if (data.Description == "LoginArea_ShowValiatorCode") {
                            $("#Dl1").attr("style", "display:block");
                            $("#imgValidator")[0].src = $("#imgValidator").attr("rel");
                        }

                        if (data.Description != "sucess" && data.Description != "LoginArea_ShowValiatorCode") {
                            $("#msgError").attr("style", "display:inline-block");
                            $("#validatorReg").val("");
                            MiniLogin.ResetValivateCode("imgValidator");

                        }
                    } else {
                        //Ga
                        try { _gaq.push(['_trackEvent', 'login', 'loginsuccessful']); } catch (ex) { }
                        
                        if (data.Description == "Success") {
                            MiniLogin.go();
                        } else if (data.Description == "Redirect") {
                            MiniLogin.otherGo(data.Data);
                        }
                    }
                },
                error: function() {
                	console.log(arguments);
                }
            });
        }

    },
    PasswordStrength: {
        Level: ["4", "3", "2", "1"], //太短:1,较弱:2,一般:3,极佳:4
        //强度提示信息
        LevelValue: [15, 10, 5, 0],
        //和上面提示信息对应的强度值
        Factor: [1, 2, 5],
        //强度加权数,分别为字母，数字，其它
        KindFactor: [0, 0, 10, 20],
        //密码含几种组成的权数
        Regex: [/[a-zA-Z]/g, /[0-9]/g, /[^a-zA-Z0-9]/g] //字符，数字，非字符数字（即特殊符号）
    },
    CheckPasswordStrength: function(o) {
        if (MiniLogin.isKeyPressValidateClick == 1) {
            return;
        }

        $(o).parent().find("#pwdinfo").hide();
        $(".pwdStrength").show();
        var setPwd = $("#setPwd");
        $("#spPwd").attr("style", "display:none")
        $("#spTip").attr("style", "display:none")
        var showmsg = MiniLogin.passwordStrength($.trim(o.value));

        switch (showmsg) {
            case "1":
                $('.pwdStrength :eq(0)').addClass("good");
                if ($.trim($("#setPwd").val()) == "") {
                    $('.pwdStrength :eq(0)').removeClass("good");
                }
                $('.pwdStrength :eq(1)').removeClass("good");
                $('.pwdStrength :eq(2)').removeClass("good");
                $('.pwdStrength :eq(3)').removeClass("good");
                break;
            case "2":
                $('.pwdStrength :eq(0)').addClass("good");
                $('.pwdStrength :eq(1)').addClass("good");
                $('.pwdStrength :eq(2)').removeClass("good");
                $('.pwdStrength :eq(3)').removeClass("good");
                break;
            case "3":
                $('.pwdStrength :eq(0)').addClass("good");
                $('.pwdStrength :eq(1)').addClass("good");
                $('.pwdStrength :eq(2)').addClass("good");
                $('.pwdStrength :eq(3)').removeClass("good");
                break;
            case "4":
                $('.pwdStrength :eq(0)').addClass("good");
                $('.pwdStrength :eq(1)').addClass("good");
                $('.pwdStrength :eq(2)').addClass("good");
                $('.pwdStrength :eq(3)').addClass("good");
                break;
        }
    },
    PasswordStrengthStrengthValue: function(pwd) {
        var strengthValue = 0;
        var ComposedKind = 0;
        for (var i = 0; i < this.PasswordStrength.Regex.length; i++) {
            var chars = pwd.match(this.PasswordStrength.Regex[i]); //匹配当前密码中符合指定正则的字符，如果有多个字符以','分隔
            if (chars != null) {
                strengthValue += chars.length * this.PasswordStrength.Factor[i];
                ComposedKind++;
            }
        }
        strengthValue += this.PasswordStrength.KindFactor[ComposedKind];
        return strengthValue;
    },
    PasswordStrengthStrengthLevel: function(pwd) {
        var value = Biz.Login.Register.PasswordStrengthStrengthValue(pwd);
        for (var i = 0; i < this.PasswordStrength.LevelValue.length; i++) {
            if (value >= this.PasswordStrength.LevelValue[i]) return this.PasswordStrength.Level[i];
        }
    },
    passwordStrength: function(password) {
        score = 0
        //password < 6
        if (password.length < 6) { return MiniLogin.PasswordStrength.Level[3]; }

        //password length
        score += password.length * 6
        score += (MiniLogin.checkRepetition(1, password).length - password.length) * 1
        score += (MiniLogin.checkRepetition(2, password).length - password.length) * 1
        score += (MiniLogin.checkRepetition(3, password).length - password.length) * 1
        score += (MiniLogin.checkRepetition(4, password).length - password.length) * 1
        score += (MiniLogin.checkRepetition(5, password).length - password.length) * 1
        score += (MiniLogin.checkRepetition(6, password).length - password.length) * 1

        if (password.match(/(.*[0-9].*[0-9].*[0-9])/)) score += 5
        if (password.match(/(.*[^a-zA-Z0-9].*[^a-zA-Z0-9])/)) score += 5
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) score += 10
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) score += 15
        if (password.match(/([^a-zA-Z0-9])/) && password.match(/([0-9])/)) score += 15
        if (password.match(/([^a-zA-Z0-9])/) && password.match(/([a-zA-Z])/)) score += 15
        if (password.match(/^\w+$/) || password.match(/^\d+$/)) score -= 10

        if (score < 0) score = 0
        if (score > 100) score = 100

        if (score < 34) return MiniLogin.PasswordStrength.Level[2]
        if (score < 68) return MiniLogin.PasswordStrength.Level[1]
        return MiniLogin.PasswordStrength.Level[0]
    },
    checkRepetition: function(pLen, str) {
        res = ""
        for (i = 0; i < str.length; i++) {
            repeated = true
            for (j = 0; j < pLen && (j + i + pLen) < str.length; j++)
                repeated = repeated && (str.charAt(j + i) == str.charAt(j + i + pLen))
            if (j < pLen) repeated = false
            if (repeated) {
                i += pLen - 1
                repeated = false
            }
            else {
                res += str.charAt(i)
            }
        }
        return res
    },
    validateEmail: function(flag) {
        var email = $("#email");
        if (flag == "0") {
            if ($.trim(email.val()) == "") {
                var msg = resources_MiniRegister.CheckOutRegister_Alert_CustomerCodeEmpry;
                $("#spMsg").html(msg);
                $("#spMsg").attr("style", "display:block");
                $(email).data("oldcustomerid", "");
            }
            else if (MiniLogin.CheckSpecialString($.trim(email.val()))) {
                var msg = resources_MiniRegister.CheckOutRegister_IncludeSpecialString;
                $("#spMsg").html(msg);
                $("#spMsg").attr("style", "display:block");
            }
            else {
                var oldcustomerid = $(email).data("oldcustomerid");
                if (!oldcustomerid) {
                    MiniLogin.CheckCustomerInfo('customercode');
                    oldcustomerid = $(email).data("oldcustomerid", $.trim(email.val()))[0].value;
                }
                else {
                    if (oldcustomerid != $.trim(email.val())) {
                        $("#spMsg").attr("style", "display:none");
                        MiniLogin.CheckCustomerInfo('customercode');
                        oldcustomerid = $(email).data("oldcustomerid", $.trim(email.val()))[0].value;
                    }
                }
            }
        }
        else if (flag == "1") {
            var emailAgain = $("#emailAgain");

            if ($.trim(emailAgain.val()) == "") {
                var msg = resources_MiniRegister.Customer_EmailRequired;
                $("#spMailAgain").html(msg);
                $("#spMailAgain").attr("style", "display:block");
                $(emailAgain).data("oldemail", "");

            }
            else {
                if (MiniLogin.CheckSpecialString($.trim(emailAgain.val()))) {
                    var msg = resources_MiniRegister.CheckOutRegister_IncludeSpecialString;
                    $("#spMailAgain").html(msg);
                    $("#spMailAgain").attr("style", "display:block");
                }
                else if (!MiniLogin.isEmail($.trim(emailAgain.val()))) {
                    var msg = resources_MiniRegister.CheckOutRegister_Alert_CustomerCodeFormatError;
                    $("#spMailAgain").html(msg);
                    $("#spMailAgain").attr("style", "display:block");
                }
                else {
                    var oldemail = $(emailAgain).data("oldemail");

                    if (!oldemail) {

                        MiniLogin.CheckCustomerInfo('email');
                        oldemail = $(emailAgain).data("oldemail", $.trim(emailAgain.val()))[0].value;
                    }
                    else {
                        if (oldemail != $.trim(emailAgain.val())) {
                            MiniLogin.CheckCustomerInfo('email');
                            oldemail = $(emailAgain).data("oldemail", $.trim(emailAgain.val()))[0].value;
                        }
                    }
                }
            }
        }
    },
    validatePWD: function(flag) {
        var pwd = $("#setPwd");
        var confirmPwd = $("#confirmPwd");
        if (flag == "0") {
            $("#spTip").hide();
            $("#pwdinfo").hide();
            $(".pwdStrength").show();
            if ($.trim(pwd.val()) == "") {
                $(".pwdStrength").hide();
                $("#pwdinfo").show();
                var msg = resources_MiniRegister.CheckOutRegister_Alert_CustomerPWDEmpty;
                $("#spPwd").html(msg);
                $("#spPwd").attr("style", "display:block");
            }
            else if (MiniLogin.CheckSpecialString($.trim(pwd.val()))) {
                $(".pwdStrength").hide();
                $("#pwdinfo").show();
                var msg = resources_MiniRegister.CheckOutRegister_IncludeSpecialString;
                $("#spPwd").html(msg);
                $("#spPwd").attr("style", "display:block");
            }
            else if (!MiniLogin.isValidateReg($.trim(pwd.val()))) {
                $(".pwdStrength").hide();
                $("#pwdinfo").show();
                var msg = resources_MiniRegister.CheckOutLogin_PWDRegulation;
                $("#spPwd").html(msg);
                $("#spPwd").attr("style", "display:block");
            }
            else {

                $("#pwdinfo").hide();
                $(".pwdStrength").show();
            }
        }
        else if (flag == "1") {
            if ($.trim(confirmPwd.val()) == "") {
                var msg = resources_MiniRegister.CheckOutRegister_Alert_ComfirmCustomerPWDEmpty;
                $("#spComfirmPwd").html(msg);
                $("#spComfirmPwd").attr("style", "display:block");
            }
            else if ($.trim(pwd.val()) != $.trim(confirmPwd.val())) {
                var msg = resources_MiniRegister.CheckOutRegister_Alert_CustomerPWDNotEqual;
                $("#spComfirmPwd").html(msg);
                $("#spComfirmPwd").attr("style", "display:block");
            }
            else {
                $("#spComfirmPwd").attr("style", "display:none");
            }
        }
    },
    validatorReg: function() {
        var reg = $("#validatorReg");
        $("#spVcode").attr("style", "display:none");
        if ($.trim(reg.val()) == "") {
            var msg = resources_MiniRegister.CheckOutRegister_Alert_CustomerValationEmpty;
            $("#spVcode").html(msg);
            $("#spVcode").attr("style", "display:block");
        }
    },
    ResetValivateCode: function(id) {
        var o = $("#" + id);
        o.attr("src", o.attr("rel") + "&" + Math.random());
        o.focus();
    },
    /**
     * 校验注册信息
     * @returns {Boolean}
     */
    CheckRegisterInfo: function() {
        var num = 0;
        var email = $("#email");
        var emailAgain = $("#emailAgain");
        if ($.trim(email.val()) == "") {
        	alert("邮箱不能为空");
        	return false;
        }


        var pwd = $("#password");
        if ($.trim(pwd.val()) == "") {
            alert("密码不能为空");
            return false;
        }

        var confirmPwd = $("#confirmPwd");
        if ($.trim(confirmPwd.val()) == "") {
            alert("确认密码不能为空");
            return false;
        }
        var loginName = $("#loginName");
        if ($.trim(loginName.val()) == "") {
        	alert("登陆名不能为空");
        	return false;
        }
        return true;
    },
    RegisterCustomer: function() {
        var customerInfo = {
            Email: $.trim($("#loginName").val()),
            CustomerCode: $.trim($("#email").val()),
            Password: $.trim($("#password").val()),
            SoreName: $.trim(typeof ($("#soreName").val()) == 'undefined' ? '' : $("#soreName").val()),
            StoreUserName: $.trim(typeof ($("#storeUserName").val()) == 'undefined' ? '' : $("#storeUserName").val()),
            Date: $.trim(typeof ($("#date").val()) == 'undefined' ? '' : $("#date").val())
        };
        if (MiniLogin.CheckRegisterInfo()) {
            $.ajax({
                type: "post",
                url: $.newegg.buildCurrent("Ajax/Customer/AjaxMiniRegister.aspx"),
                dataType: "json",
                timeout: 30000,
                data: { CustomerCode: escape(customerInfo.CustomerCode), Code: escape(customerInfo.Code), //验证码
                    Email: escape(customerInfo.Email), Password: escape(customerInfo.Password),
                    SoreName: escape(customerInfo.SoreName), StoreUserName: escape(customerInfo.StoreUserName), Date: customerInfo.Date,
                    PassportMethod: $.trim($("#passportMethod").val()), PassportAction: $.trim($("#passportAction").val())
                },
                beforeSend: function() {
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                },
                success: function(data, textStatus) {
                    if (data.Type == 2) {
                        var returnInfo = data.Description.split(':');
                        if (returnInfo.length > 0) {
                            var usererror;
                            if (returnInfo[0] == 'validateError') {
                                $("#spVcode").html(resources_MiniRegister.LoginArea_LoginValiatorError);
                                $("#spVcode").attr("style", "display:block");

                            }
                            if (returnInfo[0] == 'userError') {
                                usererror = 1;
                                if (returnInfo[1] == "CheckOutRegister_IncludeSpecialString") {
                                    $("#spMsg").html(resources_MiniRegister.CheckOutRegister_IncludeSpecialString);
                                } else if (returnInfo[1] == "CheckOutLogin_CustomerCodeError")
                                    $("#spMsg").html(resources_MiniRegister.CheckOutLogin_CustomerCodeError);
                                else {
                                    $("#spMsg").html(returnInfo[1]);
                                }
                                $("#spMsg").attr("style", "display:block");
                            }
                            else if (returnInfo[0] == 'emailError') {
                                $("#spMailAgain").html(resources_MiniRegister.CheckOutRegister_Alert_CustomerCodeFormatError);
                                $("#spMailAgain").attr("style", "display:block");
                            }
                            else if (returnInfo[0] == "emailExistError") {
                                $("#spMailAgain").html(resources_MiniRegister.CheckOutLogin_EmailRepeatError);
                                $("#spMailAgain").attr("style", "display:block");
                            }
                            else if (returnInfo[0] == 'pwdError') {
                                $("#spPwd").html(resources_MiniRegister.CheckOutRegister_IncludeSpecialString);
                                $("#spPwd").attr("style", "display:block");
                            }
                        }
                        $("#validatorReg").val("");
                        MiniLogin.ResetValivateCode("imgValidator");
                    }
                    else {
                        MiniLogin.go();
                    }
                },
                complete: function(XMLHttpRequest, textStatus) {
                }
            });
        }
    },

    CheckCustomerInfo: function(flag) {
        var customerInfo = {
            Email: $.trim($("#emailAgain").val()),
            CustomerCode: $.trim($("#email").val())
        };
        $.ajax({
            type: "post",
            url: $.newegg.buildCurrent("Ajax/Shopping/CheckCustomerInfo.aspx"),
            dataType: "json",
            timeout: 30000,
            data: { Flag: flag, Email: customerInfo.Email, CustomerCode: encodeURI(customerInfo.CustomerCode) },
            success: function(data, textStatus) {
                if (data.Type == 2) {
                    var returnInfo = data.Description.split(':');
                    if (returnInfo.length > 0) {
                        if (returnInfo[0] == 'userError') {
                            $("#spMsg").html(returnInfo[1]);
                            $("#spMsg").attr("style", "display:block");
                            if (flag == "email") {
                                $("#spMailAgain").html("");
                                $("#spMailAgain").attr("style", "display:none");
                            }
                        }
                        else if (returnInfo[0] == 'emailError') {
                            $("#spMailAgain").html(returnInfo[1]);
                            $("#spMailAgain").attr("style", "display:block");
                            if (flag == "customercode") {
                                $("#spMsg").html("");
                                $("#spMsg").attr("style", "display:none");
                            }

                        }
                    }
                } else if (data.Type == 0) {
                    if (flag == "customercode") {
                        $("#spMsg").html("");
                        $("#spMsg").attr("style", "display:none");
                    } else if (flag == "email") {
                        $("#spMailAgain").html("");
                        $("#spMailAgain").attr("style", "display:none");

                    }
                }
            },
            complete: function(XMLHttpRequest, textStatus) {
            }
        });
    },
    go: function() {
        if (callBack || callBackId) {
            callBack = callBack || '';
            callBackId = callBackId || '';
            location.href = MiniLogin.goUrl() + "&CallBack=" + encodeURIComponent(callBack) + "&CallBackID=" + encodeURIComponent(callBackId);
        } else {
            top.location.href = returnUrl;
        }
    },

    otherGo: function(url) {
        if (url) {
            top.location.href = url;
        }
    }
    ,
    reg: function(e) {
        $(e).attr("href", MiniLogin.goUrl() + "&CallBack=mini.changeReg");
    },
    login: function(e) {
        $(e).attr("href", MiniLogin.goUrl() + "&CallBack=mini.changeLogin");
    },
    goUrl: function() {
        var url = "Ajax/Common/CrossFrame.aspx?type=script";

        var siteName = $.newegg.querystring.get("siteName");
        if (siteName == "wwwSite") {
            url = $.newegg.buildWWW(url);
        } else if (siteName == "sslSite") {
            url = $.newegg.buildSSL(url);
        } else if (siteName == "shopperSite") {
            url = $.newegg.buildShopper(url);
        } else {
            var index = siteName.indexOf("/", 8);
            if (index != -1) {
                url = siteName.substring(0, index) + url;
            }
        }

        return url;
    },
    CheckSpecialString: function(value) {
        var validateReg = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/;
        return validateReg.test(value);
    },
    isEmail: function(s) {
        var pattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        return pattern.test(s);
    },
    isValidateReg: function(value) {
        var validateReg = /^([A-Za-z0-9\s\-\_\~\!\@\#\$\%\^\&\*\(\)\|\<\>\?\:\;\"\'\.\[\]\{\}\,\+\`\/\\\=]){6,16}$/;
        if (validateReg.test(value)) {
            return true;
        }
        return false;
    }
};