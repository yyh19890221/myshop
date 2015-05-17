<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jspf" %>
<gover:contentHeader title="产品详细页 - 母婴购物网 " index="false"/>
<gover:header />
<gover:menu />
<div id="main">
	<div class="main">
		<!--类别页面的面包屑放在了外面-->
    	<div class="wraper">
			<div class="crumb crumbAlter" id="crumb">
			    <div class="inner">
			        <a title="返回首页" href="/">首页</a>
				    <span> > </span>
				    <a title="母婴玩具" href="http://www.samsclub.cn/TabStore/2267.htm">母婴玩具</a>
				    <span> > </span>
				    <strong>${name}</strong>
			    </div>
			</div>
        

		    <div class="wraper">
		        <div class="proGeneral">
		        	<!-- 左边图片展示容器 -->
					<div class="leftImg">
						<div class="bigImg" style="position: relative;">
							<a id="bigImg" href="${ctx}${picture}" >
								<img id="midImg"  width="380" height="380" src="${ctx}${picture}" />
							</a>
						</div>
						<div class="navBar">
							<a href="javascript:void(0)" class="abtn aleft agrayleft">左移</a>
							<div class="mover" id="mover1">
								<ul>
									<li><a class="curhover " href="javascript:void(0);" src="${ctx}${picture}"></a></li>
							</div>
							<a href="javascript: void(0);" class="abtn aright">右移</a>
						</div>
						<div class="shareArea">
							<label>分享到：</label>
							<ul>
								<li><a class="item_weibo" href="###" title="新浪微博"  href="javascript: void(105);" id="shareCtner_tsina" onclick="SNSShare.Share(this);" rel="nofollow">新浪微博</a></li>
								<li><a class="item_tx_weibo" href="###" title="腾讯微博" href="javascript: void(117);" id="shareCtner_tqq" onclick="SNSShare.Share(this);" rel="nofollow">腾讯微博</a></li>
							</ul>
						</div>
					
					</div>

					<div class="rightMain">
						<div class="proHeader">
						    <!-- 产品id -->
						    <input type="hidden" value="${id}" id="proId">
							<!-- 产品名称 -->
							<h1  id="proName" style="padding:0 0px;line-height:25px;border-bottom: 0 solid #E4E4E4;height: 50px;" >
								${name}
							</h1>
							<!-- 产品描述 -->
							<p class="promoText">${description}</p>
						</div>

						<!--proHeader End-->
						<div class="detailList">
							<ul class="cls">
								<!-- 商品重要属性描述 -->
								<li class="proAttrSection cls">
<!-- 									<label>Item#：</label> -->
<!-- 									<p>454056</p> -->
<!-- 									<label class="ml30">重量：</label> -->
<!-- 									<p><span>0.198kg</span></p> -->
								</li>
								<!-- 商品价钱 -->
								<li class="proPriceSection cls">
									<p>
										<span class="curPrice">￥${price}</span>
<!-- 										<a class="ml20 funcPriceNotice underline btn_minilogin" onclick="return mini.checkLogin(this);" href="http://www.samsclub.cn/Feedback/ProductDiscountNotify.aspx?ProductSysNo=463515"> 降价通知</a> -->
									</p>
								</li>
								<!-- 商品评分 -->
								<li class="cls">
<!-- 	                    			<label>商品评分：</label> -->
<!--                     				<p> -->
<!-- 										<span class="rate"> -->
<!-- 											<span class="rankB10" title="得分 4.8"></span> -->
<!-- 										</span> -->
<!-- 										<a href="#commentSection" class="rank">[25条评论]</a> </p> -->
								</li>
								<!-- 促销活动区 -->
								<li class="saleArea cls">库存：${leftcount}件</li>
								<li class="cls">
<!-- 					  				<label>支付方式：</label> -->
<!-- 				                  	<p class="mr15"><span class="paytypeItem"><i class="icon_alipay"></i>支付宝</span></p> -->
<!-- 				                  	<p class="mr15"><span class="paytypeItem"><i class="icon_bankcard"></i>银行卡支付</span></p> -->
<!-- 								  	<p class="mr15"><span class="paytypeItem"><i class="icon_money"></i>银行转账</span></p> -->
<!-- 								  	<p id="ctl00_CenterArea_productBasicInfo1_CashOnDelivery" class="mr15"><span  class="paytypeItem"><i class="icon_daofu"></i>货到付款</span></p> -->
								</li>
								<li class="proLine"></li>
							</ul>
	              			<div class="clear"></div>
							<ul class="cls proInfo">
								<li class="cls"></li>
							    <li class="buyarea cls">
							        <p class="volumeSet mr10">
							            <span class="buyInfo op"><a href="javascript:void(0);" class=" plus oper oper_plus">&and;</a>
							                <input class="intxt" id="buyQty" type="text" value="1" name="textfield" onblur="buyProduct.onblurCheck();" maxlength="5">
							                <span class="unit"></span>
							                <a href="javascript:void(0);" class="  minus oper oper_minus">&or;</a>
							            </span>
							        </p>
									<a title="放入购物车" href="javascript:buyProduct.addToCartNoHref(this);" class="btnAddShopping mr25" id="btnAddCart">
										<span style="color: #fff; font-size: 16px; padding-left:37px">加入购物车</span>
									</a>							        
							        <!--加入购物车结算提醒-->
							    </li>
						    </ul>
						</div>
              			<!--detailList End-->
           			</div>
            		<!--rightMain End-->
            		<div class="clear"></div>
        		</div>
       		<!--proGeneral End-->
			</div>
    		<!--wraper1 end-->
    
		    <div class="colSection">
		        <div class="wraper cls">
		            <div class="col_980 fr">
						<div class="tab_productInfo cls">
						    <div class="tab tabIntro">
						        <a href="javascript:void(0);" rel="0" class="first now"><span><em>商品介绍</em></span></a>
		<!-- 				        <a href="javascript:void(0);" rel="1"><span><em>规格参数</em></span></a> -->
		<!-- 				        <a href="javascript:void(0);" rel="2"><span><em>品牌信息</em></span></a> -->
						        <a href="#commentSection" rel="link"><span><em>商品评论</em></span></a>
		<!-- 				        <a href="#consultSection" rel="link"><span><em>商品咨询</em></span></a> -->
						        <a href="javascript:void(0)" rel="link"><span><em style="cursor: default;">&nbsp;</em></span></a>
						    </div>
						    <!-- 商品介绍 -->
						    <div id="tabCot_product_1" class="tabc tabcIntro">
						        <div class="tabDesc">
						            <table style="border-style: none; width: 100%">
						                <tr>
						                    <td style="border-style: none; padding: 0px;">
						                    	<!-- 商品图片 -->
						                        <div>
													<div style="padding-bottom:10px;">
														<img src="${ctx}${picture}" title=" " alt=" "/>
													</div>
												</div>
												<!-- 商品参数 -->
												<!-- <div>
													<div style="width:985px;">
														<div style="font-size: 18px; border-bottom: 2px solid green;padding-bottom: 2px; margin-bottom: 8px;">商品参数&nbsp;&nbsp;<span style="color: #ccc">PRODUCT PARAMETERS</span></div>
													</div>
													<div style="width:985px; padding:5px 0 10px 0;">
														<table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-family:'微软雅黑'; font-weight:normal; font-size:14px; color:#666666;">
															<tr>
														    	<td width="50%">品名：plum谷百西梅果泥<br />产地：美国</td>
														    	<td width="50%">规格：99克X2袋<br />总净含量：198克</td>
														  	</tr>
														  	<tr>
														    	<td>配料：水（60%），西梅（40%）</td>
														    	<td>保质期：13个月</td>
														  	</tr>
														</table>
													</div>
												</div> -->
												<!-- 优选理由 -->
												<div>
													<div style="width:985px;">
														<div style="font-size: 18px; border-bottom: 2px solid green;padding-bottom: 2px; margin-bottom: 8px;">优选理由&nbsp;&nbsp;<span style="color: #ccc">WHY RECOMMEND</span></div>
													</div>
													<div style="width:985px; padding:5px 0 10px 0;">
														<table width="100%" border="0" cellpadding="0" cellspacing="0">
														  	<tr>
														    	<td style=" vertical-align:top;"><div style="padding-left:20px;"><ul style="font-family:'微软雅黑'; font-size:14px; color:#666666;">
														    	  ${introduce} 
														    	</div></td>
														  	</tr>
														</table>
													</div>
												</div>
						                    </td>
						                </tr>
						            </table>
		           					<div class="clear">&nbsp;</div>
		           				</div>
		       					<div class="tabDesc" style="padding-top: 0;"></div>
							</div>
						</div>
		
		                <!--tab_productInfo End-->
		                <!--Comments Star-->
		                <a name="commentSection"></a>
		                <div class="section">
							<div class="caption"><h2><strong>用户评论</strong></h2><div class="fr mr15">购买过此商品才可发表评论<a class="cmnBtn_blue ml20" href="http://www.samsclub.cn/Product/AZ4-G6T-2X6_172/Reviews.htm?anchor=write" onclick="return CmnBtnCheckLogin(this);"><span>发表评论</span></a></div></div>
							<div class="cont">
								<div class="comments cls" id="comment">
									<dl>
										<dd class="tabc tabcComment">
											<div class="commentlist" id="comment_0">
												<!-- 无评论信息的时候 -->
												<p class="noItem">暂无评论</p>
												<!-- 有评论信息的时候 -->
												<div class="cellLine ">
													<div class="left">
														<a href="http://www.samsclub.cn/61665014381/Review.htm" title="wangziyin3">
															<img style="vertical-align:middle;" src="${ctx}/img/base/default_head_img.png" width="50px" height="50px">
														</a>
													</div>
													<div class="right">
														<div class="orderReview">
															<a class="blue" href="#" title="wangziyin3" >wangziyin3</a><span class="postFrom">来自【北京亦庄店】</span>
															<span class="rate">
																<span class="rankB10" title="得分 5.0"></span>
															</span>
														</div>
														<blockquote><label>优点：</label><p>很好，一直用蓝月亮，还有赠品，很值</p></blockquote>
														<blockquote><label>缺点：</label><p>暂时还没有发现缺点哦。</p></blockquote>
														<div class="reply">
															<ul></ul>
														</div>
													</div>
												</div>
											</div>
										</dd>		
									</dl>
			 						<div class="operline">
			 							<span class="fr">
			 								<a class="" href="http://www.samsclub.cn/Product/AZ4-G6T-2X6_172/Reviews.htm">查看全部${0}条评论</a>
			 							</span>
			 						</div>
								</div>
							</div>
		                </div>
		                <!--Comments End-->
		            </div>
		            <!--col_980 End-->
		            <div class="col_230 fl">
		                <div class="sidebox history mb15">
		                    <h4><strong>热门商品</strong><i></i></h4>
							<div class="cont">
							  	<ul class="prolist">
							    	<s:iterator value="#session.hotList">
									<li>
										<p class="img"><a href="${ctx}/product/product!input.action?id=${id}" title="${name}">
											<img src="${ctx}${picture}"></a>
										</p>
										<p class="title"><a href="${ctx}/product/product!input.action?id=${id}" title="${description}" >${name}</a></p>
										<p><span class="price">${nowprice}</span></p>
									</li>
								 </s:iterator>
								</ul>
							</div>       
		                </div>
		            </div>
		            <!--col_230 End-->
		        </div>
		    </div>
   		</div>
		<!--colSection End-->
		<div class="bottomBar">
		    <div class="wraper cls">
		        <div class="backToTop">
		            <a href="javascript:void(0);" title="回到顶部">回到顶部</a>
		        </div>
		    </div>
		</div>
		
	</div>

</div>
<!-- 购物车提醒 -->
<div class="cartAddedBoxCtner centerPopB popWin">
    <div class="bg"></div>
    <div class="centerPopBody">
        <div class="contbody">
            <div class="addCartSucc">
                <h3 class="mb10">商品已成功添加到购物车</h3>
                <p>
                    <a href="${ctx}/cart/cart!mycart.action" class="btn_checkout mr10">立即结算</a>
                    <a href="javascript:void(0);" class="btn_gray" id="btnContinueShopping"><span>继续购物</span></a>
                </p>
            </div>
        </div>
    </div>
    <a class="close ie6png" href="###">关闭</a>
</div>
<!--加入购物车结算提醒-->
<script type="text/javascript">
    //Init art-Added Window
    $(document).ready(function() {
        var win_cartAdded = PopWin(".cartAddedBoxCtner", {
            animate: true,
            speed: 0,
            olSpeed: 0,
            olOpacity: 0.35,
            //  overlay: "#overlay_transparent",
            callOnce: function(o) {
                o.find("#btnContinueShopping").click(function() {
                    win_cartAdded.fn.popOut();
                });
            }
        });
        //popIn
        $(".btnAddShopping").click(function() {
        	 $.ajax({
       	            type: "GET",
       	            url: "${ctx}/cart/cart!addCart.action",
       	            data: {id:$('#proId').val(),proNum:$('#buyQty').val()},
       	            contentType: "text/html; charset=utf-8",
       	            dataType: "text",
       	            success:function(data){
       	            	$("#WMheaderCartCount").text(data);
       	            }
        	  });
            win_cartAdded.fn.popIn();
        });
        $(".btn_checkout").click(function() {
            win_cartAdded.fn.popOut();
        });
    })

</script>
<!-- 页面底部 -->
<gover:footer />

<div id="miniLogin" class="miniloginBoxCtner centerPopB popWin">
    <div class="bg"></div>
    <div class="centerPopBody"></div>
    <a class="close ie6png" href="javascript:void(0);">关闭</a>
</div>
<div id="overlay_transparent" style="top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 999;"></div>

<div id="overlay"></div>

<div style="display: none;" class="noprint">
<!--[if IE 6]>
<script src='${ctx}/js/common/DD_belatedPNG_0.0.8a-min.js'></script>
<script>DD_belatedPNG.fix('.ie6png');document.execCommand("BackgroundImageCache",false,true);</script>
<![endif]-->
<script type="text/javascript">
    
    var reportsuite = 'longgang';
</script>
<script type="text/javascript" src="${ctx}/js/common/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="${ctx}/js/common/jquery.menu-aim.js"></script>
<script type="text/javascript" src="${ctx}/js/common/pg_global.js"></script>
<script type="text/javascript" src="${ctx}/js/common/ui.popWin.js"></script>
<script type="text/javascript" src="${ctx}/js/common/ui.Xslider.js"></script>
<script type="text/javascript" src="${ctx}/js/common/Base.js"></script>
<script type="text/javascript" src="${ctx}/js/www/BizProDetail.js"></script>
<script type="text/javascript" src="${ctx}/js/SSL/BizShopping2.js"></script>
<script type="text/javascript" src="${ctx}/js/common/jqzoom.js"></script>
<script type="text/javascript" src="${ctx}/js/common/ui.rating_v2.js"></script>
<script type="text/javascript" src="${ctx}/js/www/pg_product_v2.js"></script>
<script type="text/javascript" src="${ctx}/js/SSL/BizMiniLogin.js"></script>
<script type="text/javascript" src="${ctx}/js/common/s_code.js"></script>
<script type="text/javascript">
var StoreList = new Array();
</script>

    <script type="text/javascript" language="javascript">
if(typeof(resolution) ==  "undefined"){
    resolution = 0;
}

var resources_ProductDetail={
		productID:463515,
		productCode:'AZ4-G6T-2X6_172',
		productGroupSysNo:'0',
		maxPerOrderWarnning:'您输入的数量不能大于每单限购数量，请您重新输入！',
		minPerOrderWarnning:'您输入的数量不能小于最小订购数量，请您重新输入！',
		invalidInput:'无效的数字',
		inventoryWarnning:'您这次设置超出商品可购数量，您还可以再添加{0}个商品！',
		promptWholeSale2:'{0}元/件',
		qty:27,
		bufferQty:1,
		city24Name:'{0} 24小时送达范围：',
		saleRuleMainItemTiltle:'<ins  id="saleRuleMasterItemQty" title="本套餐包括{0}件此产品">({0}件)&nbsp;</ins>',
		moreCombo:'更多套餐…',
		moreComboDelay:'正在加载中…',
		moreComboHide:'隐藏',
		moreGiftInfo:'更多活动',
		lessGiftInfo:'点击收起',
		couldSelectInfo:'您还可以勾选{0}件赠品',
		selectTooMoreInfo:'您勾选的赠品超过了规定的赠送数量！',
		OutofStock:'无货',
		coreMetricsShoppingCartKey:'CMSCT',
		coreMetricsShoppingCartDefault:'0',
		productImageP220:'http://img.samsclub-estore.com/neg/P380/Z4-G6T-2X6_A.JPG?v=1D7782A224E14DC29967',
		personalPropertySysNo:'PersonalPropertySysNo',
		personalPropertyValueSysNo:'PersonalPropertyValueSysNo',
		omnitrueCategoryAndProductName:';;;;evar21=AZ4-G6T-2X6_172|evar22=即食婴儿食品'
};


chgPic();


UI.Xslider(".leftImg>.navBar", {
    scrollObj: ".mover ul",
    dir: "V",
    viewedSize: 420,
    unitLen: 84,
    unitDisplayed: 5
})


buyProduct.init();

var ProductDiscuss_Resource = {
    SearchUrl : { All:"http://www.samsclub.cn/Product/AZ4-G6T-2X6_172/Discuss/Reviews.htm?DType=None",
         SunSingleDiscuss:"http://www.samsclub.cn/Product/AZ4-G6T-2X6_172/Discuss/Reviews.htm?DType=SunSingleDiscuss",
         CommonDiscuss:"http://www.samsclub.cn/Product/AZ4-G6T-2X6_172/Discuss/Reviews.htm?DType=CommonDiscuss",
         AskDiscuss:"http://www.samsclub.cn/Product/AZ4-G6T-2X6_172/Discuss/Reviews.htm?DType=AskDiscuss"
    },
    SearchDefaultValue : "输入关键字，搜索网友讨论"
}
var create_review = {
    currentPageUrl:"http://www.samsclub.cn/Product/AZ4-G6T-2X6_172.htm",
    reviewUrl : "http://www.samsclub.cn/Product/AZ4-G6T-2X6_172/Reviews.htm",
    reviewVoteSuccessMessage:'感谢您的投票！',
    reviewVoteErrorMessage:'您已经发表过对该评论的评价，谢谢！',
    reviewSearchKeyWord : '输入关键字，搜索用户评论',
    postTimeLimit:'60',
	errorInfoFastPulish:'很抱歉，您的发表频率过快，请稍后再试。'
}

var productRecommandResource={
    pointPriceFormat : "{0}分",
    priceFormat:"￥{0}",
    cartUrl:"shoppingCart.aspx"
};


</script>

</div>
<gover:contentFooter />
