function selectByText(a,d,b){if(!(null==d||""==d)){var c=!1;try{null!=a.getAttribute("InvokeEvent")&&(c=!0)}catch(e){}if(""!=d.replace(/ /i,""))if(13==event.keyCode)try{a.onchange()}catch(h){}else if(!a.disabled)for(var b=b.split(","),g=a.selectedIndex,f=null,i=-1,l=g+1;;l++){i=l%a.options.length;if(i==g)break;f=a.options[i];if(""!=f.value){for(var j=f.text,k=0;k<b.length;k++)if(""!=b[k]){var m=f.getAttribute(b[k]);null!=m&&(j+=m)}if(-1!=j.toUpperCase().indexOf(d.toUpperCase())){a.selectedIndex=i;
try{if(c)a.onchange()}catch(n){}break}}}}}function addTextSearch(a,d,b){""==a.id&&(a.id="select_"+Math.floor(65536*Math.random()));document.write(getTextSearch(a.id,d,b))}
function getTextSearch(a,d,b){var c="\u68c0\u7d22";try{c=sTextSearch}catch(e){}if(null==d||""==d)d=' style="width:40px;text-align:center;color:gray" maxlength=20 ';return"<input "+d+" onfocus=\"if(this.value=='"+c+"') this.value='';\" onblur=\"if(this.value=='') this.value='"+c+"';\" onkeyup=\"selectByText(document.getElementById('"+a+"'),this.value,'"+b+'\')" value="'+c+'">'}
function setTreeStyle(a,d,b){for(var c=0,e=0,h=[],g=0;g<a.options.length;g++){var f=a.options[g].getAttribute(d);if(null==f||""==f||0!=f.length%b)h[g]=0;else{c=f.length/b;if(0<g){var i=a.options[g-1].getAttribute(d);null!=i&&f.length>=i.length&&f.length>b&&f.substring(0,b)!=i.substring(0,b)&&e++}c-=e;0>c&&(c=0);h[g]=c}}for(g=0;g<a.options.length;g++)if(d="",b=!0,0!=h[g]){for(c=1;c<=h[g];c++){b=!0;for(e=g+1;e<a.options.length;e++){if(h[e]==c){b=!1;break}if(h[e]<c)break}d=c==h[g]?d+(b?"\u2514":"\u251c"):
d+(b?"\u3000":"\u2502")}a.options[g].text=d+a.options[g].text}}
function resetOptionsByAjax(a,d,b,c){var e=$wapper.api.getAjaxObjById();e.callBack=function(){c&&alert(this.request.responseText);for(var d=a.value,f=$api.fn.csvToArray(this.request.responseText.replace(/\r/g,"")),e=0;e<f[0].length;e++)f[0][e]=_toAttrName(f[0][e]);for(;1<a.options.length;)a.remove(1);for(e=1;e<f.length;e++)if(""!=f[e][0].replace(/ /g,"")){var h=document.createElement("OPTION");h.value=f[e][0];h.text=f[e][1];for(var j=2;j<f[0].length;j++)h.setAttribute(f[0][j],f[e][j]);a.options.add(h)}a.value=
d;-1==a.selectedIndex&&(a.selectedIndex=0);null!=b&&("string"==typeof b?eval(b):"function"==typeof b&&b(a))};e.errorHandle=function(){c&&alert(this.request.responseText)};if(0==$api.fn._ED(d).indexOf("select ")){var h=document.createElement("FORM");h.name="combo_form_"+Math.floor(65536*Math.random());h.action=$api._gap_+"/servlet/com.lemon.uiformer.ComboDataSource";h.innerHTML="<textarea name=sql>"+$api.fn.htmlEncode(d)+"</textarea>";e.doPost(h)}else e.doGet(d)}
function _toAttrName(a){for(var a=a.toLowerCase().split("_"),d="",b=0;b<a.length;b++)d+=a[b].substring(0,1).toUpperCase()+a[b].substring(1);return d}function setValueBySplit(a,d,b){var c="";if(!b&&-1!=(","+a+",").indexOf(","+d+","))return c=(","+a+",").replace(","+d+",",",").substring(1),""!=c&&(c=c.substring(0,c.length-1)),c;return b&&-1==(","+a+",").indexOf(","+d+",")?(c=a,c+((""==c?"":",")+d)):a}
function setRadioValue(a,d,b){null==b&&(b="form1");if(!(null==a||null==d))for(var c="rdo"+a,e=0;e<$wp.id(b).elements.namedItem(c).length;e++)d==$wp.id(b).elements.namedItem(c)[e].value?($wp.id(b).elements.namedItem(c)[e].checked=!0,$wp.id(b).elements.namedItem(a).value=d):$wp.id(b).elements.namedItem(c)[e].checked=!1,$wp.id(b).elements.namedItem(c)[e].style.borderBottom=$wp.id(b).elements.namedItem(c)[e].checked?"1px blue dashed":"none"};
