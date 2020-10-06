<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<!DOCTYPE html>
<html>
<head>

<%@ include file="/WEB-INF/jsp/front/common/meta.jsp" %>

<title>gcon</title>

<script src="/front/plugins/jquery/jquery.min.js"></script>

<script>
$(function () {
    alert('${msg}');
    var url = '${url}';
    if (!url) {
        url = '/';
    }
    parent.top.location.href = url;
});
</script>
</head>

<body>

</body>

</html>