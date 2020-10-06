$(document).ready(function () {
    login_eventBind();
    
    //베이직 swiper
    if($('.banners .swiper-slide').length > 0){
        $('.banners').show();
        var swiperVisual = new Swiper('.banners .swiper-container', {
        	autoplay: {
        		delay: 2000
        	},
            pagination: {
                el: '.swiper-pagination-banners',
                type: 'bullets',
                clickable: true
            },
        });
    }
    
    loginAdvertisement();
});

function login_eventBind() {
    $('#btnFindPw').on('click', function () {
        $('.modal').modal('hide');
        $('#modalPassword').modal('show');
    });

    //로그인 클릭
    $('#loginBtn').click(function () {
        login();
    });

    //아이디 찾기 및 비밀번호 찾기 모달 팝업: 사용자 종류에 따라서, 이름 및 휴대전화의 placeholder 표시 변경
    $('#modalId, #modalPassword').on('shown.bs.modal', function (e) {
        $form = $(this).find('form');
        changePlaceholderByUserType($form, $(this).find(':radio[name="uType"]:checked').val());
    });

    //아이디 찾기 및 비밀번호 찾기 모달 팝업: 사용자 종류에 따라서, 이름 및 휴대전화의 placeholder 표시 변경
    $('#uFindForm :radio[name="uType"], #uFindFormPw :radio[name="uType"]').change(function () {
        $form = $(this).closest('form');
        changePlaceholderByUserType($form, this.value);
    });
}

function loginAdvertisement() {
    
    /** AD06 --> 로그인존 광고상품 */
    var params = {'searchType': 'AD06'};
    
    $.ajax({
        url: '/front/contest/selectAdvertisementADList',
        type : 'post',
        data : params,
        dataType: 'json',
        success: function(data) {
            
            if (data.result) {
                
                for (var i = 0; i < data.dataList.length; i++) {
                    if ( data.dataList[i].cfFilePath != '' && data.dataList[i].cfFilePath != null) {
                        $('.banners img').eq(i).attr('src', UPLOAD_PATH + data.dataList[i].cfFilePath );
                        $('.banners img').eq(i).attr('alt', data.dataList[i].aCNm );
                    }
                }
            }
        },
    });
}

/**
 * 로그인
 * @returns
 */
function login() {
    var id = $.trim($('#uId').val()); //로그인 아이디
    var pw = $.trim($('#uPw').val()); //로그인 패스워드

    if ( !id ) { //로그인 아이디 미입력
        alert('이메일을 입력해 주세요');
        $('#uId').focus();
    } else if ( !pw ) { //로그인 패스워드 미입력
        alert('비밀번호를 입력해 주세요');
        $('#uPw').focus();
    } else { //로그인 정보 모두 입력
//        if ($('#idSave').is(':checked')) {
//            $.cookie('ikea_loginId', id, {
//                expires : 30
//            });
//        } else {
//            $.cookie('ikea_loginId', '', {
//                expires : 30
//            });
//        }
        //로그인 체크
        var form = $('<form>');
        
        var param = {
            uId : id, 
            uPw : pw
        };
        
        for (var key in param) {
            var hidden = $('<input>', {
                type   : 'hidden',
                name   : key, 
                value  : param[key]
            });
            
            hidden.appendTo(form);
        }
        
        if ( $('input:checkbox[id=\'saveId\']').is(':checked') ) { //로그인 정보 저장 체크
            setCookie('gcontestFrontloginId',id, 1); //로그인 정보 1일 유효
        } else {
            deleteCookie('gcontestFrontloginId'); //쿠키 정보 삭제
        }
        
        //로그인 정보 취득
        $.ajax({
            url : '/front/doLogin',
            type : 'POST',
            data : form.serialize(),
            dataType : 'json',
            async : false,
            success : function(data, textStatus, xhr) {
                if ( data.result ) {
                    //TODO : 로그인 후 이동 URL
                    location.href = '/';
                } else {
                    alert(data.message);
                    $('#validateMsg').show();
                }
            }
        });
    }
    return false;
}

function findEmail() {
    var form = $('#uFindForm');

    $.ajax({
        url: '/front/user/findEmail',
        type: 'POST',
        data: form.serialize(),
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            if (data.result) {
                $('#modalPassword').modal('hide');
                $('#modalPasswordResult').modal('show');
                $('#uFindForm #uBusinessNo').val('');
                $('#uFindForm #uId').val('');
                $('#uFindForm #uNm').val('');
                $('#uFindForm #uTelNo').val('');
                $('#uFindForm #uPhoneNo').val('');
            }
            if (data.code != undefined) {
                $('#findedId').html(data.uNm + ' 님의 이메일은 <br><strong class="text-secondary">' + data.code + '</strong> <br>입니다.');
                $('.modal').modal('hide');
                $('#modalIdResult').modal('show');
            } else if (data.message != undefined) {
                alert(data.message);
            }
        }
    });
}

function findEmailPw() {
    var form = $('#uFindFormPw');

    $.ajax({
        url: '/front/user/find',
        type: 'POST',
        data: form.serialize(),
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            if (data.result) {
                $('#modalPassword').modal('hide');
                $('#modalPasswordResult').modal('show');

                $('#uFindFormPw #uId').val('');
                $('#uFindFormPw #uNm').val('');
                $('#uFindFormPw #uTelNo').val('');
                $('#uFindFormPw #uPhoneNo').val('');
            }
            if (data.message != undefined) {
                alert(data.message);
            }
        }
    });
}

/**
 * 쿠키 값 설정
 * @param name 쿠키 키
 * @param value 쿠키 값
 * @param expiredays 쿠키 값 기한
 * @returns
 */
function setCookie(name, value, expiredays) {
    var today = new Date();
    today.setDate(today.getDate() + expiredays);
    document.cookie = name + '=' + escape(value) + '; path=/; expires=' + today.toGMTString() + ';'
}

/**
 * 쿠키 값 취득
 * @param name 쿠키 키
 * @returns
 */
function getCookie(name) { 
    var cName = name + '='; 
    var x = 0; 
    while ( x <= document.cookie.length ) 
    { 
        var y = (x+cName.length); 
        if ( document.cookie.substring( x, y ) == cName ) 
        { 
            if ( (endOfCookie=document.cookie.indexOf( ';', y )) == -1 ) 
            endOfCookie = document.cookie.length;
            return unescape( document.cookie.substring( y, endOfCookie ) ); 
        } 
        x = document.cookie.indexOf( ' ', x ) + 1; 
        if ( x == 0 ) 
            break; 
    } 
    return ''; 
}

/**
 * 쿠키 삭제
 * @param name 쿠키 키
 * @returns
 */
function deleteCookie( name ) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/**
 * 아이디 찾기 및 비밀번호 찾기 모달 팝업: 사용자 종류에 따라서, 이름 및 휴대전화의 placeholder 표시 변경
 * @param $formEl
 * @param userType
 * @returns
 */
function changePlaceholderByUserType($formEl, userType) {
    $formEl.find('[name="uPhoneNo"]').attr('placeholder', '휴대전화 (숫자만 입력)');
    $formEl.find('[name="uNm"]').attr('placeholder', '이름');
    if (userType == 'COMPANY') {
        $formEl.find('[name="uNm"]').attr('placeholder', '담당자 이름');
        $formEl.find('[name="uPhoneNo"]').attr('placeholder', '담당자 휴대전화 (숫자만 입력)');
    }
}
