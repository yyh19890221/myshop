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
		        <h1>个人信息<strong>修改</strong></h1>
		        <div class="mainPanel  mainPanelB">
		        	<form action="user!save.action" class="formsub" id="inputForm">
		        	    <input type="hidden" name="id" value="${id}"/>
			        	<div class="regBox1" style="display: block;">
							<h3 class="blue">请设定您的MyShop网购账户<s></s></h3>
							<div class="boxbody formInput">
								<ul id="bandingMemberNumber">
							    	<li class="">
							       		<label for="loginName"><span>登录名：</span></label>
							       		<div class="inputText">
							       			<span>
							       				<input type="text" readonly="readonly" name="loginName" maxlength="50" id="loginName" value="${loginName}"/>
							       			</span>
							       		</div>
							       		<span class="Validform_checktip"></span>
							       		<p></p>
							       	</li>
							    	<li>
							    		<label for="name"><span>用户名：</span></label>
							   			<div class="inputText">
							   				<span>
							   					<input class="name" id="name" name="name" type="text" value="${name}">
							   				</span>
							   			</div>
										<span class="Validform_checktip"></span>
										<p></p>
							   		</li>
								    <li>
								        <label for="password"><span>密码：</span></label>
								        <div class="inputText">
								            <span>
								                <input type="password" id="password" maxlength="20" name="password" value="${password}">
								            </span>
								        </div>
								        <span class="Validform_checktip MyDefine"></span>
								    </li>
								    <li>
								        <label for="passwordConfirm"><span>确认密码：</span></label>
								        <div class="inputText">
								            <span>
								                <input type="password" id="passwordConfirm" maxlength="20" name="passwordConfirm" value="${password}">
								            </span>
								        </div>
								        <span class="Validform_checktip MyDefine"></span>
								    </li>
								    <li>
								        <label for="email"><span>邮箱：</span></label>
								        <div class="inputText">
								            <span>
								            	<input type="text" id="email" name="email" maxlength="50" value="${email}"/>
								           	</span>
								        </div>
								        <span class="Validform_checktip MyDefine"></span>
								    </li>
								    <li>
								        <label for="score"><span>积分：</span></label>
								        <div class="inputText">
								            <span>
								            	<input type="text" readonly="readonly" id="score" name=""score"" maxlength="50" value="${score}"/>
								           	</span>
								        </div>
								    </li>
								     <li>
								        <label for="rank"><span>会员等级：</span></label>
								        <div class="inputText">
								            <span>
								            	<input type="text" readonly="readonly" id="rank" name=""score"" maxlength="50" value="${rank}"/>
								           	</span>
								        </div>
								    </li>
								    <li>
								        <label for="tel"><span> 联系电话：</span></label>
								        <div class="inputText">
								            <span>
								            	<input type="text" id="tel" name="tel" maxlength="50" value="${tel}"/>
								           	</span>
								        </div>
								    </li>
								    <li>
								        <label for="address"><span>收货地址：</span></label>
								        <div class="inputText">
								            <span>
								            	<input type="text" id="address" name="address" maxlength="50" value="${address}"/>
								           	</span>
								        </div>
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