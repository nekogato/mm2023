var scrollArr = [];

if (!("ontouchstart" in document.documentElement)) {
document.documentElement.className += " no-touch";
}

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();


function getQueryParams(name) {
	qs = location.search;
 
	var params = [];
	var tokens;
	var re = /[?&]?([^=]+)=([^&]*)/g;
 
	while (tokens = re.exec(qs))
	{ 
		if (decodeURIComponent(tokens[1]) == name)
		params.push(decodeURIComponent(tokens[2]));
	}
 
	return params;
 }
 


function doscroll(){
	
	
	var scrolltop = $(window).scrollTop();
	var hh = $(window).height();
	
	if(scrolltop>100){
		$(".header").addClass("nottop")
		$(".header_bg").addClass("nottop")
	}else{
		$(".header").removeClass("nottop")
		$(".header_bg").removeClass("nottop")
	}


	var home_section1_h = $(".home_section1").outerHeight();
	var header_h = $(".header_bg").outerHeight();
	/*
	if(scrolltop> home_section1_h + header_h - hh){
		$(".cover_table_wrapper").addClass("abs")
		if(home_section1_h+header_h>hh){
			$(".cover_table_wrapper").css({
				height:home_section1_h - (home_section1_h-hh)+"px",
				top: home_section1_h - hh +"px"
			})
		}else{
			$(".cover_table_wrapper").css({
				height:"100%",
				top: "0px"
			})
		}
		
	}else{
		$(".cover_table_wrapper").removeClass("abs")
		$(".cover_table_wrapper").css({
			height:"100%",
			top: "0px"
		})
	}
	*/
	
	$(".doscroll").each(function(){
		var $this = $(this);
		var mytop = $this.offset().top;
		var myh = $this.height();
		
		
		var dis = (scrolltop+hh)-mytop;
		
		
		if(dis>0 && dis<hh+myh){
			
			
			$this.addClass("onscreen");
		
			//console.log( Math.round((scrolltop/(mytop+myh))*100)/100);
			$this.find(".offset").each(function(){
				var childheight = parseInt($(this).css("height"));
				var range = Math.round($(this).attr("data-offset")*(hh/2)*10000)/10000;
				var factor = Math.round(((mytop-scrolltop+myh)/(hh+myh)-0.5)*10000)/10000;
				var ratio = Math.round((childheight/hh)*10000)/10000;
				
				if($(".mobile_show").is(":visible")){
				//range = range/2;
				}
				
				var scalefactor = 1
				
				//$(this).attr("data-range",range)
				//$(this).attr("data-height",range/2+myh)
				//$(this).attr("data-childheight",childheight)
				
				if($(this).hasClass("center_image")){
					if(range/2+myh>childheight){
						//$(this).attr("data-problem","yes")
						scalefactor=Math.round(((range/2+myh)/childheight)*100)/100;
					}else{
						//$(this).attr("data-problem","no")
						
					}
				}
				
				$(this).css({
					"transform": "translateY(" + parseInt(-1*range*factor) + "px) scale("+scalefactor+")",
				})
				
				
				$(this).parent().css({
					"opacity": 1
				})
				
				
			});
			
		}else{
			
			$this.removeClass("onscreen");
		}
		
		
	});
	
	
	if(scrolltop>hh/2){
		$(".fix_right").addClass("mhide");
	}else{
		$(".fix_right").removeClass("mhide");
	}
	
	$(".scrollin").not($(".scrollin_p .scrollin")).each(function(i){
		var $this = $(this);
		var mytop = $this.offset().top;
		var myh = $this.height();
		
		var dis = (scrolltop+hh)-mytop;

		
		if(dis>0 ){
			$this.removeClass("leavescreen");
			$this.addClass("onscreen");
			/*
			if(dis<hh+myh){
				$this.find(".scrollin").removeClass("stop");
			}else{
				$this.find(".scrollin").addClass("stop");
			}
			*/
		}else{
			$this.removeClass("onscreen");
			$this.addClass("leavescreen");
		}
	});

	
	
	$(".scrollin_p").each(function(i){
		var $this = $(this);
		var mytop = $this.offset().top;
		var myh = $this.height();
		
		var dis = (scrolltop+hh)-mytop;
		//$(this).attr("data-dis",scrolltop+","+hh+","+mytop+","+dis)
		if(dis>0){
			
			$this.find(".scrollin").removeClass("leavescreen");
			$this.find(".scrollin").addClass("onscreen");
			/*
			if(dis<hh+myh){
				$this.find(".scrollin").removeClass("stop");
			}else{
				$this.find(".scrollin").addClass("stop");
			}
			*/
		}else{
			$this.find(".scrollin").removeClass("onscreen");
			$this.find(".scrollin").addClass("leavescreen");
			//$this.find(".scrollin").removeClass("stop");
		}
	});
	
	/*
	$(".scrollin_p").each(function(i){
	
		$(this).find(".scrollin.onscreen").not($(".scrollin.onscreen.stop")).each(function(i){
			$(this).css({
				"-webkit-transition-delay": i*150+500+"ms",
				"transition-delay": i*150+500+"ms",
			})
			
			$(this).addClass("startani");
		});
	
	});
	*/
	$(".scrollin.onscreen").not($(".scrollin_p .scrollin")).not($(".scrollin.onscreen.stop")).not($(".startani")).each(function(i){
		$(this).css({
			"-webkit-transition-delay": i*100+100+"ms",
			"transition-delay": i*100+100+"ms",
		})
		
		if($(this).hasClass("moredelay")){
			$(this).css({
				"-webkit-transition-delay": i*100+600+"ms",
				"transition-delay": i*100+600+"ms",
			})
		}
		
		if($(this).hasClass("nodelay")){
			$(this).css({
			"-webkit-transition-delay": 0+"ms",
			"transition-delay": 0+"ms",
			})
		}
		
		$(this).addClass("startani");
	});

	$(".scrollin_p").each(function(){
		$(this).find(".scrollin.onscreen").not($(".scrollin.onscreen.stop")).not($(".startani")).each(function(i){
			$(this).css({
				"-webkit-transition-delay": i*100+100+"ms",
				"transition-delay": i*100+100+"ms",
			})
			
			if($(this).hasClass("moredelay")){
				$(this).css({
					"-webkit-transition-delay": i*100+600+"ms",
					"transition-delay": i*100+600+"ms",
				})
			}
			
			if($(this).hasClass("nodelay")){
				$(this).css({
				"-webkit-transition-delay": 0+"ms",
				"transition-delay": 0+"ms",
				})
			}
			
			$(this).addClass("startani");
		});
	})
	
	
	$(".scrollin.leavescreen").each(function(i){
		$(this).css({
			"-webkit-transition-delay": 0+"ms",
    		"transition-delay": 0+"ms",
		})
		$(this).removeClass("startani");
	});
	
	$(".scrollin.stop").each(function(i){
		$(this).css({
			"-webkit-transition-delay": 0+"ms",
    		"transition-delay": 0+"ms",
		})
		$(this).addClass("startani");
	});

	$(".bottom_logo_section.leavescreen").each(function(i){
		$(this).removeClass("played");
	});
	
	$(".bottom_logo_section.onscreen").each(function(){
		if(!$(this).hasClass("played")){
			logo_animate();
			$(this).addClass("played")
		}
	})
}


function loading_finish(){
	$(".loading").stop().fadeOut(function(){
		
		$("body").addClass("loadfinish");
		doscroll();
	});
}


function init_event(){


	$(".dropdown_btn").click(function(){
			
		if($(".dropdown_btn").hasClass("close")){
			$(".dropdown_btn").removeClass("close");
			$("body").removeClass("openmenu");
			
		}else{
			$(".dropdown_btn").addClass("close");
			$("body").addClass("openmenu");
		}
		return false;
	})

	$(".main_ex_text").click(function(){
		var mytarget = $(this).attr("data-target");
		var $mytarget = $("[data-id='"+mytarget+"']");
		$mytarget.stop().fadeIn();
		$mytarget.find(".scroll_area").scrollTop(0);
	})

	$(".dropdown_content a").click(function(){
		var myhref = $(this).attr("href");
		$(".dropdown_btn").removeClass("close");
		$("body").removeClass("openmenu");
		var mytarget = $(this).attr("data-target");
		var $mytarget = $("[data-id='"+mytarget+"']");

		if(mytarget == "Home"){
			$("body").removeClass("body_user_guide")
			$("body").removeClass("body_test_humanity")
		}else{

			$("body").addClass("body_user_guide")
			$("body").removeClass("body_test_humanity")

			$mytarget.stop().fadeIn();
			$mytarget.find(".scroll_area").scrollTop(0);
			var myindex = $mytarget.index();

			$(".book_wrapper").each(function(){
				if($(this).index()<myindex){
					if($(this).attr("data-prev") !== $(this).attr("data-next")){
						$(this).stop().fadeIn();
						$(this).find(".scroll_area").scrollTop($(this).find(".scroll_area > *").outerHeight());
					}
				}

				if($(this).index()>myindex){
					$(this).stop().fadeOut();
				}
			})

			updateScroll();
		}

		do_pushstate(myhref);

		return false;
	})
}


function do_pushstate(link){

	var obj={
		target:"world"
	}
	
	if (history.pushState) {
		History.pushState(obj, document.title, link);
	} else {
		document.location.link = link;
	}
}

function updateScroll(){
	for ( var i = 0; i < scrollArr.length; i++ ) { 
		scrollArr[i].update();
	}
}


function init_function(){

	$(".scroll_area").each(function () {
		var $this = $(this);

		var $p = $this.parents(".book_wrapper");
		var mynexttarget = $p.attr("data-next");
		var $mynexttarget = $("[data-id='"+mynexttarget+"']");
		var myprevtarget = $p.attr("data-prev");
		var $myprevtarget = $("[data-id='"+myprevtarget+"']");

		var ps  = new PerfectScrollbar($(this)[0],{
			suppressScrollX:true,
			scrollYMarginOffset:20
		});

		scrollArr.push(ps)

		$(this)[0].addEventListener('ps-y-reach-end', function(){
			$p.addClass("reach-end")
			
			// if(mynexttarget){
			// 	console.log("next")
			// 	//$this.stop().fadeOut();
			// 	setTimeout(function(){
			// 		$mynexttarget.stop().fadeIn();
			// 	},1200)
			// }
		});

		$(this)[0].addEventListener('ps-y-reach-start', function(){
			$p.addClass("reach-start")
			// if(myprevtarget){
			// 	console.log("prev")
			// 	$this.stop().fadeOut();
			// 	setTimeout(function(){
			// 		$myprevtarget.stop().fadeIn();
			// 	},1200)
			// }
		});

		$(this)[0].addEventListener('ps-scroll-up', function(){
			$p.removeClass("reach-end")
			console.log("up")
		});

		$(this)[0].addEventListener('ps-scroll-down', function(){
			$p.removeClass("reach-start")
			console.log("down")
		});

		$(this)[0].addEventListener('ps-scroll-y', function(e){
		});

		// Add a wheel event listener to the scrollable container
		$(this)[0].addEventListener('wheel', (event) => {
			if(($this.scrollTop() + $this.height() >= $this.find(">*").height()) && event.deltaY > 0) {
				if(mynexttarget){
					console.log("next")
					console.log(mynexttarget)
					$mynexttarget.stop().fadeIn();
					do_pushstate("?id="+mynexttarget);
					if(mynexttarget==myprevtarget){
						$p.addClass("noscroll").stop().fadeOut(function(){
							$p.removeClass("noscroll");
						});
					}else{
						$mynexttarget.find(".scroll_area").scrollTop(0);
						updateScroll();
					}
				}
			}
			if (($this.scrollTop() <=0) && event.deltaY < 0) {
				if(myprevtarget){
					do_pushstate("?id="+myprevtarget);
					console.log("prev")
					$p.addClass("noscroll").stop().fadeOut(function(){
						$p.removeClass("noscroll");
					});
					$myprevtarget.stop().fadeIn();
					updateScroll();
				}
			}
		});
		
		$(this).scrollTop(0);
		updateScroll();
		
	});
	

	var id = getQueryParams('id');
	if(id=="HumanityTest"){
		$(".test_humanity_btn").click();
	}else if($(".book_wrapper[data-id='"+id+"']").length){
		$(".dropdown_content a[data-target='"+id+"']").click();
	}
}

function dosize(){


	if($(".mobile_show").is(":hidden")){
		
	}else{
	}
}

function dohash(){
	

	var hash = window.location.hash;
	
	if(hash){
		hash= hash.replace("#","");
		
		
		
	}
	
	$(".dropdown_btn.close").removeClass("close")
}


$(function(){
	
	init_event();
	init_function();


});



$.fn.scrollEnd = function(callback, timeout) {          
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};

$(window).scrollEnd(function(){
    $("body").removeClass("doingscroll")
}, 300);

$(window).on('load', function() {
	dosize();
	doscroll();
	loading_finish();
	
	dohash();
	$(window).hashchange( function(){
		dohash();
	})
	
});

$(window).on('resize', function() {
	dosize();
	waitForFinalEvent(function(){
		dosize();
		doscroll();
	}, 300, "some unique string");
});



$(window).on('scroll', function() {
	$("body").addClass("doingscroll")
	doscroll();
	dosize();
});
	