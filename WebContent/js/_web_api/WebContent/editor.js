var _editor_files_web="",_editor_files_web="function"==typeof $fn.getFilesWeb?$fn.getFilesWeb():"";function _editor_getOwnerApp(){var a=$api._gap_;a==$api._libaray_path&&(a=$api.win.$wapper.api.getQueryString("system_owner_app"));return a}
function writeDHEdFrame(a,c,b){null==a&&(a="upload");if(null==c||""==c)c=' id=w_editor name=w_editor style="width:100%;height:100%;border:1px solid gray" ';null==b&&(b="");""!=b&&"&"!=b.substring(0,1)&&(b="&"+b);document.write("<iframe "+c+' src="'+$api._libaray_path+"/editor/?folder="+$api.fn.encodeURL(a)+b+"&files_web="+$api.fn.encodeURL(_editor_files_web)+"&system_owner_app="+$api.fn.encodeURL(_editor_getOwnerApp())+"&"+Math.random()+'"></iframe>')};