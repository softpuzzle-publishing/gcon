var Team_list = {

    /** 초기 로딩시 실행 */
    init: function() {

        /* dataTable 생성 */
        this.makeDataTable();

        $('.board_top').hide();

        /** 이벤트 발생 */
        this.event();

    },

    /** 이벤트 발생 */
    event: function(){
        $("#searchWord").keydown(function (key) {
            if (key.keyCode == 13) {
            	Team_list.makeDataTable();
            }
        });

        /** 검색하기 */
        $('#searchBtn').on('click', function(){
            Team_list.makeDataTable();
        });

        /** 신규등록 */
        $('#newTeam').on('click', function(){
            location.href='/front/community/teamForm';
        });

    },

    /* dataTable 생성 */
    makeDataTable: function() {
        $('#tableBox').empty();

        //dataTable
        this.dataTable = dataTableRender('tableBox', '/front/community/selectTeamList', this.makeSearchParameter, this.makeColModel());

        // 몇개씩 보이기창 hide
        $('.listing_select').addClass('text-right');
        $('.total_num').css('position', 'absolute');
    },

    /** Model 컬럼명 설정 */
    makeColModel : function() {
        /* 그리드 컬럼 */
        var colModel = [
            {
                label: '번호',
                formatter: function(idx, dataList) {
                    return idx;
                }
            },
            {
                label: '진행상태',
                name : 'ctStatus',
                sort : 'CT_STATUS',
                formatter: function(idx, dataList) {
                    switch (dataList.ctStatus) {
                    case "S":
                        return "모집예정";
                        break;
                    case "I":
                        return "모집중";
                        break;
                    case "C":
                        return "모집종료";
                        break;
                    }
                }
            },
            {
                label: '제목',
                formatter: function(idx, dataList) {
                    return '<a href="/front/community/teamView?ctIdx=' + dataList.ctIdx + '">' + dataList.ctSubject + '</a>';
                }
            },
            {
                label: '등록자명',
                formatter: function(idx, dataList) {
                    return dataList.uNm
                }
            },
            {
                label: '조회수',
                name : 'ctViewCount',
                sort : 'CT_VIEW_COUNT',
                formatter: function(idx, dataList) {
                    return dataList.ctViewCount.PrtComma()
                }
            },
            {
                label: '작성일',
                name : 'ctCreateTime',
                sort : 'CT_CREATE_TIME',
            },
        ];
        return colModel;
    },

    /**
     * 데이터 테이블 검색조건
     */
    makeSearchParameter: function() {
        return{
            searchTerms: $('#searchTerms option:selected').val(),
            searchWord: $('#searchWord').val(),
        }
    },

}