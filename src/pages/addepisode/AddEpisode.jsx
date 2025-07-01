import * as M from "./AddEpisodeStyle";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Box from "../../components/box/Box";
import styled from "styled-components";
import Header from "../../components/layout/header/Header";
import Modal from "../../components/common/Modal";

const InputBox = styled(Box)`
    display: flex;
    position: relative;
    flex-direction: ${({ isFirst }) => isFirst ? 'row' : 'column'};
    align-items: ${({ isFirst }) => isFirst ? 'center' : 'flex-start'};
    justify-content: ${({ isFirst }) => isFirst ? 'space-between' : 'flex-start'};
    padding: 5px;
`;

const AddEpisode = ({ isLoggedIn }) => {
  const { note_id } = useParams();
  const navigate = useNavigate();
  // const [isMyNote, setIsMyNote] = useState(false);
  const [inputCount, setInputCount] = useState(0);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState(() => () => { });
  const [state, setState] = useState({
    workId: note_id,
    content: "",
    is_draft: false
  });

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

  const onTextareaHandler = (e) => {
    // setInputCount(
    // e.target.value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length
    // );
    setInputCount(e.target.value.length);
  };

  useEffect(() => {
    const fetchNoteDetail = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://3.39.231.73:5000/notes/${note_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("noteID", note_id)

        const episodeList = response.data.episodes || [];
        console.log("response", response.data);
        // setState(workId)

        // Check if this is my note
        // const userResponse = await axios.get("http://3.39.231.73:5000/users/me", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // const myWorksList = userResponse.data.myWorks || [];
        // setMyWorks(myWorksList);


        // const isMine = myWorksList.some(work => work.id === response.data.id);
        // setIsMyNote(isMine);

        // const initLikesState = {};
        // episodeList.forEach((ep) => {
        //   initLikesState[ep.episodeId] = {
        //     liked: false,
        //     likes: ep.likes || 0,
        //   };
        // });
        // setLikesState(initLikesState);
      } catch (err) {
        console.error("API 에러:", err.response?.data?.error || err.response?.data?.msg || "오류 발생"
        );
      }
    };

    fetchNoteDetail();
  }, [note_id]);

  // useEffect(() => {
  //   const fetchPostData = async () => {
  //     try {
  //       if (!postId) return;

  //       const token = localStorage.getItem("token");
  //       const postIdFromUrl = window.location.pathname.split('/').pop(); // 현재 url에서 postId 추출
  //       const res = await axios.get(`http://3.39.231.73:5000/notes/${postIdFromUrl}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const data = res.data;
  //       setState({
  //         title: data.title,
  //         content: data.content,
  //         category: data.category,
  //         image: data.image,
  //         description: data.description,
  //         author_name: state.author_name, // 이미 따로 불러오니 유지
  //       });
  //       setPreviewImage(data.image || Default_cover); // 불러온 이미지로 preview 세팅
  //     } catch (err) {
  //       console.error("글 데이터 불러오기 실패:", err);
  //     }
  //   };

  //   // '수정' 모드일 때만 GET 실행 (주소 끝에 id가 붙어있을 때)
  //   if (window.location.pathname.includes("/posts/")) {
  //     fetchPostData();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (initData && initData.performance) {
  //     console.log("initData:", initData);

  //     setState((prevState) => ({
  //       ...prevState,
  //     }));
  //   }
  // }, [initData]);

  // useEffect(() => {
  // 	const token = localStorage.getItem("token");
  // 	axios.get("http://3.39.231.73:5000/users/me", {
  // 		headers: {
  // 			"Authorization": `Bearer ${token}`,
  // 		},
  // 	})
  // 		.then(res => {
  // 			const userName = res.data.profile.name;
  // 			setState(prev => ({ ...prev, author_name: userName }));
  // 		})
  // 		.catch(err => {
  // 			console.error("유저 정보 가져오기 실패:", err);
  // 		});
  // }, []);

  console.log(state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "p_title" && value.length > 30) {
      return;
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(state);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // const workIdFromUrl = window.location.pathname.split('/').pop(); // URL에서 postId 추출
      const isEditMode = window.location.pathname.includes("/posts/"); // 수정인지 여부 확인

      let response;
      // if (isEditMode) {
      // 	// 수정 모드
      // 	response = await axios.put(`http://3.39.231.73:5000/notes/${postIdFromUrl}`, state, {
      // 		headers: {
      // 			"Authorization": `Bearer ${token}`,
      // 		},
      // 	});
      // 	alert("작품이 수정되었습니다!");
      // 	navigate("/mypage/myworks");
      // } else {
      // const noteId = window.location.pathname.split('/').pop();
      setState((prev) => ({ ...prev, workId: note_id }));

      const noteResponse = await axios.get(
        `http://3.39.231.73:5000/notes/${note_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const episodeList = noteResponse.data.episodes || [];

      // 새 글 작성 모드

      response = await axios.post("http://3.39.231.73:5000/api/episode", { ...state, workId: parseInt(note_id) }, {
        headers: {
          "Authorization": `Bearer ${token}`,
          is_draft: false
        },
      });


      showAlert("회차가 등록되었습니다!");
      navigate(`/story/${note_id}`);
      // }
    } catch (error) {
      // console.error("글 등록/수정 실패:", error);
    }
  };


  console.log("state:", state);

  const onClickDraft = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `http://3.39.231.73:5000/api/episode/`,
      // `http://3.36.64.165:5000/api/episode/`,
      {
        // workId: workId,
        content: state.content,
        is_draft: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }

  // POST http://3.36.64.165:5000/api/episode

  // useEffect(() => {
  //     const postDraft = async () => {
  //       try {
  //         const token = localStorage.getItem("token");
  //         const response = await axios.post(
  //           `http://3.36.64.165:5000/api/episode/`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );

  //         const allEpisodes = response.data.episodes || [];
  //         setEpisodes(allEpisodes);

  //         const foundEpisode = allEpisodes.find(
  //           (ep) => String(ep.episodeId) === String(episode_id)
  //         );

  //         if (!foundEpisode) {
  //           setError("해당 에피소드를 찾을 수 없습니다.");
  //         } else {
  //           setEpisode(foundEpisode);
  //         }
  //       } catch (err) {
  //         console.error("에피소드 조회 에러:", err);
  //         setError(
  //           err.response?.data?.error ||
  //           err.response?.data?.msg ||
  //           "에피소드 정보를 불러오는 중 오류가 발생했습니다."
  //         );
  //       }
  //     };
  //   });

  return (
    <>
      {modalVisible && (
        <Modal
          message={modalMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          showCancel={isConfirm}
          confirmLabel="확인"
        />
      )}
      <Header isLoggedIn={isLoggedIn} />
      <form>
        <M.InputWrapper>
          <M.PostHeader>
            글 쓰기
          </M.PostHeader>
          {/* <M.Button
						onClick={handleOnGoBack}
						style={{
							top: "245px",
							left: "230px",
						}}
					>
						이전
					</M.Button> */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              marginBottom: "12px",
              position: "relative",
              top: "110px",
              right: "210px",
            }}
          >
            <M.TempSaveButton $isRelative onClick={() => {
              onClickDraft()
              // localStorage.setItem("draftPost", JSON.stringify(state));
              // alert("임시 저장 완료!");
            }}>
              임시 저장
            </M.TempSaveButton>
            <M.Button
              $isRelative
              disabled={!state.content.trim()}
              onClick={(e) => handleSubmit(e)}
            // style={{ opacity: state.content.trim() ? 1 : 0.5, cursor: state.content.trim() ? 'pointer' : 'not-allowed' }}
            >
              게시
            </M.Button>
          </div>
          <InputBox isFirst={true}>
            <M.P>작품 글쓰기</M.P>
            <span
              style={{
                display: "flex",
                position: "absolute",
                right: 230,
                color: "#9CA3AF"
              }}
            >
              {inputCount}/80,000자
            </span>
            <M.TextArea
              type="text"
              placeholder="이곳에 글을 작성해 주세요."
              name="content"
              value={state.content}
              onChange={(e) => {
                handleChange(e)
                onTextareaHandler(e)
              }}
              maxLength="80000"
              style={{ height: "750px", }}
            />
          </InputBox>
        </M.InputWrapper>
      </form>
    </>
  )
}

export default AddEpisode;