Effect.ResizeWindow=Class.create();
Object.extend(Object.extend(Effect.ResizeWindow.prototype,Effect.Base.prototype),{initialize:function(a,c,b,d,f,g){this.window=a;this.window.resizing=!0;var e=a.getSize();this.initWidth=parseFloat(e.width);this.initHeight=parseFloat(e.height);e=a.getLocation();this.initTop=parseFloat(e.top);this.initLeft=parseFloat(e.left);this.width=null!=d?parseFloat(d):this.initWidth;this.height=null!=f?parseFloat(f):this.initHeight;this.top=null!=c?parseFloat(c):this.initTop;this.left=null!=b?parseFloat(b):this.initLeft;
this.dx=this.left-this.initLeft;this.dy=this.top-this.initTop;this.dw=this.width-this.initWidth;this.dh=this.height-this.initHeight;this.r2=$(this.window.getId()+"_row2");this.content=$(this.window.getId()+"_content");this.contentOverflow=this.content.getStyle("overflow")||"auto";this.content.setStyle({overflow:"hidden"});this.window.options.wiredDrag&&(this.window.currentDrag=a._createWiredElement(),this.window.currentDrag.show(),this.window.element.hide());this.start(g)},update:function(a){var c=
Math.floor(this.initWidth+this.dw*a),b=Math.floor(this.initHeight+this.dh*a),d=Math.floor(this.initTop+this.dy*a),a=Math.floor(this.initLeft+this.dx*a);window.ie&&(0==Math.floor(b)?this.r2.hide():1<Math.floor(b)&&this.r2.show());this.r2.setStyle({height:b});this.window.setSize(c,b);this.window.setLocation(d,a)},finish:function(){this.window.options.wiredDrag&&(this.window._hideWiredElement(),this.window.element.show());this.window.setSize(this.width,this.height);this.window.setLocation(this.top,this.left);
this.r2.setStyle({height:null});this.content.setStyle({overflow:this.contentOverflow});this.window.resizing=!1}});Effect.ModalSlideDown=function(a,c){var b=WindowUtilities.getWindowScroll(),d=a.getStyle("height");a.setStyle({top:-(parseFloat(d)-b.top)+"px"});a.show();return new Effect.Move(a,Object.extend({x:0,y:parseFloat(d)},c||{}))};Effect.ModalSlideUp=function(a,c){var b=a.getStyle("height");return new Effect.Move(a,Object.extend({x:0,y:-parseFloat(b)},c||{}))};PopupEffect=Class.create();
PopupEffect.prototype={initialize:function(a,c){this.html=$(a);this.options=Object.extend({className:"popup_effect",duration:0.4},c||{})},show:function(a){var c=Position.cumulativeOffset(this.html),b=this.html.getDimensions(),d=a.win.getBounds();this.window=a.win;this.div||(this.div=document.createElement("div"),this.div.className=this.options.className,this.div.style.height=b.height+"px",this.div.style.width=b.width+"px",this.div.style.top=c[1]+"px",this.div.style.left=c[0]+"px",this.div.style.position=
"absolute",document.body.appendChild(this.div));this.options.fromOpacity&&this.div.setStyle({opacity:this.options.fromOpacity});this.div.show();a="top:"+d.top+";left:"+d.left+";width:"+d.width+";height:"+d.height;this.options.toOpacity&&(a+=";opacity:"+this.options.toOpacity);new Effect.Morph(this.div,{style:a,duration:this.options.duration,afterFinish:this._showWindow.bind(this)})},hide:function(){var a=Position.cumulativeOffset(this.html),c=this.html.getDimensions();this.window.visible=!0;var b=
this.window.getBounds();this.window.visible=!1;this.window.element.hide();this.div.style.height=b.height;this.div.style.width=b.width;this.div.style.top=b.top;this.div.style.left=b.left;this.options.toOpacity&&this.div.setStyle({opacity:this.options.toOpacity});this.div.show();a="top:"+a[1]+"px;left:"+a[0]+"px;width:"+c.width+"px;height:"+c.height+"px";this.options.fromOpacity&&(a+=";opacity:"+this.options.fromOpacity);new Effect.Morph(this.div,{style:a,duration:this.options.duration,afterFinish:this._hideDiv.bind(this)})},
_showWindow:function(){this.div.hide();this.window.element.show()},_hideDiv:function(){this.div.hide()}};
