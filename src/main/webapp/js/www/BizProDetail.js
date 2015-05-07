/*先清除所有的选中状态*/
if (Browser.IE) {
	if($(".extendedWarranty").length) {
		$(".extendedWarranty :radio").removeAttr("checked");
	}
	if($(".multiSelA input:checkbox").length) {
		$(".multiSelA input:checkbox").removeAttr("checked");
	}
}
else {
	if($(".extendedWarranty").length) {
		$(".extendedWarranty :radio").attr("checked",false);
	}
	if($(".multiSelA input:checkbox").length) {
		$(".multiSelA input:checkbox").attr("checked",false);
	}
}

/**/
function checkLogin(url){
    if($.newegg.cookie.get("CustomerLogin", "ID") == '')
    {
	    redirectLogin(url);
	    return false;
    }
    else
    {
	    return true;
    }
}
function redirectLogin(returnUrl) {
	window.location.href=$.newegg.buildSSL("login.action")+"?ReturnUrl="+encodeURIComponent(returnUrl);
}
/*打开产品图片页面*/
function ShowPicture2(url){
    window.open(url,'','width=1000,height=800,top=60,left=100,resizable=1,scrollbars=1,status=no,toolbar=no,location=no,menu=no');
}
/*是否符合以旧换新凭证号规则*/
function isLicence(value){
		var validateReg=/^[A-Za-z]{10}[0-9]{10}$/;
		return validateReg.test(value);
}
/*鼠标划过缩略图时，显示产品中图 .thumbnails .moveable update .mover and  currImg update curhover*/
function chgPic() {
	if (Browser.IE) {
		$(".mover a").hover(function(){
			 if(resolution== 1280){
		        $("#midImg").attr("src",$(this).children("img").attr("ref380"));
		    }else{
			    $("#midImg").attr("src",$(this).children("img").attr("ref340"));
			}
			$("#bigImg").attr("href",$(this).children("img").attr("ref2"));
			$(this).parents(".mover").find(".curhover").removeClass("curhover");
			$(this).addClass("curhover");
		});
	}
	else {
		$(".mover a").mouseover(function(){
			 if(resolution== 1280){
		        $("#midImg").attr("src",$(this).children("img").attr("ref380"));
		    }else{
			    $("#midImg").attr("src",$(this).children("img").attr("ref340"));
			}
			$("#bigImg").attr("href",$(this).children("img").attr("ref2"));
			$(this).parents(".mover").find(".curhover").removeClass("curhover");
			$(this).addClass("curhover");
		});
	}	
}

/*如果存在，则打开VIDEO及360VIEW的显示大图功能*/
function Open360Review() {
	if($(".specialView .view360").length) {
		var tmpMidImg;
		if (Browser.IE) {
			$(".specialView .view360").hover(function(){
				tmpMidImg = $("#midImg").attr("src");
				if(resolution == 1280){
				    $("#midImg").attr("src",$(this).attr("ref380"));
				}
				else{
				    $("#midImg").attr("src",$(this).attr("ref340"));
				}
			}, function(){
				$("#midImg").attr("src",tmpMidImg);
			});
		}else {
			$(".specialView .view360").mouseover(function(){
				tmpMidImg = $("#midImg").attr("src");
				if(resolution == 1280){
				    $("#midImg").attr("src",$(this).attr("ref380"));
				}
				else{
				    $("#midImg").attr("src",$(this).attr("ref340"));
				}
			}).mouseout(function(){
				$("#midImg").attr("src",tmpMidImg);
			});
		}
	}
	if($(".specialView .viewVideo").length) {
		var tmpMidImg;
		if (Browser.IE) {
			$(".specialView .viewVideo").hover(function(){
				tmpMidImg = $("#midImg").attr("src");
				if(resolution == 1280){
				    $("#midImg").attr("src",$(this).attr("ref380"));
				}
				else{
				    $("#midImg").attr("src",$(this).attr("ref340"));
				}
			}, function(){
				$("#midImg").attr("src",tmpMidImg);
			});
		}else {
			$(".specialView .viewVideo").mouseover(function(){
				tmpMidImg = $("#midImg").attr("src");
				if(resolution == 1280){
				    $("#midImg").attr("src",$(this).attr("ref380"));
				}
				else{
				    $("#midImg").attr("src",$(this).attr("ref340"));
				}
			}).mouseout(function(){
				$("#midImg").attr("src",tmpMidImg);
			});
		}
	}
}
/*点击缩略图或中图时，打开产品图片页面 thumbnails1 update mover1*/
function openBigImage() {
   // alert("nihao");
   // var currentImage = $("#mover1").find(".curhover");
    var currentImage = $("#mover1").find(".curhover a");
    if(currentImage.length)
    {
        ShowPicture2(currentImage.attr("ref3"));
    }

}
function KeyEnterDown(callback) {
	if (event.keyCode == 13) {
		event.returnValue=false;
		event.cancel = true;
		if(callback){
			callback();
		}
	}
}
var preTimePointForVote=0;
function checkOneMiniteBeforePublishForVote(postTimeLimit){
	var nowTime = new Date();
	var nowMinitePoint=nowTime.getHours()*3600+nowTime.getMinutes()*60+nowTime.getSeconds();
	if(nowMinitePoint-preTimePointForVote<postTimeLimit)
	{
		return false;
	}
		return true;

}
//重置时间
function resetPublishTimePointForVote()
{
	var nowTime = new Date();
	var nowMinitePoint=nowTime.getHours()*3600+nowTime.getMinutes()*60+nowTime.getSeconds();
	preTimePointForVote=nowMinitePoint;	
}
/*限时抢购*/
var detailCountDown={
	interv:{},
	leftTime:0,
	init:function(){
		if($(".scareBuying").length)
		{
			var url=$.newegg.buildWWW("Ajax/Product/AjaxProdDetailCountDown.aspx");
			
			$.getJSON(url,{sysno:resources_ProductDetail.productID},
				function(data){
					if(data == null)
					{
						return;
					}
					
					detailCountDown.leftTime = data.Data;
					if(detailCountDown.leftTime>0)
					{
						$(".scareBuying").show();
						$(".iconScareBuying").show();
						detailCountDown.start();
						detailCountDown.interv = setInterval(detailCountDown.start,1000); 
					}
					else
					{
						$(".iconScareBuying").hide();
						$(".scareBuying").hide();
					}
				});
		}
	},
	start:function(){
		detailCountDown.leftTime-=1;
		if(detailCountDown.leftTime <= 0)
		{
			$(".iconScareBuying").hide();
			$(".scareBuying").hide();
			clearInterval(detailCountDown.interv);
		}
		else
		{
			var nH=Math.floor(detailCountDown.leftTime/(60*60));   
			var nM=Math.floor(detailCountDown.leftTime/(60)) % 60;   
			var nS=Math.floor(detailCountDown.leftTime) % 60;
			
			$("#scareBar").find("b").each(function(i){
				if(i==0)
				{   
					$(this).text(nH);
				}
				else if(i==1)
				{   
					$(this).text(nM);
				}
				else if(i==2)
				{   
					$(this).text(nS);
				}
			});
		}
	}
}
/*24H*/
var AreaDelivery = {
	ShowDelivery:function(obj){
		$("#hour24_2").show();
		$("#hour24_1").hide();
	    $("#city24Name").html($.newegg.format(resources_ProductDetail.city24Name,$(obj).text()));
		$("#delivery24Name").html($(obj).parent().find("div").html());
	},
	ReturnDelivery:function(){
		$("#hour24_1").show();
		$("#hour24_2").hide();
	}
}
/*延保*/
function initWarranty(){
	$(".extendedWarranty :radio").click(function(){
	    $("#clearWrantly").removeClass("disabled");//.addClass("funcLink")
	});
	
	$("#clearWrantly").click(function(){
		if (Browser.IE) {
			$(".extendedWarranty :radio").removeAttr("checked");
			$("#clearWrantly").addClass("disabled");//.removeClass("funcLink").addClass("locked")
		}
		else {
			$(".extendedWarranty :radio").attr("checked",false);
			$("#clearWrantly").addClass("disabled"); //.removeClass("funcLink").addClass("locked")
		}
	});
}

if ($(".slideArea li").length < $(".slideArea .mover").width() / 130) {
    $(".slideArea .mover").width($(".slideArea li").length * 130);
}


//套餐
function initSaleRule(){
    //初始化滑动器
    var tcSlide = UI.Xslider(".slideArea",{
        scrollObj:".mover ul",
        unitLen:130,
        stepOne: true,
        beforeStart:function(e){
            $(".slideArea li").eq(e.goto-1).click();
        }
    });


    /*套餐点击tab*/
    $(".slideArea li").click(function() {
        var me = $(this);
        var index = me.index();

        //slider标题
        me.addClass("current").siblings().removeClass("current");
        //slider规则
        $(".RecmComboContent ul").hide().eq(index).show();
        //slider主商品数量
        setsaleRuleMaster(index);
        //slider价格
        $(".countArea").hide().eq(index).show();
        initRecmCombo(index);
        
        tcSlide.go(index + 1);
    });
    
    setsaleRuleMaster(0);
}
function setsaleRuleMaster(index)
{
    var recmCombo = $(".RecmComboItem").eq(index);
    if (recmCombo.length == 1) {
        var title = $.newegg.format(resources_ProductDetail.saleRuleMainItemTiltle, recmCombo.attr("qty"));
        $("#saleRuleMasterItemQty").replaceWith(title);
    }
}
function initRecmCombo(index){
        index++;
		var arry=[];
		if($("#RecmCombo_" + index).length){
		    arry.push("RecmCombo_" + index);
		}
		$.newegg.imgLoad.loadImg(arry);
		$(window).bind("scroll",function(){                                      
			  $.newegg.imgLoad.load();
		});
}


//function changeSaleRuleTotal(obj){
//	var tab = $(obj).parents(".tabs").children("*"); 
//	var tabNum = tab.length; 
//	var index = $(obj).attr("rel");

//	for (var i = 1; i <= tabNum; i++) {
//		$("#RecmComboTotal_"+i).hide();
//	}
//	
//	$("#RecmComboTotal_"+index).show();

//    var title = $.newegg.format(resources_ProductDetail.saleRuleMainItemTiltle,$("#RecmCombo_"+index).attr("qty"));
//       $("#saleRuleMasterItemQty").replaceWith(title);
//}
//function comboViewMore(obj)
//{
//	var total = $(obj).attr("total");
//    var j = parseInt(total,10) + 1;
//    var hasLoad = $(obj).attr("hasLoad");
//    var isOpen = $(obj).attr("isOpen");
//    if(isOpen == "on")
//    {
//        var currentIndex = 1;
//        $(obj).parents(".tabs").find("a").each(function(i){
//                var rel = parseInt($(this).attr("rel"),10);
//                var prop = $(this).attr("prop");
//                var current = $(this).parent().attr("class");

//                if (current == "current")
//                {
//                    currentIndex = rel;
//                }
//                
//                if(rel >= j && prop != "viewMore")
//                {
//                    $(this).parent().hide();
//                }

//                $(this).removeClass("current");
//			});
//			
//	
//		if(currentIndex >= j)
//		{
//		    var cuurentObj = $(obj).parents(".tabs").find("li").eq(0).find("a");
//		    comboMoreTabClick(cuurentObj);
//		}
//		
//		$(obj).attr("isOpen","off");
//		$(obj).text(resources_ProductDetail.moreCombo);
//    }
//    else
//    {
//        if(hasLoad == "true")
//        {
//            $(obj).parents(".tabs").find("a").each(function(i){
//                    var rel = parseInt($(this).attr("rel"),10);
//                    if(rel >= j)
//                    {
//                        $(this).parent().show();
//                    }
//			    });
//		    $(obj).attr("isOpen","on");
//		    $(obj).text(resources_ProductDetail.moreComboHide);
//        }
//        else
//        {
//	        $(obj).text(resources_ProductDetail.moreComboDelay);
//        	
//	         $.get($.newegg.buildWWW("Ajax/Product/AjaxProMoreCombo.aspx"), { productno: resources_ProductDetail.productID },
//                  function(data){
//                    var comboMoreTab = $(data).find("#comboMoreTab");
//                    var comboMoreContent = $(data).find("#comboMoreContent");
//                    var comboMoreTotal = $(data).find("#comboMoreTotal");
//                    if(!comboMoreTab.length || !comboMoreContent.length || !comboMoreTotal.length)
//                    {
//                        $(obj).text(resources_ProductDetail.moreCombo);
//                        return;
//                    }
//                    
//                    comboMoreTab.find("a").each(function(i){
//                        $(this).attr("rel",j+i);
//                        var tabTitle = $.newegg.format($(this).text(),j+i);
//                        $(this).text(tabTitle);
//			        });
//        			
//			        comboMoreContent.find("ul").each(function(i){
//                        $(this).attr("id","RecmCombo_"+(j+i));
//			        });
//        			
//			        comboMoreTotal.find("div").each(function(i){
//                        $(this).attr("id","RecmComboTotal_"+(j+i));
//			        });
//                    
//                    $("#viewMoreCombo").before(comboMoreTab.html());
//                    $("#RecmComboContent").append(comboMoreContent.html());
//                    $("#RecmComboTotalFlag").before(comboMoreTotal.html());
//                    $(obj).text(resources_ProductDetail.moreComboHide);
//                    $(obj).attr("hasLoad","true");
//                    $(obj).attr("isOpen","on");
//                  },
//                  'html'
//              );
//          }
//      }
//}
//function comboMoreTabClick(obj)
//{
//    var tab = $(obj).parents(".tabs").children("*"); 
//    var tabNum = tab.length; //获取TAB个数
//    tab.removeClass("currentBtn");
//    if ($(obj).parents(".tabs").children("a").length > 0)
//	    $(obj).addClass("currentBtn");
//    else
//	    $(obj).parent().addClass("currentBtn");
//    for (var i = 1; i <= tabNum; i++) {
//	    $("#RecmCombo" + "_" + i).hide(); //先将所有tabContent隐藏
//    }
//    $("#RecmCombo" + "_" +  $(obj).attr("rel")).show(); //将所点击链接所对应的tabContent显示
//    
//    for (var i = 1; i <= tabNum; i++) {
//		$("#RecmComboTotal_"+i).hide();
//	}
//	
//	$("#RecmComboTotal_"+ $(obj).attr("rel")).show();
//	
//    var title = $.newegg.format(resources_ProductDetail.saleRuleMainItemTiltle,$("#RecmCombo_"+ $(obj).attr("rel")).attr("qty"));
//   $("#saleRuleMasterItemQty").replaceWith(title);

//}
/*天极网*/
function evaluatingGoTo(likeUrl,pageIndex,sysNo){
	 $.ajax({
        type: "GET",
        dataType: "html",
        url: likeUrl + "?page=" + pageIndex + "&sysno=" + sysNo,
        timeout: 30000,
        cache:false,
        success: function(data, textStatus) {
            $("#evalContent").empty().append(data);
        }
    });
}
/*ajax分页*/
function PageByAjaxGoTo(obj,url,pageIndex,sysNo){
 $.ajax({
    type: "Get",
    dataType: "html",
    url:url,
    data: "page=" + pageIndex + "&sysno=" + sysNo,
    timeout: 30000,
    cache:false,
    success: function(data, textStatus) {
        $(obj).empty().append(data);
    }
});
}
/*加载浏览记录*/
function initBrowseHistory(){
	var productID = resources_ProductDetail.productID.toString();
	var productSysNoList = $.newegg.cookie.get('BrowsedProductSysNoList').replace(/\s/g,"+");
	if(productSysNoList == "")
	{
		$.newegg.cookie.set('BrowsedProductSysNoList',productID,{topdomain:true,expires:9999});
	}
	else
	{
		var tempSysnoList = "+" + productSysNoList + "+";
		var index = tempSysnoList.indexOf("+" + productID + "+");
		var resultSysNoList = "";
		if(index < 0)
		{
			var productArray = productSysNoList.split("+");
			if(productArray.length<8)
			{
				$.newegg.cookie.set('BrowsedProductSysNoList', productID + "+" + productSysNoList,{topdomain:true,expires:9999});
			}
			else
			{
				resultSysNoList = productID + "+";
				for(i=0;i<7;i++)
				{
					resultSysNoList += productArray[i]+ "+";
				}
				resultSysNoList = resultSysNoList.substr(0,resultSysNoList.length-1);
				$.newegg.cookie.set('BrowsedProductSysNoList', resultSysNoList,{topdomain:true,expires:9999});
			}
		}
		else
		{
			productSysNoList = tempSysnoList.replace("+" + productID + "+", "+");
			resultSysNoList = productSysNoList.substr(1,productSysNoList.length-2);
			$.newegg.cookie.set('BrowsedProductSysNoList', productID + "+" + resultSysNoList,{topdomain:true,expires:9999});
		}
	}
	
	$.get($.newegg.buildWWW("Ajax/Product/AjaxProBrowseH.aspx?resolution=" + resolution), null, function(result) {
			    var viewHistory = $("#viewHistory");
			    viewHistory.html(result);
			    openWinMode.setAsycBlank("viewHistory");
			    
			    if ($.trim(viewHistory.html()).length > 0) 
			    {
			        viewHistory.show();
			        $.newegg.imgLoad.loadImg([viewHistory]);
			    }
			    else {
			        viewHistory.hide();
			    }
              }, 
              "html");  
}
/*删除浏览记录*/
function clearHistory()
{
	$.newegg.cookie.clear('BrowsedProductSysNoList',{topdomain:true});
	$("#viewHistory").empty();
//	$("#viewHistory").find(".ctnerBody").empty();
//	$("#viewHistory").find(".moreOper").empty();
}
/*加入常购清单*/
var showPopPlane = function(pwin, po) {
    pwin.show();
}
var alwaysBuyProduct = {
    add: function(obj) {
        if (mini.enable) {
            mini.returnUrl = window.location.href;
            if (mini.checkLogin(obj, 3600) === true) {
                often_AlwaysList.add(obj);
            }
        } else {
            often_AlwaysList.add(obj);
        }
    }
};

var productDetailAdd=0;
/*加入购物车*/
var buyProduct = {
    inputQty: 1,
    hasMaxPerOrder: false,
    maxPerOrder: 0,
    minPerOrder: 1,
    init: function() {
        if ($("#maxPerOrder").length) {
            buyProduct.hasMaxPerOrder = true;
            buyProduct.maxPerOrder = $("#maxPerOrder").attr("ref1");
        }
        if ($("#minPerOrder").length) {
            buyProduct.minPerOrder = $("#minPerOrder").attr("ref1");

            var qty = $.trim($('#buyQty').val());
            qty = parseInt(qty, 10);
            if (isNaN(qty) == false) {
                buyProduct.inputQty = qty;
            }
        }
        var minus = $(".buyInfo .minus:not('.locked')");
        if (minus.length) {
            minus.click(function() {
                buyProduct.changeQty(0, resources_ProductDetail.bufferQty);
            });
        }
        var plus = $(".buyInfo .plus:not('.locked')");
        if (plus.length) {
            plus.click(function() {
                buyProduct.changeQty(1, resources_ProductDetail.bufferQty);
            });
        }
        var bottomplus = $(".buyInfo #bottom_plus");
        if (bottomplus.length) {
            bottomplus.click(function() {
                buyProduct.bottomChangeQty(1, resources_ProductDetail.bufferQty);
            });
        }

        var bottominus = $(".buyInfo #bottom_minus");
        if (bottominus.length) {
            bottominus.click(function() {
                buyProduct.bottomChangeQty(0, resources_ProductDetail.bufferQty);
            });
        }


    },
    bottomChangeQty: function(type, bufferQty) {
        // type: 
        // 0: minus
        // 1: plus
        var qty = $.trim($('#BottomBuyQty').val());
        qty = parseInt(qty, 10);

        if (type == 0) {
            qty -= bufferQty;
        } else {
            qty += bufferQty;
        }

        if (qty < 1) {
            qty = 1;
        }

        var error = buyProduct.check(qty);


        $("#BottomBuyQty").val(qty);

        if (error == '') {
            buyProduct.onblurCheck();
        }
        else {
            $("#BottomBuyQty").val(buyProduct.inputQty);
        }
    },


    changeQty: function(type, bufferQty) {
        // type: 
        // 0: minus
        // 1: plus
        var qty = $.trim($('#buyQty').val());
        qty = parseInt(qty, 10);

        if (type == 0) {
            qty -= bufferQty;
        } else {
            qty += bufferQty;
        }

        if (qty < 1) {
            qty = 1;
        }

        var error = buyProduct.check(qty);


        $("#buyQty").val(qty);
        // $("#BottomBuyQty").val(qty);

        if (error == '') {
            buyProduct.onblurCheck();
        }
        else {
            $("#buyQty").val(buyProduct.inputQty);
            // $("#BottomBuyQty").val(buyProduct.inputQty);
        }
    },
    addToCart: function(objE) {
        //Ga
        try { _gaq.push(['_trackEvent', 'Click', 'addtocart']); } catch (ex) { }

        //omniture addCart
        //omnitureAddCartOrBuy(resources_ProductDetail.productID, objE);
        omnitureAddCartOrBuyName(resources_ProductDetail.productID, objE, resources_ProductDetail.omnitrueCategoryAndProductName);
        var qty = $.trim($('#buyQty').val());
        var error = buyProduct.check(qty);

        if (error != '') {
            $(".outOfQty").text(error);
            $(".outOfQty").show();
            $("#buyQty").val(buyProduct.inputQty);
            return;
        }

        var wID = '';
        if ($(".extendedWarranty").length) {
            var selected = $("input[type=radio][name=wrantly]:checked");
            if (selected.length) {
                wID = selected.attr("ref1");
            }
        }

        var params = { action: 'Add',
            productno: resources_ProductDetail.productID,
            quantity: qty,
            warrantyID: wID
        };

        var url = $.newegg.buildWWW("Shopping/ShoppingCart.aspx") + "?" + $.param(params);

        if (resources_ProductDetail.coreMetricsShoppingCartKey.length > 0) {
            var fromPageAlias = $.newegg.querystring.get(fromPageAliasKey);
            if (typeof (fromPageAlias) == "undefined" || fromPageAlias.length == 0) {
                fromPageAlias = pageAlias;
            }

            var coreMetricsShoppingCart = $.newegg.querystring.get(resources_ProductDetail.coreMetricsShoppingCartKey);
            if (typeof (coreMetricsShoppingCart) == "undefined" || coreMetricsShoppingCart.length == 0) {
                coreMetricsShoppingCart = resources_ProductDetail.coreMetricsShoppingCartDefault;
            }

            var propParms = buyProduct.getPropertiesParms();

            url += "&" + fromPageAliasKey + "=" + fromPageAlias +
                 "&" + resources_ProductDetail.coreMetricsShoppingCartKey + "=" + coreMetricsShoppingCart +
                 "&" + propParms;
        }

        window.location.href = url;
        return false;
    },

    //底部加入购物车
    bottomAddToCart: function(objE) {
        //Ga


        try { _gaq.push(['_trackEvent', 'Click', 'addtocart']); } catch (ex) { }

        //omniture addCart
        //omnitureAddCartOrBuy(resources_ProductDetail.productID, objE);
        omnitureAddCartOrBuyName(resources_ProductDetail.productID, objE, resources_ProductDetail.omnitrueCategoryAndProductName);
        var qty = $.trim($('#BottomBuyQty').val());
        var error = buyProduct.check(qty);

        if (error != '') {
            //  $(".outOfQty").text(error);
            // $(".outOfQty").show();
            $("#BottomBuyQty").val(buyProduct.inputQty);
            return;
        }

        var wID = '';
        if ($(".extendedWarranty").length) {
            var selected = $("input[type=radio][name=wrantly]:checked");
            if (selected.length) {
                wID = selected.attr("ref1");
            }
        }

        var params = { action: 'Add',
            productno: resources_ProductDetail.productID,
            quantity: qty,
            warrantyID: wID
        };

        var url = $.newegg.buildWWW("Shopping/ShoppingCart.aspx") + "?" + $.param(params);

        if (resources_ProductDetail.coreMetricsShoppingCartKey.length > 0) {
            var fromPageAlias = $.newegg.querystring.get(fromPageAliasKey);
            if (typeof (fromPageAlias) == "undefined" || fromPageAlias.length == 0) {
                fromPageAlias = pageAlias;
            }

            var coreMetricsShoppingCart = $.newegg.querystring.get(resources_ProductDetail.coreMetricsShoppingCartKey);
            if (typeof (coreMetricsShoppingCart) == "undefined" || coreMetricsShoppingCart.length == 0) {
                coreMetricsShoppingCart = resources_ProductDetail.coreMetricsShoppingCartDefault;
            }

            var propParms = buyProduct.getPropertiesParms();

            url += "&" + fromPageAliasKey + "=" + fromPageAlias +
                 "&" + resources_ProductDetail.coreMetricsShoppingCartKey + "=" + coreMetricsShoppingCart +
                 "&" + propParms;
        }

        $.ajax({
            async: false,
            type: "POST",
            dataType: "html",
            url: url,
            cache: false,
            success: function(msg) {
                Sam.Purchase.doingAjax = true;
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    data: { productid: resources_ProductDetail.productID, quantity: 0 },
                    url: $.newegg.buildWWW('Ajax/Shopping/AddCart.aspx'),
                    timeout: 30000,
                    cache: false,
                    success: function(data, textStatus) {
                        if (data.Description == 'YES') {
                            Sam.Purchase.NoloadMiniCart();
                        }
                    },
                    complete: function() {
                        Sam.Purchase.exeLazyAjax();
                        Sam.Purchase.doingAjax = false;

                    }
                });

            }
        });
    },




    addToCartNoHref: function(objE) {
        //Ga
        try { _gaq.push(['_trackEvent', 'Click', 'addtocart']); } catch (ex) { }

        //omniture addCart
        //omnitureAddCartOrBuy(resources_ProductDetail.productID, objE);[20140321 omnitrue 修改]
        omnitureAddCartOrBuyName(resources_ProductDetail.productID, objE, resources_ProductDetail.omnitrueCategoryAndProductName);

        var qty = $.trim($('#buyQty').val());
        var error = buyProduct.check(qty);

        if (error != '') {
            $(".outOfQty").text(error);
            $(".outOfQty").show();
            $("#buyQty").val(buyProduct.inputQty);
            return;
        }

        var wID = '';
        if ($(".extendedWarranty").length) {
            var selected = $("input[type=radio][name=wrantly]:checked");
            if (selected.length) {
                wID = selected.attr("ref1");
            }
        }

        var params = { action: 'Add',
            productno: resources_ProductDetail.productID,
            quantity: qty,
            warrantyID: wID
        };

        var url = $.newegg.buildWWW("Shopping/ShoppingCart.aspx") + "?" + $.param(params);

        if (resources_ProductDetail.coreMetricsShoppingCartKey.length > 0) {
            var fromPageAlias = $.newegg.querystring.get(fromPageAliasKey);
            if (typeof (fromPageAlias) == "undefined" || fromPageAlias.length == 0) {
                fromPageAlias = pageAlias;
            }

            var coreMetricsShoppingCart = $.newegg.querystring.get(resources_ProductDetail.coreMetricsShoppingCartKey);
            if (typeof (coreMetricsShoppingCart) == "undefined" || coreMetricsShoppingCart.length == 0) {
                coreMetricsShoppingCart = resources_ProductDetail.coreMetricsShoppingCartDefault;
            }

            var propParms = buyProduct.getPropertiesParms();

            url += "&" + fromPageAliasKey + "=" + fromPageAlias +
                 "&" + resources_ProductDetail.coreMetricsShoppingCartKey + "=" + coreMetricsShoppingCart +
                 "&" + propParms;
        }

        $.ajax({
            async: false,
            type: "POST",
            dataType: "html",
            url: url,
            cache: false,
            success: function(msg) {
                Sam.Purchase.doingAjax = true;
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    data: { productid: resources_ProductDetail.productID, quantity: 0 },
                    url: $.newegg.buildWWW('Ajax/Shopping/AddCart.aspx'),
                    timeout: 30000,
                    cache: false,
                    success: function(data, textStatus) {
                        if (data.Description == 'YES') {
                            Sam.Purchase.NoloadMiniCart();
                        }
                    },
                    complete: function() {
                        Sam.Purchase.exeLazyAjax();
                        Sam.Purchase.doingAjax = false;

                    }
                });

            }
        });
    },


    check: function(qty) {
        var buyQty = parseInt(qty, 10);
        var regexNumber = /^[0-9]*[1-9][0-9]*$/;
        if (regexNumber.test(qty) == false || isNaN(buyQty) == true || buyQty <= 0) {
            return $.newegg.format(resources_ProductDetail.invalidInput);
        }


        var overInventory = false;
        var overMaxPerOrder = false;
        var overMinPerOrder = false;

        if (buyQty > resources_ProductDetail.qty) {
            overInventory = true;
        }

        if (buyProduct.hasMaxPerOrder == true && buyQty > buyProduct.maxPerOrder) {
            overMaxPerOrder = true;
        }

        if (buyProduct.minPerOrder > 1 && buyQty < buyProduct.minPerOrder) {
            overMinPerOrder = true;
        }


        //简化逻辑
        //1. Check可用库存
        //2. Check起购
        //3. Check限购
        if (overInventory == true) {
            return $.newegg.format(resources_ProductDetail.inventoryWarnning, resources_ProductDetail.qty - buyProduct.inputQty);
        }
        else {
            if (resources_ProductDetail.qty >= buyProduct.minPerOrder && overMinPerOrder == true) {
                return $.newegg.format(resources_ProductDetail.minPerOrderWarnning, buyProduct.minPerOrder);
            }
            else if (resources_ProductDetail.qty >= buyProduct.maxPerOrder && overMaxPerOrder == true) {
                return $.newegg.format(resources_ProductDetail.maxPerOrderWarnning, buyProduct.maxPerOrder - buyProduct.inputQty);
            }
        }

        //        if (overMinPerOrder == true && overInventory == true) {
        //            if (resources_ProductDetail.qty < buyProduct.minPerOrder) {
        //                if (overInventory == true) {
        //                    return $.newegg.format(resources_ProductDetail.inventoryWarnning, resources_ProductDetail.qty - buyProduct.inputQty);
        //                }
        //            } else {
        //                return $.newegg.format(resources_ProductDetail.minPerOrderWarnning, buyProduct.minPerOrder);
        //            }
        //        }
        //        else if (overInventory == true && overMaxPerOrder == true) {
        //            if (resources_ProductDetail.qty < buyProduct.maxPerOrder) {
        //                return $.newegg.format(resources_ProductDetail.inventoryWarnning, resources_ProductDetail.qty - buyProduct.inputQty);
        //            }
        //            else {
        //                return $.newegg.format(resources_ProductDetail.maxPerOrderWarnning, buyProduct.maxPerOrder - buyProduct.inputQty);
        //            }
        //        }
        //        else if (overInventory == true) {
        //            return $.newegg.format(resources_ProductDetail.inventoryWarnning, resources_ProductDetail.qty - buyProduct.inputQty);
        //        }
        //        else if (overMaxPerOrder == true) {
        //            return $.newegg.format(resources_ProductDetail.maxPerOrderWarnning, buyProduct.maxPerOrder - buyProduct.inputQty);
        //        }

        return '';
    },
    onblurCheck: function() {
        var qty = $.trim($('#buyQty').val());
        var error = buyProduct.check(qty);
        if (error == '') {
            $(".outOfQty").fadeOut(250);
            buyProduct.inputQty = parseInt(qty, 10);
        }
        if ($("#wholeSaleList").length) {
            var wholePrice = '';
            $("#wholeSaleList tr").each(function() {
                if (qty >= parseInt($(this).find("td").eq(0).attr("qty"), 10)) {
                    wholePrice = $(this).find("td").eq(1).text();
                }
            });

            if (wholePrice != '') {
                wholePrice = wholePrice.substring(1, wholePrice.length);
                $("#wholeSalePrompt").text($.newegg.format(resources_ProductDetail.promptWholeSale2, wholePrice));
                $("#wholeSalePromptLabel").show();
            }
            else {
                $("#wholeSalePromptLabel").fadeOut(250);
            }
        }
    },
    //获取个性属性参数
    getPropertiesParms: function() {
        var props = buyProduct.getSelectedPersonalProperties();

        if (props.length == 0) { return ""; }

        var propParms = resources_ProductDetail.personalPropertySysNo + "=";
        var propValueParms = resources_ProductDetail.personalPropertyValueSysNo + "=";
        var propSplit = "";
        for (var i = 0, l = props.length; i < l; i++) {
            if (i > 0) { propSplit = ","; }

            var prop = props[i];
            propParms += propSplit + prop.propID
            propValueParms += propSplit + prop.valueID
        }

        return propParms + "&" + propValueParms;
    },
    //选择个性属性
    selectPersonalProperty: function(selectedProp) {
        var jSelectedProp = $(selectedProp);

        //Ga
        var proName = jSelectedProp.closest('.cls').find('dt').attr('title');
        var valName = jSelectedProp.text();
        try { _gaq.push(['_trackEvent', 'Click', 'chooseproperty', "" + proName + ":" + valName + ""]); } catch (ex) { }

        //选中或取消修改属性
        var currentClassName = "cur"
        //jSelectedProp.toggleClass(currentClassName);
        jSelectedProp.addClass(currentClassName);
        jSelectedProp.parents(".selectedInfo").find("a").not(jSelectedProp).removeClass(currentClassName);


        //更新“已选择”显示
        //1.取出当前显示的分组属性Span-->存储propArr
        //2.获取当前选择个性属性-->添加到propArr
        //3.重新渲染属性HTML
        var selectedInfo = $("#selectedPropText dd");
        //1.取出当前显示的分组属性Span-->存储propArr
        var propArr = selectedInfo.find("span:not(.propex)");

        //2.获取当前选择个性属性-->添加到propArr
        var selectedPropexs = buyProduct.getSelectedPersonalProperties();
        if (selectedPropexs.length > 0) {
            for (var i = 0, l = selectedPropexs.length; i < l; i++) {
                propArr.push($("<span class='propex'>" + selectedPropexs[i].valueName + "</span>")[0]);
            }
        }
        //3.重新渲染属性HTML
        var propsHtml = "";
        for (var i = 0, l = propArr.length; i < l; i++) {
            if (i > 0) { propsHtml += "<b>|</b>" }

            propsHtml += $(propArr[i]).wrap("<div></div>").parent().html();
        }
        selectedInfo.html(propsHtml);
    },
    //获取选择的个性属性对象数组
    getSelectedPersonalProperties: function() {
        var props = new Array();

        $(".proInfo .personal").each(function() {
            var $this = $(this);
            var selectedValue = $this.find("a.cur:first");
            if (selectedValue.length > 0) {
                var prop = {
                    "propID": $this.attr("id"),
                    "propName": $this.find("label").attr("title"),
                    "valueID": selectedValue.attr("ref2"),
                    "valueName": $.trim(selectedValue.text())
                };
                props.push(prop);
            }

        });

        return props;
    }
}
/*以旧换新*/
var tradeIn={
	init:function(){
		var tradeInCode = $.newegg.cookie.get('TradedIn', 'TradeInCode');
		if(tradeInCode != '')
		{
			$("#tradeInCode").val(tradeInCode);
		}
	},
	valid:function(value){
		$("#pop1 .centerPopBody .errorTip").hide();
		if(value == '')
		{
			$("#tradeInEmptyPrompt").show();
			return false;
		}
		else if($("#confirmTradeInTerm:checked").val()!="on")
		{
			$("#tradeInReadError").show();
			return false;
		}
		else if(isLicence(value) == false)
		{
			$("#tradeInErrorPrompt").show();
			return false;							
		}
		return true;
    },
    // 以旧换新处理函数
	checkOut:function(checkOutTimer){
	    var tradeInCode = $.trim($("#tradeInCode").val());

		if(!tradeIn.valid(tradeInCode))
		{
			return;
		}
		
		var jsonObject = {Product:resources_ProductDetail.productID,
				UrlReferer:window.location.href,
				TradeInCode:tradeInCode
			}
		
		$.newegg.cookie.set("TradedIn",jsonObject,{topdomain:true});
		var url = $.newegg.buildCurrent('shopping/CheckOut.aspx')+"?buytype=1";
		if($.newegg.cookie.get("LoginValidate", 'Type').length>0||($.newegg.cookie.get("ThirdPartyLogin", "LogonType").length>0&&$.newegg.cookie.get("ThirdPartyLogin", "LogonType")!="None")||openCheckOutForceLogin=="False") 
        {
           window.location = url;
        }
        else
        {
            // modify by bill.s.li
            // modify date 2011-6-17
            // 新蛋账户，检查是否是一小时以内登录，如果不是跳转到登陆页面强制登录
            // 如果大于1小时强制登录
            if(CheckLoginTime(checkOutTimer))
            {
                window.location = url;
            }else
            {
                window.location =$.newegg.buildSSL("Shopping/Login.aspx")+"?ReturnUrl="+encodeURIComponent(url);
            }
        }
	}	 
}
/*初始化快速导航栏*/
function initQuickLink(){
	$("#quickLinks").find("a").each(function(){
		var href = $(this).attr("href");
		if(!$(href).length)
		{
			$(this).parent().hide();
		}
	});
}

/*产品推荐--------------------------- START */
/*通用的左右滚动函数*/
function relatedProductScrollV(o,num,step) { /*参数：包围对象id，每屏显示数量，每次滚动数量*/
	var obj = $("#" + o);
	var cell = $("#" + o + " .moveable li");
	var total = cell.length;
	var count = obj.attr("count");
	if(count){
	    total = count;
	}
	
	var btnPre = $("#" + o + " .pre");
	var btnNext = $("#" + o + " .next");
	var moveLimit = Math.ceil((total - num)/step);
	var moveLeftNum = moveLimit;
	var moveRightNum = 0;
	var currLeft = 0;
	if(total > num) {
		btnPre.addClass("preDisable");
		btnPre.attr("disabled", true);
	    
		btnNext.click(function(){	
		    if(btnNext.attr("disabled") == "true"){
		        return false;
		    }	    
		    var cmd = $(this).attr("command");
            if(cmd){
                var state = eval(cmd + "(btnNext);");
                if(!state){
                    return false;
                }
            }
		    cell = $("#" + o + " .moveable li");
			var moveWidth = (parseInt(cell.width()) + parseInt(cell.css("margin-right")) + parseInt(cell.css("margin-left")) + parseInt(cell.css("padding-right")) + parseInt(cell.css("padding-left")) + parseInt(cell.css("border-right-width")) + parseInt(cell.css("border-left-width")))*step;
			if(moveRightNum < moveLimit) {
				$(this).parents("#" + o).find(".moveable").animate({left: (currLeft + 0 - moveWidth) + "px"},200);
				moveRightNum = moveRightNum + 1;
				moveLeftNum = moveLeftNum - 1;
				currLeft = currLeft + 0 - moveWidth;
				if(moveRightNum == moveLimit) {
					btnNext.addClass("nextDisable");
					btnNext.attr("disabled", true);
				}
			}
			if(moveLeftNum < moveLimit) {
				btnPre.removeClass("preDisable");
				btnPre.attr("disabled", false);
			}
		});
		btnPre.click(function(){
		    if(btnPre.attr("disabled") == "true"){
		        return false;
		    }
		    var cmd = $(this).attr("command");
            if(cmd){
                var state = eval(cmd + "(btnPre);");
                if(!state){
                    return false;
                }
            }
            cell = $("#" + o + " .moveable li");
			var moveWidth = (parseInt(cell.width()) + parseInt(cell.css("margin-right")) + parseInt(cell.css("margin-left")) + parseInt(cell.css("padding-right")) + parseInt(cell.css("padding-left")) + parseInt(cell.css("border-right-width")) + parseInt(cell.css("border-left-width")))*step;
			if(moveLeftNum < moveLimit) {
				$(this).parents("#" + o).find(".moveable").animate({left: (currLeft + 0 + moveWidth) + "px"},200);
				moveLeftNum = moveLeftNum + 1;
				moveRightNum = moveRightNum - 1;
				currLeft = currLeft + 0 + moveWidth;
				if(moveLeftNum == moveLimit) {
					btnPre.addClass("preDisable");
					btnPre.attr("disabled", true);
				}
			}
			if(moveRightNum < moveLimit) {
				btnNext.removeClass("nextDisable");
				btnNext.attr("disabled", false);
			}
		});
	}
	else {
	    btnPre.attr("disabled", true);
	    btnNext.attr("disabled", true);
		btnPre.addClass("preDisable");
		btnNext.addClass("nextDisable");
	}
}
Array.prototype.remove = function(index) {
    
    for(var i=0,n=0;i<this.length;i++) 
    { 
        if(this[i]!=this[index]) 
        { 
            this[n++]=this[i];
        } 
    } 
    this.length -= 1;
};

var productRecommand = {
    selectCount : 0,
    selectedItemList : new Array(),
    add : function(id, price){
        var add = this.has(id);
        if(!add){
            this.selectedItemList.push({"id":id, "price":price});
        }
        return add;
    },
    has:function(id){
        var add = false;
        
        for(var i=0;i<this.selectedItemList.length;i++){
            if(this.selectedItemList[i].id == id){
                add = true;
                break;
            }
        }
        
        return add;
    },
    remove:function(id){
        var index = -1;
        for(var i=0;i<this.selectedItemList.length;i++){
            if(this.selectedItemList[i].id == id){
                index = i;
                break;
            }
        }
        
        if(index != -1){
            this.selectedItemList.remove(index);
        }
    },
    checkAll:function(value){
        $("input:checkbox").each(function(i){
            var selected = $(this);
            
            if(selected.attr("name") == "selectrecommendproduct"){
                if(value && selected.attr("value") == value){
                    this.checked = true;
                    selected.parents("li").addClass("selected");
                }
                else{
                    var id = selected.attr("value");
                    if(productRecommand.has(id)){
                        if(!this.checked){
                            this.checked = true;
                            selected.parents("li").addClass("selected");
                        }
                    }
                }
            }
        });
    },
    cancleAll:function(value){
         $("input:checkbox").each(function(i){
            var selected = $(this);
            if(selected.attr("name") == "selectrecommendproduct" && selected.attr("value") == value){
                this.checked = false;
                selected.parents("li").removeClass("selected");
            }
        });
    },
    clear:function(){
        for(var i=0;i<this.selectedItemList.length;i++){
            var sysno = this.selectedItemList[i].id;
            $("#selectedHistoryHiddenItem_"+sysno).remove();
            productRecommand.cancleAll(sysno);
        }
    
        this.selectCount=0;
        $("#selectedRecommendProductCount").text(productRecommand.selectCount);
                    
        this.selectedItemList = new Array();
        this.setPrice();
        return false;
    },
    setItem : function(sysno, targetId, id){
        // 存在已添加
        if(productRecommand.has(sysno)){
            return false;
        }
        
        var pointType = 0;
        var displayPrice = 0;
        var pointprice = 0;
        
        var title = $("#"+id+"_title").text();
        var price = $("#"+id+"_price").val();
        
        if($("#"+id+"_pointprice").length > 0){
            pointType = 1;
            pointprice = $("#"+id+"_pointprice").val();
        }else{
            displayPrice = $("#"+id+"_displayPrice").text()
        }
    
        // 克隆节点
        var selectedHistoryHiddenItem = $("#selectedHistoryHiddenItem").clone();
        
        selectedHistoryHiddenItem.css("display", "");
        selectedHistoryHiddenItem.attr("id", targetId);
        var selectedRecommendProductTitle = selectedHistoryHiddenItem.find("p[id='selectedRecommendProductTitle']");
        selectedRecommendProductTitle.text(title);
        var selectedRecommendProductPrice = selectedHistoryHiddenItem.find("span[id='selectedRecommendProductPrice']");
        if(pointType){
            selectedRecommendProductPrice.text($.newegg.format(productRecommandResource.pointPriceFormat, parseFloat(pointprice).toFixed(0)));
        }
        else{
            selectedRecommendProductPrice.text(displayPrice);
        }
        var selectedRecommendProductDelete = selectedHistoryHiddenItem.find("a[id='selectedRecommendProductDelete']");
        selectedRecommendProductDelete.click(function(){
            $("#"+ targetId+"").remove();
            // 同时删除其他
            productRecommand.remove(sysno);
            productRecommand.cancleAll(sysno);
            productRecommand.selectCount--;
            productRecommand.setPrice();
            $("#selectedRecommendProductCount").text(productRecommand.selectCount);
            return false;
        });
     
        productRecommand.selectCount++;
        productRecommand.checkAll(sysno);
        productRecommand.add(sysno, price);
        productRecommand.setPrice();
        
        $("#selectedRecommendProductCount").text(productRecommand.selectCount);
        // 添加节点   
        $("#historyListItems").append(selectedHistoryHiddenItem);
    },
    multiSelA : function(o) {
	    var btnSel = $("." + o + " .sel input:checkbox");
	    var find = false;
	    // init
	    btnSel.each(function(i){
	        var checkbox = $(this);
	        var chekedStatus = checkbox.attr("checked");
	        // id 获取对应节点值
            var id = checkbox.attr("id");
            // 获取值
            var sysno = checkbox.attr("value");
            var targetId = "selectedHistoryHiddenItem_" + sysno;
	            
	        if(chekedStatus) {
	            find = true;
	            productRecommand.setItem(sysno, targetId, id);
	        }
	    });
	    
	    if(!find){
	        productRecommand.setPrice();
	    }
	    
	    productRecommand.bindClick(btnSel);
    },
    bindClick : function(btnSel){
        btnSel.unbind("click");
        btnSel.click(function(){
	        var checkbox = $(this);//.children("input:checkbox");
	        // id 获取对应节点值
	        var id = checkbox.attr("id");
	        // 获取值
	        var sysno = checkbox.attr("value");
	        
	        var targetId = "selectedHistoryHiddenItem_" + sysno;
    		
	        var chekedStatus = checkbox.attr("checked");
	        if(chekedStatus) {
	            productRecommand.setItem(sysno, targetId, id);
	        }
	        else{
	            productRecommand.selectCount--;
	            productRecommand.cancleAll(sysno);
	            productRecommand.remove(sysno);
	            productRecommand.setPrice();
	            
	            $("#selectedRecommendProductCount").text(productRecommand.selectCount);
	            // 删除
	            $("#"+targetId).remove();
	        }
    		
	        if(chekedStatus) {
		        $(this).parents("li").addClass("selected");
	        }
	        else {
		        $(this).parents("li").removeClass("selected");
	        }
	    });
    },
    ajaxStatus : [],
    getCategory : function(cid){
        for(var i=0;i<productRecommand.ajaxStatus.length;i++){
            if(productRecommand.ajaxStatus[i].cid == cid){
                return productRecommand.ajaxStatus[i];
            }
        }
        
        return null;
    },
    changePage : function(cid, step, loadStep){
        for(var i=0;i<productRecommand.ajaxStatus.length;i++){
            if(productRecommand.ajaxStatus[i].cid == cid){
                productRecommand.ajaxStatus[i].currentPage += step;
                if(loadStep){
                    productRecommand.ajaxStatus[i].loadPage += loadStep;
                }
                return true;
            }
        }
        
        return false;
    },
    changeStatus : function(cid, staus){
        for(var i=0;i<productRecommand.ajaxStatus.length;i++){
            if(productRecommand.ajaxStatus[i].cid == cid){
                productRecommand.ajaxStatus[i].loadingStatus = staus;
                return true;
            }
        }
        
        return false;
    },
    insertCategory : function(cid, currentPage, loadPage){
        if(!currentPage){
            currentPage = 0;
        }
        if(!loadPage){
            loadPage = 0;
        }
        
        var cateogry = {cid: cid, currentPage:currentPage, loadPage:loadPage, loadingStatus:1};
        productRecommand.ajaxStatus.push(cateogry);
        
        return cateogry;
    },
    initCategory : function(e){
        if(!e){
            return;
        }
        
        var productSysNo = resources_ProductDetail.productID;
        var category = $(e).attr("cid");
        
        $(e).removeAttr("command");
        
        $("#relatedProductLoading").css("display", "block");
        var data = "sysno=" + productSysNo + "&category=" + category + "&resolution=" + resolution;
        $.get($.newegg.buildWWW("ajax/product/ajaxrelatedproduct.aspx"), data, function(result) {
			    $("#RelatedProductCategory_" + category).append(result);
			    $("#relatedProductLoading").hide();
			    
			    productRecommand.bindClick($("#RelatedProductCategory_" + category + " .sel input:checkbox"));
			    productRecommand.checkAll();
              }, 
              "html");
    },
    nextPage : function(next){
        var cid = next.attr("cid");
        if(!cid){
            return false;
        }
               
        var category = productRecommand.getCategory(cid);
        if(category){
            if(category.currentPage + 1 < category.loadPage){
                // 已加载
                $("#relatedProductLoading").hide();
                productRecommand.changePage(category.cid, 1);
                return true;
            }
            if(category.currentPage + 1 == category.loadPage){
                // 正在加载中
                if(category.loadingStatus){
                    $("#relatedProductLoading").css("display", "block");
                    return false;
                }
                else{
                    productRecommand.changePage(category.cid, 1);
                    $("#relatedProductLoading").hide();
                    return true;
                }
            }
        }
        else{
            category = productRecommand.insertCategory(cid);
        }
        
        // 显示加载图标
        productRecommand.changePage(category.cid, 1, 1);
        $("#relatedProductLoading").css("display", "block");
        
        var data = {sysno : resources_ProductDetail.productID, category : cid, page : category.currentPage + 1, resolution:resolution};
        $.get($.newegg.buildWWW("ajax/product/ajaxrelatedproduct.aspx"), data, function(result) {
			    $("#RelatedProductCategory_" + cid).append(result);
			    $("#relatedProductLoading").hide();
			    
			    productRecommand.changeStatus(category.cid, 0);
			    productRecommand.checkAll();
			    productRecommand.bindClick($("#RelatedProductCategory_" + cid + " .sel input:checkbox"));
              }, 
              "html");
              
        return true;
    },
    prePage : function(pre){
        var cid = pre.attr("cid");
        if(!cid){
            return false;
        }
        
        productRecommand.changePage(cid, -1);
        return true;
    },
    setPrice:function(){
        // 设置总价格
        var price = 0.0;
        for(var i=0;i<this.selectedItemList.length;i++){
            price += parseFloat(this.selectedItemList[i].price);
        }
        
        var mainProductPrice = 0.0;
        if($("#buyTogether").attr("checked")){
            mainProductPrice = parseFloat($("#hiddenProductPrice").val());
        }
        
        var total = price + mainProductPrice;
        var total = $.newegg.format(productRecommandResource.priceFormat, total.toFixed(2));
        $("#totalSelectedPrice").text(total);
    },
    addRelatedProduct:function()
    {
        // check
        //buyTogether
        var mainProductId = "";
        if($("#buyTogether").attr("checked")){
            mainProductId = resources_ProductDetail.productID;
        }
    
        var prodctList = "";
        var quantity = "";
        var paramEx="";
        for(var i=0;i<this.selectedItemList.length;i++){
            if(i ==0){
                prodctList = this.selectedItemList[i].id;
                quantity="1";
            }
            else{
                prodctList += "," +this.selectedItemList[i].id;
                quantity+=",1";
            }
        }
        
        if(mainProductId != "" ){
            prodctList+="," + mainProductId;
            quantity+=",1";
        }
        
        if(typeof(pageAlias)!="undefined" && pageAlias.length>0)
		{
		    paramEx+="&"+fromPageAliasKey+"="+pageAlias;
		}
        
        window.location=productRecommandResource.cartUrl+"?Action=Add&productno="+prodctList+"&quantity="+quantity+paramEx;
    }
};
/*产品推荐--------------------------- END */
/*热销排行--------------------------- START */
var TopSaleInfo = {
    AjaxCall : function(e){
        if(!e){
            return;
        }
        
        var productSysNo = resources_ProductDetail.productID;
        
        var type = $(e).attr("rel");
        $(e).removeAttr("command");
        var data = "sysno=" + productSysNo + "&type=" + type;
        
        if(type == 1){
            $.get($.newegg.buildWWW("ajax/product/ajaxproducttopsalesinfo.aspx"), data, function(result) {
			    $("#topSales_1").html(result);
			    openWinMode.setAsycBlank("topSales_1");
			    
                 //加载图片
                 var arry=[];
                if($("#topSales_1").length){
	                arry.push("topSales_1");
	            }
	            $.newegg.imgLoad.loadImg(arry);
	            $(window).bind("scroll",function(){                                      
		              $.newegg.imgLoad.load();
	            });
              }, 
              "html");  
        }
        else if(type == 0){
            $.get($.newegg.buildWWW("ajax/product/ajaxproducttopsalesinfo.aspx"), data, function(result) {
                    $("#topSales_0").html(result);
                    openWinMode.setAsycBlank("topSales_0");
                    //加载图片
                    var arry=[];
                    if($("#topSales_0").length){
		                arry.push("topSales_0");
		            }
		            $.newegg.imgLoad.loadImg(arry);
		            $(window).bind("scroll",function(){                                      
			              $.newegg.imgLoad.load();
		            });
                }, 
                "html"); 
        }
    }
}
/*热销排行--------------------------- END */
/*分享SNS--------------------------- START */
function hideAllSharePanel() {
	$(".shareCtner").hide();
}
/*toSNS update shareLink and opener to remove*/
function sharePanel() {
	var timeout;
	$(".shareTab .shareLink").hover(function(){
		if($(".MailListFix").length == 0) {
			hideAllSharePanel();
			
			if(timeout){clearTimeout(timeout);}
			timeout=setTimeout(function(){
				$(".snsList").show();
			},1000);
			
		}
	},function(){
		if($(".MailListFix").length == 0) {
			hideAllSharePanel();
			
			if(timeout){clearTimeout(timeout);}
		}
	});

	/*byMail update commendLink  and opener to remove*/
    $(".shareTab .commendLink").hover(function(){
		if($(".MailListFix").length == 0) {
			hideAllSharePanel();
			if(SNSShare.hasGetSendBody){
		        if(timeout){clearTimeout(timeout);}
		            timeout=setTimeout(function(){
			            $(".MailList").show();
		            },1000);
            }else{
			     SNSShare.getSendBody();
		    }
	    }
	},function(){
		if($(".MailListFix").length == 0) {
			hideAllSharePanel();
			
			if(timeout){clearTimeout(timeout);}
		}
	});

	/*addToExFav update favoriteLink and opener to remove */
	$(".shareTab .favoriteLink").hover(function(){
		if($(".MailListFix").length == 0) {
			hideAllSharePanel();
			
			if(timeout){clearTimeout(timeout);}
			timeout=setTimeout(function(){
				$(".favList").show();
			},1000);
			
		}
	},function(){
		if($(".MailListFix").length == 0) {
			hideAllSharePanel();
			
			if(timeout){clearTimeout(timeout);}
		}
	});
	
	$(".snsList").mouseover(function(){
		$(".snsList").show();
	}).mouseout(function(){
		hideAllSharePanel();
	});
	
	/*$(".MailList").mouseover(function(){
		$(".MailList").show();
	}).mouseout(function(){
		if($(".MailListFix").length == 0) {
			hideAllSharePanel();
		}
	});*/
	
	$(".favList").mouseover(function(){
		$(".favList").show();
	}).mouseout(function(){
		hideAllSharePanel();
	});
	
	
	$(".MailList textarea").focus(function(){
		$(".MailList").addClass("MailListFix");
		$(".MailList .shuter").show();
	});
	$(".MailList input").focus(function(){
		$(".MailList").addClass("MailListFix");
		$(".MailList .shuter").show();
	});
	$(".MailList .shuter").click(function(){
		$(".MailList").removeClass("MailListFix");
		$(".MailList").hide();
		$(".MailList .shuter").hide();
	});
	$("#cancelSendMail").click(function(){
		$(".MailList").removeClass("MailListFix");
		$(".MailList").hide();
		$(".MailList .shuter").hide();
	});
}
var SNSShare = {
    Share: function(e, objfav) {
        if (!e) {
            return;
        }
        var link = $(e);
        var id = link.attr("id");
        id = id.replace("shareCtner_", "");

        var docTitle = document.title;
        var docUrl = document.location.href;

        if (id == "local") {
            try {
                if (window.sidebar) {
                    window.sidebar.addPanel(docTitle, docUrl, "");
                }
                else if (window.external) {
                    window.external.AddFavorite(docUrl, docTitle);
                }
                else if (window.opera && window.print) {
                    window.external.AddFavorite(docUrl, docTitle);
                }
                else {
                    alert(SNSShare_Resource.ErrorAddLocalFavoriteFail);
                }
            }
            catch (e) {
                alert(SNSShare_Resource.ErrorAddLocalFavoriteFail);
            }

            return;
        }

        //Ga
        try { _gaq.push(['_trackEvent', 'Share', 'sns']); } catch (ex) { }
        if (objfav == 'fav') {
            //omniture 收藏
            try {
                var s = s_gi(s_account);
                s.linkTrackVars = 'products,events,prop1';
                s.linkTrackEvents = 'event34';
                s.events = 'event34';
                s.prop1 = reportsuite;
                s.products = ';' + resources_ProductDetail.productID;
                s.tl(e, 'o', 'Bookmark');
            } catch (ex) { }
        } else {
            //omniture 分享
            try {
                var s = s_gi(s_account);
                s.linkTrackVars = 'products,events,eVar35,prop1';
                s.linkTrackEvents = 'event32';
                s.events = 'event32';
                s.prop1 = reportsuite;
                s.eVar35 = link.text(); ;
                s.products = ';' + resources_ProductDetail.productID;
                s.tl(e, 'o', 'SNS');
            } catch (ex) { }
        }

        var docTitle = encodeURIComponent(docTitle);
        var docUrl = encodeURIComponent(docUrl);

        var url = "";
        switch (id) {
            case "kaixin001":
                url = "http://www.kaixin001.com/~repaste/repaste.php?&rurl={0}&rtitle={1}&rcontent={1}";
                break;
            case "renren":
                url = "http://share.renren.com/share/buttonshare.do?link={0}&title={1}";
                break;
            case "tsina":
                url = "http://v.t.sina.com.cn/share/share.php?title={1}&url={0}";
                break;
            case "tqq":
                url = "http://v.t.qq.com/share/share.php?url={0}&title={1}&appkey=f50899c2573f45f198d152283055b879";
                break;
            case "douban":
                url = "http://www.douban.com/recommend/?url={0}&title={1}";
                break;
            case "taobao":
                url = "http://share.jianghu.taobao.com/share/addShare.htm?url={0}";
                break;
            case "xianguo":
                url = "http://xianguo.com/service/submitdigg?link={0}&title={1}";
                break;
            case "digu":
                url = "http://www.diguff.com/diguShare/bookMark_FF.jsp?title={1}&url={0}";
                break;
            case "buzz":
                url = "http://www.google.com/buzz/post?url={0}";
                break;
            case "baidu":
                url = "http://cang.baidu.com/do/add?it={1}&iu={0}";
                break;
            case "google":
                url = "http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk={0}&title={1}";
                break;
            case "youdao":
                url = "http://shuqian.youdao.com/manage?a=popwindow&title={1}&url={0}";
                break;
            case "qq":
                url = "http://shuqian.qq.com/post?from=3&title={1}&uri={0}&jumpback=2&noui=1";
                break;
            case "yahoo":
                url = "http://myweb.cn.yahoo.com/popadd.html?url={0}&title={1}";
                break;
        }

        url = $.newegg.format(url, docUrl, docTitle);
        if (id === "tsina") {
            var src = resources_ProductDetail.productImageP220;
            if (src) {
                url += "&pic=" + encodeURIComponent(src);
            }
        }

        link.attr("href", url);
        link.attr("target", "_blank");
    },
    refreshValidator: function(img, input) {
        // 刷新验证码
        var url = $(img).attr('ref1');
        newurl = url + "?r=" + Math.random();
        $(img).attr('src', newurl);
        $(input).focus();
    },
    getingSendBody: false,
    hasGetSendBody: false,
    sendingMail: false,
    getSendBody: function() {
        // 获取中
        if (SNSShare.getingSendBody) {
            return;
        }

        SNSShare.getingSendBody = true;

        $.get($.newegg.buildWWW("ajax/product/ajaxproductsendmail.aspx"), "item=" + resources_ProductDetail.productCode, function(result) {
            // 获取完成
            SNSShare.getingSendBody = false;
            SNSShare.hasGetSendBody = true;

            $(".MailList").html(result);

            // 设置默认值
            var defaultValue = $("#sendFormEmailAddress").val();
            $("#sendFormEmailAddress").focus(function() {
                if ($(this).val() == defaultValue) {
                    $(this).val("");
                    $(this).addClass("hasDefaultTextOn");
                }
            })
            $("#sendFormEmailAddress").blur(function() {
                if ($(this).val() == "") {
                    $(this).val(defaultValue);
                    $(this).removeClass("hasDefaultTextOn");
                }
            });

            var defaultValue2 = $("#sendFormEmailContent").val();
            $("#sendFormEmailContent").focus(function() {
                if ($(this).val() == defaultValue2) {
                    $(this).val("");
                    $(this).addClass("hasDefaultTextOn");
                }
            })
            $("#sendFormEmailContent").blur(function() {
                if ($(this).val() == "") {
                    $(this).val(defaultValue2);
                    $(this).removeClass("hasDefaultTextOn");
                }
            });

            // 字符串长度控制
            $("#sendFormEmailAddress").bind(
                  {
                      propertychange: function() {
                          SNSShare.textChange(this, SNSShare_Resource.SendMailSenderMaxLength);
                      },
                      input: function() {
                          SNSShare.textChange(this, SNSShare_Resource.SendMailSenderMaxLength);
                      }
                  }
                );
            $("#sendFormEmailContent").bind(
                  {
                      propertychange: function() {
                          SNSShare.textChange(this, SNSShare_Resource.SendMailContentMaxLength);
                      },
                      input: function() {
                          SNSShare.textChange(this, SNSShare_Resource.SendMailContentMaxLength);
                      }
                  }
                );

            $("#sendFormSubmit").click(function() {
                return SNSShare.sendMail();
            });

            // 锁定状态
            $(".MailList textarea").focus(function() {
                $(".MailList").addClass("MailListFix");
                $(".MailList .shuter").show();
            });
            $(".MailList input").focus(function() {
                $(".MailList").addClass("MailListFix");
                $(".MailList .shuter").show();
            });
            $(".MailList .shuter").click(function() {
                $(".MailList").removeClass("MailListFix");
                $(".MailList").hide();
                $(".MailList .shuter").hide();
                return false;
            });
            $("#cancelSendMail").click(function() {
                $(".MailList").removeClass("MailListFix");
                $(".MailList").hide();
                $(".MailList .shuter").hide();
                return false;
            });

            var sendmail = SNSShare.getParameterByName("sendmail");
            if (sendmail == "show") {
                $(".MailList").addClass("MailListFix");
                $(".MailList .shuter").show();
            }

            $(".MailList").show();
        },
              "html");
    },
    textChange: function(e, maxLength) {
        var content = e.value;
        if (content.length > maxLength) {
            e.value = content.substring(0, maxLength);
            e.value += "";
        }
    },
    testMail: function(email) {
        return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
    },
    sendMail: function() {
        if (SNSShare.sendingMail) {
            return false;
        }

        $("#sendMailError").hide();
        $("#sendMailOK").hide();

        var sendAddress = $("#sendFormEmailAddress").val();
        var sendContent = $("#sendFormEmailContent").val();
        var checkCode = $("#sendFormCheckCode").val();

        sendAddress = $.trim(sendAddress);
        sendContent = $.trim(sendContent);
        checkCode = $.trim(checkCode);

        if ($("#hiddenSendMailNeedSender").length > 0) {
            $("#sendMailError").text(SNSShare_Resource.ErrorNoSenderAddress);
            $("#sendMailError").show();
            return false;
        }
        if (sendAddress == "") {
            $("#sendMailError").text(SNSShare_Resource.ErrorNoSenderAddress);
            $("#sendMailError").show();
            return false;
        }

        if (sendAddress == SNSShare_Resource.SendMailDefaultSenderDesc1 + "\n" + SNSShare_Resource.SendMailDefaultSenderDesc2) {
            $("#sendMailError").text(SNSShare_Resource.ErrorNoSenderAddress);
            $("#sendMailError").show();
            return false;
        }

        // check email
        if (sendAddress.indexOf(",") != -1) {
            var emailList = sendAddress.split(',');
            for (var i = 0; i < emailList.length; i++) {
                if (!SNSShare.testMail(emailList[i])) {
                    $("#sendMailError").text(SNSShare_Resource.ErrorInValidAddress);
                    $("#sendMailError").show();
                    return false;
                }
            }
        }
        else {
            if (!SNSShare.testMail(sendAddress)) {
                $("#sendMailError").text(SNSShare_Resource.ErrorInValidAddress);
                $("#sendMailError").show();
                return false;
            }
        }
        if (sendContent == SNSShare_Resource.SendMailDefaultContentDesc1 + "\n" + SNSShare_Resource.SendMailDefaultContentDesc2) {
            sendContent = "";
        }
        if (sendContent != "" && sendContent.length > SNSShare_Resource.SendMailContentMaxLength) {
            $("#sendMailError").text(SNSShare_Resource.ErrorContentMaxLength);
            $("#sendMailError").show();
            return false;
        }
        if (checkCode == "" || checkCode.length != 4) {
            $("#sendMailError").text(SNSShare_Resource.ErrorNoCheckCode);
            $("#sendMailError").show();
            return false;
        }

        //Ga
        try { _gaq.push(['_trackEvent', 'Share', 'mail']); } catch (ex) { }

        //omniture
        try {
            var s = s_gi(s_account);
            s.linkTrackVars = 'products,events,eVar36,prop1';
            s.linkTrackEvents = 'event33';
            s.events = 'event33';
            s.prop1 = reportsuite;
            s.eVar36 = sendAddress;
            s.products = ';' + resources_ProductDetail.productID;
            s.tl($("#sendFormSubmit"), 'o', 'Friend');
        } catch (ex) { }

        // POST
        SNSShare.sendingMail = true;

        var data = { sysno: resources_ProductDetail.productID, sendFormEmailAddress: sendAddress, sendFormEmailContent: escape(sendContent), sendFormCheckCode: checkCode };
        $.post($.newegg.buildWWW("ajax/product/ajaxproductpostsendmail.aspx"), data, function(result) {
            if (result.Type == "2") {
                switch (result.Description) {
                    case "Redirect":
                        location.href = result.Data;
                        break;
                    case "Message":

                        if (result.Data == "ErrorInValidCheckCode") {
                            SNSShare.refreshValidator('#sendFromCheckImage', '#sendFormCheckCode');
                        }

                        $("#sendMailError").text(SNSShare_Resource[result.Data]);
                        $("#sendMailError").show();

                        SNSShare.sendingMail = false;
                        break;
                }
            } else if (result.Type == "0") {
                SNSShare.sendingMail = false;
                SNSShare.refreshValidator('#sendFromCheckImage', '#sendFormCheckCode');
                $("#sendFormEmailAddress").val("");
                $("#sendFormEmailContent").val("");
                $("#sendFormCheckCode").val("");

                $("#sendMailOK").text(SNSShare_Resource.SendOkMessage);
                $("#sendMailOK").show();
            }
        },
          "json");

        return false;
    },
    getParameterByName: function(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    init: function() {
        var sendmail = SNSShare.getParameterByName("sendmail");
        if (sendmail == "show") {
            SNSShare.getSendBody();
        }
    }
}
window.onload=function(){
    SNSShare.init();
}
/*分享SNS--------------------------- END */

/*产品评论--------------------------- START */
var product_createReview = {
    search: function() {
        var jqueryObj = $("#productReviewSearch");
        var keyWord = $.trim(jqueryObj.val());
        if (create_review.reviewSearchKeyWord == keyWord) {
            keyWord = "";
        }

        keyWord = escape(keyWord);
        keyWord = keyWord.replace(/\#/g, "%23").replace(/\&/g, "%26").replace(/\+/g, "%2B");

        if (keyWord != '') {
            keyWord = "&rkeyword=" + keyWord;
        }
        window.location.href = create_review.reviewUrl + "?searchtype=" + ProductReview.SearchKey + keyWord;
        return false;
    },
    redirect: function(obj) {
        var url = $(obj).attr("returnurl");
        if ($.newegg.cookie.get("CustomerLogin", "ID") == '') {
            redirectLogin(url);
        }
        else {
            window.location.href = url;
        }
    },
    checkLogin: function(obj, returnUrl) {
        if ($.newegg.cookie.get("CustomerLogin", "ID") == '') {
            if (returnUrl) {
                url = returnUrl;
            }
            else {
                url = $(obj).attr("returnurl");
            }
            redirectLogin(url);

            return false
        }
        else {
            return true;
        }
    },
    reviewVote: function(obj, val) {
        var login = product_createReview.checkLogin(obj, create_review.currentPageUrl);
        if (!login) {
            return;
        }

        //step1:1分钟检查
        if (!checkOneMiniteBeforePublishForVote(create_review.postTimeLimit)) {
            product_createReview.reviewVoteInfo(obj, create_review.errorInfoFastPulish);
            setTimeout(function() { $(obj).parent().find("em").remove(); }, 5000);
            return;
        }
        var reviewSysNo = $(obj).parent().children("input[name='reviewSysNo']").val();

        $.post($.newegg.buildWWW("ajax/feedback/ajaxreviewvote.aspx"),
				{ ReviewSysNo: reviewSysNo, IsUseful: val },
				function(data) {
				    if (data.Type == 0) {
				        $(obj).parent().children("a").each(function(i) {
				            var link = $(this);
				            if (i == 0) {
				                // link.text(link.attr("title") + "(" + data.Data.TotalUsefulRemarkCount + ")");
				                link.find("span").text("对我有用" + "(" + data.Data.TotalUsefulRemarkCount + ")");
				            }
				            else if (i == 1) {
				            // link.text(link.attr("title") + "(" + data.Data.TotalUnUsefulRemarkCount + ")");
				               link.find("span").text("对我有无用" + "(" + data.Data.TotalUnUsefulRemarkCount + ")");
				            }
				        });

				        product_createReview.reviewVoteInfo(obj, create_review.reviewVoteSuccessMessage);
				        resetPublishTimePointForVote();
				    }
				    else {
				        product_createReview.reviewVoteInfo(obj, create_review.reviewVoteErrorMessage);
				    }
				},
				"json"
			);
        setTimeout(function() { $(obj).parent().find("em").remove(); }, 5000);
    },
    reviewVoteInfo: function(obj, resource) {
        var jqueryObj = $(obj);
        if (jqueryObj.parent().children().is("em") == false) {
            jqueryObj.parent().children().slice(0, 1).before("<em>" + resource + "</em>");
        }
    }
}
var ProductReview = {
    SearchKey: 0,
    NewReview: function() {

    },
    AjaxCall: function(e) {
        if (!e) {
            return;
        }
        e = $(e);
        if (e.find("span:contains('(0)')").length != 0) {
            return;
        }

        var type = e.attr("t");

        if (!type) {
            ProductReview.SearchKey = "";
            return;
        }
        else {
            ProductReview.SearchKey = type;
        }

        var down = e.attr("down");
        if (down) {
            //  return;
        }
        e.attr("down", "true");

        var rel = e.attr("rel");
        //var data = "productGroupSysNo=" + resources_ProductDetail.productGroupSysNo + "&sysno=" + resources_ProductDetail.productID + "&searchtype=" + type;    //Franky: 沃尔玛：商品评论按ProductCode获取
        var data = "code=" + resources_ProductDetail.productCode + "&sysno=" + resources_ProductDetail.productID + "&searchtype=" + type;

        $.get($.newegg.buildWWW("ajax/product/ajaxproductreview.aspx"), data, function(result) {
            // alert($.newegg.buildWWW("ajax/product/ajaxproductreview.aspx"));
            $("#comment_" + rel).html(result);
        },
              "html");
    }
}
/*产品评论--------------------------- END */
/*产品咨询--------------------------- START */
var productConsult = {
    replyConsult:function(url){
		if($.newegg.cookie.get("CustomerLogin", "ID") == '')
        {
			redirectLogin(url);
        }
        else
        {
			window.location.href=url+"#content";
        }
    }
}
var ProcutAdvisory = {
    SearchKey: "",
    Search: function() {
        var jqueryObj = $("#productAdvisorySearch");
        var keyWord = $.trim(jqueryObj.val());
        if (ProcutAdvisory_Resource.SearchDefaultValue == keyWord) {
            keyWord = "";
        }
        var url = "";
        switch (ProcutAdvisory.SearchKey) {
            case "ProductConsult":
                url = ProcutAdvisory_Resource.SearchUrl.ProductConsult
                break;
            case "ShippingConsult":
                url = ProcutAdvisory_Resource.SearchUrl.ShippingConsult
                break;
            case "PayConsult":
                url = ProcutAdvisory_Resource.SearchUrl.PayConsult
                break;
            case "VoiceARMConsult":
                url = ProcutAdvisory_Resource.SearchUrl.VoiceARMConsult
                break;
            case "PromotionAndGiftConsult":
                url = ProcutAdvisory_Resource.SearchUrl.PromotionAndGiftConsult
                break;
            case "NormalQuestionConsult":
                url = ProcutAdvisory_Resource.SearchUrl.NormalQuestionConsult
                break;
            default:
                url = ProcutAdvisory_Resource.SearchUrl.All
                break;
        }

        keyWord = escape(keyWord);
        keyWord = keyWord.replace(/\#/g, "%23").replace(/\&/g, "%26").replace(/\+/g, "%2B");

        if (keyWord != '') {
            keyWord = "?feedbackkeyword=" + keyWord;
        }

        window.location.href = url + keyWord;
        return false;
    },
    AjaxCall: function(e) {
        if (!e) {
            return;
        }
        e = $(e);
        var type = e.attr("t");

        if (!type) {
            ProcutAdvisory.SearchKey = "";
            return;
        }
        else {
            ProcutAdvisory.SearchKey = type;
        }

        var down = e.attr("down");
        if (down) {
            // return;
        }
        e.attr("down", "true");

        var rel = e.attr("rel");
        var data = "productGroupSysNo=" + resources_ProductDetail.productGroupSysNo + "&sysno=" + resources_ProductDetail.productID + "&type=" + type;

        $.get($.newegg.buildWWW("ajax/product/ajaxproductadvisory.aspx"), data, function(result) {
           // alert(result);
            if (result.length <= 0) {
                result = "<p class=\"noItem\">暂无咨询</p>";
            }
            $("#consultation_" + rel).html(result);
        },
              "html");
    }
}
/*产品咨询--------------------------- END */
/*产品讨论--------------------------- START */
var ProductDiscuss = {
    SearchKey: "",
    Search: function() {
        var jqueryObj = $("#productDiscussSearch");
        var keyWord = $.trim(jqueryObj.val());
        if (ProductDiscuss_Resource.SearchDefaultValue == keyWord) {
            keyWord = "";
        }
        var url = "";
        switch (ProductDiscuss.SearchKey) {
            case "SunSingleDiscuss":
                url = ProductDiscuss_Resource.SearchUrl.SunSingleDiscuss
                break;
            case "CommonDiscuss":
                url = ProductDiscuss_Resource.SearchUrl.CommonDiscuss
                break;
            case "AskDiscuss":
                url = ProductDiscuss_Resource.SearchUrl.AskDiscuss
                break;
            default:
                url = ProductDiscuss_Resource.SearchUrl.All
                break;
        }


        keyWord = escape(keyWord);
        keyWord = keyWord.replace(/\#/g, "%23").replace(/\&/g, "%26").replace(/\+/g, "%2B");

        if (keyWord != '') {
            keyWord = "?feedbackkeyword=" + keyWord;
        }

        //var url = ProductDiscuss_Resource.SearchUrl + keyWord;
        window.location.href = url + keyWord;
        return false;
    },
    AjaxCall: function(e) {
        if (!e) {
            return;
        }
        e = $(e);
        var type = e.attr("t");

        if (!type) {
            ProductDiscuss.SearchKey = "";
            return;
        }
        else {
            ProductDiscuss.SearchKey = type;
        }

        var down = e.attr("down");
        if (down) {
            //return;
        }
        e.attr("down", "true");

        var rel = e.attr("rel");
        var data = "code=" + resources_ProductDetail.productCode + "&DType=" + type;

        $.get($.newegg.buildWWW("ajax/product/AjaxProductDiscuss.aspx"), data, function(result) {
        if ($String.Trim(result).length <= 0 || typeof (result) == 'undefined') {
                result = "<p class=\"noItem\">暂无讨论</p>";
            }
            $("#discussionlist_" + rel).html(result);
        },
              "html");
    }

}
/*产品讨论--------------------------- END */
//quick bar
$(".btnCloseBar").click(function(){
	$("#quickLinks,#close").hide();
	$("#extend").show();
	
	
});
$(".btnExtended").click(function(){
	$("#quickLinks,#close").show();
	$("#extend").hide();
	$("#close").show();
});

/*--------赠品规则修改---------*/
//$("div.centerPopPanel").each(
//    function(){
//        centerPopA(this.id,true);
//    }
//);
$(".saleArea li a").click(function() {
    var win;
    if ($(this).data("rel_win") != undefined) {
        win = $(this).data("rel_win");
        win.fn.popIn();
    }
    else {
        win = PopWin("#pop" + $(this).attr("id"), {
            action: "in",
            animate: false,
            overlay: "#overlay_transparent",
            callback: function(o) {
                $("#overlay_transparent").click(function() {
                    win.fn.popOut();
                    $(this).unbind("click");
                });
            }
                                     ,
            afterPopOut: function() {
                $("#overlay_transparent").unbind("click");
            }
        });
        $(this).data("rel_win", win);
    }
});


var newGiftTimer = null;

function NewGiftAlertErrorMsg(giftsysno,msg)
{
    var labSpan = $("#promotional"+giftsysno).find("span.cmnErrorTip:first");
    var labP =  $("#promotional"+giftsysno).find("p.selectErrorTooltip:first");
    labP.css("display", "");
    labSpan.text(msg);
    newGiftTimer = setTimeout(function()
            {
                labP.css("display", "none");
                labSpan.text("");
                clearTimeout(newGiftTimer);
            },5000);
}

$("input[name='checkGiftPool']").click(
    function(){
        var obj = $(this);
        var promotionSysNo = obj.attr("giftsysno");
        if(obj.attr("checked") === false)
        {
            var labSpan = $("#promotional"+promotionSysNo).find("span.cmnErrorTip:first");
            var labP =  $("#promotional"+promotionSysNo).find("p.selectErrorTooltip:first");
            labP.css("display", "none");
            labSpan.text("");    
        }
        
        var maxCount = obj.attr("maxcount");
        
        var selectedCount = $("input[name='checkGiftPool'][type='checkbox'][giftsysno='"+promotionSysNo+"']:checked").length;
        
        if(selectedCount > maxCount)
        {
            NewGiftAlertErrorMsg(promotionSysNo,resources_ProductDetail.selectTooMoreInfo);
            return false;      
        }
    }
);

$("a.moreGiftLink").click(
    function(){
        var lst = $("#newGiftInfoList");
        var action = $(this).attr("action");
        if(action === "open")
        {
            lst.children("li").each(
                function()
                {
                    $(this).css("display","");
                }
            );
            
            $(this).attr("action","close");
            $(this).text("["+resources_ProductDetail.lessGiftInfo+"]");
        }
        else
        {
            lst.children("li:not(.noBack)").each(
                function(idx)
                {
                    if(idx > 1)
                    {
                        $(this).css("display","none");
                    }
                }
            );
            
            $(this).attr("action","open");
            $(this).text("["+resources_ProductDetail.moreGiftInfo+"]");
        }
    }
);

$(".newGiftBothBuy").click(
    function()
    {
        var obj = $(this);
        var selectedGift = "";
        var giftSysNo = obj.attr("giftsysno");
        var maxCount = obj.attr("maxcount");
        maxCount = parseInt(maxCount,10);
        if(maxCount !== 0)
        {
            var selectedCount = $("input[name='checkGiftPool'][type='checkbox'][giftsysno='"+giftSysNo+"']:checked").length;
//            if(selectedCount === 0)
//            {
//                var msg = $.newegg.format(resources_ProductDetail.couldSelectInfo,maxCount - selectedCount);
//                NewGiftAlertErrorMsg(giftSysNo,msg);
//                return;
//            }
            
            if(selectedCount > maxCount)
            {
                var msg = resources_ProductDetail.selectTooMoreInfo;
                NewGiftAlertErrorMsg(giftSysNo,msg);
                return;
            }
            
            $("input[name='checkGiftPool'][type='checkbox'][giftsysno='"+giftSysNo+"']:checked").each(
                function(){
                    selectedGift += this.value + ",";
                }
            );
        }
        else
        {
            $("input[type='hidden'][giftsysno='"+giftSysNo+"'][name='hidGiftVal']").each(
                function(){
                    selectedGift += this.value + ",";
                }
            );
        }
        
        if(selectedGift.length > 0)
        {
            selectedGift = selectedGift.substr(0,selectedGift.length - 1);
        }
        
        var productSysNo = "",
            productQty = "";
        
        $("input[type='hidden'][name='prdInfo'][giftsysno='"+giftSysNo+"']").each(
            function(){
                var dataObj = $(this);
                productSysNo += dataObj.attr("sysno") + ",";
                productQty += dataObj.attr("qty") + ",";
            }
        );
        
        if(productSysNo.length > 0)
        {
            productSysNo = productSysNo.substr(0,productSysNo.length - 1);
        }
        
        if(productQty.length > 0)
        {
            productQty = productQty.substr(0,productQty.length - 1);
        }
        
        var url = $.newegg.buildWWW("Shopping/ShoppingCart.aspx");
        var param = "?quantity=" + productQty + "&productno=" + productSysNo + "&action=Add&PID=" + giftSysNo + "&GID="+selectedGift;
        url += param;
        
        if(typeof(pageAlias)!="undefined" && pageAlias.length>0)
		{
		    url+="&"+fromPageAliasKey+"="+pageAlias;
		}
		
        location = url;
    });
/*
    异步获取商品分仓的库存情况（如上海仓，北京仓等）
*/
var productInventory={
    flag:0,
    ajaxCallForProductInventory : function(stockId,isFirstLoad){
        var ajaxUrl=$.newegg.buildWWW("Ajax/Product/AjaxProductInventory.aspx?stockId="+stockId+"&productID="+resources_ProductDetail.productID+"&isFirstLoad="+isFirstLoad);
        $.getJSON(ajaxUrl,
				function(data)
				{
					if(data.Type == 0)
					{
					    var result=data.Data.split(',');
					    if(result.length>1){
					        $(".dd_position a:first").removeClass("noProduct").addClass("goods").text(result[0]);
					        $("#inventoryVirtual").text(result[1]);
					    }else
					    {
					        var findIndex= data.Data.indexOf(resources_ProductDetail.OutofStock);
					        if(findIndex>=0)
					        {
					            $(".dd_position a:first").removeClass("goods").addClass("noProduct");
					        }else
					        {
					            $(".dd_position a:first").removeClass("noProduct").addClass("goods");
					        }
					        $(".dd_position a:first").text(data.Data); 
					        $("#inventoryVirtual").text("");
					    }
					    
					    $("#inventory_Loading").hide();
                        $(".dd_position").find(".opener a").show();
                        $("#inventoryVirtual").show();
                        
                        $('.layer_box dl dt a').each(function (i) {
                            var item=$(this).text();
                            if ($(".dd_position").find(".opener a").text().indexOf($.trim(item))>=0) {
                                $(this).removeClass("curr_yellow").addClass("current");
                            } 
                      });
					}
				},
				"json"
			);   
    },
    initInventory:function(){
        var stockId=decodeURI(escape($.newegg.cookie.get("LoginValidate", "stockId")));
            stockId=stockId||0;
        if($(".dd_position").length>0)
        {
            if(stockId>0)
            {
      		     productInventory.ajaxCallForProductInventory(stockId,true);
      		     productInventory.flag=1;
            }else
            {
                $("#inventory_Loading").hide();
                $(".dd_position").find(".opener,.goods").show();
                $("#inventoryVirtual").show();
            }
        }
       
        //alert($(".dd_position").find(".opener a").text());
        if(productInventory.flag==0)
            $('.layer_box dl dt a').each(function (i) {
                        var item=$(this).text(); 
                        if ($(".dd_position").find(".opener a").text().indexOf($.trim(item))>=0) {
                            $(this).removeClass("curr_yellow").addClass("current");
                        } 
                      });
        
    }
    
}

$('.layer_box dl dt a').click(function(){
		var stockId=$(this).attr("rel")||0;
		if(stockId>0)
		{
		    productInventory.ajaxCallForProductInventory(stockId,false);
		    var jsonObject = {"stockId":stockId};
		    $.newegg.cookie.set("LoginValidate", jsonObject, {topdomain:true});
		    
		}
		
		$('.layer_box dl dt a').removeClass("current").addClass("curr_yellow");
		$(this).removeClass("curr_yellow").addClass("current");
		$(".dd_position").removeClass("over").find(".popWinA").hide();
		return false;
	});
	
$(".dd_position").find(".opener,.popWinA").hover(function(){
    $(".dd_position").addClass("over").find(".popWinA").show();	
    },function(){
	$(".dd_position").removeClass("over").find(".popWinA").hide();
}
);

var Sam = Sam || {};
Sam.AddShoppingForCombo = function(comboObj) {
    //Ga
    var comboID = $(comboObj).parent().attr('id');
    try { _gaq.push(['_trackEvent', 'Click', 'addtocart', '' + comboID + '']); } catch (ex) { }
}

