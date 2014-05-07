function Win_Dom(a) {
	this.win = a;
	this.dom = a.document;
	this.nWinDomIndex = null
}
var $wapper = {
	findAPITries : 0,
	maxAPITries : 7,
	win_remark : "",
	sHiddenFrameName : "w_hidden",
	_include_files_ : ",",
	_language_new_version : null,
	_lang_uri_ : null,
	_lang_included : "\n",
	win_dom : null,
	_a_grid_index : [],
	_a_web_form : [],
	_ajax_objects : [],
	init : function() {
		this.win_dom = new Win_Dom(window);
		this.win_dom.nWinDomIndex = $api._a_win_dom.length;
		$api._a_win_dom[$api._a_win_dom.length] = this.win_dom
	},
	findAPI : function(a) {
		for (; null == a.$api && null != a.parent && a.parent != a;) {
			this.findAPITries++;
			if (this.findAPITries > this.maxAPITries)
				return null;
			this.win_remark = this.getWinRemark(a, a.parent);
			a = a.parent
		}
		this.findAPITries = 0;
		if (null != a.$api) {
			for ( var b = a.$api.win; a != b && null != a.parent
					&& a.parent != a;) {
				this.findAPITries++;
				if (this.findAPITries > this.maxAPITries)
					return null;
				this.win_remark = this.getWinRemark(a, a.parent);
				a = a.parent
			}
			this.findAPITries = 0
		}
		return a.$api
	},
	getWinRemark : function(a, b) {
		for ( var c = this.win_remark, d = 0; d < b.frames.length; d++)
			if (b.frames[d] == a) {
				var e = "";
				try {
					e = b.frames[d].name
				} catch (f) {
					e = ""
				}
				c = "" != e ? 'frames["' + e + '"]' + ("" == c ? "" : ".") + c
						: "frames[" + d + "]" + ("" == c ? "" : ".") + c;
				break
			}
		return c
	},
	getAPI : function() {
		var a = this.findAPI(window);
		if (null == a && null != window.opener
				&& "undefined" != typeof window.opener) {
			if ("" != window.name)
				this.win_remark = window.name + "." + this.win_remark;
			else
				return null;
			a = this.findAPI(window.opener)
		}
		if (null == a)
			return null;
		this.win_remark = "$api.win" + ("" == this.win_remark ? "" : ".")
				+ this.win_remark;
		return a
	},
	setRetUrl : function() {
		$api.fn.setExtData($api.fn
				.getFileBaseName(this.win_dom.win.location.href), $api.fn
				.encodeURL($wapper.api.getQueryString("returl", "")))
	},
	getRetUrl : function() {
		return $wapper.api.getQueryString("returl", $api.fn.getExtData($api.fn
				.getFileBaseName(this.win_dom.win.location.href)))
	},
	afterAjaxLoad : function() {
	},
	afterAjaxFormLoad : function() {
	},
	api : {
		id : function(a) {
			return $api.fn.id($wapper.win_dom, a)
		},
		form : function(a, b) {
			return 2 == arguments.length ? $api.fn.form($wapper.win_dom, a, b)
					: $api.fn.form($wapper.win_dom, a)
		},
		include : function(a) {
			$api.fn.include($wapper.win_dom, a, $wapper._include_files_);
			$wapper._include_files_ += a
		},
		getParentPath : function(a, b) {
			return $api.fn.getParentPath($wapper.win_dom, a, b)
		},
		getRelativePath : function(a, b) {
			return $api.fn.getRelativePath($wapper.win_dom, a, b)
		},
		getAbsolutePath : function(a, b) {
			return $api.fn.getAbsolutePath($wapper.win_dom, a, b)
		},
		getSaveFormat : function(a) {
			return $api.fn.getSaveFormat($wapper.win_dom, a)
		},
		getDisplayFormat : function(a) {
			return $api.fn.getDisplayFormat($wapper.win_dom, a)
		},
		getQueryString : function(a, b, c) {
			return $api.fn.getQueryString($wapper.win_dom, a, b, c)
		},
		setQueryString : function(a, b, c, d, e) {
			return $api.fn.setQueryString($wapper.win_dom, a, b, c, d, e)
		},
		setURLParams : function(a, b) {
			return $api.fn.setURLParams($wapper.win_dom, a, b)
		},
		getURLHost : function(a) {
			return $api.fn.getURLHost($wapper.win_dom, a)
		},
		getURLParams : function(a) {
			return $api.fn.getURLParams($wapper.win_dom, a)
		},
		getURLPathName : function(a) {
			return $api.fn.getURLPathName($wapper.win_dom, a)
		},
		getURLAnchorName : function(a) {
			return $api.fn.getURLAnchorName($wapper.win_dom, a)
		},
		formatRetURL : function(a, b) {
			return $api.fn.formatRetURL($wapper.win_dom, a, b)
		},
		doRefresh : function(a) {
			return $api.fn.doRefresh($wapper.win_dom, a)
		},
		getReturnURL : function(a, b) {
			return $api.fn.getReturnURL($wapper.win_dom, a, b)
		},
		checkReturnURL : function() {
			return $api.fn.checkReturnURL($wapper.win_dom)
		},
		doReturn : function(a, b) {
			$api.fn.doReturn($wapper.win_dom, a, b)
		},
		getNextPage : function(a, b) {
			return $api.fn.getNextPage($wapper.win_dom, a, b)
		},
		nextPage : function(a, b) {
			$api.fn.nextPage($wapper.win_dom, a, b)
		},
		getIpExpURL : function(a) {
			return $api.fn.getIpExpURL($wapper.win_dom, a)
		},
		getHiddenFrame : function() {
			return $api.fn.getHiddenFrame($wapper.win_dom)
		},
		selfAction : function(a, b) {
			$api.fn.selfAction($wapper.win_dom, a, b)
		},
		selfURL : function(a, b) {
			$api.fn.selfURL($wapper.win_dom, a, b)
		},
		gotoURL : function(a, b) {
			$api.fn.gotoURL($wapper.win_dom, a, b)
		},
		getFormData : function(a, b) {
			return $api.fn.getFormData($wapper.win_dom, a, b)
		},
		getAjaxObjById : function(a, b) {
			return $api.fn.getAjaxObjById($wapper.win_dom, a, b)
		},
		getAjaxContainer : function(a, b, c) {
			return $api.fn.getAjaxContainer($wapper.win_dom, a, b, c)
		},
		getAjaxData : function(a, b, c, d) {
			$api.fn.getAjaxData($wapper.win_dom, a, b, c, d)
		},
		loadAjaxData : function(a, b, c, d) {
			$api.fn.loadAjaxData($wapper.win_dom, a, b, c, d)
		},
		getGrid : function(a) {
			return $api.fn.getGrid($wapper.win_dom, a)
		},
		getRowSelector : function(a, b) {
			return $api.fn.getRowSelector($wapper.win_dom, a, b)
		},
		writePageInfo : function(a, b, c, d, e) {
			$api.fn.writePageInfo($wapper.win_dom, a, b, c, d, e)
		},
		writePageAnchor : function(a, b, c) {
			$api.fn.writePageAnchor($wapper.win_dom, a, b, c)
		},
		writePageSelect : function(a, b, c) {
			$api.fn.writePageSelect($wapper.win_dom, a, b, c)
		},
		writePageTextBox : function(a, b, c) {
			$api.fn.writePageTextBox($wapper.win_dom, a, b, c)
		},
		getGridByPageKey : function(a) {
			return $api.fn.getGridByPageKey($wapper.win_dom, a)
		},
		changePageIndex : function(a, b) {
			$api.fn.changePageIndex($wapper.win_dom, a, b)
		},
		changePageSize : function(a, b) {
			$api.fn.changePageSize($wapper.win_dom, a, b)
		},
		writeAjaxPageInfo : function(a, b, c, d, e) {
			return $api.fn.writeAjaxPageInfo($wapper.win_dom, a, b, c, d, e)
		},
		changeAjaxPageIndex : function(a, b, c) {
			$api.fn.changeAjaxPageIndex($wapper.win_dom, a, b, c)
		},
		changeAjaxPageSize : function(a, b, c) {
			$api.fn.changeAjaxPageSize($wapper.win_dom, a, b, c)
		},
		getForm : function(a) {
			return $api.fn.getForm($wapper.win_dom, a)
		},
		includeLangBundle : function(a, b) {
			$api.fn.includeLangBundle($wapper.win_dom, a, b,
					$wapper._lang_uri_, $wapper._lang_included);
			$api._lang_included += a
		},
		_includeLangBundle : function(a, b) {
			$api.fn._includeLangBundle($wapper.win_dom, a, b,
					$wapper._lang_uri_, $wapper._lang_included);
			$api._lang_included += a
		},
		doLanguageBinding : function(a) {
			$api.fn.doLanguageBinding($wapper.win_dom, a)
		},
		html : function(a) {
			$api.fn.html($wapper.win_dom, a)
		},
		load : function(a) {
			$api.fn.load($wapper.win_dom, a)
		},
		resize : function(a) {
			$api.fn.resize($wapper.win_dom, a)
		},
		showLocalImg : function(a, b) {
			return $api.fn.showLocalImg($wapper.win_dom, a, b)
		},
		getLocalFileData : function(a) {
			return $api.fn.getLocalFileData($wapper.win_dom, a)
		},
		getFakePath : function(a) {
			return $api.fn.getFakePath($wapper.win_dom, a)
		}
	},
	ui : null
}, $api = $wapper.getAPI();
if (null == $api)
	alert("Error loading($api not found, check _web_api.js in api_libaray!)");
else {
	var $fn = $api.win.$fn;
	$wapper.init();
	var $wp = $wapper.api, $ap = $api.fn;
	$api._gap_ != $api._libaray_path && $api.inc_css
			&& $wapper.api.include($api._gap_ + "/_wapper_ui")
};
