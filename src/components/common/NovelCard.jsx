import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 180px;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 248px;
  object-fit: cover;
`;

const Tag = styled.span`
  font-size: 12px;
  color: ${(props) => (props.isFree ? "#5A9" : "#E44")};
  font-weight: bold;
  margin-top: 6px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 4px 0 0 0;
`;

const Author = styled.p`
  font-size: 14px;
  color: #9ca3af;
`;

const NovelCard = ({ image, title, author, isFree }) => {
  return (
    <Card>
      <Thumbnail src={image} alt={title} />
      <Tag isFree={isFree}>{isFree ? "무료 연재" : "유료 연재"}</Tag>
      <Title>{title}</Title>
      <Author>{author}</Author>
    </Card>
  );
};

export default NovelCard;
