var _oModalDialog=null,_sReturnValue="",_dlg_files_web="",_dlg_import_files_web="",_data_import_dialog_param=null,_beforeDialogOpen=_emptyFunction,_afterDialogClose=_emptyFunction,_dlg_files_web="function"==typeof $fn.getFilesWeb?$fn.getFilesWeb():"",_dlg_import_files_web="function"==typeof $fn.getImportFilesWeb?$fn.getImportFilesWeb():_dlg_files_web,bMSIE=$api.fn._IE();function _emptyFunction(){}
function _dlg_getOwnerApp(){var a=$api._gap_;a==$api._libaray_path&&(a=$wapper.api.getQueryString("system_owner_app","",$api.win.location.href));return a}function getOwnerApp(){return _dlg_getOwnerApp()}
function showDateTime(a,c,b,g){_beforeDialogOpen("DATEBOX",a);null==g&&(g="HH24:MI:SS");var e=b;null!=a&&(""==a.id&&(a.id="object_"+Math.floor(65536%Math.random())),e='_date_change("'+a.id+'",'+(!b?"1":"0")+");\n"+b);showFrameDialog($api._libaray_path+"/date_time.htm?date="+$api.fn.encodeURL(a?a.value:"")+"&time="+(c?1:0)+"&time_format="+$api.fn.encodeURL(g)+"&system_owner_app="+$api.fn.encodeURL(_dlg_getOwnerApp())+"&"+Math.random(),"\u65f6\u95f4/\u65e5\u671f\u9009\u62e9","dialogHeight:"+(c?320:
290)+"px; dialogWidth: 260px;center: 1; help: 0; resizable: 0;scroll:0;status: 0",null,e);bMSIE&&window.execScript(e);_afterDialogClose("DATEBOX",a)}function _date_change(a,c){if(getReturnValue()&&(document.getElementById(a).value=getReturnValue(),null!=document.getElementById(a).onchange))document.getElementById(a).onchange();c&&window.focus()}
function showDate2(a){""==a.id&&(a.id="object_"+Math.floor(65536%Math.random()));var c='<iframe style="width:100%;height:100%" src="'+($api._libaray_path+"/date_time2.htm?date="+$api.fn.encodeURL(a?a.value:"")+"&system_owner_app="+$api.fn.encodeURL(_dlg_getOwnerApp())+"&id="+a.id+"&"+Math.random())+'" border=0 frameborder=0></iframe>';createDropDrownFrame(a,c,170,200);showDropDownFrame(a)}
function showFrameDialog(a,c,b,g,e,d){-1==b.toLowerCase().indexOf("status:")&&(b+=";status:0");-1==b.toLowerCase().indexOf("center:")&&(b+=";center:1");-1==b.toLowerCase().indexOf("help:")&&(b+=";help:0");if(!bMSIE){var f=b.toLowerCase().indexOf("dialogheight:"),h=0,i="";-1!=f&&(h=b.indexOf(";",f+1),-1==h&&(h=b.length));i=b.substring(f+13,h).replace(/px/gi,"");i=parseInt(i)-30+"px";b=b.substring(0,f)+"dialogHeight:"+i+b.substring(h)}f=$wapper.api.getQueryString("plug_in_js","",a);a=$api._libaray_path+
"/frame.htm?title="+$api.fn.encodeURL(c)+"&url="+$api.fn.encodeURL(a)+"&plug_in_js="+f+"&system_owner_app="+$api.fn.encodeURL(_dlg_getOwnerApp())+"&_system_todo="+$api.fn.encodeURL(null==e?"":e)+"&"+Math.random();if(d)window.open(a);else return d="",d=g?window.showModalessDialog(a,window,b):window.showModalDialog(a,window,b),bMSIE&&(_sReturnValue=d),d}
function showInput(a,c,b,g,e,d,f){return showFrameDialog($api._libaray_path+"/inputbox.htm?prompt="+(c?$api.fn.encodeURL(c):"")+"&default="+(b?$api.fn.encodeURL(b):"")+"&format="+(g?g:"")+(null!=f?"&"+f:"")+"&max_length="+(e?e:"")+"&system_owner_app="+$api.fn.encodeURL(_dlg_getOwnerApp())+"&"+Math.random(),a,"dialogWidth:280px;dialogHeight:"+(null!=f&&-1!=f.indexOf("&additional=")?"230px":"200px")+";center:1;help:0;status:0;",null,d)}
function showCameraDialog(a,c,b,g,e,d){return showFrameDialog($api._libaray_path+"/camera.html?files_web="+$api.fn.encodeURL(_dlg_files_web)+"&file="+a+"&width="+c+"&height="+b+"&system_owner_app="+$api.fn.encodeURL(_dlg_getOwnerApp())+"&"+Math.random(),g,"dialogWidth:710px;dialogHeight:545px;center:1;help:0;status:0;",null,e,d)}
function showColor(a,c){null==a&&(a="000000");"#"==a.substring(0,1)&&(a=a.substring(1));return showFrameDialog("color.htm?color="+a+"&system_owner_app="+$api.fn.encodeURL(_dlg_getOwnerApp())+"&"+Math.random(),"\u9009\u62e9\u989c\u8272","dialogWidth:500px;dialogHeight:280px;center:1;help:0;status:0;",null,c)}
function writeDHEdFrame(a,c,b){null==a&&(a="upload");if(null==c||""==c)c=' id=w_editor name=w_editor style="width:100%;height:100%;border:1px solid gray" ';null==b&&(b="");""!=b&&"&"!=b.substring(0,1)&&(b="&"+b);document.write("<iframe "+c+' src="'+$api._libaray_path+"/editor/?folder="+$api.fn.encodeURL(a)+b+"&files_web="+$api.fn.encodeURL(_dlg_files_web)+"&system_owner_app="+$api.fn.encodeURL(_dlg_getOwnerApp())+"&"+Math.random()+'"></iframe>')}
function showDataImport(a,c,b,g,e,d,f,h){if("boolean"==typeof h)var i=h;else null==h&&(h=""),i=1==$wapper.api.getQueryString("debug","0","?"+h);_data_import_dialog_param=a=_dlg_import_files_web+"/import_console.htm?action="+$api.fn.encodeURL($api.fn.getActionURL(b))+"&fields="+$api.fn.encodeURL(a)+"&require="+$api.fn.encodeURL(c)+"&remark="+$api.fn.encodeURL(g)+"&demo="+$api.fn.encodeURL(e)+"&options_js="+$api.fn.encodeURL(d)+"&debug="+(i?1:0)+"&type="+$wapper.api.getQueryString("type","csv","?"+
h)+"&labeled="+$wapper.api.getQueryString("labeled","0","1.htm?"+h)+"&indexed="+$wapper.api.getQueryString("indexed","0","1.htm?"+h)+"&refresh="+$wapper.api.getQueryString("refresh","0","1.htm?"+h)+"&db_import="+(f?1:0)+"&version=2&system_owner_app="+$api.fn.encodeURL("http://"+window.location.host+$api._gap_)+"&"+Math.random();return window.open($wapper.api.getURLPathName(a),"_data_import_"+Math.floor(65536*Math.random()),"width=720,height="+(i?"700":"480")+",left="+(screen.availWidth-720)/2+",top="+
(screen.availHeight-480)/2)}function checkRefresh(){}bMSIE||(window.showModalDialog=_showModalDialog,window.onfocus=_checkModalDialog);function setReturnValue(a){if(bMSIE)top.returnValue=a;else{var c=$wapper.api.getQueryString("_system_todo","",$api.win.location.href);if(""!=c)try{$api.win.opener._oModalDialog=null,$api.win.opener._sReturnValue=a,$api.win.opener.eval(c)}catch(b){}}}function getReturnValue(){return _sReturnValue}
function _showModalDialog(a,c,b){_sReturnValue="";if(bMSIE)return _sReturnValue=window.showModalDialog(a,c,b);for(var g=b.split(";"),b="",e=0;e<g.length;e++){var d=g[e].replace(/=/g,":").indexOf(":");if(-1!=d){var f=g[e].substring(0,d),d=g[e].substring(d+1);if("DIALOGWIDTH"==f.toUpperCase().replace(/ /g,""))var b=b+((""==b?"":",")+"width="+d),h=parseInt(d.replace(/px/gi,"").replace(/pt/gi,"")),b=b+(",left="+(screen.availWidth-h)/2);"DIALOGHEIGHT"==f.toUpperCase().replace(/ /g,"")&&(b+=(""==b?"":",")+
"height="+d,f=parseInt(d.replace(/px/gi,"").replace(/pt/gi,"")),b+=",top="+(screen.availHeight-f)/2)}}_oModalDialog=window.open(a,"_blank",b);_oModalDialog.dialogArguments=c;_oModalDialog.focus();return null}function _checkModalDialog(){if(!bMSIE&&null!=_oModalDialog)try{_oModalDialog.focus()}catch(a){}}function closeDialog(){top.close()};
