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
						<span>&gt;</span> <strong>购买历史</strong>
					</div>
				</div>
				
				<div class="main_wrap">
					<h1><i class="ico_indicator"></i>我的订单</h1>
					<div id="ForTips" class="cont_wrap shoppingcart">
	                	<!-- 商品列表 -->
		                <div id="shoppingPanel">
		                
		                <s:iterator value="orderList">
		                
		                	<!-- 商品列表 -->
							<table id="cartTable" cellspacing="0" cellpadding="0" class="tb_pro mb10">
							    <tbody>
								    <tr>
							    	    <th colspan="2">编号${id}</th>
							            <th class="amt">订单总价：${amount}</th>
							            <th class="cash">创建时间${createDate }</th>
							            <th class="action">
							               <a href="#" onclick="deleteOrder(${id})">删除订单</a>
							            </th>
							        </tr>
							    </tbody>
							    
							<s:iterator value="itemList" >
							  <tbody class="bg_lightblue">
							    	<tr>
							    		<td class="img">
							    			<a href="${ctx}/product/product!input.action?id=${productId}" title="${productName}">
							    			</a>
							    		</td>
							    		<td class="pro">
							    			<a href="${ctx}/product/product!input.action?id=${productId}" class="ashowtip" title="${productName}">${productName}</a>
										</td>
										<td class="amt" id="property463515" width="137px">
											<span class="op op_limit">
							                                                    数量:${productNum}
											</span>
											<p id="changeQtyText0" class="tc orange" style="display:none;">修改完成</p>
											<!-- 个性属性列表 -->
											<div class="tipPop amtPop"></div>
										</td>
										<!-- 单价 -->
										<td class="cash">单价:${productPrice}</td>	
										<td></td>
									</tr>
							       	</tbody>
							</s:iterator>  
							</table>
		                  </s:iterator>
		                </div>
		            </div>
				</div>
			
			</div>
		</div>
	</div>
</div>
<gover:footer />
<script type="text/javascript">

function deleteOrder(orderId){
	if(!confirm("你确定删除该订单吗？")){
		   return false;
	   }
	$.ajax({
        type: "GET",
        url: "${ctx}/order/order!delete.action?orderId="+orderId,
        contentType: "text/html; charset=utf-8",
        dataType: "text",
        success:function(data){
        	alert(data);
        }
    });
	window.location.href  = "${ctx}/order/order!myOrder.action";
}


</script>
<gover:contentFooter />