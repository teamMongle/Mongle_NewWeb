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

const GenreFilter = ({ title, onSelect }) => {
  const genres =
    title === "연령별 BEST 9"
      ? ["10대", "20대", "30대", "40대"]
      : ["로맨스", "액션", "SF", "판타지", "공포", "문학"];

  const defaultSelected = genres[0];
  const [selectedGenre, setSelectedGenre] = useState(defaultSelected);

  const handleGenreClick = (genre) => {
    const newGenre = genre === selectedGenre ? null : genre;
    setSelectedGenre(newGenre);
    onSelect?.(newGenre);
  };

  return (
    <div>
      <Title>{title}</Title>
      <GenreList>
        {genres.map((genre, index) => (
          <GenreItem
            key={index}
            isSelected={genre === selectedGenre}
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </GenreItem>
        ))}
      </GenreList>
    </div>
  );
};

export default GenreFilter;
