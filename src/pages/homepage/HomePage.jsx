import React, { useEffect, useState } from "react";
import axios from "axios";
import * as M from "./HomePageStyle";
import Header from "../../components/layout/header/Header";
import FeaturedCard from "../../components/common/FeaturedCard";
import BestList from "../../components/common/BestList";
import GenreFilter from "../../components/common/GenreFilter";
import NovelList from "../../components/common/NovelList";
import { useNavigate } from "react-router-dom";

const HomePage = ({ isLoggedIn }) => {
  const [selectedGenre, setSelectedGenre] = useState("로맨스");
  const [selectedAge, setSelectedAge] = useState("10대");
  const [novels, setNovels] = useState([]);
  const [bestItems, setBestItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const novelsResponse = await axios.get("http://3.39.231.73:5000/notes");

        console.log("소설 목록 API 연결 성공!");
        console.log(novelsResponse.data);

        const bestItemsResponse = await axios.get(
          "http://3.39.231.73:5000/best9"
        );
        console.log("베스트 목록 API 연결 성공!");
        console.log(bestItemsResponse.data);

        const novelsData = novelsResponse.data;
        const bestItemsData = bestItemsResponse.data;

        const bestItemsWithAuthor = bestItemsData.map((item) => {
          const matchedNovel = novelsData.find(
            (novel) => novel.author_id === item.author_id
          );
          return {
            ...item,
            author_name:
              matchedNovel?.author_name ?? item.author ?? "작가 미상",
          };
        });

        setNovels(novelsData);
        setBestItems(bestItemsWithAuthor);
        setLoading(false);
      } catch (error) {
        console.error("API 호출 오류", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const weeklyBestItems = bestItems.slice(0, 9);
  const filteredNovels = novels.filter((n) => n.category === selectedGenre);
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
      {/* <Header /> */}
      <Header isLoggedIn={isLoggedIn} onLoginClick={() => navigate("/")} />
      <M.HomeContainer>
        <FeaturedCard />
        {loading ? (
          <p>로딩중입니다...</p>
        ) : (
          <>
            <BestList title="이번주 BEST 7" bestItems={weeklyBestItems} />
            <GenreFilter
              title="장르별 BEST 7"
              selected={selectedGenre}
              onChange={setSelectedGenre}
            />
            <NovelList novels={filteredNovels} />
            <GenreFilter
              title="연령별 BEST 7"
              selected={selectedAge}
              onChange={setSelectedAge}
            />
            <BestList bestItems={paddedBestItems} />
          </>
        )}
      </M.HomeContainer>
    </>
  );
};

export default HomePage;