function PageBlock(a,c,d,e,b){this.sBlockId=a;this.sBlockName=c;this.x=d;this.y=e;null==b&&(b=$fn.ui._BLOCK_DEFAULT);this.nDisplayType=b;this.nBlockIndex=0;this.sBlockData="";this.nBlockStatus=0;this.sHtml="";this.output=_outputBlock}function _outputBlock(a){null!=$fn.ui.beforeOutputBlock&&$fn.ui.beforeOutputBlock(this);a.win.document.write($fn.ui.getBlockHeader(a,this)+"<div id=_block_content_"+this.sBlockId+">"+this.sHtml+"</div>"+$fn.ui.getBlockFooter(a,this));this.nBlockStatus=2};