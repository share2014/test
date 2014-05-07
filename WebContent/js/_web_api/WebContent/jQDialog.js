/*
	ColorBox v1.2.9b - a full featured, light-weight, customizable lightbox based on jQuery 1.3
	(c) 2009 Jack Moore - www.colorpowered.com - jack@colorpowered.com
	Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
*/
(function ($) {
	
	// ****************
	// COMMON VARIABLES
	// ****************
	
	//jQuery Object Variables
	var $overlay, $cbox, $wrap, $content, $topBorder, $leftBorder, $rightBorder, $bottomBorder, $related, $window, $loaded, $loadingOverlay, $loadingGraphic, $title, $current, $slideshow, $next, $prev, $close,
	
	//Variables
	publicMethod, interfaceHeight, interfaceWidth, loadedHeight, loadedWidth, maxWidth, maxHeight, element, index, settings, open, callback, colorbox = 'colorbox', hover = 'hover',confirm = false,prompt = false,

	//Functions
	prev, next, init, load, position, dimensions, slideshow, close,
	
	//Events
	cbox_open = 'cbox_open', cbox_load = 'cbox_load', cbox_complete = 'cbox_complete', cbox_close = 'cbox_close', cbox_closed = 'cbox_closed',

	// DialogBox Default Settings.	
	// See http://colorpowered.com/colorbox/
	defaults = {
		transition: "elastic",
		speed: 450,
		width: false,
		height: false,
		initialWidth: "70",
		initialHeight: "70",
		maxWidth: false,
		maxHeight: false,
		resize: true,
		inline: false,
		html: false,
		iframe: false,
		photo: false,
		href: false,
		title: false,
		rel: false,
		opacity: 0.3,
		preloading: true,
		current: "image {current} of {total}",
		previous: "previous",
		next: "next",
		close: "close",
		open: false,
		overlayClose: false,
		slideshow: false,
		slideshowAuto: true,
		slideshowSpeed: 2500,
		slideshowStart: "start slideshow",
		slideshowStop: "stop slideshow",
		draggable: true,
		button: true,
		okButton: true,
		cancelButton: true
	};

	// ****************
	// HELPER FUNCTIONS
	// ****************
	
	// Set Navigation Keys
	function cbox_key(e) {
		if (e.keyCode === 37) {
			e.preventDefault();
			$prev.click();
		} else if (e.keyCode === 39) {
			e.preventDefault();
			$next.click();
		}
	}

	// Convert % values to pixels
	function setSize(size, dimension) {
		//alert(document.documentElement)
		dimension = dimension === 'x' ? document.documentElement.clientWidth : document.documentElement.clientHeight;//
		return (typeof size === 'string') ? (size.match(/%/) ? (dimension / 100) * parseInt(size, 10) : parseInt(size, 10)) : size;
	}

	// Checks an href to see if it is a photo.
	// There is a force photo option for hrefs that cannot be matched by this regex.
	function isImage(url) {
		return settings.photo ? true : url.match(/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i);
	}
	
	// Assigns functions results to their respective settings.  This allows functions to be used to set ColorBox options.
	function process() {
		for (var i in settings) {
			if (typeof(settings[i]) === 'function') {
			    settings[i] = settings[i].call(element);
			}
		}
	}

	/***************************************************************************************************/
	/*** Dialog对话框: $("#ID").Dialog({href:"message.jsp", width:"75%", height:"75%", iframe: true}) **/
	/***************************************************************************************************/
	
	/*
	 * 弹出对话框, custom_callback函数是在对话框弹出时执行
	 * 可指定某一个jQuery对象调用:  $(".class").Dialog({href:"message.jsp?params="+params, iframe:true, width:"50%", height:"50%"});
	 * 也可用$.fn.Dialog()直接调用:  $.fn.Dialog({href:"message.jsp?params="+params, width:"50%", height:"50%", iframe:true});
	 */
	$.fn.Dialog = function (options, custom_callback) {
		if (this.length) {
			if(confirm || prompt){
				//当以$.fn.Confirm、$.fn.Prompt形式调用提示信息窗口时, this.length为1, 将open设为true
				if(this.length == 1){
					options.open = (options.open==null?true:options.open);
				}
			}
			this.each(function () {
				var data = $(this).data(colorbox) ? $.extend({},
					$(this).data(colorbox), options) : $.extend({}, defaults, options);
				$(this).data(colorbox, data).addClass("cboxelement");
			});
		} else {
			//当以$.fn.Dialog形式调用时, this.length为0, 将open设为true
			options.open = (options.open==null?true:options.open);
			$(this).data(colorbox, $.extend({}, defaults, options));
		}
		
		$(this).unbind("click.colorbox").bind("click.colorbox", function (event) {
			
			element = this;
			settings = $(element).data(colorbox);
			process();//process settings functions
			
			$().bind("keydown.cbox_close", function (e) {
				if (e.keyCode === 27) {
					e.preventDefault();
					$close.click();
				}
			});
			if (settings.overlayClose) {
				$overlay.css({"cursor": "pointer"}).one('click', close);
			}
			
			//remove the focus from the anchor to prevent accidentally calling
			//colorbox multiple times (by pressing the 'Enter' key
			//after colorbox has opened, but before the user has clicked on anything else)
			element.blur();
			
			callback = custom_callback || false;
			var rel = settings.rel || element.rel;
			if (rel && rel !== 'nofollow') {
				$related = $('.cboxelement').filter(function () {
					var relRelated = $(this).data(colorbox).rel || this.rel;
					return (relRelated === rel);
				});
				index = $related.index(element);
				
				if (index < 0) { //this checks direct calls to colorbox
					$related = $related.add(element);
					index = $related.length - 1;
				}
			} else {
				$related = $(element);
				index = 0;
			}
			if (!open) {
				$.event.trigger(cbox_open);
				//$close.html(settings.close);
				$overlay.css({"opacity": settings.opacity}).show();
				open = true;
				position(setSize(settings.initialWidth, 'x'), setSize(settings.initialHeight, 'y'), 0);
				if ($.browser.msie && $.browser.version < 7) {
					$window.bind("resize.cboxie6 scroll.cboxie6", function () {
						$overlay.css({width: $window.width(), height: $window.height(), top: $window.scrollTop(), left: $window.scrollLeft()});
					}).trigger('scroll.cboxie6');
				}
			}
			slideshow();
			load();
			event.preventDefault();
			
			//设置Dialog对话框可否拖动, 默认可拖动
			if(settings.draggable){
				//第一个参数可指定鼠标拖放的目标元素, 为null表示不指定,即鼠标点击DialogBox任何地方都可拖动
				//第二个参数为重新设置css的position属性为relative，此处不必再设置,设为false
				$cbox.Drag(null,false);
			}	
		});
		if (options && options.open) {
			$(this).triggerHandler('click.colorbox');
		}
		return this;
	};
	
	/*
	 * 确认信息弹出框, 若未传入高宽度参数系统默认设置为400px和170px, custom_callback函数是在点击确定按钮时所执行的方法
	 * 可指定某一个jQuery对象调用:  $(".class").Confirm({html:"确认删除?", width:"350px", height:"110px"});
	 * 也可用$.fn.Confirm()直接调用:  $.fn.Confirm({html:"确认删除?"},function(){alert("这是点击确认按钮执行的操作")});
	 */ 
	$.fn.Confirm = function(options, custom_callback){
		
		//设定Confirm确认框属性
		confirm = true;
		options.width=(options.width==null?"400px":options.width);
		options.height=(options.height==null?"170px":options.height);
		
		options.title = (options.title==null?"确认信息":options.title);
		options.html = "<div align='center' style='font-size:10pt;FONT-FAMILY:方正新魏;margin-top:16px;margin-left:10px;color:#595959' >"+options.html+"</div>";
		
		//button为true时显示确定与取消按钮,默认为true
		options.button = (options.button==null?true:options.button);
		if(options.button){
			options.okButton = (options.okButton==null?true:options.okButton);
			options.cancelButton = (options.cancelButton==null?true:options.cancelButton);
			
			options.html = options.html + "<div align='center' style='margin-top:12px'>";
			if(options.okButton){
				options.html = options.html + "<input type='button' id='confirmOk' value='确 定'/>";
			}
			if(options.cancelButton){
				options.html = options.html + "<input type='button' id='confirmCancel' value='取 消' style='margin-left:25px'/>";
			}
			options.html = options.html + "</div>";
		}
		$(this).data(colorbox, $.extend({}, defaults, options));
		return $(this).Dialog(options, custom_callback);
	};
	
	/*
	 * 提示信息弹出框. 若未传入高宽度参数系统默认设置为400px和160px, custom_callback是在提示框弹出时执行
	 * 可指定某一个jQuery对象调用:  $(".class").Prompt({html:"设置成功!"}); 
	 * 也可用$.fn.Prompt()直接调用:  $.fn.Prompt({html:"设置成功!"});
	 */
	$.fn.Prompt = function(options, custom_callback){
		
		//设定Prompt提示框属性

		prompt = true;
		options.width=(options.width==null?"400px":options.width);
		options.height=(options.height==null?"160px":options.height);
		
		options.title = (options.title==null?"提示信息":options.title);
		options.html="<div align='center' style='font-size:10pt;FONT-FAMILY:方正新魏;margin-top:19px;color:#595959' >"+options.html+"</div>";
		
		//okButton为false不显示确定按钮
		options.button = (options.button==null?true:options.button);
		if(options.button){
			options.html = options.html +  "<div align='center' style='margin-top:12px'><input type='button' id='promptOk' value='确 定'/></div>";
		}
			
		$(this).data(colorbox, $.extend({}, defaults, options));
		return $(this).Dialog(options, custom_callback);
	};

	// Initialize ColorBox: store common calculations, preload the interface graphics, append the html.
	// This preps colorbox for a speedy open when clicked, and lightens the burdon on the browser by only
	// having to run once, instead of each time colorbox is opened.
	init = function () {				
		// jQuery object generator to save a bit of space
		function $div(id) {
			return $('<div id="cbox' + id + '"/>');
		}
		// Create & Append jQuery Objects
		$window = $(window);
		$cbox = $('<div id="colorbox"/>');
		$overlay = $div("Overlay").hide();
		$wrap = $div("Wrapper");
		$content = $div("Content").append(
			$loaded = $div("LoadedContent").css({width: 0, height: 0}),
			$loadingOverlay = $div("LoadingOverlay"),
			$loadingGraphic = $div("LoadingGraphic"),
			$title = $div("Title"),
			$current = $div("Current"),
			$slideshow = $div("Slideshow"),
			$next = $div("Next"),
			$prev = $div("Previous"),
			$close = $div("Close")
		);
		$wrap.append( // The 3x3 Grid that makes up ColorBox
			$('<div/>').append(
				$div("TopLeft"),
				$topBorder = $div("TopCenter"),
				$div("TopRight")
			),
			$('<div/>').append(
				$leftBorder = $div("MiddleLeft"),
				$content,
				$rightBorder = $div("MiddleRight")
			),
			$('<div/>').append(
				$div("BottomLeft"),
				$bottomBorder = $div("BottomCenter"),
				$div("BottomRight")
			)
		).children().children().css({'float': 'left'});
		$('body').prepend($overlay, $cbox.append($wrap));
		
		if ($.browser.msie && $.browser.version < 7) {
			$overlay.css('position', 'absolute');
		}
		
		// Add rollover event to navigation elements
		$content.children()
		.addClass(hover)
		.mouseover(function () { $(this).addClass(hover); })
		.mouseout(function () { $(this).removeClass(hover); })
		.hide();
		
		// Cache values needed for size calculations
		interfaceHeight =$topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();//Subtraction needed for IE6
		//alert(interfaceHeight)
		interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
		loadedHeight = $loaded.outerHeight(true);
		loadedWidth = $loaded.outerWidth(true);
		// Setting padding to remove the need to do size conversions during the animation step.
		$cbox.css({"padding-bottom": interfaceHeight, "padding-right": interfaceWidth}).hide();
		
		// Setup button & key events.
		$next.click(next);
		$prev.click(prev);
		$close.click(close);
		
		// Adding the 'hover' class allowed the browser to load the hover-state
		// background graphics.  The class can now can be removed.
		$content.children().removeClass(hover);
	};

	position = function (mWidth, mHeight, speed, loadedCallback) {
		var winHeight = document.documentElement.clientHeight,
		posTop = winHeight / 2 - mHeight / 2,
		posLeft = document.documentElement.clientWidth / 2 - mWidth / 2,
		animate_speed;
		//keeps the box from expanding to an inaccessible area offscreen.
		if (mHeight > winHeight) { posTop -=(mHeight - winHeight); }
		if (posTop < 0) { posTop = 0; } 
		if (posLeft < 0) { posLeft = 0; }
		
		posTop += $window.scrollTop();
		posLeft += $window.scrollLeft();
		
		mWidth = mWidth - interfaceWidth;
		mHeight = mHeight - interfaceHeight;
		//alert($cbox.width(mWidth))
		//setting the speed to 0 to reduce the delay between same-sized content.
		animate_speed = ($cbox.width() === mWidth && $cbox.height() === mHeight) ? 0 : speed;
		
		//this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
		//but it has to be shrank down around the size of div#colorbox when it's done.  If not,
		//it can invoke an obscure IE bug when using iframes.
		$wrap[0].style.width = $wrap[0].style.height = "9999px";
		
		function modalDimensions (that) {
			//loading overlay size has to be sure that IE6 uses the correct height.
			$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = that.style.width;
			$loadingGraphic[0].style.height = $loadingOverlay[0].style.height = $content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = that.style.height;
		}
		
		$cbox.dequeue().animate({height:mHeight, width:mWidth, top:posTop, left:posLeft}, {duration: animate_speed,
			complete: function(){
				modalDimensions(this);
				
				//shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
				$wrap[0].style.width = (mWidth+interfaceWidth) + "px";
				$wrap[0].style.height = (mHeight+interfaceHeight) + "px";
				
				if (loadedCallback) {
					loadedCallback();
					//动画结束页面透明度为1，即不透明
					$(this).css("opacity","1");
				}
			},
			step: function(){
				modalDimensions(this);
			}
		});
	};
	
	//以缩放动画形式关闭Dialog窗口, speed: 关闭持续时间
	closeDialog = function (speed) {
		var mHeight = 10, mWidth = 10, winHeight = document.documentElement.clientHeight,winWidth = document.documentElement.clientWidth,
		posTop = winHeight / 2, posLeft = winWidth / 2, animate_speed;
		
		posTop += $window.scrollTop();
		posLeft += $window.scrollLeft();
		
		animate_speed = ($cbox.width() === mWidth && $cbox.height() === mHeight) ? 0 : speed;
		
		function modalDimensions (that) {
			$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = that.style.width;
			$loadingGraphic[0].style.height = $loadingOverlay[0].style.height = $content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = that.style.height;
		}
		
		$cbox.dequeue().animate({height:mHeight, width:mWidth, top:posTop, left:posLeft, opacity:"hide"}, {duration: animate_speed,
			complete: function(){
				modalDimensions(this);
				$cbox.removeClass();
				$loaded.remove();
				$cbox.css('opacity',1);
				$.event.trigger(cbox_closed);
			},
			step: function(){
				modalDimensions(this);
			}
		});
	};

	dimensions = function (object) {
		if(!open){ return; }
		
		$window.unbind('resize.cbox_resize');
		
		var width, height, topMargin, prev, prevSrc, next, nextSrc, photo,
		speed = settings.transition==="none" ? 0 : settings.speed;
		
		$loaded.remove();
		$loaded = $(object);

		function getWidth(){
			if(settings.width){
				width = maxWidth;
			} else {
				width = maxWidth && maxWidth < $loaded.width() ? maxWidth : $loaded.width();
			}
			return width;
		}
		function getHeight(){
			if(settings.height){
				height = maxHeight;
			} else {
				height = maxHeight && maxHeight < $loaded.height() ? maxHeight : $loaded.height();
			}
			return height;
		}
		$loaded.hide().appendTo('body')
		.attr({id:'cboxLoadedContent'})
		.css({width:getWidth()})
		.css({height:getHeight()})//sets the height independently from the width in case the new width influences the value of height.
		.prependTo($content);
		
	
		//如果是确认框, 给确认按钮和取消按钮添加事件
		if(confirm){
			$("#confirmOk").click(function(){callback();close()});
			$("#confirmCancel").click(close);
		}
		//如果是提示框, 给确定按钮添加关闭事件
		if(prompt){
			$("#promptOk").click(close);
		}
		
		// Hides 'select' form elements in IE6 because they would otherwise sit on top of the overlay.
		if ($.browser.msie && $.browser.version < 7) {
			$('select:not(#colorbox select)').filter(function(){
				return $(this).css('visibility') !== 'hidden';
			}).css({'visibility':'hidden'}).one(cbox_close, function(){
				$(this).css({'visibility':'inherit'});
			});
		}
		
		photo = $('#cboxPhoto')[0];
		if (photo && settings.height) {
			topMargin = (height - parseInt(photo.style.height, 10))/2;
			photo.style.marginTop = (topMargin > 0 ? topMargin : 0)+'px';
		}
		function setPosition (s) {
			
			var mWidth = width+loadedWidth+interfaceWidth,
			mHeight = height+loadedHeight+interfaceHeight;
			
			position(mWidth, mHeight, s, function(){
				if (!open) { return; }
				
				if ($.browser.msie) {
					//This fadeIn helps the bicubic resampling to kick-in.
					if( photo ){$loaded.fadeIn(100);}
					//IE adds a filter when ColorBox fades in and out that can cause problems if the loaded content contains transparent pngs.
					$cbox.css('filter','');
				}
				
				$content.children().show();
				
				//Waited until the iframe is added to the DOM & it is visible before setting the src.
				//This increases compatability with pages using DOM dependent JavaScript.
				$('#cboxIframeTemp').after("<iframe id='cboxIframe' name='iframe_"+new Date().getTime()+"' frameborder=0 src='"+(settings.href || element.href)+"' />").remove();
				
				$loadingOverlay.hide();
				$loadingGraphic.hide();
				$slideshow.hide();
				
				if ($related.length>1) {
					$current.html(settings.current.replace(/\{current\}/, index+1).replace(/\{total\}/, $related.length));
					$next.html(settings.next);
					$prev.html(settings.previous);
					
					$().unbind('keydown', cbox_key).bind('keydown', cbox_key);
					
					if(settings.slideshow){
						$slideshow.show();
					}
				} else {
					$current.hide();
					$next.hide();
					$prev.hide();
				}
				$title.html("");
				$title.html(settings.title || element.title);
				//如果title不为空则给title添加下划线
				if($title.html() != ""){
					$title.append($("<hr width=97% align=left style='height:1px; border:0;border-bottom: 1px dashed #D7D7D7;'/>"));
				}
				
				$.event.trigger(cbox_complete);
				
				//当弹出确认框的时候confirm为true,不执行callback方法
				//if (callback && !confirm) {
				//	callback.call(element);
				//}
				if (settings.transition === 'fade'){
					$cbox.fadeTo(speed, 1, function(){
						if($.browser.msie){$content.css('filter','');}
					});
				}
				$window.bind('resize.cbox_resize', function(){
					position(mWidth, mHeight, 0);
				});
			});
		}
		if (settings.transition === 'fade') {
			$cbox.fadeTo(speed, 0, function(){setPosition(0);});
		} else {
			setPosition(speed);
		}
		
		// Preloads images within a rel group
		if (settings.preloading && $related.length>1) {
			prev = index > 0 ? $related[index-1] : $related[$related.length-1];
			next = index < $related.length-1 ? $related[index+1] : $related[0];
			nextSrc = $(next).data(colorbox).href || next.href;
			prevSrc = $(prev).data(colorbox).href || prev.href;
			
			if(isImage(nextSrc)){
				$('<img />').attr('src', nextSrc);
			}
			if(isImage(prevSrc)){
				$('<img />').attr('src', prevSrc);
			}
		}
	};

	load = function () {
		var height, width, href, loadingElement;

		element = $related[index];
		settings = $(element).data(colorbox);
		process();
		$.event.trigger(cbox_load);
		
		// Evaluate the height based on the optional height and width settings.
		height = settings.height ? setSize(settings.height, 'y') - loadedHeight - interfaceHeight : false;
		width = settings.width ? setSize(settings.width, 'x') - loadedWidth - interfaceWidth : false;
		href = settings.href || element.href;
	
		$loadingOverlay.show();
		$loadingGraphic.show();
		$close.show();
		
		//Re-evaluate the maximum dimensions based on the optional maxheight and maxwidth.
		if(settings.maxHeight){
			maxHeight = settings.maxHeight ? setSize(settings.maxHeight, 'y') - loadedHeight - interfaceHeight : false;
			height = height && height < maxHeight ? height : maxHeight;
		}
		if(settings.maxWidth){
			maxWidth = settings.maxWidth ? setSize(settings.maxWidth, 'x') - loadedWidth - interfaceWidth : false;
			width = width && width < maxWidth ? width : maxWidth;
		}
		
		maxHeight = height;
		maxWidth = width;
		
		if (settings.inline) {
			$('<div id="cboxInlineTemp" />').hide().insertBefore($(href)[0]).bind(cbox_load+' '+cbox_close, function(){
				$loaded.children().insertBefore(this);
				$(this).remove();
			});
			dimensions($(href).wrapAll('<div/>').parent());
		} else if (settings.iframe) {
			dimensions($("<div><div id='cboxIframeTemp' /></div>"));
		} else if (settings.html) {
			dimensions($('<div/>').html(settings.html));
		} else if (isImage(href)){
			loadingElement = new Image();
			loadingElement.onload = function(){
				loadingElement.onload = null;
				
				if((maxHeight || maxWidth) && settings.resize){
					var width = this.width,
					height = this.height,
					percent = 0,
					that = this,
					setResize = function(){
						height += height * percent;
						width += width * percent;
						that.height = height;
						that.width = width;	
					};
					if( maxWidth && width > maxWidth ){
						percent = (maxWidth - width) / width;
						setResize();
					}
					if( maxHeight && height > maxHeight ){
						percent = (maxHeight - height) / height;
						setResize();
					}
				}
				dimensions($("<div />").css({width:this.width, height:this.height}).append($(this).css({width:this.width, height:this.height, display:"block", margin:"auto", border:0}).attr('id', 'cboxPhoto')));
				if($related.length > 1){
					$(this).css({cursor:'pointer'}).click(next);
				}
				if($.browser.msie && $.browser.version == 7){
					this.style.msInterpolationMode='bicubic';
				}
			};
			loadingElement.src = href;
		} else {
			$('<div />').load(href, function(data, textStatus){
				if(textStatus === "success"){
					dimensions($(this));
				} else {
					dimensions($("<p>Request unsuccessful.</p>"));
				}
			});
		}	
	};

	//navigates to the next page/image in a set.
	next = function () {
		index = index < $related.length-1 ? index+1 : 0;
		load();
	};
	
	prev = function () {
		index = index > 0 ? index-1 : $related.length-1;
		load();
	};

	slideshow = function () {
		var stop, timeOut, className = 'cboxSlideshow_';
		
		$slideshow.bind(cbox_close, function(){
			clearTimeout(timeOut);
			$slideshow.unbind();
		});
		
		function start(){
			$slideshow
			.text(settings.slideshowStop)
			.bind(cbox_complete, function(){
				timeOut = setTimeout(next, settings.slideshowSpeed);
			})
			.bind(cbox_load, function(){
				clearTimeout(timeOut);	
			}).one("click", function(){
				stop();
				$(this).removeClass(hover);
			});
			$cbox.removeClass(className+"off").addClass(className+"on");
		}
		
		stop = function(){
			clearTimeout(timeOut);
			$slideshow
			.text(settings.slideshowStart)
			.unbind(cbox_complete+' '+cbox_load)
			.one("click", function(){
				start();
				timeOut = setTimeout(next, settings.slideshowSpeed);
				$(this).removeClass(hover);
			});
			$cbox.removeClass(className+"on").addClass(className+"off");
		};
		
		if(settings.slideshow && $related.length>1){
			if(settings.slideshowAuto){
				start();
			} else {
				stop();
			}
		}
	};
	
	/* 
	 * 关闭Dialog, 默认transition为elastic, 关闭时以600ms时间长度动画缩放关闭;如果transition显示设置为fade,则以渐隐动画关闭对话框
	 * call_back: 关闭Dialog窗口之后要执行的function, 以字符串参数传入
	 * delayTime: 延迟时间执行call_back,单位为ms,默认延迟700ms执行call_back
	 * 在iframe窗口里面调用下面格式关闭Dialog对话框: parent.$.fn.Dialog.Close("reload()",1000);]
	 */
	Close = function (call_back, delay_time) {
		call_back = (call_back==null?"":call_back);
		delay_time = (delay_time==null?700:delay_time);
		
		close();
		
		if(call_back != ""){
			setTimeout("eval("+call_back+")",delay_time);
		}
	};
	
	//jQuery静态方法关闭弹出框
	$.Close = Close;

	//public function for closing colorbox.  To use this within an iframe use the following format: parent.$.fn.colorbox.close();
	close = function () {

		$("#cboxIframe").attr("src","about:blank");
		$.event.trigger(cbox_close);
		open = false;
		
		$().unbind('keydown', cbox_key).unbind("keydown.cbox_close");
		$window.unbind('resize.cbox_resize resize.cboxie6 scroll.cboxie6');
		$overlay.css({cursor:'auto'}).fadeOut('fast');
		
		$content.children().hide();

		
		if (settings.transition === 'fade') {
			$cbox
			.stop(true, false)
			.removeClass()
			.fadeOut('fast', function(){
				$loaded.remove();
				$cbox.css('opacity',0.2);
				$.event.trigger(cbox_closed);
			});
		}else{
			closeDialog(600);
		}

		if(callback) {
		    callback();
		}
		//settings.href="about:blank";
	};
	
	/***************************************************************************************************/
	/*****  DOM元素拖动和缩放: $("#ID").Drag("#dragDom").Resize(),可带参数，参数表示拖动或缩放所作用的对象   *****/
	/***************************************************************************************************/
	
	/*
	* 设置DOM元素可拖动和缩放,使用格式: $("#DOM").Drag().Resize();
	* 第一个参数表示缩放或者拖动的DOM元素里的某一个元素, 例如:
	* <div id="DOM"><div id="drag"></div></div>
	* $("#DOM").Drag("#drag"): 表示在DOM的div层里只有鼠标放在id为drag的div层上时才能拖动DOM层
	* 第二个参数表示是否设置该DOM元素的css：position的属性，不传值时默认将该元素设为relative.
	* 在页面调用该拖动函数时不用设置第二个参数
	*/
	$.fn.Drag=function(h, resetPosition){
		if(resetPosition == null){
			this.css("position","relative");
		}
		return i(this,h,'d');
	};
	$.fn.Resize=function(h){
		return i(this,h,'r');
	};
	$.DnR={dnr:{},e:0,
	drag:function(v){
	 if(M.k == 'd')E.css({left:M.X+v.pageX-M.pX,top:M.Y+v.pageY-M.pY});
	 else E.css({width:Math.max(v.pageX-M.pX+M.W,0),height:Math.max(v.pageY-M.pY+M.H,0)});
	  return false;},
	  stop:function(){E.css('opacity',M.o);$().unbind('mousemove',J.drag).unbind('mouseup',J.stop);}
	};
	var J=$.DnR,M=J.dnr,E=J.e,
	i=function(e,h,k){return e.each(function(){h=(h)?$(h,e):e;
	 h.bind('mousedown',{e:e,k:k},function(v){var d=v.data,p={};E=d.e;
	 // attempt utilization of dimensions plugin to fix IE issues
	 if(E.css('position') != 'relative'){try{E.position(p);}catch(e){}}
	 M={X:p.left||f('left')||0,Y:p.top||f('top')||0,W:f('width')||E[0].scrollWidth||0,H:f('height')||E[0].scrollHeight||0,pX:v.pageX,pY:v.pageY,k:d.k,o:E.css('opacity')};
	 E.css({opacity:1});$().mousemove($.DnR.drag).mouseup($.DnR.stop);
	 return false;
	 });
	});},
	f=function(k){return parseInt(E.css(k))||false;};

	/************************************************************************************************/

	// Create Public Methods
	dialogMethod = $.fn.Dialog;
	dialogMethod.Close = Close;
	dialogMethod.init = init;
	dialogMethod.next = next;
	dialogMethod.prev = prev;
	dialogMethod.load = load;
	dialogMethod.position = position;
	dialogMethod.dimensions = dimensions;
	dialogMethod.element = function(){ return element; };
	dialogMethod.settings = defaults;
	
	// Create Confirm Methods
	confirmMethod = $.fn.Confirm;
	confirmMethod.Close = Close;
	
	// Create Confirm Methods
	promptMethod = $.fn.Prompt;
	promptMethod.Close = Close;

	// Initializes ColorBox when the DOM has loaded
	$(function () {
		//判断浏览器是否IE,如果是IE给body标签赋值class等于ie,在jQDialog.css中给body.ie再调用相关的css处理
		if ($.browser.msie){ 
			$("body").attr("class","ie");
		}
		init();
	});

}(jQuery));
