$api.fn.sLocalPortal = "http://127.0.0.1"+(window.location.port=="80"?"":":"+window.location.port)+"/"+$api._gap_;
var $fn = {
    getFilesWeb:function(){
		var sFilesWeb = $api._gap_;
		if(sFilesWeb.toLowerCase().substring(0,7)!="http://"){
			var sHost=window.location.host;
			if(sHost.substring(sHost.length-3)==":80"){
				sHost=sHost.substring(0,sHost.length-3);
			}
			sFilesWeb="http://"+sHost+(sFilesWeb.substring(0,1)=="/"?"":"/")+sFilesWeb;
		}
		return sFilesWeb;
	},
	getUploadAction:function() {
		var sFilesWeb = this.getFilesWeb();
		return sFilesWeb+"/servlet/com.lemon.files.UploadAction?redirect_url="+$api._libaray_path+"/after_upload.htm&files_web="+sFilesWeb;
	},
	getDeleteAction:function(){
		var sFilesWeb = this.getFilesWeb();
		return sFilesWeb+"/servlet/com.lemon.files.DeleteAction?redirect_url="+$api._libaray_path+"/after_delete.htm&files_web="+sFilesWeb;
    },
	action:null,
	ui:null
}

