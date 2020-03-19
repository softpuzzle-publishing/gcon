$(document).ready(function(){
    $('#header-include').load('../../include/header.html');
    $('#aside-include').load('../../include/aside.html');
    $('#aside-right-include').load('../../include/aside_right.html');
    $('#location-include').load('../../include/location.html');
    $('#footer-include').load('../../include/footer.html');

    //https://www.daterangepicker.com/
    //single datepicker
    $('[data-event="singleDatepicker"]').daterangepicker({
        singleDatePicker: true,
        locale: {
            format: 'YYYY-MM-DD'
        }
    });
    //range datepicker
    $('[data-event="rangeDatepicker"]').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD'
        }
    });

    //테이블 내 체크박스 전체 선택
    $('[data-check="all"]').on('change',function(){
        if($(this).prop('checked')){
            $(this).closest('.table').find('tbody .custom-checkbox .custom-control-input').prop('checked',true);
        }else{
            $(this).closest('.table').find('tbody .custom-checkbox .custom-control-input').prop('checked',false);
        }
    });

    //기타 라디오 선택시 input toggle
    $('[data-check="etc"]').on('change',function(){
        if($(this).prop('checked')){
            $($(this).attr('data-match')).show();
        }else{
            $($(this).attr('data-match')).hide();
        }
    });

    //날짜 전체 선택
    $('[data-check="allday"]').on('change',function(){
        console.log(1)
        if($(this).prop('checked')){
            $($(this).attr('data-match')).attr('disabled',true);
        }else{
            $($(this).attr('data-match')).attr('disabled',false);
        }
    });
});