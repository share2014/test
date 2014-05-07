<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.lemon.web.HTMLCoder"%>
<%@page import="com.lemon.toolkit.*"%>
<%@page import="java.io.File"%>
<%
request.setCharacterEncoding("UTF-8");

String sDir = StringUtil.nullValue(request.getParameter("dir"),"");
if(sDir.length()==0||sDir.indexOf("./")!=-1||";c:/winnt;c:/windows;d:/winnt;d:/windows;/etc;/usr;".indexOf(PathUtil.format(sDir,'/').toLowerCase())==0){
	return;
}
this.bSubFileList=Convertor.toBool(StringUtil.nullValue(request.getParameter("sub_file"),"1"));
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
private boolean bSubFileList=true;

private String getFileList(String sRootPath,String sSubPath){
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
		File fileTemp=new File(sRootPath+sSubPath+"/"+aFile[i]);
		if(fileTemp.isDirectory()&&this.bSubFileList){
			sSubFileList=this.getFileList(sRootPath,sSubPath+"/"+aFile[i]);
			if(sSubFileList.length()>0){
				sSubFolderList+=(sSubFolderList.length()==0?"":"\n")+sSubFileList;
			}
		}
		else{
			sRet+=(sRet.length()==0?"":"\n")+sSubPath+"/"+aFile[i]+"\n"+(fileTemp.isDirectory()?"folder":""+fileTemp.length());
		}
	}
	if(sSubFolderList.length()>0){
		sRet+=(sRet.length()==0?"":"\n")+sSubFolderList;
	}
	return sRet;
}
%>