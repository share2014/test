//处理通过Ajax的分页信息

$wapper.api.include("toolkit/_ajax_pager_impl");

var _ap_aAjax=new Array();
var _ap_aObject=new Array();
if(top._ajax_page_size_setting==null){
	top._ajax_page_size_setting="";
}

function registAjaxPager(oAjax,oPageObj){
	if(oPageObj==null||oPageObj==""){
		oPageObj="page";
	}
	for(var i=0;i<_ap_aAjax.length;i++){
		if(_ap_aAjax[i]==oAjax){
			_ap_aObject[i]=oPageObj;
			return;
		}
	}
	_ap_aAjax[_ap_aAjax.length]=oAjax;
	_ap_aObject[_ap_aObject.length]=oPageObj;
}

function resetAjaxPageDataUrl(oAjax,sDataUrl,sCurrentPage,sPageSize){
	if(sCurrentPage==null){
		sCurrentPage="";
	}
	if(sPageSize==null){
		sPageSize="";
	}
	for(var i=0;i<_ap_aAjax.length;i++){
		if(oAjax==_ap_aAjax[i]){
			var sPageKey=_getPageKeyByObj(_ap_aObject[i]);			
			var sPageSizeKey="page_size"+(sPageKey=="page"?"":"_"+sPageKey);
			sDataUrl=$wapper.api.setQueryString(sPageKey,sCurrentPage,sDataUrl);
			if(sPageSize==""){
				sPageSize=$wapper.api.getQueryString(_ap_getSettingKey(sPageKey),"",top._ajax_page_size_setting);
			}
			sDataUrl=$wapper.api.setQueryString(sPageSizeKey,sPageSize,sDataUrl);
			break;
		}
	}
	return sDataUrl;
}

