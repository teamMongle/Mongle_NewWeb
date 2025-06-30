import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ListContainer = styled.div`
  padding: 24px 0;
  margin-bottom: 60px;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
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

const BestList = ({ title, bestItems = [] }) => {
  return (
    <ListContainer>
      {title && (
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>{title}</h2>
      )}
      <List>
        {bestItems.map((item, index) => (
          <StyledLink
            key={`${item.title}-${item.author}-${index}`}
            to={`/story/${item.id}`}
          >
            <ListItem>
              <Number>{index + 1}</Number>
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemAuthor>
                  {item.author_name ?? item.author ?? "작가 미상"}
                </ItemAuthor>
              </ItemContent>
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </ListContainer>
  );
};

export default BestList;
