import React, { useState } from "react";
import styled from "styled-components";

const GenreList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const GenreItem = styled.li`
  margin: 0;
  margin-right: 12px;
  padding: 8px 24px;
  border-radius: 28px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#121212" : "#f8f9fa")};
  color: ${(props) => (props.isSelected ? "#fff" : "#000")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isSelected ? "#121212" : "#E5E7EB")};
  }
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 16px 0;
`;

const GenreFilter = ({ title }) => {
  const genres =
    title === "연령별 BEST 9"
      ? ["10대", "20대", "30대", "40대"]
      : ["로맨스", "액션", "SF", "판타지", "공포", "문학"];

  const defaultSelected = genres[0]; // 리스트의 첫 번째 요소를 기본 선택값으로 (장르-로맨스, 연령-10대)
  const [selectedGenre, setSelectedGenre] = useState(defaultSelected);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre === selectedGenre ? null : genre);
  };

  return (
    <div>
      <Title>{title}</Title>
      <GenreList>
        {genres.length > 0 ? (
          genres.map((genre, index) => (
            <GenreItem
              key={index}
              isSelected={genre === selectedGenre}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </GenreItem>
          ))
        ) : (
          <p>장르가 없습니다.</p>
        )}
      </GenreList>
    </div>
  );
};

export default GenreFilter;
