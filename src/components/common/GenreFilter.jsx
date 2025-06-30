import React, { useState, useEffect } from "react";
import styled from "styled-components";

const GenreList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding-left: 5px;
  display: flex;
  flex-wrap: wrap;
`;

const GenreItem = styled.li`
  margin: 0 10px 12px 0;
  padding: 8px 24px;
  border-radius: 28px;
  cursor: pointer;
  background-color: ${(props) => (props.$isSelected ? "#121212" : "#f8f9fa")};
  color: ${(props) => (props.$isSelected ? "#fff" : "#000")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$isSelected ? "#121212" : "#E5E7EB")};
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 16px 5px;
`;

const GenreFilter = ({ title, selected, onChange, onSelect }) => {
  const genres =
    title === "연령별 BEST 9"
      ? ["10대", "20대", "30대", "40대"]
      : ["로맨스", "액션", "SF", "판타지", "공포", "문학"];
        // "추리", "스포츠", "시", "소설", "수필", "무협", "로맨스판타지"

  const defaultSelected = genres[0];
  // const defaultSelected = title === "연령별 BEST 9" ? genres[0] : "로맨스";
  const [selectedGenre, setSelectedGenre] = useState(defaultSelected);

  useEffect(() => {
    onSelect?.(defaultSelected);
  }, []);

  const handleGenreClick = (genre) => {
    const newGenre = genre === selectedGenre ? null : genre;
    setSelectedGenre(newGenre);
    onSelect?.(newGenre);
    onChange?.(newGenre);
  };

  return (
    <div>
      <Title>{title}</Title>
      <GenreList>
        {genres.map((genre, index) => (
          <GenreItem
            key={index}
            $isSelected={genre === selectedGenre}
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