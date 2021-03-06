var Header = Header || {};

+
(function ($) {
    "use strict";

    Header.el = {};
    Header.init = function () {
        Header.default();
        Header.nav();
        Header.top();
    };
    Header.default = function () {
        Header.el = Header.el || {};
        Header.el.win = $(window);
        Header.el.html = $("html");
        Header.el.body = $("body");
        Header.el.dim = $(".dim");
        Header.el.headerBlock = $("#header-block");
        Header.el.header = $("#header");
        Header.el.content = $("#content-block");
        Header.el.footer = $("#footer-block");
        Header.el.nav = $("#nav");
        Header.el.top = $(".btn-top");

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
            // if(Header.el.win.width() < Header._win._wLimit) return;
            Header._scrollTop = Header.el.win.scrollTop();
            if (Header._scrollTop > 0) {
                if (!el.hasClass("active")) el.addClass("active");
            } else {
                if (el.hasClass("active")) el.removeClass("active");
            }
        };
    };

    Header.nav = function () {
        var el = Header.el.nav;
        el.item = el.find("> ul > li");
        el.itemEl = el.find("> ul > li > div > a");

        el.itemEl.on("mouseenter focus click", function (e) {
            $(this).closest("li").siblings().removeClass("hover");
            $(this).closest("li").addClass("hover");
        });
        el.item.on("mouseleave", function () {
            el.item.removeClass("hover");
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

        //file name
        $('input[type="file"]').change(function(e){
            var fileName = e.target.files[0].name;
            $(this).next('.custom-file-label').html(fileName);
        });
    });
})(jQuery);