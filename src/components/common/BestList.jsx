import React from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  padding: 24px 0;
  margin-bottom: 60px;
`;

const ListTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 16px 0;
  color: #1a1a1a;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Number = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: #1a1a1a;
  line-height: 1;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: #1a1a1a;
  line-height: 1.4;
`;

const ItemAuthor = styled.p`
  font-size: 14px;
  color: #8b95a1;
  margin: 0;
  line-height: 1;
`;

const BestList = ({ title }) => {
  const bestItems = [
    { id: 1, title: "월급루팡하려다 진짜 루팡이 되었다", author: "최승주" },
    { id: 2, title: "신입생이 개발을 너무 잘함", author: "티미름" },
    { id: 3, title: "취업 못한 3학년인 내가 눈떠보니 CEO?", author: "기안07" },
    { id: 4, title: "학생 그만두고 개발자 합니다", author: "겨울추어" },
    { id: 5, title: "SSS급 풀스택 개발자", author: "갤러거" },
    { id: 6, title: "어둠의 기업에서 능력 흡수합니다", author: "두미" },
    { id: 7, title: "백작가의 투명드래곤 개발자가 되었다!", author: "오말년" },
    { id: 8, title: "버그 수정했는데 현실이 바뀌었다", author: "최연정" },
    { id: 9, title: "개발자가 너무 강함@", author: "242자까" },
  ];

  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <List>
        {bestItems.map((item) => (
          <ListItem key={item.id}>
            <Number>{item.id}</Number>
            <ItemContent>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemAuthor>{item.author}</ItemAuthor>
            </ItemContent>
          </ListItem>
        ))}
      </List>
    </ListContainer>
  );
};

export default BestList;
