function _getPageKeyByObj(oObj){
	var sPageKey="";
	if(typeof(oObj)=="string"){
		sPageKey=oObj;
	}
	else if(typeof(oObj)=="object"){
		if(oObj.sGridId!="tblDataList"){
			var sTemp=oObj.sGridId.substring(3);
			for(var j=0;j<sTemp.length;j++){
				if(j>0&&sTemp.charAt(j)>'A'&&sTemp.charAt(j)<'Z'){
					sPageKey+="_";
				}
				sPageKey+=sTemp.charAt(j);
			}
			sPageKey="page_"+sPageKey.toLowerCase();
		}
		else{
			sPageKey="page";
		}
	}
	return sPageKey;
}

beforeChangePageIndex=function(nNewIndex,sPageKey){
	for(var i=0;i<_ap_aAjax.length;i++){
		if(_getPageKeyByObj(_ap_aObject[i])==sPageKey){
			var sUrl=_ap_aAjax[i].url;
			sUrl=$wapper.api.setQueryString(sPageKey,nNewIndex,sUrl);
			_ap_aAjax[i].doGet(sUrl);
			return false;
		}
	}
	return true;
}

beforeChangePageSize=function(nNewSize,sPageKey){
	for(var i=0;i<_ap_aAjax.length;i++){
		if(_getPageKeyByObj(_ap_aObject[i])==sPageKey){
			var sUrl=_ap_aAjax[i].url;
			var sPageSizeKey="page_size"+(sPageKey=="page"?"":"_"+sPageKey);
			sUrl=$wapper.api.setQueryString(sPageSizeKey,nNewSize,sUrl);
			top._ajax_page_size_setting=$wapper.api.setQueryString(_ap_getSettingKey(sPageKey),""+nNewSize,top._ajax_page_size_setting);
			_ap_aAjax[i].doGet(sUrl);
			return false;
		}
	}
	return true;
}

function _ap_getSettingKey(sPageKey){
	var nPos=window.location.href.indexOf("/",8);
	return $wapper.api.getURLPathName(window.location.href.substring(nPos+1)).replace(/\//g,"_").replace(/\./g,"_")+"_"+sPageKey;
}