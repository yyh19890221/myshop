//
function getBrowser(_b) {
    _b = _b.toString().toLowerCase();
    return (navigator.userAgent.toLowerCase().indexOf(_b) != -1) ? true : false;
}
/*
Global Method to fix Mask Overlay Height & Width
*/
function fixMaskLayer(_o) {
    if (getBrowser("msie 6")) {
        var o = $(_o);
        var relWidth;
        var relHeight;
        var wHeight;
        if (document.documentElement && document.documentElement.clientHeight) {
            var doc = document.documentElement;
            relWidth = (doc.clientWidth > doc.scrollWidth) ? doc.clientWidth - 1 : doc.scrollWidth;
            relHeight = (doc.clientHeight > doc.scrollHeight) ? doc.clientHeight : doc.scrollHeight;
            wHeight = doc.clientHeight;
        }
        else {
            var doc = document.body;
            relWidth = (window.innerWidth > doc.scrollWidth) ? window.innerWidth : doc.scrollWidth;
            relHeight = (window.innerHeight > doc.scrollHeight) ? window.innerHeight : doc.scrollHeight;
            wHeight = reHeight;
        }
        o.css({ width: relWidth, height: wHeight });
    }

}

//Mousewheel Plugin
(function($) {

    $.event.special.mousewheel = {
        setup: function() {
            var handler = $.event.special.mousewheel.handler;

            // Fix pageX, pageY, clientX and clientY for mozilla
            if (Browser.Firefox)
                $(this).bind('mousemove.mousewheel', function(event) {
                    $.data(this, 'mwcursorposdata', {
                        pageX: event.pageX,
                        pageY: event.pageY,
                        clientX: event.clientX,
                        clientY: event.clientY
                    });
                });

            if (this.addEventListener)
                this.addEventListener((Browser.Firefox ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
            else
                this.onmousewheel = handler;
        },

        teardown: function() {
            var handler = $.event.special.mousewheel.handler;

            $(this).unbind('mousemove.mousewheel');

            if (this.removeEventListener)
                this.removeEventListener((Browser.Firefox ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
            else
                this.onmousewheel = function() { };

            $.removeData(this, 'mwcursorposdata');
        },

        handler: function(event) {
            var args = Array.prototype.slice.call(arguments, 1);

            event = $.event.fix(event || window.event);
            // Get correct pageX, pageY, clientX and clientY for mozilla
            $.extend(event, $.data(this, 'mwcursorposdata') || {});
            var delta = 0, returnValue = true;

            if (event.wheelDelta) delta = event.wheelDelta / 120;
            if (event.detail) delta = -event.detail / 3;
            //if ( $.browser.opera  ) delta = -event.wheelDelta;

            event.data = event.data || {};
            event.type = "mousewheel";

            // Add delta to the front of the arguments
            args.unshift(delta);
            // Add event to the front of the arguments
            args.unshift(event);

            return $.event.handle.apply(this, args);
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });

})(jQuery);

/*
Global Popup Layer
Demo:  
popWin("#popID",{...});
popWin(myPopWin,{...});
var pop = popWin("#popID",
{
action:	"in" | "out",  //可选项，用于初始化时直接弹入|弹出，此参考与obj.fn.popIn()|obj.fn.popOut()方法不可同时使用
animate	: true | false, //可选项
speed:	200,		//弹入|弹走的速度，可选项
overlay:	String | object //可选项
olSpeed	:	200, //mask层的fadeIn | fadeOut速度，可选项
beforeStart: funciton(), //在弹入窗口前执行的方法
callOnce:	funciton(), //仅需在第一次弹入窗口动作完成后执行的方法
callback:	funciton(), //在弹入窗口动作完成后执行的方法
afterPopOut : function, //在弹出窗口动作完成后执行的方法
				
					
}
pop.fn.popIn(); //调用内部方法，无缓动，直接弹入
pop.fn.popOut(); //调用内部方法，无缓动，直接弹出
pop.fn.popIn(true); //调用内部方法，有缓动，动画弹入
pop.fn.popOut(true); //调用内部方法，有缓动，动画弹出
		
		
*/
function PopWin(_o, _settings) {
    var self = this;
    if (!(self instanceof PopWin)) {
        return new PopWin(_o, _settings);
    }

    var o = $(_o);
    var ol = null;
    var settings = {};
    var _default = {
        x: ($(window).width() - o.outerWidth()) / 2,
        y: ($(window).height() - o.outerHeight()) / 2,
        action: "in",
        animate: false,
        speed: 200,
        overlay: "#overlay",
        olSpeed: 200,
        queue: false,
        beforeStart: function() { },
        callOnce: function() { },
        callback: function() { },
        afterPopOut: function() { }
    }

    _default.y = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + ((_default.y > 0) ? _default.y : 0);

    if (_settings) {
        for (var v in _settings) {
            _default[v] = _settings[v]; //Overwite defaults settings if customed parameters parsed in
        }
    }

    settings = _default;
    ol = $(settings.overlay); //Overlay DOM Obj

    //fix functions
    var fixFunc = {
        preventScroll: function() {
            return false;
        },
        preventResize: function() {
            return false;
        }

    };

    //funciton init
    self.initDOM = function() {
        //overlay style
        if (ol.length == 0) {
            ol = $('<div id="overlay" style="position:fixed;top:0;left:0;right:0;bottom:0;"></div>');
            if (getBrowser("msie 6")) {
                ol = $('<div id="overlay" style="position:absolute;top:expression(document.documentElement.scrollTop);left:0;width:0;height:0;"></div>');
            }
            $("body").append(ol);
            var olBgColor = ol.css("backgroundColor"),
				olBgImg = ol.css("backgroundImage"),
				olBgRpt = ol.css("backgroundRepeat"),
				olBgPst = ol.css("backgroundPosition");
            olBgColor = (olBgColor) ? olBgColor : "#000";
            olBgImg = (olBgImg) ? olBgImg : "url(base64:*.gif)";
            olBgRpt = (olBgRpt) ? olBgRpt : "repeat";
            olBgPst = (olBgPst) ? olBgPst : "left top";
            ol.css({
                backgroundColor: olBgColor,
                backgroundImage: olBgImg,
                backgroundRepeat: olBgRpt,
                backgroundPosition: olBgPst
            });
        }
        else {
            if (getBrowser("msie 6")) {
                ol.css("left", 0);
            } else {
                ol.css({
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                });
            }
        }

        //Pop Window style
        if (o.length != 0) {
            o.css({
                left: "50%",
                top: 0 - o.outerHeight(),
                marginLeft: 0 - o.outerWidth() / 2
            });
            if (o.css("zIndex") == "auto" || o.css("zIndex") == 0) {
                o.css("zIndex", 1000);
            }
            ol.css("zIndex", parseInt(o.css("zIndex")) - 1);
        }

    }; //init end

    self.initDOM();
    settings.callOnce.call(o, o, self);
    

    //function obj
    self.fn = {
        popIn:
			function(_a, _fn, _data) {
			    if (o.attr("moving") == "1") return false;
			    if (o.attr("showed") == "1") return false;

			    settings.animate = (_a != undefined) ? _a : settings.animate;
			    self.fn.specialFix("beforeIn");

			    //Call Customized BeforeStart Function
			    if (settings.beforeStart) {
			        settings.beforeStart.call(o, o, _data);
			    }

			    if (settings.animate == true) {
			        self.fn.domMouseWheel(false);
			        o.attr("moving", "1");
			        fixMaskLayer(ol);
			        ol.css({ opacity: 0, display: "block" }).animate({ opacity: 0.7, duration: settings.olSpeed },
						function() {
						    o.css("top", self.fn.getEndPos().inY).show().animate({
						        top: self.fn.getEndPos().y
						    }, {
						        duration: settings.speed,
						        queue: settings.queue,
						        complete: function() {
						            //Call Customized Callback Function
						            settings.callback.call(o, o);
						            (typeof _fn == "function") ? _fn.call(o, o) : '';
						            o.attr("showed", "1");
						            o.attr("moving", "0");
						            self.fn.addEvent();
						            self.fn.domMouseWheel(true);
						        }
						    });
						}
					);
			    }
			    else {
			        ol.css({ opacity: 0.7, display: "block" });
			        fixMaskLayer(ol);
			        o.show().css({
			            top: self.fn.getEndPos().y
			        });
			        //Call Customized BeforeStart Function
			        settings.callback.call(o, o);
			        (typeof _fn == "function") ? _fn.call(o, o) : '';
			        o.attr("showed", "1");
			        o.attr("moving", "0");
			        self.fn.addEvent();
			    }
			}, //popIn End

        popOut:
			function(_a, _fn) {
			    if (o.attr("moving") == "1") return false;
			    if (o.attr("showed") != "1") return false;
			    settings.animate = (_a != undefined) ? _a : settings.animate;

			    if (settings.animate == true) {
			        self.fn.domMouseWheel(false);
			        o.attr("moving", "1").show().animate({
			            top: self.fn.getEndPos().outY
			        }, {
			            duration: settings.speed,
			            queue: settings.queue,
			            complete: function() {
			                //Call Customized Callback Function
			                o.hide().attr("showed", "0");
			                o.attr("moving", "0");
			                //ol.fadeOut(settings.olSpeed,function(){ol.css("width","100%")});
			                ol.fadeOut(settings.olSpeed);
			                settings.afterPopOut.call(o, o);
			                (typeof _fn == "function") ? _fn.call(o, o) : '';
			                self.fn.specialFix("afterOut");
			                self.fn.domMouseWheel(true);
			            }
			        });
			    }
			    else {
			        o.show().css({
			            top: 0 - self.fn.getEndPos().y,
			            display: "none"
			        });
			        //Call Customized BeforeStart Function
			        o.attr("showed", "0");
			        o.attr("moving", "0");
			        //ol.css("width","100%").hide();
			        ol.hide();
			        settings.afterPopOut.call(o, o);
			        (typeof _fn == "function") ? _fn.call(o, o) : '';
			        self.fn.specialFix("afterOut");
			    }
			}, //popOut end

        getEndPos:
			function() {
			    var st = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
			    //var sl = (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
			    var win = $(window);
			    var _y = (win.height() - o.outerHeight()) / 2;
			    //var _x = ( win.width() - o.outerWidth() )/2;
			    return {
			        //x : sl + ((_x > 0 ) ? _x : 0),
			        y: st + ((_y > 0) ? _y : 0),
			        //curTop : st,
			        inY: 0 - o.outerHeight() + st,
			        outY: 0 - o.outerHeight() + st
			    }
			}, //getEndPos end

        addEvent: //events which runs after popWindow finishing Entering 
			function() {
			    //When Scroll & Resize Window, Reposition the PopWindow
			    $(window).bind("resize scroll", function(e) {
			        (e.type == "resize") && fixMaskLayer(ol);
			        self.fn.rePosition();
			    });

			    //More Events could happen here....
			    //.....

			}, //addEvent End

        rePosition:
			function(_a) {
			    //if(o.attr("moving") == "1" ) return false;
			    if (o.attr("showed") != "1") return false;
			    settings.animate = (_a != undefined) ? _a : settings.animate;
			    if (settings.animate == true) {
			        o.attr("moving", "1");
			        o.show().animate({
			            top: self.fn.getEndPos().y
			        }, {
			            duration: 200,
			            queue: settings.queue,
			            complete: function() {
			                o.attr("moving", "0");
			            }
			        });
			    }
			    else {
			        o.show().css({
			            top: self.fn.getEndPos().y
			        });
			        o.attr("moving", "0");
			    }
			}, //rePostion end

        domMouseWheel:
			function(_f) {
			    if (_f == false) {
			        $(window).bind("resize", fixFunc.preventResize);
			        $(document).bind("mousewheel", fixFunc.preventScroll);
			    }
			    else {
			        $(window).unbind("resize", fixFunc.preventResize);
			        $(document).unbind("mousewheel", fixFunc.preventScroll);
			    }
			},

        specialFix: //Special Fix Events which runs Before popIn & After popOut
			function(_f) {
			    if (getBrowser("msie 6")) {
			        var v = (_f == "beforeIn") ? "hidden" : "visible";
			        for (var i = 0, selects = document.getElementsByTagName("select"); i < selects.length; i++) {
			            selects[i].style.visibility = v;
			        }
			    }

			    //More Special Fix could happens here....
			    //.....

			} // specialFix end
}//fn end

        //Bind click Event to Close Icon
        o.find(".close").bind("click", function() {
            self.fn.popOut(settings.animate);
        });

        if (_settings) {
            //初始化对象时，如果参数中设置了action为"in"|"out"，则执行相应的弹入|弹出的动作
            (_settings.action == "in") ? self.fn.popIn(_settings.animate) : "";
            (_settings.action == "out") ? self.fn.popOut(_settings.animate) : "";
        }

       return self;
    }