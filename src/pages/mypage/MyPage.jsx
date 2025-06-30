import React, { useEffect, useState } from "react";
import Header from "../../components/layout/header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as M from "./MyPageStyle";
import ProfileIcon from "../../assets/images/mongleProfileIcon.png"
import SideBar from "../../components/sidebar/SideBar.jsx";
import Modal from "../../components/common/Modal";

const MyPage = ({ isLoggedIn }) => {
  const [profile, setProfile] = useState(ProfileIcon);
  const [recentViews, setRecentViews] = useState([]);
  const [myWorks, setMyWorks] = useState([]);
  const [likedWorks, setLikedWorks] = useState([]);
  const [showRecentViewsPage, setShowRecentViewsPage] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState(null);
  const navigate = useNavigate();

  // const showConfirm = (msg, onConfirmCallbackFn) => {
  //   setModalMessage(msg);
  //   setIsConfirm(true);
  //   setModalVisible(true);
  //   setOnConfirmCallback(() => onConfirmCallbackFn);
  // };

  const handleConfirm = () => {
    if (isConfirm && onConfirmCallback) onConfirmCallback();
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onClickLogout = () => {
    navigate("/");
    alert("로그아웃 되었습니다.");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://3.39.231.73:5000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`
        // Authorization: Bearer <JWT 토큰>
      }
    }).then(res => {
      console.log("Server response:", res.data);
      setProfile(res.data.profile);
      setRecentViews(res.data.recent_views || []);
      setMyWorks(res.data.my_works || []);
      setLikedWorks(res.data.liked_works || []);
    }).catch(err => {
      console.error(err);
    });
  }, []);

  return (
    <>
      {modalVisible && (
        <Modal
          message={modalMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          showCancel={isConfirm}
        />
      )}
      <Header isLoggedIn={isLoggedIn} onLoginClick={() => navigate("/")} />
      <SideBar
        // getActiveLinkStyle={getActiveLinkStyle} 
        onClickLogout={onClickLogout}
      />
      <M.Wrapper>
        <M.ProfileContainer>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "20px", position: "relative" }}>
            {/* <div style={{ width: "84px", height: "84px", borderRadius: "50%", backgroundColor: "#DDD" }}></div> */}
            <img src={ProfileIcon} alt="프로필사진" style={{ width: "84px", height: "84px", borderRadius: "50%", backgroundColor: "#DDD" }}></img>
            <div style={{ marginLeft: "28px" }}>
              <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>{profile.username}</div>
              <div style={{ fontSize: "18px", color: "#6B7280" }}>{profile.name}</div>
            </div>
            <button
              style={{
                position: "absolute",
                right: "20px",
                backgroundColor: "#F3F3F3",
                color: "#6B7280",
                border: "none",
                padding: "10px",
                textAlign: "center",
                borderRadius: "12px",
                width: "104px",
                height: "37px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              프로필 수정
            </button>
          </div>
        </M.ProfileContainer>
        <M.RecentViewsContainer>
          <div style={{ display: "flex", width: "700px", flexDirection: "row" }}>
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>최근 본 작품</span>
            <span
              style={{
                position: "absolute",
                right: "30px",
                cursor: "pointer",
              }}
              onClick={() => setShowRecentViewsPage(true)}
            > &gt; </span>
          </div>
          <M.RecentViewsList>
            {recentViews.map((item) => (
              <div key={item.id} style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
                <div style={{ width: "136px", height: "187px", backgroundColor: "#CCC" }}>
                  <img src={item.image} alt={item.title} style={{ width: "136px", height: "187px", objectFit: "cover" }} />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <p style={{ margin: "4px 0" }}>무료연재</p>
                  <p style={{ margin: "4px 0", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "120px" }}>
                    {item.title}
                  </p>
                  <p style={{ margin: "4px 0", color: "#666" }}>{item.author_name}</p>
                </div>
              </div>
            ))}
          </M.RecentViewsList>
        </M.RecentViewsContainer>
      </M.Wrapper>
    </>
  );
};

export default MyPage;