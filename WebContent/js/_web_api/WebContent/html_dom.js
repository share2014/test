function insertAfter(a,b){b==b.parentNode.lastChild?b.parentNode.appendChild(a):b.parentNode.insertBefore(a,b.nextSibling)}function getParentElement(a,b){return"function"!=typeof b?null:null==a||b(a)?a:"BODY"==a.tagName?null:getParentElement(a.parentNode,b)}function findWindow(a,b){if("function"!=typeof b)return null;if(b(a))return a;for(var c=0;c<a.frames.length;c++){var d=findWindow(a.frames[c],b);if(null!=d)return d}return null}
function findWindowByName(a){return findWindow(top,function(b){return b.name==a})};