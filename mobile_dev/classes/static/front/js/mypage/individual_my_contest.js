var Individual_my_contest = {

    params : {
        "pageNo" : 0
    },
    /**
     * 초기 로딩시 실행
     */
    init: function () {

        $('#li_mycontest').addClass('active'); // 마이페이지 해당 페이지 버튼 활성화

        // 테이블 값 설정
        Individual_my_contest.params.renderBase = $( '#renderBase' );
        Individual_my_contest.params.renderRow = $( '#renderSubject' ).removeAttr( 'style' ).detach();


        // 히스토리 백으로 안힌 페이지 설정
        var has = window.location.hash;
        var startPage = 1;
        if(has.length > 0) {
            var strArray = has.split('|');
            startPage= strArray[1];
        }
        window.location.hash = '';
        // 초기 데이터출력
        this.search(null,startPage);

    },
    search: function (idName,pageNo) {
        Individual_my_contest.pageNo = pageNo;
        Individual_my_contest.params.pageNo = pageNo;
        Individual_my_contest.params.renderBase.empty();
        //알림센터 취득
        $.ajax({
            url : '/front/mypage/selectJoinContest',
            type : 'POST',
            data : {'pageNo':pageNo,'pageSize': 5},
            dataType : 'json',
            async : false,
            success : function(datas, textStatus, xhr) {
                if(datas.result){

                    // 해당 페이지에 데이터가 없을 시 앞 페이지를 다시 요청함. (예시: 4페이지를 열었는데, 데이터가 없는 경우, 3페이지 데이터를 로드)
                    if(pageNo -1 != 0 && datas.dataList.length == 0){
                        Individual_my_contest.search(null,pageNo -1);
                        return;
                    }

                    for(var i = 0; i < datas.dataList.length; i ++){
                        var _row = Individual_my_contest.params.renderRow.clone().attr("id","");
                        var data = datas.dataList[i];
                        _row.find('.subject').text(data.cbContestNm);
                        _row.find('.host').text(data.cnHostNm);
                        _row.find('.contest-thumb').data(data);
                        _row.find('.thumb img').attr('src',UPLOAD_PATH+data.cfFilePath);
                        _row.find('.thumb img').attr('alt',data.cbContestNm);
                        $(_row.find('td')[1]).text(data.cbPeriodStDt.substring(0, 11) + '~' +data.cbPeriodEdDt.substring(0, 11));
                        $(_row.find('td')[2]).text(data.rmCreateTime.substring(0, 11));
                        $(_row.find('td')[3]).text(data.receiptTp);
                        $(_row.find('td')[4]).find('.btn').data(data);
                        $(_row.find('td')[5]).find('.btn').data(data);


                        Individual_my_contest.params.renderBase.append(_row);
                    }

                    $('.contest-thumb a').on('click',function(e){
                        e.preventDefault();

                    });


                    //selectContestDetail()
                    $('._godetail').on('click',function(e){
                        var data = $(this).data();
                        Individual_my_contest.nextPage('',Individual_my_contest.pageNo,data.rIdx);
                    });

                    $('._goReceipt').on('click',function(e){
                        var data = $(this).data();
                        $('#_cbContestNm').html(data.cbContestNm);
                        $('#chHost').html(data.cnHostNm);
                        $('#rIdx').html(data.rIdx);
                        $('#rmCreateTime').html(data.rmCreateTime);
                        $('#cnBunyaNm').html(data.cnBunyaNm);
                        $('#uNms').html(data.uNms);
                        $('#_now').html(new Date().format("yyyy년 MM월 dd일"));

                        $('#modalReceipt').modal();
                    });

                    $('.contest-thumb').on('click',function(e){
                        var data = $(this).data();
                        resetContestDetail();
                        $('#modalContestView').modal();
                        selectContestDetail(data.cIdx);

                    });


                    //_paging(총건수, 다시요청할 펑션, 요청한 페이지, 페이지HTML넣은곳 ID, 리스트출력 건수, 페이지 버튼 출력 건수);
                    _paging(datas.totalCnt, Individual_my_contest.search, pageNo, null, 5, 5);

                }else{
                    alert("처리중 오류가 발생하였습니다. 다시 시도해주세요.");
                }
            },
            error:function(){
                $('#btnCerNum').attr("disabled", false);
                alert("처리중 오류가 발생하였습니다. 다시 시도해주세요.");
            }
        });

        return false;
    },
    nextPage: function (type,pageNo,idx){

        window.location.hash = '#'+type+"|"+pageNo;
        window.location.href = "/front/receipt/receipt_confirm?isCompleted=T&rIdx="+idx;
    },
    print : function (DivID) {
        $('._exceptDiv').hide();
        var disp_setting="toolbar=yes,location=no,";
        disp_setting+="directories=yes,menubar=yes,";
        disp_setting+="scrollbars=yes,width="+$('#'+DivID+' .modal-body').width()+", height="+$('#'+DivID+' .modal-body').height()+", left=100, top=25";
           var content_vlue = $('#'+DivID+ ' .modal-body').clone();
           content_vlue.find('._exceptDiv').detach();
           var docprint=window.open("","",disp_setting);
           docprint.document.open();
           docprint.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"');
           docprint.document.write('"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">');
           docprint.document.write('<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">');
           docprint.document.write('<head>');
           docprint.document.write('<link rel="stylesheet" href="/front/css/bootstrap.css">');
           docprint.document.write('<link rel="stylesheet" href="/front/plugins/jquery-ui/jquery-ui.min.css">');
           docprint.document.write('<link rel="stylesheet" href="/front/css/style.css">');
           docprint.document.write('</head>');
           docprint.document.write('<body onLoad="self.print()" style="min-width:400px;">');
           docprint.document.write('    <div id="wrap">');
           docprint.document.write(content_vlue.html());
           docprint.document.write('    </div>');
           docprint.document.write('</body>');
           docprint.document.write('</html>');
           docprint.document.close();
           docprint.focus();
           $('._exceptDiv').show();
    },
    makeImg :  function (DivID){

        $('._exceptDiv').hide();

        function saveAs(uri, filename) {
            var link = document.createElement('a');
            if (typeof link.download === 'string') {
            link.href = uri;
            link.download = filename;

            //Firefox requires the link to be in the body
            document.body.appendChild(link);

            //simulate click
            link.click();

            //remove the link when done
            document.body.removeChild(link);
            } else {
                window.open(uri);
            }

            $('._exceptDiv').show();
        }

        html2canvas($("#"+DivID), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                document.body.appendChild(canvas);

                // Convert and download as image
                saveAs(canvas.toDataURL(), 'imgae.jpg');
                // Clean up
                //document.body.removeChild(canvas);
            }
        });
    }
};
