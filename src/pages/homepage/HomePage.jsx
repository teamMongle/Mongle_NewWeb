import React, { useState } from "react";
import * as M from "./HomePageStyle";
import Header from "../../components/layout/header/Header";
import FeaturedCard from "../../components/common/FeaturedCard";
import BestList from "../../components/common/BestList";
import GenreFilter from "../../components/common/GenreFilter";
import NovelList from "../../components/common/NovelList";
import NovelImg1 from "../../assets/images/novelImg1.svg";
import NovelImg2 from "../../assets/images/novelImg2.svg";
import NovelImg3 from "../../assets/images/novelImg3.svg";
import NovelImg4 from "../../assets/images/novelImg4.svg";
import NovelImg5 from "../../assets/images/novelImg5.svg";
import NovelImg6 from "../../assets/images/novelImg6.svg";
import NovelImg7 from "../../assets/images/novelImg7.svg";

const HomePage = () => {
  const [selectedGenre, setSelectedGenre] = useState("로맨스");
  const [selectedAge, setSelectedAge] = useState("10대");

  const novels = [
    {
      image: NovelImg1,
      title: "세상에 우리 둘뿐이라면",
      author: "하성진",
      isFree: false,
      genre: "로맨스",
    },
    {
      image: NovelImg2,
      title: "사라진 연인의 그림자",
      author: "유지호",
      isFree: true,
      genre: "공포",
    },
    {
      image: NovelImg3,
      title: "사랑의 끝, 그 후의 이야기",
      author: "설민",
      isFree: true,
      genre: "로맨스",
    },
    {
      image: NovelImg4,
      title: "꽃 피는 계절의 너",
      author: "283진",
      isFree: false,
      genre: "문학",
    },
    {
      image: NovelImg5,
      title: "책갈피",
      author: "하성진",
      isFree: true,
      genre: "문학",
    },
    {
      image: NovelImg6,
      title: "수호의 연애 공식",
      author: "김우지",
      isFree: true,
      genre: "로맨스",
    },
    {
      image: NovelImg7,
      title: "거짓말을 읽어!",
      author: "서비",
      isFree: true,
      genre: "SF",
    },
  ];

  const bestItems = [
    {
      id: 1,
      title: "월급루팡하려다 진짜 루팡이 되었다",
      author: "최승주",
      age: "10대",
    },
    {
      id: 2,
      title: "신입생이 개발을 너무 잘함",
      author: "티미름",
      age: "20대",
    },
    {
      id: 3,
      title: "취업 못한 3학년인 내가 눈떠보니 CEO?",
      author: "기안07",
      age: "30대",
    },
    {
      id: 4,
      title: "학생 그만두고 개발자 합니다",
      author: "겨울추어",
      age: "40대",
    },
    { id: 5, title: "SSS급 풀스택 개발자", author: "갤러거", age: "10대" },
    {
      id: 6,
      title: "어둠의 기업에서 능력 흡수합니다",
      author: "두미",
      age: "20대",
    },
    {
      id: 7,
      title: "백작가의 투명드래곤 개발자가 되었다!",
      author: "오말년",
      age: "30대",
    },
    {
      id: 8,
      title: "버그 수정했는데 현실이 바뀌었다",
      author: "최연정",
      age: "40대",
    },
    { id: 9, title: "개발자가 너무 강함@", author: "242자까", age: "10대" },
  ];

  const weeklyBestItems = bestItems.slice(0, 9);
  const filteredNovels = novels.filter((n) => n.genre === selectedGenre);
  const filteredBestItems = bestItems.filter((b) => b.age === selectedAge);
  const paddedBestItems = [
    ...filteredBestItems,
    ...Array.from({ length: 9 - filteredBestItems.length }, (_, i) => ({
      id: filteredBestItems.length + i + 1,
      title: "준비 중입니다",
      author: "-",
    })),
  ];

  return (
    <>
      <Header />
      <M.HomeContainer>
        <FeaturedCard />
        <BestList title="이번주 BEST 7" bestItems={weeklyBestItems} />
        <GenreFilter title="장르별 BEST 7" onSelect={setSelectedGenre} />
        <NovelList novels={filteredNovels} />
        <GenreFilter title="연령별 BEST 9" onSelect={setSelectedAge} />
        <BestList bestItems={paddedBestItems} />
      </M.HomeContainer>
    </>
  );
};

export default HomePage;
