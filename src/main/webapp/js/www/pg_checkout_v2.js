$(function(){
	
	$(".recomend").each(function(){
		var lis = $(this).find(".prolist li");
		var linum = lis.length;
		$(this).find(".listWrap .mover").width(lis.width()*linum);
		UI.Xslider(this,{
			scrollObj:".mover",
			viewedSize:lis.width()*5,
			/*unitDisplayed:5,*/
			numtoMove:5
		});
	});
	
	/*
		Category Prolist Hover Effect
		
	*/
	//IE6-7
	if(isIE6||isIE7){
		$(".category .prolist li .inner").on("mouseenter",function(){
			if(isIE6){
				$(this).parent("li").height($(this).outerHeight());
			}
			$(this).addClass("hover");
		}).on("mouseleave",function(){
			$(this).removeClass("hover");	
		});
	}
	
	
	
	$(".myaddrlist li").click(function(){
		$(this).addClass("curr").siblings().removeClass("curr").end().find("input").attr("checked","checked");
	});
	
	UI.Validform && UI.Validform(".form_newaddr",{
		btnSubmit:".btn_formsub",
		tiptype:function(msg,o,cssctl){
			if(!o.obj.is("form")){
				var objtip=o.obj.siblings(".Validform_checktip");
			}else{
				var objtip=o.obj.find(".action .Validform_checktip");
			}
			cssctl(objtip,o.type);
			objtip.text(msg);
		},
		datatype:{
			"option_phone":function(gets,obj){
				var reg1=/^13[0-9]{9}$|15[0-9]{9}$|18[0-9]{9}$/,
					reg2=/[\d]{7}/;
				
				if(reg1.test($("#mobile").val())){return true;}
				if(reg2.test(gets)){return true;}
				
				return false;
			}	
		},
		showAllError:true,
		ajaxPost:true
	});
	
	$(".banklist li input,.banklist li img").click(function(){
		$(this).parents("li").find("input").attr("checked","checked");
		$(".banklist li").removeClass("current");
		$(this).parents("li").addClass("current");	
	});
	
	$(".tab").find(".tabitem").click(function(){
		$(this).find("input").attr("checked","checked");
	});
	
	$(".invest_need").click(function(e){
		if($(this).find("input").attr("checked")){
			$(this).siblings(".investc").show();
		}else{
			$(this).siblings(".investc").hide();	
		}
	});
	
	//Product hover tip 
	$(".ashowtip").hover(function(){
		$(this).siblings(".tipPop").css({
			left:$(this).offset().left,
			top:$(this).offset().top+$(this).height()-$("#main").offset().top
		}).show();	
	},function(){
		$(this).siblings(".tipPop").hide();
	});
	$(".op_limit").find(".oper").click(function(){
		$(this).parent().siblings(".amtPop").css({
			left:$(this).offset().left,
			top:$(this).offset().top+$(this).height()-$("#main").offset().top
		}).show();
		return false;	
	});
	$(".amtPop").find(".btn").click(function(){
		$(".amtPop").find(".close").trigger("click");
		return false;	
	});
	
	//Float Online CS
	(function(){
		var top=$(".online_cs").length && $(".online_cs").offset().top,
			sctop;
		function moveOnlineCS(){
			sctop=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
			top = document.documentElement.clientHeight/2 - 72;
			sctop+=top;
			sctop=sctop>=200 ? sctop : 200;
			
			$(".online_cs").css({
				left:document.documentElement.scrollLeft + document.documentElement.clientWidth - 22,
				top:sctop
			});
		}
		moveOnlineCS();
		
		$(window).bind("scroll resize",function(){
			moveOnlineCS();
		});
	})();
	
	//tooltip in Summary Section for Shipping Fee;
	var mouseon=false;
	var tooltip = $('<div id="tooltip"><p class="info"></p></div>');
	$("body").append(tooltip);
	$(".hint").mouseover(function(e) {
		var tip = $(this).attr('title');
		mouseon=true;
		$(this).attr('title','');
		tooltip.find('.info').text(tip);
		tooltip.css({
			'top': e.pageY+10,
			'left': e.pageX
		}).show();
	}).mousemove(function(e) {
		tooltip.css({
			'top': e.pageY+10,
			'left': e.pageX
		})
	}).mouseout(function() {
		if(mouseon==true){
			$(this).attr('title',tooltip.find('.info').html());
			tooltip.hide();
			mouseon=false;
		}
	});
	
	
});