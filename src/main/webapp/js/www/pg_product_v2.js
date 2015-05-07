$(function() {



    //产品缩略图滚动
    UI.Xslider(".leftImg>.navBar", {
        scrollObj: ".mover ul",
        dir: "H",
        viewedSize: 350,
        unitLen: 70,
        unitDisplayed: 5
    });

    //鼠标滑过产品缩略图切换大图
    var sLeftImg = $(".leftImg");
    sLeftImg.find(".mover a").hover(function() {
        var me = $(this);
        me.parent().addClass("curhover").siblings().removeClass("curhover");
        sLeftImg.find(".bigImg img").attr("src", me.attr("bigimg1"));
        sLeftImg.find(".bigImg a").attr("href", me.attr("bigimg2"));
    });

    //鼠标滑过大图放大镜
    var options = {
        zoomWidth: 380,
        zoomHeight: 380,

        xOffset: 15,
        yOffset: -10,
        title: false,
        showEffect: "fadein",
        hideEffect: "fadeout",
        position: "right"
    }
    $(".jqzoom").jqzoom(options);

    //配送区域下拉选项浮层
    window.expandSelect = null;
    $(".detailList .select .opener").click(function() {
        if (!!expandSelect) {
            if (expandSelect !== $(this)[0]) {
                $(expandSelect).parent().find(".openerC").hide();
                $(expandSelect).parent().removeClass("selectFocused");
            }
        }
        $(this).parent().addClass("selectFocused").find(".openerC").show();
        expandSelect = this;
    });
    $(".detailList .select .openerC .itemlist a").on("click", function() {
        var s = $(this).closest(".select");
        s.find(".opener em").text($(this).text());
        s.find(".openerC").hide();
        s.removeClass("selectFocused");

        //处理重新选 择时区也跟着发生变化
        if ($(this).text().indexOf(ProductCity.CityName) != -1) {
            var newCity = $(this).text();
            var cityInfo = $("#cityInfo").val();
            var districtInfo = "";
            if (cityInfo.length > 0) {
                var city = cityInfo.split('&');
                for (var i = 0; i < city.length; i++) {

                    if (city[i].indexOf(newCity) != -1) {
                        var list = city[i].split('_')[1];
                        if (list.length > 0) {
                            var districtInfoList = list.split('|');
                            for (var j = 0; j < districtInfoList.length; j++) {
                                districtInfo = districtInfo + "<a>" + districtInfoList[j].split('=')[0] + "</a>";
                               
                                if (j != districtInfoList.length - 1) {
                                    districtInfo = districtInfo + "<b>|</b>";
                                }
                            }
                            $(".detailList .select #district em").html(districtInfoList[0].split('=')[0]);
                        }
                    }
                }
                $("#districtList").html(districtInfo);
            }
        }
        
        $(".detailList .select #district em").html($("#district em").text());
        var productMarkArea = $("#province em").text() + "_" + $("#city em").text() + "_" + $("#district em").text() + "_" + $("#hidProductType").val();
        $.newegg.cookie.set("MarkAera", productMarkArea,{ topdomain: true, expires: 9999 });
       // $.newegg.cookie.set("DistrictInfo", districtInfo);
    });



    $(document).click(function(e) {
        var t = e.target;
        if ($(t).parents(".select").length == 0) {
            if (!!expandSelect) {
                $(expandSelect).parent().find(".openerC").hide();
                $(expandSelect).parent().removeClass("selectFocused");
            }
        }
    })


    //延保期限选择
    $(".yanbao dd input[type=radio]").removeAttr("checked").add(".yanbao dd label").bind("click", function() {
        $(".yanbao .cancelWarranty").removeClass("disabled");
    });
    $(".yanbao .cancelWarranty").click(function() {
        if ($(this).hasClass("disabled")) {
            return false;
        }
        $(this).addClass("disabled");
        $(".yanbao dd input[type=radio]").removeAttr("checked");
    });

    //Promotion Item Pop Window:促销活动标题弹层
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

    //点击"***条评论"锚点跳至"商品评论"区域
    $(".detailList .rank").click(function() {
        $($.browser.safari || document.compatMode == 'BackCompat' ? document.body : document.documentElement).animate({
            scrollTop: $("[name=commentSection]").offset().top - 95
        }, 600);
        return false; /*prevent default anchor jump*/
    });

    //点击Tab中"商品评论"锚点跳至"商品评论"区域
    $(".tabIntro [href=#commentSection]").click(function() {
        $($.browser.safari || document.compatMode == 'BackCompat' ? document.body : document.documentElement).animate({
            scrollTop: $("[name=commentSection]").offset().top - 95
        }, 600);
        return false; /*prevent default anchor jump*/
    });

    //点击Tab中"商品咨询"锚点跳至"商品咨询"区域
    $(".tabIntro [href=#consultSection]").click(function() {
        $($.browser.safari || document.compatMode == 'BackCompat' ? document.body : document.documentElement).animate({
            scrollTop: $("[name=consultSection]").offset().top - 95
        }, 600);
        return false; /*prevent default anchor jump*/
    });

    //优惠搭配、套餐商品滚动
    UI.Xslider(".RecmComboContent", {
        scrollObj: ".mover",
        viewedSize: 199 * 3,
        unitLen: 199,
        unitDisplayed: 3
    });

    $(".RecmComboContent").hover(function() {
        var $this = $(this);
        if ($this.find(".prolist li").length < 3) { return false; }
        if (this.sleepid) { clearTimeout(this.sleepid); }
        UI.laterEvent(function() { $this.find(".abtns").show(); }, 800, this);
    }, function() {
        var $this = $(this);
        if (this.sleepid) { clearTimeout(this.sleepid); }
        UI.laterEvent(function() { $this.find(".abtns").hide(); }, 800, this);
    });

    //点击优惠搭配商品中的checkbox
    $(".recmCombo .chkbox .label").on("click", function() {
        $(this).toggleClass("checked");
        var sysno = "";
        var num = 0;

        $(this).parents("ul").find(".label").each(function() {
            if ($(this).hasClass("checked")) {
                num = num + 1;
            }
        })
        $(this).parents(".RecmComboContent").next(".summary").find(".selectNum").html("已选择" + num + "件搭配商品");

        var hidSysNo = $(this).parents(".RecmComboContent").next(".summary").find(".hidSysNo").attr("title");
        hidSysNo = "," + hidSysNo + ",";

        var arr = new Array();
        arr = hidSysNo.split(',');
        var b = $(this).parents(".RecmComboContent").next(".summary").find(".finalPrice span").html();
        if ($(this).hasClass("checked")) {
            $(this).parents(".RecmComboContent").next(".summary").find(".finalPrice span").html((parseFloat(b) + parseFloat($(this).attr("title"))).toFixed(2));
            if (hidSysNo.indexOf("," + $(this).next(".hidHostSysNo").next(".SysNo").attr("title") + ",") < 0)
                hidSysNo = hidSysNo + $(this).next(".hidHostSysNo").next(".SysNo").attr("title") + ",";
        }
        else {
            $(this).parents(".RecmComboContent").next(".summary").find(".finalPrice span").html((parseFloat(b) - parseFloat($(this).attr("title"))).toFixed(2));
            hidSysNo = hidSysNo.replace("," + $(this).next(".hidHostSysNo").next(".SysNo").attr("title") + ",", ",");

        }
        hidSysNo = hidSysNo.substring(1, hidSysNo.length);
        hidSysNo = hidSysNo.substring(0, hidSysNo.length - 1);

        var params = { action: 'Add',
            productno: hidSysNo,
            quantity: 1,
            FPA: 5
        };

        var url = $.newegg.buildWWW("Shopping/ShoppingCart.aspx") + "?" + $.param(params);
        var addToHref = $(this).parents(".RecmComboContent").next(".summary").find(".btn").attr("href", url);
        $(this).parents(".RecmComboContent").next(".summary").find(".hidSysNo").attr("title", hidSysNo);



    });

    //底部“快捷添加到购物车”Bar
    if (isIE6) {
        var bottomBar = $(".bottomBar");
        $("body").append(bottomBar.clone(true));
        bottomBar.remove();
    }

    var sctop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    (sctop > 600) ? $(".bottomBar").show() : $(".bottomBar").hide();
    $(window).bind("scroll", function() {
        var st = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        (st > 600) ? $(".bottomBar").show() : $(".bottomBar").hide();
    });

    //“加入收藏”点击弹层功能：移植于一期“加放常购清单”功能
    //    var popPlane = $(".addPlane").hide();
    //    $(document).click(function(e) {
    //        var t = e.target;
    //        if ($(t).parents(".popPlane").length == 0) {
    //            $(".popPlane").hide();
    //        }
    //    });
    //    $(".buyListPlane").click(function() {
    //        var me = $(this);
    //        var po = me.offset();
    //        //popPlane.css({left:po.left,top:po.top+18}).show();
    //        popPlane.show();
    //        popPlane.find(".inputp").hide();
    //        popPlane.find(".inputtext").show();
    //        popPlane.find(".twoBtn").hide();
    //        return false;
    //    })
    //    popPlane.find(".inputtext a").click(function() {
    //        popPlane.find(".inputp").show();
    //        popPlane.find(".inputtext").hide();
    //        popPlane.find(".twoBtn").show();
    //        return false;
    //    });
    //    popPlane.find(".btnCancel").click(function() {
    //        popPlane.find(".inputp").hide();
    //        popPlane.find(".inputtext").show();
    //        popPlane.find(".twoBtn").hide();
    //        //popPlane.hide();
    //        return false;
    //    });


    //    $(".city").find("em").change(function() {
    //    $.ajax({
    //        type:"Post",
    //        url:"../",
    //        
    //        })

    //    })


});