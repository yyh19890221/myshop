<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jspf" %>
<%@ page import="org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter" %>
<%@ page import="org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter" %>
<%@ page import="org.springframework.security.web.WebAttributes" %>
<gover:contentHeader title="用户登录 - MyShop购物网 " index="false"/>
<link rel="stylesheet" type="text/css" href="${ctx}/css/logreg.css" />
<gover:header />
<gover:menu />
<div id="main">
	<div class="main">
		<!--类别页面的面包屑放在了外面-->
    	<div class="wraper">
			<div class="cls">
		        <div class="crumb crumbAlter mb10">
		            <div class="inner">
		                <a href="/">首页</a>
		                <span>&gt;</span>
		                <strong>登录</strong>
		                </div>
        		</div>
		        <div class="mainPanel">
		            <form id="loginForm" action="${ctx}/j_spring_security_check" method="post" class="formsub_login">
		            <input type="hidden" id="action" name="action" value="">
            
					<div class="loginBox">
    					<div class="bg"></div>
					    <div class="loginBoxBody">
					        <h3>
					            <span class="fr">还没开通？请<a href="${ctx}/account/user!input.action" class="blue" >注册</a></span>已开通MyShop网购账户，请登录<i></i></h3>
						        <div class="boxbody formInput">
						            <ul class="cls">
						                <li>
						                    <label>
						                        <span>登录账号：</span></label>
						                    <div class="inputText">
						                        <span>
						                        	<i class="username ie6png"></i>
						                            <input type="text" name="j_username" id="j_username" maxlength="50" class="required" datatype="*"
						                            <s:if test="not empty param.error">value='<%=session.getAttribute(UsernamePasswordAuthenticationFilter.SPRING_SECURITY_LAST_USERNAME_KEY)%>'</s:if> />
						                        </span>
						                    </div>
						                </li>
						                <li>
						                    <label>
						                        <span class="size2t4">密码</span>：</label>
						                    <div class="inputText">
						                        <span>
						                        	<i class="password ie6png"></i>
						                            <input type="password" name="j_password" id="j_password" maxlength="20" value="">
						                        </span>
						                    </div>
						                </li>
						                
						                <li class="last">
						                    <label>
						                    </label>
						                    <%
												if (session.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION) != null) {
											%> 
											<div class="error"> 登录失败，请重试.</div> 
											<%
												}
											%>
						                </li>
						            </ul>
					            	<div class="btnPanel">
					                	<a class="btn_Submit" href="javascript:void" onclick="$(this).closest('form').submit()">提交</a>
					            	</div>
					        	</div>
					    	</div>
						</div>
	            	</form>
	        	</div>
	    	</div>
       </div>
    </div>
</div>

<script src="${ctx}/js/jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="${ctx}/js/validate/jquery.validate.js" type="text/javascript"></script>
<script src="${ctx}/js/validate/messages_cn.js" type="text/javascript"></script>
<script>
	$(document).ready(function() {
		$("#loginForm").validate();
		$("a.btn_Submit").click(function(){
			$("#loginForm").submit();
		});
	});
</script>

<!-- 页面底部 -->
<gover:footer />
<gover:contentFooter />