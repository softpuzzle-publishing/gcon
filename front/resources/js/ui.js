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
        el.item = el.find(".col");
        el.itemEl = el.item.find("> div > a");

        el.itemEl.on("mouseenter focus click", function (e) {
            e.preventDefault();
            $(this).closest(".col").siblings().removeClass("hover");
            $(this).closest(".col").addClass("hover");
        });
        el.item.on("mouseleave", function () {
            el.item.removeClass("hover");
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
        $("#header-block").load("../../../content/_include/header.html");
        $("#footer-block").load("../../../content/_include/footer.html");

        // 개발시 setTimeout은 빼고 Header.init(); 호출 필요
        setTimeout(function () {
            Header.init();
        }, 50);

        $('[data-toggle="tooltip"]').tooltip();

        $('.like a').on('click', function (e) {
            e.preventDefault();
            $(this).closest('.like').toggleClass('active');
        });
    });
})(jQuery);