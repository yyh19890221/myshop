<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/common/taglibs.jspf" %>
<gover:contentHeader title="首页 - 母婴购物网 " index="false"/>
<gover:header />
<gover:menu />
<div id="main">
	<div class="main">
            <!--类别页面的面包屑放在了外面-->
            <div class="crumb crumbAlter" id="crumb">
                <div class="inner">
                    <a title="返回首页" href="http://localhost:8080/myshop">首页</a>
            	    <span> > </span><strong>婴儿玩具</strong>
                </div>
            </div>
            <div class="wraper">
                <input type="hidden" id="Hidden1" value="2267" />
                <div class="cls mt10" id="CategoryID_lazy">
                    <div class="col_230 fl">
                        <div class="ad" id="imgLoadBanner1"></div>
                        <div class="sidemenu mt10 mb15">
                            <dl class="catelist">
                                <dd class="titLevel1"><h2>婴儿食物</h2></dd>
                                <dd class='cateLevel2 cateLevel2_expand'>
                                    <h2 class="titLevel2">
                                        <a href="${ctx}/product/product.action?filter_LIKES_catalogId=0101" class="">婴儿奶粉<i></i></a>
                                    </h2>
                                    <div class="cateLevel3"  style=''>
                                        <ul>
								            <li ><a href="${ctx}/product/product.action?filter_LIKES_catalogId=0101001">婴儿奶粉<i></i></a></li>
                                            <li ><a href="${ctx}/product/product.action?filter_LIKES_catalogId=0101002">婴儿辅食<i></i></a></li>
                                            <li ><a href="${ctx}/product/product.action?filter_LIKES_catalogId=0101003">即食婴儿食品<i></i></a></li>
                                        </ul>
                                    </div>
                                </dd>
                                <dd class="titLevel1"><h2>尿裤湿巾</h2></dd>
                                <dd class='cateLevel2 cateLevel2_expand'>
                                <h2 class="titLevel2">
                                        <a href="${ctx}/product/product.action?filter_LIKES_catalogId=0102" class="">纸尿裤<i></i></a>
                                </h2>
                                </dd>
                                <dd class="titLevel1"><h2>母婴日用</h2></dd>
                                <dd class='cateLevel2 cateLevel2_expand'>
                                <h2 class="titLevel2">
                                        <a href="${ctx}/product/product.action?filter_LIKES_catalogId=0103" class="">奶嘴/奶瓶<i></i></a>
                                </h2>
                                </dd>
                                <dd class="titLevel1"><h2>玩具系列</h2></dd>
                                 <dd class='cateLevel2 cateLevel2_expand'>
                                  <h2 class="titLevel2">
                                        <a href="${ctx}/product/product.action?filter_LIKES_catalogId=0104" class="">儿童地垫<i></i></a>
                                </h2>
                                </dd>
                                <dd class="titLevel1"><h2>婴幼服饰</h2></dd>
                                 <dd class='cateLevel2 cateLevel2_expand'>
                                  <h2 class="titLevel2">
                                        <a href="${ctx}/product/product.action?filter_LIKES_catalogId=0105" class="">婴儿服饰<i></i></a>
                                </h2>
                                </dd>
                                
                                
                            </dl>
                        </div>
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
										<p><span class="price">${price}</span></p>
									</li>
								 </s:iterator>
								</ul>
							</div>
                        </div>
                    </div>
                    <!--col_160 End-->
                    <div class="col_980 fr">
                        <div class="cls mb10">
                            <div class="topbanner">
                                <ul class="mover">
                                    <li>
                                        <a href="http://www.samsclub.cn/promotion-776-babydiaper_4803.htm?icid=4803L1_Baby_POV1" title="进口母婴用品">
                                            <img alt="进口母婴用品" src="http://img.samsclub-estore.com/Banners/L2pov1_importbaby.jpg" width="980" height="197">
                                        </a>
                                    </li>
    
                                    <li>
                                        <a href="http://www.samsclub.cn/Category/2330.htm" title="玩具——放飞孩子想象力">
                                            <img alt="玩具——放飞孩子想象力" src="http://img.samsclub-estore.com/Banners/L2pov2_toys.jpg" width="980" height="197">
                                        </a>
                                    </li>
                                </ul>
                                <div class="nav">
                                    <div class="navwraper">
                                        <ul>
                                            <li class="current">
                                                <a href="javascript:void(0);" title="进口母婴用品">1</a>
                                            </li>
	
                                            <li class="">
                                                <a href="javascript:void(0);" title="玩具——放飞孩子想象力">2</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>							
                            </div>
                        </div>
                        <!--公告咨询-->
            
                        <div class="filter mb10">
                            <div class="pageNav fr">
                                <span class="mr10">共<strong class="blue">${page.totalCount}</strong>个产品</span>
                                <a class="pre preDisable"href="javascript:void(0)">
                                    <span><span>&nbsp;</span></span>
                                </a>
                                <ins><strong class='curr'>${page.pageNo}</strong>/${page.totalPages}</ins>
                                <a class="next"href="javascript:jumpPage(${page.prePage})">
                                    <span><span><i class='arrow'></i></span></span>
                                </a>
                            </div>
                            <div class="orderItems">
                                <span class='orderCell  orderActive '>
                                    <a href="#" id="orderByDefault" class="item">
                                        <span>默认</span>
                                    </a>
                                </span>
                                <span class='orderCell '>
                                    <a href="#" id="orderBySale" class="item itemDownOnly">
                                        <span>销量</span>
                                    </a>
                                </span>
                            </div>
                        </div>
                        <!-- 商品列表 -->
                        <div class="category cls">
                            <div class="listWrap">
                                <ul class="prolist cls">
                                <s:iterator value="page.result">
                                    <li>
                                        <div class="inner">
                                        	<!-- 商品图片 -->
                                            <p class="img">
                                                <a target="_blank" href="${ctx}/product/product!input.action?id=${id}">
                                                    <img src="${ctx}${picture}" title="${name} alt="">
                                                </a>
                                            </p>
                                            <!-- 商品名称 -->
                                            <p class="title">
                                                <a href="${ctx}/product/product!input.action?id=${id}" target="_blank" title="${description}"> ${name}</a>
                                            </p>
                                            <!-- 商品描述 -->
                                            <p class="prom">${description}</p>
                                            <!-- 商品价格 -->
                                            <div class="priceline cls">
                                                <p class="price"><span>￥${price}</span></p>
                                            </div>
                                        </div>
                                    </li>
                                    </s:iterator>
                                </ul>
                            </div>
                        </div>
                        
                        <form id="mainForm" action="product.action" method="get">
							<input type="hidden" name="page.pageNo" id="pageNo" value="${page.pageNo}"/>
							<input type="hidden" name="page.orderBy" id="orderBy" value="${page.orderBy}"/>
							<input type="hidden" name="page.order" id="order" value="${page.order}"/>
                        <div class="cls">
                            <div class="pageNav mb20 fr">
                            
                                <span class="mr10">共 <strong class="blue">${page.totalCount}</strong> 件商品</span>
                                
			                      <a href="javascript:jumpPage(1)">首页</a>
			
			                    <s:if test="page.hasPre">
			                         <a class="pre" href="javascript:jumpPage(${page.prePage})">
                                       <span><span>上一页</span></span></a>
			                    </s:if>
			                    <s:else>
								    <a class="pre preDisable" href="javascript:jumpPage(${page.prePage})">
                                    <span><span>上一页</span></span></a>
								</s:else>
								
								<s:if test="page.hasNext">
			                        <a class="next"href="javascript:jumpPage(${page.nextPage})"><span><span>下一页</span></span></a>
			                    </s:if>
			                    <s:else>
								  <a class="next nextDisable"href="javascript:jumpPage(${page.nextPage})"><span><span>下一页</span></span></a>
								</s:else>
                                
                                <a href="javascript:jumpPage(${page.totalPages})">末页</a>
                                
                            </div>
                        </div>
                      </form>
                    </div>
                    <!--col_820 End-->
                </div>
            </div>
        </div>
    </div>


<!-- 页面底部 -->
<gover:footer />

<div id="overlay"></div>

<!--[if IE 6]>
<script src='Resources/Scripts/Common/DD_belatedPNG_0.0.8a-min.js'></script>
<script>
    DD_belatedPNG.fix('.ie6png');
  document.execCommand("BackgroundImageCache",false,true);
</script>
<![endif]-->
<script type="text/javascript">
    
    var reportsuite = 'longgang';
</script>
<!-- 亚马逊下拉菜单插件 -->
<script type="text/javascript" src="${ctx}/js/common/jquery.menu-aim.js"></script>
<script type="text/javascript" src="${ctx}/js/common/pg_global.js"></script>
<script type="text/javascript" src="${ctx}/js/common/ui.popWin.js"></script>
<script type="text/javascript" src="${ctx}/js/common/ui.Xslider.js"></script>
<script type="text/javascript" src="${ctx}/js/common/Base.js"></script>
<script type="text/javascript" src="${ctx}/js/SSL/BizShopping2.js"></script>
<script type="text/javascript" src="${ctx}/js/www/pg_category_v2.js"></script>
<script type="text/javascript" src="${ctx}/js/www/pg_category.js"></script>
<script type="text/javascript">


function jumpPage(pageNo){
	$("#pageNo").val(pageNo);
	$("#mainForm").submit();
}


var wwwSite='http://localhost:8080/myshop',
sslSite='http://localhost:8080/myshop',
shopperSite='http://localhost:8080/myshop',
pageAlias='18',
fromPageAliasKey='FPA'

var resources_Head={
    welcome_Login3:'<strong class="welmsg">{0}好，MyShop欢迎您！</strong>',
    login2:'<span><a href="{0}">登录</a><b>|</b><a href="{1}">注册</a></span>',
    welcome_Login4:'<span class="noBack"><strong>{0}</strong>{1}好,欢迎光临MyShop会员店！</span>',
    logOut2:'<span><a href="{0}">[退出]</a></span>',
    welcome_ThirdLogin2:'<span class="noBack">亲爱的{0}用户&nbsp;<strong>{1}</strong>您好！</span>',
    welcome_ThirdLogin3:'<span class="noBack">亲爱的{0}会员&nbsp;<strong>{1}</strong>您好！</span>',
    nameAliPayJinZhangHu:'支付宝金账户',

	mustInputKeyWords:'您必须输入您要搜索的产品关键字， 谢谢！',
	welcome_Login:'<span class="noBack"><strong>{0}</strong>{1}好,{2}</span>',
	welcome_Login2:'<span class="noBack"><strong>{0}</strong>{1}好,欢迎您来到MyShop购物！</span>',
	welcome_ThirdLogin:'<span class="noBack">亲爱的{0}用户 {1},{2}好！</span>',
	welcome_QQLogin:'<span class="noBack">亲爱的{0} {1},{2}好！</span>',
	welcome_Netease:'<span class="noBack">欢迎{0}用户登录 {1},{2}好！</span>',
	welcome_NotLogin:'<span class="noBack">您好,{0}</span>',
	welcome_NotLogin2:'<span class="noBack">您好,欢迎您来到MyShop购物！</span>',
	logOut:'<span><a href="{0}">退出</a></span>',
	login:'<span><a href="{0}">登录</a></span><span><a href="{1}">免费注册</a></span>',
	noRegister:'<span><a href="{0}">登录</a></span>',
	Morning1:'早上',
	Morning2:'上午',
	Noon:'中午',
	Afternoon:'下午',
	Night:'晚上',
	countOver:'已结束',
	areaCodeJson:''
};
        $(document).ready(function() {
            (function() {
                var arry = [
						$("div.listWrap").find("ul.prolist"), /* list容器下面的产品列表 */
						$("#imgLoadBanner1"),
                    	$("div.history mb15").find("ul").find(".img"),
                     	$("div.topbanner").find("ul").find(".img"),
                     	$("#CategoryID_lazy").find(".sidebox").find("ul.prolist")
					];
                $("div.section3").not("#myShoppingList").find("ul.prolist").each(function() {
                    arry.push($(this));
                });
                $.newegg.imgLoad.loadImg(arry);
                $(window).bind("scroll", function() {
                    $.newegg.imgLoad.load();
                });
            } ());

            MyShop.StoreInit();
        });
    </script>
<gover:contentFooter />