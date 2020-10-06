<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- content -->
<section>
    <div class="title-wrap">
        <h2 class="title">커뮤니티_ G콘 팀원모집</h2>
    </div>
</section>
<section>
    <div class="container">
        <div class="board-search">
            <div class="row row-10 justify-content-between">
                <div class="col-auto">
                    <select name="searchTerms" id="searchTerms" class="form-control">
                        <option value="">전체</option>
                        <option value="subject">제목</option>
                        <option value="createId">등록자명</option>
                    </select>
                </div>
                <div class="col">
                    <input type="text" id="searchWord" class="form-control">
                </div>
                <div class="col-auto">
                    <button type="submit" id="searchBtn" class="btn btn-dark">검색</button>
                </div>
            </div>
        </div>
        <div class="table-responsive">
            <div id="tableBox" style="margin-bottom: 20px;"></div>
        </div>
        <c:choose>
            <c:when test="${SESSION_KEY_GCONTEST.uType == 'INDIVIDUAL'}">
                <div class="text-right">
		            <a href="teamForm" class="btn btn-dark btn-lg">글쓰기</a>
		        </div>
            </c:when>
            <c:otherwise>
            </c:otherwise>
        </c:choose>

    </div>
</ㄴ>
<!-- //content -->