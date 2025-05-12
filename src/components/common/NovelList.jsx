import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import NovelCard from "./NovelCard";

const ListContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 16px 0;
  white-space: nowrap;
  scrollbar-width: thin;
  -ms-overflow-style: none;
  margin-bottom: 60px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
`;

const NovelList = ({ novels }) => {
  return (
    <ListContainer>
      {novels.map((novel) => (
        <StyledLink key={novel.id} to={`/story/${novel.id}`}>
          <NovelCard {...novel} />
        </StyledLink>
      ))}
    </ListContainer>
  );
};

export default NovelList;
