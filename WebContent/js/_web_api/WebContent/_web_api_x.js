/*
*Usage:loaded at web_api, should use function in $api
*/
var $api={
	version:"1.0",
	win:window,
	dom:window.document,
	_a_win_dom:new Array(),
	_gap_:null,
	_libaray_path:"/_web_api",
	_DEBUG_INFO:0,
	_DEBUG_WARN:1,
	_DEBUG_ERROR:2,
	_debug_level:null,
	setDebugLevel:function(nLevel) {
	    this._debug_level = nLevel;
	},
	info:function(sMsg){
		if(this._debug_level<=this._DEBUG_INFO) alert("============API Info MsgBox==============\n\n"+sMsg);
	},
	warn:function(sMsg){
		if(this._debug_level<=this._DEBUG_WARN) alert("============API Warn MsgBox==============\n\n"+sMsg);
	},
	error:function(sMsg){
		if(this._debug_level<=this._DEBUG_ERROR) alert("============API Error MsgBox==============\n\n"+sMsg);
	},
	lang:{		
		_language_new_version:2,
		grid:{
	        _wg_lang_please_select:"请选择@@OBJ_NAME！",
	        _wg_lang_please_select_one:"你只能选择 1 @@OBJ_UNIT@@OBJ_NAME！",
	        _wg_lang_please_select_del:"请选择你要删除的@@OBJ_NAME！",
	        _wg_lang_delete_confirm1:"删除选中的 @@OBJ_NAME @@OBJ_REMARK ？",
	        _wg_lang_delete_confirm2:"删除选中的@@OBJ_UNIT@@OBJ_NAME ？",
	        _wg_lang_after_delete:"删除成功！",
	        _wg_obj_name:"记录",
	        _wg_obj_unit:"条",

	        _pr_page_info:"<font style=\"font-size:9pt\">共@@RECORD_COUNT条记录，@@PAGE_SIZE条/页，第@@CURRENT_PAGE/@@PAGE_COUNT页</font>",
	        _wg_goto_page:"<font style=\"font-size:9pt\">跳转到页：</font>",
	        _wg_page_select:"-请选择-",
	        _pr_first_page:"首页",
	        _pr_last_page:"末页"
		},
		form:{
			_wf_after_action:"保存完成！",
			_wf_please_input:"请输入@@ELEMENT@@FORMAT！",
			_wf_please_select:"请选择@@ELEMENT@@FORMAT！",
			_wf_integer_input:"(必须输入整数)",
			_wf_number_input:"(必须输入数值)",
			_wf_input_error:"输入错误！",
			_wf_number_input2:"输入错误——请输入数字！"
		}
	},
	fn:{
		//setting
		_prefix_of_ip_exp:"@@IPEXP_",
        _a_ip_replace_exp:new Array(),
		_ip_replace_exp:"",
		_ip_list_flag:"0;1;2;3;4;5;6;7;8;9",
		_ip_list_flag_alias:"",
		bDistributedWebApp:true,
		sDefaultCharset:"UTF-8",
		sWebServerCharset:"UTF-8",
		sUploadFolderInEditor:null,
		aAppWebFlag:new Array(),
		aAppWeb:new Array(),
		sCurWeb:"",
		sLocalPortal:"",
		sSplitChar:";",
        //ajax
		_ajax_objects:new Array(),
		STATE_COMPLETED:4,
		STATUS_OK:200,
		_AJAX_LANGUAGE:"_ajax",
        //grid--form
		_grid_prefix:"div_grid_",
		_form_prefix:"div_form_",

		oRowSelection:new Array(),

		_wf_integer:"0",
		_wf_double:"0",
		_wf_string:"0",
		_wf_webform_version:2.2,
		
		ext_page_flag:new Array(),
		ext_page_data:new Array(),

		_IE:function() {return _IE();},
		_FireFox:function() {return _FireFox();},
		_ED:function(s){return _ED(s);},
		_ED2:function(s){return _ED2(s);},
		_ASC:function(s){return vbsASC(s);},
		_CHR:function(n){return vbsCHR(n);},
		_GAP:function(){
			var n1=_IO(_WLH(),"/",8);
			var n2=_IO(_WLH(),"/",n1+1);
			$api._gap_ = _SS(_WLH(),n1,n2);
		},		
		setExtData:function(sPageId,sPageData) {
			for(var i=0;i<this.ext_page_flag.length;i++) {
			    if(this.ext_page_flag[i]==sPageId) {
				     if(sPageData!="") this.ext_page_data[i]=sPageData;
					 return;
				}
			}
			this.ext_page_flag[this.ext_page_flag.length]=sPageId;
			this.ext_page_data[this.ext_page_data.length]=sPageData;

		},
		getExtData:function(sPageId) {
			for(var i=0;i<this.ext_page_flag.length;i++) {
			    if(this.ext_page_flag[i]==sPageId) {
					 return this.ext_page_data[i];
				}
			}
			return "";
		},
		//setting		
		addAppWeb:function(sAppId,sAppUrl){
			this.aAppWebFlag[this.aAppWebFlag.length] = sAppId;
            this.aAppWeb[this.aAppWeb.length] = sAppUrl;
		},
	    getAppWeb:function(sAppId) {
            for(var i=0;i<this.aAppWebFlag.length;i++) {
				if(this.aAppWebFlag[i].toLowerCase()==sAppId.toLowerCase()) {
				    return this.aAppWeb[i].split(this.sSplitChar);
				}
			}
			return null;
		},
		_isEqualsFlag:function(sFlag1,sFlag2){
			if((sFlag1=="INNER_IP"&&sFlag2=="NETBIOS")||(sFlag2=="INNER_IP"&&sFlag1=="NETBIOS")){
				return true;
			}
			if(sFlag1==sFlag2.replace("_IP","_DNS")||sFlag1==sFlag2.replace("_DNS","_IP")){
				return true;
			}
			return false;
		},
		setIPListFlag:function (sLocalFlag,sAlias){
			this._ip_list_flag=sLocalFlag.replace(/\,/g,";");
			this._ip_list_flag_alias=(sAlias==null?"":sAlias.replace(/\,/g,";"));
		},
		addIpExp:function(sIp,sExp){
			if(this._a_ip_replace_exp==null) return;
			var nIndex=this._a_ip_replace_exp.length;
			for(var i=0;i<this._a_ip_replace_exp.length;i+=2){
				if(sExp.toLowerCase()>this._a_ip_replace_exp[i+1].toLowerCase()){
					for(var j=this._a_ip_replace_exp.length+1;j>=i+1&&j>0;j=j-2){
						this._a_ip_replace_exp[j]=this._a_ip_replace_exp[j-2];
						this._a_ip_replace_exp[j-1]=this._a_ip_replace_exp[j-3];
					}
					nIndex=i;
					break;
				}
				else if(sExp.toLowerCase()==this._a_ip_replace_exp[i+1].toLowerCase()){
					this._a_ip_replace_exp[i]=sIp;
					return;
				}
			}
			this._a_ip_replace_exp[nIndex]=sIp;
			this._a_ip_replace_exp[nIndex+1]=sExp;
		},
		//lang
	    _language_getObjectName:function(sKey,sPrefix){
			//make abc_abc to [sPrefix]abcAbc
			var sRet=(sPrefix==null?"":sPrefix);
			var aSec=sKey.toLowerCase().split("_");
			for(var i=0;i<aSec.length;i++){
				if(sRet==""){
					sRet+=aSec[i];
				}
				else{
					sRet+=aSec[i].substring(0,1).toUpperCase()+(aSec[i].length>1?aSec[i].substring(1):"");
				}
			}
			return sRet;
		},
		trim:function(str){
			var i=-1;
			while(str.substring(++i,i+1)==" ");
			str=str.substring(i);
			i=str.length;
			while(str.substring(--i,i+1)==" ");
			str=str.substring(0,i+1);
			return str;
		},
		isValidate:function(str,sErrStr) {
			var sInValidate=sErrStr;
			if(sInValidate==null){
				sInValidate=" !@#$%^&*()+-={}[]<>:;'\",/\\?`~";
			}
			if(str==null) str="";
			for(var index=0;index<str.length;index++) {
				if(sInValidate.indexOf(str.substring(index,index+1))!=-1){
					return false;
				}
			}
			return true;
		},
		getBitLength:function(s){
			var nLen=0;
			for(var i=0;i<s.length;i++){
				if(s.charCodeAt(i)>128){
					nLen++;
				}
			}
			return s.length+nLen;
		},
		getTextFromHTML:function(sHTML){
			var nPosLT=0;
			var nPosGT=-1;
			var nPosQuot=0;
			var bInQuot=false;
			var sRet="";
			var sTagName="";
			var nPosSpace=0;
			var nScriptCount=0;

			while(nPosLT!=-1){
				nPosLT=sHTML.indexOf("<",nPosGT);
				if(nPosLT==-1){
					if(nScriptCount<=0){
						sRet+=sHTML.substring(nPosGT+1);
					}
					break;
				}
				if(nScriptCount<=0){
					sRet+=sHTML.substring(nPosGT+1,nPosLT);
				}
				nPosGT=nPosLT;
				nPosQuot=nPosLT;
				while(true){
					nPosGT=sHTML.indexOf(">",nPosGT+1);
					nPosQuot=sHTML.indexOf("\"",nPosQuot+1);
					bInQuot=false;
					while(nPosQuot<nPosGT&&nPosQuot!=-1){
						if(nPosQuot!=-1){
							bInQuot=!bInQuot;
						}
						nPosQuot=sHTML.indexOf("\"",nPosQuot+1);
					}
					if(!bInQuot){
						break;
					}
				}
				sTagName="";
				nPosSpace=sHTML.indexOf(" ",nPosLT);
				if(nPosSpace==-1||nPosSpace>=nPosGT){
					nPosSpace=nPosGT;
				}
				if(nPosSpace!=-1){
					sTagName=sHTML.substring(nPosLT+1,nPosSpace); 
					if(sTagName.toUpperCase()=="BR"){
						sRet+="\n";
					}
					if(sTagName.toUpperCase()=="SCRIPT"){
						nScriptCount++;
					}
					if(sTagName.toUpperCase()=="/SCRIPT"){
						nScriptCount--;
					}
				}
			}
			return this.htmlDecode(sRet);
		},

		htmlDecode:function(str){
			if(str==null){
			   return "";
			}
			str=str.replace(/&lt;/gi, "<");
			str=str.replace(/&gt;/gi, ">");
			str=str.replace(/&nbsp;/gi," ");
			str=str.replace(/&quot;/gi,"\"");
			str=str.replace(/&amp;/gi,"&");
			return str;
		},

		htmlEncode:function(str){//used in WebForm
			if(str==null){
			   return "";
			}
			str=str.replace(/&/gi,"&amp;");
			str=str.replace(/</gi, "&lt;");
			str=str.replace(/>/gi, "&gt;");
			str=str.replace(/ /gi,"&nbsp;");
			str=str.replace(/\"/gi,"&quot;");
			return str;
		},

		//获取innerText，主要解决Firefox浏览器获取出来的innerHTML默认加了回车在最后的问题
		getInnerText:function(obj){
			if(obj==null){
				return "";
			}
			if(_IE()){
				return obj.innerText;
			}
			else{
				var sHTML=obj.innerHTML;
				for(var i=sHTML.length;i>0;i--){
					var c=sHTML.charAt(i-1);
					if(c!=' '&&c!='\n'&&c!='\r'){
						return this.getTextFromHTML(sHTML.substring(0,i));
					}
				}
			}
			return "";
		},

		removeScriptTag:function(sHtml){
			if(sHtml==null) return "";
			var sTemp=sHtml.toUpperCase();
			var sRet="";
			var nPos1=0;
			var nPos2=0;
			var nPos3=0;
			var nPos4=0;
			while(true){
				nPos1=sTemp.indexOf("<SCRIPT ",nPos2);
				if(nPos1==-1){
					sRet+=sHtml.substring(nPos2);
					break;
				}
				else{
					sRet+=sHtml.substring(nPos2,nPos1);
					var nQuotIndex=0;
					while(true){
						nPos3=sTemp.indexOf("\"",nPos1);
						if(nPos3>0&&sTemp.substring(nPos3-1,nPos3)=="\\"){
							nPos1=nPos3+1;
							continue;
						}
						nPos4=sTemp.indexOf("<\/SCRIPT>",nPos1);
						if(nPos4==-1){
							return "";
						}
						if((nPos3>nPos4||nPos3==-1)&&(nQuotIndex%2==0)){
							nPos2=nPos4+9;
							break;
						}
						else{
							nQuotIndex++;
							nPos1=nPos3+1;
						}
					}
				}
			}
			return sRet;
		},

		getOuterHTML:function(oObject){
			if(_IE()){
				return oObject.outerHTML;
			}
			var sRet="<"+oObject.tagName;
			 for(var i=0;i<oObject.attributes.length;i++){
				if(oObject.attributes[i].specified){
					sRet+=" "+oObject.attributes[i].name+"=\""+oObject.attributes[i].value+"\"";
				}
				
			 }
			 sRet+=">";
			if(";AREA;BASE;BASEFONT;COL;FRAME;HR;IMG;BR;INPUT;ISINDEX;LINK;META;PARAM;".indexOf(";"+oObject.tagName+";")==-1){
				sRet+=this.getInnerHTML(oObject);
				sRet+="</"+oObject.tagName+">";
			}
			 return sRet;
		},
		getFileExtName:function(sPath){
			var pos=sPath.indexOf("?");
			var sFileName=sPath;
			if(pos!=-1){
				sFileName=sPath.substring(0,pos);
			}
			var nPosDot=sFileName.lastIndexOf(".");
			var nPosSep=sFileName.replace(/\\/g,"/").lastIndexOf("/");
			if(nPosDot<=0){
				return "";
			}
			if(nPosSep>nPosDot){
				return "";
			}
			return sFileName.substring(nPosDot+1);
		},

		getFileBaseName:function(sPath){
			var pos=sPath.indexOf("?");
			var sFileName=sPath;
			if(pos!=-1){
				sFileName=sPath.substring(0,pos);
			}
			var nPosDot=-1;
			var nPosSep=sFileName.replace(/\\/g,"/").lastIndexOf("/");
			if(nPosSep==-1){
				nPosSep=0;
			}
			for(var i=sPath.length;i>nPosSep;i--){
				if(sFileName.substring(i-1,i)=="."){
					nPosDot=i-1;
					break;
				}
			}
			if(nPosDot==-1){
				nPosDot=sFileName.length;
			}
			return sFileName.substring(nPosSep+1,nPosDot);
		},
		getFileName:function(sPath){
			var pos1=sPath.indexOf("?");
			var sFileName=sPath;
			var sQuery="";
			if(pos1!=-1){
				sFileName=sPath.substring(0,pos1);
				sQuery=sPath.substring(pos1);
			}
			else{
				pos1=sPath.length;
			}
			var pos2=sPath.replace(/\\/g,"/").lastIndexOf("/");
			if(pos2==-1){
				nPosSep=0;
			}
			return sPath.substring(pos2+1,pos1);
		},
		formatFileName:function(sFileName,delimiter){
			var sPre="";
			if(sFileName.toLowerCase().indexOf("http://")==0){
				sFileName=sFileName.replace(/:80\//g,"/");
			}
			var aProtocol="http://\nftp://\nfile://\nmailto:\nmms://\nrtsp://\nlmsp://".split("\n");
			for(var i=0;i<aProtocol.length;i++){
				if(sFileName.toLowerCase().substring(0,aProtocol[i].length)==aProtocol[i]){
					sPre=aProtocol[i];
					sFileName=sFileName.substring(aProtocol[i].length);
					break;
				}
			}
			if(delimiter!="/"&&delimiter!="\\"){
				delimiter="\\";
			}
			sFileName=sFileName.replace(new RegExp("/","g"),"\\");
			while(sFileName.indexOf("\\\\")!=-1){
				sFileName=sFileName.replace(/\\\\/g,"\\");
			}
			sFileName=sFileName.replace(/\\/g,delimiter);
			return sPre+sFileName;
		},
		toVariableName:function(sStr,sPre){
			var sRet=sPre;
			var s=sStr.toLowerCase().split("_");
			for(var i=0;i<s.length;i++){
				if(s[i].length==0){
					continue;
				}
				sRet+=s[i].substring(0,1).toUpperCase()+s[i].substring(1);
			}
			if((",Id,ClassName,Class,Style,Name,Width,Height,Text").toLowerCase().indexOf(sRet.toLowerCase())!=-1){
				sRet="_"+sRet;
			}
			return sRet;
		},
		encodeURL:function(sUrl,sCharset){
			if(sCharset==null){
				sCharset=this.sDefaultCharset;
			}
			if(sCharset.toUpperCase()=="UTF-8"){
				return this.encodeURLUTF8(sUrl);
			}
			else if(sCharset.toUpperCase()=="GBK"||sCharset.toUpperCase()=="GB2312"){
				return this.encodeURLGBK(sUrl);
			}
			return sUrl;
		},
		decodeURL:function(sUrl,sCharset){
			if(sCharset==null){
				sCharset=this.sDefaultCharset;
			}
			if(sCharset.toUpperCase()=="UTF-8"){
				return this.decodeURLUTF8(sUrl);
			}
			else if(sCharset.toUpperCase()=="GBK"||sCharset.toUpperCase()=="GB2312"){
				return this.decodeURLGBK(sUrl);
			}
			return sUrl;
		},
		encodeURLUTF8:function(sUrl){
			if(sUrl==null){
				return "";
			}
			sUrl=sUrl.toString();

			var sRet="";
			var sHex="";
			var nHex=0;
			
			for(var i=0;i<sUrl.length;i++){
				if(sUrl.charAt(i)==" "){
					sRet+="%20";
				}
				else if(sUrl.charCodeAt(i)>0&&sUrl.charCodeAt(i)<128){
					if((sUrl.charCodeAt(i)>=65&&sUrl.charCodeAt(i)<=90)||(sUrl.charCodeAt(i)>=97&&sUrl.charCodeAt(i)<=122)||(sUrl.charCodeAt(i)>=48&&sUrl.charCodeAt(i)<=57)){
						sRet+=sUrl.charAt(i);
					}
					else{
						sHex=sUrl.charCodeAt(i).toString(16);
						if(sHex.length==1){
							sHex="0"+sHex;
						}
						sRet+="%"+sHex;
					}
				}
				else if(sUrl.charCodeAt(i)>0&&sUrl.charCodeAt(i)<2048){
					nHex=(sUrl.charCodeAt(i)&0xfc0)/0x40+0xc0;
					sRet+="%"+nHex.toString(16);
					nHex=(sUrl.charCodeAt(i)&0x3f)+0x80;
					sRet+="%"+nHex.toString(16);
				}
				else if(sUrl.charCodeAt(i)>0&&sUrl.charCodeAt(i)<65536){
					nHex=(sUrl.charCodeAt(i)&0xf000)/0x1000+0xe0;
					sRet+="%"+nHex.toString(16);
					nHex=(sUrl.charCodeAt(i)&0xfc0)/0x40+0x80;
					sRet+="%"+nHex.toString(16);
					nHex=(sUrl.charCodeAt(i)&0x3f)+0x80;
					sRet+="%"+nHex.toString(16);
				}
				else{
					sRet+=sUrl.charAt(i);
				}
			}
			return sRet;
		},

		decodeURLUTF8:function(sUrl){
			if(sUrl==null){
				return "";
			}
			sUrl=sUrl.toString();
			var sRet="";

			var nAsc=0;
			var nHex=0;
			var sHex="";

			for(var i=0;i<sUrl.length;i++){
				if(sUrl.charAt(i)=="+"){
					sRet+=" ";
				}
				else if(sUrl.charAt(i)=="%"){
					sHex=sUrl.substring(i+1,i+3);
					nHex=parseInt(sHex,16);
					if(nHex<128){
						sRet+=String.fromCharCode(nHex);
						i+=2;
					}
					else if(nHex<0xe0){
						nAsc=(nHex-0xc0)*0x40;
						sHex=sUrl.substring(i+4,i+6);
						nHex=parseInt(sHex,16);
						nAsc+=(nHex-0x80);
						sRet+=String.fromCharCode(nAsc);
						i+=5;
					}
					else if(nHex<0xf0){
						nAsc=(nHex-0xe0)*0x1000;
						sHex=sUrl.substring(i+4,i+6);
						nHex=parseInt(sHex,16);
						nAsc+=(nHex-0x80)*0x40;
						sHex=sUrl.substring(i+7,i+9);
						nHex=parseInt(sHex,16);
						nAsc+=(nHex-0x80);
						sRet+=String.fromCharCode(nAsc);
						i+=8;
					}
				}
				else{
					sRet+=sUrl.charAt(i);
				}
			}
			return sRet;
		},
		encodeURLGBK:function(sUrl){
			if(sUrl==null){
				return "";
			}
			sUrl=sUrl.toString();
			if(this._IE()){
				return sUrl;
			}
			var sRet="";
			var sNum2,nHex2,nHex2,nHex3;
			for(var i=0;i<sUrl.length;i++){
				var n=sUrl.charCodeAt(i);
				if(n>=0&&n<128){
					if(n==32){
						sRet+="%20";
					}
					else if((n>=48&&n<=57)||(n>=65&&n<=90)||(n>=97&&n<=122)){
						sRet+=sUrl.charAt(i);
					}
					else{
						var sHex=n.toString(16);
						if(sHex.length==1){
							sHex="0"+sHex;
						}
						sRet+="%"+sHex;
					}
				}
				else if(n<2048){
					sRet+=sUrl.charAt(i);
				}
				else if(n<65536){		
					n=this._ASC(sUrl.charAt(i));
					if(n<0){
						n+=65536;
					}
					var sHex=n.toString(16);
					sRet+="%"+sHex.substring(0,2)+"%"+sHex.substring(2,4);
				}
			}
			return sRet;

		},
		decodeURLGBK:function(sUrl){
			if(sUrl==null){
				return "";
			}
			sUrl=sUrl.toString();
			if(this._IE()){
				return sUrl;
			}
			var sRet="";
			for(var i=0;i<sUrl.length;i++){
				var c=sUrl.charAt(i);
				if(c=='+'){
					sRet+=" ";
				}
				else if(c=='%'){
					var sHex=sUrl.substring(i+1,i+3);
					var n=parseInt(sHex,16);
					if(n>0&&n<128){
						sRet+=String.fromCharCode(n);
						i+=2;
					}
					else{
						var sHex1=sUrl.substring(i+1,i+3);
						var sHex2=sUrl.substring(i+4,i+6);
						var n=parseInt(sHex1+sHex2,16)-65536;
						sRet+=this._CHR(n);
						i+=5;
					}
				}
				else{
					sRet+=c;
				}
			}
			return sRet;
		},
		encodeURLPath:function(sPath,sCharset){
			if(sPath==null) {
				//this.warn("encodeURLPath>>"+sPath)
			    return "";
			}
			if(sCharset==null){
				sCharset=this.sDefaultCharset;
			}
			var sFileName=sPath;
			var sQuery="";
			var pos1=sPath.indexOf("?");
			var sRet="";
			if(pos1!=-1){
				sFileName=sPath.substring(0,pos1);
				sQuery=sPath.substring(pos1+1);
			}
			for(var i=0;i<sFileName.length;i++){
				var n=sFileName.charCodeAt(i);
				if(n<0||n>128||"+&=?,%".indexOf(sFileName.charAt(i))!=-1){
					sRet+=this.encodeURL(sFileName.substring(i,i+1),sCharset);
				}
				else{
					sRet+=sFileName.substring(i,i+1);
				}
			}
			if(sQuery!=""){
				sRet+="?"+sQuery;
			}
			return sRet;
		},
		//number
		isNumeric:function(str,bInt){
			var nDotCount=0;
			if(str==null||str=="") return false;
			str+="";
			for(var i=0;i<str.length;i++){
				if(str.charCodeAt(i)<48||str.charCodeAt(i)>57){
					if(str.charAt(i)=="."){
						nDotCount++;
						if(nDotCount<=1){
							continue;
						}
					}
					if(str.charAt(i)=="-"){
						if(i>0){
							return false;
						}
						continue;
					}
					return false;
				}
			}
			if(bInt){
				return (nDotCount==0);
			}
			else{
				return true;
			}
		},
		isInt:function(str){
			return this.isNumeric(str,true);
		},
		isFloat:function (sCheck) {
			if (sCheck==null||sCheck=="") {
				return false;
			}
			sCheck+="";
			if (sCheck.indexOf(".") != -1) {
				var dotPos = sCheck.indexOf(".");
				sCheck = sCheck.substring(0, dotPos) + sCheck.substring(dotPos + 1);
			}
			if (!this.isNumeric(sCheck)) return false;
			return true;
		},
		 isPercentStr:function(s){
			if(s==""||s==null||s=="%"){
				return false;
			}
			if(s.substring(s.length-1)!="%"){
				return false;
			}
			if(isNaN(s.substring(0,s.length-1))){
				return false;
			}
			return true;
		},
		//ajax
		
		_processData:function(oAjaxObj) {
			if(oAjaxObj.request==null) {
				return;
			}
			if(oAjaxObj.request.readyState==this.STATE_COMPLETED) {
				if(oAjaxObj.request.status==this.STATUS_OK) {
					if(oAjaxObj.callBack!=null) {
						oAjaxObj.callBack(oAjaxObj.win_dom,oAjaxObj);
					}
				}
				else {
					if(oAjaxObj.errorHandle!=null) {
						oAjaxObj.errorHandle(oAjaxObj.win_dom,oAjaxObj);
					}
				}
			}
		},
		convertorAjaxScript:function(oWinDom,sData) {
			var nPos1=-1;
			var nPos2=-1;
			var sRet="";
			var sTmp="";
			var pre_script="";
			while(sData.toLowerCase().indexOf("<script language=ajxscript>")!=-1) {
				nPos1 = sData.toLowerCase().indexOf("<script language=ajxscript>");
				sRet += sData.substring(0,nPos1);
				sData=sData.substring(nPos1+"<script language=ajxscript>".length);
				sScript = sData.substring(0,sData.toLowerCase().indexOf("<\/script>"));
				sData = sData.substring(sData.toLowerCase().indexOf("<\/script>")+"<\/script>".length);
				//alert(sScript.replace(/\$wapper\.fn/g,oWinDom.win.$wapper.win_remark.replace(/\"/g,"'")))'invoid run func in setTimeout
				sTmp = eval(sScript.replace(/\$wapper\.fn/g,oWinDom.win.$wapper.win_remark.replace(/\"/g,"'")));
				if(sTmp!=null) sRet+=sTmp;
			}
			sRet+=sData;
			return sRet;
		},
		formatAjaxData:function(s){
			s=s.replace(/\n/gi,"");
			s=s.replace(/\r/gi,"");
			return s;
		},
		//page
		writeAjaxPageAnchor:function(nCurrentPage,nPageCount,sPageKey){
			if(sPageKey==null||sPageKey==""){
				sPageKey="page";
			}
			var nStartIndex=nCurrentPage-nCurrentPage%10+1;
			if(nCurrentPage%10==0){
				nStartIndex-=10;
			}
			var sHtml="<nobr>";
			var nEndIndex=nStartIndex+10;
			if(nPageCount>1){
				sHtml+="<a href=\"javascript:$wapper.api.changeAjaxPageIndex(1,'"+sPageKey+"')\">"+$api.lang.grid._pr_first_page+"</a>&nbsp;<a href=\"javascript:$wapper.api.changeAjaxPageIndex("+nPageCount+",'"+sPageKey+"')\">"+$api.lang.grid._pr_last_page+"</a>&nbsp;";
			}
			if(nCurrentPage>10){
				sHtml+="<a href=\"javascript:$wapper.api.changeAjaxPageIndex("+(nCurrentPage-10)+",'"+sPageKey+"')\">&lt;&lt;</a>&nbsp;";
			}
			for(var i=nStartIndex;i<nEndIndex&&i<=nPageCount;i++){
				//此处是WebGrid的一个补丁
				if(nPageCount<=1){
					continue;
				}
				if(i==nCurrentPage){
					sHtml+=i+"&nbsp;";
				}
				else{
					sHtml+="<a href=\"javascript:$wapper.api.changeAjaxPageIndex("+i+",'"+sPageKey+"')\"><b>"+i+"</b></a>&nbsp;";
				}
			}
			if(nEndIndex<=nPageCount){
				sHtml+="<a href=\"javascript:$wapper.api.changeAjaxPageIndex("+((nCurrentPage+10<=nPageCount)?(nCurrentPage+10):nPageCount)+",'"+sPageKey+"')\">&gt;&gt;</a>";
			}
			sHtml+="</nobr>";
			return "<span id=spanPageAnchor_"+sPageKey+" style=\"display:"+(nPageCount>1?"":"none")+"\">"+sHtml+"</span>";
			
		},

		writeAjaxPageSelect:function(nCurrentPage,nPageCount,sPageKey){
			if(sPageKey==null||sPageKey==""){
				sPageKey="page";
			}
			var sHtml="";
			sHtml+="<nobr>"+$api.lang.grid._wg_goto_page+"<select id=selPageSelect onchange=$wapper.api.changeAjaxPageIndex(this.value,'"+sPageKey+"')>";
			if(nPageCount<=1){
				sHtml+="<option value=\"\">"+$api.lang.grid._wg_page_select;
			}
			else{
				for(var i=1;i<=nPageCount;i++){
					sHtml+="<option value=\""+i+"\" "+(i==nCurrentPage?"selected":"")+">&nbsp;"+i+"&nbsp;";
				}
			}
			sHtml+="</select></nobr>";
			return "<span id=spanPageSelect_"+sPageKey+">"+sHtml+"</span>";
		},

		writeAjaxPageTextBox:function(nCurrentPage,nPageCount,sPageKey){
			if(sPageKey==null||sPageKey==""){
				sPageKey="page";
			}
			var sHtml="";
			sHtml+="<nobr>"+$api.lang.grid._wg_goto_page;
			sHtml+="<input style=\"width:40px;text-align:center;\" value=\""+nCurrentPage+"\" onkeyup=\"if(event.keyCode==13){if(!isNaN(this.value)&&this.value!=''){$wapper.api.changeAjaxPageIndex(this.value,'"+sPageKey+"');}else{this.value='';}}\">";
			sHtml+="</nobr>";

			return "<span id=spanPageTextBox_"+sPageKey+">"+sHtml+"</span>";
		},
    	//csv
		csvToArray:function(sCSV,sQuot,sDelimiter,sLineDelimiter){
			var aCSV=new Array();
			var bInQuot=false;
			var c="";
			var sValue="";
			if(sQuot==null){
				sQuot="\"";
			}
			if(sDelimiter==null){
				sDelimiter=",";
			}
			if(sLineDelimiter==null){
				sLineDelimiter="\n";
			}
			//aCSV[aCSV.length]=new Array();
			var aRecord=new Array();
			for(var i=0;i<sCSV.length;i++){
				c=sCSV.substring(i,i+1);
				if(c==sQuot){
					bInQuot=!bInQuot;
				}
				if(!bInQuot&&(c==sDelimiter||c==sLineDelimiter||i==sCSV.length-1)){
					if(i==sCSV.length-1){
						if(c!=sDelimiter&&c!=sLineDelimiter){
							sValue+=c;
						}
					}
					//aCSV[aCSV.length-1];
					if(sValue.substring(0,1)==sQuot&&sValue.substring(sValue.length-1)==sQuot){
						sValue=sValue.substring(1,sValue.length-1);
					}
					sValue=sValue.replace(new RegExp(sQuot+sQuot,"gi"),sQuot);
					aRecord[aRecord.length]=sValue;
					sValue="";
					if(c==sDelimiter&&i==sCSV.length-1){
						aRecord[aRecord.length]=sValue;
					}
					if(c==sLineDelimiter||i==sCSV.length-1){
						if(aRecord.length>1||aRecord[0]!=""){
							aCSV[aCSV.length]=aRecord;
						}
						aRecord=new Array();
					}
				}
				else{
					sValue+=c;
				}
			}
			if(aCSV.length==0){
				aCSV[0]=new Array();
				aCSV[0][0]="";
			}
			return aCSV;
		},
		formatCSVData:function(sTxt) {
			if(sTxt.charCodeAt(sTxt.length-1)==13) {
				sTxt=sTxt.substring(0,sTxt.length-1);
			}
			return sTxt;
		},
		getTimeStr:function(s) {
			var h="";
			var m="";
			var sec="";
			if(s>3600) {
				h=parseInt(s/3600);
				s-=h*3600;
			}
			if(s>60) {
				m=parseInt(s/60);
				s-=m*60;
			}
			if(s>0) {
				sec=s;
			}
			return (h==""?"":h+"时")+(m==""?"":m+"分")+(sec==""?"":sec+"秒");
		},
		getActionURL:function(sServletURL,bNoHTML,sWebRoot){
			var pos=sServletURL.indexOf("?");
			var sHandler=sServletURL;
			var sParam="";
			if(pos!=-1){
				sHandler=sServletURL.substring(0,pos);
				sParam=sServletURL.substring(pos+1);
			}
			if(sWebRoot==null){
				sWebRoot=$api._gap_;
			}
			var sURL=sWebRoot+"/servlet/com.lemon.web.ActionServlet?handler="+this.encodeURL(sHandler)+"&"+sParam+"&_no_html="+(bNoHTML?1:0)+"&"+Math.random();
			return sURL;
		},
		//use wapper dom  should be redefined in $wapper.api
		include:function(oWinDom,sFiles,_include_files_) {
			var aFile=sFiles.split(",");
			for(var i=0;i<aFile.length;i++){
				if(aFile[i]==""){
					continue;
				}
				var sTmpName=aFile[i].toLowerCase();
				var sExt=sTmpName.substring(sTmpName.lastIndexOf(".")+1).toLowerCase();
				if(",js,vbs,css,jsp,".indexOf(","+sExt+",")==-1&&sTmpName.indexOf("?")==-1){
					aFile[i]+=".js";
				}
				
				if(_include_files_==null||_include_files_.indexOf(","+aFile[i]+",")!=-1){
					continue;
				}
				_include_files_+=aFile[i]+",";
				sExt=aFile[i].substring(aFile[i].lastIndexOf(".")+1).toLowerCase();
				if(aFile[i].substring(0,1)!="/"&&aFile[i].substring(0,2)!="./"&&aFile[i].substring(0,3)!="../"&&aFile[i].substring(0,7).toLowerCase()!="http://"){
					aFile[i]=$api._libaray_path+"/"+aFile[i];
				}
				
				if(sExt=="vbs"){
					oWinDom.win.document.write("\<\script language=vbscript src=\""+aFile[i]+"\">\<\/script>");
				}
				else if(sExt=="css"){
					oWinDom.win.document.write("<link rel=stylesheet href=\""+aFile[i]+"\">");
				}
				else{
					oWinDom.win.document.write("\<\script language=javascript src=\""+aFile[i]+"\">\<\/script>");
				}
			}
		},
		getWebURL:function(sWebAppId,sRemoteFlag,sDefault,sRelativeHost){	
	        if(typeof(sWebAppId)=="string") {
				var aWeb = this.getAppWeb(sWebAppId);
			}
			else {
				var aWeb = sWebAppId;
			}
			if(aWeb==null) return $api._gap_;
			if(!this.bDistributedWebApp){
				var sAppName=aWeb[0];
				var nPos=sAppName.lastIndexOf("/");
				if(nPos==sAppName.length-1){
					nPos=sAppName.lastIndexOf("/",nPos-1);
				}
				if(nPos==6){
					sAppName="";
				}
				else if(nPos!=-1){
					sAppName=sAppName.substring(nPos);
				}
				else{
					sAppName="";
				}
				return (aWeb[0].toLowerCase().indexOf("http://")==-1?"":"http://")+$api.win.location.host+sAppName;
			}
			var sFlag="";
			var aLocalFlag=this._ip_list_flag.split(";");
			var aFlagAlias=this._ip_list_flag_alias.split(";");
			var aRemoteFlag=null;
			var sHost=(sRelativeHost==null?$api.win.location.host:sRelativeHost);
			if(sRemoteFlag==null){
				sRemoteFlag=this._ip_list_flag;
			}
			else{
				for(var i=0;i<aFlagAlias.length&&(aFlagAlias.length%2)==0;i+=2){
					sRemoteFlag=sRemoteFlag.replace(aFlagAlias[i],aFlagAlias[i+1]);
				}
			}
			aRemoteFlag=sRemoteFlag.split(";");
			if(sHost.substring(sHost.length-3)==":80"){
				sHost=sHost.substring(0,sHost.length-3);
			}
			var aCurWeb = this.getAppWeb(this.sCurWeb);
			for(var i=0;i<aCurWeb.length&&i<aLocalFlag.length;i++){
				if(aCurWeb[i].indexOf(":80/")!=-1){
					aCurWeb[i]=aCurWeb[i].replace(/:80\//g,"/");
				}
				if(aCurWeb[i].toUpperCase().indexOf(("HTTP://"+sHost).toUpperCase())!=-1){
					sFlag=aLocalFlag[i];
					break;
				}
			}
			//alert("remoteflag=("+sRemoteFlag+") sFlag="+sFlag);
			if(sFlag==""){
				return (sDefault==null?aWeb[0]:sDefault);
			}
			
			for(var i=0;i<aRemoteFlag.length;i++){
				if(aRemoteFlag[i]==sFlag){
					return aWeb[i].replace(/:80\//g,"/");
				}
			}
			for(var i=0;i<aRemoteFlag.length;i++){
				if(this._isEqualsFlag(aRemoteFlag[i],sFlag)){
					return aWeb[i].replace(/:80\//g,"/");
				}
			}
			for(var i=0;i<aRemoteFlag.length;i++) {
				//匹配相同的，有可能flag设置的不同
			    if(aWeb[i].indexOf(sHost)!=-1) {
				    return aWeb[i].replace(/:80\//g,"/");
				}
			}
			return (sDefault==null?aWeb[0]:sDefault);
		},
		getSaveFormat:function(oWinDom,sExpression){
			//加一个Z是因为LOCALHOST需要最后判断
			this.addIpExp("http://"+oWinDom.win.location.host+$api._gap_,"_CURRENT_WEB");
			this.addIpExp("http://"+oWinDom.win.location.host,"_CURRENT_HOST");
			var aIPExp=this._a_ip_replace_exp;
			for(var i=0;i<aIPExp.length;i+=2){
				if(aIPExp[i]==""||aIPExp[i+1]==""){
					continue;
				}
				sExpression=sExpression.replace(new RegExp(aIPExp[i],"gi"),this._prefix_of_ip_exp+aIPExp[i+1]);
				
			}
			return sExpression;
		},
		getDisplayFormat:function(oWinDom,sExpression){
			//加一个Z是因为LOCALHOST需要最后判断
			this.addIpExp("http://"+oWinDom.win.location.host+$api._gap_,"_CURRENT_WEB");
			this.addIpExp("http://"+oWinDom.win.location.host,"_CURRENT_HOST");
			var aIPExp=this._a_ip_replace_exp;
			for(var i=0;i<aIPExp.length;i+=2){
				if(aIPExp[i]==""||aIPExp[i+1]=="") {
					continue;
				}
				sExpression=sExpression.replace(new RegExp(this._prefix_of_ip_exp+aIPExp[i+1],"gi"),aIPExp[i]);
			}
			return sExpression;
		},
		
		getQueryString:function(oWinDom,sKey,sDefault,sUrl){
			var oForm=oWinDom.win.document.getElementById("_form_url_params");
			if((sUrl==null||sUrl==oWinDom.win.location.href)&&oForm&&oForm.tagName=="FORM"){
				var oHidden=oForm.elements.namedItem(sKey);
				if(oHidden==null||oHidden.value==""){
					return sDefault;
				}
				return this.decodeURL(oHidden.value);
			}
			if(sUrl==null) sUrl=oWinDom.win.location.href; 
			var sTemp=sUrl.replace("?","&").toUpperCase();
			var pos1=sTemp.indexOf("&"+sKey.toUpperCase()+"=");
			if(pos1==-1) return sDefault;
			var pos2=sTemp.indexOf("&",pos1+sKey.length+2);
			if(pos2==-1){
				pos2=sTemp.indexOf("#",pos1+sKey.length+2);
				if(pos2==-1){
					pos2=sTemp.length;
				}
			}
			var sRet=sUrl.substring(pos1+sKey.length+2,pos2);
			if(sRet==""&&sKey=="returl") {
			    sRet = this.getExtData(this.getFileBaseName(oWinDom.win.location.href));
			}
			if(sRet=="") sRet=sDefault;
			return this.decodeURL(sRet);
		},
		setQueryString:function(oWinDom,sKey,sValue,sUrl,bNoRandomSeed,bNoAnchor){
			var oForm=oWinDom.win.document.getElementById("_form_url_params");
			if((sUrl==null||sUrl==oWinDom.win.location.href)&&oForm&&oForm.tagName=="FORM"){
				var oHidden=oForm.elements.namedItem(sKey);
				if(oHidden!=null){
					oHidden.value=this.encodeURL(sValue);
				}
				else{
					var oSPAN=oWinDom.win.document.createElement("SPAN");
					oSPAN.innerHTML="<INPUT type=hidden id="+sKey+" name="+sKey+" value=\""+this.encodeURL(sValue)+"\">";
					oForm.appendChild(oSPAN);
				}
				return oWinDom.win.location.href;
			}
			if(sUrl==null){
				sUrl=oWinDom.win.location.href;
			}
			var sAnchorName="";
			var pos=sUrl.indexOf("#");
			if(pos!=-1){
				sAnchorName=sUrl.substring(pos+1);
				sUrl=sUrl.substring(0,pos);
			}
			sKey=(sKey==null?"":sKey);
			var sRet="";
			var sTemp=sUrl.replace(/\?/g,"&");
			var aParam=sTemp.split("&");
			var bFound=false;
			sRet+=aParam[0]+"?";
			for(var i=1;i<aParam.length;i++){
				if(aParam[i].substring(0,sKey.length+1).toUpperCase()==(sKey+"=").toUpperCase()){
					if(sValue!=null){
						sRet+=(sRet.substring(sRet.length-1)=="?"?"":"&")+sKey+"="+this.encodeURL(sValue);
					}
					bFound=true;
				}
				else{
					if(aParam[i].indexOf("=")!=-1){
						sRet+=(sRet.substring(sRet.length-1)=="?"?"":"&")+aParam[i];
					}
				}
			}
			if(!bFound&&sKey!=""&&sValue!=null){
				sRet+=(sRet.substring(sRet.length-1)=="?"?"":"&")+sKey+"="+this.encodeURL(sValue);
			}
			if(!bNoRandomSeed){
				var sRandom=""+Math.random();
				sRandom=sRandom.substring(5,10);
				sRet+=(sRet.substring(sRet.length-1)=="?"?"":"&")+sRandom+(!bNoAnchor?(sAnchorName==""?"":"#"+sAnchorName):"");
			}
			return sRet;
		},	
			
		getURLHost:function(oWinDom,sUrl){
			if(sUrl==null){
				sUrl=oWinDom.win.location.href;
			}
			sUrl=this.formatFileName(sUrl.toString(),"/");
			var sRet=sUrl;
			var aProtocol="http://\nftp://\nfile://\nmailto:\nmms://\nrtsp://\nlmsp://".split("\n");
			for(var i=0;i<aProtocol.length;i++){
				if(sUrl.toLowerCase().indexOf(aProtocol[i])==0){
					sRet=sUrl.substring(aProtocol[i].length);
					break;
				}
			}
			var nPos=sRet.indexOf("/");
			if(nPos==-1){
				return sRet;
			}
			return sRet.substring(0,nPos);
		},
		getURLParams:function(oWinDom,sUrl){
			var oForm=oWinDom.win.document.getElementById("_form_url_params");
			if((sUrl==null||sUrl==oWinDom.win.location.href)&&oForm&&oForm.tagName=="FORM"){
				var sRet="";
				for(var i=0;i<oForm.elements.length;i++){
					sRet+=(sRet==""?"":"&")+oForm.elements[i].name+"="+oForm.elements[i].value;
				}
				return sRet;
			}
			if(sUrl==null){
				sUrl=oWinDom.win.location.href;
			}
			var pos1=sUrl.indexOf("?");
			if(pos1==-1){
				return "";
			}
			var pos2=sUrl.indexOf("#",pos1);
			if(pos2==-1){
				pos2=sUrl.length;
			}
			return sUrl.substring(pos1+1,pos2);
		},

		
		getURLPathName:function(oWinDom,sUrl){
			if(sUrl==null){
				sUrl=oWinDom.win.location.href;
			}
			var pos=sUrl.indexOf("?");
			if(pos==-1){
				return sUrl;
			}
			return sUrl.substring(0,pos);
		},

		getURLAnchorName:function(oWinDom,sUrl){
			if(sUrl==null){
				sUrl=oWinDom.win.location.href;
			}
			var pos=sUrl.indexOf("#");
			if(pos==-1){
				return "";
			}
			return sUrl.indexOf(pos+1);
		},
		//lang
		includeLangBundle:function(oWinDom,sBaseName,sWebApp,_lang_uri_,_lang_included){
			if(sBaseName==null) {
				sBaseName = _lang_uri_;
			}
			if(!sWebApp){
				sWebApp=$api._gap_;
			}
			if(oWinDom.win.location.href.indexOf($api._libaray_path+"/")==oWinDom.win.location.href.indexOf("/",8)){
				sWebApp=this.getQueryString(oWinDom,"system_owner_app","");
				sBaseName="_"+sBaseName;
			}
			var sUrl=sWebApp+"/servlet/com.lemon.web.LanguageServlet?base_name="+sBaseName;
			if(_lang_included.indexOf(sUrl+"\n")!=-1){
				return;
			}
			oWinDom.win.document.write("<\script language=javascript src=\""+sUrl+"&"+Math.random()+"\"><\/\script>");
		},
		_includeLangBundle:function(oWinDom,sBaseName,sWebApp,_lang_uri_,_lang_included){
			if(sBaseName==null) {
				sBaseName = _lang_uri_;
			}
			if(!sWebApp){
				sWebApp=$api._gap_;
			}
			if(oWinDom.win.location.href.indexOf($api._libaray_path+"/")==oWinDom.win.location.href.indexOf("/",8)){
				sWebApp=this.getQueryString(oWinDom,"system_owner_app","");
				sBaseName="_"+sBaseName;
			}
			var sUrl=sWebApp+"/servlet/com.lemon.web.LanguageServlet?base_name="+sBaseName;
			if(_lang_included.indexOf(sUrl+"\n")!=-1){
				return;
			}
			oWinDom.win.document.write("<\script language=javascript src=\""+sUrl+"&"+Math.random()+"\"><\/\script>");
		},
		doLanguageBinding:function(oWinDom,sKeys){
			var aKey=sKeys.split(",");
			for(var i=0;i<aKey.length;i++){
				var sCtrlName=this._language_getObjectName(aKey[i]);
				var oCtrls=oWinDom.win.document.getElementsByName(sCtrlName);
				if(oCtrls==null||oCtrls.length==0){
					var obj=oWinDom.win.document.getElementById(sCtrlName);
					if(obj){
						oCtrls=[obj];
					}
				}
				for(var j=0;oCtrls&&j<oCtrls.length;j++){
					var oCtrl=oCtrls[j];
					if(oCtrl.tagName!="INPUT"){
						oCtrl.innerHTML=eval(oWinDom.win.$wapper.win_remark.replace(/\"/g,"'")+"."+this._language_getObjectName(aKey[i],"s"));
					}
					else if(oCtrl.type.toUpperCase()=="BUTTON"){
						oCtrl.value=eval(oWinDom.win.$wapper.win_remark.replace(/\"/g,"'")+"."+this._language_getObjectName(aKey[i],"s"));
					}
				}
			}
		},
		//url
	    getParentPath:function(oWinDom,sPath,sDelimiter){
			if(sPath==null){
				sPath=oWinDom.win.location.href;
			}
			if(sDelimiter!="/"&&sDelimiter!="\\"){
				sDelimiter="/";
			}
			var pos=sPath.indexOf("?");
			var sFileName=sPath;
			if(pos!=-1){
				sFileName=sPath.substring(0,pos);
				if(sFileName.substring(sFileName.length-1)=="/"){
					return sFileName;
				}
			}
			sFileName=this.formatFileName(sFileName,sDelimiter);
			if(sFileName.substring(sFileName.length-1)==sDelimiter){
				sFileName=sFileName.substring(0,sFileName.length-1);
			}
			pos=sFileName.lastIndexOf(sDelimiter);
			sFileName=sFileName.substring(0,pos);
			return sFileName;
		},
    	getRelativePath:function(oWinDom,sFilePath,sCurrentPath){
			var sRet="";
			if(sCurrentPath==null){
				sCurrentPath=this.getParentPath(oWinDom);
			}
			sFilePath=this.formatFileName(sFilePath,"/");
			sCurrentPath=this.formatFileName(sCurrentPath+"/","/");
			var pos1=0;
			var pos2=0;
			var pos3=0;

			var aProtocol="http://\nftp://\nfile://\nmailto:\nmms://\nrstp://".split("\n");
			for(var i=0;i<aProtocol.length;i++){
				if(sCurrentPath.toLowerCase().substring(0,aProtocol[i].length)==aProtocol[i]){
					pos1=aProtocol[i].length;
					pos2=pos1+1;
				}
			}
			while(true){
				pos1=sCurrentPath.indexOf("/",pos2);
				if(sCurrentPath.substring(0,pos1+1)==sFilePath.substring(0,pos1+1)){
					pos3=pos1;
				}
				else{
					sRet+="../";
				}
				pos2=pos1+1;
				if(pos1==sCurrentPath.length-1){
					break;
				}
			}
			if(pos3==0){
				sRet=sFilePath;
			}
			else{
				sRet+=sFilePath.substring(pos3+1);
			}
			return sRet;
		},
		getAbsolutePath:function(oWinDom,sRelativePath,sCurrentFolder){
			sRelativePath=this.formatFileName(sRelativePath,"/");
			var aProtocol="/\nhttp://\nftp://\nfile://\nmailto:\nmms://\nrstp://".split("\n");
			for(var i=0;i<aProtocol.length;i++){
				if(sRelativePath.toLowerCase().substring(0,aProtocol[i].length)==aProtocol[i]){
					return sRelativePath;
				}
			}
			if(sCurrentFolder==null){
				sCurrentFolder=this.getParentPath(oWinDom);
			}
			sCurrentFolder=this.formatFileName(sCurrentFolder,"/");
			if(sCurrentFolder.substring(sCurrentFolder.length-1)!="/"){
				sCurrentFolder+="/";
			}
			var sRet=sCurrentFolder;
			var nPos1=0;
			var nPos2=0;
			while(nPos1<sRelativePath.length){
				nPos1=sRelativePath.indexOf("/",nPos2);
				if(nPos1==-1){
					nPos1=sRelativePath.length;
					sRet+="/"+sRelativePath.substring(nPos2);
					break;
				}
				var sFolderName=sRelativePath.substring(nPos2,nPos1);
				if(sFolderName==".."){
					sRet=this.getParentPath(oWinDom,sRet)+"/";
				}
				else if(sFolderName!="."&&sFolderName!=""){
					sRet+=sFolderName+"/"+sRelativePath.substring(nPos1);
					break;
				}
				nPos2=nPos1+1;
			}
			sRet=this.formatFileName(sRet,"/");
			return sRet;
		},
		formatRetURL:function(oWinDom,sNextUrl,sRetUrl){
			if(sRetUrl==null){
				sRetUrl=oWinDom.win.location.href;
			}
			if(sNextUrl.substring(0,1)=="/"){
				sNextUrl="http://"+oWinDom.win.location.host+sNextUrl;
			}
			sNextUrl=this.getAbsolutePath(oWinDom,sNextUrl,this.getParentPath(oWinDom));
			sRetUrl=this.getRelativePath(oWinDom,sRetUrl,this.getParentPath(oWinDom,sNextUrl));
			//去掉url后面的Math.random()，以便减少retrul参数的长度
			var nPos=sRetUrl.lastIndexOf("&");
			if(nPos==-1){
				nPos=sRetUrl.lastIndexOf("?");
			}
			if(nPos!=-1){
				var sParam=sRetUrl.substring(nPos+1);
				if(sParam.indexOf("=")==-1){
					sRetUrl=sRetUrl.substring(0,nPos);
				}
			}
			return sRetUrl;
		},
		getFormData:function(oWinDom,sFormName,sExtParams) {
			if(sExtParams==null) sExtParams="";
			if(typeof(sFormName)=="string") {
				var oForm = oWinDom.win.document.getElementById(sFormName); 
			}
			else {
				var oForm = sFormName;
			}
			if(oForm==null) return"";
			var sRetValue = "1.htm"+(sExtParams.length>0?"?":"")+sExtParams;
			for(var i=0;i<oForm.elements.length;i++) {
				var oCtrl = oForm.elements[i];
				if(oCtrl==null){
					continue;
				}
				if(oCtrl.name==""){
					continue;
				}
				var bAddParam=false;
				if(oCtrl.tagName=="INPUT"&&oCtrl.type.toUpperCase()=="CHECKBOX"||oCtrl.type.toUpperCase()=="RADIO"){
					if(oCtrl.checked){
						bAddParam=true;
					}
				}
				else{
					bAddParam=true;
				}
				if(bAddParam){
					sRetValue+=(sRetValue.indexOf("?")==-1?"?":"&")+oForm.elements[i].name+"="+this.encodeURL(oCtrl.value);
				}
			}
			return this.getURLParams(oWinDom,sRetValue);
		},
	    //ajax
		getAjaxContainer:function(oWinDom,id,sParam,sStyle) {
			if(sParam!=null) {
				this.getAjaxObjById(oWinDom,id).params=sParam;
			}
			var sTipLoading="正在加载数据，请稍等...";
			//language=======================================
			if(typeof(sApiAjaxTipLoading)=="string"){
				sTipLoading=sApiAjaxTipLoading;
			}
			return "<div id="+id+" name="+id+" style=\""+(sStyle==null?"width:100%;":sStyle)+"\"><font color=gray style=\"font-size:9pt\">&nbsp;&nbsp;"+sTipLoading+"</font></div>";
		},
		getAjaxData:function(oWinDom,oAjaxObject,sUrl,script,bAppend) {
			if(oWinDom.win.document.getElementById(oAjaxObject.id)) {
				if(oWinDom.win.document.getElementById(oAjaxObject.id+"_loading")) {
					oWinDom.win.document.getElementById(oAjaxObject.id+"_loading").style.display="";
				}
				oAjaxObject.script=script;
				oAjaxObject.callBack = this.fillAjaxData;
				oAjaxObject.errorHandle = this.errorTip;
				if(bAppend==null) bAppend=false;

				oAjaxObject.attributes=this.getURLParams(oWinDom,this.setQueryString(oWinDom,"append",(bAppend?"1":"0"),"1.htm?"+oAjaxObject.attributes));
				oAjaxObject.doGet(sUrl+(oAjaxObject.params!=""?(sUrl.indexOf("?")==-1?"?":"&")+oAjaxObject.params:""));
			}
		},

		errorTip:function(oWinDom,oAjaxObject) {
			if(oWinDom.win.document.getElementById(oAjaxObject.id)) {
				var sLoadingError="加载数据错误。(错误：{0})";
				//language=========================================
				if(typeof(sApiAjaxTipToadingError)=="string"){
					sLoadingError=sApiAjaxTipToadingError;
				}
				//oAjaxObject.request.status
				oWinDom.win.document.getElementById(oAjaxObject.id).innerHTML = "<font color=gray style=\"font-size:9pt\">&nbsp;&nbsp;"+sLoadingError.replace("{0}",oAjaxObject.request.status)+"</font>";
			}
		},
		fillAjaxData:function(oWinDom,oAjaxObj) {
			var sData = oAjaxObj.request.responseText;
			if(oWinDom.win.document.getElementById(oAjaxObj.id)) {
				if(oWinDom.win.document.getElementById(oAjaxObj.id+"_loading")) {
					oWinDom.win.document.getElementById(oAjaxObj.id+"_loading").style.display="none";
				}

				if($api.fn.getQueryString(oWinDom,"append","","?"+oAjaxObj.attributes)=="1") {
					oWinDom.win.document.getElementById(oAjaxObj.id).innerHTML += $api.fn.getDisplayFormat(oWinDom,$api.fn.convertorAjaxScript(oWinDom,sData));
					var nHeight = parseInt(oWinDom.win.document.getElementById(oAjaxObj.id).offsetHeight);
					if(nHeight<40) nHeight=40;
					if(oWinDom.win.document.getElementById(oAjaxObj.id+"_loading")) {
						oWinDom.win.document.getElementById(oAjaxObj.id+"_loading").style.height=nHeight;
					}
				}
				else {
				    oWinDom.win.document.getElementById(oAjaxObj.id).innerHTML = $api.fn.getDisplayFormat(oWinDom,$api.fn.convertorAjaxScript(oWinDom,sData));
					var nHeight = parseInt(oWinDom.win.document.getElementById(oAjaxObj.id).offsetHeight);
					if(nHeight<40) nHeight=40;
					oWinDom.win.document.getElementById(oAjaxObj.id).innerHTML="<div id=\""+oAjaxObj.id+"_loading\" style=\"display:none;position:absolute;background:url("+$api._libaray_path+"/images/blue_bg.png);z-index:9999;height:"+nHeight+";text-align:center;width:100%;padding-top:"+(nHeight/3)+"px\"><img src="+$api._libaray_path+"/images/loading.gif></div>"+oWinDom.win.document.getElementById(oAjaxObj.id).innerHTML;
				}
			}
			if(oAjaxObj.script!=null) {
				//alert(oAjaxObj.script.replace(/\$wapper\.fn/g,oWinDom.win.$wapper.win_remark.replace(/\"/g,"'")))
				eval(oAjaxObj.script.replace(/\$wapper\.fn/g,oWinDom.win.$wapper.win_remark.replace(/\"/g,"'")));
			}
		},

		getAjaxObjById:function(oWinDom,id,newParams) {
			var oAjaxObj = null;
			if(id==null)  {
				return new API_Ajax(oWinDom);
			}
			for(var i=0;i<oWinDom.win.$wapper._ajax_objects.length;i++) {
				if(oWinDom.win.$wapper._ajax_objects[i].id!=""&&oWinDom.win.$wapper._ajax_objects[i].id==id) {
					oAjaxObj = oWinDom.win.$wapper._ajax_objects[i];
					break;
				}
			}
			if(oAjaxObj==null) {
				oAjaxObj = new API_Ajax(oWinDom);
				oAjaxObj.id = id;
			}
			if(newParams!=null){
				oAjaxObj.params = newParams;
			}
			return oAjaxObj;
		},
		//nav
		doRefresh:function(oWinDom){
			var sUrl=this.getURLPathName(oWinDom)+"?"+this.getURLParams(oWinDom);
			this.gotoURL(oWinDom,sUrl);
		},

		getReturnURL:function(oWinDom,nUpLevel,sCurrentUrl){
			if(nUpLevel==null){
				nUpLevel=1;
			}
			var sUrl=sCurrentUrl;
			if(sUrl==null){
				sUrl=oWinDom.win.location.href;
			}
			var sRetURL="";
			for(var i=0;i<nUpLevel;i++){
				sRetURL=this.getQueryString(oWinDom,"returl","",sUrl);
				if(sRetURL==""){
					return "";
				}
				sRetURL=this.getAbsolutePath(oWinDom,sRetURL,this.getParentPath(oWinDom,sUrl));
				sUrl=sRetURL;

			}
			if(sUrl&&sUrl.toLowerCase().indexOf("http://")!=0&&sUrl.substring(0,1)!="/"){
				sUrl=this.getParentPath(oWinDom)+"/"+sUrl;
			}
			return this.setQueryString(oWinDom,null,null,(sUrl?sUrl:""));
		},

		checkReturnURL:function(oWinDom){
			var sRetUrl=this.getQueryString(oWinDom,"returl","");
			return (sRetUrl!="");
		},

		doReturn:function(oWinDom,nUpLevel,sDefaultPage){
			var sRetUrl=this.getReturnURL(oWinDom,nUpLevel);
			if(sRetUrl==null||sRetUrl==""){
				sRetUrl=sDefaultPage;
			}
			if(sRetUrl==null||sRetUrl==""){
				sRetUrl=$api._gap_;
			}
			this.gotoURL(oWinDom,sRetUrl);
		},
		getNextPage:function(oWinDom,sUrl,sRetUrl){
			var sNextURL=null;
			sNextURL=this.setQueryString(oWinDom,"returl",this.formatRetURL(oWinDom,sUrl,sRetUrl),sUrl,true);
			return this.setQueryString(oWinDom,null,null,sNextURL);
		},
		nextPage:function(oWinDom,sUrl,sRetUrl){
			this.gotoURL(oWinDom,this.getNextPage(oWinDom,sUrl,sRetUrl));
		},
		getIpExpURL:function(oWinDom,sUrlIn){
			var aIPExp=this._a_ip_replace_exp;
			var sIpExp="";
			for(var i=0;i<aIPExp.length;i+=2){
				sIpExp+=(i==0?"":"\n")+aIPExp[i]+"\n"+aIPExp[i+1];
			}
			sUrlIn=this.setQueryString(oWinDom,"ip_exp_prefix",this._prefix_of_ip_exp,sUrlIn);
			sUrlIn=this.setQueryString(oWinDom,"ip_replace_exp",sIpExp,sUrlIn);
			return sUrlIn;
		},
		gotoURL:function(oWinDom,sUrl){
			sUrl = this.getAbsolutePath(oWinDom,sUrl);
			if(sUrl.length<2048){
				oWinDom.win.location.href=sUrl;
				return;
			}
			var aParam=this.getURLParams(oWinDom,sUrl).split("&");
			var oForm=oWinDom.win.document.getElementById("_form_post_url");
			if(oForm==null){
				var oDIV=oWinDom.win.document.createElement("DIV");
				oDIV.innerHTML+="<form name=_form_post_url method=post style=\"display:none;\"></form>";
				if(oWinDom.win.document.body.childNodes.length==0){
					oWinDom.win.document.body.appendChild(oDIV);
				}
				else{
					oWinDom.win.document.body.insertBefore(oDIV,oWinDom.win.document.body.firstChild);
				}
				oForm=oWinDom.win.document.getElementById("_form_post_url");
			}
			var sFormHTML="";
			for(var i=0;i<aParam.length;i++){
				var nPos=aParam[i].indexOf("=");
				if(nPos==-1){
					continue;
				}
				var sKey=aParam[i].substring(0,nPos);
				var sValue=this.decodeURL(aParam[i].substring(nPos+1));
				sFormHTML+="<input name="+sKey+" value=\""+sValue.replace(/\"/g,"&quot;")+"\">";
			}
			oForm.innerHTML=sFormHTML;
			oForm.action=this.getURLPathName(oWinDom,sUrl);
			oForm.method="post";
			oForm.target=oWinDom.win.name;
			oForm.submit();
		},
		//grid
		getGrid:function(oWinDom,sGridName) {
			var oGrid = null;
			for(var i=0;i<oWinDom.win.$wapper._a_grid_index.length;i++) {
				if(oWinDom.win.$wapper._a_grid_index[i].sGridName==sGridName) {
				    oGrid = oWinDom.win.$wapper._a_grid_index[i];
					break;
				}
			}
			if(oGrid==null) {
				oGrid = new WebGrid(oWinDom);
				oGrid.sGridName = sGridName;
				oGrid.nGridIndex= oWinDom.win.$wapper._a_grid_index.length;
				oWinDom.win.$wapper._a_grid_index[oWinDom.win.$wapper._a_grid_index.length]=oGrid;
			}
			return oGrid;
		},
		getRowSelector:function(oWinDom,sGridName,bMultiSelect) {
			var oGrid = this.getGrid(oWinDom,sGridName);
			var oSelector = oGrid.getRowSelector();
			if(oSelector==null) {
			    oSelector = new RowSelector(oWinDom,oGrid.sGridId,bMultiSelect);
			}
			return oSelector;		    
		},
		//form
		getForm:function(oWinDom,sFrmName) {
			var oForm = null;
			for(var i=0;i<oWinDom.win.$wapper._a_web_form.length;i++) {
				if(oWinDom.win.$wapper._a_web_form[i].sFrmName==sFrmName) {
				    oForm = oWinDom.win.$wapper._a_web_form[i];
					break;
				}
			}
			if(oForm==null) {
				oForm = new WebForm(oWinDom);
				oForm.sFrmName = sFrmName;
				oForm._web_form_index= oWinDom.win.$wapper._a_web_form.length;
				oWinDom.win.$wapper._a_web_form[oWinDom.win.$wapper._a_web_form.length]=oForm;
			}
			return oForm;
		},
		//page
	    writePageInfo:function(oWinDom,nRecordCount,nPageSize,nCurrentPage,nPageCount,sPageKey){
			if(sPageKey==null||sPageKey==""){
				sPageKey="page";
			}
			if(nRecordCount<=0){
			//	return;
			}
			var sPageSizeKey="page_size"+(sPageKey=="page"?"":"_"+sPageKey);
			var sNewPageSize=this.getQueryString(oWinDom,sPageSizeKey);
			if(sNewPageSize!=null&&sNewPageSize!=""&&!isNaN(sNewPageSize)){
				nPageSize=parseInt(sNewPageSize);
			}
			var nStart=nPageSize*(nCurrentPage-1)+1;
			var nEnd=nPageSize*nCurrentPage;
			if(nEnd>nRecordCount){
				nEnd=nRecordCount;
			}
			var sRemark=$api.lang.grid._pr_page_info;
			sRemark=sRemark.replace("@@RECORD_COUNT",nRecordCount);
			if(nRecordCount>1){
				sRemark=sRemark.replace("@@PAGE_SIZE","<input id=txtPageSize_"+sPageKey+" value=\""+nPageSize+"\" style=\"width:25px;background:none;height:18px;border:none;border-bottom:1px solid black;text-align:center;\" onmouseover=\"this.focus();this.select();\" onkeyup=\"if(event.keyCode==13){if(!isNaN(this.value)&&this.value!=''&&parseInt(this.value)>0){$wapper.api.changePageSize(this.value,'"+sPageKey+"');}else{this.value='';}}\" maxlength=4>");
			}
			else{
				sRemark=sRemark.replace("@@PAGE_SIZE",nPageSize);
			}
			if(nPageCount>1){
				sRemark=sRemark.replace("@@CURRENT_PAGE","<input style=\"width:25px;background:none;height:18px;border:none;border-bottom:1px solid black;text-align:center;\" value=\""+nCurrentPage+"\" onmouseover=\"this.focus();this.select();\" onkeyup=\"if(event.keyCode==13){if(!isNaN(this.value)&&this.value!=''){$wapper.api.changePageIndex(this.value,'"+sPageKey+"');}else{this.value='';}}\">");
			}
			else {
				sRemark=sRemark.replace("@@CURRENT_PAGE",nCurrentPage);
			}
			sRemark=sRemark.replace("@@PAGE_COUNT",nPageCount);
			sRemark=sRemark.replace("@@START",nStart);
			sRemark=sRemark.replace("@@END",nEnd);

			if(oWinDom.win.document.getElementById("spanPageInfo_"+sPageKey)==null){
				oWinDom.win.document.write("<span id=spanPageInfo_"+sPageKey+">"+sRemark+"</span>");
			}
			else{
				oWinDom.win.document.getElementById("spanPageInfo_"+sPageKey).innerHTML=sRemark;
			}
			if(oWinDom.win.document.getElementById("spanPageInfo_"+sPageKey)){
				oWinDom.win.document.getElementById("spanPageInfo_"+sPageKey).style.display=(nPageCount>0?"":"none");
			}
		},
		writePageAnchor:function(oWinDom,nCurrentPage,nPageCount,sPageKey){
			if(sPageKey==null||sPageKey==""){
				sPageKey="page";
			}
			var nStartIndex=nCurrentPage-nCurrentPage%10+1;
			if(nCurrentPage%10==0){
				nStartIndex-=10;
			}
			var sHtml="<nobr>";
			var nEndIndex=nStartIndex+10;
			if(nPageCount>1){
				sHtml+="<a href=\"javascript:$wapper.api.changePageIndex(1,'"+sPageKey+"')\">"+$api.lang.grid._pr_first_page+"</a>&nbsp;<a href=\"javascript:$wapper.api.changePageIndex("+nPageCount+",'"+sPageKey+"')\">"+$api.lang.grid._pr_last_page+"</a>&nbsp;";
			}
			if(nCurrentPage>10){
				sHtml+="<a href=\"javascript:$wapper.api.changePageIndex("+(nCurrentPage-10)+",'"+sPageKey+"')\">&lt;&lt;</a>&nbsp;";
			}
			for(var i=nStartIndex;i<nEndIndex&&i<=nPageCount;i++){
				//此处是WebGrid的一个补丁
				if(oWinDom.win.document.getElementById("spanGotoPage_"+sPageKey)&&nPageCount<=1){
					continue;
				}
				if(i==nCurrentPage){
					sHtml+=i+"&nbsp;";
				}
				else{
					sHtml+="<a href=\"javascript:$wapper.api.changePageIndex("+i+",'"+sPageKey+"')\"><b>"+i+"</b></a>&nbsp;";
				}
			}
			if(nEndIndex<=nPageCount){
				sHtml+="<a href=\"javascript:$wapper.api.changePageIndex("+((nCurrentPage+10<=nPageCount)?(nCurrentPage+10):nPageCount)+",'"+sPageKey+"')\">&gt;&gt;</a>";
			}
			sHtml+="</nobr>";

			if(oWinDom.win.document.getElementById("spanPageAnchor_"+sPageKey)==null){
				oWinDom.win.document.write("<span id=spanPageAnchor_"+sPageKey+">"+sHtml+"</span>");
			}
			else{
				oWinDom.win.document.getElementById("spanPageAnchor_"+sPageKey).innerHTML=sHtml;
			}
			if(oWinDom.win.document.getElementById("spanGotoPage_"+sPageKey)){
				oWinDom.win.document.getElementById("spanGotoPage_"+sPageKey).style.display=(nPageCount>1?"":"none");
			}
		},
		writePageSelect:function(oWinDom,nCurrentPage,nPageCount,sPageKey){
			if(sPageKey==null||sPageKey==""){
				sPageKey="page";
			}
			var sHtml="";
			sHtml+="<nobr>"+$api.lang.grid._wg_goto_page+"<select id=selPageSelect onchange=$wapper.api.changePageIndex(this.value,'"+sPageKey+"')>";
			if(nPageCount<=1){
				sHtml+="<option value=\"\">"+$api.lang.grid._wg_page_select;
			}
			else{
				for(var i=1;i<=nPageCount;i++){
					sHtml+="<option value=\""+i+"\" "+(i==nCurrentPage?"selected":"")+">&nbsp;"+i+"&nbsp;";
				}
			}
			sHtml+="</select></nobr>";

			if(oWinDom.win.document.getElementById("spanPageSelect_"+sPageKey)==null){
				oWinDom.win.document.write("<span id=spanPageSelect_"+sPageKey+">"+sHtml+"</span>");
			}
			else{
				oWinDom.win.document.getElementById("spanPageSelect_"+sPageKey).innerHTML=sHtml;
			}

		},
		writePageTextBox:function(oWinDom,nCurrentPage,nPageCount,sPageKey){
			if(sPageKey==null||sPageKey==""){
				sPageKey="page";
			}
			var sHtml="";
			sHtml+="<nobr>"+$api.lang.grid._wg_goto_page;
			sHtml+="<input style=\"width:40px;text-align:center;\" value=\""+nCurrentPage+"\" onkeyup=\"if(event.keyCode==13){if(!isNaN(this.value)&&this.value!=''){$wapper.api.changePageIndex(this.value,'"+sPageKey+"');}else{this.value='';}}\">";
			sHtml+="</nobr>";

			if(oWinDom.win.document.getElementById("spanPageTextBox_"+sPageKey)==null){
				oWinDom.win.document.write("<span id=spanPageTextBox_"+sPageKey+">"+sHtml+"</span>");
			}
			else{
				oWinDom.win.document.getElementById("spanPageTextBox_"+sPageKey).innerHTML=sHtml;
			}
		},
		getGridByPageKey:function(oWinDom,sPageKey){
			var oGrid=null;
			if(sPageKey!=null&&typeof(sPageKey)=="object"){
				oGrid=sPageKey;
				sPageKey=oGrid.ajax_grid;
			}
			if(oGrid==null) {
				oGrid=this.getGrid(oWinDom,sPageKey=="page"?"webGrid":this.toVariableName(sPageKey.replace("page_",""),"grd"));
				oGrid.ajax_grid=sPageKey;
			}
			return oGrid;
		},
		changePageIndex:function(oWinDom,nNewIndex,sPageKey){
			if(sPageKey==null||sPageKey==""){
				sPageKey="page";
			}

			var oGrid = this.getGridByPageKey(oWinDom,sPageKey);

			if(typeof(oGrid.beforeChangePageIndex)=="function"){
				if(!oGrid.beforeChangePageIndex(nNewIndex,sPageKey)){
					return;
				}
			}
			var sUrl=this.setQueryString(oWinDom,sPageKey,(nNewIndex==null?"1":nNewIndex));
			if(sUrl.indexOf("#")!=-1) {
				sUrl = sUrl.substring(0,sUrl.indexOf("#"));
			}
			this._pr_change_window_location(oWinDom,sUrl);
		},
		changePageSize:function(oWinDom,nNewSize,sPageKey){
			if(sPageKey==null||sPageKey==""){
				sPageKey="page";
			}
			var oGrid = this.getGridByPageKey(oWinDom,sPageKey);
			if(typeof(oGrid.beforeChangePageSize)=="function"){
				if(!oGrid.beforeChangePageSize(nNewSize,sPageKey)){
					return;
				}
			}
			var sPageSizeKey="page_size"+(sPageKey=="page"?"":"_"+sPageKey);
			var sUrl=this.setQueryString(oWinDom,sPageSizeKey,nNewSize);
			this._pr_change_window_location(oWinDom,sUrl);
		},
		//For Ajax
		writeAjaxPageInfo:function(oWinDom,nRecordCount,nPageSize,nCurrentPage,nPageCount,sPageKey){
			if(sPageKey==null||sPageKey==""){
				sPageKey="page";
			}
			if(nRecordCount<=0){
			//	return;
			}
			var sPageSizeKey="page_size"+(sPageKey=="page"?"":"_"+sPageKey);
			var sNewPageSize=this.getQueryString(oWinDom,sPageSizeKey);
			if(sNewPageSize!=null&&sNewPageSize!=""&&!isNaN(sNewPageSize)){
				nPageSize=parseInt(sNewPageSize);
			}
			var nStart=nPageSize*(nCurrentPage-1)+1;
			var nEnd=nPageSize*nCurrentPage;
			if(nEnd>nRecordCount){
				nEnd=nRecordCount;
			}
			var sRemark=$api.lang.grid._pr_page_info;
			sRemark=sRemark.replace("@@RECORD_COUNT",nRecordCount);
			if(nRecordCount>1){
				sRemark=sRemark.replace("@@PAGE_SIZE","<input id=txtPageSize_"+sPageKey+" value=\""+nPageSize+"\" style=\"width:25px;background:none;height:18px;border:none;border-bottom:1px solid black;text-align:center;\" onmouseover=\"this.focus();this.select();\" onkeyup=\"if(event.keyCode==13){if(!isNaN(this.value)&&this.value!=''&&parseInt(this.value)>0){$wapper.api.changeAjaxPageSize(this.value,'"+sPageKey+"');}else{this.value='';}}\" maxlength=4>");
			}
			else{
				sRemark=sRemark.replace("@@PAGE_SIZE",nPageSize);
			}
			if(nPageCount>1){
				sRemark=sRemark.replace("@@CURRENT_PAGE","<input style=\"width:25px;background:none;height:18px;border:none;border-bottom:1px solid black;text-align:center;\" value=\""+nCurrentPage+"\" onmouseover=\"this.focus();this.select();\" onkeyup=\"if(event.keyCode==13){if(!isNaN(this.value)&&this.value!=''){$wapper.api.changeAjaxPageIndex(this.value,'"+sPageKey+"');}else{this.value='';}}\">");
			}
			else {
				sRemark=sRemark.replace("@@CURRENT_PAGE",nCurrentPage);
			}
			sRemark=sRemark.replace("@@PAGE_COUNT",nPageCount);
			sRemark=sRemark.replace("@@START",nStart);
			sRemark=sRemark.replace("@@END",nEnd);
			return "<span id=spanPageInfo_"+sPageKey+" style=\"display:"+(nPageCount>0?"":"none")+"\">"+sRemark+"</span>";
		},
		changeAjaxPageIndex:function(oWinDom,nNewIndex,sPageKey,sUrl){
			var oGrid = this.getGridByPageKey(oWinDom,sPageKey);
			if(oGrid==null) return;
			sPageKey=oGrid.ajax_grid;
		    if(sUrl!=null) {
				this.getAjaxObjById(oWinDom,"div_grid_"+sPageKey).url=sUrl;
			}
			else {
				sUrl=this.getAjaxObjById(oWinDom,"div_grid_"+sPageKey).url;
			}
			oGrid.saveRowSelection();
			this.getAjaxData(oWinDom,this.getAjaxObjById(oWinDom,"div_grid_"+sPageKey),(nNewIndex==null?sUrl:this.setQueryString(oWinDom,sPageKey,nNewIndex,sUrl)),"$wapper.fn.$wapper.afterAjaxLoad('"+sPageKey+"');try{$wapper.fn."+(sPageKey=="page"?"webGrid":this.toVariableName(sPageKey.replace("page_",""),"grd"))+".loadRowSelection();}catch(e){alert(e)}");
		},
		changeAjaxPageSize:function (oWinDom,nNewIndex,sPageKey,sUrl){
			var oGrid = this.getGridByPageKey(oWinDom,sPageKey);
			if(oGrid==null) return;
			sPageKey=oGrid.ajax_grid;
			if(sUrl!=null) {
				this.getAjaxObjById(oWinDom,"div_grid_"+sPageKey).url=sUrl;
			}
			else {
				sUrl=this.getAjaxObjById(oWinDom,"div_grid_"+sPageKey).url;
			}
			oGrid.saveRowSelection();
			this.getAjaxData(oWinDom,this.getAjaxObjById(oWinDom,"div_grid_"+sPageKey),this.setQueryString(oWinDom,"page_size"+(sPageKey=="page"?"":"_"+sPageKey),nNewIndex,sUrl),"$wapper.fn.$wapper.afterAjaxLoad('"+sPageKey+"');try{$wapper.fn."+(sPageKey=="page"?"webGrid":this.toVariableName(sPageKey.replace("page_",""),"grd"))+".loadRowSelection();}catch(e){alert(e)}");
		},
		_pr_change_window_location:function(oWinDom,sUrl){
			var oForm=oWinDom.win.document.getElementById("_form_url_params");
			if(oForm){
				for(var i=0;i<oForm.elements.length;i++){
					oForm.elements[i].value=this.decodeURL(oForm.elements[i].value);
				}
				oForm.submit();
			}
			else{
				oWinDom.win.location.href=sUrl;
			}
		},
		writeHtml:function(oWinDom,sHtml) {
			oWinDom.win.document.write(sHtml);
		},
		//time
		realTime:function(oWinDom,index) {
			var d=new Date();
			var dayDes=new Array("天","一","二","三","四","五","六");
			var t=oWinDom.win.document.getElementById("timerbar_"+index);
			if(t) {
			 t.innerHTML = ""+d.getFullYear()+"-"+(((d.getMonth()+1)+"").length==2?(d.getMonth()+1):"0"+(d.getMonth()+1))+"-"+((d.getDate()+"").length==2?d.getDate():"0"+d.getDate())+" "+((d.getHours()+"").length==2?d.getHours():"0"+d.getHours())+":"+((d.getMinutes()+"").length==2?d.getMinutes():"0"+d.getMinutes())+":"+((d.getSeconds()+"").length==2?d.getSeconds():"0"+d.getSeconds())+" 星期"+dayDes[d.getDay()]+"";
			}
			$api.win.setTimeout("$wapper.api.realTime("+index+");",1000);
		},
		timer_begin:function(oWinDom,index) {
			if(index==null)	index=0;
			oWinDom.win.document.write("<span id=timerbar_"+index+"></span>");
			this.realTime(oWinDom,index);
		},
		writeTime:function(oWinDom) {
			var d=new Date();
			var dayDes=new Array("天","一","二","三","四","五","六");
			oWinDom.win.document.write(""+d.getYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" 星期"+dayDes[d.getDay()]+"");
		},		 
		second_timer_begin:function(oWinDom,index,bAutoStart) {
			if(index==null)
				index=0;
			oWinDom.win.document.write("<span id=sec_timer_show_"+index+"></span><span id=sec_timer_"+index+" style=display:none></span>");
			if(bAutoStart) {
				this.secTime(oWinDom,index);
			}
		},
		secTime:function(oWinDom,index) {
			var d=new Date();
			var t=oWinDom.win.document.getElementById("sec_timer_"+index);
			var t2=oWinDom.win.document.getElementById("sec_timer_show_"+index);
			if(t&&t2) {
				var pre_time=t.innerHTML;
				if(pre_time==null||isNaN(parseInt(pre_time))) {
					pre_time=0;
				}
				t.innerHTML = parseInt(pre_time)+1;
				t2.innerHTML=this.getTimeStr(parseInt(pre_time)+1);
			}
			$api.win.setTimeout("$wapper.api.secTime("+index+");",1000);
		},
		//cookie
		getCookie:function(sCookieName){
			if($api.dom.cookie==null){
				$api.dom.cookie="";
			}
			var aCookie=$api.dom.cookie.split(";");
			var nPos=-1;
			for(var i=0;i<aCookie.length;i++){
				nPos=aCookie[i].indexOf("=");
				if(nPos==-1){
					continue;
				}
				var sTempKey=this.trim(aCookie[i].substring(0,nPos));
				var sTempValue=this.decodeURL(aCookie[i].substring(nPos+1));
				if(sTempKey.toUpperCase()==sCookieName.toUpperCase()||sTempKey.toUpperCase()==this.encodeURL(sCookieName).toUpperCase()){
					return sTempValue;
				}
			}
			return null;
		},
        addCookie:function(sCookieName,sCookieValue){
			if($api.dom.cookie==null){
				$api.dom.cookie="";
			}
			var sNewCookie="";
			var bFound=false;
			var aCookie=$api.dom.cookie.split(";");
			var nPos=-1;
			for(var i=0;i<aCookie.length;i++){
				nPos=aCookie[i].indexOf("=");
				if(nPos==-1){
					continue;
				}
				if(sNewCookie!=""){
					sNewCookie+="; ";
				}
				var sTempKey=this.trim(aCookie[i].substring(0,nPos));
				var sTempValue=aCookie[i].substring(nPos+1);
				if(sTempKey.toUpperCase()==sCookieName.toUpperCase()||sTempKey.toUpperCase()==this.encodeURL(sCookieName).toUpperCase()){
					sNewCookie+=sTempKey+"="+this.encodeURL(sCookieValue);
					bFound=true;
				}
				else{
					sNewCookie+=sTempKey+"="+sTempValue;
				}
			}
			if(!bFound){
				sNewCookie+=(sNewCookie==""?"":"; ")+this.encodeURL(sCookieName)+"="+this.encodeURL(sCookieValue);
			}
			$api.dom.cookie=sNewCookie;
		},
		//table
		setPrintable:function(oTbl){
			var sColor="";
			if(oTbl.cellSpacing==0){
				sColor=oTbl.borderColor;
			}
			else{
				sColor=oTbl.style.backgroundColor;
			}
			if(sColor==""){
				sColor="black";
			}
			oTbl.style.borderLeft="solid "+sColor+" 1px";
			oTbl.style.borderTop="solid "+sColor+" 1px";
			for(var i=0;i<oTbl.rows.length;i++){
				for(var j=0;j<oTbl.rows[i].cells.length;j++){
					oTbl.rows[i].cells[j].style.borderRight="solid "+sColor+" 1px";
					oTbl.rows[i].cells[j].style.borderBottom="solid "+sColor+" 1px";
					if(oTbl.rows[i].cells[j].innerHTML==""){
						oTbl.rows[i].cells[j].innerHTML="&nbsp;";
					}
				}
			}
			oTbl.cellSpacing=0;
		},
		mergeCell:function(oTbl,nCol,nStartRow,nEndRow){
			if(nStartRow==null){
				nStartRow=0;
			}
			if(nEndRow==null){
				nEndRow=oTbl.rows.length-1;
			}
			for(var i=nStartRow;i<nEndRow;i++){
				for(var j=i+1;j<=nEndRow;j++){
					var bNotEquals=this.getInnerText(oTbl.rows[j].cells[nCol])!=this.getInnerText(oTbl.rows[i].cells[nCol]);
					if(bNotEquals||(!bNotEquals&&j==nEndRow)){
						oTbl.rows[i].cells[nCol].rowSpan=(j-i+(bNotEquals?0:1));
						for(var k=i+1;k<(bNotEquals?j:(j+1));k++){
							oTbl.rows[k].deleteCell(nCol);
							//oTbl.rows[i].cells[nCol].style.display="none";
						}
						i=j-1;
						break;
					}
				}
			}
		},
		mergeCol:function(oTbl,nRow,nStartCol,nEndCol) {
			if(nStartCol==null){
				nStartCol=0;
			}
			if(nEndCol==null){
				nEndCol=oTbl.cols.length-1;
			}
			oTbl.rows[nRow].cells[nStartCol].colSpan=(nEndCol-nStartCol+1);
			for(var i=nStartCol+1;i<=nEndCol;i++){
				oTbl.rows[nRow].deleteCell(nStartCol+1);
			}
		},
		//禁止表格的所有单元格换行
		setNoBR:function(oTbl){
			for(var i=0;i<oTbl.rows.length;i++){
				for(var j=0;j<oTbl.rows[i].cells.length;j++){
					oTbl.rows[i].cells(j).innerHTML="<nobr>"+oTbl.cells(i).innerHTML+"</nobr>";
				}
			}
		},
		//将表格中的所有数据以CSV的格式输出
		getCSVData:function(oTbl){
			var sCSV="";
			var sCell="";
			for(var i=0;i<oTbl.rows.length;i++){
				if(i>0){
					sCSV+="\n";
				}
				for(var j=0;j<oTbl.rows[i].cells.length;j++){
					sCell=this.trim(this.getInnerText(oTbl.rows[i].cells[j]));
					sCell=sCell.replace(/\"/g,"\"\"");
					if(sCell.indexOf("\"")!=-1||sCell.indexOf(",")!=-1||sCell.indexOf("\n")!=-1||sCell.indexOf("\r")!=-1){
						sCell="\""+sCell+"\"";
					}
					sCSV+=(j==0?"":",")+sCell;
				}
			}
			return sCSV;
		}
	}

};
//init
$api.setDebugLevel($api._DEBUG_ERROE);
$api.fn._GAP();

function _IE(){return $api.win.navigator.appVersion.indexOf("MSIE")!=-1;}
function _FireFox(){return $api.win.navigator.userAgent.toLowerCase().indexOf("firefox")!=-1;}

function _RP(s,s1,s2){return s.replace(s1,s2);}
function _IO(s1,s2,n){return s1.indexOf(s2,n);}
function _SS(s,n1,n2){return s.substring(n1,n2);}
function _WLH(){return $api.win.location.href;}
function _DW(s){$api.dom.write(s);}
function _WS(s){_DW("\<\script language=javascript>");_DW(s);_DW("\<\/script>");}
function _WS2(s){_DW("\<\script language=javascript src=\""+s+(s.indexOf(".js")==-1&&s.indexOf(".jsp")==-1?".js":"")+"\">\<\/script>");}
function _CCA(s,n1,n2){return s.charCodeAt(n1,n2);}
function _FCC(n){return String.fromCharCode(n);}
function _FCCS(n){var s="";while(n>0){s=_FCC(n%100)+s;n=(n-(n%100))/100;}return s;}
_WS("function "+_FCCS(956968)+"(s){\nif(s==null){return \"\";}\nvar sRet=\"\";\nfor(var i=0;i<s.length;i++){\nvar n="+_FCCS(95676765)+"(s,i,i+1);\nif(n<32||n>126){\nsRet+="+_FCCS(958383)+"(s,i,i+1);\n}\nelse{\nn=158-n;\nsRet+="+_FCCS(95706767)+"(n);\n}\n}\nreturn sRet;\n}\n");
_WS("function "+_FCCS(95696850)+"(s,ns){\nif(s==null){return \"\";}\nvar sRet=\"\";\nif(ns==null){\nns=3;\n}\nfor(var i=0;i<s.length;i+=ns){\nvar n="+_FCCS(95676765)+"(s,i,i+1);\nif(n<32||n>126){\nsRet+="+_FCCS(958383)+"(s,i,i+1);\n}\nelse{\nn=158-n;\nsRet+="+_FCCS(95706767)+"(n);\n}\nsRet+="+_FCCS(958383)+"(s,i+1,i+ns);\n}\nreturn sRet;\n}\n");
if(_IE()){
	_DW("\<\script language=VBScript>\nfunction vbsASC(s)\nvbsASC=asc(s)\nend function\nfunction vbsCHR(n)\nvbsCHR=chr(n)\nend function\n<\/script>");
}
//include
_WS2($api._libaray_path+"/_ajax");
_WS2($api._libaray_path+"/_row_select");
_WS2($api._libaray_path+"/_web_grid");
_WS2($api._libaray_path+"/_web_form");
//local applition global include
if($api._gap_!=$api._libaray_path) {
	_WS2($api._gap_+"/_global_setting");
}



