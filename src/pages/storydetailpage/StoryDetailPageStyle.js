import styled from "styled-components";
import HeartIcon from "../../assets/images/heart.svg";
import HeartFilledIcon from "../../assets/images/heart-filled.svg";

export const DetailContainer = styled.div`
  height: calc(100vh - 76px);
  padding-top: 76px;
  box-sizing: border-box;
  padding: 136px 245px;
`;

export const TopSection = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
`;

export const Thumbnail = styled.img`
  width: 240px;
  height: 320px;
  object-fit: cover;
  border-radius: 8px;
`;

export const InfoBox = styled.div`
  flex: 1;
`;

export const FreeTag = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #5a9;
  margin-bottom: 8px;
`;

export const Title = styled.h1`
  font-size: 28px;
  margin: 0;
`;

export const Author = styled.p`
  font-size: 16px;
  color: #999;
  margin: 4px 0 16px;
`;

export const Description = styled.p`
  font-size: 15px;
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap;
`;

export const Hashtags = styled.div`
  margin-top: 12px;
  font-size: 14px;
  color: #707070;
`;

export const TabHeader = styled.div`
  display: flex;
  gap: 24px;
  margin: 40px 0 20px;
  border-bottom: 1px solid #ddd;
`;

export const TabItem = styled.div`
  padding: 12px 16px;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "#000" : "#aaa")};
  cursor: pointer;
  border-bottom: ${(props) => (props.active ? "2px solid #000" : "none")};
`;

export const EpisodeSection = styled.div``;

export const EpisodeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const EpisodeItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background-color: #f9fafb;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const EpisodeInfo = styled.div`
  font-size: 16px;
`;

export const EpisodeDate = styled.div`
  font-size: 13px;
  color: #a0a0a0;
  margin-top: 4px;
`;

export const Like = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #888;
  cursor: pointer;
`;

export const LikeIcon = styled.img.attrs((props) => ({
  src: props.liked ? HeartFilledIcon : HeartIcon,
  alt: "하트 아이콘",
}))`
  width: 16px;
  height: 16px;
  margin-right: 6px;
  vertical-align: middle;
`;

export const EmptyEpisodeMessage = styled.p`
  font-size: 15px;
  color: #888;
  padding: 12px 0;
`;
