function API_Ajax(a){this.win_dom=a;this.beforeSend=this.request=null;this.doGet=_do_get;this.doPost=_do_post;this.error="";this.requestValid=!1;this.errorHandle=this.callBack=null;this.getData=_GetData;this.getStatus=_GetStatus;this.params=this.url=this.id="";this.script=null;this.attributes="";this._ajax_index=a.win.$wapper._ajax_objects.length;a.win.$wapper._ajax_objects[this._ajax_index]=this;this._getRequest=_getXMLHttpRequest}
function _getXMLHttpRequest(a,d){if(!this.requestValid){try{if(this.win_dom.win.XMLHttpRequest)this.request=new XMLHttpRequest,this.requestValid=!0;else if(this.win_dom.win.ActiveXObject)for(var b="MSXML2.XMLHttp.6.0,MSXML2.XMLHttp.5.0,MSXML2.XMLHttp.4.0,MSXML2.XMLHttp.3.0,MSXML2.XMLHttp,MSXML3.XMLHttp,Microsoft.XMLHttp".split(","),c=0;c<b.length;c++)try{this.request=new ActiveXObject(b[c]);this.requestValid=!0;break}catch(e){this.error="ActiveXObject create error! "}}catch(f){this.error="XMLHttpRequest create error! "}this.requestValid&&
(this.request.onreadystatechange=function(){$api.fn._processData(a.win.$wapper._ajax_objects[d])})}}function _GetData(){return this.request.responseText}function _GetStatus(){return this.request.status}
function _do_get(a,d){null==a&&(a="");if(""!=a&&(this._getRequest(this.win_dom,this._ajax_index,d),null!=this.request)){null!=d&&this.request.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset="+d);var b=this.win_dom.win.location.port;"80"==b&&(b="");0==a.toLowerCase().indexOf("http://")&&0!=a.toLowerCase().indexOf("http://"+this.win_dom.win.location.hostname+(""==b?"":":"+b))?a=$api._gap_+"/servlet/com.lemon.web.URLProxy?url="+$api.fn.encodeURL(a)+"&charset="+$api.fn.getQueryString(this.win_dom,
"charset","",a):0==a.toLowerCase().indexOf("/")?a="http://"+this.win_dom.win.location.hostname+(""==b?"":":"+b)+a:0!=a.toLowerCase().indexOf("http://")&&(a=$api.fn.getAbsolutePath(this.win_dom,a));a=$api.fn.setQueryString(this.win_dom,"r",Math.random(),a);this.request.open("GET",a,!0);this.url=a;(null==this.beforeSend||this.beforeSend)&&this.request.send(null)}}
function _do_post(a,d,b){null==a&&(a="form1");var c="string"==typeof a?this.win_dom.win.document.getElementById(a):a;if(null==c)return"";this._getRequest(this.win_dom,this._ajax_index,b);if(null!=this.request&&(null!=b&&this.request.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset="+b),b=c.action,c=this.win_dom.win.location.port,"80"==c&&(c=""),0==b.toLowerCase().indexOf("http://")&&0!=b.toLowerCase().indexOf("http://"+this.win_dom.win.location.hostname+(""==c?"":":"+c))?
b=$api._gap_+"/servlet/com.lemon.web.URLProxy?url="+$api.fn.encodeURL(b)+"&charset="+$api.fn.getQueryString(this.win_dom,"charset","",e):0==b.toLowerCase().indexOf("/")?b="http://"+this.win_dom.win.location.hostname+(""==c?"":":"+c)+b:0!=b.toLowerCase().indexOf("http://")&&(b=$api.fn.getAbsolutePath(this.win_dom,b)),b=$api.fn.setQueryString(this.win_dom,"r",Math.random(),b),this.request.open("POST",b,!0),this.request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;"),null==this.beforeSend||
this.beforeSend)){var e=$api.fn.getFormData(this.win_dom,a,d);this.url=e;this.request.send(e)}};
