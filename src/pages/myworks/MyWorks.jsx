import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/layout/header/Header";
import axios from "axios";
import * as M from "./MyWorksStyle";
import like from "../../assets/images/like.png"
import view from "../../assets/images/view.png"
import { useNavigate } from "react-router-dom";
import Modal from "../../components/common/Modal";

const MyWorksPage = ({ isLoggedIn }) => {
  const [myWorks, setMyWorks] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchMyWorks = async () => {
      try {
        const response = await axios.get(
          "http://3.39.231.73:5000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        console.log(response.data.myWorks);
        setMyWorks(response.data.myWorks)
        setUser(response.data.profile)

      } catch (error) {
        console.error("내 작품 가져오기 실패:", error);
      }
    };

    fetchMyWorks();
  }, []);

  const showAlert = (msg) => {
    setModalMessage(msg);
    setIsConfirm(false);
    setModalVisible(true);
    setOnConfirmCallback(null);
  };

  const showConfirm = (msg, onConfirmCallbackFn) => {
    setModalMessage(msg);
    setIsConfirm(true);
    setModalVisible(true);
    setOnConfirmCallback(() => onConfirmCallbackFn);
  };

  const handleConfirm = () => {
    if (isConfirm && onConfirmCallback) onConfirmCallback();
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      {modalVisible && (
        <Modal
          message={modalMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          showCancel={isConfirm}
          confirmLabel={isConfirm ? "작품 삭제" : "확인"}
        />
      )}
      <Header isLoggedIn={isLoggedIn} />
      <SideBar style={{ position: "fixed" }} />
      <div style={{ position: "absolute", flexWrap: "wrap", gap: "20px", padding: "20px", marginTop: "100px", marginLeft: "400px" }}>
        {Array.isArray(myWorks) && myWorks.length > 0 ? (
          myWorks.map((work, index) => (
            <div key={work.id} style={{ width: "840px", borderBottom: "1px solid #E5E7EB", }}>
              {index === 0 && (
                <div style={{ width: "840px", borderTop: "1px solid #E5E7EB", paddingBottom: "" }} />
              )}
              <M.MYWORKS
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/story/${work.id}`)}
              >
                {/* <div 
                  onClick={() => navigate(`story/${work.id}`)}
                  style={{ position: "absolute", width: "400px", }}
                > */}
                <img
                  src={work.image}
                  alt={work.title}
                  style={{
                    width: "100px",
                    height: "150px",
                    objectFit: "cover",
                    marginRight: "10px"
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ margin: "0", color: "#9CA3AF", fontSize: "12px" }}>{work.category}</p>
                  <h3 style={{ margin: "0", fontSize: "16px" }}>{work.title}</h3>
                  <p style={{ margin: "0", fontSize: "14px", color: "#9CA3AF" }}>
                    {/* {new Date(work.createdAt)
                      .toISOString()
                      .slice(0, 10)
                      .replace(/-/g, ".")} */}
                    {new Date(work.created_at).toISOString().slice(0, 10).replace(/-/g, ".")}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "60px" }}>
                    <img src={like} style={{ width: "13px", height: "11px" }} alt="like" />{work.likes}
                    <img src={view} style={{ width: "16px", height: "17px" }} alt="view" />0
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginLeft: "auto",
                    marginRight: "40px",
                  }}
                >
                  {/* </div> */}
                  <button
                    style={{
                      width: "92px",
                      height: "37px",
                      padding: "5px",
                      backgroundColor: "#F3F4F6",
                      color: "#6B7280",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const token = localStorage.getItem("token");
                      axios.get(`http://3.39.231.73:5000/notes/${work.id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                      }).then(res => {
                        // Assuming posts page can accept initData via navigation state
                        window.location.href = `/posts/${work.id}`;
                      }).catch(err => {
                        console.error("수정 데이터 불러오기 실패:", err);
                        alert("수정 페이지로 이동 실패");
                      });
                    }}
                  >
                    작품 수정
                  </button>
                  <button
                    style={{
                      width: "92px",
                      height: "37px",
                      padding: "5px",
                      backgroundColor: "#F3F4F6",
                      color: "#6B7280",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // if (showConfirm("정말 삭제하시겠습니까?")) {
                      //   const token = localStorage.getItem("token");
                      //   axios.delete(`http://3.39.231.73:5000/notes/${work.id}`, {
                      //     headers: { Authorization: `Bearer ${token}` }
                      //   }).then(() => {
                      //     alert("삭제 성공");
                      //     window.location.reload();
                      //   }).catch(err => {
                      //     console.error("삭제 실패:", err);
                      //     alert("삭제 실패");
                      //   });
                      // }
                      showConfirm("정말 삭제하시겠습니까?", () => {
                        const token = localStorage.getItem("token");
                        axios.delete(`http://3.39.231.73:5000/notes/${work.id}`, {
                          headers: { Authorization: `Bearer ${token}` }
                        })
                          .then(() => {
                            showAlert("삭제 성공");
                            setMyWorks(prev => prev.filter(item => item.id !== work.id));
                          })
                          .catch(err => {
                            console.error("삭제 실패:", err);
                            showAlert("삭제 실패");
                          });
                      });
                    }}
                  >
                    작품 삭제
                  </button>
                </div>
              </M.MYWORKS>
            </div>
          ))
        ) : (
          // <p>작성한 작품이 없습니다.</p>
          <></>
        )}
      </div>
    </>
  );
};

export default MyWorksPage;