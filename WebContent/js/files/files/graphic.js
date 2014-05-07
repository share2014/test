var sSizeStr="";
var sStretchURL="";

function window_onload(){
	var sRedirect=$wapper.api.getQueryString("redirect_url","");
	if(sRedirect!=""){
		var sUrl=sRedirect+(sRedirect.indexOf("?")==-1?"?":"&")+"size_str="+$api.fn.encodeURL(sSizeStr)+"&stretch_url="+$api.fn.encodeURL(sStretchURL)+"&script="+$api.fn.encodeURL($wapper.api.getQueryString("script","parent.afterFileAction()"))+"&"+Math.random();
		window.location.href=sUrl;
	}
	else{
		var sScript=$wapper.api.getQueryString("script","");
		if(sScript!=""){
			window.execScript(sScript);
		}
	}

}