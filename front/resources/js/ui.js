var Header = Header || {};

+function ($) {
    'use strict';

    Header.el = {};
    Header.init = function() {
        Header.default();
        Header.gnb();
        Header.sidebar();
        Header.top();
    };
    Header.default = function() {
        Header.el = Header.el || {};
        Header.el.win = $(window);
        Header.el.html = $('html');
        Header.el.body = $('body');
        Header.el.dim = $('.dim');
        Header.el.headerBlock = $('#header-block');
        Header.el.header = $('#header');
        Header.el.sidebar = $('#sidebar');
        Header.el.content = $('#content-block');
        Header.el.footer = $('#footer-block');
        Header.el.gnb = $('#gnb');
        Header.el.top = $('.btn-top');
        Header.el.btnSidebar = $('.sidebar-toggler');

        Header._win = Header._win || {};
        Header._top = Header._top || {};
        Header._gnb = Header._gnb || {};

        Header._win._wLimit = 992;
        Header._elHeight = Header.el.header.height();

        var agent = navigator.userAgent.toLowerCase();
        if ((navigator.appName === 'Netscape' && agent.indexOf('trident') !== -1) || (agent.indexOf("msie") !== -1)) {
            Header.el.html.addClass('ie11');
        }
        
        $('[data-datepicker]').datepicker({
            dateFormat: "yy-mm-dd"
        });

        $('[data-timepicker]').mdtimepicker();
    };

    Header.top = function() {
        var el = Header.el.top;
        if(el.length === 0) return;
        el.El = el.find('a');
        el.El.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, 500);
        });
        Header._top.resize = function() {
            Header._top.scroll();
        };
        Header._top.scroll = function() {
            // if(Header.el.win.width() < Header._win._wLimit) return;
            Header._scrollTop = Header.el.win.scrollTop();
            if(Header._scrollTop > 0){
                if(!el.hasClass('active')) el.addClass('active');
            }else{
                if(el.hasClass('active')) el.removeClass('active');
            }
        };
    };

    Header.gnb = function() {
        var el = Header.el.gnb;
        el.item = el.find('.depth1');
        el.itemEl = el.item.find('> li > a');

        el.itemEl.on('mouseenter focus click',function(e){
            e.preventDefault();
            $(this).closest('li').siblings().removeClass('hover');
            $(this).closest('li').addClass('hover');
        });
        el.item.on('mouseleave',function(){
            el.item.find('> li').removeClass('hover');
        });
    };

    Header.sidebar = function() {
        var el = Header.el.sidebar;
        el.item = el.find('.depth1');
        el.itemEl = el.item.find('> li > a');

        el.itemEl.on('click',function(){
            $(this).closest('li').toggleClass('active');
        });

        Header.el.btnSidebar.on('click',function(){
            Header.el.html.toggleClass('open-sidebar')
        });

        $('#dim').on('click',function(){
            Header.el.btnSidebar.click();
        });
    };

    $(document).ready(function() {
       
        // 퍼블리싱 include
        // 개발시 삭제 필요
        $('#header-block').load('../../../content/_include/header.html')
        $('#footer-block').load('../../../content/_include/footer.html')
        $('#location-block').load('../../../content/_include/location.html')

        // 개발시 setTimeout은 빼고 Header.init(); 호출 필요
        setTimeout(function(){
            Header.init();
        },50);
    });
}(jQuery);

// textarea 글자수 체크
function fnChkByte(obj, maxByte, textTarget){
    var str = obj.value;
    var str_len = str.length;

    var rbyte = 0;
    var rlen = 0;
    var one_char = "";
    var str2 = "";

    for (var i = 0; i < str_len; i++) {
        one_char = str.charAt(i);
        if (escape(one_char).length > 4) {
            rbyte += 2; //한글2Byte
        } else {
            rbyte++; //영문 등 나머지 1Byte
        }
        if (rbyte <= maxByte) {
            rlen = i + 1; //return할 문자열 갯수
        }
    }

    if (rbyte > maxByte) {
        alert("메세지는 최대 " + maxByte + "byte를 초과할 수 없습니다.")
        str2 = str.substr(0, rlen); //문자열 자르기
        obj.value = str2;
        fnChkByte(obj, maxByte);
    } else {
        $(textTarget).text(rbyte);
    }
}