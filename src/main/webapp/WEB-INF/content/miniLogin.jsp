<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jspf" %>
<gover:contentHeader title="用户登录 - MyShop购物网 " index="false"/>
<div class="miniloginBox">
	<form class="formsub" action="${ctx}/j_spring_security_check" method="post">
        <div class="loginBoxBody">
            <h3>已开通MyShop网购账户，<strong>请登录</strong></h3>
            <div class="boxbody miniformInput">
            	<p class="tr"><a href="/register.action" target="_parent">还没开通？请注册</a></p>
                <ul class="cls">
                    <li>
                        <label><span>登录账号：</span></label>
                        <div class="inputText"><span><i class="username ie6png"></i><input type="text" name="j_username" id="j_username" maxlength="50" value="用户名/邮箱" class="hasDefaultText" /></span></div>
                    </li>
                    <li>
                        <label><span class="size2t4">密码</span>：</label>
                        <div class="inputText"><span><i class="password ie6png"></i><input type="password" name="j_password" id="j_password" maxlength="20" value="" /></span></div>                                                              
                    </li>
                    <li class="last tipsWrap">
                        <span id="msgError" class="Validform_checktip tips" style="display:none">请输入正确的登录信息</span>                                    
                    </li>
                </ul>
                <div class="btnPanel">
                    <a class="btn_Submit" id="loginSubmit" href="javascript:void(0)" onclick="MiniLogin.Check()"></a>
                </div>
            </div>
        </div>
	</form>
</div>

<script type="text/javascript" src="${ctx}/js/common/jquery.menu-aim.js"></script>
<script type="text/javascript" src="${ctx}/js/common/pg_global.js"></script>
<script type="text/javascript" src="${ctx}/js/common/ui.Xslider.js"></script>
<script type="text/javascript" src="${ctx}/js/common/Base.js"></script>
<script type="text/javascript" src="${ctx}/js/SSL/BizMiniLogin.js"></script>

<script type="text/javascript">
    $(document).ready(function() {
        $(this).keypress(function(e) {
            var key = window.event ? e.keyCode : e.which;
            if (key.toString() == '13') {
                return MiniLogin.Check();
            }
        });
    });
    window.onerror=function(){return true;};
    var resources_MiniLogin={
        IsNotUser:'还不是MyShop用户？',
        addressError:'请输入合法的E-mail地址',
        mailInit:'输入您的E-Mail',
        loginInfoError:'用户名或密码不能为空',
        CheckOutRegister_Alert_CustomerValationEmpty:'验证码不能为空',
        LoginArea_LoginFailture:'请输入正确的账号或者密码',
        LoginArea_LoginValiatorError:'请输入正确的验证码',
        LoginArea_UserError:'您的账号已经作废'
    };
    var returnUrl = "";
    var callBack = "";
    var callBackId = "";
    MiniLogin.init("MiniLogin");

</script>


<script type="text/javascript"  language="javascript1.1">
<!--

try {
  var _gaq = _gaq || [];
 
} catch(err) {}

_gaq.push(['_trackPageview', '/homepage/MiniLogin']);
//-->
</script>



</body>
</html>