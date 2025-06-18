import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import SearchPage from "../pages/search/SearchPage";
import StoryDetailPage from "../pages/storydetailpage/StoryDetailPage";
import EpisodeDetailPage from "../pages/episode/EpisodeDetailPage";
// import SearchPage from "../pages/SearchPage";
// import PostsPage from "../pages/PostsPage";
// import MyPage from "../pages/MyPage";
// import LoginPage from "../pages/LoginPage";
// import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/story/:note_id" element={<StoryDetailPage />} />{" "}
      <Route path="/notes/:note_id/episodes/:episode_id" element={<EpisodeDetailPage />} />
      {/*
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/login" element={<LoginPage />} /> */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;
