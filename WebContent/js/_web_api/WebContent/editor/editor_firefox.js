setContentEditable=setContentEditableImpl;getEditorDOM=getEditorDOMImpl;getEditorWin=getEditorWinImpl;formatColorValue=formatColorValueImpl;getElementUnderCaret=getElementUnderCaretImpl;getSelectionType=getSelectionTypeImpl;getSelectionHTML=getSelectionHTMLImpl;pasteHTML=pasteHTMLImpl;attachEvent=attachEventImpl;formatContent=formatContentImpl;function getEditorDOMImpl(){return document.getElementById("DHTMLEditor").contentWindow.document}
function getEditorWinImpl(){return document.getElementById("DHTMLEditor").contentWindow}function setContentEditableImpl(){try{getEditorDOM().designMode="on",getEditorDOM().contentEditable=!0}catch(a){window.setTimeout("setContentEditableImpl()",250)}}function formatColorValueImpl(a){for(var b="#",a=a.substring(4,a.length-1),a=a.split(","),c=0;c<a.length;c++)var d="0"+parseInt(a[c]).toString(16),d=d.substring(d.length-2),b=b+d;return b}
function getElementUnderCaretImpl(){getEditorWin().focus();for(var a=getEditorWin().getSelection(),b=a.getRangeAt(0),c=b.commonAncestorContainer,d=null,e=b.startOffset;e<c.childNodes.length&&e<=b.endOffset;e++)if(-1!=";IMG;EMBED;INPUT;TEXTAREA;SELECT;TABLE;OBJECT;".indexOf(";"+c.childNodes[e].nodeName+";"))if(null==d)d=c.childNodes[e];else{d=null;break}"#text"==c.nodeName&&(c=c.parentNode);""==a.toString()&&null!=d&&(c=d);return c}
function getSelectionTypeImpl(){var a=getEditorWin().getSelection();return-1!=";IMG;EMBED;INPUT;TEXTAREA;SELECT;TABLE;OBJECT;".indexOf(";"+getElementUnderCaret().tagName+";")?"Control":0==a.toString().length?"None":"Text"}function getSelectionHTMLImpl(){for(var a=getEditorDOM().createElement("SPAN"),b=getEditorWin().getSelection(),c=0;c<b.rangeCount;c++){var d=b.getRangeAt(c).cloneContents();a.appendChild(d)}return a.innerHTML}function pasteHTMLImpl(a,b){execCmd("insertHTML",!1,a,b)}
function attachEventImpl(a,b,c){a.addEventListener(b,c,!0)}
function formatContentImpl(a){for(var b="",c=a.toUpperCase(),d=0,e=0,f=0,g=0,g=!0;;)if(d=c.indexOf("<IMG ",e),-1==d){b+=a.substring(e);break}else{b+=a.substring(e,d);e=c.indexOf(">",d);g=!0;f=c.indexOf('SRC="',d);-1==f&&(f=c.indexOf("SRC=",d),g=!1);if(-1==e||-1==f||f>e){b+=a.substring(d);break}g=a.indexOf(g?'"':" ",f+6);if(-1==g){b+=a.substring(d);break}b+=a.substring(d,f)+'src="'+$wapper.api.getAbsolutePath(a.substring(f+5,g))+'"'+a.substring(g+1,e)}return b};
