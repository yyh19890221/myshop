$(function(){
	// 顶部图片滚动
	UI.Xslider(".topbanner", {
        scrollObj: ".mover",
        autoScroll: 10000,
        showNav: ".nav li",
        beforeStart: function(e) {
            $.newegg.imgLoad.quickLoad(e.next);
        }
    });
	
	$(".category .prolist > li:nth-child(4n)").addClass("noBorder");
	
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
        return false;
    });
	
});