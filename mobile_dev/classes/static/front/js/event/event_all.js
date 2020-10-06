var Event_all = {
        totalCnt: 0,
        searchType: 'allEvent',
        
    /**
     * 초기 로딩시 실행
     */
    init: function () {
        
        eventListClone = $('.eventListClone').clone();
        eventItemClone = $('.eventItemClone').clone();
        
        this.searchType = getParameterByName('searchType');
        
        var clickType = this.searchType;
        $('#' + clickType).addClass('active');
        
        /** 행사/전시 G콘 NOW 랭킹 한번에 모두 받아오기 */
        this.selectEventNowRanking()
        
        /**행사/전시 전체 메인리스트*/
        this.selectEventList(null, 1);
        
        /** 이벤트 */
        this.event()
        
    },

    event: function() {
        
        /** 행삳/전시 상세 모달 */
        $(document).on('click', '.contest-list .img a', function(e){
            e.preventDefault();
            var eIdx = $(this).data().eIdx;
            selectEventDetail(eIdx)
            $('#modalEventView').modal();
        });

        /** 행삳/전시 상세 모달 */
        $(document).on('click', '#rankingForm .rankingClone  a', function(e){
            e.preventDefault();
            var eIdx = $(this).data().eIdx;
            selectEventDetail(eIdx)
            $('#modalEventView').modal();
        });
        
        /** 행사/전시 G콘 NOW 랭킹 마우스 오버 시 */
        $(document).on('mouseover', '._rangking', function() {
            $( "._rangking" ).removeClass('active');
            $(this).addClass('active');
            $( "._li" ).attr('style','display:none');
            var openTag = $(this).attr('data-target');
            $('.'+openTag).attr('style','');
            
        });
        
        /** 행사/전시 전체/인기/종료 구분 리스트 조회 */
        $('._searchType').on('click', function(){
            $( "._searchType" ).removeClass('active');
            $(this).addClass('active');
            var searchType = $(this).attr('data-target');
            /**행사 전시 메인리스트*/
            Event_all.searchType = searchType;
            Event_all.selectEventList(null, 1);
        });
        
        $('#searchBunya, #searchRange').on('change', function() {
            Event_all.selectEventList(); 
        });
        
    },
    
    /** 행사/전시 G콘 NOW 랭킹 한번에 모두 받아오기 */
    selectEventNowRanking: function() {
        
        var rankingClone = $('.rankingClone').clone(); 
        
        var params = {};
        
        $.ajax({
            url: '/front/event/selectEventNowRanking',
            type : 'post',
            data : params,
            dataType: 'json',
            async: false,
            success: function(data) {
                
                if (data.result) {
                    
                    var dataLength = data.eventRankingList.length;
                    
                    if ( dataLength == 0 ) {
                        $('#rankingForm').append('<div class="empty"><p>No data</p></div>');
                    }
                    
                    for (var i = 0; i < dataLength; i++) {
                        
                        switch ( data.eventRankingList[i].resultType ) {
                        case 'view':
                            $('.rankingClone').eq(i).addClass('_li _VIEW');
                            $('.rankingClone span').eq(i).text(data.eventRankingList[i].eViewCount);
                            break;
                        case 'like':
                            $('.rankingClone').eq(i).addClass('_li _LIKE');
                            $('.rankingClone').eq(i).css('display', 'none');
                            $('.rankingClone span').eq(i).text(data.eventRankingList[i].eLikeCount);
                            $('.rankingClone span').eq(i).addClass('like');
                            break;
                        }
                        
                        $('.rankingClone a').eq(i).text(data.eventRankingList[i].eEventNm);
                        $('.rankingClone a').eq(i).data(data.eventRankingList[i]);
                        
                        var ranking = rankingClone.clone()
                        
                        $('#rankingForm').append(ranking);
                        
                    }
                    
                };
                
                $('.rankingClone').last().remove();
                
            },
            error: function()
            {
                console.log('error');
            }
        });
        
    },
    
    /**행사/전시 전체 메인리스트*/
    selectEventList: function(dkanrjsk, pageNo) {
        
        $('#eventListForm').empty();
        $('#eventListForm').append(eventListClone.removeAttr( 'style' ).clone());
        
        var params = {'searchType': Event_all.searchType, 'pageNo': pageNo, 'pageSize': 15, 'searchBunya': $('#searchBunya').val(), 'searchRange': $('#searchRange').val() };
        
        $.ajax({
            url: '/front/event/selectEventList',
            type : 'post',
            data : params,
            dataType: 'json',
            async: false,
            success: function(data) {
                
                if (data.result) {
                    
                    var tempCount = 0;
                    var dataLength = data.eventList.length;
                    Event_all.totalCnt = data.eventListCnt;
                    
                    if ( dataLength == 0 ) {
                        $('#eventListForm').append('<div class="empty"><p>No data</p></div>');
                    }
                    
                    for (var i = 0; i < dataLength; i++) {
                        if ( data.eventList[i].cfFilePath != null ) {
                            $('.eventItemClone img').eq(i).attr('src', UPLOAD_PATH + data.eventList[i].cfFilePath);
                            $('.eventItemClone img').eq(i).attr('alt', data.eventList[i].eEventNm);
                        }
                        $('.eventItemClone .img a').eq(i).data(data.eventList[i]);
                        $('.eventItemClone .eEventNm').eq(i).text(data.eventList[i].eEventNm);
                        $('.eventItemClone .date').eq(i).text(data.eventList[i].ePeriodStD + ' ~ ' + data.eventList[i].ePeriodEdD);
                        var eDDayNum = Number(data.eventList[i].eDDay);
                        if (eDDayNum > 0) {
                            $('.eventItemClone .eDDay').eq(i).text('마감');
                        }
                        else if (eDDayNum == 0) {
                            $('.eventItemClone .eDDay').eq(i).text('D-Day');
                        } else {
                            $('.eventItemClone .eDDay').eq(i).text('D' + data.eventList[i].eDDay);
                        }
                        $('.eventItemClone .eLikeCount').eq(i).text(data.eventList[i].eLikeCount);
                        if ( data.eventList[i].elIdx != '' && data.eventList[i].elIdx != null ) {
                            $('.eventItemClone .like').eq(i).addClass('active');
                        }
                        
                        if ( i % 5 == 4 && i != (dataLength - 1) ) {
                            
                            var eventList = eventListClone.clone();
                            
                            $('#eventListForm').append(eventList);
                            
                            tempCount++;
                            
                        } else {
                            
                            var eventItem = eventItemClone.clone()
                            
                            $('.eventListClone').eq(tempCount).append(eventItem);
                            
                        }
                        
                    }
                    
                };
                
                $('.eventItemClone').last().remove();
                
                //_paging(총건수, 다시요청할 펑션, 요청한 페이지, 페이지HTML넣은곳 ID, 리스트출력 건수, 페이지 버튼 출력 건수);
                _paging(Event_all.totalCnt, Event_all.selectEventList, pageNo, null, 15, 5);
                
            },
            error: function()
            {
                console.log('error');
            }
        });
        
    },
    
};

$(document).keydown(function(event) {
    if ( event.keyCode == 27 || event.which == 27 ) {
        if($('#modalEventView').is(':visible')){
            $('#modalEventView').modal('toggle');
        }
    }
});
