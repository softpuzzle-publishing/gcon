<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="com" uri="/WEB-INF/tld/component.tld"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ include file="/WEB-INF/jsp/front/common/daumAddress.jsp" %>
<div id="header">
    <div class="header-top">
        <div class="container">
            <div class="h-logo">
                <h1><a href="/front/main/front_main"><span class="sr-only">gcon</span></a></h1>
            </div>
            <div class="h-btn-menu">
                <a href="javascript:;"><i class="icon-hamburger"></i><span class="sr-only">메뉴</span></a>
            </div>
            <div class="h-btn-bell">
                <a href="/front/mypage/notice"><i class="icon-bell"></i><span class="sr-only">알림</span></a>
            </div>
        </div>
    </div>
    <div class="header-bottom">
        <div class="header-search">
            <div class="container">
                <form action="">
                    <fieldset>
                        <legend>검색</legend>
                        <div class="search">
                            <input type="text" id="headerSearchValue" title="검색어 입력" placeholder="어떤 프로젝트를 찾고 계신가요?" class="form-control">
                            <div class="button">
                                <button type="submit" id="contestEventSearch"><i class="icon-search"><span class="sr-only">검색</span></i></button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
        <div class="gnb">
            <nav class="swiper-container">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide active"><a href="/front/contest/all"><span>모두의 콘테스트</span></a></li>
                    <li class="swiper-slide"><a href="/front/event/eventAll?searchType=allEvent"><span>행사/전시회</span></a></li>
                    <li class="swiper-slide"><a href="/front/gfolio/portfolioList"><span>G-폴리오</span></a></li>
                    <li class="swiper-slide"><a href="/front/community/teamList"><span>커뮤니티</span></a></li>
                </ul>
            </nav>
        </div>
    </div>
</div>

<nav class="fixed-menu">
    <ul>
        <li><a href="/front/main/front_main"><span class="icon"><i class="icon-nav-home"></i></span><em>홈화면</em></a></li>
        <li><a href="/front/contest/all"><span class="icon"><i class="icon-nav-trophy"></i></span><em>콘테스트</em></a></li>
        <li><a href="/front/event/eventAll?searchType=allEvent"><span class="icon"><i class="icon-nav-roof"></i></span><em>행사/전시회</em></a></li>
        <li><a href="/front/mypage/notice"><span class="icon"><i class="icon-nav-bell"></i></span><em>알림센터</em></a></li>
    </ul>
</nav>

<div class="side" id="side">
    <div class="side-top">
        <div class="container">
            <div class="home">
                <a href="/front/main/front_main"><i class="icon-home"></i>홈으로</a>
            </div>
            <div class="btn-login">
                <c:if test="${SESSION_KEY_GCONTEST == null}">
                    <a href="/front/login" class="btn btn-secondary btn-round">로그인하기</a>
                    <input type="hidden" id="isLogin" name="isLogin" value="false">
                </c:if>
                <c:if test="${SESSION_KEY_GCONTEST ne null and SESSION_KEY_GCONTEST.uType eq 'COMPANY'}">
                    <a href="/front/logout" class="btn btn-gray btn-round">로그아웃</a>
                    <a href="/front/mypage/myinfo"><i class="icon-"></i><strong>${SESSION_KEY_GCONTEST.uCompany}님</strong></a>
                    <input type="hidden" id="isLogin" name="isLogin" value="true">
                    <input id="contestUserId" type="hidden" value="${SESSION_KEY_GCONTEST.uId}">
                </c:if>

            </div>
            <div class="btn-close">
                <a href="javascript:;"><i class="icon-x"></i><span class="sr-only">닫기</span></a>
            </div>
        </div>
    </div>
    <div class="side-body">
        <nav class="side-nav">
            <ul class="dep1">
                <li class="active"><a href="javascript:;"><span>모두의 콘테스트</span></a>
                    <div class="dep2">
                        <ul>
                            <li class="active"><a href="/front/contest/all"><span>모두의 콘테스트</span></a></li>
                            <li><a href="/front/contest/specific?viewType=ing"><span>진행중 콘테스트</span></a></li>
                            <li><a href="/front/contest/specific?viewType=popular"><span>인기 콘테스트</span></a></li>
                            <li><a href="/front/contest/specific?viewType=imminent"><span>임박 콘테스트</span></a></li>
                            <li><a href="/front/contest/specific?viewType=end"><span>종료 콘테스트</span></a></li>
                        </ul>
                    </div>
                </li>
                <li><a href="javascript:;"><span>행사/전시회</span></a>
                    <div class="dep2">
                        <ul>
                            <li><a href="/front/event/eventAll?searchType=allEvent">전체 행사/전시</a></li>
                            <li><a href="/front/event/eventAll?searchType=viewEvent">인기 행사/전시</a></li>
                            <li><a href="/front/event/eventAll?searchType=endEvent">종료 행사/전시</a></li>
                            <li><a href="/front/event/eventQna">행사/전시 대행문의</a></li>
                        </ul>
                    </div>
                </li>
                <li><a href="javascript:;"><span>G-폴리오</span></a>
                    <div class="dep2">
                        <ul>
                            <li><a href="/front/gfolio/portfolioList#section-gpolio-contest">콘테스트</a></li>
                            <li><a href="/front/gfolio/portfolioList#section-gpolio-event">행사/전시</a></li>
                            <li><a href="/front/gfolio/portfolioList#section-gpolio-design">디자인/마케팅</a></li>
                            <li><a href="/front/gfolio/galleryList">수상작갤러리</a></li>
                        </ul>
                    </div>
                </li>
                <li><a href="javascript:;"><span>커뮤니티</span></a>
                    <div class="dep2">
                        <ul>
                            <li><a href="/front/community/teamList">콘테스트 팀원모집</a></li>
                        </ul>
                    </div>
                </li>
                <li><a href=""><span>마이페이지</span></a>
                    <div class="dep2">
                        <ul>
                            <li id="li_notice"><a href="/front/mypage/notice"><span>알림 센터</span></a></li>
                            <li id="li_myfavorite"><a href="/front/mypage/myfavorite"><span>관심 콘테스트/행사</span></a></li>
                            <li id="li_myinfo"><a href="/front/mypage/myinfo"><span>회원정보 수정</span></a></li>
                            <li id="li_mypass"><a href="/front/mypage/mypass"><span>비밀번호 변경</span></a></li>
                            <li id="li_withdrawal"><a href="/front/mypage/withdrawal"><span>회원탈퇴</span></a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
    <div class="side-footer">
        <div class="customer-center">
            <div class="container">
                <strong>고객센터</strong>
                <div class="phone">전화 : 02. 6953.1994 ~ 1996</div>
                <div class="time">평일 AM 10:00 ~ PM 6:30 (주말/공휴일 휴무) <br>점심 PM 12:00 ~ PM 1:00</div>
            </div>
        </div>
    </div>
</div>

<div id="dim"></div>
<!-- modal : 무료회원 가입하기 -->
<%@ include file="/WEB-INF/jsp/front/join/modalJoin.jsp" %>
