import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/layout/header/Header";
import GenreFilter from "../../components/common/GenreFilter";
import Box from "../../components/box/Box";
import * as M from "./PostsPageStyle"
import styled from "styled-components";
import PhotoAdd from "../../assets/images/AddPhoto.svg";
import Default_cover from "../../assets/images/default-cover.png"
import Modal from "../../components/common/Modal";

const InputBox = styled(Box)`
    display: flex;
    flex-direction: ${({ isFirst }) => isFirst ? 'row' : 'column'};
    align-items: ${({ isFirst }) => isFirst ? 'center' : 'flex-start'};
    justify-content: ${({ isFirst }) => isFirst ? 'space-between' : 'flex-start'};
    padding: 5px;
`;

const PostsPage = ({ isLoggedIn, initData }) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [state, setState] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    description: "",
    author_name: ""
  });

  const showAlert = (msg) => {
    setModalMessage(msg);
    setIsConfirm(false);
    setModalVisible(true);
  };

  const showConfirm = (msg, onConfirmCallback) => {
    setModalMessage(msg);
    setIsConfirm(true);
    setModalVisible(true);
    setOnConfirmCallback(() => onConfirmCallback); // callback 저장
  };

  const [onConfirmCallback, setOnConfirmCallback] = useState(() => () => { });

  const handleConfirm = () => {
    if (isConfirm && onConfirmCallback) onConfirmCallback();
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const [previewImage, setPreviewImage] = useState(Default_cover);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        if (!postId) return;

        const token = localStorage.getItem("token");
        const postIdFromUrl = window.location.pathname.split('/').pop(); // 현재 url에서 postId 추출
        const res = await axios.get(`http://3.39.231.73:5000//notes/${postIdFromUrl}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setState({
          title: data.title,
          content: data.content,
          category: data.category,
          image: data.image,
          description: data.description,
          author_name: state.author_name, // 이미 따로 불러오니 유지
        });
        setPreviewImage(data.image || Default_cover); // 불러온 이미지로 preview 세팅
      } catch (err) {
        console.error("글 데이터 불러오기 실패:", err);
      }
    };

    // '수정' 모드일 때만 GET 실행 (주소 끝에 id가 붙어있을 때)
    if (window.location.pathname.includes("/posts/")) {
      fetchPostData();
    }
  }, []);


  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewImage(localPreviewUrl);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://3.39.231.73:5000/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const uploadedImageUrl = response.data.url;
      setState((prev) => ({ ...prev, image: uploadedImageUrl }));
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  console.log(state);

  useEffect(() => {
    if (initData && initData.performance) {
      console.log("initData:", initData);

      setState((prevState) => ({
        ...prevState,
      }));
    }
  }, [initData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://3.39.231.73:5000/users/me", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => {
        const userName = res.data.profile.name;
        setState(prev => ({ ...prev, author_name: userName }));
      })
      .catch(err => {
        console.error("유저 정보 가져오기 실패:", err);
      });
  }, []);

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
      const postIdFromUrl = window.location.pathname.split('/').pop(); // URL에서 postId 추출
      const isEditMode = window.location.pathname.includes("/posts/"); // 수정인지 여부 확인

      let response;
      if (isEditMode) {
        // 수정 모드
        response = await axios.put(`http://3.39.231.73:5000/notes/${postIdFromUrl}`, state, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        showAlert("작품이 수정되었습니다!");
        navigate("/mypage/myworks");
      } else {
        // 새 글 작성 모드
        response = await axios.post("http://3.39.231.73:5000/notes", state, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        showAlert("작품이 등록되었습니다!");
        navigate("/main");
      }
    } catch (error) {
      console.error("글 등록/수정 실패:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!state.title.trim()) {
      showAlert("작품명을 입력해 주세요.");
      return;
    }
    if (!state.description.trim()) {
      showAlert("작품 소개를 입력해 주세요.");
      return;
    }
    if (!state.image || state.image === Default_cover) {
      showAlert("메인 표지 이미지를 등록해 주세요.");
      return;
    }
    // setStep(2);
    // navigate("/add-episode");
    // navigate("/story/:note_id"); // 서버에 보내고.. 다시 받아서 id를 추출,, -> 이동

    handleSubmit(e);
  };

  console.log("state:", state);

  const handleGenreSelect = (selectedGenre) => {
    setState((prevState) => ({
      ...prevState,
      category: selectedGenre || "",
    }));
  };

  return (
    <>
      <M.Wrapper>
        <Header isLoggedIn={isLoggedIn} />
        <div>
          <M.InputWrapper>
            <M.PostHeader>
              작품 등록
            </M.PostHeader>
            <InputBox isFirst={true}>
              <GenreFilter title={"카테고리 선택"} onSelect={handleGenreSelect} />
            </InputBox>
            <InputBox isFirst={false}>
              <M.P>작품명</M.P>
              <M.TextArea
                placeholder="작품명은 40자 이내로 작성해 주세요."
                name="title"
                value={state.title}
                onChange={handleChange}
                maxLength={40}
              />
            </InputBox>
            <InputBox isFirst={false}>
              <M.P>작품소개</M.P>
              <M.TextArea
                placeholder="간단한 작품의 줄거리를 요약해 설명해 주세요!"
                name="description"
                value={state.description}
                onChange={handleChange}
              />
            </InputBox>
            <InputBox isFirst={false}>
              <M.P>메인 표지 이미지</M.P>
              <M.ImageWrapper style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <M.CoverPreview>
                  <img
                    src={previewImage}
                    alt="커버 이미지"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </M.CoverPreview>
                <M.TermsAndConditions>
                  <M.TermsComment>
                    *상표권, 저작권, 명예를 침해할 가능성이 있는 이미지는 사용을 자제해 주세요.<br />
                    *외부 이미지를 사용할 경우, 반드시 작품 소개(줄거리)란에 출처를 명확히 기재해 주세요.<br />
                    *이용 약관에 따라 이미지 사용으로 인한 법적 책임은 해당 이미지를 게시한 사용자에게 있습니다.<br />
                    *규정을 위반한 신고가 접수되면, 운영자의 검토 후 기본 이미지로 변경될 수 있습니다.<br />
                  </M.TermsComment>
                  <M.AddPhotoButton onClick={(e) => e.stopPropagation()}>
                    <label htmlFor="file-upload" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <img src={PhotoAdd} alt="사진 추가 아이콘" />
                      이미지 등록
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={inputRef}
                      onChange={handleFileChange}
                    />
                  </M.AddPhotoButton>
                </M.TermsAndConditions>
              </M.ImageWrapper>
              <M.P style={{ color: "#9CA3AF", fontSize: "14px", fontWeight: 400 }}>
                *사진 비율 (192 x 264px)
              </M.P>
            </InputBox>
            <div style={{ width: "70%", position: "relative", margin: "0 auto", display: "flex" }}>
              <M.Button
                onClick={handleClick}
                disabled={
                  !state.title.trim() ||
                  !state.description.trim() ||
                  !state.image ||
                  state.image === Default_cover
                }
              >
                작품 등록
              </M.Button>
            </div>
          </M.InputWrapper>
        </div>
        <div style={{ height: "200px" }}></div>
      </M.Wrapper>
    </>
  );
};

export default PostsPage;