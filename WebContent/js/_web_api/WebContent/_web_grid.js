function WebGrid(a){this.win_dom=a;var a=$api.fn.getFileBaseName(this.win_dom.win.location.href),b=a.lastIndexOf("_");if(-1==b||"_list"!=a.substring(a.length-5))b=a.length;a=a.substring(0,b);this._table_name=a.substring(0,b);this._prop_page=a+"_prop."+(-1!=(this.win_dom.win.location.href+"?").indexOf(".action?")?"action":"jsp");this.beforeChangePageSize=this.beforeChangePageIndex=null;this.actionURL=this.sIdFields=this.sGridName="";this.debug=!1;this.sDataSourceProvider=this.sDatabaseTableName=this.sGridId=
this.searchCtrls="";this.sHiddenFrameName="w_hidden";this.ajax_grid="";this.load=_wg_ajaxLoad;this.loadHtml=_wg_loadHtml;this.unload=_wg_ajaxUnload;this.reload=_wg_ajaxReload;this.getAjaxUrl=_wg_get_url;this.form=null;this.registAjaxForm=_wg_regist_form;this.sConflictCtrlList="";this.addConflictCtrl=_wf_conflict;this.OBJ_NAME=$api.lang.grid._wg_obj_name;this.OBJ_UNIT=$api.lang.grid._wg_obj_unit;this.REMARK_CELLS="0";this.DEL_PROMPT="";this.rowSelector=null;this.setRowSelector=_wg_setRowSelector;this.getRowSelector=
_wg_getRowSelector;this.setIdFields=_wg_setIdFields;this.setDatabaseTableName=_wg_setDatabaseTableName;this.setAction=_wg_setAction;this.getAction=_wg_getAction;this.setDebug=_wg_setDebug;this.getRowData=_wg_getRowData;this.setRowData=_wg_setRowData;this.newRecord=_wg_newRecord;this.getNewURL=null;this.editRecord=_wg_editRecord;this.getEditURL=null;this.deleteRecord=_wg_deleteRecord;this.getDeleteURL=this.beforeDelete=null;this.doSearch=_wg_doSearch;this.addSearchCtrl=_wg_addSearchCtrl;this.fillSearchCtrlValue=
_wg_fillSearchCtrlValue;this.beforeSearch=null;this.customAction=_wg_customAction;this.selfAction=_wg_selfAction;this.afterAction=_wg_afterAction;this.doReturn=_wg_doReturn;this.doRefresh=_wg_refresh;this.getSelectedIdParams=_wg_getIdParams;this.getRecordRemark=_wg_getRecordRemark;this.resetOrder=_wg_resetOrder;this.maskOrderField=_wg_maskOrderField;this.onRowClick=this.beforeGetRecordRemark=null;this.getGridId=_wg_getGridId;this.getHiddenFrame=_wg_getHiddenFrame;this.saveRowSelection=_wg_saveRowSelection;
this.loadRowSelection=_wg_loadRowSelection;this.nGridIndex=null}function _wf_conflict(a){this.sConflictCtrlList+=(""==this.sConflictCtrlList?"":",")+a}function _wg_get_url(){if(""!=this.ajax_grid&&null!=$api.fn.getAjaxObjById(this.win_dom,$api.fn._grid_prefix+this.ajax_grid))return $api.fn.getAjaxObjById(this.win_dom,$api.fn._grid_prefix+this.ajax_grid).url}
function _wg_regist_form(a){a.addConflictCtrl($api.fn._grid_prefix+this.ajax_grid);this.form=a;this._prop_page=this._table_name+"_form.jsp";this.addConflictCtrl($api.fn._form_prefix+a.ajax_form);this.form.grid=this}function _wg_ajaxUnload(){if(0<this.sConflictCtrlList.length)for(var a=this.sConflictCtrlList.split(","),b=0;b<a.length;b++)this.win_dom.win.document.getElementById(a[b])&&(this.win_dom.win.document.getElementById(a[b]).style.display="")}
function _wg_loadHtml(a){""!=this.ajax_grid&&(null==a&&(a=""),this.win_dom.win.document.getElementById($api.fn._grid_prefix+this.ajax_grid).style.display="",this.win_dom.win.document.getElementById($api.fn._grid_prefix+this.ajax_grid).innerHTML=a)}
function _wg_ajaxLoad(a,b){if(""!=this.ajax_grid){null==a&&(a=this.getAjaxUrl());-1==$api.fn.getFileName(a).indexOf(".")&&(a+=".jsp");-1==a.indexOf("?")&&(a+="?"+$api.fn.getURLParams(this.win_dom));a=$api.fn.setQueryString(this.win_dom,"returl","",a);a=$api.fn.getAbsolutePath(this.win_dom,a);if(0<this.sConflictCtrlList.length)for(var c=this.sConflictCtrlList.split(","),d=0;d<c.length;d++)this.win_dom.win.document.getElementById(c[d])&&(this.win_dom.win.document.getElementById(c[d]).style.display=
"none");this.win_dom.win.document.getElementById($api.fn._grid_prefix+this.ajax_grid).style.display="";"page"==this.ajax_grid&&!b&&this.win_dom.win.document.getElementById($api.fn._grid_prefix+this.ajax_grid)&&(c=this.win_dom.win.document.getElementById($api.fn._grid_prefix+this.ajax_grid).parentElement,d=parseInt(this.win_dom.win.document.getElementById($api.fn._grid_prefix+this.ajax_grid).offsetTop),d=parseInt(c?c.clientHeight:this.win_dom.win.document.body.clientHeight)-d-60,parseInt(this.win_dom.win.document.getElementById($api.fn._grid_prefix+
this.ajax_grid).offsetLeft),c=c?c.clientWidth:"100%",40>d&&(d=40),c='<div id="'+$api.fn._grid_prefix+this.ajax_grid+'_loading" style="display:none;position:absolute;background:url('+$api._libaray_path+"/images/blue_bg.png);z-index:9999;height:"+d+";width:"+c+";text-align:center;padding-top:"+d/3+'px"><img src='+$api._libaray_path+"/images/loading.gif></div>",this.win_dom.win.document.getElementById($api.fn._grid_prefix+this.ajax_grid).innerHTML=c);$api.fn.changeAjaxPageIndex(this.win_dom,$api.fn.getQueryString(this.win_dom,
this.ajax_grid,"1",a),this.ajax_grid,a);this.ajax_url=a}}function _wg_ajaxReload(a){this.load(a,!0)}function _wg_setRowSelector(a,b){this.rowSelector=$api.fn.getRowSelector(this.win_dom,a,b)}function _wg_getRowSelector(){return this.rowSelector}function _wg_setIdFields(a){this.sIdFields=a}function _wg_setAction(a){this.actionURL=a}function _wg_getAction(){return this.actionURL}function _wg_setDebug(a){this.debug=a}function _wg_setDatabaseTableName(a){this.sDatabaseTableName=a}
function _wg_addSearchCtrl(a,b,c){this.searchCtrls+=(0==this.searchCtrls.length?"":",")+a+","+b+","+(null==c?"":c)}
function _wg_newRecord(){for(var a=$api.fn.getParentPath(this.win_dom)+"/"+this._prop_page+"?",b=this.sIdFields.split(","),c=0;c<b.length;c++)""!=b[c]&&(a+=(0==c?"":"&")+b[c]+"=");null!=this.getNewURL&&(a=this.getNewURL(a));a&&(a=$api.fn.getAbsolutePath(this.win_dom,a),null!=this.form?this.form.load(a):(""==$api.fn.getQueryString(this.win_dom,"returl","",a)&&(b=this.win_dom.win.location.href,""!=this.ajax_grid&&(b=$api.fn.setURLParams(this.win_dom,b,$api.fn.getURLParams(this.win_dom,this.getAjaxUrl()))),
b=$api.fn.getRelativePath(this.win_dom,b,$api.fn.getParentPath(this.win_dom,a)),a=$api.fn.setQueryString(this.win_dom,"returl",b,a)),this.win_dom.win.location.href=$api.fn.setQueryString(this.win_dom,null,null,a)))}
function _wg_editRecord(a){if(null==a){if(0==this.rowSelector.getSize()){alert($api.lang.grid._wg_lang_please_select.replace("@@OBJ_NAME",this.OBJ_NAME));return}var b=this.rowSelector.getSelectedRow(0),a=parseInt(b.substring(b.lastIndexOf("_")+1))}for(var b=$api.fn.getParentPath(this.win_dom)+"/"+this._prop_page+"?",c=this.sIdFields.split(","),d=0;d<c.length;d++)""!=c[d]&&(b+=(0==d?"":"&")+c[d]+"="+$api.fn.encodeURL(_wg_getFieldValue(this,a,c[d])));null!=this.getEditURL&&(b=this.getEditURL(b));b&&
(b=$api.fn.getAbsolutePath(this.win_dom,b),null!=this.form?this.form.load(b):(""==$api.fn.getQueryString(this.win_dom,"returl","",b)&&(a=this.win_dom.win.location.href,""!=this.ajax_grid&&(a=$api.fn.setURLParams(this.win_dom,a,$api.fn.getURLParams(this.win_dom,this.getAjaxUrl()))),a=$api.fn.getRelativePath(this.win_dom,a,$api.fn.getParentPath(this.win_dom,b)),b=$api.fn.setQueryString(this.win_dom,"returl",a,b)),this.win_dom.win.location.href=$api.fn.setQueryString(this.win_dom,null,null,b)))}
function _wg_getIdParams(){for(var a="",b=this.sIdFields.split(","),c=0;c<b.length;c++){for(var d="",f="",f="",e=0;e<this.rowSelector.getSize();e++)f=this.rowSelector.getSelectedRow(e),f=_wg_getFieldValue(this,f.substring(f.lastIndexOf("_")+1),b[c]),0<f.length&&(d+=(0==e?"":",")+f);a+=(0==c?"":"&")+b[c]+"="+$api.fn.encodeURL(d)}return a}
function _wg_deleteRecord(a){var b="";if(null==a&&0==this.rowSelector.getSize())alert($api.lang.grid._wg_lang_please_select_del.replace("@@OBJ_NAME",this.OBJ_NAME));else{if(0<this.rowSelector.getSize())b=this.getSelectedIdParams();else for(var c=this.sIdFields.split(","),d=0;d<c.length;d++)""!=c[d]&&(b+=(0==d?"":"&")+c[d]+"="+$api.fn.encodeURL(_wg_getFieldValue(this,a,c[d])));if(null==this.beforeDelete||this.beforeDelete(b)){a="webGrid";"tblDataList"!=this.sGridId&&(a="$wapper._a_grid_index["+this.nGridIndex+
"]");b=this.actionURL+"?op=delete_"+this._table_name+"&"+b+"&_id_fields="+$api.fn.encodeURL(this.sIdFields)+"&_webgrid_delete_action=1&_object="+$api.fn.encodeURL($api.fn._ED(this.sDatabaseTableName))+"&_data_source_provider="+("com.lemon.web.WebConfig"==this.sDataSourceProvider?"":$api.fn.encodeURL(this.sDataSourceProvider))+"&script=parent."+a+".afterAction('delete');";if(null!=this.getDeleteURL&&(b=this.getDeleteURL(b),""==b||null==b))return;a="";1==this.rowSelector.getSize()&&""!=this.REMARK_CELLS?
(a=$api.lang.grid._wg_lang_delete_confirm1.replace("@@OBJ_NAME",this.OBJ_NAME),a=a.replace("@@OBJ_REMARK",this.getRecordRemark(this.rowSelector.getSelectedRow(0))),a=a.replace("@@OBJ_UNIT","")):0==this.rowSelector.getSize()?(a=$api.lang.grid._wg_lang_delete_confirm2.replace("@@OBJ_NAME",this.OBJ_NAME),a=a.replace("@@OBJ_UNIT","")):(a=$api.lang.grid._wg_lang_delete_confirm2.replace("@@OBJ_NAME",this.OBJ_NAME),a=a.replace("@@OBJ_UNIT"," "+this.rowSelector.getSize()+" "+this.OBJ_UNIT));""!=this.DEL_PROMPT&&
(a=this.DEL_PROMPT);confirm(a)&&_wg_postActionURL(this,$api.fn.getActionURL(b),this.getHiddenFrame())}}}function _wg_afterAction(a){"delete"==a&&(null==this.afterDelete?(alert($api.lang.grid._wg_lang_after_delete),this.debug||this.doRefresh()):this.afterDelete())}
function _wg_doSearch(){if(""!=this.searchCtrls){for(var a=this.searchCtrls.split(","),b=""!=this.ajax_grid?$api.fn.getAjaxObjById(this.win_dom,$api.fn._grid_prefix+this.ajax_grid).url:this.win_dom.win.location.href,c="",d=0;d<a.length;d+=3)if(c=this.win_dom.win.document.getElementById(a[d]))c="INPUT"==c.tagName.toUpperCase()&&"CHECKBOX"==c.type.toUpperCase()?c.checked?"1":"0":c.value,b=$api.fn.setQueryString(this.win_dom,a[d+1],c,b);null!=this.beforeSearch&&(b=this.beforeSearch(b));if(""!=b&&null!=
b)if(""!=this.ajax_grid)$api.fn.getAjaxData(this.win_dom,$api.fn.getAjaxObjById(this.win_dom,$api.fn._grid_prefix+this.ajax_grid),b,"$wapper.fn.$wapper.afterAjaxLoad('"+this.ajax_grid+"')");else if(a=this.win_dom.win.document.getElementById("_form_url_params")){a.action=$api.fn.getURLPathName(this.win_dom);for(d=0;d<a.elements.length;d++)a.elements[d].value=$api.fn.decodeURL(a.elements[d].value);a.submit()}else this.win_dom.win.location.href=b}}
function _wg_fillSearchCtrlValue(a,b){if(""==this.searchCtrls)return!0;for(var c=!1,d=this.searchCtrls.split(","),f=0;f<d.length;f+=3){var e=this.win_dom.win.document.getElementById(d[f]);if(e){var c=!0,g=$api.fn.getQueryString(this.win_dom,d[f+1],d[f+2]);if("INPUT"==e.tagName.toUpperCase()&&"CHECKBOX"==e.type.toUpperCase())e.checked="1"==g;else{var h=e.value;e.value=g;"SELECT"==e.tagName&&""==g&&-1==e.selectedIndex&&(e.value=h)}}}!c&&null!=a&&null!=b&&10>b&&(b++,this.win_dom.win.setTimeout(a+'.fillSearchCtrlValue("'+
a+'",'+b+");",100));return c}function _wg_selfAction(a,b){null==a||""==a||(b?confirm(b)&&_wg_postActionURL(this,$api.fn.getActionURL(a),this.getHiddenFrame()):_wg_postActionURL(this,$api.fn.getActionURL(a),this.getHiddenFrame()))}
function _wg_customAction(a,b,c,d){if(0==this.rowSelector.getSize())alert($api.lang.grid._wg_lang_please_select.replace("@@OBJ_NAME",this.OBJ_NAME));else if(b&&1<this.rowSelector.getSize())c=$api.lang.grid._wg_lang_please_select_one.replace("@@OBJ_NAME",this.OBJ_NAME),c=c.replace("@@OBJ_UNIT",this.OBJ_UNIT),alert(c);else{null==a&&(a="");var f="",f=this.getSelectedIdParams(),e=$api.fn.getURLPathName(this.win_dom,a),e=e.substring(e.length-(this.actionURL.length<e.length?this.actionURL.length:e.length));
e==this.getAction()&&null!=a&&""!=this.getAction()?(f=this.getAction()+"?"+f+"&"+$api.fn.getURLParams(this.win_dom,a),c?confirm(c)&&_wg_postActionURL(this,$api.fn.getActionURL(f),this.getHiddenFrame()):_wg_postActionURL(this,$api.fn.getActionURL(f),this.getHiddenFrame())):(c=$api.fn.getFileExtName(a).toLowerCase(),"htm"!=c&&"html"!=c&&"jsp"!=c&&-1==a.indexOf("?")&&(a+=".jsp"),a=$api.fn.getAbsolutePath(this.win_dom,a),c=this.getRecordRemark(this.rowSelector.getSelectedRow(0)),this.win_dom.win.document.getElementById(this.rowSelector.getSelectedRow(0)),
a+=(-1==a.indexOf("?")?"?":"&")+f+(b&&!d?"&record_remark="+$api.fn.encodeURL(c):""),b=this.win_dom.win.location.href,""!=this.ajax_grid&&(b=$api.fn.setURLParams(this.win_dom,b,$api.fn.getURLParams(this.win_dom,this.getAjaxUrl()))),b=$api.fn.getRelativePath(this.win_dom,b,$api.fn.getParentPath(this.win_dom,a)),a=$api.fn.setQueryString(this.win_dom,"returl",b,a),_wg_postActionURL(this,$api.fn.setQueryString(this.win_dom,null,null,a),this.win))}}
function _wg_doReturn(a){var b=$api.fn.setQueryString(this.win_dom,null,null,$api.fn.getQueryString(this.win_dom,"returl",$api._gap_));if(b==$api._gap_)if(""!=a)b=a;else return;this.win_dom.win.location.href=$api.fn.getAbsolutePath(this.win_dom,b)}
function _wg_resetOrder(a,b){if(null==b||""==b)b="order";var c=this.win_dom.win.document.getElementById("tdHeader_"+this.sGridId+"_"+a).getAttribute("OrderExp",""),d=_wg_getOrderField(c),f=$api.fn.getQueryString(this.win_dom,b,"",""!=this.ajax_grid?this.getAjaxUrl():null),e=_wg_getOrderField(f);d.toLowerCase()==e.toLowerCase()&&(c=d,c=" desc"==f.substring(f.length-5)?c+" asc":c+" desc");""!=this.ajax_grid?this.reload($api.fn.setQueryString(this.win_dom,b,c,this.getAjaxUrl())):this.win_dom.win.location.href=
$api.fn.setQueryString(this.win_dom,b,c)}
function _wg_maskOrderField(a){if(null==a||""==a)a="order";a=$api.fn.getQueryString(this.win_dom,a,"");if(""!=a)for(var b=_wg_getOrderField(a),c=0;c<this.win_dom.win.document.getElementById(this.sGridId).rows[0].cells.length;c++){var d=this.win_dom.win.document.getElementById(this.sGridId).rows[0].cells[c].getAttribute("OrderExp","");if(d&&d.substring(0,b.length)==b){" desc"==a.substring(b.length).toLowerCase()?this.win_dom.win.document.getElementById(this.sGridId).rows[0].cells[c].innerHTML+="\u2191":
this.win_dom.win.document.getElementById(this.sGridId).rows[0].cells[c].innerHTML+="\u2193";break}}}
function _wg_saveRowSelection(){if(""!=this.sIdFields){for(var a=$api.fn.getURLPathName(this.win_dom),a=a+("?"+this.sGridId),b=-1,c=0;c<$api.fn.oRowSelection.length;c++)if($api.fn.oRowSelection[c].substring(0,a.length)==a){b=c;break}-1==b&&(b=$api.fn.oRowSelection.length);for(var d="",c=0;c<this.rowSelector.getSize();c++){0<c&&(d+="\n");for(var f=this.sIdFields.split(","),e="",g=0;g<f.length;g++){var h=this.getRowData(this.rowSelector.getSelectedRow(c),_wg_toAttrName(f[g]));if(null==h||""==h){e="";
break}e+=(0==g?"":"\n")+h}if(""==e)break;if(-1!=("\n"+d+"\n").indexOf("\n"+e+"\n"))return;d+=e}$api.fn.oRowSelection[b]=a+"\n"+d}}
function _wg_loadRowSelection(){if(""!=this.sIdFields){for(var a=$api.fn.getURLPathName(this.win_dom),a=a+("?"+this.sGridId),b="",c=0;c<$api.fn.oRowSelection.length;c++)if($api.fn.oRowSelection[c].substring(0,a.length)==a){b=$api.fn.oRowSelection[c].substring(a.length+1);break}if(""!=b){this.rowSelector.clearSelection();for(c=0;c<this.win_dom.win.document.getElementById(this.sGridId).rows.length;c++){var a="",d=this.sIdFields.split(",");""==this.win_dom.win.document.getElementById(this.sGridId).rows[c].id&&
(this.win_dom.win.document.getElementById(this.sGridId).rows[c].id="temp_id_"+c);for(var f=0;f<d.length;f++)a+=(0==f?"":"\n")+this.getRowData(this.win_dom.win.document.getElementById(this.sGridId).rows[c].id,_wg_toAttrName(d[f]));-1!=("\n"+b+"\n").indexOf("\n"+a+"\n")&&(this.rowSelector.aRowList[this.rowSelector.aRowList.length]=this.win_dom.win.document.getElementById(this.sGridId).rows[c].id)}this.rowSelector.maskSelectedRows();if(null!=this.onRowClick&&0<this.rowSelector.aRowList.length)this.onRowClick(this.rowSelector.aRowList[0])}}}
function _wg_toAttrName(a){for(var b="",a=a.toLowerCase().split("_"),c=0;c<a.length;c++)b+=a[c].substring(0,1).toUpperCase()+a[c].substring(1);-1!=",id,classname,class,style,name,width,height,text,".indexOf(b.toLowerCase())&&(b="_"+b);return b}function _wg_getFieldValue(a,b,c){c=_wg_toAttrName(c);a=a.win_dom.win.document.getElementById("_DataListTD_"+a.sGridId+"_"+b);return null==a?"":a.getAttribute(c)}
function _wg_getRowData(a,b){if(""==a||null==a)return null;var c=this.win_dom.win.document.getElementById(a);return!c||null==c.cells||null==c.cells.length||0==c.cells.length?null:c.cells[0].getAttribute(b)}function _wg_setRowData(a,b,c){this.win_dom.win.document.getElementById(a).cells[0].setAttribute(b,c)}
function _wg_getRecordRemark(a){null==a&&1==this.rowSelector.getSize()&&(a=this.rowSelector.getSelectedRow(0));for(var b=this.REMARK_CELLS.split(","),c="",d="",f=0;f<b.length;f++){var e="";isNaN(b[f])?e=this.getRowData(a,b[f]):(null!=this.win_dom.win.document.getElementById(a).cells[parseInt(b[f])]&&(e=$api.fn.trim($api.fn.getTextFromHTML(this.win_dom.win.document.getElementById(a).cells[parseInt(b[f])].innerHTML))),"0"==b[f]&&0<this.win_dom.win.document.getElementById(a).cells[0].getElementsByTagName("A").length&&
(e=$api.fn.trim($api.fn.getTextFromHTML(this.win_dom.win.document.getElementById(a).cells[parseInt(b[f])].getElementsByTagName("A")[0].innerHTML))),!$api.fn._IE()&&"\n"==e.charAt(e.length-1)&&(e=e.substring(0,e.length-1)));""!=e&&(0==f?c+=e:d+=(""==d?"":",")+e)}""!=d&&(c+="("+d+")");null!=this.beforeGetRecordRemark&&(c=this.beforeGetRecordRemark(c));return c}
function _wg_getOrderField(a){var b=a;" asc"==a.substring(a.length-4).toLowerCase()&&(b=a.substring(0,a.length-4));" desc"==a.substring(a.length-5).toLowerCase()&&(b=a.substring(0,a.length-5));return b}function _wg_refresh(){""!=this.ajax_grid?this.reload():this.win_dom.win.location.href=$api.fn.setQueryString(this.win_dom)}function _wg_getGridId(){return this.sGridId}function _wg_getHiddenFrame(){return this.win_dom.win.frames[this.sHiddenFrameName]}
function _wg_postActionURL(a,b,c){null==c&&(c=a.win_dom.win);b=$api.fn.getAbsolutePath(a.win_dom,b);if(2048>b.length)c.location.href=b;else{var d=$api.fn.getURLParams(a.win_dom,b).split("&"),f=a.win_dom.win.document.getElementById(a.getGridId()),e=a.win_dom.win.document.getElementById("form_"+a.getGridId());null==e&&(e=a.win_dom.win.document.createElement("DIV"),f==f.parentNode.lastChild?f.parentNode.appendChild(e):f.parentNode.insertBefore(e,f.nextSibling),e.innerHTML+="<form id=form_"+a.getGridId()+
" name=form_"+a.getGridId()+' style="display:none;"></form>',e=a.win_dom.win.document.getElementById("form_"+a.getGridId()));for(var f="",g=0;g<d.length;g++){var h=d[g].indexOf("=");if(-1!=h)var i=d[g].substring(0,h),h=$api.fn.decodeURL(d[g].substring(h+1)),f=f+("<input name="+i+' value="'+h.replace(/\"/g,"&quot;")+'">')}e.innerHTML=f;e.action=$api.fn.getURLPathName(a.win_dom,b);e.method="post";e.target=c.name;e.submit()}};
