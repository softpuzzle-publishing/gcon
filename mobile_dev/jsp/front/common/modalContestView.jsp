<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%-- modal : 콘테스트 상세 --%>
<div class="modal modal-contest-view" id="modalContestView" aria-modal="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <a href="javascript:;" data-dismiss="modal" aria-label="Close" class="modal-back">
                    <i class="icon-back"><span class="sr-only">목록으로</span></i>
                </a>
            </div>
            <div class="modal-body">
                <div class="contest-view">
                    <div class="subject" id="cbContestNm"></div>
                    <div class="host" id="cnAgentCoNm"></div>
                    <div class="date">
                        <span id="cbContestBunyaNm"></span>
                        <span id="cbPeriodDt"></span>
                    </div>
                    <div class="info">
                        <div class="set">
                            <div>
                                <badge class="badge" id="cStatus"></badge>
                            </div>
                            <div class="go">
                            </div>
                        </div>
                        <div class="set">
                            <div class="like">
                                <a href="javascript:;"><i class="fas fa-heart"><span class="sr-only">좋아요</span></i></a>
                                <strong id="cLikeCount">0</strong>
                            </div>
                            <div class="hit">
                                <a href="javascript:;"><i class="far fa-eye"><span class="sr-only">조회수</span></i></a>
                                <strong id="cViewCount">0</strong>
                            </div>
                        </div>
                    </div>
                    <div class="row row-10">
                        <div class="col">
                            <a id="cDownloadNotice" href="" download="공고문" class="btn btn-dark btn-lg btn-block">공고문 다운로드</a>
                        </div>
                        <div class="col">
                            <a id="cDownloadApplication" href="" download="신청서" class="btn btn-dark btn-lg btn-block">신청서 다운로드</a>
                        </div>
                    </div>
                    <div class="img">
                        <img id="cPoster" src="/front/images/temp/@poster_lg.jpg" alt="" onerror="this.src='/front/images/temp/@poster_lg.jpg'">
                    </div>
                    <div class="subtitle">상세요강</div>
                    <dl class="details">
                        <dt>콘테스트 일정</dt>
                        <dd id="cdContestSchedule">-</dd>
                        <dt>출품부문</dt>
                        <dd id="cdContestBumun">-</dd>
                        <dt>출품대상/자격</dt>
                        <dd id="cdContestTarget">-</dd>
                        <dt>콘테스트 개요</dt>
                        <dd id="cdContestSummary">-</dd>
                        <dt>출품방법</dt>
                        <dd id="cdParticipation">-</dd>
                        <dt>출품형식(규격 및 제출자료)</dt>
                        <dd id="cdWorkSpec">-</dd>
                        <dt>시상내역</dt>
                        <dd id="cdAwardsHist">-</dd>
                        <dt>문의</dt>
                        <dd id="cdContestTel">-</dd>
                        <dt>유의사항 </dt>
                        <dd id="cdContestNote">-</dd>
                    </dl>
                    <div class="text-center pt-3">
                        <p class="fa-sm">더 자세한 내용은 공모전 홈페이지 또는 공고문을 참조해 주세요</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>