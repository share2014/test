$api.lang._lang_included="\n";for(var _lang_uri_=window.location.href;-1!=_lang_uri_.indexOf("//");)_lang_uri_=_lang_uri_.replace(RegExp("//","gi"),"/");var _lang_pos_=_lang_uri_.indexOf("?");-1==_lang_pos_&&(_lang_pos_=_lang_uri_.indexOf("#"));-1!=_lang_pos_&&(_lang_uri_=_lang_uri_.substring(0,_lang_pos_));"/"==_lang_uri_.substring(_lang_uri_.length-1)&&(_lang_uri_+="index.htm");_lang_uri_=_lang_uri_.substring(_lang_uri_.indexOf("/",8)+1);
_lang_uri_=_lang_uri_.substring(_lang_uri_.indexOf("/")+1,_lang_uri_.lastIndexOf("."));null==$wapper._language_new_version&&(_lang_uri_=_lang_uri_.replace(/\//g,"_"));alert("_lang_uri_="+_lang_uri_);$wapper._lang_uri_=_lang_uri_;$wapper.api._includeLangBundle(_lang_uri_);
