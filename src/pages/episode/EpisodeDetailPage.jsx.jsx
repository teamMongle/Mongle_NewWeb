import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import * as M from "./EpisodeDetailPageStyle";
import BackHeader from "../../components/layout/header/BackHeader";

const EpisodeDetailPage = () => {
  const { note_id, episode_id } = useParams();
  const navigate = useNavigate();

  const [episodes, setEpisodes] = useState([]);
  const [episode, setEpisode] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNoteAndFindEpisode = async () => {
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

        const allEpisodes = response.data.episodes || [];
        setEpisodes(allEpisodes);

        const foundEpisode = allEpisodes.find(
          (ep) => String(ep.episodeId) === String(episode_id)
        );

        if (!foundEpisode) {
          setError("해당 에피소드를 찾을 수 없습니다.");
        } else {
          setEpisode(foundEpisode);
        }
      } catch (err) {
        console.error("에피소드 조회 에러:", err);
        setError(
          err.response?.data?.error ||
            err.response?.data?.msg ||
            "에피소드 정보를 불러오는 중 오류가 발생했습니다."
        );
      }
    };

    fetchNoteAndFindEpisode();
  }, [note_id, episode_id]);

  const currentIndex = episodes.findIndex(
    (ep) => String(ep.episodeId) === String(episode_id)
  );

  const goToEpisode = (indexChange) => {
    const newIndex = currentIndex + indexChange;
    if (newIndex >= 0 && newIndex < episodes.length) {
      const newEpisodeId = episodes[newIndex].episodeId;
      navigate(`/notes/${note_id}/episodes/${newEpisodeId}`);
    }
  };

  if (error) return <M.Container>{error}</M.Container>;
  if (!episode) return <M.Container>로딩 중...</M.Container>;

  return (
    <>
      <BackHeader />
      <M.Container>
        <M.MetaSection>
          <M.EpisodeLabel>{`${episode.episodeNumber}화`}</M.EpisodeLabel>
          <M.Title>{episode.title || `${episode.episodeNumber}화`}</M.Title>
          <M.Date>
            {new Date(episode.createdAt)
              .toISOString()
              .slice(0, 10)
              .replace(/-/g, ".")}
          </M.Date>
        </M.MetaSection>
        <M.Content>{episode.content}</M.Content>
        <M.ButtonWrapper>
          <M.NavButton
            onClick={() => goToEpisode(-1)}
            disabled={currentIndex <= 0}
          >
            이전 화 보기
          </M.NavButton>
          <M.NavButton
            primary
            onClick={() => goToEpisode(1)}
            disabled={currentIndex >= episodes.length - 1}
          >
            다음 화 보기
          </M.NavButton>
        </M.ButtonWrapper>
      </M.Container>
    </>
  );
};

export default EpisodeDetailPage;