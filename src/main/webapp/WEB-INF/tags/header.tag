<%@tag pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jspf" %>
<div id="header">
    <div class="wraper">
        <div id="headerCtner" class="headerCtner">
            <div class="logoCtner wraper">
                <a href="${ctx}" title="返回首页">
                    <img src="${ctx}/img/base/new_logo.jpg" style="width:125px; height: 132px" alt="myshop" class="logo ie6png" />
                </a>
            </div>
            <!-- 这里需要填写登录用户的用户名 -->
            <input type="hidden" id="username" value=""/>
            <div id="topbar">
                <div class="topbar">
                    <ul class="topnavbar">
                        <li class="welcome"></li>
                        <li class="expand">
                            <dl class="mysam">
                                <dt><a href="#" class="item">我的MyShop</a></dt>
                                <dd>
                                    <ol>
                                        <li><a href="${ctx}/account/user!edit.action">个人信息管理</a></li>
                                        <li><a href="${ctx}/order/order!myOrder.action">订单管理</a></li>
                                    </ol>
                                </dd>
                            </dl>
                        </li>
                        <li class="expand">
                            <dl class="help">
                                <dt><a class="item" href="#">帮助中心</a></dt>
                                <dd>
                                    <ol>
                                        <li><a href="#23">常见问题</a></li>
                                        <li><a href="#24">订单查询</a></li>
                                        <li><a href="#26">联系我们</a></li>
                                        <li><a href="#">增值服务</a></li>
                                    </ol>
                                </dd>
                            </dl>
                        </li>
                        <li class="expand">
                            <dl class="tools">
                                <dt><a href="###" class="item">快购工具</a></dt>
                                <dd>
                                    <ol>
                                        <li><a  id="admin" href="${ctx}/admin/user!list.action">后台</a></li>
                                        <li><a href="#">常购清单</a></li>
                                    </ol>
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="header">
                <div class="searchbar">
                    <!-- 查找入口 -->
                    <form action="${ctx}/product/product.action" id="searchForm" >
                        <div class="keywords">
                            <input id="topSearch" name="filter_LIKES_name" value="${param['filter_LIKES_name']}" type="text" maxlength="50" >
                        </div>
                        <a id="product_search" onclick="product_search()" class="btn_search" href="#">搜索</a>
                        <div class="autoFilled" id="autofilledview" style="display: none;"></div>
                    </form>
                </div>
                
                <div class="mycart">
                    <input type="hidden" id="minicartTotalQty" value="${sessionScope.cartMap.size()}" >
                    <a class="state" href="${ctx}/cart/cart!mycart.action">购物车（<strong id="WMheaderCartCount" class="pronum">0</strong>）</a>
                </div>
                
            </div>
            <div class="maskbg"></div>
        </div>
        <div class="headerPlaceHolder"></div>
    </div>
</div>
<script type="text/javascript">
    //Init art-Added Window
    var username;
    var logininfo = '<strong class="welmsg">MyShop欢迎您！</strong><span><a href="/myshop/login.action">登录</a><b>|</b><a href="/myshop/account/user!input.action">注册</a></span>';
    var logoutinfo = '<strong class="welmsg">MyShop欢迎您！</strong><span>会员<b>|</b><a href="/myshop/j_spring_security_logout">退出</a></span>';
    $.ajax({
	      type: "GET",
	      url: "/myshop/account/user!isLogined.action",
	      contentType: "text/html; charset=utf-8",
	      dataType: "text",
	      success:function(data){
	    	  var logininfo = '<strong class="welmsg">MyShop欢迎您！</strong><span id="logininfo"><a href="/myshop/login.action">登录</a><b>|</b><a href="/myshop/account/user!input.action">注册</a></span>';
	    	  var logoutinfo = '<strong class="welmsg">MyShop欢迎您！</strong><span id="logininfo">'+data+'</span><b>|</b><span><a href="/myshop/j_spring_security_logout">退出</a></span>';
	    	 if(data == ''){
	    		 $('.welcome').html(logininfo);
	    	 }else{
	    		 $('.welcome').html(logoutinfo);
	    	 }
	      }
	 });
    
    function product_search(){
    	/* $.ajax({
  	      type: "POST",
  	      url: "${ctx}/product/product.action",
  	      data:{filter_LIKES_name:$("#topSearch").val()}  
  	    }); */
    	$("#product_search").attr("href" ,"${ctx}/product/product.action?filter_LIKES_name="+$("#topSearch").val());
    	window.location.href = $("#product_search").href;
    }
   
    $(document).ready(function() {
    	$("#WMheaderCartCount").text($("#minicartTotalQty").val());
    	
    	$("#admin").on("click",function(){
    		var user = $("#logininfo").text();
    		if(user != "admin"){
    			alert("对不起，只有管理员拥有后台管理权限！");
    			return false;
    		};
    	});
    	
    	
    });
</script>

