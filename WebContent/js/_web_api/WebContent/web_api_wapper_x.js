/*
*Usage:loaded at local wapper, should use function in $wapper.api
*/
function Win_Dom(oWin) {
	this.win = oWin;
	this.dom = oWin.document;
	this.nWinDomIndex =null;
}

var $wapper = {
	findAPITries:0,
	//定义给ajax的回调函数用,用于替换$wapper.fn
	win_remark:"",

	_include_files_:",",
	
	_language_new_version:null,
	_lang_uri_:null,
	_lang_included:"\n",
	
	win_dom:null,
	_a_grid_index:new Array(),
	_a_web_form:new Array(),
	_ajax_objects:new Array(),
	
	init:function(){
		this.win_dom = new Win_Dom(window);
		this.win_dom.nWinDomIndex = $api._a_win_dom.length
		$api._a_win_dom[$api._a_win_dom.length] = this.win_dom;
	},
	findAPI:function(win){
		while ((win.$api == null) && (win.parent != null) && (win.parent != win)) {
			this.findAPITries++;
			if (this.findAPITries > 7) return null;
			this.win_remark = this.getWinRemark(win,win.parent);
			win = win.parent;
		}
		this.findAPITries = 0;
		if(win.$api!=null) {
			var apiWin = win.$api.win;
			while ((win!=apiWin) && (win.parent != null) && (win.parent != win)) {
				this.findAPITries++;
				if (this.findAPITries > 7) return null;
				this.win_remark = this.getWinRemark(win,win.parent);
				win = win.parent;
			}
			this.findAPITries = 0;
		}
		return win.$api;
	},
	getWinRemark:function(win,winParent) {
		var sRemark=this.win_remark;
		for(var i=0;i<winParent.frames.length;i++) {
			if(winParent.frames[i]==win) {
				var sFrmName="";
				if(winParent.frames[i].name!="") sFrmName=winParent.frames[i].name;
				else {
					sFrmName = parseInt(Math.random()*100000);
					winParent.frames[i].name=sFrmName;
				}
			    sRemark = "frames[\""+sFrmName+"\"]"+(sRemark==""?"":".")+sRemark;
				break;
			}
		}
		return sRemark;
	},
	getAPI:function() {
		var theAPI = this.findAPI(window);
		if((theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined")){
            if(window.name!="") this.win_remark = window.name+"."+this.win_remark;
			else return null;
			theAPI = this.findAPI(window.opener);
		}
		if (theAPI == null) return null;
		this.win_remark = "$api.win"+(this.win_remark==""?"":".")+this.win_remark;
		return theAPI;
	},
    //针对页面url比较长的采用存储数据的方式
	setRetUrl:function(){
		$api.fn.setExtData($api.fn.getFileBaseName(this.win_dom.win.location.href),$api.fn.encodeURL($wapper.api.getQueryString("returl","")));
	},
	getRetUrl:function(){
		return $wapper.api.getQueryString("returl",$api.fn.getExtData($api.fn.getFileBaseName(this.win_dom.win.location.href)));
	},
	afterAjaxLoad:function(sPageKey){
		//alert("请实现afterAjaxLoad接口！");
	},
	afterAjaxFormLoad:function(sFormName){
		//alert("请实现afterAjaxFormLoad接口！");
	},
	//$api.web --> $wapper.api
	api:{
		include:function(sFiles){$api.fn.include($wapper.win_dom,sFiles,$wapper._include_files_);$wapper._include_files_+=sFiles},        
		//setting
		//getWebURL:function(sWebAppId,sRemoteFlag,sDefault,sRelativeHost){return $api.fn.getWebURL(sWebAppId,sRemoteFlag,sDefault,sRelativeHost)},
        //str
		getParentPath:function(sPath,sDelimiter){return $api.fn.getParentPath($wapper.win_dom,sPath,sDelimiter);},
		getRelativePath:function(sFilePath,sCurrentPath){return $api.fn.getRelativePath($wapper.win_dom,sFilePath,sCurrentPath);},
		getAbsolutePath:function(sRelativePath,sCurrentFolder){return $api.fn.getAbsolutePath($wapper.win_dom,sRelativePath,sCurrentFolder);},
		//url
		getSaveFormat:function(sExpression){return $api.fn.getSaveFormat($wapper.win_dom,sExpression);},
		getDisplayFormat:function(sExpression){return $api.fn.getDisplayFormat($wapper.win_dom,sExpression);},
		getQueryString:function(sKey,sDefault,sUrl){return $api.fn.getQueryString($wapper.win_dom,sKey,sDefault,sUrl);},
		setQueryString:function(sKey,sValue,sUrl,bNoRandomSeed,bNoAnchor){return $api.fn.setQueryString($wapper.win_dom,sKey,sValue,sUrl,bNoRandomSeed,bNoAnchor);},
		getURLHost:function(sUrl){return $api.fn.getURLHost($wapper.win_dom,sUrl);},
		getURLParams:function(sUrl){return $api.fn.getURLParams($wapper.win_dom,sUrl);},
		getURLPathName:function(sUrl){return $api.fn.getURLPathName($wapper.win_dom,sUrl);},
		getURLAnchorName:function(sUrl){return $api.fn.getURLAnchorName($wapper.win_dom,sUrl);},
		formatRetURL:function(sNextUrl,sRetUrl){return $api.fn.formatRetURL($wapper.win_dom,sNextUrl,sRetUrl);},
		//nav
		doRefresh:function(){return $api.fn.doRefresh($wapper.win_dom);},
		getReturnURL:function(nUpLevel,sCurrentUrl){return $api.fn.getReturnURL($wapper.win_dom,nUpLevel,sCurrentUrl);},
		checkReturnURL:function(){return $api.fn.checkReturnURL($wapper.win_dom);},
		doReturn:function(nUpLevel,sDefaultPage){$api.fn.doReturn($wapper.win_dom,nUpLevel,sDefaultPage);},
		getNextPage:function(sUrl,sRetUrl){return $api.fn.getNextPage($wapper.win_dom,sUrl,sRetUrl);},
		nextPage:function(sUrl,sRetUrl){$api.fn.nextPage($wapper.win_dom,sUrl,sRetUrl);},
		getIpExpURL:function(sUrl){return $api.fn.getIpExpURL($wapper.win_dom,sUrl);},
		gotoURL:function(sUrl){$api.fn.gotoURL($wapper.win_dom,sUrl);},
		//ajax
		getFormData:function(sFormName,sExtParams){return $api.fn.getFormData($wapper.win_dom,sFormName,sExtParams) ;},
		getAjaxObjById:function(id,newParams){return $api.fn.getAjaxObjById($wapper.win_dom,id,newParams);},
		getAjaxContainer:function(id,sParam,sStyle){return $api.fn.getAjaxContainer($wapper.win_dom,id,sParam,sStyle);},
		getAjaxData:function(oAjaxObject,sUrl,script,bAppend){$api.fn.getAjaxData($wapper.win_dom,oAjaxObject,sUrl,script,bAppend) ;},
		errorTip:function(oAjaxObject){$api.fn.errorTip($wapper.win_dom,oAjaxObject) ;},
		fillAjaxData:function(oAjaxObj){$api.fn.fillAjaxData($wapper.win_dom,oAjaxObj) ;},
		//grid
		getGrid:function(sGridName){return $api.fn.getGrid($wapper.win_dom,sGridName) ;},
		getRowSelector:function(sGridName,bMultiSelect){return $api.fn.getRowSelector($wapper.win_dom,sGridName,bMultiSelect) ;},
		//page
	    writePageInfo:function(nRecordCount,nPageSize,nCurrentPage,nPageCount,sPageKey){$api.fn.writePageInfo($wapper.win_dom,nRecordCount,nPageSize,nCurrentPage,nPageCount,sPageKey);},
		writePageAnchor:function(nCurrentPage,nPageCount,sPageKey){$api.fn.writePageAnchor($wapper.win_dom,nCurrentPage,nPageCount,sPageKey);},
		writePageSelect:function(nCurrentPage,nPageCount,sPageKey){$api.fn.writePageSelect($wapper.win_dom,nCurrentPage,nPageCount,sPageKey);},
		writePageTextBox:function(nCurrentPage,nPageCount,sPageKey){$api.fn.writePageTextBox($wapper.win_dom,nCurrentPage,nPageCount,sPageKey);},
		getGridByPageKey:function(sPageKey){return $api.fn.getGridByPageKey($wapper.win_dom,sPageKey);},
		changePageIndex:function(nNewIndex,sPageKey){$api.fn.changePageIndex($wapper.win_dom,nNewIndex,sPageKey);},
		changePageSize:function(nNewSize,sPageKey){$api.fn.changePageSize($wapper.win_dom,nNewSize,sPageKey);},
		writeAjaxPageInfo:function(nRecordCount,nPageSize,nCurrentPage,nPageCount,sPageKey){return $api.fn.writeAjaxPageInfo($wapper.win_dom,nRecordCount,nPageSize,nCurrentPage,nPageCount,sPageKey);},
		changeAjaxPageIndex:function(nNewIndex,sPageKey,sUrl){$api.fn.changeAjaxPageIndex($wapper.win_dom,nNewIndex,sPageKey,sUrl);},
		changeAjaxPageSize:function(nNewIndex,sPageKey,sUrl){$api.fn.changeAjaxPageSize($wapper.win_dom,nNewIndex,sPageKey,sUrl);},
		//_pr_change_window_location:function(sUrl){$api.fn._pr_change_window_location($wapper.win_dom,sUrl);},
		//form
		getForm:function(sFrmName){return $api.fn.getForm($wapper.win_dom,sFrmName) ;},
		//lang
		includeLangBundle:function(sBaseName,sWebApp){$api.fn.includeLangBundle($wapper.win_dom,sBaseName,sWebApp,$wapper._lang_uri_,$wapper._lang_included);$api._lang_included+=sBaseName;},
		_includeLangBundle:function(sBaseName,sWebApp){$api.fn._includeLangBundle($wapper.win_dom,sBaseName,sWebApp,$wapper._lang_uri_,$wapper._lang_included);$api._lang_included+=sBaseName;},
		doLanguageBinding:function(sKeys){$api.fn.doLanguageBinding($wapper.win_dom,sKeys);},
		//time
        realTime:function(index){$api.fn.realTime($wapper.win_dom,index);},
		timer_begin:function(index){$api.fn.timer_begin($wapper.win_dom,index);},
		writeTime:function(){$api.fn.writeTime($wapper.win_dom.dom);},
		second_timer_begin:function(index,bAutoStart){$api.fn.second_timer_begin($wapper.win_dom,index,bAutoStart);},
		secTime:function(index){$api.fn.secTime($wapper.win_dom,index);},
		//ext
		writeHtml:function(sHtml){$api.fn.writeHtml($wapper.win_dom,sHtml);}
	},
	ui:null
}
var $api = $wapper.getAPI();
var $fn = $api.win.$fn;
$wapper.init();


if($api==null) {//||$fn==null
    alert("Error loading($api not found, check _web_api.js in api_libaray!)");
}
else {
	//_wapper_ui.js
	if($api._gap_!=$api._libaray_path) {
		$wapper.api.include($api._gap_+"/_wapper_ui");
		$wapper.api.include($api._gap_+"/_global.css");
		$wapper.api.include($api._gap_+"/theme/default/_ui.css");
	}
}