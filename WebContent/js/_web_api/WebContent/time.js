function realTime(a){var b=new Date,c="\u5929,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d".split(","),d=document.getElementById("timerbar_"+a);d&&(d.innerHTML=""+b.getFullYear()+"-"+(2==(b.getMonth()+1+"").length?b.getMonth()+1:"0"+(b.getMonth()+1))+"-"+(2==(b.getDate()+"").length?b.getDate():"0"+b.getDate())+" "+(2==(b.getHours()+"").length?b.getHours():"0"+b.getHours())+":"+(2==(b.getMinutes()+"").length?b.getMinutes():"0"+b.getMinutes())+":"+(2==(b.getSeconds()+"").length?b.getSeconds():"0"+b.getSeconds())+
" \u661f\u671f"+c[b.getDay()]+"");setTimeout("realTime("+a+");",1E3)}function timer_begin(a){null==a&&(a=0);document.write("<span id=timerbar_"+a+"></span>");realTime(a)}function writeTime(){var a=new Date;document.write(""+a.getYear()+"-"+(a.getMonth()+1)+"-"+a.getDate()+" \u661f\u671f"+"\u5929,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d".split(",")[a.getDay()]+"")}function second_timer_begin(a,b,c,d){null==a&&(a=0);null==d&&(d=10);document.write(getSecondTimer(a,c,d));b&&secTime(a,c)}
function getSecondTimer(a,b,c){return"<span id=sec_timer_show_"+a+"></span><span id=sec_timer_"+a+" style=display:none>"+(b?c:0)+"</span>"}function secTime(a,b){var c=document.getElementById("sec_timer_"+a),d=document.getElementById("sec_timer_show_"+a);if(c&&d){var e=c.innerHTML;if(null==e||isNaN(parseInt(e)))e=0;if(b&&0==parseInt(e))return;c.innerHTML=parseInt(e)+(b?-1:1);d.innerHTML=getTimeStr(parseInt(e)+(b?-1:1))}setTimeout("secTime("+a+","+(b?"true":"false")+");",1E3)}
function getSecTime(a){if(a=document.getElementById("sec_timer_"+a)){a=a.innerHTML;if(null==a||isNaN(parseInt(a)))a=0;return parseInt(a)}return 0}function getTimeStr(a){var b="",c="",d="";3600<a&&(b=parseInt(a/3600),a-=3600*b);60<a&&(c=parseInt(a/60),a-=60*c);0<a&&(d=a);return(""==b?"":b+"\u65f6")+(""==c?"":c+"\u5206")+(""==d?"":d+"\u79d2")};
