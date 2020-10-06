<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- modal : 행사/전시 상세 --%>
<div class="modal modal-contest-view" id="modalEventView" aria-modal="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <a href="javascript:;" data-dismiss="modal" aria-label="Close" class="modal-back">
                    <i class="icon-back"><span class="sr-only">목록으로</span></i>
                </a>
            </div>
            <div class="modal-body">
                <div class="contest-view">
                    <div class="subject" id="eEventNm"></div>
                    <div class="host" id="eAgentCoNm">국립백두대간수목원</div>
                    <div class="date">
                        <span id="eBunyaCd">체험/참여/캠페인</span>
                        <span id="ePeriodD">2020.09.01 ~ 2020.09.10</span>
                    </div>
                    <div class="info">
                        <div class="set">
                            <div>
                                <span class="badge badge-oldblue"><span id="_badge"></span></span>
                            </div>
                            <div class="go">
                            </div>
                        </div>
                        <div class="set">
                            <div class="like">
                                <a href="javascript:;"><i class="fas fa-heart"><span class="sr-only">좋아요</span></i></a>
                                <strong id="eLikeCount">0</strong>
                            </div>
                            <div class="hit">
                                <a href="javascript:;"><i class="far fa-eye"><span class="sr-only">조회수</span></i></a>
                                <strong id="eViewCount">0</strong>
                                <input id="eventIdx" type="hidden">
                            </div>
                        </div>
                    </div>
                    <div class="img">
                        <img id="cfFilePath" src="/front/images/temp/@poster_lg.jpg" alt="" onerror="this.src='/front/images/temp/@poster_lg.jpg'">
                    </div>
                    <div class="subtitle">상세요강</div>
                    <dl class="details">
                        <dt id="ePeriodDt_">행사기간</dt>
                        <dd id="ePeriodDt">-</dd>
                        <dt id="eClosedDay_">휴관 휴무일</dt>
                        <dd id="eClosedDay">-</dd>
                        <!-- ??? <dt>행사구분</dt>
                        <dd>-</dd> -->
                        <dt id="eSubject_">행사주제</dt>
                        <dd id="eSubject">-</dd>
                        <dt id="eSummary_">행사소개</dt>
                        <dd id="eSummary">-</dd>
                        <dt id="eWeekT_">참여시간</dt>
                        <dd id="eWeekT">-</dd>
                        <dt id="eCost_">참여비용</dt>
                        <dd id="eCost">-</dd>
                        <dt id="eLocation_">행사장소</dt>
                        <dd id="eLocation">-</dd>
                        <dt id="eDirections_">찾아오시는 길</dt>
                        <dd id="eDirections">-</dd>
                        <dt id="eInquiry_">문의 및 안내</dt>
                        <dd id="eInquiry">-</dd>
                    </dl>
                    <div class="text-center pt-3 pb-3">
                        <p class="fa-sm">더 자세한 내용은 공모전 홈페이지 또는 공고문을 참조해 주세요</p>
                    </div>
                    <div class="homepage">
                    </div>
                </div>
            </div>
            <div class="btn-top">
                <a href="#">
                    <i class="fas fa-angle-up"></i>
                </a>
            </div>
        </div>
    </div>
</div>