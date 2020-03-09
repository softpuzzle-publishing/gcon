$(document).ready(function(){
    $('#header-include').load('../../include/header.html');
    $('#aside-include').load('../../include/aside.html');
    $('#aside-right-include').load('../../include/aside_right.html');
    $('#location-include').load('../../include/location.html');
    $('#footer-include').load('../../include/footer.html');

    $('[data-check="etc"]').on('change',function(){
        if($(this).prop('checked')){
            $($(this).attr('data-match')).show();
        }else{
            $($(this).attr('data-match')).hide();
        }
    });
});