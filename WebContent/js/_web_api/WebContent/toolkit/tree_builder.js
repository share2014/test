var tree=null,onNodeClick=null,getDataURL=null,onSubNodesData=null,onDataError=null,sDefaultTreeIcon1=$api._gap_+"/images/fld1.gif",sDefaultTreeIcon2=$api._gap_+"/images/fld2.gif",sCurrentRootId="root",bNodeIdStringAllowed=!1,beforeInsertTreeNode=null,afterInsertTreeNode=null,bAutoFocusAfterNew=!0;
function treenode_onclick(a){var b=tree.getSelectedNode(),c=b.getAttribute("key"),e=b.getAttribute("TreeNodeType");null==e&&(e="");c=getIdFromKey(b.getAttribute("key"),e);if("0"==c||""==c)c="-1";var d=document.getElementById(b.id);if("1"!=d.getAttribute("SubNodeLoaded","0")&&null!=getDataURL&&(c=getDataURL(c,e)))d.setAttribute("SubNodeLoaded","1"),null==onSubNodesData?$wp.getHiddenFrame()&&($wp.getHiddenFrame().location.href=c):(d=$wapper.api.getAjaxObjById(),d.callBack=onSubNodesData,d.errorHandle=
onDataError,d.doGet(c));!a&&null!=onNodeClick&&onNodeClick(getIdFromKey(b.getAttribute("key")),e)}function getIdFromKey(a){var b=a.lastIndexOf("_");if(-1==b)return bNodeIdStringAllowed?a:"";a=a.substring(b+1);return isNaN(a)&&!bNodeIdStringAllowed?"":a}function getKeyFromId(a,b){if(isNaN(a))return a;if("-1"==a)return sCurrentRootId;if(null==b||""==b)b="node";return b+"_"+a}
function addTreeNode(a,b,c,e,d,h,i){if(null!=tree){if((null==e||""==e)&&(null==d||""==d))d=sDefaultTreeIcon2;if(null==e||""==e)e=sDefaultTreeIcon1;null==d&&(d="");var f=sCurrentRootId;"-1"!=a&&"0"!=a&&a!=c&&(f=getKeyFromId(a));var g=tree.find(getKeyFromId(c));g?g.setText(b):(null!=beforeInsertTreeNode&&beforeInsertTreeNode(a,c),tree.addNode(f,null,new TreeNode($wapper.api.getDisplayFormat(e),$wapper.api.getDisplayFormat(d),b,"treenode_onclick()",getKeyFromId(c),h,i)),bAutoFocusAfterNew&&tree.find(f).focus(),
null!=afterInsertTreeNode&&afterInsertTreeNode(a,c));tree.find(f)}}function _tb_addSubNodeByCSV(){}function refreshCurrentTreeNode(){var a=tree.getSelectedNode();if(a){var b=tree.find(a.getAttribute("key"));for(a.setAttribute("SubNodeLoaded","0");0<b.subNodes.length;)b.removeNode(b.subNodes[0]);treenode_onclick(!0)}};