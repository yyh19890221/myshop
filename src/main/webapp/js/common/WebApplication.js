var __sp=String.prototype;

__sp.encodeURI=function(){
    return escape(this).replace(/\*/g,"%2A").replace(/\+/g,"%2B").replace(/-/g,"%2D").replace(/\./g,"%2E").replace(/\//g,"%2F").replace(/@/g,"%40").replace(/_/g,"%5F");
};
__sp.encodeHtml=function(){
    return this.replace(/\&/g,"&amp;").replace(/\>/g,"&gt;").replace(/\</g,"&lt;").replace(/\'/g,"&#039;").replace(/\"/g,"&quot;");
};

//Namespace
window.usingNamespace=function(a){
    var ro=window;    
    if (!(typeof(a)==="string"&&a.length!=0)) {
		return ro;
    }
    
    var co=ro;
    var nsp=a.split(".");
    for(var i=0;i<nsp.length;i++){
        var cp=nsp[i];
        if(!ro[cp]){
            ro[cp]={};
        };
        co=ro=ro[cp];
    };

    return co;
};

usingNamespace("Web.Utils")["String"] = {
    IsNullOrEmpty: function(v) {
        return !(typeof (v) === "string" && v.length != 0);
    },
    Trim: function(v) {
     if (!$String.IsNullOrEmpty(v)) {
            return v.replace(/^\s+|\s+$/g, "")
        }
    },
    TrimStart: function(v, c) {
        if ($String.IsNullOrEmpty(c)) {
            c = "\\s";
        };
        var re = new RegExp("^" + c + "*", "ig");
        return v.replace(re, "");
    },
    TrimEnd: function(v, c) {
        if ($String.IsNullOrEmpty(c)) {
            c = "\\s";
        };
        var re = new RegExp(c + "*$", "ig");
        return v.replace(re, "");
    },
    Camel: function(str) {
        return str.toLowerCase().replace(/\-([a-z])/g, function(m, c) { return "-" + c.toUpperCase() })
    },
    Repeat: function(str, times) {
        for (var i = 0, a = new Array(times); i < times; i++)
            a[i] = str;
        return a.join();
    },
    IsEqual: function(str1, str2) {
        if (str1 == str2)
            return true;
        else
            return false;
    },
    IsNotEqual: function(str1, str2) {
        if (str1 == str2)
            return false;
        else
            return true;
    },
    MaxLengthKeyUp: function(obj, len) {
        var value = $(obj).val();
        if (value.length > len) {
            $(obj).val(value.substring(0, len));
        }
    },
    MaxLengthKeyDown: function(obj, len) {
        if ($(obj).val().length > len) { return false; }
        return true;
    }
};

usingNamespace("Web.Utils")["Converter"]={
	ToFloat:function(v) {
		if(!v||(v.length==0)){
			return 0;
		};
		return parseFloat(v);
	}
};

usingNamespace("Web.Utils")["Json"]={
	// Serializes a javascript object, number, string, or arry into JSON.
	ToJson : function(object) {
		try{
			return JSON.stringify(object);
		}catch(e){}
		return false;
	},
	// Converts from JSON to Javascript
	FromJson : function(text) {
		try{
			return JSON.parse(text);
		}catch(e){
			return false;
		};
	}
};

usingNamespace("Web")["HttpUtility"]={
	UrlEncode:function(str){
		 return escape(str).replace(/\*/g,"%2A").replace(/\+/g,"%2B").replace(/-/g,"%2D").replace(/\./g,"%2E").replace(/\//g,"%2F").replace(/@/g,"%40").replace(/_/g,"%5F");
	},
	UrlDecode:function(str){
		return unescape(str);
	}
};

var $Converter = Web.Utils.Converter;
var $String = Web.Utils.String;
var $Json = Web.Utils.Json;
var $WebsiteConfig = Web.Config.WebsiteConfig;
var $CookieConfig = Web.Config.CookieConfig;
var $HttpUtility = Web.HttpUtility;

usingNamespace("Web")["State"]={ 
	Cookies:{
		Name:{
			Cfg:"Configuration",
			CustomerLogin:"CustomerLogin",
			Product:"Product",
			ProductCompare:"ProductCompare",
			Shipping:"Shipping",
			PageSizes:"PageSizes",
			ThirdPartyLogin:"ThirdPartyLogin",
			CMP:"NewAdvEffectMonitor",
			BrowsedProductSysNoList:"BrowsedProductSysNoList",
			LoginValidate:"LoginValidate",
			TradedIn:"TradedIn",			
			AZHiddenPopNote:"CloseFormCheck",
			Blank:"Blank"
		},		
		
		SaveWithCopyName:function(name,value,copyName){
			var cv = "";
			if(typeof(value)=="string"){
				cv = escape(value).replace(/\+/g,"%2b");
			}else if(typeof(value)=="object"){
				var jsonv = Web.State.Cookies.ToJson(Web.State.Cookies.GetValue(name));
				if (jsonv==false) jsonv={};	
				for(var k in value){ 
					eval("jsonv." + k + "=\"" + value[k] + "\""); 
				}
				for(var k in jsonv){
					cv += k+'='+escape(jsonv[k]).replace(/\+/g,"%2b") + '&';
				}
				cv = cv.substring(0, cv.length-1);
			}
			
			var expires, path, domain, secure;
			try{
				if(null!=(c=$CookieConfig[copyName])){ 
					domain = $WebsiteConfig.Domain;
					if (c.TopLevelDomain == false){ domain = ""; }
					var ad=$Converter.ToFloat(c.Expires);	
					if(ad>0){
						var d=new Date();				
						d.setTime(d.getTime()+ad*1000);
						expires=d;
					};
					path=c.Path;
					secure=c.SecureOnly;
				}
			}catch(ex){};
			
			var cok= name+"="+ cv +
			   ( ( expires ) ? "; expires="+expires.toGMTString() : "" ) +
			   ( ( path ) ? "; path=" + path : "" ) +
				( ( domain ) ? "; domain=" + domain : "" ) +
				( ( secure ) ? "; secure" : "" );
				
			document.cookie = cok;
		},
		Save:function(name,value){
			Web.State.Cookies.SaveWithCopyName(name,value,name);
		},		
		Remove:function(n,k) {
			
		},
		Clear:function(n){
			var domain, path, secure;
			try{
				var c;
				if(null!=(c=Web.Config.CookieConfig[n])){
					domain=$WebsiteConfig.Domain;
					path=c.Path;
					secure=c.SecureOnly;
				};
			}catch(ex){};
			
			document.cookie = n + "=" +
            ( ( path ) ? ";path=" + path : "") +
            ( ( domain ) ? ";domain=" + domain : "" ) +
            ";expires=Thu, 01-Jan-1900 00:00:01 GMT";
		},
		GetValue:function(n,k) {
			var reg = new RegExp("(^| )"+n+"=([^;]*)(;|$)");
			var arr = document.cookie.match(reg);
			if (arguments.length == 2){
				if (arr!=null) {
					var kArr,kReg = new RegExp("(^| |&)"+k+"=([^&]*)(&|$)");
					var c = arr[2];
					var c = c?c:document.cookie;
					if (kArr =  c.match(kReg)) {
						return unescape(kArr[2].replace(/\+/g,"%20"));
					} else {
						return "";	
					}									
				} else {
					return "";
				}
			} else if (arguments.length == 1) {
				if (arr!=null) {
					return unescape(arr[2].replace(/\+/g,"%20"));
				} else {
					return "";
				}
			}
		},
		ToJson:function(cv){
			var cv=cv.replace(new RegExp("=","gi"),":'").replace(new RegExp("&", "gi"), "',").replace(new RegExp(";\\s","gi"),"',");
			return eval("({" + cv + (cv.length > 0 ? "'" : "") + "})");
		}
	}
};
var $State = Web.State.Cookies;

usingNamespace("Web")["Url"]={
	BuildCurrentUrl:function(relativePath) {
		return Environment.Url + "/" + $String.TrimStart(relativePath, '\/');
	},
	BuildUrl:function(relativePath, type) {
		var rootPath = "";
		if (type.toLowerCase() == "www") {
			rootPath = $WebsiteConfig.UrlPathMappings.WWWSite[0];
		} else if (type.toLowerCase() == "shopper") {
			rootPath = $WebsiteConfig.UrlPathMappings.ShopperSite[0];
		} else if (type.toLowerCase() == "secure") {
			rootPath = $WebsiteConfig.UrlPathMappings.SSLSite[0];
		}
		return rootPath + "/" + $String.TrimStart(relativePath, '\/');
	}
};
var $Url = Web.Url;

usingNamespace("Web")["Resource"]={
	ImageSize:{Small:'small',Medium:'medium',Big:'mpic'},	
	GetRootPaths:function(pathName) {
		return eval('$WebsiteConfig.UrlPathMappings.' + pathName);
	},
	GetCurrentImageRoot:function(image, pathName)
	{
	    var pathArray = Web.Resource.GetRootPaths(pathName);
	    if(pathArray.length==0)
	    {
	        return "";
	    }
	    
	    var lastIndex = image.lastIndexOf(".");
	    if(lastIndex>0)
	    {
	        try{
	            var seed = parseInt(image.substring(lastIndex-1,lastIndex).charCodeAt(0));
	            return pathArray[seed%pathArray.length];
	        }catch(e){
	        }
	    }
	    
	    return pathArray[0];
	},
	ConvertProductCodeToImagePath:function(productCode) {
		if ($String.IsNullOrEmpty(productCode) && productCode.length < 10) {
			return '';
		}

		productCode = productCode.substring(0, 10);
		var pathArr = productCode.split('-');
		if (pathArr.length != 3) {
			return '';
		}
		
		return pathArr[0] + '/' + pathArr[1] + '/' + productCode + '.jpg';
	},
	BuildImage:function(imageName) {
	    return Web.Resource.GetCurrentImageRoot(imageName,Environment.ResourceRootPathName)+ '/Nest/' + imageName;
	},
	BuildProductImage:function(imageSize, productCode) {
	    var imageName = Web.Resource.ConvertProductCodeToImagePath(productCode);
	    return Web.Resource.GetCurrentImageRoot(imageName, Environment.ProductImageRootPathName)+ '/' + imageSize + '/' + imageName;
	},
	BuildProductImageV:function(imageSize, productCode, versionNumber) {
	    var imageName = Web.Resource.ConvertProductCodeToImagePath(productCode);
	    var path =Web.Resource.GetCurrentImageRoot(imageName, Environment.ProductImageRootPathName)+ '/' + imageSize + '/' + imageName;
	
		if(versionNumber == "")
		{
			return path;
		}
		
		return path + "?v=" + versionNumber;	
	},
	BuildContent:function(name){
		return eval('Web.ResourceConfig.StringResourceConfig.'+name);
	},
	BuildContent:function(){
		var args = arguments;
		var result = eval('Web.ResourceConfig.StringResourceConfig.'+arguments[0]);
		for(var i=1;i<args.length;i++) {
			var re = new RegExp('\\{' + (i-1) + '\\}','gm');
			result = result.replace(re, arguments[i]);
		}
		return result;
	}
};
var $Resource = Web.Resource;

usingNamespace("Web")["QueryString"]={
	Get:function(key) {
		key = key.toLowerCase();
		var qs = Web.QueryString.Parse();
		var value = qs[key];
		return (value != null) ? value : "";
	},
	Set:function(key, value) {
		key = key.toLowerCase();
		var qs = Web.QueryString.Parse();
		qs[key] = $HttpUtility.UrlEncode(value);
		return Web.QueryString.ToString(qs);
	},
	Parse:function(qs) {
		var params = {};

		if (qs == null) qs = location.search.substring(1, location.search.length);
		if (qs.length == 0) return params;

		qs = qs.replace(/\+/g, ' ');
		var args = qs.split('&');
		for (var i = 0; i < args.length; i++) {
			var pair = args[i].split('=');
			var name = pair[0].toLowerCase();
			
			var value = (pair.length==2)
				? pair[1]
				: name;
			params[name] = value;
		}

		return params;
    },
    ToString:function(qs) {
		if (qs == null) qs = Web.QueryString.Parse();
		
		var val = "";
		for(var k in qs){ 
			if (val == "") val = "?";
			val = val + k + "=" + qs[k] + "&";
		}
		val = val.substring(0, val.length-1);
		return val;
    }
};
var $QueryString = Web.QueryString;

usingNamespace("Web")["Form"]={
	reset:function(form){
		var f=$("#"+form);f.reset();
	},
	submit:function(form){
		 var f=$("#"+form);f.submit();
	}
};
var MessageType={Info:"0",Warning:"1",Error:"2"};

usingNamespace("Web.Ajax")["Loading"]={
	Begin:function(traceText){
		if ($String.IsNullOrEmpty(traceText)){
			traceText = $Resource.BuildContent("LoadingData");
		}
		
		$('#loading').html(traceText);
	},
	End:function(){
		$('#loading').html('');
	}
};
