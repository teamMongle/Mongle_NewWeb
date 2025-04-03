import React from "react";
import * as M from "./HomePageStyle";
import Header from "../../components/layout/header/Header";
import FeaturedCard from "../../components/common/FeaturedCard";
import BestList from "../../components/common/BestList";
import GenreFilter from "../../components/common/GenreFilter";
import NovelList from "../../components/common/NovelList";
import NovelImg1 from "../../assets/images/novelImg1.png";
import NovelImg2 from "../../assets/images/novelImg2.png";
import NovelImg3 from "../../assets/images/novelImg3.png";
import NovelImg4 from "../../assets/images/novelImg4.png";
import NovelImg5 from "../../assets/images/novelImg5.png";

const HomePage = () => {
  const novels = [
    {
      image: NovelImg1,
      title: "사라진 연인의 그림자",
      author: "하성진",
      isFree: true,
    },
    {
      image: NovelImg2,
      title: "사랑의 끝, 그 후의 이야기",
      author: "하성진",
      isFree: true,
    },
    {
      image: NovelImg3,
      title: "꽃 피는 계절의 너",
      author: "하성진",
      isFree: false,
    },
    { image: NovelImg4, title: "책갈피", author: "하성진", isFree: true },
    {
      image: NovelImg5,
      title: "세상에 우리 둘뿐이라면",
      author: "하성진",
      isFree: false,
    },
    {
      image: "이미지_URL",
      title: "수호의 연애 공식",
      author: "김우지",
      isFree: true,
    },
    {
      image: "이미지_URL",
      title: "내가 예전으로 돌아간다면",
      author: "하성진",
      isFree: true,
    },
  ];
  return (
    <>
      <Header />
      <M.HomeContainer>
        <FeaturedCard />
        <BestList title="이번주 BEST 9" />
        <GenreFilter title="장르별 BEST 9" />
        <NovelList novels={novels} />
        <GenreFilter title="연령별 BEST 9" />
        <BestList />
      </M.HomeContainer>
    </>
  );
};

export default HomePage;
