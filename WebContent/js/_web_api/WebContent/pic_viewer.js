var _PIC_VIEWER_ID=0,_PIC_VIEWER_SWF=$api._libaray_path+"/images/picviewer.swf";function PicViewer(a,b,c,d){this.id="_JS_PIC_VIEWER_"+_PIC_VIEWER_ID++;this.focusWidth=null==a?500:a;this.focusHeight=null==b?220:b;this.textHeight=null==c?18:c;this.bgColor=null==d?"#F0F0F0":d;this.splitChar="|";this.texts=this.links=this.pics="";this.addElement=_addPicElement;this.getHTML=_getHtmlOfPicViewer}
function _addPicElement(a,b,c){null==a&&(a="");null==b&&(b="");null==c&&(c="");""==a||""==b||""==c||(this.pics+=(""==this.pics?"":this.splitChar)+$api.fn.encodeURL(a),this.links+=(""==this.links?"":this.splitChar)+$api.fn.encodeURL(b),this.texts+=(""==this.texts?"":this.splitChar)+$api.fn.encodeURL(c))}
function _getHtmlOfPicViewer(){var a;a='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '+(' codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="'+this.focusWidth+'" height="'+(this.focusHeight+this.textHeight)+'">\n');a+='<param name="allowScriptAccess" value="sameDomain"><param name="movie" value="'+_PIC_VIEWER_SWF+'"><param name="quality" value="high"><param name="bgcolor" value="'+this.bgColor+'">\n';a=a+'<param name="menu" value="false"><param name=wmode value="opaque">\n'+
('<param name="FlashVars" value="pics='+this.pics+"&links="+this.links+"&texts="+this.texts+"&borderwidth="+this.focusWidth+"&borderheight="+this.focusHeight+"&textheight="+this.textHeight+'">\n');a+='<embed src="'+_PIC_VIEWER_SWF+'" wmode="opaque" FlashVars="pics='+this.pics+"&links="+this.links+"&texts="+this.texts+"&borderwidth="+this.focusWidth+"&borderheight="+this.focusHeight+"&textheight="+this.textHeight+'" menu="false" bgcolor="'+this.bgColor+'" quality="high" width="'+this.focusWidth+'" height="'+
this.focusHeight+'" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"/>\n';return a+"</object>\n"};