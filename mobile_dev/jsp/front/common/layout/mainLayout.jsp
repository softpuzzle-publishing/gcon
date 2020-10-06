<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
response.setHeader("Cache-Control","no-store");
response.setHeader("Pragma","no-cache");
response.setDateHeader("Expires",0);
if (request.getProtocol().equals("HTTP/1.1"))
    response.setHeader("Cache-Control", "no-cache");
%>
<!DOCTYPE html>
<html>
<head>
<title>gcon</title>

<%@ include file="/WEB-INF/jsp/front/common/meta.jsp" %>
<%@ include file="/WEB-INF/jsp/front/common/style.jsp" %>
<spring:eval expression="@environment.getProperty('service.upload')" var="uploadPath" scope="application" /> <%-- 기본 파일 경로 --%>
<script>var UPLOAD_PATH = '${uploadPath}'; //기본 파일 경로</script>

<sitemesh:write property='head'/>
</head>

<body>
    <div id="wrap">
        <div id="header-block">
            <%@ include file="./header.jsp" %>
        </div>
        <div id="container-block">
            <article class="content">
                <sitemesh:write property='body'/>
            </article>
        </div>
        <div id="footer-block">
            <%@ include file="./footer.jsp" %>
        </div>
    </div>

    <%@ include file="/WEB-INF/jsp/front/common/javascript.jsp" %>

</body>
</html>