<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.lemon.web.HTMLCoder"%>
<%@page import="com.lemon.files.GraphicUtil"%>
<%@page import="com.lemon.toolkit.*"%>
<%@page import="java.io.File"%>
<%@page import="java.io.IOException"%>
<%
request.setCharacterEncoding("UTF-8");

String sDir = StringUtil.nullValue(request.getParameter("dir"),"");
if(sDir.length()==0||sDir.indexOf("./")!=-1||";c:/winnt;c:/windows;d:/winnt;d:/windows;/etc;/usr;".indexOf(PathUtil.format(sDir,'/').toLowerCase())==0){
	return;
}
this.bSubFileList=Convertor.toBool(StringUtil.nullValue(request.getParameter("sub_file"),"1"));
this.nWidth=Convertor.toInt(StringUtil.nullValue(request.getParameter("width"),"240"));
this.nHeight=Convertor.toInt(StringUtil.nullValue(request.getParameter("height"),"160"));
this.sIconDir=StringUtil.nullValue(request.getParameter("icon_dir"));
String sVarName=StringUtil.nullValue(request.getParameter("var_name"));
if(sVarName.length()>0){
	out.println(sVarName+"=\""+HTMLCoder.jsStringEncode(this.getFileList(request.getRealPath("/")+sDir,""))+"\"");
	//out.println(request.getRealPath("/")+sDir);
}
else{
	out.println(this.getFileList(request.getRealPath("/")+sDir,""));
}
%>
<%!
private boolean bSubFileList=false;
private int nWidth = 240;
private int nHeight = 160;
private String _IMG_EXT=";GIF;JPG;JPEG;PNG;BMP;";
private String sIconDir="";


private String getFileList(String sRootPath,String sSubPath){
	GraphicUtil graphic = new GraphicUtil();
	String sRet="";
	File file=new File(sRootPath+"/"+sSubPath);
	if(!file.exists()){
		return "";
	}
	//if(!file.isDirectory()){
	//	return sSubPath+"\n"+file.length();
	//}
	String[] aFile=file.list();
	String sSubFileList="";
	String sSubFolderList="";
	for(int i=0;i<aFile.length;i++){
		if(aFile[i].equals(".")||aFile[i].equals("..")){
			continue;
		}
		if(aFile[i].equals("Thumbs.db")){
			continue;
		}
		if(!isImageFile(aFile[i])) {
		    continue;
		}
		File fileTemp=new File(sRootPath+sSubPath+"/"+aFile[i]);
		if(fileTemp.isDirectory()&&this.bSubFileList){
			sSubFileList=this.getFileList(sRootPath,sSubPath+"/"+aFile[i]);
			if(sSubFileList.length()>0){
				sSubFolderList+=(sSubFolderList.length()==0?"":"\n")+sSubFileList;
			}
		}
		else{
			String sStretchFilePath=sRootPath+sSubPath+"/"+aFile[i];
			String sOutputFilePath= sRootPath+sSubPath+(sIconDir.length()>0?"/"+sIconDir:"");
			try {
				sRet+=(sRet.length()==0?"":"\n")+aFile[i]+"\n"+PathUtil.format(graphic.stretchImage(sStretchFilePath,""+nWidth,""+nHeight,sOutputFilePath),'/').substring(PathUtil.format(sRootPath+sSubPath,'/').length());
			}
			catch(IOException ioe) {}
		}
	}
	if(sSubFolderList.length()>0){
		sRet+=(sRet.length()==0?"":"\n")+sSubFolderList;
	}
	return sRet;
}


private boolean isImageFile(String sUrl){
	String sExt=PathUtil.getFileExtName(sUrl).toUpperCase();
	return (_IMG_EXT.indexOf(";"+sExt+";")!=-1);
}

%>