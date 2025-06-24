import styled from "styled-components";

const BoxWrapper = styled.div`
  display: flex;
  // width: 67.4%;
  width: 1020px;
  // width: 100%;
  // max-widht:1000px;
  border-radius: 20px;
  border: 1px solid #E5E7EB;
  padding: 15px 15px 20px 15px;

  margin: ${({ isFirst }) => (isFirst ? "160px auto 0px" : "20px auto 0px")};
  background-color: white;


  flex-direction: column;

  justify-content: ${({ isFirst }) => (isFirst ? "flex-start" : "center")};
  align-items: ${({ isFirst }) => (isFirst ? "flex-start" : "center")};
`;

const Box = ({ children, isFirst }) => {
  return <BoxWrapper isFirst={isFirst}>{children}</BoxWrapper>;
};

export default Box;