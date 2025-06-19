import styled from "styled-components";

export const SearchContainer = styled.div`
  height: calc(100vh - 76px);
  padding-top: 136px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1068px;
`;

export const SearchSection = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 32px;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 51px;
  font-size: 16px;
  padding: 0 44px 0 16px;
  border: none;
  border-bottom: 2px solid #121212;
  border-radius: 0;
  outline: none;
  box-sizing: border-box;
`;

export const SearchButton = styled.button`
  height: 51px;
  width: 100px;
  font-size: 16px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
`;

export const BestTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
`;

export const ResultList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 18px;
`;

export const ResultItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const ItemRank = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  width: 20px;
`;

export const ItemTitle = styled.h4`
  margin: 0;
  font-size: 16px;
`;

export const ItemAuthor = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: #777;
`;

export const SearchIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
