$(function() {
    //顶部大广告滚动事件初始化

    var TBSlider = UI.Xslider(".topbanner", {
        scrollObj: ".mover",
        autoScroll: 10000,
        //showNav:".navwraper li",
        beforeStart: function(e) {
            $(".topbanner .nav li").removeClass("current").eq(e.goIndex - 1).addClass("current");
        }
    });

    var TBSliderNav = $(".topbanner .nav li");
    TBSliderNav.width(100 / TBSliderNav.length + "%");
    TBSliderNav.mouseenter(function() {
        var $this = $(this);
        $this.addClass("current").siblings().removeClass("current");
        TBSlider.go($this.index() + 1);

    });

    /*UI.Xslider(".topbanner .nav",{
    viewedSize:$(".topbanner .nav .navwraper").width()+1,
    stepOne:true,
    beforeStart:function(e){
    TBSlider.go(e.goto);
    }
    });*/

    //左上角的公告新闻滚动事件初始化
    UI.Xslider(".anounce", {
        autoScroll: 5000,
        speed: 400,
        loop: "cycle"
    });

    //动态向首页推荐商品列表中每个商品添加一个大的超链接
    $(".proPanel li").each(function() {
        var href = $(this).find(".title").find("a").attr("href");
        $(this).prepend('<div class="alink"><a href="' + href + '" target="_blank"></a></div>')
        $.newegg.imgLoad.loadImg([$(this)]);
    }).hover(
		function() {
		    $(this).addClass("hoverli");
		    $(this).find("img").addClass("hover");
		},
		function() {
		    $(this).removeClass("hoverli");
		    $(this).find("img").removeClass("hover");
		});

    //首页"热门Hot"左侧tab中动态切换banner
    $(".tabSection_hot .tab .tabitem").bind("mouseenter", function() {
        $(".tabSection_hot .tab .ad").find(".banner").hide().eq($(this).index()).show();
    });
    //动态向首页"热门Hot"推荐商品列表中每个商品添加一个大的超链接
    $(".tabSection_hot li").each(function() {
        var href = $(this).find(".title").find("a").attr("href");
        $(this).prepend('<div class="alink"><a href="' + href + '" target="_blank"></a></div>')
        //$.newegg.imgLoad.loadImg([$(this)]);
    }).hover(
		function() {
		    $(this).addClass("hoverli");
		    $(this).find("img").addClass("hover");
		},
		function() {
		    $(this).removeClass("hoverli");
		    $(this).find("img").removeClass("hover");
		});

    //Float Survey v2: 问卷、反馈浮层的事件
    (function() {
        var floatWrap = $(".survey_v2");

        var top = floatWrap.length && floatWrap.offset().top,
			sctop;
        function moveSurvey() {
            sctop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
            top = document.documentElement.clientHeight / 2 - 38;
            sctop += top;
            sctop = sctop >= 556 ? sctop : 556;

            floatWrap.css({
                left: document.documentElement.scrollLeft + document.documentElement.clientWidth - 31,
                top: sctop
            });
        }
        moveSurvey();

        $(window).bind("scroll resize", function() {
            moveSurvey();
        });

        //“问卷调查” 方式1：点击后展开，再点击收起
        floatWrap.find(".surv").click(function() {
            if (floatWrap.find(".feedback_panel_holder").hasClass("panel_expand")) {
                floatWrap.find(".feedback_panel_holder").animate({ width: 0 }, 300, function() {
                    $(this).removeClass("panel_expand");
                });
            }
            if (floatWrap.find(".survey_panel_holder").hasClass("panel_expand")) {
                floatWrap.find(".survey_panel_holder").animate({ width: 0 }, 300, function() {
                    $(this).removeClass("panel_expand");
                });
            } else {
                floatWrap.find(".survey_panel_holder").animate({ width: 196 }, 500).addClass("panel_expand");
            }
        });
        //"意见反馈" 方式1：点击后展开，再点击收起
        floatWrap.find(".feedback").click(function() {
            if (floatWrap.find(".survey_panel_holder").hasClass("panel_expand")) {
                floatWrap.find(".survey_panel_holder").animate({ width: 0 }, 300, function() {
                    $(this).removeClass("panel_expand");
                });
            }
            if (floatWrap.find(".feedback_panel_holder").hasClass("panel_expand")) {
                floatWrap.find(".feedback_panel_holder").animate({ width: 0 }, 300, function() {
                    $(this).removeClass("panel_expand");
                });
            } else {
                // floatWrap.find(".feedback_panel_holder").animate({width:196},500).addClass("panel_expand");
                floatWrap.find(".feedback_panel_holder").stop(true, true).animate({ width: 196 }, 500).addClass("panel_expand");
            }

        });


        /*

        //"问卷调查" 方式2：鼠标悬停展开
        floatWrap.find(".surv").hover(
        function() {
        //收起非自己的内容
        if (floatWrap.find(".feedback_panel_holder").hasClass("panel_expand")) {
        floatWrap.find(".feedback_panel_holder").animate({ width: 0 }, 300, function() {
        $(this).removeClass("panel_expand").removeClass("panel_focused");
        });
        }
        if (floatWrap[0].sleepid) {
        clearTimeout(floatWrap[0].sleepid);
        }
        floatWrap.find(".survey_panel_holder").stop(true, true).animate({ width: 196 }, 500).addClass("panel_expand");
        },
        function() { }
        );
        //"意见反馈" 方式2：鼠标悬停展开
        floatWrap.find(".feedback").hover(
        function() {
        //收起非自己的内容
        if (floatWrap.find(".survey_panel_holder").hasClass("panel_expand")) {
        floatWrap.find(".survey_panel_holder").animate({ width: 0 }, 300, function() {
        $(this).removeClass("panel_expand");
        });
        }
        if (floatWrap[0].sleepid) {
        clearTimeout(floatWrap[0].sleepid);
        }
        floatWrap.find(".feedback_panel_holder").stop(true, true).animate({ width: 196 }, 500).addClass("panel_expand");
        }
        ,
        function() { }
        );
		
        //当"意见反馈"中文本输入框获得鼠标光标焦点时，添加类名进行区分，此时鼠标移开后不收起
        floatWrap.find(".feedback_panel_holder").find("input, textarea").focus(function() {
        floatWrap.find(".feedback_panel_holder").addClass("panel_focused");
        }).blur(function() {
        floatWrap.find(".feedback_panel_holder").removeClass("panel_focused");
        });
        //当点击文档其它区域时，将显示的"意见反馈"内容收起
        $(document).click(function(e) {
        if ($(e.target).closest(".survey_v2").length == 0) {
        if (floatWrap.find(".feedback_panel_holder").hasClass("panel_expand")) {
        floatWrap.mouseleave();
        }
        }
        });
        //当鼠标移开区域时收起显示内容
        floatWrap.hover(
        function() {
        if (this.sleepid) {
        clearTimeout(this.sleepid);
        }
        },
        function() {
        UI.laterEvent(function() {
        floatWrap.find(".panel_expand").filter(":not(.panel_focused)").stop(true, true).animate({ width: 0 }, 300, function() {
        $(this).removeClass("panel_expand");
        });
        }, 1000, this);
        }
        );*/

    })();

    /**
    weibo列表和商品评论部分
    */

    //对应tab按钮中的command="initCommentList"属性，定义tab按钮显示相应内容后的回调事件
    window.initCommentList = function(tab) {
        initCommentTitle($(tab).index());
        initCommentPic_IE6($(tab).index());
    }

    //评论title事件定义:展开、收起
    function initCommentTitle(index) {
        $(".tabSection .tabc:eq(" + index + ") .comment .cTitle").each(function() {
            if ($(this).attr("data-inited") == "ready") return;
            $(this).attr("data-inited", "ready");
            var tit_toggler = $(this).next(".tit_toggler");
            var tit_wrap = $(this).parent(".cTitWrap");
            if ($(this).height() > 44) {
                tit_toggler.removeClass("tit_toggler_hidden").find("a").attr("title", "点击展开");
            }
            else {
                tit_toggler.addClass("tit_toggler_hidden").find("a").attr("title", "点击收起");
            }
            tit_toggler.find("a").click(function() {
                if ($(this).hasClass("tit_collapse")) {
                    tit_wrap.removeClass("cTitWrap_expand");
                    tit_wrap.css("max-height", 42);
                    $(this).removeClass("tit_collapse").attr("title", "点击展开");
                }
                else {
                    tit_wrap.addClass("cTitWrap_expand");
                    tit_wrap.css("max-height", 1000);
                    $(this).addClass("tit_collapse").attr("title", "点击收起");
                }
            });
        });
    }

    //初始化第一个tabc中的评论标题功能
    initCommentTitle(0);

    //IE6先预转入图片，用来判断Weibo图片的实际尺寸
    initCommentPic_IE6(0);
    initCommentPic_IE6(1);
    initCommentPic_IE6(2);

    function initCommentPic_IE6() {
        if (! -[1, ] && !window.XMLHttpRequest) {
            $(".comment li .pic_list img").each(function() {
                if ($(this).attr("data-pic-inited") == "ready") return;
                $(this).attr("data-pic-inited", "ready");
                var img = this;
                var tempImg = new Image();
                $(tempImg).attr("src", $(img).attr("src"));
                $(tempImg).load(function() {
                    var maxWidth = (this.width > 605) ? 605 : this.width;
                    //$(img).attr("data-img-realHeight",this.height);	
                    //$(img).attr("data-img-realWidth",this.width);
                    $(img).closest("li").attr("data-img-maxWidth", maxWidth);
                    $(img).closest("li").attr("data-img-thumbWidth", 100 * this.width / this.height)

                });
            });
        }
    };

    //weibo图片列表Mouseover及点击效果
    $(".comment .pic_list li").on("mouseenter", function() {
        var imgwrap = $(this);
        var img = $(this).find("img");
        if (imgwrap.find(".tip").length == 0) {
            imgwrap.prepend('<div class="tip">点击展开</div>');
        }
        imgwrap.find(".tip").show();
    }).on("mouseleave", function() {
        var imgwrap = $(this);
        imgwrap.find(".tip").hide();
    }).on("click", function() {
        var me = $(this);
        if (!me.hasClass("bigpic")) {
            //执行显示大图效果
            if (me.siblings().length != 0) {
                //当有>=2张图片时
                me.siblings(":gt(0)").hide("slow");
                me.siblings().first().hide("slow", function() {
                    /*check css3 transition*/
                    if (!!me.find("img").css("transitionProperty") ||
						!!me.find("img").css("-moz-transitionProperty") ||
						!!me.find("img").css("-webkit-transitionProperty") ||
						!!me.find("img").css("-o-transitionProperty")) {
                        me.addClass("bigpic");
                        me.find(".tip").text("点击收起").addClass("tip_collpase");
                    }
                    else {
                        if (! -[1, ] && !window.XMLHttpRequest) {
                            //IE6展开的动作
                            me.height("auto").find("img").addClass("ie6_auto_img").animate({ width: me.attr("data-img-maxWidth") }, function() {
                                me.addClass("bigpic");
                                me.find(".tip").text("点击收起").addClass("tip_collpase");
                            });
                        }
                        else {
                            //非IE6展开的动作
                            me.height("auto").find("img").animate({ maxWidth: 605, maxHeight: 2000 }, function() {
                                me.addClass("bigpic");
                                me.find(".tip").text("点击收起").addClass("tip_collpase");
                            });
                        }
                    }
                });
            }
            else {
                //当有1张图片时	
                if (!!me.find("img").css("transitionProperty") ||
					!!me.find("img").css("-moz-transitionProperty") ||
					!!me.find("img").css("-webkit-transitionProperty") ||
					!!me.find("img").css("-o-transitionProperty")) {
                    me.addClass("bigpic");
                    me.find(".tip").text("点击收起").addClass("tip_collpase");
                }
                else {
                    if (! -[1, ] && !window.XMLHttpRequest) {
                        //IE6展开的动作
                        me.height("auto").find("img").addClass("ie6_auto_img").animate({ width: me.attr("data-img-maxWidth") }, function() {
                            me.addClass("bigpic");
                            me.find(".tip").text("点击收起").addClass("tip_collpase");
                        });
                    }
                    else {
                        //非IE6展开的动作
                        me.height("auto").find("img").animate({ maxWidth: 605, maxHeight: 2000 }, function() {
                            me.addClass("bigpic");
                            me.find(".tip").text("点击收起").addClass("tip_collpase");
                        });
                    }
                }
            }

        }
        else {
            //执行收起大图效果
            /*check css3 transition*/
            if (!!me.find("img").css("transitionProperty") ||
				!!me.find("img").css("-moz-transitionProperty") ||
				!!me.find("img").css("-webkit-transitionProperty") ||
				!!me.find("img").css("-o-transitionProperty")) {
                me.find("img").addClass("thumbimg").bind('transitionend otransitionend webkitTransitionEnd', function() {
                    me.removeClass("bigpic").siblings().show("slow");
                    me.find(".tip").text("点击展开").removeClass("tip_collpase");
                    $(this).removeClass("thumbimg").unbind("transitionend otransitionend webkitTransitionEnd");
                });
            } else {
                if (! -[1, ] && !window.XMLHttpRequest) {
                    //IE6收起的动作
                    me.find("img").animate({ width: me.attr("data-img-thumbWidth") }, function() {
                        $(this).removeClass("ie6_auto_img");
                        me.height(100).removeClass("bigpic").siblings().show("slow");
                        me.find(".tip").text("点击展开").removeClass("tip_collpase");
                    });
                }
                else {
                    //非IE6收起的动作
                    me.find("img").animate({ maxWidth: 100, maxHeight: 100 }, function() {
                        me.height(100).removeClass("bigpic").siblings().show("slow");
                        me.find(".tip").text("点击展开").removeClass("tip_collpase");
                    });
                }
            }

        }

    });


    //弹出框
    cookies = $State.GetValue('COOKIE_STORE_SYSTEMNO');
    var hasStore = true;
    for (var i = StoreList.length; i--; ) {
        if (StoreList[i] == cookies) {
            hasStore = false;
        }
    }

    hasStore = false;

    /*
    //手机访问跳转电脑
    $("#linkComputer").click(function() {
        $(".popDownloadAPP").hide();
        $State.Save("IsUseAndriodAndIPhone", "1");
        if (hasStore) {
            PopWin(".pop_fresh_v2", {
                action: "in",
                animate: true,
                callback: function() {
                    UI.popWinB("shopsEntry", false);
                    ! -[1, ] && !window.XMLHttpRequest && $(".pop_fresh").find(".close").animate({ right: -19 }, 0); //fixed ie6 bug;
                    $(".shopsEntry .shuter").unbind("click");
                }
            });
        }
    });
    var IphoneAndriod = $State.GetValue('IsUseAndriodAndIPhone');
    if (store_Mobile.IsMobile == "True" && (IphoneAndriod == null || IphoneAndriod == "0" || IphoneAndriod == "")) {
        //手机访问 APP下载 弹出框
        $(".popDownloadAPP").show().find(".btnPCVersion").click(function() {
            $(".popDownloadAPP").hide();
        });
    }
    if (hasStore && store_Mobile.IsMobile == "False") {*/
    if (hasStore) {
        PopWin(".pop_fresh_v2", {
            action: "in",
            animate: true,
            callback: function() {
                UI.popWinB("shopsEntry", false);
                ! -[1, ] && !window.XMLHttpRequest && $(".pop_fresh").find(".close").animate({ right: -19 }, 0); //fixed ie6 bug;
                $(".shopsEntry .shuter").unbind("click");
            }
        });
    } else {
        //        $(".WMStoreInfoArray a").each(function() {
        //            var tempStore = $(this).attr('iscurrentstore');
        //            if (typeof tempStore == 'string' && tempStore == 'Y') {
        //                $("#WMSelectedStoreShow").html($(this).text());
        //                return false;
        //            }
        //        });

    }

})

//修改门店 minge
var WMIndex = {
    changeStore: function(obj) {
        if ($(obj).attr("isMuchClick") != "true") {
            $(obj).attr("isMuchClick", "true");
            var storevalue = $(obj).attr('val');
            $.ajax({
                type: "post",
                dataType: "html",
                url: $.newegg.buildCurrent("Ajax/Common/AjaxChangeStore.aspx"),
                timeout: 30000,
                data: { Store: escape(storevalue) },
                cache: false,
                success: function(data, textStatus) {
                    var obj = eval("(" + data + ")");
                    if (obj.Description == "return") {
                        location.reload();
                    }
                    else {
                        window.location.href = obj.Description;
                    }
                }
            });
        }
    },
    selectStore: function(obj, page) {
        var storeid;
        var storevalue = $(obj).attr("rel"); // + "店";
        $(".samsStoreHiden").each(function() {
            var tempStore = $(this).attr('samsstoreid');

            if (typeof tempStore == 'string') {//tempStore == storevalue
                if (storevalue == tempStore) {
                    storeid = $(this).attr('samsstoreid');
                    return false;
                }
            }
        });
        $.ajax({
            type: "post",
            dataType: "html",
            url: $.newegg.buildCurrent("Ajax/Common/AjaxChangeStore.aspx"),
            timeout: 30000,
            data: { Store: escape(storeid), pageUrl: escape(page) },
            cache: false,
            success: function(data, textStatus) {
                var obj = eval("(" + data + ")");
                if (obj.Description == "return") {
                    location.reload();
                }
                else {
                    window.location.href = obj.Description;
                }
            }
        });
    },
    setDefaultStore: function(obj) {
        $.newegg.cookie.set('COOKIE_STORE_SYSTEMNO', '10', { topdomain: true, expires: 9999 });
        window.location.href = resources_Home.defaultStoreUrl;
    }
}
