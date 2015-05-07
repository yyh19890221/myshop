var shoppingIsLogin = 0; //未登录

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
                return location.protocol + '//' + location.host + '/myshop/' + relativePath;
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
            return sslSite + '/' + relativePath;
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
             * @description 解析查询参数
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

                    var value = (pair.length == 2) ? pair[1] : name;
                    params[name] = value;
                }

                return params;
            },
            /**
             * @description 转换查询参数对象为字符串形式
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
         * @description 解决url上中文乱码问题
         * @param str
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
             * @description 滚动条距顶部高
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
