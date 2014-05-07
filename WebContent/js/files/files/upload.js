var aFile=new Array();
var aKey=new Array();
var aSize=new Array();
var sLastError="";

function window_onload(){
	var sScript=$wapper.api.getQueryString("script","");
	var sRedirect=$wapper.api.getQueryString("redirect_url","");
	sRedirect+=(sRedirect.indexOf("?")==-1?"?":"&")+"script="+$api.fn.encodeURL(sScript);
	sRedirect+="&files="+$api.fn.encodeURL(arrayToString(aFile));
	sRedirect+="&keys="+$api.fn.encodeURL(arrayToString(aKey));
	sRedirect+="&size="+$api.fn.encodeURL(arrayToString(aSize));
	sRedirect+="&error="+$api.fn.encodeURL(sLastError);
	sRedirect+="&files_web="+$api.fn.encodeURL($wapper.api.getQueryString("files_web",""));
	window.location.href=sRedirect+"&"+Math.random();
}

function arrayToString(a){
	var s="";
	for(var i=0;i<a.length;i++){
		s+=(i==0?"":"\n")+a[i];
	}
	return s;
}
