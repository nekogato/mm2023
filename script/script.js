var scrollArr = [];
var swiperArr = [];

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
}


function loading_finish(){
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

	// click to open book
	$(".main_ex_text").click(function(){
		var mytarget = $(this).attr("data-target");
		var $mytarget = $("[data-id='"+mytarget+"']");
		$mytarget.stop().fadeIn().addClass("show");
		$(window).resize();
		$mytarget.find(".scroll_area").scrollTop(0);
		setbookposition();
	})

	$(".book_leave_btn").click(function(){
		var $mytarget = $(this).parents(".book_wrapper");
		$mytarget.stop().fadeOut().removeClass("show");
		setbookposition()
	})
	

	$(".dropdown_content a, .mobile_logo").click(function(){
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

			$mytarget.stop().fadeIn().addClass("show");;
			$(window).resize();
			$mytarget.find(".scroll_area").scrollTop(0);
			
			// find book index and hide / show
			var myindex = $mytarget.index();

			$(".book_wrapper").each(function(){
				if($(this).index()<myindex){
					if($(this).attr("data-prev") !== $(this).attr("data-next")){
						$(this).stop().fadeIn().addClass("show");
						$(window).resize();
						$(this).find(".scroll_area").scrollTop($(this).find(".scroll_area > *").outerHeight());
						// $(this).parents(".book_wrapper").addClass('reach-end');
					}
				}

				if($(this).index()>myindex){
					$(this).stop().fadeOut().removeClass("show");
					// $(this).parents(".book_wrapper").removeClass('reach-end');
				}
			})

			updateScroll();
		}

		setbookposition();
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

function setbookposition(){
	if($(".mobile_show").is(":hidden")){
		const rELength = $(".book_wrapper:visible").length;
		$(".book_wrapper:visible").each(function(i){
			$(this).find(".book").attr("data-bottom", 0 + (rELength - i) * 50)
		})

		$(".book_wrapper:visible .book").each(function(){
			var mybottom = $(this).attr("data-bottom");
			$(this).css({
				"bottom": mybottom+"px",
				// "right": mybottom+"px"
			})
		})
	}
}

function updateScroll(){
	for ( var i = 0; i < scrollArr.length; i++ ) { 
		scrollArr[i].update();
	}


	if($(".mobile_show").is(":hidden")){
		// desktop

		$(".book_wrapper.show .book").each(function(){
			$(this).css({
				"top":"0px"
			})
		})

		
		
	}else{
		//mobile
		$(".book_wrapper.show .book").each(function(){
			$(this).css({
				"bottom":"20px"
			})
		})

		$(".book_wrapper.show").each(function(i){
			$(this).find(".book").attr("data-top",70+i*30)
		})

		$(".book_wrapper.show .book").each(function(){
			var mytop = $(this).attr("data-top");
			$(this).css({
				"top":mytop+"px"
			})
		})
	}
}

var scrolltimer;

function init_function(){

	

	$(".project_image_gallery").each(function(i){
		var swiper = new Swiper($(this).find(".swiper-container"), {
            speed: 900,
            loop: true,
            slidesPerView: 1,
            autoplay: {
                delay: 20000,
                disableOnInteraction: false
            },
			pagination: {
				el: $(this).find(".num"),
				clickable: true,
			}
        });
		swiperArr.push(swiper)
	})

	$(".chat_result_box").each(function(i){
		$(this).find(".icon_cover").css({
			"-webkit-transition-delay": i*150+1200+"ms",
			"transition-delay": i*150+1200+"ms",
		})
	})

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
			// $p.addClass("reach-end")
			
			// if(mynexttarget){
			// 	console.log("next")
			// 	//$this.stop().fadeOut();
			// 	setTimeout(function(){
			// 		$mynexttarget.stop().fadeIn();
			// 	},1200)
			// }
		});

		$(this)[0].addEventListener('ps-y-reach-start', function(){
			// $p.addClass("reach-start")
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
		});

		$(this)[0].addEventListener('ps-scroll-down', function(){
			$p.removeClass("reach-start")
		});

		$(this)[0].addEventListener('ps-scroll-y', function(e){
		});

		// Add a wheel event listener to the scrollable container
		// $(this)[0].addEventListener('wheel', (event) => {
		["wheel", "touchmove"].forEach( (eventType) => $(this)[0].addEventListener(eventType, (event) => {
			if(($this.scrollTop() + $this.height() >= $this.find(">*").height() -5 || $this.find(">*").height() - $this.height() < 30) && (event.deltaY == undefined || event.deltaY > 0) ) {
				clearTimeout(scrolltimer);
				// $p.addClass("reach-end")
				if(mynexttarget){
					$p.find(".scrolltonext").addClass("show")
					var progress = parseInt($p.find(".progress").attr("data-progress"));
					progress+=event.deltaY/5;
					$p.find(".progress").attr("data-progress",progress)
					scrolltimer = setTimeout(function(){
						$p.find(".scrolltonext").removeClass("show")
					},300)
					
					if(parseInt($p.find(".scrolltonext .progress").attr("data-progress"))>=parseInt($p.find(".scrolltonext").width())){
						$p.find(".scrolltonext").addClass("ok")
					
						$mynexttarget.stop().fadeIn(function(){
							if(mynexttarget!==myprevtarget){
								$p.find(".scrolltonext").removeClass("show")
								$p.find(".progress").attr("data-progress",0)
								$p.find(".progress").css("width","0px")
								$p.find(".scrolltonext").removeClass("ok")
								setbookposition();
							}
						}).addClass("show");
						$(window).resize();
						do_pushstate("?id="+mynexttarget);
						if(mynexttarget==myprevtarget){
							$p.addClass("noscroll").stop().fadeOut(function(){
								$p.removeClass("noscroll");
								$p.find(".scrolltonext").removeClass("show")
								$p.find(".progress").attr("data-progress",0)
								$p.find(".progress").css("width","0px")
								$p.find(".scrolltonext").removeClass("ok")
								setbookposition();
							}).removeClass("show")
						}else{
							$mynexttarget.find(".scroll_area").scrollTop(0);
							updateScroll();
						}
					}

					// $mynexttarget.stop().fadeIn().addClass("show");
					// $(window).resize();
					// do_pushstate("?id="+mynexttarget);
					// if(mynexttarget==myprevtarget){
					// 	$p.addClass("noscroll").stop().fadeOut(function(){
					// 		$p.removeClass("noscroll");
					// 	}).removeClass("show")
					// }else{
					// 	$mynexttarget.find(".scroll_area").scrollTop(0);
					// 	updateScroll();
					// }
				}
			}
			if (($this.scrollTop() <=0) && (event.deltaY == undefined || event.deltaY < 0)) {
				// $p.addClass("reach-start")
				if(myprevtarget){
					do_pushstate("?id="+myprevtarget);
					$p.addClass("noscroll").stop().fadeOut(function(){
						$p.removeClass("noscroll");
						setbookposition();
					}).removeClass("show")
					$myprevtarget.stop().fadeIn().addClass("show");
					$(window).resize();
					updateScroll();
				}
			}
		})
		);
		
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

	setbookposition();

	if($(".mobile_show").is(":hidden")){
		// desktop
		updateScroll();
		
	}else{
		//mobile
		updateScroll();
	}
	$(".book_project_info").each(function(){
		$(this).height($(this).parents(".book_page_scroll_wrapper").outerHeight()-100);
	})
	
	for ( var i = 0; i < swiperArr.length; i++ ) { 
		swiperArr[i].update();
	}
}



$(function(){
	
	init_event();
	init_function();


});



$(window).on('load', function() {
	dosize();
	doscroll();
	loading_finish();
	
	
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
	