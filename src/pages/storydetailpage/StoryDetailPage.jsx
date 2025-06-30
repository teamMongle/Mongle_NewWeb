import React, { useEffect, useState } from "react";
import axios from "axios";
import * as M from "./StoryDetailPageStyle";
import NovelList from "../../components/common/NovelList";
import { useParams, Link, useNavigate } from "react-router-dom";
import BackHeader from "../../components/layout/header/BackHeader";;

const StoryDetailPage = () => {
  const { note_id } = useParams();
  const [note, setNote] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("episodes");
  const [likesState, setLikesState] = useState({});
  const [myWorks, setMyWorks] = useState([]);
  const [isMyNote, setIsMyNote] = useState(false);
  const [authorWorks, setAuthorWorks] = useState([]);
  const navigate = useNavigate();

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

        const episodeList = response.data.episodes || [];
        setNote(response.data);
        setEpisodes(episodeList);

        checkIsMyNote(response.data.id);

        // Check if this is my note
        //   const userResponse = await axios.get("http://3.39.231.73:5000/users/me", {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   });
        //   const myWorksList = userResponse.data.myWorks || [];
        //   setMyWorks(myWorksList);


        //   const isMine = myWorksList.some(work => work.id === response.data.id);
        //   setIsMyNote(isMine);

        //   const initLikesState = {};
        //   episodeList.forEach((ep) => {
        //     initLikesState[ep.episodeId] = {
        //       liked: false,
        //       likes: ep.likes || 0,
        //     };
        //   });
        //   setLikesState(initLikesState);
        // } catch (err) {
        //   console.error("API 에러:", err);
        //   setError(
        //     err.response?.data?.error || err.response?.data?.msg || "오류 발생"
        //   );


      } catch (err) {
        console.err(err);
      }
    };

    // 내 작품 여부 확인 함수
    const checkIsMyNote = async (note_id) => {
      try {
        const token = localStorage.getItem("token");
        const userResponse = await axios.get("http://3.39.231.73:5000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(userResponse.data.myWorks)
        const myWorksList = userResponse.data.myWorks;
        setMyWorks(myWorksList);
        const isMine = myWorksList.some((work) => work.id == note_id);
        console.log("isMine", isMine)
        setIsMyNote(isMine);
      } catch (err) {
        console.error("내 작품 여부 확인 실패:", err);
      }
    };

    fetchNoteDetail();
  }, [note_id]);


  const otherWorks = async () => {
    try {
      const response = await axios.get(`http://3.39.231.73:5000/note/${note_id}/author/works`);
      console.log("OtherWorks", response.data);
      setAuthorWorks(response.data);
    } catch(err) {
      console.error(err);
    }
  }
  // http://3.36.64.165:5000/note/$note_id}/author/works


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const novelsResponse = await axios.get("http://3.39.231.73:5000/notes");
  //       console.log("소설 목록 API 연결 성공!");
  //       console.log(novelsResponse.data);

  //       const bestItemsResponse = await axios.get(
  //         "http://3.39.231.73:5000/best9"
  //       );
  //       console.log("베스트 목록 API 연결 성공!");
  //       console.log(bestItemsResponse.data);

  //       const novelsData = novelsResponse.data;
  //       const bestItemsData = bestItemsResponse.data;

  //       const bestItemsWithAuthor = bestItemsData.map((item) => {
  //         const matchedNovel = novelsData.find(
  //           (novel) => novel.author_id === item.author_id
  //         );
  //         return {
  //           ...item,
  //           author_name:
  //             matchedNovel?.author_name ?? item.author ?? "작가 미상",
  //         };
  //       });

  //       setNovels(novelsData);
  //       setBestItems(bestItemsWithAuthor);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("API 호출 오류", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);


  // console.log("myWorks", myWorks)

  const toggleLike = (episodeId) => {
    setLikesState((prev) => {
      const prevLiked = prev[episodeId]?.liked || false;
      const prevLikes = prev[episodeId]?.likes || 0;

      return {
        ...prev,
        [episodeId]: {
          liked: !prevLiked,
          likes: prevLiked ? prevLikes - 1 : prevLikes + 1,
        },
      };
    });
  };

  if (error) return <div>{error}</div>;
  if (!note) return <div>로딩 중...</div>;

  return (
    <>
      <BackHeader />
      <M.DetailContainer>
        <M.TopSection>
          <M.Thumbnail src={note.image} alt="썸네일" />
          <M.InfoBox>
            <M.FreeTag>무료 연재</M.FreeTag>
            <M.Title>{note.title}</M.Title>
            <M.Author>{note.author_name}</M.Author>
            <M.Description>{note.description}</M.Description>
            <M.Hashtags>#{note.category}</M.Hashtags>
          </M.InfoBox>
        </M.TopSection>

        <M.TabHeader>
          <M.TabItem
            $active={activeTab === "episodes"}
            onClick={() => setActiveTab("episodes")}
          >
            연재 목록
          </M.TabItem>
          <M.TabItem
            $active={activeTab === "others"}
            onClick={() => {
              setActiveTab("others")
              otherWorks(note_id)
            }}
          >
            작가의 다른 작품
          </M.TabItem>
        </M.TabHeader>

        {/* {activeTab === "episodes" ? (
          <M.EpisodeSection>
            {episodes.length === 0 ? (
              <>
                <M.EmptyEpisodeMessage>
                  에피소드가 아직 없습니다.
                </M.EmptyEpisodeMessage>
                <button onClick={() => navigate("/add-episode")}>add episode</button> */}



        {activeTab === "episodes" ? (
          <M.EpisodeSection>
            {episodes.length === 0 ? (
              <>
                {isMyNote && (
                  // <button onClick={() => navigate(`/add-episode/${note.id}`)}>
                  <M.EpisodeAddButton onClick={() => navigate(`/add-episode/${note_id}`)}>
                    {/* &#43; 회차추가 */}
                    <span style={{ fontSize: "23px", fontWeight: "300", }}>&#43;&nbsp;</span>
                    <span>회차추가</span>
                  </M.EpisodeAddButton>
                  // <img src={AddEpisode} />
                )}
                <M.EmptyEpisodeMessage>
                  에피소드가 아직 없습니다.
                </M.EmptyEpisodeMessage>
              </>
            ) : (
              <M.EpisodeList>
                {isMyNote && (
                  // <button onClick={() => navigate(`/add-episode/${note.id}`)}>
                  <M.EpisodeAddButton onClick={() => navigate(`/add-episode/${note_id}`)}>
                    {/* &#43; 회차추가 */}
                    <span style={{ fontSize: "23px", fontWeight: "300", }}>&#43;&nbsp;</span>
                    <span>회차추가</span>
                  </M.EpisodeAddButton>
                )}
                {[...episodes].reverse().map((ep, index) => {
                  const likeState = likesState[ep.episodeId] || {
                    liked: false,
                    likes: ep.likes || 0,
                  };

                  return (

                    <M.EpisodeItem key={ep.episodeId}>
                      {/* 
                      
                      {myUserId === note.author_id && (
                      <button onClick={() => navigate(`/add-episode/${note.id}`)}>
                        add episode
                      </button>

                      
                      */}
                      <Link
                        to={`/notes/${note_id}/episodes/${ep.episodeId}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <M.EpisodeInfo>
                          <div
                            style={{
                              display: "flex",
                              gap: "12px",
                              alignItems: "center",
                            }}
                          >
                            <strong>{`${episodes.length - index}화`}</strong>
                            <div>
                              {ep.title || `에피소드 ${ep.episodeNumber}`}
                            </div>
                          </div>
                          <M.EpisodeDate>
                            {new Date(ep.createdAt)
                              .toISOString()
                              .slice(0, 10)
                              .replace(/-/g, ".")}
                          </M.EpisodeDate>
                        </M.EpisodeInfo>
                      </Link>
                      <M.Like onClick={() => toggleLike(ep.episodeId)}>
                        <M.LikeIcon $liked={likeState.liked} />
                        {likeState.likes}
                      </M.Like>
                    </M.EpisodeItem>
                  );
                })}
              </M.EpisodeList>
            )}
          </M.EpisodeSection>
        ) : (
          <NovelList
            novels={
              authorWorks
              // [{
              //   ...note,
              //   id: note.note_id,
              //   image: note.image,
              //   title: note.title,
              //   author_id: note.author_name,
              // },]
            }
          />
        )}
      </M.DetailContainer>
    </>
  );
};

export default StoryDetailPage;
