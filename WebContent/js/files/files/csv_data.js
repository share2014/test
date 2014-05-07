var nRowCount=0;

function window_onload(){
	if(nRowCount==0){
		alert("你所选择的文件里没有数据");
		return;
	}
	divHeader.style.height=tblHeader.offsetHeight+2;
	for(var i=0;i<tblHeader.rows[0].cells.length-1;i++){
		var w1=tblHeader.rows[0].cells[i].offsetWidth;
		var w2=tblData.rows[0].cells[i].offsetWidth;
		tblHeader.rows[0].cells[i].getElementsByTagName("INPUT")[0].style.width=Math.max(w1,w2);
		tblData.rows[0].cells[i].getElementsByTagName("DIV")[0].style.width=Math.max(w1,w2)-1;
	}
	if(tblHeader.offsetWidth<document.body.offsetWidth){
		try{
			var w=document.body.offsetWidth-tblHeader.offsetWidth-21;
			tblHeader.rows[0].cells[tblHeader.rows[0].cells.length-1].innerHTML="<input type=button value=\"\" style=\"width:"+w+"\">"
			tblData.rows[0].cells[tblHeader.rows[0].cells.length-1].getElementsByTagName("DIV")[0].style.width=w;
		}
		catch(e){
		}
	}
	parent.loadCSVFields(true);
}

function window_onscroll(){
	tblHeader.style.top=document.body.scrollTop;
}