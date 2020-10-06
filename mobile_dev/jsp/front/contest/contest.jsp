<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- content -->
<article class="article-all-contest">
    <div class="title-wrap">
        <h2 class="title">모두의 콘테스트</h2>
        <p class="desc">도전! 나만의 아이디어로 <br>상금과 스펙을 모두 성취하세요.</p>
    </div>
    <%@ include file="./contest_header.jsp" %>

<c:if test="${!empty specialList}">
    <section class="section-special">
        <div class="container">
            <h3 class="title-sub">모두의 콘테스트_스페셜</h3>
            <div class="contest-list special">
            	<c:forEach var="data" items="${specialList0}" >
                <div class="item">
                    <div class="box">
                        <div class="img">
                            <a href="" data-cIdx="${data.cIdx}"><span><img src="${uploadPath}${data.cfFilePath}" alt="${data.cbContestNm}" onError="this.src='/front/images/temp/@poster1.png'"></span></a>
                        </div>
                        <div class="txt">
                            <div class="subject">${data.cbContestNm}</div>
                            <div class="host">주최 : ${data.cnHostNm}</div>
                            <div class="info row row-5 justify-content-between align-items-center">
                                <div class="col-auto">
                                    <fmt:formatNumber type="number" value="${data.compareDay}" var="x"/>
                                    <c:choose>
                                        <c:when test="${data.cStatus eq 'CS02'}">
                                        	<span class="badge bg-primary">
                                        접수예정
                                        	</span>
                                        </c:when>
                                        <c:when test="${x eq 0}">
                                        	<span class="badge bg-danger">
                                        	D-Day
                                        	</span>
                                        </c:when>
                                        <c:when test="${x lt 0}">
                                        	<span class="badge bg-dark">
                                        마감
                                        	</span>
                                        </c:when>
                                        <c:when test="${data.compareDay le 7}">
                                        	<span class="badge bg-danger">
                                       		D-${data.compareDay}
                                        	</span>
                                        </c:when>
                                        <c:otherwise>
                                        	<span class="badge bg-secondary">
                                        	D-${data.compareDay}
                                        	</span>
                                        </c:otherwise>
                                    </c:choose>
                                </div>
                                <div class="col-auto">
                                	<fmt:parseDate value="${data.cbPeriodStDt}" var="stDate" pattern="yyyy-MM-dd"/>
                                	<fmt:parseDate value="${data.cbPeriodEdDt}" var="edDate" pattern="yyyy-MM-dd"/>

                                    <div class="date"><fmt:formatDate value="${stDate}" pattern="yyyy.MM.dd"/> ~ <fmt:formatDate value="${edDate}" pattern="yyyy.MM.dd"/></div>
                                </div>
                                <div class="col-auto contestLike">
                                    <div class="like ${data.clIdx }">
                                        <a href="javascript:;"><i class="fas fa-heart"><span class="sr-only">좋아요</span></i></a>
                                        <strong>${data.cLikeCount}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </c:forEach>
            </div>
            <div class="contest-list special">
            	<c:forEach var="data" items="${specialList1}" >
                <div class="item">
                    <div class="box">
                        <div class="img">
                            <a href="" data-cIdx="${data.cIdx}"><span><img src="${uploadPath}${data.cfFilePath}" alt="${data.cbContestNm}" onError="this.src='/front/images/temp/@poster1.png'"></span></a>
                        </div>
                        <div class="txt">
                            <div class="subject">${data.cbContestNm}</div>
                            <div class="host">주최 : ${data.cnHostNm}</div>
                            <div class="info row row-5 justify-content-between align-items-center">
                                <div class="col-auto">
                                    <fmt:formatNumber type="number" value="${data.compareDay}" var="x"/>
                                    <c:choose>
                                        <c:when test="${data.cStatus eq 'CS02'}">
                                        	<span class="badge bg-primary">
                                        접수예정
                                        	</span>
                                        </c:when>
                                        <c:when test="${x eq 0}">
                                        	<span class="badge bg-danger">
                                        	D-Day
                                        	</span>
                                        </c:when>
                                        <c:when test="${x lt 0}">
                                        	<span class="badge bg-dark">
                                        마감
                                        	</span>
                                        </c:when>
                                        <c:when test="${data.compareDay  le  7}">
                                        	<span class="badge bg-danger">
                                       		D-${data.compareDay}
                                        	</span>
                                        </c:when>
                                        <c:otherwise>
                                        	<span class="badge bg-secondary">
                                        	D-${data.compareDay}
                                        	</span>
                                        </c:otherwise>
                                    </c:choose>
                                </div>
                                <div class="col-auto">
                                	<fmt:parseDate value="${data.cbPeriodStDt}" var="stDate" pattern="yyyy-MM-dd"/>
                                	<fmt:parseDate value="${data.cbPeriodEdDt}" var="edDate" pattern="yyyy-MM-dd"/>

                                    <div class="date"><fmt:formatDate value="${stDate}" pattern="yyyy.MM.dd"/> ~ <fmt:formatDate value="${edDate}" pattern="yyyy.MM.dd"/></div>
                                </div>
                                <div class="col-auto contestLike">
                                    <div class="like ${data.clIdx }">
                                        <a href="javascript:;"><i class="fas fa-heart"><span class="sr-only">좋아요</span></i></a>
                                        <strong>${data.cLikeCount}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </c:forEach>
           </div>
        </div>
    </section>
    </c:if>
<c:if test="${!empty primeList}">
    <section class="section-prime">
        <div class="container">
            <h3 class="title-sub">모두의 콘테스트_프라임</h3>
            <div class="contest-list">
                <c:forEach var="data" items="${primeList0}" >
                    <div class="item">
                        <div class="box">
                            <div class="img">
                                <a href="" data-cIdx="${data.cIdx}"><span><img src="${uploadPath}${data.cfFilePath}" alt="${data.cbContestNm}" onError="this.src='/front/images/temp/@poster1.png'"></span></a>
                            </div>
                            <div class="txt">
                                <div class="subject">${data.cbContestNm}</div>
                                <fmt:parseDate value="${data.cbPeriodStDt}" var="stDate" pattern="yyyy-MM-dd"/>
                                <fmt:parseDate value="${data.cbPeriodEdDt}" var="edDate" pattern="yyyy-MM-dd"/>
                                <div class="date"><fmt:formatDate value="${stDate}" pattern="yyyy.MM.dd"/> ~ <fmt:formatDate value="${edDate}" pattern="yyyy.MM.dd"/></div>
                                <div class="info row row-5 justify-content-between align-items-center">
                                    <div class="col-auto">
                                        <fmt:formatNumber type="number" value="${data.compareDay}" var="x"/>
                                        <c:choose>
                                            <c:when test="${data.cStatus eq 'CS02'}">
                                            	<span class="badge bg-primary">
                                            접수예정
                                            	</span>
                                            </c:when>
                                            <c:when test="${x eq 0}">
                                            	<span class="badge bg-danger">
                                            	D-Day
                                            	</span>
                                            </c:when>
                                            <c:when test="${x lt 0}">
                                            	<span class="badge bg-dark">
                                            마감
                                            	</span>
                                            </c:when>
                                            <c:when test="${data.compareDay le 7}">
                                            	<span class="badge bg-danger">
                                           		D-${data.compareDay}
                                            	</span>
                                            </c:when>
                                            <c:otherwise>
                                            	<span class="badge bg-secondary">
                                            	D-${data.compareDay}
                                            	</span>
                                            </c:otherwise>
                                        </c:choose>
                                    </div>
                                    <div class="col-auto contestLike">
                                        <div class="like ${data.clIdx }">
                                            <a href="javascript:;"><i class="fas fa-heart"><span class="sr-only">좋아요</span></i></a>
                                            <strong>${data.cLikeCount}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </c:forEach>
            </div>
            <div class="contest-list">
                <c:forEach var="data" items="${primeList1}" >
                    <div class="item">
                        <div class="box">
                            <div class="img">
                                <a href="" data-cIdx="${data.cIdx}"><span><img src="${uploadPath}${data.cfFilePath}" alt="${data.cbContestNm}" onError="this.src='/front/images/temp/@poster1.png'"></span></a>
                            </div>
                            <div class="txt">
                                <div class="subject">${data.cbContestNm}</div>
                                <fmt:parseDate value="${data.cbPeriodStDt}" var="stDate" pattern="yyyy-MM-dd"/>
                                <fmt:parseDate value="${data.cbPeriodEdDt}" var="edDate" pattern="yyyy-MM-dd"/>
                                <div class="date"><fmt:formatDate value="${stDate}" pattern="yyyy.MM.dd"/> ~ <fmt:formatDate value="${edDate}" pattern="yyyy.MM.dd"/></div>
                                <div class="info row row-5 justify-content-between align-items-center">
                                    <div class="col-auto">
                                        <fmt:formatNumber type="number" value="${data.compareDay}" var="x"/>
                                        <c:choose>
                                            <c:when test="${data.cStatus eq 'CS02'}">
                                            	<span class="badge bg-primary">
                                            접수예정
                                            	</span>
                                            </c:when>
                                            <c:when test="${x eq 0}">
                                            	<span class="badge bg-danger">
                                            	D-Day
                                            	</span>
                                            </c:when>
                                            <c:when test="${x lt 0}">
                                            	<span class="badge bg-dark">
                                            마감
                                            	</span>
                                            </c:when>
                                            <c:when test="${data.compareDay le 7}">
                                            	<span class="badge bg-danger">
                                           		D-${data.compareDay}
                                            	</span>
                                            </c:when>
                                            <c:otherwise>
                                            	<span class="badge bg-secondary">
                                            	D-${data.compareDay}
                                            	</span>
                                            </c:otherwise>
                                        </c:choose>
                                    </div>
                                    <div class="col-auto contestLike">
                                        <div class="like ${data.clIdx }">
                                            <a href="javascript:;"><i class="fas fa-heart"><span class="sr-only">좋아요</span></i></a>
                                            <strong>${data.cLikeCount}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </c:forEach>
            </div>
        </div>
    </section>
</c:if>

<c:if test="${!empty basicList}">
    <section class="section-basic">
        <div class="container">
            <h3 class="title-sub">모두의 콘테스트_베이직</h3>
            <!-- <div class="basic-swiper">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"> -->
                            <div class="contest-list small">
                            	<c:forEach var="data" items="${basicList0}" >
                                <div class="item">
                                    <div class="box">
                                        <div class="img">
                                            <a href="" data-cIdx="${data.cIdx}"><span><img src="${uploadPath}${data.cfFilePath}" alt="${data.cbContestNm}" onError="this.src='/front/images/temp/@poster1.png'"></span></a>
                                        </div>
                                        <div class="txt">
                                            <div class="subject">${data.cbContestNm}</div>
                                            <fmt:parseDate value="${data.cbPeriodStDt}" var="stDate" pattern="yyyy-MM-dd"/>
                                			<fmt:parseDate value="${data.cbPeriodEdDt}" var="edDate" pattern="yyyy-MM-dd"/>
                                    		<div class="date"><fmt:formatDate value="${stDate}" pattern="yyyy.MM.dd"/> ~ <fmt:formatDate value="${edDate}" pattern="yyyy.MM.dd"/></div>
                                            <div class="info row row-5 justify-content-between align-items-center">
                                                <div class="col-auto">
                                                    <fmt:formatNumber type="number" value="${data.compareDay}" var="x"/>
                                                    <c:choose>
                                                        <c:when test="${data.cStatus eq 'CS02'}">
                                                        	<span class="badge bg-primary">
                                                        접수예정
                                                        	</span>
                                                        </c:when>
                                                        <c:when test="${x eq 0}">
                                                        	<span class="badge bg-danger">
                                                        	D-Day
                                                        	</span>
                                                        </c:when>
                                                        <c:when test="${x lt 0}">
                                                        	<span class="badge bg-dark">
                                                        마감
                                                        	</span>
                                                        </c:when>
                                                        <c:when test="${data.compareDay le 7}">
                                                        	<span class="badge bg-danger">
                                                       		D-${data.compareDay}
                                                        	</span>
                                                        </c:when>
                                                        <c:otherwise>
                                                        	<span class="badge bg-secondary">
                                                        	D-${data.compareDay}
                                                        	</span>
                                                        </c:otherwise>
                                                    </c:choose>
                                                </div>
                                                <div class="col-auto contestLike">
                                                    <div class="like ${data.clIdx }">
				                                        <a href="javascript:;"><i class="fas fa-heart"><span class="sr-only">좋아요</span></i></a>
				                                        <strong>${data.cLikeCount}</strong>
				                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </c:forEach>
                            </div>
                            <div class="contest-list small">
                            	<c:forEach var="data" items="${basicList1}" >
                                <div class="item">
                                    <div class="box">
                                        <div class="img">
                                            <a href="" data-cIdx="${data.cIdx}"><span><img src="${uploadPath}${data.cfFilePath}" alt="${data.cbContestNm}" onError="this.src='/front/images/temp/@poster1.png'"></span></a>
                                        </div>
                                        <div class="txt">
                                            <div class="subject">${data.cbContestNm}</div>
                                            <fmt:parseDate value="${data.cbPeriodStDt}" var="stDate" pattern="yyyy-MM-dd"/>
                                			<fmt:parseDate value="${data.cbPeriodEdDt}" var="edDate" pattern="yyyy-MM-dd"/>
                                    		<div class="date"><fmt:formatDate value="${stDate}" pattern="yyyy.MM.dd"/> ~ <fmt:formatDate value="${edDate}" pattern="yyyy.MM.dd"/></div>
                                            <div class="info row row-5 justify-content-between align-items-center">
                                                <div class="col-auto">
                                                    <fmt:formatNumber type="number" value="${data.compareDay}" var="x"/>
                                                    <c:choose>
                                                        <c:when test="${data.cStatus eq 'CS02'}">
                                                        	<span class="badge bg-primary">
                                                        접수예정
                                                        	</span>
                                                        </c:when>
                                                        <c:when test="${x eq 0}">
                                                        	<span class="badge bg-danger">
                                                        	D-Day
                                                        	</span>
                                                        </c:when>
                                                        <c:when test="${x lt 0}">
                                                        	<span class="badge bg-dark">
                                                        마감
                                                        	</span>
                                                        </c:when>
                                                        <c:when test="${data.compareDay le 7}">
                                                        	<span class="badge bg-danger">
                                                       		D-${data.compareDay}
                                                        	</span>
                                                        </c:when>
                                                        <c:otherwise>
                                                        	<span class="badge bg-secondary">
                                                        	D-${data.compareDay}
                                                        	</span>
                                                        </c:otherwise>
                                                    </c:choose>
                                                </div>
                                                <div class="col-auto contestLike">
                                                    <div class="like ${data.clIdx }">
				                                        <a href="javascript:;"><i class="fas fa-heart"><span class="sr-only">좋아요</span></i></a>
				                                        <strong>${data.cLikeCount}</strong>
				                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </c:forEach>
                            </div>
                        <!-- </div> -->

                        <!--<c:if test="${!empty basicList2}">
                        <div class="swiper-slide"> -->
                            <div class="contest-list small">
                            	<c:forEach var="data" items="${basicList2}" >
                                <div class="item">
                                    <div class="box">
                                        <div class="img">
                                            <a href="" data-cIdx="${data.cIdx}"><span><img src="${uploadPath}${data.cfFilePath}" alt="${data.cbContestNm}" onError="this.src='/front/images/temp/@poster1.png'"></span></a>
                                        </div>
                                        <div class="txt">
                                            <div class="subject">${data.cbContestNm}</div>
                                            <fmt:parseDate value="${data.cbPeriodStDt}" var="stDate" pattern="yyyy-MM-dd"/>
                                			<fmt:parseDate value="${data.cbPeriodEdDt}" var="edDate" pattern="yyyy-MM-dd"/>
                                    		<div class="date"><fmt:formatDate value="${stDate}" pattern="yyyy.MM.dd"/> ~ <fmt:formatDate value="${edDate}" pattern="yyyy.MM.dd"/></div>
                                            <div class="info row row-5 justify-content-between align-items-center">
                                                <div class="col-auto">
                                                    <fmt:formatNumber type="number" value="${data.compareDay}" var="x"/>
                                                    <c:choose>
                                                        <c:when test="${data.cStatus eq 'CS02'}">
                                                        	<span class="badge bg-primary">
                                                        접수예정
                                                        	</span>
                                                        </c:when>
                                                        <c:when test="${x eq 0}">
                                                        	<span class="badge bg-danger">
                                                        	D-Day
                                                        	</span>
                                                        </c:when>
                                                        <c:when test="${x lt 0}">
                                                        	<span class="badge bg-dark">
                                                        마감
                                                        	</span>
                                                        </c:when>
                                                        <c:when test="${data.compareDay le 7}">
                                                        	<span class="badge bg-danger">
                                                       		D-${data.compareDay}
                                                        	</span>
                                                        </c:when>
                                                        <c:otherwise>
                                                        	<span class="badge bg-secondary">
                                                        	D-${data.compareDay}
                                                        	</span>
                                                        </c:otherwise>
                                                    </c:choose>
                                                </div>
                                                <div class="col-auto contestLike">
                                                    <div class="like ${data.clIdx }">
				                                        <a href="javascript:;"><i class="fas fa-heart"><span class="sr-only">좋아요</span></i></a>
				                                        <strong>${data.cLikeCount}</strong>
				                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </c:forEach>
                            </div>
                            <div class="contest-list small">
                            	<c:forEach var="data" items="${basicList3}" >
                                <div class="item">
                                    <div class="box">
                                        <div class="img">
                                            <a href="" data-cIdx="${data.cIdx}" ><span><img src="${uploadPath}${data.cfFilePath}" alt="${data.cbContestNm}" onError="this.src='/front/images/temp/@poster1.png'"></span></a>
                                        </div>
                                        <div class="txt">
                                            <div class="subject">${data.cbContestNm}</div>
                                            <fmt:parseDate value="${data.cbPeriodStDt}" var="stDate" pattern="yyyy-MM-dd"/>
                                			<fmt:parseDate value="${data.cbPeriodEdDt}" var="edDate" pattern="yyyy-MM-dd"/>
                                    		<div class="date"><fmt:formatDate value="${stDate}" pattern="yyyy.MM.dd"/> ~ <fmt:formatDate value="${edDate}" pattern="yyyy.MM.dd"/></div>
                                            <div class="info row row-5 justify-content-between align-items-center">
                                                <div class="col-auto">
                                                    <fmt:formatNumber type="number" value="${data.compareDay}" var="x"/>
                                                    <c:choose>
                                                        <c:when test="${data.cStatus eq 'CS02'}">
                                                        	<span class="badge bg-primary">
                                                        접수예정
                                                        	</span>
                                                        </c:when>
                                                        <c:when test="${x eq 0}">
                                                        	<span class="badge bg-danger">
                                                        	D-Day
                                                        	</span>
                                                        </c:when>
                                                        <c:when test="${x lt 0}">
                                                        	<span class="badge bg-dark">
                                                        마감
                                                        	</span>
                                                        </c:when>
                                                        <c:when test="${data.compareDay le 7}">
                                                        	<span class="badge bg-danger">
                                                       		D-${data.compareDay}
                                                        	</span>
                                                        </c:when>
                                                        <c:otherwise>
                                                        	<span class="badge bg-secondary">
                                                        	D-${data.compareDay}
                                                        	</span>
                                                        </c:otherwise>
                                                    </c:choose>
                                                </div>
                                                <div class="col-auto contestLike">
                                                    <div class="like ${data.clIdx }">
				                                        <a href="javascript:;"><i class="fas fa-heart"><span class="sr-only">좋아요</span></i></a>
				                                        <strong>${data.cLikeCount}</strong>
				                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </c:forEach>
                            </div>
                        <!--</div>
                        </c:if>

                     </div>
                </div>

                <div class="swiper-button-next swiper-button-next-basic"></div>
                <div class="swiper-button-prev swiper-button-prev-basic"></div> -->
            <!-- </div> -->
        </div>
    </section>
</c:if>
    <section class="section-list">
        <div class="container">
            <h3 class="title-sub">개최 콘테스트</h3>
            <div class="badge-sorting">
                <a href="javascript:Contest.bSeach('')"><span class="badge bg-dark">전체 콘테스트</span></a>
                <a href="javascript:Contest.bSeach('CS04')"><span class="badge bg-danger">마감임박</span></a>
                <a href="javascript:Contest.bSeach('CS03')"><span class="badge bg-secondary">접수중</span></a>
                <a href="javascript:Contest.bSeach('CS02')"><span class="badge bg-primary">접수예정</span></a>
            </div>
            <div class="contest-list-column">
                <ul id="buttomListBody">
                    <li id="buttomLi" style="display:none">
                        <div class="img"><a href="" data-cIdx="${data.cIdx}"><span><img src=""  onError="this.src='/front/images/temp/@poster1.png'" alt=""></span></a></div>
                        <div class="txt">
                            <div class="subject"><a href=""></a></div>
                            <div class="host"></div>
                        </div>
                        <div class="date"></div>
                        <div class="d-day">
                            <span class="badge bg-primary"></span>
                            <strong><span class="_badge"></span></strong>
                        </div>
                        <div class="hit"></div>
                    </li>

                </ul>
            </div>
            <div class="text-center mt-4">
                <button type="button" class="btn btn-lg btn-dark btn-more" id="addMore" onClick="Contest.buttonSearch();"><i></i> 더보기</button>
            </div>
        </div>
    </section>

</article>
<!-- //content -->

<!-- modal : 콘테스트 상세 -->
<%@ include file="/WEB-INF/jsp/front/common/modalContestView.jsp" %>

<!-- modal : 상품소개 -->
<div class="modal fade modal-prize" id="modalPrize" aria-modal="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">상품소개</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="tab-center">
                    <ul class="nav" id="prize-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="tab1-tab" data-toggle="pill" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">콘테스트 관리솔루션</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="tab2-tab" data-toggle="pill" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">배너광고요금제</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="tab3-tab" data-toggle="pill" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false">콘테스트 케어솔루션</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="tab4-tab" data-toggle="pill" href="#tab4" role="tab" aria-controls="tab4" aria-selected="false">무료컨설팅서비스</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content">
                    <div class="tab-pane show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                        <img src="/front/images/content/img_intro1.png" alt="">
                    </div>
                    <div class="tab-pane" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                        <img src="/front/images/content/img_intro2.png" alt="">
                    </div>
                    <div class="tab-pane" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                        <img src="/front/images/content/img_intro3.png" alt="">
                    </div>
                    <div class="tab-pane" id="tab4" role="tabpanel" aria-labelledby="tab4-tab">
                        <img src="/front/images/content/img_intro4.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
