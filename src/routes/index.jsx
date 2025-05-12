import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import SearchPage from "../pages/search/SearchPage";
import StoryDetailPage from "../pages/storydetailpage/StoryDetailPage";
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
      <Route path="/story/:note_id" element={<StoryDetailPage />} />
      {/*
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/login" element={<LoginPage />} /> */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;
