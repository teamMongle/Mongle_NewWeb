import React from "react";
import styled from "styled-components";

const GenreList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 40px;
`;

const GenreItem = styled.li`
  margin: 0;
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

const GenreFilter = ({ title = "장르", selected, onChange }) => {
  const genres =
    title === "연령별 BEST 9"
      ? ["10대", "20대", "30대", "40대"]
      : ["로맨스", "액션", "SF", "판타지", "공포", "문학"];

  const handleGenreClick = (genre) => {
    if (genre !== selected) {
      onChange?.(genre);
    }
  };

  return (
    <div>
      <Title>{title}</Title>
      <GenreList>
        {genres.map((genre) => (
          <GenreItem
            key={genre}
            isSelected={genre === selected}
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
