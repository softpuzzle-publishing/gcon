/**
 * 이미지 우클릭 방지
 * @param el -
 * @param data
 * @returns
 */
$(window.document).on("contextmenu", function(){
 if(event.target.nodeName == "IMG"){
        return false;
    }
});

/**
 * 파일 등록 처리
 * @param el - 파일 업로드 태그의 ID
 * @param data
 * @returns
 */
function fileUpdateProcess(el, data) {

    var fileGroup = $('#'+el).closest('.custom-file');
    fileGroup.children('.custom-file-label').text(data.fileName);
    fileGroup.children('.fileName').val(data.fileName);
    fileGroup.children('.filePath').val(data.filePath);
    fileGroup.children('.fileSize').val(data.fileSize);

    if(!!data.imgWidth) { //이미지 파일의 경우, 이미지 길이 정보 저장

        fileGroup.children('.fileWidth').val(data.imgWidth);
        fileGroup.children('.fileHeight').val(data.imgHeight);

        if(data.imgWidth > data.imgHeight) { //이미지가 가로가 긴 경우
            fileGroup.children('.fileRate').val('W');
        } else if(data.imgHeight > data.imgWidth) { //이미지가 세로가 긴 경우
            fileGroup.children('.fileRate').val('H');
        } else { //이미지 가로, 세로 길이가 같은 경우
            fileGroup.children('.fileRate').val('D');
        }
    }
}

/** 모두의 콘테스트 좋아요 클릭 */
$(document).on('click', '.contestLike .like a', function(){

    if($('#isLogin').val() == 'false'){
        alert('좋아요는 로그인 후 이용 가능합니다.')
        return;
    }

    var clCIdx = $(this).closest('.box').find('.img a').data('cIdx')
    if( clCIdx == null ) {
        clCIdx = $(this).closest('.box').find('.img a').data('cidx')
    }
    var clUId = $('#contestUserId').val();

    $(this).closest('.like').toggleClass('active');

    if( $(this).closest('.like').hasClass('active') === true ) {
       /** 좋아요 등록 */
       var count = Number($(this).next().text());
       $(this).next().text(count + 1);

       insertContestLike(clCIdx, clUId)
   } else {
       /** 좋아요 제거 */
       var count = Number($(this).next().text());
       $(this).next().text(count - 1);
       deleteContestLike(clCIdx, clUId)
   }
});

/** 콘테스트 팝업 좋아요 클릭 */
$(document).on('click', '#modalContestView .like a', function(){

    if($('#isLogin').val() == 'false'){
        alert('좋아요는 로그인 후 이용 가능합니다.')
        return;
    }

    var clCIdx = $('#modalContestView #contestIdx').val();
    var clUId = $('#contestUserId').val();

    $(this).closest('.like').toggleClass('active');

    if( $(this).closest('.like').hasClass('active') === true ) {
        /** 좋아요 등록 */
        var count = Number($(this).next().text());
        $(this).next().text(count + 1);
        insertContestLike(clCIdx, clUId);
    } else {
        /** 좋아요 제거 */
        var count = Number($(this).next().text());
        $(this).next().text(count - 1);
        deleteContestLike(clCIdx, clUId);
    }
});

/**
 * 콘테스트 좋아요 생성
 * @param clCIdx (콘테스트 코드), clUId (아이디)
 * @returns
 */
function insertContestLike(clCIdx, clUId) {

    var params = {'clCIdx': clCIdx, 'clUId': clUId };

    $.ajax({
        url: '/front/like/insertContestLike',
        type : 'post',
        data : params,
        dataType: 'json',
        async: false,
        success: function(data) {

            if (data.result) {

            };

        },
    });

}

/**
 * 콘테스트 좋아요 제거
 * @param clCIdx (콘테스트 코드), clUId (아이디)
 * @returns
 */
function deleteContestLike(clCIdx, clUId) {

    var params = {'clCIdx': clCIdx, 'clUId': clUId };

    $.ajax({
        url: '/front/like/deleteContestLike',
        type : 'post',
        data : params,
        dataType: 'json',
        async: false,
        success: function(data) {

            if (data.result) {

            };

        },
    });

}

/** 접수 버튼 클릭 */
$(document).on('click', '.cr_a01', function(){

    if( $(this).data().domain != '' && $(this).data().domain != null ){
        gotoTemplateSite($(this).data().domain);
    } else {
        alert('콘테스트 홈페이지 오픈 전입니다. 곧 오픈 예정입니다.');
    }


});

/** 간편접수 버튼 클릭 */
$(document).on('click', '.cr_a02', function(){

    if($('#isLogin').val() == 'false'){
        alert('로그인 후 간편접수 참여 해주세요.')
        return;
    }

    location.href= '/front/receipt/receipt_agree?cIdx=' + $('#modalContestView #contestIdx').val();

});

/** 이메일 접수 버튼 클릭 */
$(document).on('click', '.cr_b01', function(){

    window.open( $(this).data().homepage );

});

/** 이메일 접수 버튼 클릭 */
$(document).on('click', '.cr_b02', function(){

    alert($(this).data().email + '로 접수해주세요.');

});

/** 이메일 접수 버튼 클릭 */
$(document).on('click', '.cr_b03', function(){

    alert($(this).data().addr + '의 주소로 우편접수 또는 방문접수해주세요.');

});

/**
 * 콘테스트 상세 모달 팝업
 * @param cIdx (콘테스트 코드)
 * @returns
 */
function selectContestDetail(cIdx) {

    $('#modalContestView #posterBody').css('min-height', window.innerHeight - ( $('#modalContestView #posterHeader').height() + 250 ) )

    var params = {'cIdx': cIdx};

    $.ajax({
        url: '/front/contest/selectContestDetail',
        type : 'post',
        data : params,
        dataType: 'json',
        async: false,
        success: function(data) {

            if (data.result) {
                if ( data.dataList.cPoster != null ) {
                    $('#cPoster').attr('src', UPLOAD_PATH + data.dataList.cPoster);
                    $('#cPoster').attr('alt', data.dataList.cbContestNm);
                }
                if( data.dataList.cDownloadNotice != null ) {
                    $('#cDownloadNotice').show();
                    $('#cDownloadNotice').attr('href', UPLOAD_PATH + data.dataList.cDownloadNotice);
                    $('#cDownloadNotice').attr('download', data.dataList.cDownloadNoticeNm);
                } else{
                    $('#cDownloadNotice').hide();
                }
                if ( data.dataList.cDownloadApplication != null ) {
                    $('#cDownloadApplication').show();
                    $('#cDownloadApplication').attr('href', UPLOAD_PATH + data.dataList.cDownloadApplication);
                    $('#cDownloadApplication').attr('download', UPLOAD_PATH + data.dataList.cDownloadApplicationNm);
                }else{
                    $('#cDownloadApplication').hide();
                }

                $('#modalContestView #contestIdx').val(data.dataList.cIdx);
                $('#modalContestView .go').empty();
                $('#modalContestView #crTypeCd').empty();
                switch (data.dataList.crTypeCd) {
                case 'CR-A01':
                    $('#modalContestView .go').append('<button class="btn btn-sm cr_a01" data-domain="' + data.dataList.hdDomainId + '">콘테스트 홈페이지</button>');
                    $('#modalContestView #crTypeCd').append('<button class="btn btn-dark btn-block btn-lg cr_a01" data-domain="' + data.dataList.hdDomainId + '">바로 참여하기</button>');
                    break;
                case 'CR-A02':
                    $('#modalContestView .go').append('<button class="btn btn-sm cr_a02">G콘 간편접수</button>');
                    $('#modalContestView #crTypeCd').append('<button class="btn btn-dark btn-block btn-lg cr_a02">간편접수 참여하기</button>');
                    break;
                case 'CR-B01':
                    $('#modalContestView .go').append('<button class="btn btn-sm cr_b01" data-homepage="' + data.dataList.crTypeAddr + '">자체 홈페이지</button>');
                    $('#modalContestView #crTypeCd').append('<button class="btn btn-dark btn-block btn-lg cr_b01" data-homepage="' + data.dataList.crTypeAddr + '">바로 참여하기</button>');
                    break;
                case 'CR-B02':
                    $('#modalContestView .go').append('<button class="btn btn-sm cr_b02" data-email="' + data.dataList.crTypeAddr + '">이메일 접수</button>');
                    $('#modalContestView #crTypeCd').append('<button class="btn btn-dark btn-block btn-lg cr_b02" data-email="' + data.dataList.crTypeAddr + '">이메일 접수</button>');
                    break;
                case 'CR-B03':
                    $('#modalContestView .go').append('<button class="btn btn-sm cr_b03" data-addr="' + data.dataList.crTypeAddr + '">우편/방문접수</button>');
                    $('#modalContestView #crTypeCd').append('<button class="btn btn-dark btn-block btn-lg cr_b03" data-addr="' + data.dataList.crTypeAddr + '">우편/방문접수</button>');
                    break;
                }
                $('.go button').on('click',function(){
                    var data = $(this).find('span').data();
                    if(data.homepage != null){
                        window.open(data.homepage, '_blank'); //새 창으로 열기
                    }
                });

                $('#cbContestNm').text(data.dataList.cbContestNm);
                switch (data.dataList.cStatus) {
                case 'CS01':
                    $('#cStatus').addClass('badge-light');
                    $('#cStatus').text('승인대기');
                    break;
                case 'CS02':
                    $('#cStatus').addClass('badge-primary');
                    $('#cStatus').text('접수예정');
                    break;
                case 'CS03':
                    $('#cStatus').addClass('badge-success');
                    $('#cStatus').text('접수중');
                    break;
                case 'CS04':
                    $('#cStatus').addClass('badge-warning');
                    $('#cStatus').text('마감임박');
                    break;
                case 'CS05':
                    $('#cStatus').addClass('badge-dark');
                    $('#cStatus').text('접수마감');
                    break;
                }
                if ( data.dataList.clIdx != null) {
                    $('#modalContestView .like').addClass('active');
                }
                $('#cnAgentCoNm').text(data.dataList.cnHostNm);

                $('#cbContestBunyaNm').text('');
                if(!!data.dataList.cbContestBunyaNm) {
                    var bunya = data.dataList.cbContestBunyaNm.split(",");
                    var bunyaStr = "";
                    if(bunya.length == 1){
                        bunyaStr = bunya[0];
                    }else if(bunya.length >= 2){
                        bunyaStr = bunya[0] + "," +bunya[1];
                    }
                    if(bunyaStr == ''){
                        $('#cbContestBunyaNm').text(bunyaStr).hide();
                    }else{
                        $('#cbContestBunyaNm').text(bunyaStr).show();
                    }
                } else {
                    $('#cbContestBunyaNm').hide(); //분야 표시 hide
                    $('#cbContestBunyaNm').prev().hide(); //분야 표시 hide
                }

                $('#cbPeriodDt').text(data.dataList.cbPeriodStDt + ' ~ ' + data.dataList.cbPeriodEdDt);
                $('#cLikeCount').text(data.dataList.cLikeCount.PrtComma());
                $('#cViewCount').text(data.dataList.cViewCount.PrtComma());
                var cdContestSchedule = data.dataList.cdContestSchedule;
                if ( cdContestSchedule == '' ) {
                    $('#cdContestSchedule').prev().css('display', 'none')
                    $('#cdContestSchedule').css('display', 'none');
                } else {
                    cdContestSchedule = cdContestSchedule.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    $('#cdContestSchedule').html(cdContestSchedule);
                }
                var cdContestBumun = data.dataList.cdContestBumun;
                if ( cdContestBumun == '' ) {
                    $('#cdContestBumun').prev().css('display', 'none')
                    $('#cdContestBumun').css('display', 'none');
                } else {
                    cdContestBumun = cdContestBumun.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    $('#cdContestBumun').html(cdContestBumun);
                }
                var cdContestTarget = data.dataList.cdContestTarget
                if ( cdContestTarget == '' ) {
                    $('#cdContestTarget').prev().css('display', 'none')
                    $('#cdContestTarget').css('display', 'none');
                } else {
                    cdContestTarget = cdContestTarget.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    $('#cdContestTarget').html(cdContestTarget);
                }
                var cdContestSummary = data.dataList.cdContestSummary
                if ( cdContestSummary == '' ) {
                    $('#cdContestSummary').prev().css('display', 'none')
                    $('#cdContestSummary').css('display', 'none');
                } else {
                    cdContestSummary = cdContestSummary.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    $('#cdContestSummary').html(cdContestSummary);
                }
                var cdParticipation = data.dataList.cdParticipation
                if ( cdParticipation == '' ) {
                    $('#cdParticipation').prev().css('display', 'none')
                    $('#cdParticipation').css('display', 'none');
                } else {
                    cdParticipation = cdParticipation.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    $('#cdParticipation').html(cdParticipation);
                }
                var cdWorkSpec = data.dataList.cdWorkSpec
                if ( cdWorkSpec == '' ) {
                    $('#cdWorkSpec').prev().css('display', 'none')
                    $('#cdWorkSpec').css('display', 'none');
                } else {
                    cdWorkSpec = cdWorkSpec.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    $('#cdWorkSpec').html(cdWorkSpec);
                }
                var cdAwardsHist = data.dataList.cdAwardsHist
                if ( cdAwardsHist == '' ) {
                    $('#cdAwardsHist').prev().css('display', 'none')
                    $('#cdAwardsHist').css('display', 'none');
                } else {
                    cdAwardsHist = cdAwardsHist.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    $('#cdAwardsHist').html(cdAwardsHist);
                }
                var cdContestTel = data.dataList.cdContestTel
                if ( cdContestTel == '' ) {
                    $('#cdContestTel').prev().css('display', 'none')
                    $('#cdContestTel').css('display', 'none');
                } else {
                    cdContestTel = cdContestTel.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    $('#cdContestTel').html(cdContestTel);
                }
                var cdContestNote = data.dataList.cdContestNote
                if ( cdContestNote == '' ) {
                    $('#cdContestNote').prev().css('display', 'none')
                    $('#cdContestNote').css('display', 'none');
                } else {
                    cdContestNote = cdContestNote.replace(/(?:\r\n|\r|\n)/g, '<br />');
                    $('#cdContestNote').html(cdContestNote);
                }

            };

        },
        error: function()
        {
            console.log('error');
        }
    });

}

/** 모달 팝업 종료 시 초기화 */
$(document).on('hidden.bs.modal', '#modalContestView' , function(){
    resetContestDetail();
});

/**
 * 콘테스트 상세 모달 팝업 리셋
 * @param
 * @returns
 */
function resetContestDetail() {

    /** 포스터 디폴트 이미지 경로 */
    $('#modalContestView #contestIdx').val('');
    $('#modalContestView .like').removeClass('active');
    $('#cdContestSchedule').prev().removeAttr("style");
    $('#cdContestSchedule').removeAttr("style");
    $('#cdContestBumun').prev().removeAttr("style");
    $('#cdContestBumun').removeAttr("style");
    $('#cdContestTarget').prev().removeAttr("style");
    $('#cdContestTarget').removeAttr("style");
    $('#cdContestSummary').prev().removeAttr("style");
    $('#cdContestSummary').removeAttr("style");
    $('#cdParticipation').prev().removeAttr("style");
    $('#cdParticipation').removeAttr("style");
    $('#cdWorkSpec').prev().removeAttr("style");
    $('#cdWorkSpec').removeAttr("style");
    $('#cdAwardsHist').prev().removeAttr("style");
    $('#cdAwardsHist').removeAttr("style");
    $('#cdContestTel').prev().removeAttr("style");
    $('#cdContestTel').removeAttr("style");
    $('#cdContestNote').prev().removeAttr("style");
    $('#cdContestNote').removeAttr("style");
    $('#cPoster').attr('src', '/front/images/temp/@poster_lg.jpg');
    $('#cPoster').attr('alt', '포스터가 없습니다.');
    $('#cDownloadNotice').hide();
    $('#cDownloadApplication').hide();
    $('#modalContestView .go').empty();
    $('#modalContestView #crTypeCd').empty();
    $('#cDownloadNotice').attr('href', '');
    $('#cDownloadApplication').attr('src', '');
    $('#cbContestNm').text('-');
    $('#cStatus').removeClass('badge-light');
    $('#cStatus').removeClass('badge-primary');
    $('#cStatus').removeClass('badge-success');
    $('#cStatus').removeClass('badge-warning');
    $('#cStatus').removeClass('badge-dark');
    $('#cStatus').text('-');
    $('#cnAgentCoNm').text('-');
    $('#cbPeriodDt').text('-');
    $('#cbPeriodDt').text('-');
    $('#cLikeCount').text('0');
    $('#cViewCount').text('0');
    $('#cdContestSchedule').text('-');
    $('#cdContestBumun').text('-');
    $('#cdContestTarget').text('-');
    $('#cdContestSummary').text('-');
    $('#cdParticipation').text('-');
    $('#cdWorkSpec').text('-');
    $('#cdAwardsHist').text('-');
    $('#cdContestTel').text('-');
    $('#cdContestNote').text('-');
}

/**
 * 행사/전시 상세 모달 팝업
 * @param eIdx (행사/전시 코드)
 * @returns
 */
function selectEventDetail(eIdx) {

    $('#modalEventView #posterBody').css('min-height', window.innerHeight - ( $('#modalEventView #posterHeader').height() + 250 ) )

    var params = {'eIdx': eIdx};

    $.ajax({
        url: '/front/event/selectEventDetail',
        type : 'post',
        data : params,
        dataType: 'json',
        async: false,
        success: function(data) {

            if (data.result) {
                var dst = new Date(data.eventDetail.ePeriodStD+' '+data.eventDetail.eWeekdayStT);
                var eet = new Date(data.eventDetail.ePeriodEdD+' '+data.eventDetail.eWeekendEdT);
                var _now = new  Date();
                if(dst > _now){
                    // 진행전
                    $('#_badge').html('진행전');
                }else if(eet < _now){
                    // 마감
                    $('#_badge').html('마감');
                }else{
                    // 진행중
                    $('#_badge').html('진행중');
                }

                $('#modalEventView #eventIdx').val(data.eventDetail.eIdx);

                $('#modalEventView #eEventNm').text(data.eventDetail.eEventNm);

                $('#modalEventView #eAgentCoNm').text(data.eventDetail.hostNm);

                $('#modalEventView #eBunyaCd').text('');
                if(data.eventDetail.eBunyaNm !=null){
                    var bunya = data.eventDetail.eBunyaNm.split(",");
                    var bunyaStr = "";
                    if(bunya.length == 1){
                        bunyaStr = bunya[0];
                    }else if(bunya.length >= 2){
                        bunyaStr = bunya[0] + "," +bunya[1];
                    }
                    if(bunyaStr == ''){
                        $('#modalEventView #eBunyaCd').text(bunyaStr).hide();
                    }else{
                        $('#modalEventView #eBunyaCd').text(bunyaStr).show();
                    }

                }

                $('#modalEventView #ePeriodD').text(data.eventDetail.ePeriodStD + ' ~ ' + data.eventDetail.ePeriodEdD);

                if (data.eventDetail.cfFilePath != null) {
                    $('#modalEventView #cfFilePath').attr('src', UPLOAD_PATH + data.eventDetail.cfFilePath);
                    $('#modalEventView #cfFilePath').attr('alt', UPLOAD_PATH + data.eventDetail.eEventNm);
                }

                $('#modalEventView #eLikeCount').text(data.eventDetail.eLikeCount.PrtComma());

                $('#modalEventView #eViewCount').text((Number(data.eventDetail.eViewCount) + 1 ).PrtComma());

                $('#modalEventView #ePeriodDt').text(data.eventDetail.ePeriodStD + ' ~ ' + data.eventDetail.ePeriodEdD);

                $('#modalEventView #eClosedDay').text(data.eventDetail.eClosedDay);

                var eSubject = data.eventDetail.eSubject;
                eSubject = eSubject.replace(/(?:\r\n|\r|\n)/g, '<br />');
                $('#modalEventView #eSubject').html(eSubject);
                if(eSubject != null && eSubject != ''){$('#modalEventView #eSubject_').show()}else{$('#modalEventView #eSubject_').hide()}

                var eSummary = data.eventDetail.eSummary;
                eSummary = eSummary.replace(/(?:\r\n|\r|\n)/g, '<br />');
                $('#modalEventView #eSummary').html(eSummary);
                if(eSummary != null && eSummary != ''){$('#modalEventView #eSummary_').show()}else{$('#modalEventView #eSummary_').hide()}

                $('#modalEventView #eWeekT').html('주중 : ' + data.eventDetail.eWeekdayStT.substring(0, 5) + ' ~ ' + data.eventDetail.eWeekdayEdT.substring(0, 5) + '<br/>주말 : ' + data.eventDetail.eWeekendStT.substring(0, 5) + ' ~ ' + data.eventDetail.eWeekendEdT.substring(0, 5));

                $('#modalEventView #eCost').text(data.eventDetail.eCost.PrtComma() + '원');
                if(data.eventDetail.eCost != null && data.eventDetail.eCost != 0){$('#modalEventView #eCost_').show();$('#modalEventView #eCost').show()}else{$('#modalEventView #eCost_').hide();$('#modalEventView #eCost').hide()}

                var eLocation = data.eventDetail.eLocation;
                eLocation = eLocation.replace(/(?:\r\n|\r|\n)/g, '<br />');
                $('#modalEventView #eLocation').html(eLocation);
                if(eLocation != null && eLocation != ''){$('#modalEventView #eLocation_').show()}else{$('#modalEventView #eLocation_').hide()}

                var eDirections = data.eventDetail.eDirections;
                eDirections = eDirections.replace(/(?:\r\n|\r|\n)/g, '<br />');
                $('#modalEventView #eDirections').html(eDirections);
                if(eDirections != null && eDirections != ''){$('#modalEventView #eDirections_').show()}else{$('#modalEventView #eDirections_').hide()}

                var eInquiry = data.eventDetail.eInquiry;
                eInquiry = eInquiry.replace(/(?:\r\n|\r|\n)/g, '<br />');
                $('#modalEventView #eInquiry').html(eInquiry);
                if(eInquiry != null && eInquiry != ''){$('#modalEventView #eInquiry_').show()}else{$('#modalEventView #eInquiry_').hide()}

                if ( data.eventDetail.eHomepage != '' && data.eventDetail.eHomepage != null ) {
                    //$('#modalEventView .go').append('<button class="btn btn-sm eHomepageMove"><input class="pageUrl" type="hidden" value="' +  data.eventDetail.eHomepage + '">콘테스트 홈페이지</button>')
                    $('#modalEventView .homepage').append('<button class="btn btn-dark btn-block btn-lg eHomepageMove"><input class="pageUrl" type="hidden" value="' +  data.eventDetail.eHomepage + '">자세히보기</button>')
                }
                if ( data.eventDetail.elIdx != '' && data.eventDetail.elIdx != null ) {
                    $('#modalEventView .like').addClass('active');
                }

            }
        },
        error: function()
        {
            console.log('error');
        }
    });

}

$(document).on('click', '.eHomepageMove',function(){
   //location.href = $(this).find('.pageUrl').val();
   window.open($(this).find('.pageUrl').val());
});

/** 모달 팝업 종료 시 초기화 ( 행사/전시 ) */
$(document).on('hidden.bs.modal', '#modalEventView' , function(){
    resetEventDetail();
});

/**
 * 행사/전시 상세 모달 팝업 리셋
 * @param
 * @returns
 */
function resetEventDetail() {

    $('#modalEventView #eEventNm').text('-');
    $('#modalEventView #eAgentCoNm').text('-');
    $('#modalEventView #eBunyaCd').text('-');
    $('#modalEventView #ePeriodD').text('-');
    $('#modalEventView #cfFilePath').attr('src', '/front/images/temp/@poster_lg.jpg');
    $('#modalEventView #cfFilePath').attr('alt', '-');
    $('#modalEventView #eLikeCount').text('0');
    $('#modalEventView #eViewCount').text('0');
    $('#modalEventView #ePeriodDt').text('-');
    $('#modalEventView #eClosedDay').text('-');
    $('#modalEventView #eSubject').text('-');
    $('#modalEventView #eSummary').text('-');
    $('#modalEventView #eWeekT').html('-');
    $('#modalEventView #eCost').text('0원');
    $('#modalEventView #eLocation').text('-');
    $('#modalEventView #eDirections').text('-');
    $('#modalEventView #eInquiry').text('-');
    $('#modalEventView .go').empty();
    $('#modalEventView .homepage').empty();
    $('#modalEventView .like').removeClass('active');

}

/** 모두의 행사/전시 좋아요 클릭 */
$(document).on('click', '.eventLike .like a', function(){

    if($('#isLogin').val() == 'false'){
        alert('좋아요는 로그인 후 이용 가능합니다.')
        return;
    }

    var elEIdx = $(this).closest('.box').find('.img a').data().eIdx;

    var elUId = $('#contestUserId').val();

    $(this).closest('.like').toggleClass('active');

    if( $(this).closest('.like').hasClass('active') === true ) {
       /** 좋아요 등록 */
       var count = Number($(this).next().text());
       $(this).next().text(count + 1);
       insertEventLike(elEIdx, elUId);

   } else {
       /** 좋아요 제거 */
       var count = Number($(this).next().text());
       $(this).next().text(count - 1);
       deleteEventLike(elEIdx, elUId);
   }
});

/** 행사/전시 팝업 좋아요 클릭 */
$(document).on('click', '#modalEventView .like a', function(){

    if($('#isLogin').val() == 'false'){
        alert('좋아요는 로그인 후 이용 가능합니다.')
        return;
    }

    var elEIdx = $('#modalEventView #eventIdx').val();
    var elUId = $('#contestUserId').val();

    $(this).closest('.like').toggleClass('active');

    if( $(this).closest('.like').hasClass('active') === true ) {
        /** 좋아요 등록 */
        var count = Number($(this).next().text());
        $(this).next().text(count + 1);
        insertEventLike(elEIdx, elUId);
    } else {
        /** 좋아요 제거 */
        var count = Number($(this).next().text());
        $(this).next().text(count - 1);
        deleteEventLike(elEIdx, elUId);
    }
});

/**
 * 행사/전시 좋아요 생성
 * @param elEIdx (행사/전시 코드), clUId (아이디)
 * @returns
 */
function insertEventLike(elEIdx, elUId) {

    var params = {'elEIdx': elEIdx, 'elUId': elUId };

    $.ajax({
        url: '/front/like/insertEventLike',
        type : 'post',
        data : params,
        dataType: 'json',
        async: false,
        success: function(data) {

            if (data.result) {

            };

        },
        error: function()
        {
            console.log('error');
        }
    });

}

/**
 * 행사/전시 좋아요 제거
 * @param elEIdx (행사/전시 코드), clUId (아이디)
 * @returns
 */
function deleteEventLike(elEIdx, elUId) {

    var params = {'elEIdx': elEIdx, 'elUId': elUId };

    $.ajax({
        url: '/front/like/deleteEventLike',
        type : 'post',
        data : params,
        dataType: 'json',
        async: false,
        success: function(data) {

            if (data.result) {

            };

        },
        error: function()
        {
            console.log('error');
        }
    });

}

$(document).ready(function () {
    /** 콘테스트, 행사/전시 검색 */
    $('#contestEventSearch').on('click', function () {
        header_contestEventSearch();
    });

    /** 콘테스트, 행사/전시 엔터 검색 */
    $('#headerSearchValue').on('keyup', function (e) {
        if (e.keyCode == 13) {
            header_contestEventSearch();
        }
    });
});

/**
 * [헤더] 콘테스트, 행사/전시 검색
 */
function header_contestEventSearch() {
    var searchType = $('#headerSearchType').val();
    var searchValue = $('#headerSearchValue').val().trim();

    if (searchValue == '') {
        alert('검색어를 입력해 주세요.');
        return;
    } else {
        if (searchType == 'contest') {
            location.href = '/front/main/searchContestResult?searchValue=' + searchValue;
        } else {
            location.href = '/front/main/searchEventResult?searchValue=' + searchValue;
        }
    }
}


/**
 * 파일 정보를 배열에 넣기
 * @param el - 여러 파일 정보를 포함하는 요소명 (e.g. '#contestForm .input-group > .custom-file')
 * @param fileArray - 파일 정보를 넣을 배열 변수명
 * @returns
 */
function addFileInfoToArray(el, fileArray) {

    $(el).each(function(idx, item) {

        var fileList = {};
        var $itemEl = $(item);

        //파일명이 없을 경우 저장하지 않음
        if(!$itemEl.find('.fileName').val()) {
            return;
        }

        fileList.fileType = $itemEl.find('.fileType').val();
        fileList.fileName = $itemEl.find('.fileName').val();
        fileList.filePath = $itemEl.find('.filePath').val();
        fileList.fileSize = $itemEl.find('.fileSize').val();

        //이미지 파일의 경우, 이미지 길이 정보 저장
        if($itemEl.find('.fileWidth').length > 0) {
            fileList.fileWidth = $itemEl.find('.fileWidth').val();
            fileList.fileHeight = $itemEl.find('.fileHeight').val();
            fileList.fileRate = $itemEl.find('.fileRate').val();
        }

        fileArray.push(fileList);
    });
}

/** 이메일 검증 */
function isEmail(Value) {

    /** 검증실패 시 true */
    var result = true;

    /** 이메일 정규식 */
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    /** 검증성 시 false */
    if ( Value.match(regExp) ) {
        result = false;
    }

    return result; // 형식에 맞는 경우 false 리턴

}

/** 연락처 검증 */
function isTel(Value) {

    /** 검증실패 시 true */
    var result = true;

    /** 핸드폰번호 정규식 */
    var regExp1 = /^\d{3}-\d{3,4}-\d{4}$/;
    /** 일반전화번호 정규식 */
    var regExp2 = /^\d{2,3}-\d{3,4}-\d{4}$/;

    /** 검증성 시 false */
    if ( Value.match(regExp1) || Value.match(regExp2) ) {
        result = false;
    }

    return result; // 형식에 맞는 경우 false 리턴

}

/** 연락처 하이픈(-) 추가 */
function addHyphen(value) {
    return value.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,"$1-$2-$3").replace("--", "-");
}

/** 숫자 세자리마다 콤마형식으로 변환 (소수점 포함) */
Number.prototype.PrtComma = function() {

    if (this == 0) return 0;

    var reg = /(^[+-]?\d+)(\d{3})/;
    var n   = (this + '');

    while (reg.test(n))
        n = n.replace(reg, '$1'+','+'$2');

    return n;
}

/** 숫자 세자리마다 콤마형식으로 변환 (소수점 포함) */
Number.prototype.PrtComma = function() {

    if (this == 0) return 0;

    var reg = /(^[+-]?\d+)(\d{3})/;
    var n   = (this + '');

    while (reg.test(n))
        n = n.replace(reg, '$1'+','+'$2');

    return n;
}

/** 문자열을 세자리마다 콤마형식으로 변환 (소수점 포함) */
String.prototype.PrtComma = function() {

    if ($.isNumeric(this) === false) {
        return this;
    }

    var num = parseFloat(this);

    if (isNaN(num)) return "0";

    return num.PrtComma();
}

/** 값이 있는지 없는지 체크함 */
function isNull(str){
	if(str==null || str ==''){
		return true;
	}
	return false;
}


/** 사업자등록번호 썸체크 로직 */
function checkCorporateRegistrationNumber(value) {
    var valueMap = value.replace(/-/gi, '').split('').map(function(item) {
        return parseInt(item, 10);
    });

    if (valueMap.length === 10) {
        var multiply = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5);
        var checkSum = 0;

        for (var i = 0; i < multiply.length; ++i) {
            checkSum += multiply[i] * valueMap[i];
        }

        checkSum += parseInt((multiply[8] * valueMap[8]) / 10, 10);
        return Math.floor(valueMap[9]) === (10 - (checkSum % 10));
    }

    return false;
}

function pad(n, width) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

/** 파라미터 받아오기 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
// var totalData = 1000;    // 총 데이터 수   *******필수******
// 페이지 요청시 다시 요청할 펑션
// 선택한 페이지 :: 값이 없을시 1로 설정함
// 페이지 처리 할 DIV 를 설정함
// 한 페이지에 나타낼 데이터 수 값으 없을시  10 으로 살정함
// 한 화면에 나타낼 페이지 수 값이 없을시 5로 설정함
*/
function _paging(totalData, callBackFunciton , currentPage, idName, dataPerPage, pageCount){

    if(currentPage == undefined || currentPage == null) var currentPage = 1;
    if(idName == undefined || idName == null ) idName = "paging";
    if(dataPerPage == undefined || dataPerPage == null ) dataPerPage = 10;
    if(pageCount == undefined || pageCount == null ) pageCount = 5;
    if(totalData == undefined || totalData == null || totalData == 0)  {
        // 데이터 총수가 없을시 페이징 부분 없애는 처리
        if($("#"+idName).html() != undefined) {
            $("#"+idName).empty();
            $("#"+idName+"_sum").empty();
        }
        return;
    }

    if($("#"+idName).html() == undefined) return;

    var totalPage = Math.ceil(totalData/dataPerPage);    // 총 페이지 수
    var pageGroup = Math.ceil(currentPage/pageCount);    // 페이지 그룹

    if($("#"+idName+"_sum").html() != undefined){
        $("#"+idName+"_sum").html("총"+ totalData+ "건 ("+currentPage +"/"+totalPage+"페이지)");
    }


    var last = pageGroup * pageCount;    // 화면에 보여질 마지막 페이지 번호
    if(last > totalPage)
        last = totalPage;
    var first = last - (pageCount-1);    // 화면에 보여질 첫번째 페이지 번호
    var next = last+1;
    var prev = first-1;

    var html = "";

    if(prev > 0){
        html += '<li class="page-item"><a class="page-link" href="#" id="prev"><i class="fas fa-angle-left"></i></a></li> ';
    }else{
        html += '<li class="page-item"><a class="page-link" href="#" id="__none"  onClick="return false;"><i class="fas fa-angle-left"></i></a></li> ';
    }

    for(var i=first; i <= last; i++){
        if(i > 0){
            html += '<li class="page-item"><a href="#" class="page-link" href="#" id="'+ i +'">' + i +'</a></li>';
        }
    }

    if(last < totalPage){
        html += '<li class="page-item"><a class="page-link" href="#" id="next"><i class="fas fa-angle-right"></i></a></li>';
    }else{
        html += '<li class="page-item"><a class="page-link" href="#" id="__none" onClick="return false;"><i class="fas fa-angle-right"></i></a></li>';
    }

    $("#"+idName).html(html);    // 페이지 목록 생성
    $("#"+idName+" a#" + currentPage).parents().addClass('active');    // 현재 페이지 표시


    $("#"+idName+" a").click(function(){

        var $item = $(this);
        var $id = $item.attr("id");
        var selectedPage = $item.text();

        if($id == "next")    selectedPage = next;
        if($id == "prev")    selectedPage = prev;
        if($id == "__none")    return;

        if( typeof callBackFunciton == 'function' ) {
            callBackFunciton(idName,selectedPage);
        }
        return false;

    });

}

// date format 함수  : Date 내장 객체에 format함수 추가
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
           case "yyyy": return d.getFullYear();
           case "yy": return (d.getFullYear() % 1000).zf(2);
           case "MM": return (d.getMonth() + 1).zf(2);
           case "dd": return d.getDate().zf(2);
           case "E": return weekName[d.getDay()];
           case "HH": return d.getHours().zf(2);
           case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
           case "mm": return d.getMinutes().zf(2);
           case "ss": return d.getSeconds().zf(2);
           case "a/p": return d.getHours() < 12 ? "오전" : "오후";
           default: return $1;
         }
    });};

Date.isLeapYear = function (year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () {
    return Date.isLeapYear(this.getFullYear());
};

Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};

//한자리일경우 앞에 0을 붙여준다.
String.prototype.string = function(len){
    var s = '', i = 0;
    while (i++ < len) { s += this; }
    return s;
};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};


/**
 * 클라이언트 프로젝트로 이동
 * @param url - 이동해야 할 URL
 * @returns
 */
function gotoClientSite(url) {
    if (!url) {
        url = '';
    }
    $.ajax({
        url: '/front/goto/clientSite',
        data: {
            url: encodeURIComponent(url)
        },
        dataType: 'json',
        success: function (data) {
            if (data.result) {
                window.open(data.url, '_blank'); //새 창으로 열기
            }
        }
    });
}


/**
 * 템플릿 프로젝트로 이동
 * @param subdomain - 서브도메인
 * @returns
 */
function gotoTemplateSite(subdomain) {
    $.ajax({
        url: '/front/goto/templateSite',
        data: {
            subdomain: subdomain
        },
        dataType: 'json',
        success: function (data) {
            if (data.result) {
                window.open(data.url, '_blank'); //새 창으로 열기
            }
        }
    });
}

/**
 * CKEditor 이미지 파일 용량 제한
 * @param input
 * @returns
 */
function checkCkFile(input) {
    var url = input.value;
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (!(input.files && input.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg"))) {
        alert("이미지 파일만 넣어주세요.");
        input.value = null;
        return;
    }
    else if (input.files[0].size > 2097152) // 2 mb for bytes.
    {
        alert("2MB 이하로 해주세요.");
        input.value = null;
        return;
    }
}

/**
 * 아이디 및 비밀번호 검증
 * @param pw - 비밀번호
 * @param pw2 - 확인 비밀번호
 * @param id - 아이디
 * @returns
 */
function fn_pw_check(pw, pw2, id) {
    pw_passed = true;


    var pattern1 = /[0-9]/;

    var pattern2 = /[a-zA-Z]/;

    var pattern3 = /[~!@\#$%<>^&*]/;     // 원하는 특수문자 추가 제거

    var pw_msg = "";


    if(id.length == 0) {

           alert("아이디를 입력해주세요");

           return false;

     } else {

            //필요에따라 아이디 벨리데이션

     }

    if(pw.length == 0) {
           alert("비밀번호를 입력해주세요");
           return false;

     } else {
            if( pw  !=  pw2) {
                  alert("비밀번호가 일치하지 않습니다.");
                  return false;
             }
     }


   if(!pattern1.test(pw)||!pattern2.test(pw)||!pattern3.test(pw)||pw.length<8||pw.length>50){
        alert("영문+숫자+특수기호 8자리 이상으로 구성하여야 합니다.");
        return false;
    }

//     if(pw.indexOf(id) > -1) {
//         alert("비밀번호는 ID를 포함할 수 없습니다.");
//         return false;
//     }

//     var SamePass_0 = 0; //동일문자 카운트
//     var SamePass_1 = 0; //연속성(+) 카운드
//     var SamePass_2 = 0; //연속성(-) 카운드

//     for(var i=0; i < pw.length; i++) {
//          var chr_pass_0;
//          var chr_pass_1;
//          var chr_pass_2;
//            if(i >= 2) {
//              chr_pass_0 = pw.charCodeAt(i-2);
//              chr_pass_1 = pw.charCodeAt(i-1);
//              chr_pass_2 = pw.charCodeAt(i);
//                //동일문자 카운트
//              if((chr_pass_0 == chr_pass_1) && (chr_pass_1 == chr_pass_2)) {
//                 SamePass_0++;
//               }
//               else {
//                SamePass_0 = 0;
//                }
//               //연속성(+) 카운드

//              if(chr_pass_0 - chr_pass_1 == 1 && chr_pass_1 - chr_pass_2 == 1) {
//                  SamePass_1++;
//               }
//               else {
//                SamePass_1 = 0;
//               }
//              //연속성(-) 카운드

//              if(chr_pass_0 - chr_pass_1 == -1 && chr_pass_1 - chr_pass_2 == -1) {
//                  SamePass_2++;
//               }
//               else {
//                SamePass_2 = 0;
//               }
//          }
//        if(SamePass_0 > 0) {
//            alert("동일문자를 3자 이상 연속 입력할 수 없습니다.");
//            pw_passed=false;
//          }

//         if(SamePass_1 > 0 || SamePass_2 > 0 ) {
//            alert("영문, 숫자는 3자 이상 연속 입력할 수 없습니다.");
//            pw_passed=false;
//          }
//          if(!pw_passed) {
//               return false;
//               break;
//         }
//     }

    return true;

}

/**
 * (메인 페이지, 모두의 콘테스트, 달력 등에서) 콘테스트 카드의 D-Day 표시 계산
 * @param contestStatus
 * @param compareDay
 * @returns
 */
function displayDdayOnContestCard(contestStatus, compareDay) {
    var dDayVal = ''; //D-Day 표시 용도
    if (contestStatus == 'CS02') {
        dDayVal = '접수예정';
    } else if (Number(compareDay) == 0) {
        dDayVal = 'D-Day';
    } else if (Number(compareDay) < 0) {
        dDayVal = '마감';
    } else {
        dDayVal = 'D-' + compareDay;
    }
    return dDayVal;
}