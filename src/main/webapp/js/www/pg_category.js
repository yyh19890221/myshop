// JavaScript Document
var MyShop = MyShop || {}
MyShop.StoreInit = function() {

    /*
    Category 1
    */
    UI.Xslider(".topbanner", {
        scrollObj: ".mover",
        autoScroll: 10000,
        showNav: ".nav li",
        beforeStart: function(e) {
            $.newegg.imgLoad.quickLoad(e.next);
        }
    });

    //Float Online CS
    (function() {
        var top = $(".online_cs").length && $(".online_cs").offset().top,
sctop;
        function moveOnlineCS() {
            sctop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
            top = document.documentElement.clientHeight / 2 - 72;
            sctop += top;
            sctop = sctop >= 200 ? sctop : 200;
            $(".online_cs").css({
                left: document.documentElement.scrollLeft + document.documentElement.clientWidth - 22,
                top: sctop
            });
        }
        moveOnlineCS();
        $(window).bind("scroll resize", function() {
            moveOnlineCS();
        });
    })();

    /*
    Category 2
    */
    UI.Xslider(".box_recommend");


    /*
    Category 3
    */

    //Search filterbox
    var seachtab = $(".filterbox");
    seachtab.find(".viewmore a").unbind('click').click(function() {
        var me = $(this);
        if (!me.hasClass("close")) {
            //me.addClass("close").html("隐藏更多筛选项<s></s>");
            seachtab.find(".filtertype > ul > li:gt(2)").removeClass("hidden");
        } else {
            //me.removeClass("close").html("更多筛选项<s></s>");
            seachtab.find(".filtertype > ul > li:gt(2)").addClass("hidden");
        }
    });

    seachtab.find(".filtertype > ul > li .btn_slide").each(function() {
        var me = $(this);
        if (me.prev().find("dd .innerB").height() > 46) {
            me.show().click(function() {
                var meB = $(this);
                var items = meB.prev().find("dd .inner");
                if (meB.is(".btn_close")) {
                    meB.removeClass("btn_close");
                    items.removeClass("innerNoCollapse");
                }
                else {
                    meB.addClass("btn_close");
                    items.addClass("innerNoCollapse");
                }
            });
        }
    });

    //Remove border style for those Li just on the right side by adding className "noBorder"
    $(".category .prolist > li:nth-child(4n)").addClass("noBorder");

    //select Frequently Shopping Droping List 
    /*$(".seloption").click(function() {
    var txt = $(this).toggleClass("seloptionExpand").find(".selectedoption span");
    txt.width(txt.width());
    }).mouseleave(function() {
    $(this).removeClass("seloptionExpand");
    }).find(".oplist").find("a").click(function() {
    $(this).parents(".seloption").removeClass("seloptionExpand").find(".selectedoption span").text($(this).text());
    return false;
    });*/
    var popPlane = $(".addPlane").hide();
    $(".prolist .selectedoption").unbind('click').click(function() {
        var me = $(this);
        var po = me.offset();
        if (me.attr("ref") == 1) {
            showPopPlane($(".failedPlane"), po)
        } else {
            showPopPlane(popPlane, po);
        }
        popPlane.find(".inputp").hide();
        popPlane.find(".inputtext").show();
        popPlane.find(".twoBtn").hide();
        return false;
    })
    $(document).unbind('click').click(function(e) {
        var t = e.target;
        if ($(t).parents(".popPlane").length == 0) {
            $(".popPlane").hide();
        }
    })
    var showPopPlane = function(pwin, po) {
        $(".popPlane").css({ left: po.left, top: po.top + 18 - $("#main").offset().top }).hide();
        pwin.show();
    }
    popPlane.find(".inputtext a").unbind('click').click(function() {
        popPlane.find(".inputp").show();
        popPlane.find(".inputtext").hide();
        popPlane.find(".twoBtn").show();
        return false;
    });
    popPlane.find(".btnCancel").unbind('click').click(function() {
        popPlane.find(".inputp").hide();
        popPlane.find(".inputtext").show();
        popPlane.find(".twoBtn").hide();
        //popPlane.hide();
        return false;
    })
    $(".popPlane .btnOK").click(function() {
        $(".popPlane").hide();
    })
    popPlane.find(".listPlane li").click(function() {
        popPlane.hide();
        $(".successPlane").show();
    })


    //category_ABCD...;
    //Page buy
    $(".cate_box li").hover(
		function() {
		    $(this).addClass("cur");
		},
		function() {
		    $(this).removeClass("cur");
		}
	);
    //	.click(function() {
    //	    //Click to load new section content and show it
    //	    if ($(this).parents(".panel_wrap").length != 0 && !$(this).hasClass("added")) {
    //	        $(this).addClass("added");
    //	        //Demo: Slide Down 
    //	        $(".section_add").slideDown(1000, function() {
    //	            var $this = $(this);
    //	            $this.find(".close").click(function() {
    //	                removeMySection($this);
    //	                $this = null;
    //	            });
    //	        });
    //	        //Real Ajax Events Here, to load new section data ....
    //	        //$.ajax();
    //	    }
    //	    else if ($(this).parents(".mylist").length != 0 && !$(this).hasClass("removed")) {
    //	        //click to hide | remove section	
    //	        $(this).addClass("removed");
    //	        //Demo: Slide Up | Remove 
    //	        removeMySection($(".section3:not(.cate_box):not(.section_add):first"));
    //	    }
    //	});

    //Click "X" to hide | remove section content
    //Init Prolist Slide for existing list
    (function() {
        var proCell = $(".section3 .prolist:first li:first");
        var w = proCell.outerWidth(); //width + padding
        UI.Xslider(".section3 .cont", {
            unitLen: w,
            numtoMove: 4
        });
    })();


    //Compare
    $("#close .btnCloseBar").unbind('click').click(function() {
        $(this).parent().parent().hide();
        $("#compare").hide();
        $("#extend").show();
    });
    $("#extend .btnExtended").unbind('click').click(function() {
        $(this).parent().parent().hide();
        $("#compare").show();
        $("#close").show();
    });

};

//在大类页面设置自定义我的快消品购物列表
var WMCategory = {
    SetMyBrand: function(obj, brandID) {

        var setvalue = $(obj).text();
        var storeSysNo = $('#StoreSysno').val();

        if (! ~ ~brandID || ! ~ ~storeSysNo)
            return;

        var searchNum = "brand" + brandID;

        if (WMCategory.MoveElement(searchNum) == false) {
            return;
        }

        if ($(obj).attr('hold') == 'on') {
            return;
        }
        $(obj).attr('hold', 'on');

        var item = "<li id='{2}' value='{2}'><a title='{0}' onclick=\"WMCategory.DeleteMySelected('#{2}', {1}, 'brand');\" href=\"javascript:void(0);\"><span>{0}</span></a><li>";
        item = $.newegg.format(item, setvalue, brandID, searchNum);
        $('.mylist .cls').prepend(item);

        $.ajax({
            type: "get",
            dataType: "html",
            url: $.newegg.buildWWW("Ajax/Product/AjaxStoreSearchByCategoryAndBrand.aspx"),
            timeout: 30000,
            data: { data: escape(setvalue), id: brandID, mode: 1, store: storeSysNo },
            cache: false,
            beforeSend: function(XMLHttpRequest) {
                $('#loading').show();
            },
            complete: function(XMLHttpRequest, textStatus) {
                $('#loading').hide();
            },
            success: function(data, textStatus) {
                if (data.length > 0) {
                    $('.pagebuy .loading').after(data);
                    MyShop.StoreInit();
                }
                $(obj).attr('hold', '');
            },
            error: function() {
                $(obj).attr('hold', '');
            }
        });
    },
    SetMyCategory: function(obj, categoryID) {
        var setvalue = $(obj).text();
        var storeSysNo = $('#StoreSysno').val();

        if (! ~ ~categoryID || ! ~ ~storeSysNo)
            return;

        var searchNum = "category" + categoryID;

        if (WMCategory.MoveElement(searchNum) == false) {
            return;
        }

        if ($(obj).attr('hold') == 'on') {
            return;
        }
        $(obj).attr('hold', 'on');

        var item = "<li id='{2}' value='{2}'><a title='{0}' onclick=\"WMCategory.DeleteMySelected('#{2}', {1}, 'category');\" href=\"javascript:void(0);\"><span>{0}</span></a><li>";
        item = $.newegg.format(item, setvalue, categoryID, "category" + categoryID);
        $('.mylist .cls').prepend(item);

        $.ajax({
            type: "get",
            dataType: "html",
            url: $.newegg.buildWWW("Ajax/Product/AjaxStoreSearchByCategoryAndBrand.aspx"),
            timeout: 30000,
            data: { data: escape(setvalue), id: categoryID, mode: 2, store: storeSysNo },
            cache: false,
            beforeSend: function(XMLHttpRequest) {
                $('#loading').show();
            },
            complete: function(XMLHttpRequest, textStatus) {
                $('#loading').hide();
            },
            success: function(data, textStatus) {
                if (data.length > 0) {
                    $('.pagebuy .loading').after(data);
                    MyShop.StoreInit();
                }
                $(obj).attr('hold', '');
            },
            error: function() {
                $(obj).attr('hold', '');
            }
        });
    },
    DeleteMySelected: function(obj, id, mode) {
        var delvalue = $(obj).text();
        var storeSysNo = $('#StoreSysno').val();

        if (! ~ ~id || ! ~ ~storeSysNo)
            return;

        ///移除购物列表Item
        var removeObj = $(obj);
        WMCategory.removeMySection(removeObj);

        ///移除购物列表对应Item数据
        var searchNum = mode + id;
        var searchObj = $('.pagebuy .mt15[value=' + searchNum + ']:eq(0)');

        WMCategory.removeMySection(searchObj);

        ///更新cookie
        $.ajax({
            type: "get",
            url: $.newegg.buildWWW("Ajax/Product/AjaxStoreSearchByCategoryAndBrand.aspx"),
            data: { id: id, modeforcookie: mode, store: storeSysNo, del: 1 },
            cache: false
        });
    },
    DeleteMySearchData: function(obj) {
        var removeObj = $(obj).parents(".caption").parent();
        var searchNum = removeObj.attr('value');

        $('#myShoppingList .mylist li[value=' + searchNum + '] a:eq(0)').trigger('click');
    },
    //functions to remove section
    removeMySection: function(o) {
        o.slideUp(500, function() {
            o.remove();
            o = null;
            //Real Ajax Events Here, to remove old section data ....
            //$.ajax();
        });
    },
    MoveElement: function(searchNum) {
        var listObj = $('#' + searchNum + ':eq(0)'); //$('#myShoppingList .mylist li[value=' + searchNum + ']:eq(0)');
        var searchObj = $('.pagebuy .mt15[value=' + searchNum + ']:eq(0)');
        
        if (listObj.length > 0 && searchObj.length > 0) {
            $('#myShoppingList .mylist .cls').prepend(listObj);
            $('.pagebuy .loading').after(searchObj);
            return false;
        }
    }
}

