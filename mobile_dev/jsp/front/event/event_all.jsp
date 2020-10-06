<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="com" uri="/WEB-INF/tld/component.tld"%>
<!-- content -->

<section>
    <div class="title-wrap">
        <h2 class="title">행사/전시회</h2>
    </div>
    <div class="tab-category">
        <nav class="swiper-container">
            <ul class="swiper-wrapper">
                <li data-target="allEvent" id="allEvent" class="swiper-slide _searchType"><a href="javascript:;"><span>전체행사/전시</span></a></li>
                <li data-target="viewEvent" id="viewEvent" class="swiper-slide _searchType"><a href="javascript:;"><span>인기행사/전시</span></a></li>
                <li data-target="endEvent" id="endEvent" class="swiper-slide _searchType"><a href="javascript:;"><span>종료행사/전시</span></a></li>
            </ul>
        </nav>
    </div>
</section>
<section class="section-now">
    <div class="container">
        <div class="row row-0">
            <div class="col banner">
                <a href="../event/eventQna" class="singlebanner"><img src="/front/images/event/event.jpg" alt=""></a>
            </div>
            <div class="col now">
                <p>G콘 NOW</p>
                <ul>
                    <li class="_rangking active" data-target="_VIEW"><a href="javascript:;"><span>조회수 랭킹</span></a></li>
                    <li class="_rangking" data-target="_LIKE"><a href="javascript:;"><span>좋아요 랭킹</span></a></li>
                </ul>
            </div>
            <div class="col rank">
                <h3>랭킹보기</h3>
                <ul id="rankingForm">
                    <li class="rankingClone">
                        <a href="javascript:;">-</a>
                        <span>-</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>
<section class="bg-white">
    <div class="select-area">
        <com:makeSelect
            boxName="searchBunya"
            masterCd="EVENT_BUNYA"
            include="class='form-control w-auto d-inline-block'"
            makeDefault="true"
            selectDefaultName="분야별 전체보기"
            />
            <select data-live-search="false" id="searchRange" name="searchRange" data-id="searchRange" class="selectpicker form-control w-auto d-inline-block">
            <option value="newest">최신등록순</option>
            <option value="deadline">마감임박순</option>
            <option value="like">좋아요순</option>
            </select>
    </div>
    <div id="eventListForm" class="container">
        <div class="contest-list eventListClone" style="display:none">
            <div class="item eventItemClone">
                <div class="box">
                    <div class="img">
                        <a href=""><span><img src="" alt=""></span></a>
                    </div>
                    <div class="txt">
                        <div class="subject eEventNm">-</div>
                        <div class="date">-</div>
                        <div class="info row row-5 justify-content-between align-items-center">
                            <div class="col-auto">
                                <span class="badge eDDay">-</span>
                            </div>
                            <div class="col-auto eventLike">
                                <div class="like">
                                    <a href="javascript:;"><i class="fas fa-heart"><span class="sr-only">좋아요</span></i></a>
                                    <strong class="eLikeCount">-</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="pagination-wrap">
        <ul class="pagination justify-content-center" id="paging"></ul>
    </div>
</section>
<!-- //content -->

<!-- modal : 행사/전시 상세 -->
<%@ include file="/WEB-INF/jsp/front/common/modalEventView.jsp" %>