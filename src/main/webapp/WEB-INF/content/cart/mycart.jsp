<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jspf" %>
<gover:contentHeader title="购物车 - 母婴购物网 " index="false"/>
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
						<span>&gt;</span> <strong>购物车</strong>
					</div>
				</div>
	
				<div class="main_wrap">
					<ol class="step step-three fr">
						<li class="first"><strong class="current"><span><i class="icocart"></i>我的购物车</span></strong></li>
						<li><strong><span>核对订单信息</span></strong></li>
						<li class="last"><strong><span>订单提交成功</span></strong></li>
					</ol>
					<h1><i class="ico_indicator"></i>我的购物车</h1>
		
					<div id="ForTips" class="cont_wrap shoppingcart">
	                <!-- 商品列表 -->
		                <div id="shoppingPanel">
						<!-- 商品列表 -->
							<table id="cartTable" cellspacing="0" cellpadding="0" class="tb_pro mb10">
							    <tbody>
								    <tr>
							    	    <th colspan="2">商品名称</th>
							            <th class="amt">数量</th>
							            <th class="cash">单价</th>
							            <th class="cash">小计</th>
							            <th class="action">操作</th>
							        </tr>
							    </tbody>
							    
							<s:iterator value="#session.cartMap">
							
							  <tbody class="bg_lightblue">
							    	<tr>
							    		<td class="img">
							    			<a href="${ctx}/product/product!input.action?id=${value.productId}" title="${value.productName}">
							    				<img src="${ctx}${value.productImg}" alt="${value.productName}" style="width:80px" />
							    			</a>
							    		</td>
							    		<td class="pro">
							    			<a href="${ctx}/product/product!input.action?id=${value.productId}" class="ashowtip" title="${value.productName}">${value.productName}</a>
										</td>
										<td class="amt" id="property463515" width="137px">
											<span class="op op_limit">
							                    <input type="text" class="intxt" value="${value.productNum}" maxlength="5" cannotquan="0">
											</span>
											<p id="changeQtyText0" class="tc orange" style="display:none;">修改完成</p>
											<!-- 个性属性列表 -->
											<div class="tipPop amtPop"></div>
										</td>
										<!-- 单价 -->
										<td class="cash">${value.productPrice}</td>	
										<!-- 小计 -->
										<td class="cash">${value.productTotal}</td>
										<!-- 操作 -->
										<td class="action">
											<p>
												<a id="del1" href="${ctx}/cart/cart!delete.action?proId=${value.productId}" class="" ref1="463515" cannotdel="0">删除</a>
											</p>
										</td>
									</tr>
							       	</tbody>
							</s:iterator>  
								

							</table>
							<div class="batchOper mt10">
								<a id="clearCart" href="${ctx}/cart/cart!clear.action"  onclick="clearCart()" class="btn_clear"><span>清空购物车</span></a>
								<a href="${ctx}" class="btn_continue">继续购物</a>
							</div>

							<!-- 合计结账 -->
							<div class="clear"></div>
							<div class="totalprice mt15">
								<div class="inner cls">
        							<div class="inner totalinfo">
										<h2>合计</h2>
										<div class="feeCtner cls">
										<ul class="rightCol">
											<li class=""><span class="tit">金额合计：</span><span class="cash orange">￥${cartTotalCast}</span></li>
											<li class=""><span class="tit">会员折扣：</span><span class="cash orange">￥${cartOffCast}</span></li>
											<li class=""><span class="tit">应收金额：</span><span class="cash orange">￥${cartMemberCast}</span></li>
										</ul>
									</div>
									<div class="btn_action">
									    <input type="hidden" id="isLogined" value="${logined}">
										<a id="checkOut" cid="checkOut1" class="calculate" onclick="checkOut()" href="#"></a>
										<a class="calculate loading" href="javascript:void(0);" style="display:none;">正在处理中...</a>
	   								</div>
								</div>
						    </div>
						</div>
                	</div>
				</div>		
				</div>
			<!--main_wrap end-->
			</div>
    	</div>
	</div>
</div>

<div id="miniLogin" class="miniloginBoxCtner centerPopB popWin" moving="0" showed="0" style="left: 50%; top: 283px; margin-left: -164.5px; display: none;">
    <div class="bg"></div>
    <div class="centerPopBody"></div>
    <a class="close ie6png" href="javascript:void(0);">关闭</a>
</div>

<gover:footer />
<script type="text/javascript" src="${ctx}/js/www/pg_checkout_v2.js"></script>
<script type="text/javascript">
   function clearCart(){
	   if(!confirm("你确定要清空购物车吗?")){
			return false;
		}
   }

   function checkOut(){
	   if($("#cartTable tbody").length ==1){
			alert("你还没有购物，请先选择商品!");
			return false;
	   }
	   
	   var cartMemberCast=${cartMemberCast};
	   
	   if(!confirm("确认购买后，你将获得"+cartMemberCast+"积分")){
		   return false;
	   }
	   
	   $.ajax({
	            type: "POST",
	            url: "${ctx}/order/order!addOrder.action?cartMemberCast=${cartMemberCast}",
	            contentType: "text/html; charset=utf-8",
	            dataType: "text",
	            success:function(data){
	            	alert(data);
	            }
	  });
	   
	   $("#checkOut").attr("href" ,"${ctx}/order/order!myOrder.action");
	   window.location.href = $("#checkOut").href;
   }


     var resources_Shopping={
                NeweggGiftSelectConfirm:'您还有赠品活动没有参加哦！确定要放弃赠品吗？',
		        ShoppingCartAsynCallDel:'确认要从购物车中移除该商品？',
                ShoppingCartCheckQty1 : '商品数量必须是整数！',
                ShoppingCartCheckQty2 : '数量必须大于零！',
                ShoppingCartCheckQty3 : '超出每日限购数量！',
                ShoppingCartCheckPromotionCode : '请输入优惠券！',
                ShoppingCartClearPrompt : '确定清空购物车吗？',
                ShoppingCartWarrantySelect : '请选择您要购买的延保服务！',
                PopupInfo : '正在处理中．．．',
                ShoppingCartCheckQty4 : '超出商品可购数量！',
                OldChangeNewLicenceNotEmpty: '凭证编号为必填项'
                , OldChangeNewInputFormatError: '格式不规范'
                , OldChangeNewInputPersonalCardFormatError: '身份证件号码不符合规范，请重新录入，或联系山姆客服处理。'
                , OldChangeNewOldChangeNewCertificateAccountNotEmpty: '证件编号为必填项'
                , OldChangeNewInputOrganizationCodeCardFormatError: '组织机构代码必须是9位'
                , OldChangeNewCertificateNameNotEmpty: '证件姓名为必填项'
                , OldChangeNewBankCustomerNameNotEmpty: '开户人姓名为必填项'
                , OldChangeNewBankNameNotEmpty: '账户所在银行为必填项'
                , OldChangeNewBranchBankNameNotEmpty: '开户分行为必填项'
                , OldChangeNewBankAccountNotEmpty: '银行卡号为必填项'
                , OldChangeNewIdentityLabelName: '身份证姓名:'
                , OldChangeNewOrganizationLabelName: '机构名称:'
                , OldChangeNewCertificateName: '证件姓名:'
                , OldChangeNewIdentificationCardCode: '公民身份证号码:'
                , OldChangeNewMilitaryOfficerCardCode: '军官证编号:'
                , OldChangeNewSoldierCardCode: '士兵证编号:'
                , OldChangeNewOrganizationCodeCardCode: '组织机构代码:'
                , OldChangeNewTradeInCodeInputEmptyPrompt: '您填入的凭证号不能为空，请输入'
                , OldChangeNewTradeInCodeInputErrorPrompt: '您填入的信息不正确，请重新输入'
                , OldChangeNewTradeInCodeInputreadError: ' 请确认您已阅读并同意《以旧换新帮助》中的所有条款内容'
                , AccountCenter_ModifyShippingAddress_InfoMaxLength : '填写信息长度不能大于20'
                , OldChangeNew_CertificaterNameMessage: '此处提供的身份证件信息（姓名、号码）必须与以旧换新凭证上的顾客信息（姓名、号码）完全一致，山姆将以此信息为准开具发票。'
                , OldChangeNew_BankNameMessage: '填写账户所属银行，建设银行无法退款，请提供其他银行硬卡或活期存折账户'
                , OldChangeNew_BranchBankNameMessage: '除分行信息外，还需注明支行信息，例如上海分行淮海路支行、上海分行水电支行'
                , SystemErrorInfo: '系统繁忙，请稍后重试，谢谢！'
                , confCheckOutTimer:3600
    };
    var resource_Image_Shopping = 
    {
	    iconA3_1 : 'http://www.samsclub-estore.com/Resources/2009/Default/Nest/icon/iconA3_1.gif',
	    iconLoadingA: 'http://www.samsclub-estore.com/Resources/2009/Default/Nest/img/iconLoadingA.gif'
    }
    BizGetPingAnPoint.post();
    Sam.ShoppingCartInit(); 
   
     //omniture
     try {
         s.pageName = '购物流程:购物车';
         s.prop1 = reportsuite;
         s.channel = '购物流程:购物车';
         s.prop7 = '购物流程:购物车';
         s.prop8 = '购物流程:购物车';
         s.prop4 = '购物流程:购物车';
         s.prop9 = '购物流程:购物车';
         s.events = 'scView';
     } catch (ex) { };
 </script>
<gover:contentFooter />
