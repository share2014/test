function RowSelector(c,b,a){this.win_dom=c;this.sTableId=b;this.bMultiSelect=a;this.sSelectedClassName="list_table_row_selected";this.aRowList=[];this.select=_selectTableRow;this.getSize=_getSelectedSize;this.getSelectedRow=_getSelectedRow;this.maskSelectedRows=_maskSelectedRows;this.setSelectedCSS=_setSelectedCSS;this.onHeaderCheckbox=_onHeaderCheckbox;this.selectAll=_selectAllRow;this.clearSelection=_clearRowSelection;this.invertSelection=_invertRowSelection;this.bInSelectProcessor=!1;this.beforeSelect=
null}
function _selectTableRow(c,b){if(!this.bInSelectProcessor)if(this.bInSelectProcessor=!0,""==c.id&&(c.id="tr_"+c.rowIndex),null!=this.beforeSelect&&!this.beforeSelect(c,b))this.maskSelectedRows();else{for(var a=-1,d=0;d<this.aRowList.length;d++)null!=this.win_dom.win.document.getElementById(this.aRowList[d])&&(-1==a&&(a=this.win_dom.win.document.getElementById(this.aRowList[d]).rowIndex),this.win_dom.win.document.getElementById(this.aRowList[d]).rowIndex<a&&(a=this.win_dom.win.document.getElementById(this.aRowList[d]).rowIndex));var e,
f=c;b&&(f=$api.fn._IE()?b.srcElement:b.target);if("INPUT"==f.tagName&&-1!=f.name.indexOf("_"+this.sTableId)){e=[];for(d=0;d<this.aRowList.length&&"CHECKBOX"==f.type.toUpperCase();d++)if(a=this.win_dom.win.document.getElementById(this.aRowList[d]),!(null==a||this.aRowList[d]==c.id&&!f.checked))if(null==a||a.getElementsByTagName("INPUT")[0].checked)e[e.length]=this.aRowList[d];f.checked&&(e[e.length]=c.id);this.aRowList=[];for(d=0;d<e.length;d++)this.aRowList[this.aRowList.length]=e[d]}else if(!this.bMultiSelect||
b&&!b.ctrlKey&&!b.shiftKey||0==this.getSize())this.aRowList=[],this.aRowList[this.aRowList.length]=c.id;else if(e=[],b&&b.ctrlKey){a=!1;for(d=0;d<this.aRowList.length;d++)this.aRowList[d]==c.id?a=!0:e[e.length]=this.aRowList[d];a||(e[e.length]=c.id);this.aRowList=[];for(d=0;d<e.length;d++)this.aRowList[this.aRowList.length]=e[d]}else if(b&&b.shiftKey){e=c.rowIndex;a>c.rowIndex&&(e=a,a=c.rowIndex);this.aRowList=[];for(d=a;d<=e;d++)""==this.win_dom.win.document.getElementById(this.sTableId).rows[d].id&&
(this.win_dom.win.document.getElementById(this.sTableId).rows[d].id="tr_"+d),this.aRowList[this.aRowList.length]=this.win_dom.win.document.getElementById(this.sTableId).rows[d].id}this.maskSelectedRows();this.bInSelectProcessor=!1}}
function _maskSelectedRows(){var c=this.win_dom.win.document.getElementById(this.sTableId);if(null!=c){for(var b=0;b<c.rows.length;b++){var a=c.rows[b];a.className==this.sSelectedClassName&&(a.className=a.getAttribute("classNameOld"));0<a.getElementsByTagName("INPUT").length&&-1!=a.getElementsByTagName("INPUT")[0].name.indexOf("_"+this.sTableId)&&(a.getElementsByTagName("INPUT")[0].checked=!1)}for(b=0;b<this.aRowList.length;b++)a=this.win_dom.win.document.getElementById(this.aRowList[b]),null!=a&&
(null==a.getAttribute("classNameOld","")&&a.setAttribute("classNameOld",a.className),a.className=this.sSelectedClassName,0<a.getElementsByTagName("INPUT").length&&-1!=a.getElementsByTagName("INPUT")[0].name.indexOf("_"+this.sTableId)&&(a.getElementsByTagName("INPUT")[0].checked=!0));if(this.bMultiSelect&&0<c.rows.length&&0<c.rows[0].cells.length&&0<c.rows[0].cells[0].getElementsByTagName("INPUT").length&&"1"==c.rows[0].cells[0].getElementsByTagName("INPUT")[0].getAttribute("HeaderCheckbox","")){for(b=
a=0;b<c.rows.length;b++)0!=c.rows[b].cells.length&&0!=c.rows[b].cells[0].getElementsByTagName("INPUT").length&&"CHECKBOX"==c.rows[b].cells[0].getElementsByTagName("INPUT")[0].type.toUpperCase()&&-1==c.rows[b].cells[0].id.indexOf("tdHeader_")&&a++;c.rows[0].cells[0].getElementsByTagName("INPUT")[0].checked=this.aRowList.length==a}}}function _maskCheckbox(c,b){var a=this.win_dom.win.document.getElementById(c);a.checked=a.parentElement.parentElement.className==b}
function _onHeaderCheckbox(c){($api.fn._IE()?c.srcElement:c.target).checked?this.selectAll(!0):this.clearSelection()}
function _selectAllRow(c){if(this.bMultiSelect){this.aRowList=[];for(var b=this.win_dom.win.document.getElementById(this.sTableId),a=0;a<b.rows.length;a++)if(0!=b.rows[a].cells.length){if(c){if(0==b.rows[a].cells[0].getElementsByTagName("INPUT").length)continue;if("CHECKBOX"!=b.rows[a].cells[0].getElementsByTagName("INPUT")[0].type.toUpperCase())continue}if(-1==b.rows[a].cells[0].id.indexOf("tdHeader_")&&(""==b.rows[a].id&&(b.rows[a].id="tr_temp_id_"+a),null==this.beforeSelect||this.beforeSelect(b.rows[a],
null)))this.aRowList[this.aRowList.length]=b.rows[a].id}this.maskSelectedRows()}}function _clearRowSelection(){this.aRowList=[];this.maskSelectedRows()}
function _invertRowSelection(){if(this.bMultiSelect){this.aRowList=[];for(var c=this.win_dom.win.document.getElementById(this.sTableId),b=0;b<c.rows.length;b++){var a=c.rows[b];0!=a.cells.length&&-1==a.cells[0].id.indexOf("tdHeader_")&&a.className!=this.sSelectedClassName&&(""==a.id&&(a.id="tr_temp_id_"+b),this.aRowList[this.aRowList.length]=a.id)}this.maskSelectedRows()}}function _getSelectedSize(){return this.aRowList.length}function _getSelectedRow(c){return this.aRowList[c]}
function _setSelectedCSS(c){this.sSelectedClassName=c};
