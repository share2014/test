function checkIdcard(a){var c=["","\u8eab\u4efd\u8bc1\u53f7\u7801\u4f4d\u6570\u4e0d\u5bf9!","\u8eab\u4efd\u8bc1\u53f7\u7801\u51fa\u751f\u65e5\u671f\u8d85\u51fa\u8303\u56f4\u6216\u542b\u6709\u975e\u6cd5\u5b57\u7b26!","\u8eab\u4efd\u8bc1\u53f7\u7801\u6821\u9a8c\u9519\u8bef!","\u8eab\u4efd\u8bc1\u5730\u533a\u975e\u6cd5!"],b=[],b=a.split(""),d="";if(null=={11:"\u5317\u4eac",12:"\u5929\u6d25",13:"\u6cb3\u5317",14:"\u5c71\u897f",15:"\u5185\u8499\u53e4",21:"\u8fbd\u5b81",22:"\u5409\u6797",23:"\u9ed1\u9f99\u6c5f",
31:"\u4e0a\u6d77",32:"\u6c5f\u82cf",33:"\u6d59\u6c5f",34:"\u5b89\u5fbd",35:"\u798f\u5efa",36:"\u6c5f\u897f",37:"\u5c71\u4e1c",41:"\u6cb3\u5357",42:"\u6e56\u5317",43:"\u6e56\u5357",44:"\u5e7f\u4e1c",45:"\u5e7f\u897f",46:"\u6d77\u5357",50:"\u91cd\u5e86",51:"\u56db\u5ddd",52:"\u8d35\u5dde",53:"\u4e91\u5357",54:"\u897f\u85cf",61:"\u9655\u897f",62:"\u7518\u8083",63:"\u9752\u6d77",64:"\u5b81\u590f",65:"\u65b0\u7586",71:"\u53f0\u6e7e",81:"\u9999\u6e2f",82:"\u6fb3\u95e8",91:"\u56fd\u5916"}[parseInt(a.substr(0,
2))])return c[4];switch(a.length){case 15:return d=0==(parseInt(a.substr(6,2))+1900)%4||0==(parseInt(a.substr(6,2))+1900)%100&&0==(parseInt(a.substr(6,2))+1900)%4?/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/:/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/,d.test(a)?c[0]:c[2];case 18:d=0==parseInt(a.substr(6,
4))%4||0==parseInt(a.substr(6,4))%100&&0==parseInt(a.substr(6,4))%4?/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/:/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;return d.test(a)?(a=7*(parseInt(b[0])+parseInt(b[10]))+9*(parseInt(b[1])+parseInt(b[11]))+10*(parseInt(b[2])+parseInt(b[12]))+5*
(parseInt(b[3])+parseInt(b[13]))+8*(parseInt(b[4])+parseInt(b[14]))+4*(parseInt(b[5])+parseInt(b[15]))+2*(parseInt(b[6])+parseInt(b[16]))+1*parseInt(b[7])+6*parseInt(b[8])+3*parseInt(b[9]),a="10X98765432".substr(a%11,1),a==b[17]?c[0]:c[3]):c[2];default:return c[1]}}function getIDYear(a){if(null==a||18!=a.length&&15!=a.length)return"";var c="";18==a.length?c=a.substring(6,10):(c=a.substring(6,8),c=49>parseInt(c)?"20"+c:"19"+c);return c}
function getIDMonth(a){if(null==a||18!=a.length&&15!=a.length)return"";a=18==a.length?a.substring(10,12):a.substring(8,10);0==a.indexOf("0")&&(a=a.substring(1));return a}function getIDDay(a){if(null==a||18!=a.length&&15!=a.length)return"";a=18==a.length?a.substring(12,14):a.substring(10,12);0==a.indexOf("0")&&(a=a.substring(1));return a}
function getIDSex(a){return null==a||18!=a.length&&15!=a.length?null:18==a.length&&1==parseInt(a.substring(16,17))%2||15==a.length&&1==parseInt(a.substring(14,15))%2}function getIDAge(a,c){var b=getIDYear(a),d=getIDMonth(a),f=getIDDay(a);if(""==b||""==d||""==f)return 0;var e=new Date,b=e.getFullYear()>parseInt(b)?e.getFullYear()-parseInt(b):0;c&&0<b&&(e.getMonth()+1==parseInt(d)?e.getDate()<parseInt(f)&&b--:e.getMonth()+1<parseInt(d)&&b--);return b};