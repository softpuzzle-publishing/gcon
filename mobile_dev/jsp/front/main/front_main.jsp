<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- 콘테스트 목록 -->
<section class="all-contest">
    <div class="container">
        <div class="poster-list">
            <div class="swiper-container">
                <div class="swiper-wrapper" id="contestProductForm">
                    <div class="swiper-slide contestProductClone">
                        <a href="javascript:;" class="thumb contestProductA"><img class="contestProductImg" src="" alt="" onerror="this.src='/front/images/temp/@poster1.png'"><span class="sr-only aCNm"></span></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-area">
            <a href="/front/contest/all" class="btn btn-dark btn-block btn-lg">전체보기</a>
        </div>
    </div>
</section>
<!-- 최신등록 콘테스트 -->
<section class="section-contest">
    <div class="container">
        <h2 class="section-title">최신등록 콘테스트</h2>
        <div class="more"><a href="/front/contest/all">더보기 <i class="icon-arr-right"></i></a></div>
        <div class="contest-list">
            <ul id="contestListForm">
                <li class="contestListClone">
                    <a href="javascript:;" class="row row-15">
                        <div class="col-auto">
                            <div class="thumb"><img src="/front/images/@poster1.jpg" alt="콘테스트 이름"></div>
                        </div>
                        <div class="col">
                            <div class="text">
                                <div>
                                    <div class="subject cbContestNm"></div>
                                    <div class="host cnAgentCoNm"></div>
                                </div>
                                <div class="date">2020.09.01 ~ 2020.09.10</div>
                            </div>
                        </div>
                    </a>
                    <input class="cIdx" type="hidden">
                    <div class="info row justify-content-between align-items-center">
                        <div class="col">
                            <span class="badge badge-danger">마감임박</span>
                        </div>
                        <div class="col">
                            <div class="d-day cDDay">D-46</div>
                        </div>
                        <div class="col">
                            <div class="hit"><i class="icon-eye"></i>72</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</section>
<!-- 최신등록 행사/전시회 -->
<section class="section-contest">
    <div class="container">
        <h2 class="section-title">최신등록 행사/전시회</h2>
        <div class="more"><a href="/front/event/eventAll?searchType=allEvent">더보기 <i class="icon-arr-right"></i></a></div>
        <div class="contest-list">
            <ul id="eventListForm">
                <li class="eventListClone">
                    <a href="javascript:;" class="row row-15">
                        <div class="col-auto">
                            <div class="thumb"><img src="/front/images/@poster1.jpg" alt="콘테스트 이름"></div>
                        </div>
                        <div class="col">
                            <div class="text">
                                <div>
                                    <div class="subject eSubject">제4회 대학생 통상정책 토론·논문 랜선 대회</div>
                                    <div class="host eLocation">국립백두대간수목원</div>
                                </div>
                                <div class="date ePeriodD">2020.09.01 ~ 2020.09.10</div>
                            </div>
                        </div>
                    </a>
                    <div class="info row justify-content-between align-items-center">
                        <div class="col">
                            <span class="badge badge-oldblue">진행전</span>
                        </div>
                        <div class="col">
                            <div class="d-day">D-46</div>
                        </div>
                        <div class="col">
                            <div class="hit"><i class="icon-eye"></i>72</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</section>

<!-- modal : 콘테스트 상세 -->
<%@ include file="/WEB-INF/jsp/front/common/modalContestView.jsp" %>

<!-- modal : 행사/전시 상세 -->
<%@ include file="/WEB-INF/jsp/front/common/modalEventView.jsp" %>

<!-- 팝업 -->
<!-- <div class="popupMainWrap">
    <div class="backdrop"></div>
    <div id="popupForm" class="popupWrap">
        <div class="popupItem" data-cookie="c1" style="width:650px;left:800px;top:200px;" >
            <div class="popupMain">
                <div class="cont">
                </div>
                <div class="close"><a href="javascript:;"><i class="fas fa-times-circle"></i><span class="sr-only">팝업 닫기</span></a></div>
                <div class="today">
                    <a href="javascript:;">-</a>
                </div>
            </div>
        </div>
    </div>
</div> -->
<!-- //팝업 -->