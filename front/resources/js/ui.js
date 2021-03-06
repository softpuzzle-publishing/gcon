var Header = Header || {};

+
(function ($) {
    "use strict";

    Header.el = {};
    Header.init = function () {
        Header.default();
        Header.nav();
        Header.sidebar();
        Header.top();
        Header.sitemap();
		Header.bottom();
    };
    Header.default = function () {
        Header.el = Header.el || {};
        Header.el.win = $(window);
        Header.el.html = $("html");
        Header.el.body = $("body");
        Header.el.dim = $(".dim");
        Header.el.headerBlock = $("#header-block");
        Header.el.header = $("#header");
        Header.el.sidebar = $("#sidebar");
        Header.el.content = $("#content-block");
        Header.el.footer = $("#footer-block");
        Header.el.nav = $("#nav");
        Header.el.btnSitemap = $("#btn-sitemap");
        Header.el.top = $(".btn-top");
        Header.el.btnSidebar = $(".sidebar-toggler");
		Header.el.bottom = $(".header-bottom");

        Header._win = Header._win || {};
        Header._top = Header._top || {};
        Header._nav = Header._nav || {};

        Header._win._wLimit = 992;
        Header._elHeight = Header.el.header.height();

        var agent = navigator.userAgent.toLowerCase();
        if ((navigator.appName === "Netscape" && agent.indexOf("trident") !== -1) || agent.indexOf("msie") !== -1) {
            Header.el.html.addClass("ie11");
        }
    };

    Header.top = function () {
        var el = Header.el.top;
        if (el.length === 0) return;
        el.El = el.find("a");
        el.El.on("click", function (e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 500);
        });
        Header._top.resize = function () {
            Header._top.scroll();
        };
        Header._top.scroll = function () {
            Header._scrollTop = Header.el.win.scrollTop();
            if (Header._scrollTop > 0) {
                if (!el.hasClass("active")) el.addClass("active");
            } else {
                if (el.hasClass("active")) el.removeClass("active");
            }
        };
        $(window).scroll(function(){
            if(Header.el.top.length > 0) Header._top.scroll();
        });
    };

    Header.bottom = function () {
    	var el = Header.el.bottom;
    	var elTop = $('.header-bottom').offset().top;
    	Header._top.scroll = function () {
            Header._scrollTop = Header.el.win.scrollTop();
            if (Header._scrollTop >= elTop) {
                if (!el.hasClass("fixed")) el.addClass("fixed");
            } else {
                if (el.hasClass("fixed")) el.removeClass("fixed");
            }
        };
        $(window).scroll(function(){
            if(Header._scrollTop > 0) Header._top.scroll();
            console.log('el:'+elTop);
            console.log('win:'+Header.el.win.scrollTop());
        });
    }
	
    Header.nav = function () {
        var el = Header.el.nav;
        el.item = el.find(".col");
        el.itemEl = el.item.find("> div > a");

        el.itemEl.on("mouseenter focus click", function (e) {
            //e.preventDefault();
            $(this).closest(".col").siblings().removeClass("hover");
            $(this).closest(".col").addClass("hover");
        });
        el.item.on("mouseleave", function () {
            el.item.removeClass("hover");
        });

        $('.sitemap .container').append(el.find('.row').clone());

        $('#header .menu .dropdown > a').on("mouseenter focus", function (e) {
            $(this).siblings('.dropdown-menu').addClass('show');
        });
        $('#header .menu').on("mouseleave", function (e) {
            $('#header .menu .dropdown-menu').removeClass('show');
        });
        $('#header .menu .dropdown-menu a:last-child').on("focusout", function (e) {
            $('#header .menu .dropdown-menu').removeClass('show');
        });
    };

    Header.sidebar = function () {
        var el = Header.el.sidebar;
        el.item = el.find(".depth1");
        el.itemEl = el.item.find("> li > a");

        el.itemEl.on("click", function () {
            $(this).closest("li").toggleClass("active");
        });

        Header.el.btnSidebar.on("click", function () {
            Header.el.html.toggleClass("open-sidebar");
        });

        $("#dim").on("click", function () {
            Header.el.btnSidebar.click();
        });
    };

    Header.sitemap = function () {
        var el = Header.el.btnSitemap;
        Header.sitemap._isListOpen = false;

        el.on("click", function () {
            Header.sitemap.viewList(Header.sitemap._isListOpen);
        });

        Header.sitemap.viewList = function (b) {
            var bool = b ? b : false;
            if (!bool) {
                if (!Header.sitemap._isListOpen) {
                    Header.sitemap._isListOpen = true;
                    el.addClass("active");
                    Header.el.html.addClass("open-sitemap");
                }
            } else {
                if (Header.sitemap._isListOpen) {
                    Header.sitemap._isListOpen = false;
                    el.removeClass("active");
                    Header.el.html.removeClass("open-sitemap");
                }
            }
        };

        Header.el.win.on("click", function (e) {
            if (!$(e.target).is("#btn-sitemap") && $(e.target).parents("#btn-sitemap").length === 0 && !$(e.target).is(".sitemap") && $(e.target).parents(".sitemap").length === 0) {
                Header.sitemap.viewList(true);
            }
        });
    };

   

    $(document).ready(function () {
        // 퍼블리싱 include
        // 개발시 삭제 필요
        $("#header-block").load("../../content/_include/header.html");
        $("#footer-block").load("../../content/_include/footer.html");

        // 개발시 setTimeout은 빼고 Header.init(); 호출 필요
        setTimeout(function () {
            Header.init();
        }, 50);

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

        $('.like a').on('click', function (e) {
            e.preventDefault();
            $(this).closest('.like').toggleClass('active');
        });

        

    });

})(jQuery);