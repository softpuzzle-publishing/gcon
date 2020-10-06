var Init = {
	defaults : function(){
		var bodyHeight = 0;
		var bodyWidth = 0;
		var breakpoint;
		this.resize();
		window.addEventListener("resize", this.resize);
	},
	resize : function(){
		Init.getBrowserSize();
		Init.drawBreakPoint();

		Init.breakpoint = window.matchMedia('(min-width:992px)').matches;
		if(!Init.breakpoint){
			$('html').removeClass('is-desktop');
			$('html').addClass('is-mobile');
		}else{
			$('html').removeClass('is-mobile');
			$('html').addClass('is-desktop');
		}

		//setDirection($('.thumb img')[0]);
	},
	getBrowserSize : function(){
		this.bodyHeight = Math.max(
			document.body.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.clientHeight,
			document.documentElement.scrollHeight,
			document.documentElement.offsetHeight
		);
		this.bodyWidth = Math.max(
			document.body.scrollWidth,
			document.body.offsetWidth,
			document.documentElement.clientWidth,
			document.documentElement.scrollWidth,
			document.documentElement.offsetWidth
		);
	},
	drawBreakPoint : function(){
		$('html').attr('data-width',this.bodyWidth);
		$('html').attr('data-height',this.bodyHeight);
	},
};

var Header = {
	init : function(){
		this.scrolling();
		this.side();
		this.gnb();
		window.addEventListener('mousewheel', Header.scrolling);
		window.addEventListener('touchmove', Header.scrolling);
		$(window).scroll(function(){
			Header.scrolling();
		});
	},
	scrolling : function(e){
		var scrollTop = $(window).scrollTop();
		var gnbTop = $('#header').height();
		gnbTop = Number(gnbTop);

		if(scrollTop > 0){
			$('html').addClass('is-scrolled');
		}else{
			$('html').removeClass('is-scrolled');
		}

		if(!$('body').hasClass('body-view')){
			if(scrollTop > $('.header-bottom').position().top){
				$('html').addClass('is-header-fixed');
			}else{
				$('html').removeClass('is-header-fixed');
			}
		}
	},
	side : function(){
		$('.h-btn-menu > a').on('click',function(e){
			e.preventDefault();
			$('html').addClass('open-side');
		});
		$('.side .btn-close > a').on('click',function(e){
			e.preventDefault();
			$('html').removeClass('open-side');
		});

		$('.side-nav .dep1 > li > a').on('click',function(e){
			if($(this).siblings('.dep2').length !== 0){
				e.preventDefault();
				$(this).parent('li').siblings().removeClass('active');
				$(this).parent('li').addClass('active');
			}
		});
	},
    gnb : function(){
        var swiperGnb = new Swiper('.gnb .swiper-container', {
            slidesPerView: 'auto',
			freeMode: true,
			spaceBetween: 20,
            slidesOffsetBefore: 20,
            slidesOffsetAfter: 20,
        });
	}
};

var Common = {
	init : function(){
	}
};

/* 준비 */
$(function() {
	// 퍼블리싱 include
    // 개발시 삭제 필요
    $("#header-block").load("../../content/_include/header.html");
    $("#footer-block").load("../../content/_include/footer.html");

	Init.defaults();

    // 개발시 setTimeout은 삭제
	setTimeout(function(){
		Header.init();
		Common.init();
	},500);

});