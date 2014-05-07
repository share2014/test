function AjaxCall(oSrc,onCompleted,bDebug){
	var oAjax=$wapper.api.getAjaxObjById();

	oAjax.callBack=function(){
		var sScript=this.request.responseText;
		try{
			eval(sScript);
		}
		catch(e){
		}
		onCompleted(ActionResult)
	}
	
	if(bDebug){
		oAjax.errorHandle=function(){
			alert(this.request.responseText);		
		}
	}

	if(typeof(oSrc)=="string"){
		oAjax.doGet(oSrc);
	}
	else{
		oAjax.doPost(oSrc);
	}
	
}