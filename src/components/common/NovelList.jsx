import React from "react";
import styled from "styled-components";
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

const NovelList = ({ novels }) => {
  return (
    <ListContainer>
      {novels.map((novel, index) => (
        <NovelCard key={index} {...novel} />
      ))}
    </ListContainer>
  );
};

export default NovelList;
