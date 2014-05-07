function window_onload(){
	var sRedirect=$wapper.api.getQueryString("redirect_url","");
	if(sRedirect!=""){
		var sUrl=sRedirect+(sRedirect.indexOf("?")==-1?"?":"&")+"script="+$api.fn.encodeURL($wapper.api.getQueryString("script","parent.afterDelete()"))+"&"+Math.random();
		window.location.href=sUrl;
	}
	else{
		var sScript=$wapper.api.getQueryString("script","");
		if(sScript!=""){
			eval(sScript);
		}
	}
}
