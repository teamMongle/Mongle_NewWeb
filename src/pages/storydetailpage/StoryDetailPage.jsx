import React, { useEffect, useState } from "react";
import axios from "axios";
import * as M from "./StoryDetailPageStyle";
import NovelList from "../../components/common/NovelList";
import { useParams, Link } from "react-router-dom";
import BackHeader from "../../components/layout/header/BackHeader";

const StoryDetailPage = () => {
  const { note_id } = useParams();
  const [note, setNote] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("episodes");
  const [likesState, setLikesState] = useState({});

  useEffect(() => {
    const fetchNoteDetail = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://3.36.64.165:5000/notes/${note_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const episodeList = response.data.episodes || [];
        setNote(response.data);
        console.log("response", response.data);
        setEpisodes(episodeList);

        const initLikesState = {};
        episodeList.forEach((ep) => {
          initLikesState[ep.episodeId] = {
            liked: false,
            likes: ep.likes || 0,
          };
        });
        setLikesState(initLikesState);
      } catch (err) {
        console.error("API 에러:", err);
        setError(
          err.response?.data?.error || err.response?.data?.msg || "오류 발생"
        );
      }
    };

    fetchNoteDetail();
  }, [note_id]);

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
            active={activeTab === "episodes"}
            onClick={() => setActiveTab("episodes")}
          >
            연재 목록
          </M.TabItem>
          <M.TabItem
            active={activeTab === "others"}
            onClick={() => setActiveTab("others")}
          >
            작가의 다른 작품
          </M.TabItem>
        </M.TabHeader>

        {activeTab === "episodes" ? (
          <M.EpisodeSection>
            {episodes.length === 0 ? (
              <M.EmptyEpisodeMessage>
                에피소드가 아직 없습니다.
              </M.EmptyEpisodeMessage>
            ) : (
              <M.EpisodeList>
                {[...episodes].reverse().map((ep, index) => {
                  const likeState = likesState[ep.episodeId] || {
                    liked: false,
                    likes: ep.likes || 0,
                  };

                  return (
                    <M.EpisodeItem key={ep.episodeId}>
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
                        <M.LikeIcon liked={likeState.liked} />
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
            novels={[
              {
                ...note,
                id: note.note_id,
                image: note.image,
                title: note.title,
                author_id: note.author_name,
              },
            ]}
          />
        )}
      </M.DetailContainer>
    </>
  );
};

export default StoryDetailPage;
