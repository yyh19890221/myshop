/*start 通用函数*/
if (!this.JSON) {
    this.JSON = {};
}

var wwwSite='',
	sslSite='',
	shopperSite='';

var shoppingIsLogin = 0; //未登录
/*Json函数*/
(function () {
    function f(n) {
        return n < 10 ? '0' + n : n;
    }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }
    function str(key, holder) {
        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        switch (typeof value) {
        case 'string':
            return quote(value);
        case 'number':
            return isFinite(value) ? String(value) : 'null';
        case 'boolean':
        case 'null':
            return String(value);
        case 'object':
            if (!value) {
                return 'null';
            }
            gap += indent;
            partial = [];

            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

            return str('', {'': value});
        };
    }

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            if (/^[\],:{}\s]*$/.
		test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
		replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
		replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                j = eval('(' + text + ')');

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }
}());

/*start Jquery扩展*/
(function($){
	$.extend($.easing,{
		easeInSine: function (x, t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeInQuint: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOutQuint: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOutQuint: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	});
})(jQuery);
/*end Jquery扩展*/


(function($) {
    /**
　　* @description newegg Jquery 扩展对象
　　* @class 封装newegg对Jquery的扩展方法
　　*/
    $.newegg = {
    	/**
    	 * @description  判断当前页面是否是SSL页面
    	 * @param 无
    	 * @returns {bool}
    	 */
        isSecurePage: function() {
            return location.protocol == 'https:';
        },
        /**
　　    * @description  根据当前页面域名构造url
        * @param {string} relativePath 相对路径
        * @returns {string} 绝对路径
　　    */
        buildCurrent: function(relativePath) {
            if (location.host.indexOf(":8008") != -1) {
                return location.protocol + '//' + location.host + '/WebUI/' + relativePath;
            }
            else {
                return location.protocol + '//' + location.host + '/' + relativePath;
            }
        },
        /**
　　    * @description  构造www站点域名url
        * @param {string} relativePath 相对路径
        * @returns {string} 绝对路径
　　    */
        buildWWW: function(relativePath) {
            return wwwSite + '/' + relativePath;
        },
        /**
　　    * @description  构造shopper站点域名url
        * @param {string} relativePath 相对路径
        * @returns {string} 绝对路径
　　    */
        buildShopper: function(relativePath) {
            return shopperSite + '/' + relativePath;
        },
        /**
　　    * @description  构造ssl站点域名url
        * @param {string} relativePath 相对路径
        * @returns {string} 绝对路径
　　    */
        buildSSL: function(relativePath) {
            return "/myshop" + '/' + relativePath;
        },
        /**
　　    * @description 格式化字符串
        * @param {string} source 带格式的字符串
        * @param {string} params 替换的参数
        * @returns {string} 格式化后的字符串
　　    */
        format: function(source, params) {
            if (arguments.length == 1)
                return function() {
                    var args = $.makeArray(arguments);
                    args.unshift(source);
                    return $.newegg.format.apply(this, args);
                };
            if (arguments.length > 2 && params.constructor != Array) {
                params = $.makeArray(arguments).slice(1);
            }
            if (params.constructor != Array) {
                params = [params];
            }
            $.each(params, function(i, n) {
                source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
            });
            return source;
        },
        /**
　　    * @description newegg cookie 对象
　　    * @class 封装的读写方法
　　    */
        cookie: {
            /**
　　        * @description 保存cookie，支持一维和二维
            * @param {string} name cookie名字
            * @param {string/json} value cookie值<br/>
            * 示例1二维：json格式 {Advalue:'x1',Type:'x2'}<br/>
            * 示例2一维：字符串格式 'x1'
            * @param {json} options 扩展参数<br/>
            * 示例：{topdomain:true,expires:10}
            * @returns void
　　        */
            set: function(name, value, options) {
                var cv = "";
                options = options || {};
                value = value || null;

                if (value == null) {
                    options = $.extend({}, options);
                    options.expires = -1;
                }

                if (value != null && typeof (value) == "string") {
                    cv = escape(value).replace(/\+/g, "%2b");
                } else if (value != null && typeof (value) == "object") {
                    var jsonv = $.newegg.cookie.ToJson($.newegg.cookie.get(name));
                    if (jsonv == false) jsonv = {};
                    for (var k in value) {
                        eval("jsonv." + k + "=\"" + value[k] + "\"");
                    }
                    for (var k in jsonv) {
                        cv += k + '=' + escape(jsonv[k]).replace(/\+/g, "%2b") + '&';
                    }
                    cv = cv.substring(0, cv.length - 1);
                }

                var expires = "";
                if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                    var date;
                    if (typeof options.expires == 'number') {
                        date = new Date();
                        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    } else {
                        date = options.expires;
                    }
                    expires = "; expires=" + date.toUTCString();
                }
                var path = options.path ? "; path=" + (options.path) : "; path=/";
                var domain = options.domain ? "; domain=" + (options.domain) : "";
                if (options.topdomain) {
                    var host = location.hostname,
						hostindex = host.indexOf('.'),
                        isTop = hostindex > -1 && hostindex === host.lastIndexOf('.');

                    if (/^(\d|\.)*$/.test(location.hostname) == false) {
                        if (hostindex > 0) {
                            if (isTop === true) {
                                host = "." + host;
                            } else {
                                host = host.substring(hostindex);
                            }

                            domain = "; domain=" + host;
                        }
                    }
                }
                var secure = options.secure ? "; secure" : "";
                document.cookie = [name, '=', cv, expires, path, domain, secure].join('');
            },
            /**
　　        * @description 获取cookie
            * @param {string} n cookie名字
            * @param {string} k 二维cookie的子键名<br/>
            * @returns {string} 值
　　        */
            get: function(n, k) {
                var reg = new RegExp("(^| )" + n + "=([^;]*)(;|$)");
                var arr = document.cookie.match(reg);
                if (arguments.length == 2) {
                    if (arr != null) {
                        var kArr, kReg = new RegExp("(^| |&)" + k + "=([^&]*)(&|$)");
                        var c = arr[2];
                        var c = c ? c : document.cookie;
                        if (kArr = c.match(kReg)) {
                            return unescape(kArr[2].replace(/\+/g, "%20"));
                        } else {
                            return "";
                        }
                    } else {
                        return "";
                    }
                } else if (arguments.length == 1) {
                    if (arr != null) {
                        return unescape(arr[2].replace(/\+/g, "%20"));
                    } else {
                        return "";
                    }
                }
            },
            /**
　　        * @private
　　        */
            ToJson: function(cv) {
                var cv = cv.replace(new RegExp("=", "gi"), ":'").replace(new RegExp("&", "gi"), "',").replace(new RegExp(";\\s", "gi"), "',");
                return eval("({" + cv + (cv.length > 0 ? "'" : "") + "})");
            },
            /**
　　        * @description 删除cookie
            * @param {string} name cookie名字
            * @param {json} options 指定domain<br/>
            * @returns {void}
　　        */
            clear: function(name, options) {
                var expires = ";expires=Thu, 01-Jan-1900 00:00:01 GMT";
                var path = options.path ? "; path=" + (options.path) : "; path=/";
                var domain = options.domain ? "; domain=" + (options.domain) : "";
                if (options.topdomain) {
                    var host = location.hostname,
						hostindex = host.indexOf('.'),
                        isTop = hostindex > -1 && hostindex === host.lastIndexOf('.');

                    if (/^(\d|\.)*$/.test(location.hostname) == false) {
                        if (hostindex > 0) {
                            if (isTop === true) {
                                host = "." + host;
                            } else {
                                host = host.substring(hostindex);
                            }

                            domain = "; domain=" + host;
                        }
                    }
                }
                var secure = options.secure ? "; secure" : "";
                document.cookie = [name, '=', expires, path, domain, secure].join('');
            }
        },
        /**
　　    * @description newegg querystring 对象
　　    * @class 封装querystring读写方法
　　    */
        querystring: {
            /**
　　        * @description 获取queryString某个键的值
            * @param {string} key 键名
            * @returns {string} 键值
　　        */
            get: function(key) {
                var qs = $.newegg.querystring.parse();
                var value = qs[key];
                return (value != null) ? value : "";
            },
            /**
　　        * @description 设置queryString某个键的值
            * @param {string} key 键名
            * @param {string} value 键值
            * @returns {void}
　　        */
            set: function(key, value) {
                var qs = $.newegg.querystring.parse();
                qs[key] = encodeURIComponent(value);
                return $.newegg.querystring.toString(qs);
            },
            /**
　　        * @private
　　        */
            parse: function(qs) {
                var params = {};

                if (qs == null) qs = location.search.substring(1, location.search.length);
                if (qs.length == 0) return params;

                qs = qs.replace(/\+/g, ' ');
                var args = qs.split('&');
                for (var i = 0, l = args.length; i < l; i++) {
                    var pair = args[i].split('=');
                    var name = pair[0];

                    var value = (pair.length == 2)
						? pair[1]
						: name;
                    params[name] = value;
                }

                return params;
            },
            /**
　　        * @private
　　        */
            toString: function(qs) {
                if (qs == null) qs = $.newegg.querystring.parse();

                var val = "";
                for (var k in qs) {
                    if (val == "") val = "?";
                    val = val + k + "=" + qs[k] + "&";
                }
                val = val.substring(0, val.length - 1);
                return val;
            }
        },
        /**
        *@description 解决url上中文乱码问题
        *
        */
        urlEncode: function(str) {
            return escape(str).replace(/\+/g, "%2b");
        },

        /**
　　    * @description newegg 异步加载图片 对象
　　    * @class 封装异步加载图片方法
　　    */
        imgLoad: {
            /**
             * @private
             */
            objArray: [],
            /**
             * @description 给定区域的id,并触发异步加载行为
             * @param {[]} obj 给定区域的id数组
             * @returns {void}
             */
            loadImg: function(objArray) {
                if (objArray && objArray.length > 0) {
                    for (var i = 0, l = objArray.length; i < l; i++) {
                        var obj = objArray[i],
                            inObj = ("string" === typeof obj) ? $("#" + obj) : obj;

                        if ($.inArray(inObj, $.newegg.imgLoad.objArray) == -1) {
                            $.newegg.imgLoad.objArray.push(inObj);
                        }
                    }
                    $.newegg.imgLoad.load();
                }
            },
            /**
　　        * @private
　　        */
            pageTop: function() {
                return document.documentElement.clientHeight + this.scrollTop(); // Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            },
            /**
　　        * @private
　　        */
            scrollTop: function() {
                return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            },
            /**
　　        * @description 触发异步加载行为
            * @returns {void}
　　        */
            load: function() {
                $.newegg.lazy.run({
                    key: "ImgLoad",
                    milliSec: 30,
                    fn: this.loadAll
                });
            },
            loadAll: function() {
                var newObjArray = [],
                        objArray = $.newegg.imgLoad.objArray;

                if (objArray && objArray.length == 0) { return; }

                for (var i = 0, l = objArray.length; i < l; i++) {
                    obj = objArray[i];
                    if (obj) {
                        var jObj = ("function" == typeof obj) ? obj() : obj;

                        var isAllLoaded = $.newegg.imgLoad.quickLoad(jObj);
                        if (!isAllLoaded) {
                            newObjArray.push(obj);
                        }
                    }
                }

                if (objArray.length !== newObjArray.length) {
                    $.newegg.imgLoad.objArray = newObjArray;
                }
            },
            quickLoad: function(jObj) {
                var unLazyLoadCount = 0;
                if (jObj) {
                    var pageTop = $.newegg.imgLoad.pageTop() + 100,     //可见屏幕向下100px
                        scrollTop = $.newegg.imgLoad.scrollTop() - 200; //可见屏幕向上200px

                    jObj.find("img").each(function() {
                        var jImg = $(this);
                        var src2 = jImg.attr("src2");

                        if (src2) {
                            unLazyLoadCount++;

                            var jImgTop = jImg.offset().top;
                            jImgBottom = jImgTop + jImg.outerHeight();

                            if (jImgTop <= pageTop && jImgBottom >= scrollTop) {
                                jImg.attr("src", src2).removeAttr("src2");
                                unLazyLoadCount--;
                            }
                        }
                    });
                }

                //未懒加载图片数量
                return unLazyLoadCount <= 0;
            }
        },
        lazy: {
            lazyArray: [],
            run: function(setting) {
                var option = { key: "lazyFn", milliSec: 100, fn: null };
                $.extend(option, setting);

                if (option.fn) {
                    var lazyObj = this.findLazyObj(option.key);

                    if (lazyObj.timeout) { clearTimeout(lazyObj.timeout); }

                    lazyObj.timeout = setTimeout(option.fn, option.milliSec);
                }
            },
            findLazyObj: function(key) {
                var lazyObj = null;

                if (this.lazyArray.length > 0) {
                    for (var i = 0; i < this.lazyArray.length; i++) {
                        if (this.lazyArray[i].key == key) {
                            lazyObj = this.lazyArray[i];
                            break;
                        }
                    }
                }

                if (!lazyObj) {
                    lazyObj = { key: key, timeout: null };
                    this.lazyArray.push(lazyObj);
                }
                return lazyObj;
            }
        }
    };
})(jQuery);
/*end 通用函数*/

/*start 通用效果函数*/
/*如果1280开关关闭，则默认是1024*/
if(typeof(resolution) ==  "undefined"){
    resolution = 0;
}

/**
* @description 开启指定容器内的TAB功能，参数为包含TAB组件的外部容器
* @param {string} w class名
* @returns {void}
*/
function startTabA(w) {
	var sWrap = "." + w;
	var wrap = $(sWrap); //包含TAB的外部容器
	if (wrap.length) { //判断容器是否存在
		$(sWrap + " .tabs a:not([rel*='link'])").click(function(){
		 //当窗口中tabs下面的链接点击时
	 
	         var prop = $(this).attr("prop");
	         if(prop == "viewMore")
	        {
	            var cmd = $(this).attr("command");
                if(cmd){
                    eval(cmd + "(this);");
                }
			    return false;
	        }
	         
			var contentID = $(this).parents(sWrap).get(0).id; 
			var tab = $(this).parents(".tabs").children("*"); 
			var tabNum = tab.length; //获取TAB个数
			tab.removeClass("currentBtn");
			if ($(this).parents(".tabs").children("a").length > 0)
				$(this).addClass("currentBtn");
			else
				$(this).parent().addClass("currentBtn");
			for (var i = 1; i <= tabNum; i++) {
				$("#" + contentID + "_" + i).hide(); //先将所有tabContent隐藏
			}
			$("#" + contentID + "_" + this.rel).show(); //将所点击链接所对应的tabContent显示
			$.newegg.imgLoad.loadImg([contentID + "_" + this.rel]);

            var cmd = $(this).attr("command");
            if(cmd){
                eval(cmd + "(this);");
            }
			return false;
		});
		
		if($(sWrap + " .prevView").length) { //如果存在向前按钮则执行
			$(sWrap + " .prevView").click(function(){
				var contentID = $(this).parents(sWrap).get(0).id;
				var curNum = parseInt($("#" + contentID + " .tabs .currentBtn").attr("rel")) - 1;
				if (curNum < 1) curNum = $("#" + contentID + " .tabs a").length;
				$("#" + contentID + " .tabs a").eq(curNum-1).click();
			});
		}
		
		if($(sWrap + " .nextView").length) { //如果存在向后按钮则执行
			$(sWrap + " .nextView").click(function(){
				var contentID = $(this).parents(sWrap).get(0).id;
				var curNum = parseInt($("#" + contentID + " .tabs .currentBtn").attr("rel")) + 1;
				if (curNum > $("#" + contentID + " .tabs a").length) curNum = 1;
				$("#" + contentID + " .tabs a").eq(curNum-1).click();
			});
		}
	}
}

/**
* @description 在startTabA基础上增加鼠标划过TAB按钮也切换TAB的功能
* @param {string} w class名
* @returns {void}
*/
function startTabB(w) {
	var sWrap = "." + w;
	var wrap = $(sWrap); //包含TAB的外部容器
	if (wrap.length) {
		sWrap = "." + w;
		$(sWrap + " .tabs a").mouseover(function(){
			$(this).click();
		});
	}
}

/**
* @description 菜单弹出层
* @param {string} s class名
* @returns {void}
*/
function onoff(s) {
    var objStyle = "." + s;
    var obj = $(objStyle);
    if (obj.length) {
	    if (Browser.IE) {
		    obj.parent().hover(function(){
			    $(this).addClass("over");
		    }, function(){
			    obj.parent().removeClass("over");
		    });
	    }else {
		    obj.parent().mouseover(function(){
			    $(this).addClass("over");
		    }).mouseout(function(){
			    $(this).removeClass("over");
		    });
	    }
    }
}

/**
* @description 菜单弹出层2
* @param {string} s class名
* @returns {void}
*/
function onoff_2(s) {
	var obj = $(s);
	if (obj.length) {
		obj.mouseover(function(){
			obj.removeClass("over");
			$(this).addClass("over");
		});
	}
}

/**
* @description 菜单弹出层3,可根据距离页面底部距离决定是否向上弹出 目前用于左侧带弹出菜单的分类导航
* @param {string} s class名
* @returns {void}
*/
function onoff_3(s) {
	var objStyle = "." + s;
	var obj = $(objStyle);
	if (obj.length) {
		if (Browser.IE) {
			obj.parent().hover(function(){
				var offset = $(this).offset();
				var scrollTop = document.documentElement.scrollTop;
				var windowHeight = document.documentElement.clientHeight;
				var objHeight = $(objStyle, this).height();

				if(offset.top - scrollTop > objHeight){					
					if((windowHeight - offset.top + scrollTop) < objHeight) {
						$(objStyle, this).addClass("dirUp");
						$(objStyle, this).css("top",23-objHeight);
					}
				}
				
				$(this).addClass("over");
			}, function(){
				obj.parent().removeClass("over");
				$(objStyle, this).removeClass("dirUp");
				$(objStyle, this).css("top","1px");
			});
		}else {
			obj.parent().mouseover(function(){
				var offset = $(this).offset();
				var scrollTop = document.documentElement.scrollTop + document.body.scrollTop; //解决FF,CHROME,SAFARI的不兼容问题
				var windowHeight = document.documentElement.clientHeight;
				var objHeight = $(objStyle, this).height();
				if(offset.top - scrollTop > objHeight){
					if((windowHeight - offset.top + scrollTop) < objHeight) {
						$(objStyle, this).addClass("dirUp");
					}
				}
				$(this).addClass("over");
			}).mouseout(function(){
				$(this).removeClass("over");
				$(objStyle, this).removeClass("dirUp");
			});
		}
	}
}

/**
* @description 菜单弹出层4,有延时效果
* @param {string} s class名
* @returns {void}
*/
function onoffDelay(s) {
	var timer, timer2;
	var objStyle = "." + s;
	var obj = $(objStyle);
	obj.parent().mouseover(function(){
		var current = $(this);
		if ( $(this).find(objStyle).css("display") == "block") {
			current.addClass('over');
			clearTimeout(timer2);
		}else {
			timer = setTimeout(function(){
				current.addClass('over');
			},350);
		}
	}).mouseout(function() {
		var current = $(this);
		if(timer) {
			clearTimeout(timer);
			timer2 = setTimeout(function(){
				current.removeClass('over');
			},350);
		}
	});
	obj.mouseover(function(){
		$(this).parent().addClass('over');
	});
}

/**
* @description 为页面上特定输入元素增加默认文字的效果
* @param 无
* @returns {void}
*/
function defaultTextForLogin() {
	var jobj=$("#name");
       jobj.focus(function(){
		if($String.Trim($(this).val()) == $(this).attr("defaultPrompt")) {
			$(this).val("");
			$(this).addClass("hasDefaultTextOn");
		}
	   });
	   jobj.blur(function(){
		  if($String.Trim($(this).val()) == "") {
			  $(this).val($(this).attr("defaultPrompt"));
			  $(this).removeClass("hasDefaultTextOn");
		  }
	   });
};
var hasOnePopupShow = false;
/**
* @description 需要等待异步返回的展开效果<br/>
* hasOnePopupShow 表示页头有弹出框显示，此时处于加载状态的其他弹出框不显示
* objFor.attr("display", "true");，表示当前节点在显示状态。仅当true时，插入回调数据
* @param {int} s 容器id
* @param {function} fn 回调函数
* @returns {void}
*/
function onoff_4(s,fn) {
	var objStyle = "#" + s;
	var obj = $(objStyle);
	if (obj.length) {
		obj.parent().unbind();
		if (Browser.IE) {
			obj.parent().hover(function(){
				var objFor = $(this);
				objFor.attr("display", "true");
				if (typeof fn != "undefined"){
					fn(obj,function(){
						
						if(hasOnePopupShow){
							return;
						}
						
						if(objFor.attr("display") == "true")
						{
							objFor.addClass("over");
							hasOnePopupShow = true;
						}
					}); 
				}
			}, function(){
				hasOnePopupShow = false;
				var objFor = $(this);
				objFor.attr("display", "false");
				$(this).removeClass("over");
			});
		}else {
			obj.parent().mouseover(function(){
				var objFor = $(this);
				objFor.attr("display", "true");
				if (typeof fn != "undefined"){
					fn(obj,function(){
						
						if(hasOnePopupShow){
							return;
						}
						
						if(objFor.attr("display") == "true")
						{
							objFor.addClass("over");
							hasOnePopupShow = true;
						}
					}); 
				}
			}).mouseout(function(){
				hasOnePopupShow = false;
				var objFor = $(this);
				objFor.attr("display", "false");
				$(this).removeClass("over");
			});
		}
	}
}

function onoff_5(s, fn) {
    var objStyle = "#" + s;
    var obj = $(objStyle);
    if (obj.length) {
        var sobj = obj.parent();
        sobj.unbind();
        sobj.each(function() {
            var objOpner = $(this).find("#wmcartopener"),
					objC = $(this).find("#wmminicart");

            $(this).hover(function() {
                //objOpner.addClass("now");
                if (typeof fn != "undefined") {
                    fn(obj, function() {
                        objOpner.addClass("now");
                        if (hasOnePopupShow) {
                            return;
                        }
                        //sobj.addClass("over");
                        hasOnePopupShow = true;
                    });
                }
                objC.show();
            }, function() {
                objOpner.removeClass("now");
                objC.hide();
            });
        });
        
    }
}

/**
* @description 通用的左右滚动函数<br/>
* @param {int} o 包围对象id
* @param {int} num 每屏显示数量
* @param {int} step 每次滚动数量
* @param {int} scrollTime 滚动时间
* @param {bool} autoPlay 是否自动滚动
* @param {int} autoTime 自动滚动间隔时间
* @returns {void}
*/
function scrollV(o,num,step,scrollTime,autoPlay,autoTime) {
	var obj = $("#" + o);
	var cell = $("#" + o + " .moveable li");
	var total = cell.length;
	var btnPre = $("#" + o + " .pre");
	var btnNext = $("#" + o + " .next");
	autoFilledKeywords.clickObj = btnNext[0];
	var moveLimit = Math.ceil((total - num)/step);
	var moveNum = 0;
	var currLeft = 0;
	var moveWidth = 0;
	if(total > num) {
		//btnPre.addClass("preDisable");
		btnNext.click(function(){
			moveWidth = (parseInt(cell.width()) + parseInt(cell.css("margin-right")) + parseInt(cell.css("margin-left")) + parseInt(cell.css("padding-right")) + parseInt(cell.css("padding-left")) + parseInt(cell.css("border-right-width")) + parseInt(cell.css("border-left-width")))*step;
			if(moveNum < moveLimit) {
				moveNum++;
				currLeft = currLeft - moveWidth;
			}
			else {
				moveNum = 0;
				currLeft = 0;
			}
			$(this).parents("#" + o).find(".moveable").animate({left: currLeft + "px"},scrollTime);
		});
		btnPre.click(function(){
			moveWidth = (parseInt(cell.width()) + parseInt(cell.css("margin-right")) + parseInt(cell.css("margin-left")) + parseInt(cell.css("padding-right")) + parseInt(cell.css("padding-left")) + parseInt(cell.css("border-right-width")) + parseInt(cell.css("border-left-width")))*step;
			if(moveNum > 0) {
				moveNum--;
				currLeft = currLeft + moveWidth;
			}
			else {
				moveNum = moveLimit;
				currLeft = 0-moveLimit*moveWidth;
			}
			$(this).parents("#" + o).find(".moveable").animate({left: currLeft + "px"},scrollTime);
		});
		
		if(autoPlay == true) {
			autoChange = setInterval(function(){
				btnNext.click();
			},autoTime);
			obj.mouseenter(function(){
				clearInterval(autoChange);
			});
			obj.mouseleave(function(){
				autoChange = setInterval(function(){
					btnNext.click();
				},autoTime);
			});
		}
	}
	else {
		btnPre.addClass("preDisable");
		btnNext.addClass("nextDisable");
	}
}

/*弹出窗口*/
function popWinA(s,hover) {
	var objOpner = $("." + s + " .opener");
	var objShuter = $("." + s + " .shuter");
	if(hover == false) {
		if (objOpner.length) {
			objOpner.click(function(){
				if($(this).parents(".over").length) {
					$(this).parents("." + s).removeClass("over");
				}
				else {
					$("." + s).removeClass("over");
					$(this).parents("." + s).addClass("over");
				}
			});
		}
		if (objShuter.length) {
			objShuter.click(function(){
				$(this).parents("." + s).removeClass("over");
			});
		}
	}
	if(hover == true) {
		if (Browser.IE) {
			objOpner.parents("." + s).hover(function(){
				$(this).addClass("over");
			}, function(){
				$(this).removeClass("over");
			});
		}else {
			objOpner.parents("." + s).mouseover(function(){
				$(this).addClass("over");
			}).mouseout(function(){
				$(this).removeClass("over");
			});
		}
	}
}
/*带有延时的弹出窗口*/
function popWinB(s,hover) { 
	var current;
	var timer, timer2;
	var objOpner = $("." + s + " .opener");
	var objShuter = $("." + s + " .shuter");
	if(hover == false) {
		if (objOpner.length) {
			objOpner.click(function(){
				if($(this).parents(".over").length) {
					$(this).parents("." + s).removeClass("over");
				}
				else {
					$("." + s).removeClass("over");
					$(this).parents("." + s).addClass("over");
				}
			});
		}
		if (objShuter.length) {
			objShuter.click(function(){
				$(this).parents("." + s).removeClass("over");
			});
		}
	}
	if(hover == true) {
		if (Browser.IE) {
			objOpner.parents("." + s).hover(function(){
				current = $(this);
				if(timer2) {
					clearTimeout(timer2);
				}
				timer = setTimeout(function(){
					current.parent().children(".over").removeClass("over");
					current.addClass("over");
				},350);
			}, function(){
				if(timer) {
					clearTimeout(timer);
					timer2 = setTimeout(function(){
						current.parent().children(".over").removeClass("over");
					},350);
				}
			});
		}else {
			objOpner.parents("." + s).mouseover(function(){
				current = $(this);
				if(timer2) {
					clearTimeout(timer2);
				}
				timer = setTimeout(function(){
					current.parent().children(".over").removeClass("over");
					current.addClass("over");
				},350);
			})
			objOpner.parents("." + s).mouseleave(function(){
				if(timer) {
					clearTimeout(timer);
					timer2 = setTimeout(function(){
						current.parent().children(".over").removeClass("over");
					},350);
				}
			});
		}
	}
}

/*通用的页面居中弹出层函数*/
function letCenter(o) {
	obj=$("#"+ o);
	var A=document.documentElement.clientWidth;
	var E=document.documentElement.clientHeight;
	var D=obj.height();
	var B=obj.width();
	var C=document.documentElement.scrollTop+document.body.scrollTop
	obj.css({position:"absolute",top:E/2-D/2+C,left:A/2-B/2});
}
function centerPopA(o,clickOut) {
	var opener = $("#" + o + "Opener");
	var popup = $("#" + o);
	opener.click(function(){
		$("#popBack").css({opacity:"0"});
		$("#popBack").show();
		popup.show();
		letCenter(o);
		$(".shuter").click(function(){
			popup.hide();
			$("#popBack").hide();
		});
		if(clickOut === true) {
		    $("select.cmnSelect.selShip.sellType").hide();
			$("#popBack").click(function(){
			    $("select.cmnSelect.selShip.sellType").show();
				popup.hide();
				$("#popBack").hide();
			});
		}
	});
}

var centerPopB = {
    open:function(){
        $("#popBack").css({opacity:"0"});
	    $("#popBack").show();
	},
	close:function(){
	    $("#popBack").hide();
	}
}

function clearLine(o,clearRight,clearBot) { 
//去除九宫格排列的产品的最后一个单元的纵向分隔线，以及最后一行的底部分隔线
//参数：包围窗口ID或CLASS  |  是否清除右边线 bool值  |  是否清除最后一行的线 bool值
	var obj = $(o);
	var cell = obj.children(".itemCell")
	var totalCell = cell.length;
	
	if(clearRight == true) {
		for(i=4; i<=totalCell; i=i+4) {
			cell.children(".inner").eq(i-1).addClass("bdrRW");
		}
	}
	if(clearBot == true) {
		var lastLine = totalCell % 4;
		if(lastLine == 0) {
			lastLine = 4;
		}
		for(i=totalCell - lastLine +1; i<=totalCell; i++) {
			cell.eq(i-1).addClass("noBdrBot");
		}
	}
}

/*自定义显示页数分页控件*/
function initPaginationBarA(defaultText){
    if(!$("#setShowPageNav").length || !$("#btnSetShowPageNav").length) {
        return;
    }
    
	$("#setShowPageNav").focus(function(){
		$("#btnSetShowPageNav").show();
	});
	$("#setShowPageNav").blur(function(){
		if($("#setShowPageNav").val() == "" || $("#setShowPageNav").val() == defaultText) {
			$("#btnSetShowPageNav").hide();
		}
	});
	
	$("#btnSetShowPageNav").click(function(){
		var url = $("#btnSetShowPageNav").attr("ref1");
		var qty = $.trim($("#setShowPageNav").val());
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

/*控制产品横列或纵列布局*/
function initProductListLayout(){
    if(!$(".viewCtrl").length || !$("#listByRow").length || !$("#listByGrid").length || !$(".amount").length)
    {
        return;
    }
    
    $("#listByRow").click(function(){

        switchRowStyle();
	    var jsonObject = JSON.parse('{"GridRow":"Row"}');
        $.newegg.cookie.set("ProductLayOut",jsonObject);
    });
    
    $("#listByGrid").click(function(){

        switchGridStyle();
	    var jsonObject = JSON.parse('{"GridRow":"Grid"}')
        $.newegg.cookie.set("ProductLayOut",jsonObject);

    });
    $(".viewCtrl .amount a").each(function(){
            var page = $(this).find("span");
            if(page.length)
            {
                var pageSize = page.text();
                $(this).click(function(){
                    var jsonObject = JSON.parse('{"PageSize":"'+pageSize+'"}');
                    $.newegg.cookie.set("ProductLayOut",jsonObject);
                });
            }
		});
    
    var style = $.newegg.cookie.get("ProductLayOut", "GridRow");
    if(style == 'Grid')
    {
        switchGridStyle();
    }
    else if(style == 'Row')
    {
        switchRowStyle();
    }
    else
    {
        switchGridStyle();
    }
}

/*列表转换为row排列*/
function switchRowStyle(){
    $(".itemGridA").removeClass("itemGridA").addClass("itemGridB");
		$("#listByRow").removeClass("listByRow").addClass("listByRowOn");
		$("#listByGrid").removeClass("listByGridOn").addClass("listByGrid");
		$(".itemGridB").children(".itemCell").removeClass("noBdrBot");
		clearLine(".itemGridB",true,false);
		$(".itemGridB").children(".itemCell").last().addClass("noBdrBot");
}

/*列表转换为Grid排列*/
function switchGridStyle(){
   $(".itemGridB").removeClass("itemGridB").addClass("itemGridA");
		$("#listByGrid").removeClass("listByGrid").addClass("listByGridOn");
		$("#listByRow").removeClass("listByRowOn").addClass("listByRow");
		$(".itemGridA").children(".itemCell").removeClass("noBdrBot");
		clearLine(".itemGridA",true,true);
}

/* jeff.s.zan
 * Date: 2010-09-20
 * 参数: 容器ID(带#号), 一屏显示的导航项个数 切换间隔时间（毫秒）,动画时间（单帧切换的时间）
 * 使用方法: 
 * 		var 对象名 = new MyImgPlayer();
 *		对象名.loading("#TopAD", 2, 2000);
 */
var slideBannerA = function() {	
	var o;
	var nav
	var navCell;
	var btnPre;
	var btnNext;
	var showedCell;
	var currBanner = 0;
	var currScreen = 1;
	var bannerNum = 0;
	var moveEvent;
	var stepTime = 0;
	var moveHeight = 0;
	var moveWidth = 0;
	var currHeight = 0;
	var currWidth = 0;
	var self = this;
	var aniTime = 300;
	var timer, timer2;
	
	this.loading = function(obj, showCell, alterTime, animTime) {
		o = $(obj);
		nav = o.children(".slideNav");
		navCell = nav.children(".navOuter").children(".moveable").children("a");
		btnPre = nav.children(".pre");
		btnNext = nav.children(".next");
		stepTime = alterTime;
		showedCell = showCell;
		aniTime = animTime;
		bannerNum = $(".bannerOuter a",obj).length;
		moveHeight = o.children(".bannerOuter").children(".moveable").children("a").height();
		moveWidth = (parseInt(navCell.width()) + parseInt(navCell.css("margin-right")) + parseInt(navCell.css("margin-left")) + parseInt(navCell.css("padding-right")) + parseInt(navCell.css("padding-left")) + parseInt(navCell.css("border-right-width")) + parseInt(navCell.css("border-left-width")))*showedCell;
		
		if(bannerNum == 0) {
			o.hide();
		}
		else if(bannerNum == 1) {
			nav.hide();
		}
		else {
			navCell.eq(0).addClass("curr");
			
			this.alterBanner();
			
			(o).children(".bannerOuter").mouseenter(function(){
				clearInterval(moveEvent);
			});
			(o).children(".bannerOuter").mouseleave(function(){
				self.alterBanner();
			});
			navCell.mouseenter(function(){
				clearInterval(moveEvent);
				navCell.eq(currBanner).removeClass("curr");
				currBanner = navCell.index(this);
				self.changeBig(true);
			});
			navCell.mouseleave(function(){
				self.alterBanner();
			});
			
			if(showedCell < bannerNum) {
				btnNext.click(function(){
					currScreen++;
					self.changeScreen(false);
				});
				btnPre.click(function(){
					currScreen--;
					self.changeScreen(false);
				});
			}
			else {
				btnPre.addClass("preDisable")
				btnNext.addClass("nextDisable")
			}
		}
	}
	
	this.alterBanner = function() {
		moveEvent = setInterval(function(){
			currBanner++;
			
			if(currBanner > 1 && (currBanner % showedCell) == 0 && currBanner < bannerNum) {
				currScreen++;
				self.changeScreen(true);
			}
			else if(currBanner >= bannerNum) {
				currBanner = 0;
				currScreen = 1;
				self.changeScreen(false);
			}
			else {
				self.changeBig(true);
			}
		},stepTime);
	}
	
	this.changeBig = function(isDelay) {
		nav.children(".navOuter").children(".moveable").children(".curr").removeClass("curr");
		navCell.eq(currBanner).addClass("curr");
		currHeight = (0-moveHeight*currBanner) +"px";
		if(isDelay == false) {
			o.children(".bannerOuter").children(".moveable").css("margin-top",currHeight);
		}
		else {
			o.children(".bannerOuter").children(".moveable").animate({marginTop:currHeight},aniTime);
		}
	}
	
	this.changeScreen = function(isDelay) {
		if(currScreen > Math.ceil(bannerNum/showedCell)) {
			currScreen = 1;
		}
		if(currScreen < 1) {
			currScreen = Math.ceil(bannerNum/showedCell);
		}
		currWidth = (0-moveWidth*(currScreen-1)) +"px";
		nav.children(".navOuter").children(".moveable").animate({left:currWidth},aniTime);
		currBanner = showedCell*(currScreen-1);
		self.changeBig(isDelay);
	}
}

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
				//alert(currLeft);
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

/*页头所有商品分类菜单展开效果*/
function allCateNav() {
	var timer;
	var currNo;
	var currPop;
	var currNav;
	var tempCurr;
	
	$(".allCateNav").mouseenter(function(){
		$(".allCateNav .catePop").removeClass("catePopShow");
	});
	
	$(".allCateNav .cateLevel1 li").mouseenter(function(){
		currNo = $(this).find("a").attr("rel");
		tempCurr = $(this);
		currPop = $(".allCateNav .catePop" + currNo);
			currNav = tempCurr;
			
		if(timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(function(){
			$(".allCateNav .cateLevel1 .over").removeClass("over");
			$(".allCateNav .catePopShow").removeClass("catePopShow");
			currNav.addClass("over");
			currPop.addClass("catePopShow");
			
			
		},350);
	});
	
	$(".allCateNav .cateLevel1 li").mouseleave(function(){
		if(timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(function(){
			currNav.removeClass("over");
			currPop.removeClass("catePopShow");
		},350);		
	});
	$(".allCateNav .catePop").mouseenter(function(){
		if(timer) {
			clearTimeout(timer);
		}
	});
	$(".allCateNav .catePop").mouseleave(function(){
		currPop = $(".allCateNav .catePopShow");
		currNav = $(".allCateNav .cateLevel1 .over");
		if(timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(function(){
			currNav.removeClass("over");
			currPop.removeClass("catePopShow");
		},350);		
	});
}

/*限制textArea输入框的长度*/
var limitTextAreaInputLength={
	byID:function(id,len){
		var textArea = $("#"+id);
		if(!textArea.length){return;}
	    
		limitTextAreaInputLength.addEvent(textArea,len);
	},
	byClass:function(className,len){
		var textAreaList = $("."+className);
		if(!textAreaList.length){return;}
	    
		textAreaList.each(function(){
			limitTextAreaInputLength.addEvent($(this),len);
		});
	},
	addEvent:function(obj,len){
		obj.keydown(function(){
			 if($(this).val().length > len){return false;}
			  return true;
		});
		
		obj.keyup(function(){
			var text = $(this).val();
			if(text.length > len)
			{
				$(this).val(text.substring(0,len));
			}
		});
	}
}

/*end 通用效果函数*/

/*start 业务函数*/
//搜索提示
var autoFilledKeywords={
	json:null,
	xml:null,
	index:0,	
	key:"",
	formID:"Search",
	textboxID:"topSearch",	// 输入框 ID
	autofilledviewID:"autofilledview", // 弹出层 ID
	url:"",
	deferExec:null,
	keyIndex:0,
	returnIndex:0,
	clickObj:null,
	
	onload:function() {
        var afk=autoFilledKeywords;
        if($(afk.autofilledviewID)){
	        $("#" + afk.autofilledviewID).mouseover(function(event){
	             var o=event.srcElement || event.target;
	            if (o){		
		            if (o.nodeName=="A"){
			            var lastId=afk.index;
			            afk.index=o["id"].replace(/[a-z]/ig,"");				
			            if (lastId==0||lastId!=afk.index) {
				            afk.highlight(afk.index,lastId);
			            }
		            }
		        }
	        });	
		     
			$("#" + afk.autofilledviewID).click(function(event){
				var o = event.srcElement || event.target;
				var keyWord = afk.decodeHtml($(o).text());
		        $("#" + afk.textboxID).val(keyWord);
	        });
        }
       
        if($(afk.textboxID)){
	        $("#" + afk.textboxID).keyup(afk.query);
	        $("#" + afk.textboxID).blur(function(){
	            afk.keyIndex = 0;
	            afk.returnIndex = 0;
	        });
        };
        
        $("body").click(function(event){
	        var o=event.srcElement || event.target;
	        if (o["id"]!=afk.autofilledviewID && o["id"]!=afk.textboxID && autoFilledKeywords.clickObj!=event.target) {
		        afk.hide();
	        };
        });
    },
    
	query:function(event){
		var afk=autoFilledKeywords;
		var keyCode=event.which||event.keyCode;
		switch(keyCode) {				
			case 13:    
			case 37:	
			case 39:    
				break;
				
			case 27:    
				afk.clear();
				break;
				
			case 38:    
				if ($("#" + afk.autofilledviewID).html().length>0){
					afk.show();
					var lastId=afk.index;
					if (lastId<=1){						
						afk.index=$("#" + afk.autofilledviewID + " a").length;
					} else {
						--afk.index;
					};					
					$("#" + afk.textboxID).val(afk.decodeHtml($("#line"+afk.index).text()));
					afk.highlight(afk.index, lastId);
				}
				break;
														
			case 40:   
				if ($("#" + afk.autofilledviewID).html().length>0){
					afk.show();
					var lastId=afk.index;
					if (lastId>=$("#" + afk.autofilledviewID + " a").length){
						afk.index=1; 
					}else{
						++afk.index;
					};
					$("#" + afk.textboxID).val(afk.decodeHtml($("#line"+afk.index).text()));
					afk.highlight(afk.index, lastId);
				};
				break;

			default:
			    if (this.id) {
					var key=jQuery("#" + this.id).val();
					if (key==""){
						afk.clear();
						afk.key="";
						return;
					};

					clearTimeout(afk.deferExec);
					afk.deferExec=setTimeout(function(){
					    var igonreKeys=",9,16,17,19,20,33,34,35,36,37,38,39,40,45,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,144,145,";
					    var n =(igonreKeys.split("," + keyCode + ",")).length -1;
				        if(n <= 0)
				        {
				            afk.keyIndex++;
				            key = escape(key).replace(/\*/g,"%2A").replace(/\+/g,"%2B").replace(/-/g,"%2D").replace(/\./g,"%2E").replace(/\//g,"%2F").replace(/@/g,"%40").replace(/_/g,"%5F");
				            $.ajax({
                                   type: "GET",
                                   dataType: "json",
                                   url: afk.url,
                                   data: "Keyword=" + key,
                                   success: function(msg){
                                       afk.returnIndex++;
                                       if(afk.keyIndex==afk.returnIndex)
                                       {
                                          afk.fill(msg.Data);
                                       }
                                   },
                                   error: function(){
                                       afk.returnIndex++;
                                   }
                                });				
					        };
					},300);
			}
		};
	},
	
	clear:function() {
		var afk=autoFilledKeywords;
		afk.abort();		
		var o=$(afk.autofilledviewID);
		if (o){
		    $(o).empty();
			afk.hide();
		};		
		afk.index=0;
	},
	
	abort:function(){
		var afk=autoFilledKeywords;
		if(afk.xml){
			afk.xml.abort();
		};
	},
	
	show:function(){
		// 显示弹出框
		$("#" + autoFilledKeywords.autofilledviewID).show();
	},
	
	hide:function(){
		// 隐藏弹出框
		$("#" + autoFilledKeywords.autofilledviewID).hide();
	},
	
	highlight:function(id,lastId){	
//		if (id) {
//			var o=$("#line"+id);
//			if (o){
//				$(o).css("background","#DEDEDE");
//				$(o).css("font-weight","bold");
//				$(o).css("color","#F60");
//				$(o).css("text-decoration","none");
//			};
//		};			
//		if (lastId) {
//			var lasto=jQuery("#line"+lastId);
//			if (lasto){
//				$(lasto).css("background","");
//				$(lasto).css("font-weight","");
//				$(lasto).css("color","");
//				$(lasto).css("text-decoration","");
//			};
//		};			
	},
	
	fill:function(el) {
		var afk=autoFilledKeywords;
		json = el;
		if(json){
			var html=[];
			for(var i=0,l=$(json).length;i<l;i++){
			var keyd = json[i].Keyword.replace(/\&/g,"&amp;").replace(/\>/g,"&gt;").replace(/\</g,"&lt;").replace(/\'/g,"&#039;").replace(/\"/g,"&quot;");
			html.push('<a id="line'+(i+1)+'"href="javascript:void(0);">'+ keyd +'</a>');
			};
			
	        $("#" + this.autofilledviewID).html(html.join(""));
			if (html.length>0){
				afk.show();
			}else{
				afk.hide();
			};
		}else{
		    afk.hide();
		};	
	},
	decodeHtml:function(val){
		return val.replace(/(&quot;)/g,"\"").replace(/(&#039;)/ig,"'").replace(/(&lt;)/ig,"<").replace(/(&gt;)/ig,">").replace(/(&amp;)/ig,"&");
	}	    
};

//新窗口打开
var openWinMode= {
    setAsycBlank:function(obj){
        if($.newegg.cookie.get("Blank") != "C" && $("#"+obj))
	    {
		    var regexProductDetail=/Product\/\w{2,3}-\w{2,3}-\w{2,3}-?\w{0,3}\.htm/i;
		    $("#"+obj).find("a").each(function(){
			    if(regexProductDetail.test($(this).attr("href")))
			    {
				    $(this).attr("target",'_blank');
			    }
		    });
	    }
    },
    setAllElement:function(objIdOrClass){
		if($.newegg.cookie.get("Blank") != "C")
		{
			$(objIdOrClass).find("a").each(function(i,link){

				if($(link).attr('ref') != 'noBlank')
				{
					$(link).attr("target",'_blank');
				}
			});
		}
    },
    setElement:function(idOrClass, page, target, flag){
    
		flag = flag || "i";
		var reg = new RegExp(page, flag);
		if(reg.test(window.location.href))
		{
			$(idOrClass).attr("target", target);
		}
    },
	setBlank:function(blank){
	    blank = blank == 'N' ? '_blank' : '';	    
        var currentUrl = window.location.href;
        var links=document.getElementsByTagName("a");
        var regexProductDetail=/Product\/\w{2,3}-\w{2,3}-\w{2,3}-?\w{0,3}\.htm/i; // 明细页面
        var regexShoppingCart=/Shopping\/ShoppingCart\.aspx/i;          // 购物车
        var regexWishList=/Customer\/WishList\.aspx/i;                  // 我的收藏
        var regexHelpCenter=/Service\/HelpCenter\.aspx/i;               // 帮忙中心
        var regexNews=/News\/.*\.htm/i;                               // 公告明细
        var regexNewsList=/NewsList\/.*\.htm/i;                       // 公告列表
        var regexPromotion = /Promotion.*\.htm/i;                      // 促销专区页面
        var regexImport = /Import.*\.htm/i;                      // 进口专区页面
        var regexApple = /Apple.*\.htm/i;                      // 苹果专区页面
        var regexSearch=/Search.aspx/i;                      // 搜索页面
        var regexLogin=/Customer\/Login.aspx/i;                      // 登陆页面
        var regexRegister=/Customer\/Register.aspx/i;                      // 注册页面
        var regexLogout=/Customer\/Logout.aspx/i;                      // 退出页面
        var regexCustomerDefault = /Customer\/Default.aspx/i;                      // 我的新蛋页面
        var regexCustomerRss = /Service\/RssNews.aspx/i;                      // 增值服务页面
        

    	var isHome = false;
		if(location.href.toLowerCase()==$.newegg.buildWWW("default.aspx").toLowerCase() || location.href.toLowerCase()==$.newegg.buildWWW('').toLowerCase())
		{
			isHome = true;
		}
        var link,isCurrentPage;
        var length = links.length;
        
        for(var i=length; i--;)
        {
            link = links[i];
            var linkHref = $(link).attr('href');
            var linkAttr = $(link).attr('ref');
            if(!linkHref)
            {
                linkHref='';
            }
            if(!linkAttr)
            {
                linkAttr='';
            }
            
            isCurrentPage = linkHref.indexOf('#') == -1 ? false : true;
            if(isHome==true)
            {
                if(linkHref!='' && linkHref.indexOf('javascript') == -1 && linkHref != currentUrl && linkAttr != 'noBlank'
                && !regexLogin.test(link) && !regexRegister.test(link) && !regexLogout.test(link) && !regexSearch.test(link)
                && isCurrentPage == false)
                {
                    link.target = blank;
                }
            }
            else
            {
                if(linkAttr != 'noBlank')
                {
                    if(linkAttr == 'blank')
                    {
					    var regexCountDown = /CountDown.*\.htm/i        // 限时抢购
					    var regexTreasurehunt = /Treasurehunt.*\.htm/i  // 寻宝专区
					    var regexOrderQuery = /Order\/OrderQuery.aspx/i     // 我的订单
					    var regexMyGiftCard = /Customer\/MyGiftCard.aspx/i     // 我的礼品卡

					    if(linkHref == currentUrl 
						    || (regexCountDown.test(link) && regexCountDown.test(currentUrl))
						    || (regexOrderQuery.test(link) && regexOrderQuery.test(currentUrl))
						    || (regexMyGiftCard.test(link) && regexMyGiftCard.test(currentUrl))
						    || (regexWishList.test(link) && regexWishList.test(currentUrl))
						    || (regexSearch.test(link) && regexSearch.test(currentUrl))
						    || (regexShoppingCart.test(link) && regexShoppingCart.test(currentUrl))
						    || (regexTreasurehunt.test(link) && regexTreasurehunt.test(currentUrl)))
					    {
						    link.target='';
					    }
					    else
					    {
                            link.target = blank;
                        }
                    }
                    else if(regexProductDetail.test(link) && isCurrentPage == false)                  // 商品明细
                    {
                        link.target=blank;
                    }
                    else if(regexHelpCenter.test(link) && !regexHelpCenter.test(currentUrl))     // 帮忙中心
                    {
                        link.target=blank;
                    }
                    else if(regexNews.test(link) && blank == '_blank')                           // 公告明細
                    {
                        link.target=blank;
                    }
                    else if(regexPromotion.test(link) && !regexPromotion.test(currentUrl))       // 促销页面
                    {
                        link.target=blank;
                    }
                    else if(regexImport.test(link) && !regexImport.test(currentUrl))    // 进口专区页面
                    {
                        link.target=blank;
                    }
                    else if(regexApple.test(link) && !regexApple.test(currentUrl))    // 苹果专区页面
                    {
                        link.target=blank;
                    }                           
                    else if(regexNewsList.test(link) && !regexNewsList.test(currentUrl))          // 公告列表
                    {
                        //link.target=blank;
                    }
                    else if(regexShoppingCart.test(link) && !regexShoppingCart.test(currentUrl)) // 购物车
                    {
                        link.target=blank;
                    }
                    else if(regexWishList.test(link) && !regexWishList.test(currentUrl)) // 我的收藏
                    {
                        link.target=blank;
                    }
                    else if(regexCustomerDefault.test(link) && !regexCustomerDefault.test(currentUrl)) // 我的新蛋
                    {
                        link.target=blank;
                    }
                    else if (regexCustomerRss.test(link) && !regexCustomerRss.test(currentUrl)) // 增值服务
                    {
                        link.target = blank;
                    }
                }
            }
        }
	},
	updateState:function(v){
		var blank = $.newegg.cookie.get('Blank');
		if(blank == v)
	    {
	        return;
	    }
		if(v){
			$.newegg.cookie.set('Blank',v,{topdomain:true,expires:9999});
			openWinMode.setBlank(v);
			var customerID = $.newegg.cookie.get('CustomerLogin', 'ID');
			if(customerID != ''){
				$.post('Ajax/Customer/AjaxCustomerWebsiteProfile.aspx',{displayMethod:v});
			}
		}
		else{
			openWinMode.setBlank(blank);
		};
	},
	initButtonState:function(stateBlank){
		if(stateBlank == 'N')
		{
		    $("#btnNoBlank a").removeClass("curr");
	        $("#btnNewBlank a").addClass("curr");
		}
		else if(stateBlank == 'C')
		{
	        $("#btnNewBlank a").removeClass("curr");
		    $("#btnNoBlank a").addClass("curr");
		}
	},
	init:function(){
		var blank = $.newegg.cookie.get('Blank');
		
		if($("#openSet").length){
			// 仅首页有显示
			$(".btnNewWin").click(function() {
				if($.newegg.cookie.get('Blank')=='N') 
					return;
				
				$("#setOk").show();
				$("#setOk").fadeOut(3000);
				
				openWinMode.initButtonState('N');
				openWinMode.updateState('N');

			});
			//点击新窗口按钮，显示设置成功。
			$(".btnOldWin").click(function() {
				if($.newegg.cookie.get('Blank')=='C') 
					return;
				
				$("#setOk").show();
				$("#setOk").fadeOut(3000);
				
				openWinMode.initButtonState('C');
				openWinMode.updateState('C');

			});
			
			//点击原窗口按钮，显示设置成功。
			if(blank == 'N' || blank == 'C')
			{
				openWinMode.initButtonState(blank);
				openWinMode.setBlank(blank);
			}
			else
			{
				openWinMode.initButtonState('N');
				openWinMode.setBlank('N');
			}
		}
		else
		{
			// 非首页不显示设置
			// 但需要设置是否新窗口
			if(blank != 'C')
			{
				openWinMode.setBlank('N');
			}
		}
	}
};

var loadingMiniCart = false;
//迷你购物车
function miniCart(product, action, obj, callBack){
	var data={};
	if (action == 'load') {
	    if (obj.find('ul').length != 0) {
	        if (typeof (callBack) != "undefined") callBack();
	        return;
	    }
	}
	else if (action == 'delete') {
	    data = { action: 'del', productno: product };
	    loadingMiniCart = false;
	    //omniture
	    try {
	        var s = s_gi(s_account);
	        s.linkTrackVars = 'products,events,prop1,prop11';
	        s.linkTrackEvents = 'scRemove';
	        s.events = 'scRemove';
	        s.prop1 = reportsuite;
	        s.products = product; //购物车中删除的产品，前缀一个分号
	        s_objectID = 'sy-A-2-1-0-xf';
	        s.tl(obj, 'o', 'Shopping Cart Remove');
	        s.linkTracking = false;
	    } catch (ex) { } 
	}
	
	if(loadingMiniCart){
			return;
	}
	loadingMiniCart = true;
	
	var url = $.newegg.buildCurrent('Ajax/Shopping/MiniCart.aspx');
	if($.newegg.isSecurePage()==true)
	{
	    url+='?site=SSLSite';
	}

	$.ajax({
	    type: "GET",
	    url: url,
	    dataType: "html",
	    data: data,
	    success: function(result) {
	        if (action == 'delete' && location.href.toLowerCase().indexOf('shoppingcart.aspx') > 0) {
	            window.location.reload();
	            return;
	        }
	        $("#wmminicart").html($(result));
	        $("#WMheaderCartCount").html($("#minicartTotalQty").attr("value"));
	        $("#WMheaderCartCount1").html($("#minicartTotalQty").attr("value"));
	        $("#CartCount").html($("#minicartTotalQty").attr("value"));
	        $("#TotalAmount").html($("#minicartTotalAmount").attr("value"));
	        $("#emMiniCartNum").text($("#header .mycart .state .pronum").text());
	        UI.Xslider(".minicartwrap", {
	            dir: "V",
	            viewedSize: 231,
	            unitLen: 77,
	            unitDisplayed: 3,
	            numtoMove: 3,
	            speed: 600
	        });
	    },
	    complete: function() {
	        if (typeof (callBack) != "undefined") callBack();
	        loadingMiniCart = false;
	    }
	});
}	
//初始化搜索
function initSearch(){
	var searchObj=$('#topSearch');
	if(!searchObj) {return;}
	
	searchObj.keydown(function(event){
      if(event.keyCode==13) 
      {
          doSearch();
          return false;
      }
    }); 
};
//点击搜索
function doSearch(){
	var searchObj=$('#topSearch');
    var keywords=$.trim(searchObj.val());
    var searchValue = "搜索商品";
    if(keywords.length==0 || keywords==searchValue)
    {        
        alert(resources_Head.mustInputKeyWords);
        return;
    }
    
    keywords = escape(keywords);
    keywords = keywords.replace(/\#/g,"%23").replace(/\&/g,"%26").replace(/\+/g,"%2B");
    
    var currentUrl = window.location.href;
    var regexSearch=/search.action/i;
    var isHome = false;
	if(location.href.toLowerCase()==$.newegg.buildWWW("default.action").toLowerCase() || location.href.toLowerCase()==$.newegg.buildWWW('').toLowerCase())
	{
		isHome = true;
	}
	
    if(isHome == true || regexSearch.test(currentUrl))
    {
        location.href= $.newegg.buildWWW('search.action')+"?keyword="+keywords;
    }
    else
    {
        window.open( $.newegg.buildWWW('search.action')+"?keyword="+keywords);
    }
}
// 简洁版
function initLogined(loginUrl,logoutUrl){
	
	var loginWelcomeInfo = '',loginInfo ='';
	var goodDay = getDateWelcome();
	if(username != ''){
		loginWelcomeInfo = $.newegg.format( resources_Head.welcome_Login3 , goodDay );
        loginInfo = $.newegg.format(resources_Head.logOut2, loginUrl,"/myshop/logout.action");
	}else{
		loginWelcomeInfo = $.newegg.format( resources_Head.welcome_Login3 , goodDay );
        loginInfo = $.newegg.format(resources_Head.login2, loginUrl,"/myshop/account/user!input.action");
	}
	return loginWelcomeInfo + loginInfo;
	
}


//新版页头欢迎 by Ted 2011-4-7
function initLogin(loginUrl,logoutUrl){
    var customerID=decodeURI(escape($.newegg.cookie.get("LoginValidate", "CID")))
        ,ThirdPartType=decodeURI(escape($.newegg.cookie.get('LoginValidate', 'Type')))
        ,ThirdPartName=decodeURI(escape($.newegg.cookie.get('LoginValidate', 'ThirdPartName')))
        ,ThirdPartSubName=decodeURI(escape($.newegg.cookie.get('LoginValidate', 'ThirdPartSubName')))
        ,ThirdPartCustomerName=decodeURI(escape($.newegg.cookie.get('LoginValidate', 'ThirdPartCustomerName')))
		,loginWelcomeInfo = ''
		,loginInfo ='';
	var goodDay = getDateWelcome();
	if (customerID!='' && ThirdPartType=='') {
	    //cookie中只有customerID，新蛋用户
	    //Barkbread 晚上好,欢迎来新蛋购物！ 不是 Barkbread...? 重新登录
	   if(resolution!="1280") {
	     customerNameFirst=countWidth(customerID,13,"...")
	     customerNameSecond=countWidth(customerID,9,"...")
	   } else {
	     customerNameFirst=countWidth(customerID,20,"...")
	     customerNameSecond=countWidth(customerID,20,"...")
	   }
        loginWelcomeInfo = $.newegg.format( resources_Head.welcome_Login4 , customerNameFirst , goodDay );
        loginInfo = $.newegg.format(resources_Head.logOut2, logoutUrl, customerNameSecond );
	}
	else if(customerID!=''&& ThirdPartType!='')
	{
	    //第三方登录
	    //亲爱的QQ/财付通用户 Barkbread您好！ 不是 Barkbread...? 重新登录
	    var customerName = decodeURI(escape($.newegg.cookie.get('LoginValidate','ThirdPartPassportUserName')))
			|| decodeURI(escape($.newegg.cookie.get('LoginValidate','ThirdPartCustomerName')))
			|| customerID;
	    var showThirdPartyName  = ThirdPartSubName.length > 0 ? ThirdPartSubName : ThirdPartName;
	    
	    //显示第三方登录用户名
	   if(resolution!="1280")
	   {
	     customerNameFirst=countWidth(customerName,9,"...")
	     customerNameSecond=countWidth(customerName,6,"...")
	   }
	   else
	   {
	     customerNameFirst=countWidth(customerName,20,"...")
	     customerNameSecond=countWidth(customerName,20,"...")
	   }
	   
	    //支付宝金账户使用
	    var welcome_ThirdLogin = (ThirdPartName == resources_Head.nameAliPayJinZhangHu ? resources_Head.welcome_ThirdLogin3 : resources_Head.welcome_ThirdLogin2);
	   
	    loginWelcomeInfo = $.newegg.format(welcome_ThirdLogin,showThirdPartyName, customerNameFirst);
        loginInfo = $.newegg.format(resources_Head.logOut2, logoutUrl, customerNameSecond ); 
	    
	}
	else //if(customerID==''&& ThirdPartType=='')
	{
	    //cookie中没有任何记录
	    //晚上好,欢迎来新蛋购物！ 请登录 免费注册 
        loginWelcomeInfo = $.newegg.format( resources_Head.welcome_Login3 , goodDay );
        loginInfo = $.newegg.format(resources_Head.login2, loginUrl,"/myshop/account/user!input.action");
	}
	
	return loginWelcomeInfo + loginInfo;
}

function countWidth(str,maxWidth,symbol)
{
    //中文字约等于2个字母的宽度
    var tmp="";
    var strLength=str.replace(/[^\x00-\xff]/g,"**").length
    while(strLength>maxWidth)
    {
        str=str.slice(0,-1);
        strLength=str.replace(/[^\x00-\xff]/g,"**").length
        if(strLength<=maxWidth)
        {
          while((maxWidth-str.replace(/[^\x00-\xff]/g,"**").length)<3)
          {
            str=str.slice(0,-1);
          }
          str+=symbol;
        }
    }
    return str;
}

function getDateWelcome(){
	var now = new Date();
	var hour = now.getHours();

	var welcome = '';
	if(hour >= 5 && hour < 9){
		welcome = resources_Head.Morning1;
	}
	else if(hour >= 9 && hour < 12){
		welcome = resources_Head.Morning2;
	}
	else if(hour >= 12 && hour < 14){
		welcome = resources_Head.Noon;
	}
	else if(hour >= 14 && hour < 18){
		welcome = resources_Head.Afternoon;
	}
	else{
		welcome = resources_Head.Night;
	}
	
	return welcome;
}

//cm_mmc
function initCMMC(){
	var cmmc = $.trim($.newegg.querystring.get('cm_mmc'));
	if(!cmmc){
		return;
	};

	var cmpType='cmp';
	if(cmmc.indexOf('google')>-1){
		cmpType='google';
	};

	$.newegg.cookie.set('NewAdvEffectMonitor',{Advalue:cmmc,Type:cmpType},{topdomain:true,expires:5});
}

//订阅特惠信息
function subScription(){
	var mail = $.trim($("#txtEmail").val());
	if(mail.length==0 )
	{
		alert(resources_Home.mailEmpty);
		return;
	}
	
	var validateReg =/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE\uFFFF]/;
	var pattern =/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
		
	if(validateReg.test(mail)==true || pattern.test(mail)==false)
	{
		alert(resources_Home.addressError);
		return;
	}

	var mailData = { EMail: escape(mail),SelectedSubscription:(""),OtherSubscription:(""),CellPhone:(""),HomePageSub:("Y") };
	var url=$.newegg.buildWWW("Ajax/Common/AjaxSubscription.aspx");
	$.post(url,mailData,
	function(data){
	            alert(data.Description);
	            $("#txtEmail").attr("value",'输入电邮地址');
	            $("#txtEmail").addClass("hasDefaultText");
	            //defaultText();
	            },
	"json");
}

function openPostWindow(url, data)  
{  
	var form = $("<form></form>")
    form.attr('action',url)
    form.attr('method','post')
    form.attr('target','_blank')
    input1 = $("<input type='hidden' name='tempForm1Content' />")
    input1.attr('value',data)
    form.append(input1);
    form.appendTo("body");
    form.css('display','none');
    form.submit();
}

function getPollResultItemList(pollItems, isTextArea)
{
	var pollResultItemList = new Array();	
	if(typeof(pollItems) != 'undefined')
     {		
		var length = pollItems.length;
		if(length > 0)
		{
			var tempIdArray;
			var tempPollItem;
			pollItems.each(function(){					
				if(isTextArea == false || 
					$.trim($(this).val()).length > 0)
				{
					tempIdArray = $(this).attr('id').split('-');
					tempPollItem = {
						"PollGroupType" : tempIdArray[0],
						"PollGroupSysNo" : tempIdArray[1],
						"PollGroupItemSysNo" : tempIdArray[2]
					};
					if(isTextArea)
					{
						tempPollItem.AnswerContent = $.trim($(this).val());
					}
					else if(tempIdArray[2] == 0)
					{
						tempPollItem.AnswerContent = ''
					}
					pollResultItemList.push(tempPollItem);
				}	
			});		
		}
     }
     return pollResultItemList;
}

function clickNPoll(pollSysNo,pollDivId){
    var url=$.newegg.buildWWW("Service/Poll.aspx")+"?PollSysno="+pollSysNo;	
	if(pollDivId!="OnlyView")	
	{
	    var pollResultInfo = {};
	    pollResultInfo.PollSysNo = pollSysNo;	
		var pollItems = $("#" + pollDivId +" input:checked");    
		pollResultInfo.ResultItemList = getPollResultItemList(pollItems, false);
		pollItems = $("#" + pollDivId).find("textarea");    
		pollResultInfo.ResultItemList = pollResultInfo.ResultItemList.concat(getPollResultItemList(pollItems, true));   
	    openPostWindow(url, JSON.stringify(pollResultInfo));
	}  
	else
	{
	   window.open(url,"","");	
	}
}

//投票
function clickPoll(pollSysNo,type){
    var pollItemSysNo = $(".voteContent input:checked").val();
    if(typeof(pollItemSysNo)=='undefined')
    {
        pollItemSysNo=0;
    }
	var url = $.newegg.buildWWW("Service/Poll.aspx")+"?"+"PollSysno="+pollSysNo+"&PollType="+type;
	if(type=="1"){
		url += "&PollItemSysno="+pollItemSysNo;
	}
	window.open(url,"","");	
}

/* 可信站点 */
function change_CNNIC(eleId)
{
	var str= document.getElementById(eleId).href;
	var str1 =str.substring(0,(str.length-6));
	str1+=RndNum_CNNIC(6);	
	document.getElementById(eleId).href=str1;
}

function RndNum_CNNIC(k)
{
	var rnd="";

	for (var i=0;i < k;i++)

	rnd+=Math.floor(Math.random()*10);
	
	return rnd;
}
// 加载我的收藏数据
var loadingMyFavorite = false;
function myFavorite(obj, callBack){
	if(obj.html() != ""){		
			if(callBack) callBack();
			return;
	}

	if(loadingMyFavorite){
		return;
	}
	loadingMyFavorite = true;
	
	//因为这个里面有返回产品图片链接，因此要特殊处理，访问不同的ajax页面
	var url = $.newegg.buildCurrent('Ajax/Customer/AjaxMyWishList.aspx');
	var paramSign="?";
	if(typeof(pageAlias)!="undefined"){	
	    url += paramSign + fromPageAliasKey + '=' + pageAlias;
	    paramSign="&";
	}
	
	if($.newegg.isSecurePage()==true)
	{
	    url +=paramSign+'site=SSLSite';
	    paramSign="&";
	}

	$.get(url,null,function(result){
			loadingMyFavorite = false;
			obj.html($(result));
			if(callBack) callBack();
		},
		"html"
	);
}
// 加载页头浏览记录
var loadingBrowserHistory = false;
function browserHistory(obj, callBack, force){
	if(!force && obj.html() != ""){		
			if(callBack) callBack();
			return;
	}

	if(loadingBrowserHistory){
		return;
	}
	loadingBrowserHistory = true;

	var url = $.newegg.buildCurrent('Ajax/Product/AjaxProBrowseH.aspx?type=head');
	
	if($.newegg.isSecurePage()==true)
	{
	    url+='&site=SSLSite';
	}
	
	$.get(url,null,function(result){
			loadingBrowserHistory = false;
			obj.html($(result));
			if(callBack) callBack();
		},
		"html"
	);
}
// 加载页头导航菜单
var loadingHeaderAllCateNav = false;
function headerAllCateNav(obj, callBack){
	if(obj.html() != ""){		
			if(callBack) callBack();
			return;
	}

	if(loadingHeaderAllCateNav){
		return;
	}
	loadingHeaderAllCateNav = true;

	var url = $.newegg.buildCurrent('Ajax/Navigation/Navigation.aspx');
	
	if($.newegg.isSecurePage()==true)
	{
	    url+='?site=SSLSite';
	}
	
	$.get(url,null,function(result){
			loadingHeaderAllCateNav = false;
			obj.html($(result));
	    	//初始化页头类别的导航菜单动作
	        allCateNav();

			if(callBack) callBack();
		},
		"html"
	);
}
// 清除页头商品浏览记录
function clearBrowserHistory(){
	$.newegg.cookie.clear('BrowsedProductSysNoList',{topdomain:true});
	if($("#browserhistory").length) {
		browserHistory($("#browserhistory"), null, true);
	}
	return false;
}
// 清除页头搜索记录
function clearSearchHistory(){
	$.newegg.cookie.clear('SearchKeyword',{topdomain:true});
	if($("#browserhistory").length) {
		browserHistory($("#browserhistory"), null, true);
	}
	return false;
}
/*首页页头顶部的展开收缩广告效果*/
var bannerAdTopTimer;
function bannerAdTop() {
    if($("#bannerAdTop").length && $("#bannerAdTopS").length)
    {
	    $.newegg.cookie.set("AdTop",JSON.parse('{"adSysNo":'+adSysNo+'}'),JSON.parse('{"expires":9999}'));  
	    bannerAdTopTimer = setTimeout(function(){
		    $("#bannerAdTop").slideUp("slow");
		    $("#bannerAdTopS").delay(200).slideDown();
	    },5000);
	}
}
function bannerAdTopClick() {
    if($("#bannerAdTop").length && $("#bannerAdTopS").length)
    {
        $("#bannerAdTopS").click(function(){
		    $(this).slideUp();
		    $("#bannerAdTop").slideDown("slow");
	    });
    	
	    $("#bannerAdTop .shuter").click(function(){
		    $("#bannerAdTop").slideUp("slow");
		    $("#bannerAdTopS").delay(200).slideDown();
		    clearTimeout(bannerAdTopTimer);
	    });
	}
}

/*end 业务函数*/

jQuery(function($) {
	//初始化CMMC cookie
//	initCMMC();
    //Banner
//	imgPlayer.init();
	//新窗口打开
//    openWinMode.init();
});

function getQueryString(paras){ 
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

function customerCoreMetrics(pageid, pagecg){
    var ifIEJumpList = getQueryString("source");
    if(ifIEJumpList == "IE9jumplist"){
        cmCreatePageviewTag(pageid + ":IE9jumplist",pagecg,null,null);
    }
}

/*
* @Method CheckLoginTime
* 检查新蛋用户登陆时间，如果登录时间小于1小时，返回True，否则返回False
*/
function CheckLoginTime(checkOutTimer)
{
    // 新蛋账户，检查是否是一小时以内登录，如果不是跳转到登陆页面强制登录
    var datetime = $.newegg.cookie.get('CustomerLogin','LoginTime');
    
    if(datetime === '')
    {
        return false;
    }
    
    // 剔出需要构建的参数（年、月、日、时、分）
    var year = datetime.substr(0,4);
    datetime = datetime.substr(4,datetime.length);
    var month = datetime.substr(0,2);
    month = parseInt(month,10);
    month--;
    datetime = datetime.substr(2,datetime.length);
    var day =  datetime.substr(0,2);
    datetime = datetime.substr(2,datetime.length);
    var hours = datetime.substr(0,2);
    hours = parseInt(hours,10);
    datetime = datetime.substr(2,datetime.length);
    var minutes = datetime.substr(0,2);
    minutes = parseInt(minutes,10);
    datetime = datetime.substr(2,datetime.length);
    var second = datetime.substr(0,2);
    second = parseInt(second,10);
    
    // 构建比较变量
    var compare1 = new Date();
    var compare2 = new Date();
    compare2.setFullYear(year);
    compare2.setMonth(month);
    compare2.setDate(day);
    compare2.setHours(hours);
    compare2.setMinutes(minutes);
    compare2.setSeconds(second);
    
    var compareVal = compare1.getTime() - compare2.getTime();
    
    return compareVal < checkOutTimer * 1000;
}

/*
* @Method MiniShopCartCheckOut
* 迷你购物车跳转CheckOut页面
* 如果是新蛋用户且一小时以内登陆的直接跳转到CheckOut页面
*/
function MiniShopCartCheckOut(e, checkOutTimer,isNeedCheckGift)
{
    if (isNeedCheckGift) {
        var url = $.newegg.buildCurrent('shop/miniCart.aspx');
        var data = { action: 'CheckHasNeweggGift' };
        if ($.newegg.isSecurePage() == true) {
            url += '?site=SSLSite';
        }

        window.location = $.newegg.buildWWW('Shopping/ShoppingCart.aspx');
        
        //暂时拿掉，已确定点击迷你购物车结算跳转到购物车页面，不再迷你购物车判断赠品逻辑
        //	    $.get(url,data,function(result){
        //	            var value;
        //	            $(result).each(function(){
        //	                               if(this.id="hidMiniCouldSelectGift"){
        //	                                          value=this.value;
        //	                                          }
        //	                                     });
        //			    if(value==1)
        //			    {
        //				    $("#selectGift").show();
        //			    }
        //			    else if(value==0)	
        //			    {
        //    			    if(MiniShopCartCheckOut(e, checkOutTimer,false))
        //    			    {
        //    			        window.location = $.newegg.buildSSL('Shopping/CheckOut.aspx');
        //    			       return;
        //    			    }
        //			    }	
        //			    if(typeof(callBack) != "undefined") callBack();
        //		    },
        //		    "html"
        //	    );
        return false;
    }
    if(mini.enable){
        var result = mini.checkLogin(e, checkOutTimer);
        if(!result){
            // hide minicart
             
             $("#minicart").parent().trigger("mouseout");
        }
        
        return result;
    }else{
        var url = $.newegg.buildCurrent('shopping/CheckOut.aspx');
        var loginTime = $.newegg.cookie.get('CustomerLogin','LoginTime');
         if( $.newegg.cookie.get('LoginValidate',"Type").length > 0 
        || (
            $.newegg.cookie.get('ThirdPartyLogin',"LogonType").length > 0 
            && $.newegg.cookie.get('ThirdPartyLogin',"LogonType") !="None")
        ) 
        {
           window.location = url;
        }
        else if(loginTime !== "")
        {
            if(CheckLoginTime(checkOutTimer))
            {
                window.location = url;
            }else
            {
                window.location =$.newegg.buildWWW("Shopping/Login.aspx", "secure")+"?ReturnUrl="+encodeURIComponent(url);
            }
        }
        else
        {
            window.location =$.newegg.buildWWW("Shopping/Login.aspx", "secure")+"?ReturnUrl="+encodeURIComponent(url);        
        }
    }
}
function CmnBtnCheckLogin(e, noMiniCallback)
{
     var url = $(e).attr("href");
     if(mini.enable)
     {
        return mini.checkLogin(e);
     }
     else
     {
        if(noMiniCallback){
            url = noMiniCallback();
        }
        return CommonCheckLogin(url);
     }   
}
function CommonCheckLogin(url){
    if($.newegg.cookie.get("CustomerLogin", "ID") == '')
    {
	    CommonRedirectLogin(url);
	    return false;
    }
    else
    {
	    return true;
    }
}
function CommonRedirectLogin(returnUrl)
{
	window.location.href=$.newegg.buildSSL("logim.action")+"?ReturnUrl="+encodeURIComponent(returnUrl);
}
/*
* @namespace
* @description 迷你登录
*/
var mini = {
    /*
    * 是否启用迷你登录
    */
    enable: true,
    /*
    * @private
    * 登录层ID
    */
    extendId: '',
    /*
    * @private
    * 登录层ID
    */
    loginID: 'miniLogin',
    /*
    * @private
    * 注册层ID
    */
    regID: 'miniRegister',
    /*
    * @private
    * 保持页面跳转 Url
    */
    returnUrl: '',
    /*
    * @private
    * 保持页面执行函数名称
    */
    callBackName: '',
    /*
    * @private
    * 保持页面触发 link 的onclick事件的id
    */
    callBackID: '',
    /*
    * @private
    * 保持页面触发 link 的onclick事件的id
    */
    random: '',

    initPopup: function() {
        if (typeof mini.popup == "object") {
            return mini.popup;
        }
        else {
            mini.popup = PopWin(".miniloginBoxCtner", {
                animate: true,
                olSpeed: 0,
                overlay: "#overlay_transparent"
            });

            return mini.popup;
        }
    },

    popup: '',

    /*
    * @param {string} o 迷你登录层 ID
    * @param {string} url 迷你登录Url
    * @param {string} returnUrl 迷你登录成功跳转Url
    * @param {string} callBack 迷你登录成功执行callBack
    * @param {string} callBackId 迷你登录成功执行callBackId的onlick事件
    * @description 打开迷你迷你登录
    * @returns {void}
    */
    login: function(o, url, returnUrl, callBack, callBackId, width, height) {
        // var popup = $("#" + o);
        var popup = mini.initPopup.call();

        var iframeID = o + mini.extendId;
        // 动态创建Iframe
        var found = true;
        var iframe = $("#" + iframeID);
        if (!iframe.length) {
            iframe = $($.newegg.format('<iframe id="{0}" scrolling="no" frameborder="0" ></iframe>', iframeID));
            found = false;
        }
        if (width && height) {
            iframe.attr("style", "border:0;height:" + height + "px;width:" + width + "px;");
        } else {
            iframe.attr("style", "border:0;height: 336px;width: 329px;");
        }

        callBack = callBack || '';
        callBackId = callBackId || '';

        var siteName = encodeURIComponent(mini.getSiteName());
        var and = "";
        if (url.indexOf("?") == -1) {
            and = "?siteName=" + siteName;
        } else {
            and = "&siteName=" + siteName;
        }

        url += and + "&r=" + mini.random + "&CallBack=" + encodeURIComponent(callBack) + "&CallBackId=" + encodeURIComponent(callBackId) + "&ReturnUrl=" + encodeURIComponent(returnUrl);

        iframe.attr("src", url);
        if (!found) {
            $("#" + o + " .centerPopBody").append(iframe);
        }
        if (Browser.IE6)
            iframe.attr("src", url);

        popup.fn.popIn();

    },
    /*
    * @description 关闭迷你登录显示层
    * @returns {void}
    */
    hide: function(o) {
        var popup = mini.initPopup.call();
        popup.fn.popOut();

        mini.random = Math.random();
    },
    /*
    * @param {method} c 动态执行JS
    * @description 动态执行JS
    * @returns {void}
    */
    callBack: function(c, cid) {
        mini.hide(mini.loginID);
        //mini.hide(mini.regID);

        if (c) {
            if (typeof (c) == "string") {
                eval(c + "();");
            }
            else {
                c();
            }
        } else {
            var action = Browser.IE ? "onclick" : "click";

            if ($("#" + cid).length) {
                $("#" + cid).trigger(action);
            }
            else if ($("." + cid).length) {
                $("." + cid).trigger(action);
            }
        }

        if ($(".welcome").length) {
            var loginUrl = $.newegg.buildSSL("login.action");
            var logoutUrl = $.newegg.buildCurrent("logou.action");
            loginText = initLogin(loginUrl, logoutUrl);
            $('.welcome').html(loginText);
        }
    },
    /*
    * @description 验证未登录状态显示迷你登录
    * 迷你购物车跳转CheckOut页面
    * 如果是新蛋用户且一小时以内登陆的直接跳转到CheckOut页面
    * @param {object} e link，包含跳转href,c:callback函数名称
    * @param {int} checkOutTimer 登录超时时间
    */
    checkLogin: function(e, checkOutTimer) {
        e = $(e);

        if (!mini.enable) {
            return true; //
        }
        var url = $.newegg.buildSSL("myshop/account/user!newlogin.action");
        mini.callBackName = e.attr("c");
        mini.callBackID = e.attr("cid");
        mini.returnUrl = mini.returnUrl || e.attr("href");

        if ($.newegg.cookie.get("CustomerLogin", "ID") == '') {
            // 弹出迷你登录框
            mini.login(mini.loginID, url, mini.returnUrl, mini.callBackName, mini.callBackID);
            shoppingIsLogin = 1;
            return false;
        } else {
            // 登录状态
            if (checkOutTimer) {
                // 登录超时验证
                var loginTime = $.newegg.cookie.get('CustomerLogin', 'LoginTime');

                // 第三方登录不限制
                if ($.newegg.cookie.get('LoginValidate', "Type").length > 0
                || (
                    $.newegg.cookie.get('ThirdPartyLogin', "LogonType").length > 0
                    && $.newegg.cookie.get('ThirdPartyLogin', "LogonType") != "None")
                ) {
                    return true;
                }
                else if (loginTime !== "" && CheckLoginTime(checkOutTimer)) {
                    return true;
                }
                else {
                    mini.login(mini.loginID, url, mini.returnUrl, mini.callBackName, mini.callBackID);
                    return false;
                }
            }

            return true;
        }
    },
    /*
    * @description 切换显示迷你登录
    * @returns {void}
    */
    changeLogin: function() {
        mini.hide(mini.regID);
        var url = $.newegg.buildSSL("myshop/account/user!newlogin.action");
        mini.login(mini.loginID, url, mini.returnUrl, mini.callBackName, mini.callBackID);
    },
    /*
    * @description 切换显示迷你注册
    * @returns {void}
    */
    changeReg: function() {
        mini.hide(mini.loginID);
        var url = $.newegg.buildSSL("miniRegister.action");
        mini.login(mini.regID, url, mini.returnUrl, mini.callBackName, mini.callBackID, 470, 395);
    },
    /*
    * @private
    * @description 获取当前页面的类型
    * @returns {void}
    */
    getSiteName: function() {
        var siteName = '';
        var url = location.href;
        if (url.indexOf(wwwSite) == 0) {
            siteName = "wwwSite";
        } else if (url.indexOf(sslSite) == 0) {
            siteName = "sslSite";
        } else if (url.indexOf(shopperSite) == 0) {
            siteName = "shopperSite";
        } else {
            siteName = $.newegg.buildCurrent('');
        }
        return siteName;
    }
};

mini.extendId = Math.random().toString().substring(2);

/*
* @description 加入收藏夹
* 迷你购物车跳转CheckOut页面
* 如果是新蛋用户且一小时以内登陆的直接跳转到CheckOut页面
* @param {object} e link，包含跳转href,c:callback函数名称
* @param {int} checkOutTimer 登录超时时间
*/
function AddToWishList(e, id,t){
    if(t==null)
        t="#addToWish .info p strong span";
    
   mini.returnUrl = location.href;
   
   if(!CmnBtnCheckLogin(e, function(){
    return location.href;
   })){
        return false;
   }
    
    $.getJSON($.newegg.buildCurrent('Ajax/Customer/AjaxWishList.aspx?action=Add&productno=' + id+'&callback=?'),function(data){
            if(data==true)
            {
                $("#popBack").css({opacity:"0"});
                $("#popBack").show();
                $("#addToWish").show();
                letCenter("addToWish");
                $(t).text($("#pro"+id).text());

                $(".shuter").unbind("click");
                $(".shuter").click(function(){
                    $("#addToWish").hide();
                    $("#popBack").hide();
                    return false;
                });
                
                $("#popBack").unbind("click");
                $("#popBack").click(function(){
	                popup.hide();
	                $("#popBack").hide();
                });
            }
        }
     );
            
    return false;
}

var groupbuyHome={
    FromJson : function(text) {
		try{
			return eval('('+text+')');
		}catch(e){
			return false;
		};
	},
    init:function(){
	    if($("#groupBuying")!=null) {
        var ajaxUrl=$.newegg.buildCurrent("Ajax/Product/AjaxGroupBuyingHomeSellCount.aspx");
         $.ajax({
                type: "get",
                dataType: "json",
                url:ajaxUrl,
                data:{"sysnolist":resources_Home.groupBuySysnoList},
                timeout: 30000,
                beforeSend: function(XMLHttpRequest) {
                },
                success: function(data, textStatus) {
                   if(data!=null && data.Data!=null){
                    var returnList=groupbuyHome.FromJson(data.Data);
                        $(returnList).each(function(){
                           var spanID="#groupbuy_sellcount_"+this.sysno;
                           var groupSpan=$(spanID);
                           if(groupSpan!=null){
                                groupSpan.html($.newegg.format(resources_Home.groupBuyDesc,this.count));
                           }
	                    });
                   }
                },
                complete: function(XMLHttpRequest, textStatus) {
                },
                error: function() {     
                }
            });
        }
	}
}

var coremetricsProductUrl={
    load :function(){
        var re = new RegExp("^"+wwwSite+'+\/Product\/\\S+\\.htm');
        $("a").each(function(){
           var href=$(this).attr("href");
           if(typeof(href)!="undefined" && href.length>0 && re.test(href)){
              $(this).attr("href",coremetricsProductUrl.urlAddOrUpdateParam(href,fromPageAliasKey,pageAlias));
           }
        });
    },
    urlAddOrUpdateParam:function(url, paramName, paramVal){
        var _index = url.lastIndexOf("?");
        if (_index > 0){
            if(coremetricsProductUrl.getparmByUrl(url,paramName)==""){
                if (_index < (url.length - 1)){
                    url += "&" + paramName + "=" + paramVal;
                }
                else{
                    url += paramName + "=" + paramVal;
                }
            }
        }
        else {
            url += "?" + paramName + "=" + paramVal;
        }
        return url;     
    },
    getparmByUrl:function (url,parmName) {
        var arr = url.split("?");
        var parms = arr[1];
        var parmList = parms.split("&");
        var parmItem;
        for (var i = 0; i < parmList.length; i++) {
            parmItem = parmList[i].split("=");
            if (parmItem[0] == parmName && parmItem.length==2)
                return parmItem[1];
        }
        return ""
    }
}

// 倒计时定时器
// author:bill.s.li
// createdate:2011-11-07
var countdown = function(objLst){
    var _self = this;
    this.objLst = objLst.length?objLst:null;
    this._onstart = null;
    this._oncomplete = null;
    this._oninterval = null;
    this._timer = null;
    this.start = function(){
        if(_self._timer === null && _self.objLst !== null){
            _self._timer = setInterval(_self._handler,1000);
            if(_self._onstart !== null)
            {
                $(_self.objLst).each(
                    function(){
                        var obj = {
                        hour:Math.floor(this.left/(60*60)),
                        minutes:Math.floor(this.left/(60)) % 60,
                        second:Math.floor(this.left) % 60,
                        id:this.id};        
                        _self._onstart(obj.id,obj.hour,obj.minutes,obj.second);
                    }
                );
            }
        }    
                 
        return _self;
    }
    
    this.stop = function(){
        if(this._timer !== null){
            clearInterval(_self._timer);
            
            // 清理变量
            delete _self._timer;
            delete _self.objLst;
        }
    }
    
    this._handler = function(){
        $(_self.objLst).each(
            function(data,idx){
               if(this !== null)
               {
                   if(this.left > 0)
                   {
                        this.left--;
                   }
                   if(this.left === 0)
                   {
                        _self._oninterval(this.id,0,0,0);
                        _self._oncomplete(this.id,this);
                        if(this.left <= 0)
                        {
                            _self.objLst[idx] = null;
                        }
                   }
                   else
                   {
                       var obj = {
                            hour:Math.floor(this.left/(60*60)),
                            minutes:Math.floor(this.left/(60)) % 60,
                            second:Math.floor(this.left) % 60,
                            id:this.id
                        };
                        
                        _self._oninterval(obj.id,obj.hour,obj.minutes,obj.second);
                    }
                }
            }
        );
        
        if(_self._isover() === true)
        {
            _self.stop();
        }
    }
    
    this._isover = function(){
        var flg = true;
        $(this.objLst).each(
            function(){
                if(this !== null&&typeof this !== "function")
                {
                    flg = false;
                    return false;
                }
            }
        );
        
        return flg;
    }
    
    this.onstart = function(fn){
        if(typeof fn === "function")
            _self._onstart = fn;
        return _self;
    }
    
    this.oncomplete = function(fn){
        if(typeof fn === "function")
            _self._oncomplete = fn;
        return _self;
    }
    
    this.oninterval = function(fn){
        if(typeof fn === "function")
            _self._oninterval = fn;
        return _self;
    }
    
    return this;
};

//限时抢购
var countDown={
	interv:{},
	array:[],
	init:function(pageType,pageID){
		if($(".timeLeft").length) {
		var url=$.newegg.buildWWW("Ajax/Common/AjaxHomepageCountDown.aspx?PageType="+pageType+"&PageID="+pageID);
		$.getJSON(url,function(data){
					$(".timeLeft").each(function(){
						var obj = this;
						var cid = $(this).attr("id");
						countDown.array.push({cID:cid,cObj:obj,left:0});
					});
					if($(data).length)
					{
						for (var i = 0,l=countDown.array.length; i < l; i++)
						{
							$(data).each(function(){
								if(this.id == countDown.array[i].cID)
								{
									countDown.array[i].left = this.leftTime;
								}
							});
						}
					}
					
					countDown.interv = setInterval(countDown.start,1000); 
				}
			);
		}
	},
	start:function(){
		var allStopped = true;
		for (var i = 0,l=countDown.array.length; i < l; i++)
		{
			if(countDown.array[i].cObj != null)
			{
				allStopped = false;
				var obj = countDown.array[i].cObj;
				countDown.array[i].left-=1;
				var leftTime = countDown.array[i].left;
				
				if(leftTime <= 0)
				{
					countDown.array[i].cObj = null;
					
						$(obj).find("em").each(function(i){
						if(i==0)
						{   
							$(this).text(0);
						}
						else if(i==1)
						{   
							$(this).text(0);
						}
						else if(i==2)
						{   
							$(this).text(0);
						}
					});
					
					var over = $(obj).parent().find(".iconPromA");
					if(over.length)
					{
						over.html('<span class="end"><strong>'+resources_Head.countOver+'</strong></span>');
					}
				}
				else
				{
					var nH=Math.floor(leftTime/(60*60));   
					var nM=Math.floor(leftTime/(60)) % 60;   
					var nS=Math.floor(leftTime) % 60;

					$(obj).find("em").each(function(i){
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
		
		if(allStopped == true)
		{
			clearInterval(countDown.interv);
			countDown.array = null; 
		}
	}
}

// 启动定时器
function startHomePageCountDown(){
    var url=$.newegg.buildWWW("Ajax/Common/AjaxNewHomepageCountDown.aspx");
    $.get(url,null,function(data){
        new countdown(data).oninterval(
            function(id,hour,minutes,second){
                var panel = $("div.timeLeft:first");
                hour += "";
                if(hour.length === 1)
                    hour = "0" + hour;
                minutes += "";
                if(minutes.length === 1)
                    minutes = "0" + minutes;
                second += "";
                if(second.length === 1)
                    second = "0" + second;
                panel.children("span.hour").text(hour);
                panel.children("span.munite").text(minutes);
                panel.children("span.second").text(second);
            }
        ).oncomplete(
            function(){
                $("div.itemGridWrap>div.itemCell").addClass("timeOut");
                $("div.itemGridWrap>div.itemCell p.iconPromA").show();
            }
        ).onstart(
            function(id,hour,minutes,second){
                hour += "";
                if(hour.length === 1)
                    hour = "0" + hour;
                minutes += "";
                if(minutes.length === 1)
                    minutes = "0" + minutes;
                second += "";
                if(second.length === 1)
                    second = "0" + second;
                var panel = $("div.timeLeft:first");
                panel.children("span.hour").text(hour);
                panel.children("span.munite").text(minutes);
                panel.children("span.second").text(second);
            }
        ).start();
    });
}

var subWebSite = {
    init: function() {
        //如果没有供显示的区域
        if ($("#selarea") == undefined) {
            return;
        }
        //设置选择区域的事件
        subWebSite.InitSelect();
        //ajax加载
        subWebSite.SetSubWebSite();
    },
    InitSelect: function() {
        $("#selarea .actPanel").click(function() {
            var me = $(this);
            var flg = me.data("lastToggle1") || 1;
            if (flg == 2) {
                $("#selarea .selareaPanel").hide();
                me.removeClass("actPanelnow");
                $("#selarea .actPanel").data("lastToggle1", 1);
                $("#personalInfoCellForm select,#editDefault select,#AccessoriesQuery select,.searchCardBox input,#myPay select,#editPassword input,#favList input,#commentList input,#refundmentForm select,#refundmentForm input,#formRMAQuery input,#formRMAQuery select,#searchRMA input,#searchRMA select,#formOrderQuery input,#formOrderQuery select,.selectPanel input,#accountContent #address,#areaZone select,#accountContent #tel,#validationPhoneArea #mobile,#accountContent #birthday,#accountContent #birthDayArea input,#accountContent #sex,#accountContent #name,.profile .cmnSelect,#accountContent #month,#accountContent #day").css("visibility", "visible");
            } else {
                me.addClass("actPanelnow");
                $("#selarea .selareaPanel").show();
                $("#selarea .actPanel").data("lastToggle1", 2);
                $("#personalInfoCellForm select,#editDefault select,#AccessoriesQuery select,.searchCardBox input,#myPay select,#editPassword input,#favList input,#commentList input,#refundmentForm select,#refundmentForm input,#formRMAQuery input,#formRMAQuery select,#searchRMA input,#searchRMA select,#formOrderQuery input,#formOrderQuery select,.selectPanel input,#accountContent #address,#areaZone select,#accountContent #tel,#validationPhoneArea #mobile,#accountContent #birthday,#accountContent #birthDayArea input,#accountContent #sex,#accountContent #name,.profile .cmnSelect,#accountContent #month,#accountContent #day").css("visibility", "hidden");
            }

        });
        $("#selarea .close").click(function() {
            $("#selarea .selareaPanel").hide();
            $("#selarea .actPanel").removeClass("actPanelnow");
            $("#selarea .actPanel").data("lastToggle1", 1);
            $("#personalInfoCellForm select,#editDefault select,#AccessoriesQuery select,.searchCardBox input,#myPay select,#editPassword input,#favList input,#commentList input,#refundmentForm select,#refundmentForm input,#formRMAQuery input,#formRMAQuery select,#searchRMA input,#searchRMA select,#formOrderQuery input,#formOrderQuery select,.selectPanel input,#accountContent #address,#areaZone select,#accountContent #tel,#validationPhoneArea #mobile,#accountContent #birthday,#accountContent #birthDayArea input,#accountContent #sex,#accountContent #name,.profile .cmnSelect,#accountContent #month,#accountContent #day").css("visibility", "visible");
        })
        $("#selarea .areaItem dd>a").click(function() {
            var plist = $("#selarea .areaItem dd>a");
            var me = $(this);
            var areaCode = me.parent().parent().parent().parent().find(".areaCata a").attr("Code");
            subWebSite.SetCurrentShowArea(areaCode);
            $("#selarea .selareaPanel").hide();
            $("#selarea .actPanel").removeClass("actPanelnow");
            plist.removeClass("cur");
            me.addClass("cur");
            $("#selarea .actPanel").data("lastToggle1", 1);
            subWebSite.SaveCookie(areaCode);
        })
        $("#selarea .actPanel").hover(
	        function() {
	            var me = $(this);
	            me.find(".btnareaselarea").addClass("btnareaselareanow")
	        },
	        function() {
	            var me = $(this);
	            me.find(".btnareaselarea").removeClass("btnareaselareanow")
	        }
        )
        $("#selarea .areaCata a").click(function() {
            var me = $(this);
            var areaCode = me.attr("Code");
            subWebSite.SetCurrentShowArea(areaCode);
            $("#selarea .actPanel").data("lastToggle1", 1);
            $("#selarea .selareaPanel").hide();
            $("#selarea .actPanel").removeClass("actPanelnow");
            var plist = $("#selarea .areaItem dd>a").removeClass("cur");
            subWebSite.SaveCookie(areaCode);
        });
    },
    SaveCookie: function(areaCode) {
        $.newegg.cookie.set("Area", areaCode, { topdomain: true, expires: 60 });
        window.location.reload();
    },
    SetSubWebSite: function() {
        var areaCode = $.newegg.cookie.get("Area");
        if (subWebSite.CheckAreaCode(areaCode) == true) {
            //设置code对应的区域
            subWebSite.SetCurrentShowArea(areaCode);
        }
    //Jesse.J.Xu,注释   
    //        else if (typeof (disEnableJSLoadSubWebSite) == 'undefined' || disEnableJSLoadSubWebSite != true) {
    //            //ajax请求当前区域
    //            var ajaxUrl = $.newegg.buildCurrent("Ajax/Common/AjaxSubWebSiteArea.aspx?commonCid=18");
    //            $.ajax({
    //                type: "get",
    //                dataType: "json",
    //                url: ajaxUrl,
    //                timeout: 30000,
    //                beforeSend: function(XMLHttpRequest) {
    //                },
    //                success: function(data, textStatus) {
    //                    if ($(data).length && typeof (data.Data) != "undefined" && data.Data.length) {
    //                        subWebSite.SetCurrentShowArea(data.Data);
    //                    }
    //                },
    //                complete: function(XMLHttpRequest, textStatus) {
    //                },
    //                error: function() {
    //                }
    //            });
    //        }
    },
    CheckAreaCode: function(areaCode) {
        var isExistsAreaCode = false;
        if (areaCode != null &&
           typeof resources_Head == "object" &&
           resources_Head != null &&
           resources_Head.areaCodeJson != null) {
            var areaCodeJson = JSON.parse(resources_Head.areaCodeJson);
            $(areaCodeJson).each(function() {
                if (areaCode == this.code) {
                    $("#selarea .areaname").html(this.name);
                    isExistsAreaCode = true;
                    return;
                }
            });
        }
        return isExistsAreaCode;
    },
    SetCurrentShowArea: function(areaCode) {
        var isExistsAreaCode = false;
        if (areaCode != null &&
           typeof resources_Head == "object" &&
           resources_Head != null &&
           resources_Head.areaCodeJson != null) {
            var areaCodeJson = JSON.parse(resources_Head.areaCodeJson);
            $(areaCodeJson).each(function() {
                if (areaCode == this.code) {
                    $("#selarea .areaname").html(this.name);
                    isExistsAreaCode = true;
                    return;
                }
            });
        }

        if (isExistsAreaCode == true) {
            $("#selarea").show();
        }
        else {
            $("#selarea").hide();
        }
    }
}

var Sam = Sam || {};
Sam.AddShoppingForCart = function() {
    //Ga
    try { _gaq.push(['_trackEvent', 'Click', 'addtocart']); } catch (ex) { }
}

//常购清单相关功能
function redirectLogin(returnUrl) {
    window.location.href = $.newegg.buildSSL("login.action") + "?ReturnUrl=" + encodeURIComponent(returnUrl);
}

//var popPlane = $(".popPlane").hide();
var popPlane = $(".addPlane").hide();
$(document).click(function(e) {
    var t = e.target;
    if ($(t).parents(".popPlane").length == 0) {
        $(".popPlane").hide();
    }
})

var showPopPlane = function(pwin, po, obj) {
    //    $(".popPlane").css({ left: po.left, top: po.top + 18 }).hide();
    //    pwin.show();
    var p = $(".popPlane")
    p.css({ left: po.left, top: po.top + 18 }).hide();
    p.find(".planeTop i").css("left", 20);
    pwin.show();
    if (typeof obj == 'string' && obj.length > 0) {
        var offset = pwin.offset();
        var w = $("." + obj).width();
        var pl = w - (offset.left + 176)
        if (pl < 0) {
            p.css({ left: po.left + pl });
            p.find(".planeTop i").css("left", -pl)
        }
    }
}

var productId;
var btnCss;
//$(".prolist .btnB").on("click",function() {
//   
//})
var often_AlwaysList = {
    add: function(obj, cssObj) {
        var me = $(obj);
        var po = me.offset();
        // popPlane.css({ left: po.left, top: po.top + 18 }).show();
        showPopPlane(popPlane, po, cssObj);
        popPlane.data("btna", obj);
        btnCss = cssObj;
        popPlane.find(".inputp").hide();
        popPlane.find(".inputtext").show();
        popPlane.find(".twoBtn").hide();
        $("#txtListName").val("");
        productId = me.attr("rev"); //产品id
        var data = { listName: '', action: "get", listSysno: 0, listType: 1 };
        $.ajax({
            type: "get",
            dataType: "html",
            url: $.newegg.buildCurrent("ajax/Customer/AjaxAlwaysList.aspx"),
            timeout: 30000,
            data: data,
            beforeSend: function(XMLHttpRequest) {
                //Loading show
            },
            success: function(data, textStatus) {
                $(".listPlane").remove();
                $(".addPlane .op").before(data);
                $("#txtAlwaysListName").val("");
                showPopPlane(popPlane, po, btnCss);
                UI.defaultText();
            },
            complete: function(XMLHttpRequest, textStatus) {

            },
            error: function() {
                // Biz.Common.PromptText.systemError();
            }
        });
        return false;
    }
}

popPlane.find(".inputtext a").on("click",function() {
    popPlane.find(".inputp").show();
    popPlane.find(".inputtext").hide();
    popPlane.find(".twoBtn").show();
    return false;
});

popPlane.find(".btnCancel").on("click",function() {
    popPlane.find(".inputp").hide();
    popPlane.find(".inputtext").show();
    popPlane.find(".twoBtn").hide();
    return false;
});

$(".popPlane .btnOK").on("click",function() {
    $(".popPlane").hide();
});
popPlane.find(".listPlane li").click(function() {
   // popPlane.hide();
   // $(".successPlane").show();
});

function saveProductList(obj) {

        //Ga
        try { _gaq.push(['_trackEvent', 'Click', 'addoftenpurchase']); } catch (ex) { }
        
        var listId = $(obj).find("label").attr("class"); //清单id
        var id = productId; //产品id
        var data = { listId: listId, action: "add", productId: id };
        $.ajax({
            type: "get",
            dataType: "html",
            url: $.newegg.buildCurrent("ajax/Customer/AjaxAlwaysListContent.aspx"),
            timeout: 30000,
            data: data,
            beforeSend: function(XMLHttpRequest) {
                //Loading show
            },
            success: function(data, textStatus) {
                var url = $.newegg.buildCurrent("Customer/OftenShoppingList.aspx");
                var tishi1 = "<div class=\"popPlane  failedPlane\"><div class=\"planeTop ie6pn\"><i class=\"ie6png\"></i></div><div class=\"inner ie6png\"><h3 class=\"p0_5 ml10\">常购清单最多加1000个产品</h3><p><a class=\"blue\" href=\" " + url + "\">查看常购清单&raquo;</a></p><div class=\"op onlyBtn\"><p class=\"twoBtn\"><a href=\"javascript:void(0);\" class=\"btnOK\"><span>确定</span></a></p></div></div><div class=\"planeBottom ie6png\"></div></div>";
                var tishi2 = "<div class=\"popPlane  failedPlane\"><div class=\"planeTop ie6pn\"><i class=\"ie6png\"></i></div><div class=\"inner ie6png\"><h3 class=\"p0_5 ml10\">已在常购清单中</h3><p><a class=\"blue\" href=\"" + url + "\">查看常购清单&raquo;</a></p><div class=\"op onlyBtn\"><p class=\"twoBtn\"><a href=\"javascript:void(0);\" class=\"btnOK\"><span>确定</span></a></p></div></div><div class=\"planeBottom ie6png\"></div></div>";
                var tishiSuccess = "<div class=\"popPlane  successPlane\"><div class=\"planeTop ie6pn\"><i class=\"ie6png\"></i></div><div class=\"inner ie6png\"><h3 class=\"p0_5 ml10\">加入成功</h3><p><a class=\"blue\" href=\"" + url + "\">查看常购清单&raquo;</a></p><div class=\"op onlyBtn\"><p class=\"twoBtn\"><a href=\"javascript:void(0);\" class=\"btnOK\"><span>确定</span></a></p></div></div><div class=\"planeBottom ie6png\"></div></div>";
                if (data == "more") {
                    //alert("常购清单最多加1000个产品");
                    $(".failedPlane").remove();
                    $(".addPlane").after(tishi1);
                    popPlane.hide();
                    //  $(".failedPlane").show();
                    showPopPlane($(".failedPlane"), $(popPlane.data("btna")).offset(), btnCss);
                    return;
                } else if (data == "exist") {
                    $(".failedPlane").remove();
                    $(".addPlane").after(tishi2);
                    popPlane.hide();
                    // $(".failedPlane").show();
                    showPopPlane($(".failedPlane"), $(popPlane.data("btna")).offset(), btnCss);
                    return;
                } else {
                    //                    $(".listPlane li").remove();
                    //                    $(".listPlane").html(data);
                    $("#txtAlwaysListName").val("");
                    $(".successPlane").remove();
                    $(".addPlane").after(tishiSuccess);
                    popPlane.hide();
                    // $(".successPlane").show();
                    showPopPlane($(".successPlane"), $(popPlane.data("btna")).offset(), btnCss);
                    if ($("#txthasFlag").val() != "" && typeof ($("#txthasFlag").val()) != 'undefined') {
                        $("#ulBuyList").remove();
                        $(".leftcol .mymenu .op").before(data);
                        AlwaysBuyList.searchProduct();
                    }
                    //omniture
                    try {
                        var s = s_gi(s_account);
                        s.linkTrackVars = 'products,events,prop1,prop11';
                        s.linkTrackEvents = 'event31';
                        s.events = 'event31';
                        s_objectID = 'sy-A-2-1-0-xf'; 
                        s.prop1 = reportsuite;
                        s.products = ';' + id;
                        s.tl(obj, 'o', 'Often-purchase');
                        s.linkTracking = false;
                    } catch (ex) { }
                }
            },
            complete: function(XMLHttpRequest, textStatus) {

            },
            error: function() {
                // Biz.Common.PromptText.systemError();
            }
        });
    }

    function addAlwaysList(_o) {
        var eventTarget = _o;

        if (eventTarget.getAttribute("isFinished") != "0") {
            eventTarget.setAttribute("isFinished", "0");
            var listName = $("#txtAlwaysListName").val();
            if (listName.length <= 0 || listName.length > 50) {
                alert("名称不能为空，且长度不大于50");
                eventTarget.setAttribute("isFinished", "1");
                return;
            }
            var flag = $("#txthasFlag").val();
            var data = { listName: $.newegg.urlEncode(listName), action: "add", listSysno: 0, listType: 1, flag: flag };

            $.ajax({
                type: "get",
                dataType: "html",
                url: $.newegg.buildCurrent("ajax/Customer/AjaxAlwaysList.aspx"),
                timeout: 30000,
                data: data,
                beforeSend: function(XMLHttpRequest) {
                    //Loading show
                },
                success: function(data, textStatus) {
                    if (data == 'exist') {
                        alert("常购清单名称已经存在，请重新命名");
                        return;
                    } else if (data == 'more') {
                        alert("常购清单最多建10个");
                        return;
                    } else {
                        var firstUlStartIndex = data.indexOf("<ul");
                        var firstUlEndIndex = data.indexOf("</ul>");
                        var firstUlStr = data.substring(firstUlStartIndex, firstUlEndIndex + 5);
                        var secondUlStr = data.replace(firstUlStr, "");
                        $(".listPlane").remove();
                        $(".addPlane .op").before(firstUlStr);
                        $("#txtAlwaysListName").val("");
                        popPlane.find(".inputp").hide();
                        popPlane.find(".inputtext").show();
                        popPlane.find(".twoBtn").hide();
                        if (flag != "" && typeof (flag) != 'undefined') {
                            $("#ulBuyList").remove();
                            $(".mymenu .op").before(secondUlStr);
                            AlwaysBuyList.searchProduct();
                        }
                    }

                },
                complete: function(XMLHttpRequest, textStatus) {
                    eventTarget.setAttribute("isFinished", "1");
                },
                error: function() {
                    // Biz.Common.PromptText.systemError();
                }
            });
        }
    }

    function shortStoreName() {
        var storeid = $.newegg.cookie.get("COOKIE_STORE_SYSTEMNO");
        var stores = $('.header :hidden.samsStoreHiden');
        if (stores.length > 0) {
            var store = stores.filter('[samsstoreid="' + storeid + '"]');
            if (store.length === 0) {
                store = stores.eq(0);
            }
            return store.attr("shortname");
        }
        return "shanghai";
    };

    //去掉右边的空格
    function rtrim(s) {
        return s.replace(/(^,)|(,$)/g, '')
    }

    //加入购物车或购买
    function omnitureAddCartOrBuy(productlistId, objE) {
        var resultId = "";
        productlistId = productlistId.toString();
        if (productlistId.indexOf(',') > 0) {
            productlistId = rtrim(productlistId);
            var arr = new Array();
            arr = productlistId.split(',');
            for (var i = 0; i < arr.length; i++) {
                resultId += ";" + arr[i] + ",";
            }
            resultId = rtrim(resultId); //去掉最右边的空格
        } else {
            resultId =";"+ productlistId;
        }

        //omniture
        var minniCartQty = $.newegg.cookie.get("CartCookie", "cartQty");
        if (minniCartQty=='' || parseInt(minniCartQty) <= 0) {
            //购物车为空
            var s = s_gi(s_account);
            s.linkTrackVars = 'products,events,prop1,eVar21,eVar22';
            s.linkTrackEvents = 'scAdd,scOpen';
            s.events = 'scAdd,scOpen';
            s.prop1 = reportsuite;
            s.products = resultId; //加入购物车的产品 
            s.tl(objE, 'o', 'Shopping Cart Addition');
        } else {
            var s = s_gi(s_account);
            s.linkTrackVars = 'products,events,prop1,eVar21,eVar22';
            s.linkTrackEvents = 'scAdd';
            s.events = 'scAdd';
            s.prop1 = reportsuite;
            s.products = resultId; //加入购物车的产品
            s.tl(objE, 'o', 'Shopping Cart Addition');
        }
    }

    //加入购物车或购买
    function omnitureAddCartOrBuyName(productlistId, objE,name) {
        var resultId = "";
        productlistId = productlistId.toString();
        if (productlistId.indexOf(',') > 0) {
            productlistId = rtrim(productlistId);
            var arr = new Array();
            arr = productlistId.split(',');
            for (var i = 0; i < arr.length; i++) {
                resultId += ";" + arr[i] + name + ",";
            }
            resultId = rtrim(resultId); //去掉最右边的空格
        } else {
            resultId = ";" + productlistId + name;
        }

        //omniture
        var minniCartQty = $.newegg.cookie.get("CartCookie", "cartQty");
        if (minniCartQty == '' || parseInt(minniCartQty) <= 0) {
            //购物车为空
            var s = s_gi(s_account);
            s.linkTrackVars = 'products,events,prop1,eVar21,eVar22';
            s.linkTrackEvents = 'scAdd,scOpen';
            s.events = 'scAdd,scOpen';
            s.prop1 = reportsuite;
            s.products = resultId; //加入购物车的产品 
            s.tl(objE, 'o', 'Shopping Cart Addition');
        } else {
            var s = s_gi(s_account);
            s.linkTrackVars = 'products,events,prop1,eVar21,eVar22';
            s.linkTrackEvents = 'scAdd';
            s.events = 'scAdd';
            s.prop1 = reportsuite;
            s.products = resultId; //加入购物车的产品
            s.tl(objE, 'o', 'Shopping Cart Addition');
        }
    }