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

		if($('.modal').scrollTop() > 55){
			$('.btn-top').addClass('active');
		}else{
			$('.btn-top').removeClass('active');
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
		var idx = $('.gnb .active').index();
        var swiperGnb = new Swiper('.gnb .swiper-container', {
			initialSlide: idx,
            slidesPerView: 'auto',
			freeMode: true,
            slidesOffsetBefore: 10,
            slidesOffsetAfter: 10,
        });
	}
};

var Common = {
	init : function(){
		this.scrolling();
		this.common();
	},
	scrolling : function(e){

	},
	common : function(){
		if($('.tab-category').length > 0){
			var idx = $('.tab-category .active').index();
			var swiperTab = new Swiper('.tab-category .swiper-container', {
				initialSlide: idx,
				slidesPerView: 'auto',
				freeMode: true,
				slidesOffsetBefore: 10,
				slidesOffsetAfter: 10,
			});
		}

		if($('.category-area').length > 0){
			var swiperCategory = [];
			var idx = $('.category-area .active').index();
            $('.category-area .swiper-container').each(function(i){
                swiperCategory[i] = new Swiper($(this)[0], {
					initialSlide: idx,
                    slidesPerView: 'auto',
                    freeMode: true,
                    spaceBetween: 8,
                    slidesOffsetBefore: 20,
                    slidesOffsetAfter: 20,
                });
            });
        }

        $('[data-toggle="tooltip"]').tooltip();

        //체크박스 전체선택 - data-group 으로 묶어주기
        $('[data-event=allcheck]').on('change',function(){
            var group = $(this).data('group');
            console.log(group);
            if ($(this).prop('checked')) {
                $('[data-group=' + group + ']:not([data-event=all-check])').prop('checked', true);
            } else {
                $('[data-group=' + group + ']:not([data-event=all-check])').prop('checked', false);
            }
        });

        //라디오 선택시 타겟 영역 toggle
        $('input[type=radio]').on('change',function(){
            var group = $(this).attr('name');
            if($(this).is('[data-match]')){
                $('[name=' + group + ']').each(function(){
                    var allgroup = $(this).attr('data-match');
                    $('[data-group=' + allgroup + ']').hide();
                });
                $('[data-group=' + $(this).attr('data-match') + ']').show();
            }
        });

        //2020.08.06. sykim: 개별 함수에서 직접 구현했기 때문에 주석 처리
        /*
        $('.like a').on('click', function (e) {
            e.preventDefault();
            $(this).closest('.like').toggleClass('active');
        });
        */
	}
};

//썸네일 채우기
function setDirection(element) {
	if (element.naturalWidth / element.naturalHeight / element.parentNode.offsetWidth * element.parentNode.offsetHeight > 1) {
		element.classList.remove('vertical');
		element.classList.add('horizontal');
	} else {
		element.classList.remove('horizontal');
		element.classList.add('vertical');
	}
}

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