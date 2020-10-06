var Front_main = {
    /**
     * 초기 로딩시 실행
     */
    init: function () {

        /** 공지 리스트 취득 (2개) */
        //this.selectNewestNoticeList();

        /** 메인페이지 카운트 취득 ( 개최 콘테스트, 현재 회원 수, 누적 시상금 ) */
        //this.selectMainCount();

        /** 메인 베너광고 리스트 취득 */
        this.selectAdvertisementList();

        /** 최근등록 콘테스트 리스트 (5개) 취득 */
        this.selectNewestContest();

        /** 최근등록 행사/전시 리스트 (5개) 취득 */
        this.selectNewestEvent();

        /** 포트폴리오 리스트 취득 */
        //this.selectPortfolioList();

        /** 팝업 */
        //this.popup();

        /** 페이지 이벤트 */
        this.eventBind();
    },

    /** 페이지 이벤트 */
    eventBind: function () {

        /** 모달: 포토폴리오 상세 이미지 페이지 */
        $(document).on('click', '#gfolioListForm .gfolioListClone a', function(e){
            e.preventDefault();
            $('#modalFolioView').modal();
            $('#modalFolioViewTitle').html($(this).find('img').attr('alt'));
            if ( $(this).find('img').attr('alt') != '' ) {
                $('#modalImg').attr('src', $(this).find('img').attr('src'));
                $('#modalImg').attr('alt', $(this).find('img').attr('alt'));
            }
        });

        /** 모달: 상세 이미지 꺼질 때 디폴트 이미지로 변경 */
        $(document).on('hidden.bs.modal', '#modalFolioView' , function(){
            $('#modalImg').attr('src', '/front/images/temp/@poster_lg.jpg');
            $('#modalImg').attr('alt', '');
        });

        /** 모달: 베너광고 콘테스트 상세 팝업 */
        $(document).on('click', '#contestProductForm .contestProductClone a', function(e){
            e.preventDefault();
            /** 콘테스트 코드/ */
            var cIdx = $(this).find('.aCIdx').val();
            selectContestDetail(cIdx);
            $('#modalContestView').modal();
        });

        /** 모달: 베너광고 행사/전시 상세 팝업 */
        $(document).on('click', '#eventListForm .eventListClone a', function(e){
            e.preventDefault();
            /** 콘테스트 코드/ */
            var eIdx = $(this).data().eIdx;
            selectEventDetail(eIdx);
            $('#modalEventView').modal();
        });

        /** 모달: 콘테스트 상세 팝업 */
        $(document).on('click', '#contestListForm .contestListClone a', function(e){
            e.preventDefault();
            /** 콘테스트 코드/ */
            var cIdx = $(this).next().val();
            selectContestDetail(cIdx);
            $('#modalContestView').modal();
        });

        /** 팝업닫기 */
        $('.popupMainWrap .close a').on('click',function(){
            $(this).closest('[data-cookie]').hide();
            Front_main.checkPopupLength();
        });

        /** 오늘하루 그만보기 */
        $('.popupMainWrap .today a').on('click',function(){
            var cookiename = $(this).closest('[data-cookie]').data('cookie');
            var num = 1;
            if ( $(this).attr('data-pClose') == '1' ) {
                num = 9999999;
            }
            Front_main.closePopupToday(cookiename, num);
            $(this).closest('[data-cookie]').hide();
            Front_main.checkPopupLength();
        });

    },

    /** 공지 리스트 취득 (2개) */
    selectNewestNoticeList: function() {

        var noticeListClone = $('.noticeListClone').clone();

        var params = {};

        $.ajax({
            url: '/front/main/front_main/selectNewestNoticeList',
            type : 'post',
            data : params,
            dataType: 'json',
            async: false,
            success: function(data) {

                if (data.result) {

                    var dataLength = data.dataList.length;

                    for (var i = 0; i < dataLength; i++) {

                        switch (data.dataList[i].bType) {
                        case 'EV':
                            $('#noticeListForm .noticelink').eq(i).attr('href', '/front/customer/eventDetail?bIdx=' + data.dataList[i].bIdx);
                            break;
                        case 'N':
                            $('#noticeListForm .noticelink').eq(i).attr('href', '/front/customer/noticeDetail?bIdx=' + data.dataList[i].bIdx);
                            break;

                        }

                        $('#noticeListForm .bSubject').eq(i).text(data.dataList[i].bSubject);
                        $('#noticeListForm .bCreateTime').eq(i).text(data.dataList[i].bCreateTime);

                        var noticeList = noticeListClone.clone();
                        $('#noticeListForm').append(noticeList);

                    }

                };

                $('.noticeListClone').last().remove();

            },
            error: function()
            {
                console.log('error');
            }
        });

    },

    /** 메인페이지 카운트 취득 ( 개최 콘테스트, 현재 회원 수, 누적 시상금 ) */
    selectMainCount: function() {

        var params = {};

        $.ajax({
            url: '/front/main/front_main/selectMainCount',
            type : 'post',
            data : params,
            dataType: 'json',
            async: false,
            success: function(data) {

                if (data.result) {

                    $('#totaleContestCnt').text(data.totalcontestCnt.PrtComma())
                    $('#totalUserCnt').text(data.totalIndividualuser.PrtComma())
                    $('#totalPrize').text(data.totalPrize.PrtComma())

                };

            },
            error: function()
            {
                console.log('error');
            }
        });


    },

    /** 메인 베너광고 리스트 취득 */
    selectAdvertisementList: function() {

        var contestProductClone = $('.contestProductClone').clone();

        var params = {'searchType': 'bannerProduct'};

        $.ajax({
            url: '/front/main/front_main/selectAdvertisementList',
            type : 'post',
            data : params,
            dataType: 'json',
            async: false,
            success: function(data) {

                var slidesPerView = 4;

                if (data.result) {

                    switch (data.totalCnt) {
                    case 0:
                        slidesPerView = 0;
                    case 1:
                        slidesPerView = 1;
                        break;
                    case 2:
                        slidesPerView = 2;
                        break;
                    case 3:
                        slidesPerView = 3;
                        break;
                    }

                    for (var i = 0; i < data.totalCnt; i++) {
                        if(data.dataList[i].cfFilePath != null){
                            $('#contestProductForm .contestProductImg').eq(i).attr('src', UPLOAD_PATH + data.dataList[i].cfFilePath);
                        }

                        $('#contestProductForm .aCNm').eq(i).text(data.dataList[i].aCNm);
                        $('#contestProductForm .aUNm').eq(i).text(data.dataList[i].aUNm);
                        $('#contestProductForm .aCIdx').eq(i).val(data.dataList[i].aCIdx);
                        if(data.dataList[i].aDDay < 0) {
                            $('#contestProductForm .aDDay').eq(i).text('D' + data.dataList[i].aDDay);
                        } else {
                            $('#contestProductForm .aDDay').eq(i).text('종료')
                        }
                        $('#contestProductForm .aRequestDt').eq(i).text(data.dataList[i].aRequestStDt + ' ~ ' + data.dataList[i].aRequestEdDt);

                        var contestProduct = contestProductClone.clone();

                        $('#contestProductForm').append(contestProduct);

                    }

                };

                $('.contestProductClone').last().remove();

                var swiperPoster = new Swiper('.poster-list .swiper-container', {
                    autoplay: {
                		delay: 2000
                    },
                    loop: true,
                    loopFillGroupWithBlank: true,
                    slidesPerView: 'auto',
                    freeMode: true,
                    spaceBetween: 20,
                    slidesOffsetBefore: 20,
                    slidesOffsetAfter: 20,
                });

            },
            error: function()
            {
                console.log('error');
            }
        });

    },

    /** 최근등록 콘테스트 리스트 (5개) 취득 */
    selectNewestContest: function() {

        var contestListClone = $('.contestListClone').clone();

        var params = {};

        $.ajax({
            url: '/front/main/front_main/selectNewestContest',
            type : 'post',
            data : params,
            dataType: 'json',
            async: false,
            success: function(data) {

                if (data.result) {

                    var dataLength = data.dataList.length;

                    for (var i = 0; i < dataLength; i++) {

                        $('#contestListForm .cbContestNm').eq(i).text(data.dataList[i].cbContestNm);
                        $('#contestListForm .cnAgentCoNm').eq(i).text(data.dataList[i].cnAgentCoNm);
                        $('#contestListForm .cIdx').eq(i).val(data.dataList[i].cIdx);
                        $('#contestListForm .cdTotalPrize').eq(i).text(Math.round(data.dataList[i].cdTotalPrize / 10000 ).PrtComma() + '만원');
                        if ( data.dataList[i].cDDay < 0) {
                            $('#contestListForm .cDDay').eq(i).text('D' + data.dataList[i].cDDay);
                        } else {
                            $('#contestListForm .cDDay').eq(i).text('종료');
                        }

                        var contestList = contestListClone.clone();
                        $('#contestListForm').append(contestList);

                    }

                };

                /** 콘테스트 리스트 마지막 클론제거 */
                $('.contestListClone').last().remove();

            },
            error: function()
            {
                console.log('error');
            }
        });

    },

    /** 최근등록 행사/전시 리스트 (5개) 취득 */
    selectNewestEvent: function() {

        var contestListClone = $('.eventListClone').clone();

        var params = {};

        $.ajax({
            url: '/front/main/front_main/selectNewestEvent',
            type : 'post',
            data : params,
            dataType: 'json',
            async: false,
            success: function(data) {

                if (data.result) {

                    var dataLength = data.dataList.length;

                    for (var i = 0; i < dataLength; i++) {

                        $('#eventListForm .eSubject').eq(i).text(data.dataList[i].eEventNm);
                        $('#eventListForm .eLocation').eq(i).text(data.dataList[i].eLocation);
                        $('#eventListForm a').eq(i).data(data.dataList[i]);
                        $('#eventListForm .ePeriodD').eq(i).text(data.dataList[i].ePeriodStD + ' ~ ' +data.dataList[i].ePeriodEdD);

                        var contestList = contestListClone.clone();
                        $('#eventListForm').append(contestList);

                    }

                };

                /** 콘테스트 리스트 마지막 클론제거 */
                $('.eventListClone').last().remove();

            },
            error: function()
            {
                console.log('error');
            }
        });

    },

    /** 포트폴리오 리스트 취득 */
    selectPortfolioList: function() {

        var gGolioListClone = $('.gfolioListClone').clone();

        var params = {'startRow': 0, 'endRow': 20};

        $.ajax({
            url: '/front/main/front_main/selectPortfolioList',
            type : 'post',
            data : params,
            dataType: 'json',
            async: false,
            success: function(data) {

                if (data.result) {

                    var dataLength = data.dataList.length;

                    for (var i = 0; i < dataLength; i++) {
                        if(data.dataList[i].gpFilePath != null && data.dataList[i].gpFilePath != "") {
                            $('.cfFilePath').eq(i).attr('src', UPLOAD_PATH + data.dataList[i].gpFilePath);
                            $('.cfFilePath').eq(i).attr('alt', data.dataList[i].gpSubject);
                        } else {
                            $('.cfFilePath').eq(i).attr('src', UPLOAD_PATH + '/back/whiteBack.jpg');
                            $('.cfFilePath').eq(i).attr('alt', '');
                        }
                        switch (data.dataList[i].gpDivsion) {
                        case 'D':
                            $('.ribbon-wrapper').eq(i).append('<div class="ribbon bg-primary">디자인/마케팅</div>')
                            break;
                        case 'E':
                            $('.ribbon-wrapper').eq(i).append('<div class="ribbon bg-danger">행사/전시</div>')
                            break;
                        case 'C':
                            $('.ribbon-wrapper').eq(i).append('<div class="ribbon bg-success">콘테스트</div>')
                            break;

                        }

                        var gFolioList = gGolioListClone.clone();
                        $('#gfolioListForm').append(gFolioList);

                    }

                };

                /** 포트폴리오 리스트 마지막 클론제거 */
                $('.gfolioListClone').last().remove();

              //포트폴리오
                var swiperPortfolio = new Swiper('.portfolio-list .swiper-container', {
                	autoplay: {
                		delay: 2000
                	},
                    slidesPerView: 5,
                    spaceBetween: 15,
                    pagination: {
                        el: '.swiper-pagination-portfolio'
                    },
                    navigation: {
                        nextEl: '.swiper-button-next-portfolio',
                        prevEl: '.swiper-button-prev-portfolio'
                    }
                });

            },
            error: function()
            {
                console.log('error');
            }
        });

    },

    popup: function() {

        var popupItemClone = $('.popupItem').clone();

        var params = {};

        $.ajax({
            url: '/front/main/front_main/selectPopupList',
            type : 'post',
            data : params,
            dataType: 'json',
            async: false,
            success: function(data) {

                if (data.result) {

                    for (var i = 0; i < data.totalCnt; i++) {

                        var popupItem = popupItemClone.clone();

                        $('.popupItem').eq(i).attr( 'data-cookie' , 'c' + data.dataList[i].pIdx );
                        $('.popupItem').eq(i).css( 'width', data.dataList[i].pSizeW + 'px' );
                        $('.popupItem').eq(i).css( 'left', data.dataList[i].pPositionW + 'px' );
                        $('.popupItem').eq(i).css( 'top', data.dataList[i].pPositionH + 'px' );
                        $('.popupItem').eq(i).find('.cont').html( data.dataList[i].pContent );
                        switch (data.dataList[i].pClose) {
                        case '0':
                            $('.popupItem').eq(i).find('.today a').text('오늘 하루 열지 않음');
                            $('.popupItem').eq(i).find('.today a').attr('data-pClose', data.dataList[i].pClose);
                            break;
                        case '1':
                            $('.popupItem').eq(i).find('.today a').text('다시열지않음');
                            $('.popupItem').eq(i).find('.today a').attr('data-pClose', data.dataList[i].pClose);
                            break;
                        }

                        $('#popupForm').append(popupItem);
                    }

                };

                $('.popupItem').last().remove();

                $('[data-cookie]').each(function(){
                    var cookiename = $(this).attr('data-cookie');
                    if(Front_main.getCookie(cookiename)!="Y"){
                        $(".popupMainWrap").show();
                        $('[data-cookie=' + cookiename + ']').show();
                    }
                });
            },
            error: function()
            {
                console.log('error');
            }
        });

    },

    /** 쿠키 확인 */
    getCookie: function(cookieName) {

        cookieName = cookieName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cookieName);
        var cookieValue = '';
        if(start != -1){
            start += cookieName.length;
            var end = cookieData.indexOf(';', start);
            if(end == -1)end = cookieData.length;
            cookieValue = cookieData.substring(start, end);
        }

        return unescape(cookieValue);

    },

    /** 쿠키 셋팅 */
    setCookie: function(cookieName, value, exdays) {

        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
        document.cookie = cookieName + "=" + cookieValue;

    },

    /** 다시 보지 않기 */
    closePopupToday: function(cookiename, num) {

        Front_main.setCookie(cookiename,'Y', num);

    },

    /** 남은 팝업 확인 */
    checkPopupLength: function() {

        if($('[data-cookie]:visible').length == 0){
            $('.popupMainWrap').hide();
        }

    },

};

/* 팝업 */

//function deleteCookie(cookieName){
//    var expireDate = new Date();
//    expireDate.setDate(expireDate.getDate() - 1);
//    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
//}



/* //팝업 */