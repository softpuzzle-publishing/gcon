<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- jquery -->
<script src="/front/plugins/jquery/jquery.min.js"></script>
<!-- jquery ui -->
<script src="/front/plugins/jquery-ui/jquery-ui.min.js"></script>
<!-- bootstrap -->
<script src="/front/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- swiper -->
<script src="/front/plugins/swiper-5.2.1/js/swiper.min.js"></script>
<!-- moment -->
<!-- <script src="/plugins/moment/moment.min.js"></script> -->
<script src="/front/plugins/moment/moment-with-locales.min.js"></script><script>moment.locale('ko');</script>
<!-- date-range-picker -->
<script src="/front/plugins/daterangepicker/daterangepicker.js"></script>
<!-- ckeditor -->
<script src="/front/plugins/ckeditor/ckeditor.js"></script>
<!-- ui 관련 -->
<script src="/front/js/ui.js"></script>

<script src="<c:url value='/front/js/common/common.js'/>"></script>
<script src="<c:url value='/front/js/common/validator.js'/>"></script>
<script src="<c:url value='/front/js/common/control.js'/>"></script>
<script src="<c:url value='/front/js/common/dateUtils.js'/>"></script>
<script src="<c:url value='/front/js/common/fileUtils.js'/>"></script>

<!-- 추가 JS -->
<script src="/front/js/common/datatable_forBS4.js"></script>
<script src="/front/js/additional.js"></script>
<script>"object"==typeof Header&&(Header.init,1)&&Header.init();</script>
<script src="/front/js/join/modalJoin.js"></script> <%-- 회원 가입 모달 용 JS --%>

<script>
/* 메뉴 활성화 표시 */
(function () {
    var $currentMenuEl = $('#nav a[href="' + location.pathname + location.search + '"]');
    $currentMenuEl.parents('li').addClass('active');
})();
</script>
<script src="<c:url value='${jsName}'/>"></script>
<script>
$(function(){
    if (typeof ${jsObjName} == 'object' && typeof ${jsObjName}.init == 'function') {
        ${jsObjName}.init();
    }
});
</script>