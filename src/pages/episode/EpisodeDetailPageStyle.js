import styled from "styled-components";

export const Container = styled.div`
  padding: 80px 24px 60px;
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.6;
  white-space: pre-wrap;
`;

export const MetaSection = styled.div`
  margin-bottom: 24px;
`;

export const EpisodeLabel = styled.div`
  font-size: 14px;
  color: #999;
  margin-bottom: 8px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 8px;
`;

export const Date = styled.div`
  font-size: 14px;
  color: #bbb;
`;

export const Content = styled.div`
  font-size: 16px;
  color: #222;
  font-weight: 700;
  margin-bottom: 40px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NavButton = styled.button`
  background-color: ${(props) => (props.primary ? "#000" : "#eee")};
  color: ${(props) => (props.primary ? "#fff" : "#333")};
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #ccc;
    color: #888;
    cursor: not-allowed;
  }
`;
