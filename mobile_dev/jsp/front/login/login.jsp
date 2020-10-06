<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="com" uri="/WEB-INF/tld/component.tld"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page trimDirectiveWhitespaces="true" %>
<!DOCTYPE html>
<html>
<head>
    <spring:eval expression="@environment.getProperty('service.upload')" var="uploadPath" scope="application" /> <%-- 기본 파일 경로 --%>
    <script>var UPLOAD_PATH = '${uploadPath}';</script>
    <title>gcon</title>
    <%@ include file="/WEB-INF/jsp/front/common/meta.jsp" %>
    <%@ include file="/WEB-INF/jsp/front/common/style.jsp" %>
    <%@ include file="/WEB-INF/jsp/front/common/daumAddress.jsp" %>
</head>

<body class="body-view">  <!-- back 버튼 있는 페이지에 body-view 클래스 필요 -->
    <div id="top">
        <div class="container">
            <div class="back">
                <a href="javascript:window.history.back()"><i class="icon-back"><span class="sr-only">이전으로</span></i></a>
            </div>
        </div>
    </div>
    <div id="login">
        <div class="container">
            <div class="login-wrap">
                <div class="login-body">
                    <div class="logo">
                        <h1><span class="sr-only">gcon</span></h1>
                        <em>로그인</em>
                    </div>
                    <div class="login-form">
                        <form action="">
                            <div class="form-group">
                                <input type="email" class="form-control form-control-lg" placeholder="이메일">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control form-control-lg" placeholder="비밀번호" autocomplete="off">
                            </div>
                            <div class="form-group btn-area">
                                <button type="submit" id="loginBtn" class="btn btn-secondary btn-block btn-lg" onclick="return false;">로그인</button>
                            </div>
                        </form>
                    </div>
                    <ul class="menu">
                        <li><a href="#modalId" data-toggle="modal" data-role="button">아이디 찾기</a></li>
                        <li><a href="#modalPassword" data-toggle="modal" data-role="button">비밀번호 찾기</a></li>
                    </ul>
                    <div class="login-desc">
                        <p>
                            G콘테스트가 처음이신가요? <br>회원가입은 PC에서 가능합니다. <br>
                            무료회원가입으로 더 많은 정보와 혜택을 받으세요. <br>
                            <a href="http://gcontest.co.kr">http://gcontest.co.kr</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- modal : 아이디 찾기 -->
    <div class="modal" tabindex="-1" role="dialog" id="modalId">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">아이디 찾기</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="text-center mb-3">회원가입 시 등록한 정보로 아이디를 찾을 수 있습니다.</p>
                    <form id="uFindForm">
	                    <div class="form-group" >
	                        <input type="text" id="uNm" name="uNm" class="form-control form-control-lg" placeholder="이름">
	                    </div>
	                    <div class="form-group">
	                        <input type="tel" id="uPhoneNo" name="uPhoneNo" class="form-control form-control-lg" placeholder="휴대전화 (숫자만 입력)" >
	                    </div>
	                    <div class="row justify-content-center row-10">
	                        <div class="col-6">
	                            <button type="button" class="btn btn-outline-dark btn-block btn-lg" data-dismiss="modal">취소</button>
	                        </div>
	                        <div class="col-6">
	                            <button type="button" class="btn btn-dark btn-block btn-lg"  onClick="findEmail();return false;">확인</button>
	                        </div>
	                    </div>
	                    <div class="text-center mt-3">
	                        <p class="text-sm">위 정보로 아이디와 비밀번호를 찾을 수 없을 경우, 고객센터로 연락해주세요.</p>
	                    </div>
	                </form>
                </div>
            </div>
        </div>
    </div>

    <!-- modal : 아이디 찾기 결과 -->
    <div class="modal" tabindex="-1" role="dialog" id="modalIdResult">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">아이디 찾기</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="text-alert" id="findedId">

                    </p>
                </div>
                <div class="modal-footer">
                    <div class="col-6">
                        <button type="button" class="btn btn-outline-dark btn-block" data-dismiss="modal">로그인</button>
                    </div>
                    <div class="col-6">
                        <button type="button" class="btn btn-dark btn-block" id="btnFindPw" >비밀번호 찾기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- modal : 비밀번호 찾기 -->
    <div class="modal" tabindex="-1" role="dialog" id="modalPassword">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">비밀번호 찾기</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                <form id="uFindFormPw">
                    <p class="text-center mb-3">계정(이메일)으로 임시 비밀번호를 발급해드립니다.</p>
                    <div class="form-group">
                        <input type="tel" id="uId" name="uId" class="form-control form-control-lg" placeholder="계정(이메일) 입력">
                    </div>
                    <div class="form-group" >
                        <input type="text" id="uNm" name="uNm" class="form-control form-control-lg" placeholder="이름">
                    </div>
                    <div class="form-group">
                        <input type="tel" id="uPhoneNo" name="uPhoneNo" class="form-control form-control-lg" placeholder="휴대전화 (숫자만 입력)" >
                    </div>
                    <div class="row justify-content-center row-10">
                        <div class="col-6">
                            <button type="button" class="btn btn-outline-dark btn-block btn-lg" data-dismiss="modal">취소</button>
                        </div>
                        <div class="col-6">
                            <button type="button" class="btn btn-dark btn-block btn-lg"  onClick="findEmailPw();return false;">확인</button>
                        </div>
                    </div>
                    <div class="text-center mt-3">
                        <p class="text-sm">위 정보로 아이디와 비밀번호를 찾을 수 없을 경우, 고객센터로 연락해주세요.</p>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>

    <!-- modal : 비밀번호 찾기 결과 -->
    <div class="modal" tabindex="-1" role="dialog" id="modalPasswordResult">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">비밀번호 찾기</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="text-alert mt-3">
                        비밀번호를 재설정 하실 수 있는 링크를 <br>이메일로 전송하였습니다.
                    </p>
                </div>
                <div class="modal-footer">
                    <div class="col-5">
                        <button type="button" class="btn btn-dark btn-block" data-dismiss="modal">확인</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <%@ include file="/WEB-INF/jsp/front/common/javascript.jsp" %>
</body>
</html>