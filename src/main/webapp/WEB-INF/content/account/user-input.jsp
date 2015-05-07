<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jspf" %>
<gover:contentHeader title="购买记录 - 母婴购物网 " index="false"/>
<link rel="stylesheet" type="text/css" href="${ctx}/css/logreg.css" />
<gover:header />
<gover:menu />
<div id="main">
	<div class="main">
		<div class="wraper">
			<div class="cls">
				<div class="crumb crumbAlter mb10">
		            <div class="inner"><a href="/">首页</a> <span>&gt;</span> <strong>注册</strong></div>
		        </div>
		        <h1>欢迎<strong>注册</strong></h1>
		        <div class="mainPanel  mainPanelB">
		        	<form action="user!save.action" class="formsub" id="inputForm">
			        	<div class="regBox1" style="display: block;">
							<h3 class="blue">请设定您的MyShop网购账户<s></s></h3>
							<div class="boxbody formInput">
								<ul id="bandingMemberNumber">
							    	<li class="">
							       		<label for="loginName"><span>登录名：</span></label>
							       		<div class="inputText">
							       			<span>
							       				<input type="text" name="loginName" maxlength="50" id="loginName" value=""/>
							       			</span>
							       		</div>
							       		<span class="Validform_checktip"></span>
							       		<p></p>
							       	</li>
							    	<li>
							    		<label for="name"><span>用户名：</span></label>
							   			<div class="inputText">
							   				<span>
							   					<input class="name" id="name" name="name" type="text" value="">
							   				</span>
							   			</div>
										<span class="Validform_checktip"></span>
										<p></p>
							   		</li>
								    <li>
								        <label for="password"><span>密码：</span></label>
								        <div class="inputText">
								            <span>
								                <input type="password" id="password" maxlength="20" name="password" value="">
								            </span>
								        </div>
								        <span class="Validform_checktip MyDefine"></span>
								        <p>4-20位字符，可由中文、大小写英文、数字或符号"-" "_"组成</p>
								    </li>
								    <li>
								        <label for="passwordConfirm"><span>确认密码：</span></label>
								        <div class="inputText">
								            <span>
								                <input type="password" id="passwordConfirm" maxlength="20" name="passwordConfirm" value="">
								            </span>
								        </div>
								        <span class="Validform_checktip MyDefine"></span>
								        <p>4-20位字符，可由中文、大小写英文、数字或符号"-" "_"组成</p>
								    </li>
								    <li>
								        <label for="email"><span>邮箱：</span></label>
								        <div class="inputText">
								            <span>
								            	<input type="text" id="email" name="email" maxlength="50" value=""/>
								           	</span>
								        </div>
								        <span class="Validform_checktip MyDefine"></span>
								        <p>请输入常用邮箱，可用作登录账户，接收订单通知和找回密码之用</p>
								    </li>
								
								</ul>
								<div class="btnPanel">
								    <input class="btn_Submit" type="submit" value="提交"/>&nbsp;
								</div>
							</div>
						</div>
		        	</form>
		        </div>
			</div>
		</div>
	</div>
</div>
<gover:footer />
	<script src="${ctx}/js/validate/jquery.validate.js" type="text/javascript"></script>
	<script src="${ctx}/js/validate/messages_cn.js" type="text/javascript"></script>
	<script>
		$(document).ready(function() {
			//聚焦第一个输入框
			$("#loginName").focus();
			//为inputForm注册validate函数
			$("#inputForm").validate({
				rules: {
					loginName: {
						required: true,
						remote: "user!checkLoginName.action?oldLoginName=" + encodeURIComponent('${loginName}')
					},
					name: "required",
					password: {
						required: true,
						minlength:3
					},
					passwordConfirm: {
						equalTo:"#password"
					},
					email:"email",
					checkedRoleIds:"required"
				},
				messages: {
					loginName: {
						remote: "用户登录名已存在"
					},
					passwordConfirm: {
						equalTo: "输入与上面相同的密码"
					}
				}
			});
		});
	</script>
<gover:contentFooter />