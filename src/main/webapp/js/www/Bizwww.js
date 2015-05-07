//产品列表显示方式 functions.
var productListStyle={
    switchListStyle:function (newC, pageName) {
		//改变显示样式
	    productListStyle.switchListStyleByClass(newC);
	    productListStyle.saveListStyleForPage(newC, pageName);
    },
    switchListStyleByClass:function(newC)
    {
		var row=$(".displayPanel .showStyle .showRow");
	    var grid=$(".displayPanel .showStyle .showGrid");
	    if(newC == 'Row')
	    {
			$("#productList").removeClass("listShowGrid").addClass("listShowRow");
			row.find(" .link").hide();
			row.find(" .current").show();
			grid.find(" .current").hide();
			grid.find(" .link").show();
	    }
	    else
	    {
			$("#productList").removeClass("listShowRow").addClass("listShowGrid");
			row.find(" .current").hide();
			row.find(" .link").show();
			grid.find(" .link").hide();
			grid.find(" .current").show();
	    }
    },
	saveListStyleForPage:function(newC, pageName){							  //保存显示样式到cookie
        
        var jsonObject = eval('(' + '{' + pageName + ':"' + newC + '"}' + ')');
        $.newegg.cookie.set("Product",jsonObject);
    },
    getListStyleForPage:function(key){						
        return $.newegg.cookie.get("Product", key);
    },
	changeProductListOrderType:function(obj){
					//改变排序规则
		var selectedSortMode = obj.value;
		if (selectedSortMode == "-1") {
			obj.selectedIndex=0;
            return;
		}		
		var url = window.location.href;
		var url = url.split('?')[0];
		var queryString = $.newegg.querystring.set("sort", selectedSortMode);
		var resultUrl = url.split('#')[0] + queryString;
			
		window.location.href = resultUrl;
		return false;
	},
	init:function(pageName){
		var linkClass = productListStyle.getListStyleForPage(pageName);
		productListStyle.switchListStyleByClass(linkClass);
	}
}


///brand product list functions
var brandStore={
    changedCategoryFilter:function(obj){
        var selectSort = $(obj);
        var sortValue = selectSort.val();
        var selectValue = parseInt(sortValue);
        if(selectValue <= 0) 
        {
              $("#productModuleFilter").empty();
              $("#productModuleFilter").append("<option value='-1'>"+www_Resource.filterProduct+"</option>");   
            return;
        }
        
        $('#btnFilterSearch').attr('href','javascript:void(0)');
        var pageUrl = window.location.href;
        pageUrl = brandStore.getCurrentPageFullPath(pageUrl,'FilterCategory',sortValue);
        window.location.href = pageUrl;
    },
    
    gotoProductDetailInfoPage:function(){
        var pageUrl = $('#productModuleFilter').val();
        var hasSubCategory = true;
        if(pageUrl == '-1')
        {
            hasSubCategory = false;
        }
        if(hasSubCategory) window.location.href = pageUrl;
    },
    getCurrentPageFullPath:function(pageUrl,key,value)
    {
		var urlIndex = pageUrl.indexOf("?");
		if(urlIndex > 0)
		{
			pageUrl = pageUrl.substring(0,urlIndex);
		}
        var queryString = $.newegg.querystring.set(key,value);
        return pageUrl+queryString;
    }
};
var browseHistory={
    clearHistory:function(id) 
    {
	    document.getElementById(id).style.display = "none";	
	}
};

/*初始化产品列表鼠标滑过显示按钮*/
function initItemGridCell(){
    $(".itemGridA .itemCell").hover(
	  function () {
		if($(".itemGridA").length) {
		$(this).addClass("popupItem");
		}
	  },
	  function () {
		if($(".itemGridA").length) {
		$(this).removeClass("popupItem");
		}
	  }
	);
}

/*产品比较功能*/
var productCompareNew = {
    delString: '删除',
    compareAlert: '',
    mustSelect: '',
    init: function(categoryID, delString, compareAlert, mustSelect) {
        productCompareNew.delString = delString;
        productCompareNew.compareAlert = compareAlert;
        productCompareNew.mustSelect = mustSelect;
        
        $(".btnCloseBar").click(function() {
            
            $("#compare,#close").hide();
            $("#extend").show();
        });

        $(".btnExtended").click(function() {
            $("#compare,#close").show();
            $("#extend").hide();
            $("#close").show();
        });

        var compareObj = productCompareNew.getCompareObj();
        if (compareObj == null) {
            productCompareNew.initCompareBar(null);
        }
        else {
            if (compareObj.CategoryID != categoryID) {
                productCompareNew.clear();
                productCompareNew.initCompareBar(null);
            }
            else {
                productCompareNew.initCompareBar(compareObj);
            }
        }
    },
    getCompareObj: function() {
        var cookie = $.newegg.cookie.get("ProductCompare");
        if (cookie == '') {
            return null;
        }

        var compareObj = JSON.parse(cookie);
        return compareObj;
    },
    setCompareObj: function(compareObj) {
        var cookie = JSON.stringify(compareObj);
        $.newegg.cookie.set("ProductCompare", cookie, { topdomain: true });
    },
    addCompare: function(categoryId, productCode, url, imgSrc, title) {

        //Ga
        try { _gaq.push(['_trackEvent', 'Click', 'compare']); } catch (ex) { }
    
        var compareObj = productCompareNew.getCompareObj();
        var product = { code: productCode, url: url, src: imgSrc, title: title };

        if (compareObj == null) {
            compareObj = { CategoryID: categoryId, ProductList: [] };
        }

        var currentList = compareObj.ProductList;
        if (currentList.length >= 5) {
            alert(productCompareNew.compareAlert);
            return;
        }

        var find = false;
        $.each(currentList, function(i, n) {
            if (n.code == productCode) {
                find = true;
                return false;
            }
        });

        if (find == false) {
            currentList.push(product);
        }

        productCompareNew.setCompareObj(compareObj);
        productCompareNew.initCompareBar(compareObj);
    },
    initCompareBar: function(compareObj) {
        var len;
        var currentList;
        var template;

        if (compareObj == null) {
            len = 0;
        }
        else {
            currentList = compareObj.ProductList;
            len = currentList.length;
            template = "<dt><img src='{0}'></dt><dd><p><a href='{1}' title='{2}'>{2}</a></p><p class='bot'><a href='javascript:productCompareNew.delProductList(\"{3}\");' class='del'>{4}</a></p></dd>";

        }

        $("#compare").find("li").each(function(i) {
            if (i < len) {
                var product = currentList[i];
                var html = $.newegg.format(template, product.src, product.url, product.title, product.code, productCompareNew.delString);
                $(this).children("dl").html(html);
                $(this).removeClass("empty");
            }
            else {
                $(this).children("dl").html('<dd><span>空</span></dd>');
                $(this).addClass("empty");
            }
        });

        if (len != 0) {
            $("#compare,#close").show();
            $("#extend").hide();
            $("#close").show();
        }
    },
    delCompareObj: function(productCode, compareObj) {
        if (compareObj != null) {
            var currentList = compareObj.ProductList;

            var index;
            $.each(currentList, function(i, n) {
                if (n.code == productCode) {
                    index = i;
                    return false;
                }
            });

            currentList.splice(index, 1);
            productCompareNew.setCompareObj(compareObj);
        }
    },
    delProductList: function(productCode) {
        var compareObj = productCompareNew.getCompareObj();
        productCompareNew.delCompareObj(productCode, compareObj);
        productCompareNew.initCompareBar(compareObj);
    },
    clear: function() {
        $.newegg.cookie.clear('ProductCompare', { topdomain: true });
        productCompareNew.initCompareBar(null);
    },
    toCompare: function(url) {
        var compareObj = productCompareNew.getCompareObj();
        if (compareObj == null) {
            return;
        }

        var currentList = compareObj.ProductList;
        var query = "?Item=";
        var len = currentList.length;

        if (len < 2) {
            alert(productCompareNew.mustSelect);
            return;
        }

        $.each(currentList, function(i, n) {
            if (i + 1 == len) {
                query += n.code;
            }
            else {
                query += n.code + ','
            }
        });

        window.location = url + query;
    },
    delCompareLink: function(url, categoryID, productCode) {
        var compareObj = productCompareNew.getCompareObj();
        productCompareNew.delCompareObj(productCode, compareObj);
        window.location = url;
    }
}

/*Search和小类页面隐藏筛选Item*/
function doHideDim(index){
    $("#dimfilter" + index).find("a[ref1=" + index + "]").hide();
    $("#dimfilter" + index).find("div").removeClass('inner innerNoCollapse').addClass('inner');
$("#showdimfilter"+index).show();
$("#hidedimfilter"+index).hide();
}

/*Search和小类页面显示筛选Item*/
function doShowDim(index){
    $("#dimfilter" + index).find("a[ref1=" + index + "]").show();
    $("#dimfilter" + index).find("div").removeClass('inner ').addClass('inner innerNoCollapse');
$("#showdimfilter"+index).hide();
$("#hidedimfilter"+index).show();
}

/*Search和小类页面隐藏筛选ItemList*/
function doHideDimList(cookiekey,cookieid){
$("li[ref1='listHidden']").hide();
$("#ShowDimList").show();
$("#HideDimList").hide();
var jsonObject = JSON.parse('{"'+cookiekey+'":"0"}');
$.newegg.cookie.set("ProductLayOut",jsonObject);
jsonObject = JSON.parse('{"ExpandID":"'+cookieid+'"}');
$.newegg.cookie.set("ProductLayOut",jsonObject);
}

/*Search和小类页面显示筛选ItemList*/
function doShowDimList(cookiekey,cookieid){
$("li[ref1='listHidden']").show();
$("#ShowDimList").hide();
$("#HideDimList").show();
var jsonObject = JSON.parse('{"'+cookiekey+'":"1"}');
$.newegg.cookie.set("ProductLayOut",jsonObject);
jsonObject = JSON.parse('{"ExpandID":"'+cookieid+'"}');
$.newegg.cookie.set("ProductLayOut",jsonObject);
}

//function initDimList(cookiekey,cookieid){
//var style =  $.newegg.cookie.get("ProductLayOut", cookiekey);
//var curcookieid = $.newegg.cookie.get("ProductLayOut","dimcookieid");
//if(cookieid == curcookieid)
//{
//    if(style == '1')
//    {
//        $("li[ref1='listHidden']").show();
//		$("#ShowDimList").hide();
//		$("#HideDimList").show();
//    }
//    else if(style == '0')
//    {
//        $("li[ref1='listHidden']").hide();
//		$("#ShowDimList").show();
//		$("#HideDimList").hide();
//    }
//    else
//    {
//        $("li[ref1='listHidden']").hide();
//		$("#ShowDimList").show();
//		$("#HideDimList").hide();
//    }
//}
//else
//{
//	$("li[ref1='listHidden']").hide();
//	$("#ShowDimList").show();
//	$("#HideDimList").hide();
//	var jsonObject = JSON.parse('{"dimcookieid":"'+cookieid+'"}');
//	$.newegg.cookie.set("ProductLayOut",jsonObject);
//	jsonObject = JSON.parse('{"'+cookiekey+'":"0"}');
//	$.newegg.cookie.set("ProductLayOut",jsonObject);
//}
//}


/*Search和小类页面在结果中搜索初始化*/
function initWithinSearch(){
$("#iptSeachWithin").keydown(function(event){
    if(event.keyCode==13) {
        doWithinSearch();
         }
    });
}

/*提交search页面poll*/
function submitPollData(pollSysNo,pollDivId){
var pollResultInfo = {};
pollResultInfo.PollSysNo = pollSysNo;
var pollItems = $("#" + pollDivId +" input:checked");    
pollResultInfo.ResultItemList = getPollResultItemList(pollItems, false);
pollItems = $("#" + pollDivId).find("textarea");    
pollResultInfo.ResultItemList = pollResultInfo.ResultItemList.concat(getPollResultItemList(pollItems, true));     

var formData = {tempForm1Content : JSON.stringify(pollResultInfo)};
	var url=$.newegg.buildWWW("Ajax/Common/AjaxPollResult.aspx");
	$.post(url,formData,
	    function(data){
    	    $(".centerPopA").hide();
		    $("#popBack").css({opacity:"0"});
		    $("#popBack").show();
		    $("#popPollResultPrompt").show();
		    letCenter('popPollResultPrompt');
		    $(".shuter").click(function(){
			    $("#popPollResultPrompt").hide();
			    $("#popBack").hide();
		    });
        },
	"json");
}

//Search无结果页 热卖商品JS
var slideProA = function() {
	var obj;
	var cell;
	var step;
	var total;
	var btnPre;
	var btnNext;
	var stepTime;
	var currLeft;
	var self = this;
	var dir;
	
	this.loading = function(o,num,moveStep,time, isAutoPlay, autoTime) { /*参数：包围对象id，每屏显示数量，每次滚动数量，滚动时间,是否自动滚动,自动滚动间隔时间*/
		obj = $("#" + o);
		cell = $("#" + o + " .moveable .itemCell");
		stepTime = time;
		step = moveStep;
		total = cell.length;
		btnPre = $("#" + o + " .pre");
		btnNext = $("#" + o + " .next");
		autoFilledKeywords.clickObj = btnNext[0];

		currLeft = 0;
		dir = "right";
		screenNum = num
		
		if(total <= screenNum) {
			btnPre.addClass("preDisable");
			btnNext.addClass("nextDisable");
		}
		else {
			//点击向右滚动按钮
			btnNext.click(function() {
				dir = "right";
				self.moveCell();
				currLeft = currLeft + step;
				if(currLeft >= total) {
					currLeft = 0;
					self.showAll();
				}
			});
			
			//点击向右滚动按钮
			btnPre.click(function() {
				currLeft = currLeft - step;
				dir = "left";
				if(currLeft <= 0-step) {
					currLeft = total - step;
					self.hideAll();
					self.moveCell();
				}
				else {
					self.moveCell();
				}
			});
			
			//自动播放
			if(isAutoPlay == true) {
				var autoPlay = setInterval(function(){
					btnNext.click();
				},autoTime);
				obj.mouseenter(function(){
					clearInterval(autoPlay);
				});
				obj.mouseleave(function(){
					autoPlay = setInterval(function(){
						btnNext.click();
					},autoTime);
				});
			}
		}
	}
	
	this.showAll = function() { /*显示全部单元*/
		cell.fadeIn(stepTime);
	}
	this.hideAll = function() { /*隐藏全部单元*/
		cell.fadeOut(stepTime);
	}
	
	this.moveCell = function() { /*滚动缩略图*/
		if(dir == "right") {
			for(i=currLeft;i<=currLeft+step-1;i++) {
				cell.eq(i).fadeOut(stepTime);
			}
		}
		else {
			for(i=currLeft;i<=currLeft+step-1;i++) {
				cell.eq(i).fadeIn(stepTime);
			}
		}
	}
}

//获取url参数值
function GetRequest(paras){
	var url = location.href;  
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");  
	var paraObj = {}  
	for (i=0; j=paraString[i]; i++){  
	paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);  
	}  
	var returnValue = paraObj[paras.toLowerCase()];  
	if(typeof(returnValue)=="undefined"){  
	return "";  
	}else{  
	return returnValue; 
	}
}


var GetSIMNum=function(){	
	this.InitSelectPhone=function() {
	     var allTR=$(".numList tr");
         allTR.each(function(){     
			 var input=$(this).find("input");
			 if(input.length)
			 {
				 $(this).click(function(){
					$(".selNum .curr ").each(function(){
					   $(this).removeClass("curr");
					})
					input.attr("checked",true);
				    if(input.attr("checked")==true)
				    {
				       $(this).addClass("curr");
				    }
				 })
			 }
        }) 
        var phoneNumber=GetRequest("PhoneNumber");       
        if(phoneNumber.length)
        {
          var payType=GetRequest("SuitType");
          var phoneInput= $("#hasTab4_"+(payType=="pre"?"1":"2")+" [ref1='"+phoneNumber+"']");
          if(phoneInput.length)
          {
             phoneInput.parent().parent().addClass("curr");
             phoneInput.attr("checked",true);
          }
        }
	    var PhoneRule=GetRequest("PhoneRule"); 
	    if(PhoneRule.length)
	    {
           $(".tabHeadH .cmnSelect").val(PhoneRule);
        }
	  }
	  
	this.ChangeRule=function(){
	   var payType=($("#prepaid.currentBtn").length>0?"pre":"after");
	   var rule=$(".tabHeadH .cmnSelect :selected").val();
	   window.location.href=$.newegg.buildWWW("Product/SIMGetNum.aspx?PhoneRule="+rule+"&SuitType="+payType)+"#hasTab4";
	}
	
	this.NextStep=function(){
        var phoneID;
        var page;
	    var hasChecked=false;
	    $(($("#prepaid.currentBtn").length>0?"#hasTab4_1":"#hasTab4_2")+" .selNum").find("input").each(function(i){
            var isChecked= $(this).attr("checked");
            if(isChecked == true)
            {
                phoneID = $(this).attr("ref1");
                hasChecked = true;
            }
        });
        
        if(hasChecked == false)
        {
            alert(resources_SIMGetNum.selectNone);
            return;
        }
        page=$(".pageNav .curr:first").find("span").text();
        if($("#prepaid.currentBtn").length)
        {
           window.location.href=$.newegg.buildWWW("Product/SIMSelectPreSuit.aspx?PhoneNumber="+phoneID+"&page="+page);
        }
        else
        {
	        window.location.href=$.newegg.buildWWW("Product/SIMSelectAftSuit.aspx?PhoneNumber="+phoneID+"&page="+page);
        }
	}
};
/*自定义同一页面多个显示页数分页控件*/
function initPaginationBarAS(defaultText)
{
    var input=$(".pageNav :input");
    var btn=$(".pageNav").find("#btnSetShowPageNav");
    if(!input.length || !btn.length) {
        return;
    }
    
	input.focus(function(){
		$(this).parent().find("#btnSetShowPageNav").show();
	});
	input.blur(function(){
		if($(this).val() == "" || $(this).val() == defaultText) {
			$(this).parent().find("#btnSetShowPageNav").hide();
		}
	});
	
	btn.click(function(){
		var url =$(this).parent().find("#btnSetShowPageNav").attr("ref1");
		var qty = $.trim($(this).parent().find("#setShowPageNav").val());
		var page = parseInt(qty,10);
		var number = 1;
		var regexNumber = /^[0-9]*[1-9][0-9]*$/; 
		
		if(regexNumber.test(qty) == false || isNaN(page) == true || page <= 0)
        {
			number = 1;
        }
        else if( page> 9999)
        {
            number = 9999;
        }
        else
        {
            number = page;
        }
        
		url = url.replace("paramPageNumber",number);
		window.location.href=url;
		return false;
	});
}
var simCardSuit={
    post:function(data,productsysNo,type){
  		$("#replaceNum").hide();
        var urlHold = $.newegg.buildWWW("ajax/Shopping/HoldPhoneNumber.aspx");
        $.post(urlHold ,data, function(result) {
                    if (result.Type == "2") {
                        switch(result.Description){
                            case "Tag:Login":
                            var returnUrl = $.newegg.buildCurrent("Product/SIMSelect"+type+"Suit.aspx?"+data+"#Hold");
                            window.location.href=$.newegg.buildSSL("Customer/Login.aspx")+"?ReturnUrl="+encodeURIComponent(returnUrl);
                                break;
                            case "Redirect":
                                location.href = result.Data;
                                break;
                            case "HoldFailed":
                                simCardSuit.popHoldNumberNotice("preeNumfail");
                                break;
                            case "ExistHoldNumber":
                                $("#oldphonenumber").html(result.Data);
                                simCardSuit.popreplaceNumNotice("replaceNum");
                                break;
                        }
                    }else if(result.Type == "0"){
                        location.href = $.newegg.buildWWW("shopping/shoppingcart.aspx"+"?"+"action=Add&productno="+result.Data);
                    }
                  }, 
                  "json");
    },
    addShoppingCart:function(productsysNo,type){
        var phoneNumber = $("#phoneNo").text();
        var suitID = $("#selectPanel input[type=radio][name=comboNum]:checked").val();
        var suitName = $("#selectPanel input[type=radio][name=comboNum]:checked").next().html();
        var firstMonth = $("#firstMonth input[type = radio]:checked").val();
        var data = "SuitID=" +suitID + "&PhoneNumber=" + phoneNumber + "&ProductsysNo=" + productsysNo + "&SuitName=" + escape(suitName) + "&FirstMonth=" + firstMonth;
		
		$("#waitPanel").css("visibility", "visible");
        
        simCardSuit.post(data,productsysNo,type);
    },
    initHoldAction:function(productsysNo,type){
        var action = location.hash;
        if(action=="#Hold")
        {   
            location.hash = "";
            simCardSuit.addShoppingCart(productsysNo,type);
        }
    },
    popHoldNumberNotice:function (o) {
	var popup = $("#" + o);
		$("#popBack").css({opacity:"0"});
		$("#popBack").show();
		popup.show();
		$("#replaceNum").hide();
		letCenter(o);
		$("#waitPanel").css("visibility", "hidden");
		$(".shuter").click(function(){
			popup.hide();
		$("#waitPanel").css("visibility", "hidden");
			$("#popBack").hide();
		});
    },
    popreplaceNumNotice:function(o){
	var popup = $("#" + o);
		$("#popBack").css({opacity:"0"});
		$("#popBack").show();
		popup.show();
		$("#preeNumfail").hide();
		letCenter(o);
		$(".shuter").click(function(){
		popup.hide();
		$("#waitPanel").css("visibility", "hidden");
		$("#popBack").hide();
		});
    },
    tabswitch:function(index){
    var tableid = "#hasTab4_"+index;
        $(tableid + " input[type=radio]:first").attr("checked",true);
    },
    changeNumber:function(){
    var phoneNumber = $("#phoneNo").text();
    var suitID = $("#selectPanel input[type=radio][name=comboNum]:checked").val();
    var suitName = $("#selectPanel input[type=radio][name=comboNum]:checked").next().html();
    var firstMonth = $("#firstMonth input[type = radio]:checked").val();
    var data = "SuitID=" +suitID + "&PhoneNumber=" + phoneNumber + "&ProductsysNo=" + productsysNo + "&SuitName=" + escape(suitName) + "&FirstMonth=" + firstMonth;
        simCardSuit.post(data+'&ChangeNumber=true','<%=ProductPreSuit%>','Pre');
    }
};

var productImage = {
    ChangePic: function(img) {
        $(".thumb>ul>li>a").removeClass("current");
        $(".thumb>ul>li>a").removeClass("curr");
        $(img).parent().addClass("current");
    },
    ChangeBigPic: function(img, total) {
        $("#btnPaging").show();
        $("#bigImg").show();
        $("#vedioOr360").empty().hide();

        productImage.ChangePic(img);
        var curIndex = parseInt($(img).attr("index"));

        if (curIndex >= 0) {
            $("#btnPaging").show();
        }

        $("#bigImg").attr("src", $(img).attr("ref1"));
        $("#bigImg").attr("index", curIndex)

        $("#btnPrev").removeClass();
        $("#btnNext").removeClass();

        if (curIndex == 0 && curIndex == total - 1) {
            $("#btnPrev").addClass("prevStop");
            $("#btnNext").addClass("nextStop");
        }
        else if (curIndex == 0) {
            $("#btnPrev").addClass("prevStop");
            $("#btnNext").addClass("next");
        }
        else if (curIndex == total - 1) {
            $("#btnPrev").addClass("prev");
            $("#btnNext").addClass("nextStop");
        }
        else {
            $("#btnPrev").addClass("prev");
            $("#btnNext").addClass("next");
        }
    },
    ChangeBigPic2: function(img) {
        var jBigImg = $("#bigImg"),
            jImg = $(img),
            jImgParent = jImg.parent(),
            curIndex = parseInt(jImg.attr("index")),
            src = jImg.attr("ref1");

        jImgParent.addClass("current").siblings().removeClass("current");
        jImgParent.parent().addClass("current").siblings().removeClass("current");
        jBigImg
            .attr("src", src)
            .attr("index", curIndex)
            .hide()
            .fadeIn(800);
    },
    MovePrev: function(total) {
        var curIndex = parseInt($("#bigImg").attr("index"));
        if (curIndex == 0) {
            return;
        }

        var prevIndex = curIndex - 1;

        $(".thumb>ul>li>a>img").each(function() {
            if (parseInt($(this).attr("index")) == prevIndex) {
                productImage.ChangePic(this);
                productImage.ChangeBigPic(this, total);
            }
        });


    },
    MoveNext: function(total) {
        var curIndex = parseInt($("#bigImg").attr("index"));
        if (curIndex == total - 1) {
            return;
        }
        var nextIndex = curIndex + 1;
        $(".thumb>ul>li>a>img").each(function() {
            if (parseInt($(this).attr("index")) == nextIndex) {
                productImage.ChangePic(this);
                productImage.ChangeBigPic(this, total);
            }
        });
    },
    Init: function() {
        $(".thumb>ul>li>a").removeClass("current");
        $(".thumb>ul>li>a").removeClass("curr");
        $("#btnPaging").hide();
        $("#bigImg").hide();
        $("#vedioOr360").show();
    },
    Change360: function(show, url) {
        productImage.Init();
        $($(show)[0]).addClass("curr");
        $("#vedioOr360").empty().append('<embed height="520" width="640" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="' + url + '"></embed>');
    },
    ChangeVedio: function(video, url) {
        productImage.Init();
        $($(video)[0]).addClass("curr");
        $("#vedioOr360").empty().append('<div style="height:115px;"></div><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="462" height="255"><param name="movie" value="http://c1.neweggimages.com.cn/NeweggPic2/Marketing/201005/Midea/player.swf?vcastr_file=' + url + '&IsAutoPlay=1&IsContinue=1"><param name="quality" value="high"><param name="allowFullScreen" value="true" /><param name="IsAutoPlay" value="0" /><embed src="http://c1.neweggimages.com.cn/NeweggPic2/Marketing/201005/Midea/player.swf?vcastr_file=' + url + '&amp;IsAutoPlay=1&amp;IsContinue=1" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="462" height="255"></embed></object>');
    }
};

/*配件查询*/
var accessoriesQuery = {
    Init:function()
    {
        if($("#AccessoriesQuery").length == 0 || parseInt(accessoriesMasterSysNo) < 1) return;         

        if(typeof(listArray) == "undefined") 
        {
            $("#AccessoriesQuery").parent().hide();
            return;
        }        
        var option = "<option value=\"{0}\">{1}</option>";
        
        //判断是否树型显示
        if(accessoriesIsTreeQuery.toLowerCase() == "n")
        {
            //平级绑定查询条件
            $("#AccessoriesQuery .selecter").each(function(i){
                var list = "";
                for(var a in listArray[i])
                {
                    list += $.newegg.format(option, a, listArray[i][a]);
                }
                $(this).find("option:gt(0)").remove();
                $(this).append(list);
                $(this).removeClass("selecter");
                $(this).addClass("selecter");
            });
            accessoriesQuery.BindDefaultCondition();
        }
        else 
        {         
            //默认绑定第一个列表，操作当前列表同时绑定下一个列表的Change事件，初始化(当前列表).next().all()列表的选项值，以此类推
            var list = "";
            for(var a in listArray[0])
            {
                list += $.newegg.format(option, a, listArray[0][a]);
            }
            var obj = $("#AccessoriesQuery .selecter:eq(0)");
            obj.find("option:gt(0)").remove();
            obj.append(list);
            obj.removeClass("selecter");
            obj.addClass("selecter");
            accessoriesQuery.BindDefaultCondition();
             $("#AccessoriesQuery .selecter").each(function(i){
                //绑定Change事件
                $(this).change(function(){
                    accessoriesQuery.Change($(this),null,i);
                });
            });   
        }
        
    },
    Change:function(obj,optionobj,i)
    {
        var option = "<option value=\"{0}\">{1}</option>";
        //最后一个直接返回，不绑定        
        var listLen = $("#AccessoriesQuery .selecter").length - 1;

        if(i >= listLen) return false;
        var val;
        if(optionobj==null){val=obj.val();
        }else{
           val=optionobj.val();
        }     
        var list = "";
        for(var a in listArray[i + 1][val])
        {
            list += $.newegg.format(option, a, listArray[i + 1][val][a]);
        }
        obj.next().find("option:gt(0)").remove();
        obj.next().append(list);
        obj.removeClass("selecter");
        obj.addClass("selecter");
        //初始化后面选项值
        $("#AccessoriesQuery .selecter").each(function(del){
           if((del - 1) > i)
           {
               $(this).find("option:gt(0)").remove();
           }
        }); 
    },
    Search:function(links)
    {
        if(parseInt(accessoriesMasterSysNo) < 1) return;
        
        var cvalue = "";
        if(accessoriesIsTreeQuery.toLowerCase() == "n")
        {
            $("#AccessoriesQuery .selecter").each(function()
            {
                if(this.value != 0)
                    cvalue += this.value + "-";
            });            
            if(cvalue == "")
            {
                alert(resources_Accessories.ProductSearch_SearchConditionError);
                return;
            }            
            cvalue = cvalue.substring(0, cvalue.length - 1);
        }
        else
        {
            var lastval = $("#AccessoriesQuery .selecter:last").val();            
            if(lastval == 0)
            {
                var isError = false;
                $("#AccessoriesQuery .selecter").each(function()
                {
                    if(this.value == 0)
                    {
                        alert($(this).find("option[value=" + this.value + "]").text());
                        isError = false;
                        return false;
                    }
                    isError = true;
                });
                if(isError == false) return;
            }
            
            $("#AccessoriesQuery .selecter").each(function()
            {
                cvalue += this.value + "|";
            });
            cvalue = cvalue.substring(0, cvalue.length - 1);            
        }
        var url = "";
        if(links == 0)
        {
            url = window.location.href.split("?")[0].split("#")[0] + $.newegg.querystring.set("CValue",cvalue);
        }
        else
        {
            url =accessoriesURL.replace("AccessorieMasterSysNo",accessoriesMasterSysNo).replace("AccessorieCValue",cvalue) ;
        }            
        window.location.href = url;
        return false;
    },
    BindDefaultCondition:function()
    {
        if(parseInt(accessoriesMasterSysNo) < 1) return;
        var cvalue = unescape($.newegg.querystring.get("CValue"));
        if(cvalue == "") return;
        
        if(accessoriesIsTreeQuery.toLowerCase() == "n")
        {
            cvalue = cvalue == "" ? "" : cvalue.split("-");
            var defaultValue = "";
            for(var i = 0; i < cvalue.length; i++)
            {
                $("#AccessoriesQuery .selecter").each(function()
                {
                    var temp = $(this).find("option[value=" + cvalue[i] + "]");
                    if(temp.length > 0)
                    {
                        //temp.attr("selected","selected");
                        temp[0].setAttribute("selected", "selected");
                        //以中括号分割，以免和值中的某项符号重复
                        defaultValue += temp.text() + "[]";
                        return false;
                    }
                });
            }
            defaultValue = defaultValue.split("[]");
            for(var i = 0; i < cvalue.length; i++)
            {
                $("#CValue" + cvalue[i]).html(defaultValue[i]);
            }
        }
        else
        {
        
            cvalue = cvalue == "" ? "" : cvalue.split("|");
            var defaultValue = "";
         
           for(var i = 0; i < cvalue.length; i++)
            {     
                                  
                var temp = $("#AccessoriesQuery .selecter:eq(" + i + ") option[value=" + cvalue[i] + "]");                  
                temp[0].setAttribute("selected", "selected");
                accessoriesQuery.Change($("#AccessoriesQuery .selecter:eq(" + i + ")"),temp, i);
                defaultValue = defaultValue + temp.text() + "-";                
                
            }            
            defaultValue = defaultValue.substring(0, defaultValue.length - 1);
            $("#CValue" + cvalue[cvalue.length - 1]).html(defaultValue);
        }
    }
}
var UnicomContractPhone={
    url:'',
    oldPhoneNumber:0,
    phoneNumber:0,
    productNo:0,
    suitID:0,
    SIMCardSysNo:0,
    changePhoneRule:function(obj)
    {
        window.location.href=$.newegg.buildWWW("Product/ContractPhoneNumber.aspx?PhoneRule="+obj.val()+"&productno="+$.newegg.querystring.get("productno")+"&SuitID="+$.newegg.querystring.get("SuitID"));
    },
    addNumberToHold:function(obj,url,checkOutTimer)
    {
        if(!UnicomContractPhone.checkData())
        {
            return;
        }
        var isCheck = $('#treaty :radio:checked').length;
        if(!isCheck) 
	    {
	        alert(resources_ContractPhoneNumber.selectNone);
	        return false;
	    }
        UnicomContractPhone.url=url;
        if(mini.enable){
	        mini.returnUrl = url+"?productno="+UnicomContractPhone.productNo+"&SuitID="+UnicomContractPhone.suitID+"&PhoneNumber="+UnicomContractPhone.phoneNumber+"&PhoneRule="+$.newegg.querystring.get("PhoneRule")+"&page="+$.newegg.querystring.get("page")+"#treaty";
	        if(mini.checkLogin(obj,checkOutTimer))
	            UnicomContractPhone.AsynCall(obj, url);  
	    }
	    else{
	        UnicomContractPhone.AsynCall(obj, url);  
	    }
	    return false;
    },
   AsynCall:function(obj, url)
    {

        if(UnicomContractPhone.checkData())
        {
            $("#waitPanel").css("visibility", "visible");
            UnicomContractPhone.post('next');
        }
    },
    
    checkData:function()
    {
        var isCheck = $('#treaty :radio:checked').length;
        var productNo=$.newegg.querystring.get("productno")||0;
        var suitID=$.newegg.querystring.get("SuitID")||0;
        var phoneNumber=$('#treaty :radio:checked').next().text()||0;
        var simCardSysNo=$('#treaty :radio:checked').val()||0;
        if(productNo&&suitID&&phoneNumber&&simCardSysNo)
        {
            UnicomContractPhone.productNo=productNo;
            UnicomContractPhone.suitID=suitID;
            UnicomContractPhone.phoneNumber=phoneNumber;
            UnicomContractPhone.SIMCardSysNo=simCardSysNo;
        }
	    if(!isCheck) 
	    {
	        alert(resources_ContractPhoneNumber.selectNone);
	        return false;
	    }
	    if(!suitID)
	    {
	        alert(resources_ContractPhoneNumber.ContractPhone_SelectSuit_PleaseSelectSuit);
	        return false;
	    }
	    return true;
    },
    
    post:function(options){
  		$("#replaceNum").hide();
  		
        var urlHold = $.newegg.buildWWW("ajax/Shopping/ContractPhoneHoldPhoneNumber.aspx?productno="+UnicomContractPhone.productNo+"&SuitID="+UnicomContractPhone.suitID+"&PhoneNumber="+UnicomContractPhone.phoneNumber+"&SIMCardSysNo="+UnicomContractPhone.SIMCardSysNo+"&options="+options+"&r="+Math.random());
        $.get(urlHold , function(result) {
                    if (result.Type == "2") {
                        switch(result.Description){
                            case "Redirect":
                                location.href = unescape(result.Data);
                                break;
                            case "HoldFailed":
                                UnicomContractPhone.popHoldNumberNotice("preeNumfail");
                                break;
                            case "ExistHoldNumber":
                                $("#oldphonenumber").html(unescape(result.Data));
                                UnicomContractPhone.oldPhoneNumber=result.Data;
                                UnicomContractPhone.popreplaceNumNotice("replaceNum");
                                break;
                        }
                    }else if(result.Type == "0"){
                        location.href = unescape(result.Data);
                    }
                  }, 
                  "json");
    },
    popreplaceNumNotice:function(o){
	    var popup = $("#" + o);
		$("#popBack").css({opacity:"0",width:"300px"});
		$("#popBack").show();
		popup.show();
		$("#preeNumfail").hide();
		letCenter(o);
		$(".shuter").click(function(){
		popup.hide();
		$("#waitPanel").css("visibility", "hidden");
		$("#popBack").hide();
		});
    },
    changeNumber:function(options){
        UnicomContractPhone.post(options);
    },
    popHoldNumberNotice:function (o) {
	var popup = $("#" + o);
		$("#popBack").css({opacity:"0"});
		$("#popBack").show();
		popup.show();
		$("#replaceNum").hide();
		letCenter(o);
		$(".shuter").click(function(){
		popup.hide();
		$("#waitPanel").css("visibility", "hidden");
			$("#popBack").hide();
		});
		$("#preeNumfail .btnLine a").click(function(){
		popup.hide();
		$("#waitPanel").css("visibility", "hidden");
		$("#popBack").hide();
		});		
    }
   
};