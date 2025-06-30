import React, { useState } from "react";
import * as M from "./SearchPageStyle";
import Header from "../../components/layout/header/Header";
import GenreFilter from "../../components/common/GenreFilter";
import BestList from "../../components/common/BestList";
import searchIcon from "../../assets/images/searchIcon.svg";

const DUMMY_DATA = {
  로맨스: [
    { title: "나를 싫어하는 상사", author: "최승주" },
    { title: "첫사랑을 잊는 법", author: "티미틀" },
    { title: "디스코드", author: "기간07" },
    { title: "체리블라썸", author: "겨울추어" },
    { title: "연애운동", author: "갤러거" },
    { title: "오늘도 사랑스럽게", author: "두미" },
    { title: "불성실한 로맨스", author: "오말년" },
    { title: "버그 수정했는데 현실이 바뀌었다", author: "최연정" },
    { title: "개발자가 너무 강함@", author: "242작가" },
  ],
  판타지: [
    { title: "마법사의 귀환", author: "판타지장인" },
    { title: "용병의 계약서", author: "소드마스터" },
    { title: "차원문 너머", author: "이계점프" },
    { title: "왕의 검", author: "소드킹" },
    { title: "엘프와 나", author: "그린숲" },
    { title: "드래곤의 유산", author: "불꽃심장" },
    { title: "던전메이커", author: "던마스터" },
    { title: "마나 리셋", author: "리셋터" },
    { title: "광기의 마도사", author: "미친법사" },
  ],
  SF: [
    { title: "인류 멸망 리포트", author: "김미래" },
    { title: "로봇과 나", author: "기계인간" },
    { title: "우주비행사의 일기", author: "캡틴리" },
    { title: "AI 대통령", author: "윤AI" },
    { title: "시간 여행자", author: "타임워커" },
    { title: "지구 탈출 프로젝트", author: "나사짱" },
    { title: "4차 산업혁명 전쟁", author: "테크지니어" },
    { title: "디지털 신", author: "신비트" },
    { title: "코드명: 오로라", author: "빛코드" },
  ],
};

const SearchPage = ({ isLoggedIn }) => {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("로맨스");
  const [results, setResults] = useState(DUMMY_DATA["로맨스"]);

  const handleSearch = (genre = selectedTag) => {
    const data = DUMMY_DATA[genre] || [];

    const filtered = query
      ? data.filter(
          (item) => item.title.includes(query) || item.author.includes(query)
        )
      : data;

    setResults(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleGenreChange = (newGenre) => {
    setSelectedTag(newGenre);
    setQuery("");
    setResults(DUMMY_DATA[newGenre] || []);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <M.SearchContainer>
        <M.ContentWrapper>
          <M.SearchSection>
            <M.SearchInput
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="작가, 작품명 등을 입력하세요."
            />
            <M.SearchIcon src={searchIcon} alt="검색" onClick={handleSearch} />
          </M.SearchSection>
          <GenreFilter
            title=""
            selected={selectedTag}
            onChange={handleGenreChange}
          />
          <BestList title={`${selectedTag} BEST 9`} bestItems={results} />
        </M.ContentWrapper>
      </M.SearchContainer>
    </>
  );
};

export default SearchPage;
