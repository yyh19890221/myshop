// JavaScript Document
$(function() {

    /**
     * 左侧折叠菜单
     */
    if (isIE6) {
        $(".titLevel2").hover(function() {
            $(this).addClass("hover");
        }, function() {
            $(this).removeClass("hover");
        });
    }
    $(".titLevel2").click(function(e) {
        var $this = $(this);

        if ($this.next(".cateLevel3").get(0)) {
            $this.next(".cateLevel3").slideToggle();
            $this.parent(".cateLevel2").toggleClass("cateLevel2_expand");
        } else {
            window.location.href = $this.find(">a").attr("href");
        }
        // $this.addClass("active").parent(".cateLevel2").siblings(".cateLevel2").find("h2.titLevel2").not($this).removeClass("active");
        return false;
    });

    /*
    Category page topbanner
    */
    //    UI.Xslider(".topbanner", {
    //        scrollObj: ".mover",
    //        autoScroll: 10000,
    //        showNav: ".nav li"
    //    });

    /**
     * 中间滑动特效
     */
    UI.Xslider(".section_slider", {
        scrollObj: ".mover",
        numtoMove: 5,
        viewedSize: 980 + 15,
        speed: 800
    });

    //Search filterbox
    var seachtab = $(".filterbox");
    seachtab.find(".viewmore a").click(function() {
        var me = $(this);
        if (!me.hasClass("close")) {
            //me.addClass("close").html("隐藏更多筛选项<s></s>");
            seachtab.find(".filtertype:first > ul > li:gt(3)").removeClass("hidden");
        } else {
            //me.removeClass("close").html("更多筛选项<s></s>");
            seachtab.find(".filtertype:first > ul > li:gt(3)").addClass("hidden");
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

    //Order 
    $(".filter .itemCheckbox").click(function() {
        $(this).parent(".orderCell").toggleClass("orderActive");
    });


    /*
    Category Prolist Hover Effect
		
	*/
    //IE6-7
    if (isIE6 || isIE7) {
        $(".category .prolist li .inner").on("mouseenter", function() {
            if (isIE6) {
                $(this).parent("li").height($(this).outerHeight());
            }
            $(this).addClass("hover");
        }).on("mouseleave", function() {
            $(this).removeClass("hover");
        });
    }


});