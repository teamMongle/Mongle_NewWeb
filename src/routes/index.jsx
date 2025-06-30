import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import SearchPage from "../pages/search/SearchPage";
import StoryDetailPage from "../pages/storydetailpage/StoryDetailPage";
import MyPage from "../pages/mypage/MyPage";
import LoginPage from "../pages/authpage/Login";
import SignupPage from "../pages/authpage/Signup";
import PostsPage from "../pages/postpage/PostsPage";
import EpisodeDetailPage from "../pages/episode/EpisodeDetailPage.jsx";
// import NotFoundPage from "../pages/NotFoundPage";
import MyWorksPage from "../pages/myworks/MyWorks.jsx";
import LikedWorksPage from "../pages/likedworks/LikedWorks.jsx";
import DraftPost from "../pages/draftpost/DraftPost.jsx";
import AddEpisode from "../pages/addepisode/AddEpisode.jsx";

const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // localStorage에서 로그인 상태 불러오기
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };


  return (
    <Routes>
      <Route path="/main" element={<HomePage isLoggedIn={isLoggedIn} />} />
      <Route path="/search" element={<SearchPage isLoggedIn={isLoggedIn} />} />
      <Route path="/story/:note_id" element={<StoryDetailPage />} />{" "}
      <Route path="/notes/:note_id/episodes/:episode_id" element={<EpisodeDetailPage />} />
      <Route path="/" element={<LoginPage setIsLoggedIn={handleLogin} />} />
      <Route path="/signup" element={<SignupPage setIsLoggedIn={setIsLoggedIn} />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
      <Route path="/posts/:postId?" element={<PostsPage isLoggedIn={isLoggedIn} />} />
      <Route path="/mypage" element={<MyPage isLoggedIn={isLoggedIn} />} />
      <Route path="/mypage/myworks" element={<MyWorksPage isLoggedIn={isLoggedIn} />} />
      <Route path="/mypage/likedworks" element={<LikedWorksPage isLoggedIn={isLoggedIn} />} />
      <Route path="/draft" element={<DraftPost isLoggedIn={isLoggedIn} />} />
      <Route path="/add-episode/:note_id" element={<AddEpisode isLoggedIn={isLoggedIn} />} />
    </Routes>
  );
};

export default AppRoutes;
