var isIE = !!window.ActiveXObject;
var isIE6 = isIE && !window.XMLHttpRequest;
var gtIE8 = isIE && !!document.documentMode;
var isIE7 = isIE && !isIE6 && !gtIE8 || (document.documentMode == 7);

var Browser = (function(ua){
	var s = {};
	s.IE = ua.match(/(msie\s|trident.*rv:)([\w.]+)/) ? true: false;
	s.Firefox = ua.match(/firefox\/([\d.]+)/) ? true: false;
	s.Chrome = ua.match(/chrome\/([\d.]+)/) ? true: false;
	s.Opera = /opera/.test(ua);
	s.IE6 = s.IE && ([/msie 6\.0/g.test(ua)][0]);
	s.IE7 = s.IE && ([/msie 7\.0/g.test(ua)][0]);
	s.IE8 = s.IE && ([/msie 8\.0/g.test(ua)][0]);
	return s;
})(navigator.userAgent.toLowerCase());

(function(win, UI, undefined) {
    if (win[UI] === undefined) {
        win[UI] = {};
    } else {
        return;
    }
    var mix = function(r, s, ov) {
        if (!s || !r) return r;
        if (ov === undefined) ov = true;
        for (var p in s) {
            if (ov || !(p in r)) {
                r[p] = s[p];
            }
        }
        return r;
    };
    UI = win[UI];
    mix(UI, {
        laterEvent: function(fn, times, me) {
            if (me.sleepid) {
                clearTimeout(me.sleepid);
            }
            me.sleepid = setTimeout(fn, times);
        },
        merge: function() {
            var o = {}, i, l = arguments.length;
            for (i = 0; i < l; ++i) {
                mix(o, arguments[i]);
            }
            return o;
        },
        namespace: function() {
            var args = arguments, l = args.length,
				o = null, i, arr, j, al,
				g = (args[l - 1] === true && l--);

            for (i = 0; i < l; ++i) {
                arr = args[i].split('.');
                o = g ? win : this;

                for (j = (win[arr[0]] === o ? 1 : 0), al = arr.length; j < al; ++j) {
                    o = o[arr[j]] = o[arr[j]] || {};
                }
            }

            return o;
        },
        Web: {
            ie: (function() {

                var undef,
                    v = 3,
                    div = document.createElement('div'),
                    all = div.getElementsByTagName('i');

                while (
                    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                    all[0]
                );

                return v > 4 ? v : undef;

            } ())
        },
        popWinA: function(s, op) {
            op = UI.merge({
                opener: ".opener",
                openerC: ".openerC",
                addClass: "now"
            }, op || {});

            $(s).each(function() {
                var objOpner = $(this).find(op.opener),
					objC = $(this).find(op.openerC);

                $(this).hover(function() {
                    objOpner.addClass(op.addClass);
                    objC.show();
                }, function() {
                    objOpner.removeClass(op.removeClass || op.addClass);
                    objC.hide();
                });
            });
        },
        popWinB: function(s, hover) {
            var objOpner = $("." + s + " .opener");
            var objShuter = $("." + s + " .shuter");
            if (hover == false) {
                if (objOpner.length) {
                    objOpner.click(function() {
                        if ($(this).parents(".over").length) {
                            $(this).parents("." + s).removeClass("over");
                        }
                        else {
                            $("." + s).removeClass("over");
                            $(this).parents("." + s).addClass("over");
                        }
                    });
                }
                if (objShuter.length) {
                    objShuter.click(function() {
                        $(this).parents("." + s).removeClass("over");
                    });
                }
            }
            if (hover == true) {
                if (Browser.IE) {
                    objOpner.parents("." + s).hover(
					function() {
					    $(this).addClass("over");
					}, function() {
					    $(this).removeClass("over");
					});
                } else {
                    objOpner.parents("." + s).mouseover(
					function() {
					    $(this).addClass("over");
					}).mouseout(function() {
					    $(this).removeClass("over");
					});
                }
            }
        },
        childUntil: function(expr, obj) {
            if (obj.length == 0) return null;
            var child = obj.children(expr);
            if (child.length == 0) {
                return arguments.callee(expr, obj.children());
            } else {
                return child;
            }
        },
        defaultText: function(op) {
            op = UI.merge({
                hasDefaultText: ".hasDefaultText",
                removeClass: "hasDefaultText",
                addClass: "hasDefaultText"
            }, op || {});
            var obj = $(op.hasDefaultText);
            var tmpText = new Array();
            var objIndex = 0;
            for (i = 1; i <= obj.length; i++) {
                tmpText[i - 1] = obj.eq(i - 1).attr("tip") ? obj.eq(i - 1).attr("tip") : obj.eq(i - 1).val();
                obj.eq(i - 1).attr("tip", tmpText[i - 1]);
            }
            obj.focus(function() {
                objIndex = obj.index($(this));
                if ($(this).val() == $(this).attr("tip")) {
                    $(this).val("");
                }
                $(this).removeClass(op.removeClass);
            });
            obj.blur(function() {
                objIndex = obj.index($(this));
                if ($(this).val() == "") {
                    $(this).val($(this).attr("tip"));
                    $(this).addClass(op.addClass);
                }
            });
        },
        /**
        * 判断浏览器是否，如: cssSupports('borderRadius')
        * @return {Boolean} 返回true或false
        */
        cssSupports: (function() {
            var div = document.createElement('div'),
				vendors = 'Khtml O Moz Webkit'.split(' '),
				len = vendors.length;
            return function(prop) {
                if (prop in div.style) return true;
                if ('-ms-' + prop in div.style) return true;

                prop = prop.replace(/^[a-z]/, function(val) {
                    return val.toUpperCase();
                });

                while (len--) {
                    if (vendors[len] + prop in div.style) {
                        return true;
                    }
                }
                return false;
            };
        })(),
        cookie: {
            /**
            * @public 设置cookie。setCookie(key, value, expires, path, domain, secure)
            * @method setCookie
            * @param {String} key cookie的键名
            * @param {String} val cookie字段的值
            * @param {Number} [expires] 保存天数
            * @param {String} [domain] cookie域名
            * @param {String} [path] cookie路径
            * @param {Boolean} [secure] cookie是否为安全传输
            * @return void
            */
            set: function(key, val, expires, domain, path, secure) {
                if (!path) path = '/';
                if ((~ ~expires) == 0) expires = 365;
                expires = expires * 86400000;
                var e_date = new Date();
                e_date.setTime(+e_date + expires);
                document.cookie =
					key + '=' + encodeURIComponent(val)
					+ (expires ? '; expires=' + e_date.toGMTString() : '')
					+ (domain ? '; domain=' + domain : '')
					+ (path ? '; path=' + path : '')
					+ (secure ? '; secure' : '');
            },

            /**
            * 获取 cookie 值
            * @param {String} key cookie字段的名字
            * @return {String} 如果 key 不存在，返回 null
            */
            get: function(key) {
                var c = document.cookie.split("; ");
                for (var i = 0; i < c.length; i++) {
                    var p = c[i].split("=");
                    if (key == p[0]) try { return decodeURIComponent(p[1]) } catch (e) { return null }
                }
                return null;
            },

            /**
            * 删除 cookie 值
            * @param {String} key cookie字段的名字
            * @param {String} domain
            * @param {String} path
            */
            del: function(key, domain, path) {
                document.cookie = key + "=1" + (path ? "; path=" + path : "; path=/") + (domain ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
            },

            /**
            * 获取域名以.分隔的最后两段，如music.woyo.com 返回 .woyo.com
            * @return {String} 返回域名以.分隔的最后两段
            */
            getDomain: function() {
                return "." + location.host.split(".").slice(-2).join(".");
            }
        }
    });
})(window, "UI");

var resources_Head={
    welcome_Login3:'<strong class="welmsg">{0}好，MyShop欢迎您！</strong>',
    login2:'<span><a href="{0}">登录</a><b>|</b><a href="{1}">注册</a></span>',
    welcome_Login4:'<span class="noBack"><strong>{0}</strong>{1}好,欢迎光临MyShop会员店！</span>',
    logOut2:'<span><a href="{0}">登录</a><b>|</b><a href="{1}">[退出]</a></span>',
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

$(function() {
	var loginText;
    //初始化登陆欢迎信息
/*    if ($(".welcome").length) {
        var loginUrl = $.newegg.buildSSL("login.action");
        var logoutUrl = $.newegg.buildCurrent("logout.action");
        loginText = initLogined(loginUrl, logoutUrl);
        $('.welcome').html(loginText);
    }*/
    if ($("#groupbuylogin").length) {
        var loginUrl = $.newegg.buildSSL("login.action?returnUrl=" + encodeURIComponent(currentUrl));
        var logoutReturnUrl = $.newegg.buildCurrent("");
        var logoutUrl = $.newegg.buildSSL("logout.action?returnUrl=" + encodeURIComponent(logoutReturnUrl));
        loginText = initLogin(loginUrl, logoutUrl);
        $('#groupbuylogin').html(loginText);
    }

    //开启默认文字效果,登陆页面不需要
    if ($(".loginpannel").length) {
        defaultTextForLogin();
    }
    else {
        //defaultText();
    }

    //页头类别的导航菜单是否默认展开
    if (typeof (showAllCate) != 'undefined' && showAllCate == true) {
        //		$("#topNav .allCateNav").addClass("over");
        // 初始化页头类别的导航菜单动作
        allCateNav();
    }
    else {
        // 异步加载页头类别的导航菜单
        //        if ($("#headerAllCateNav").length) {
        //            onoff_4("headerAllCateNav", function(obj, callBack) { headerAllCateNav(obj, callBack) });
        //        }
        //		popWinB("allCateNav", true);
    }

    //迷你购物车的显示总数
    if ($("#WMheaderCartCount").length) {
        var minniCart = $.newegg.cookie.get("CartCookie", "cartQty");
        if (minniCart == '') minniCart = 0;
       // $("#WMheaderCartCount").text(minniCart);
        $("#emMiniCartNum").text(minniCart);
    }

    // 迷你购物车
    //    if ($("#wmminicart").length) {
    //        onoff_5("wmminicart", function(obj, callBack) { miniCart('', 'load', obj, callBack) });
    //    }


    //初始化自动搜索提示
    if ($("#topSearch").length) {
        //初始化搜索按钮事件
        initSearch("topSearch");
    }

    //对商品详细页面的URL添加跟踪来源参数
    if (typeof (pageAlias) != "undefined") {
        coremetricsProductUrl.load();
    }

    //加载选择区域
    //subWebSite.init();

    /* Default Input Place Holder */
    UI.defaultText();

    UI.popWinA("#header .store");

    $(".topnavbar .expand").hover(function() {
        $(this).addClass("now");
    }, function() {
        $(this).removeClass("now");
    });

    // 回到顶部
    var sctop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    (sctop > 1200) ? $(".backToTop").show() : $(".backToTop").hide();
    $(".backToTop").click(function() {
        $(document.body).animate({
        	scrollTop: 0
        }, 200);
        $(this).hide();
        return false;
    });

});