import styled from "styled-components";

export const ProfileSection = styled.div`
  width: 700px;
	height: 300px;
	justify-content: center;
`;

export const RecentViewsSection = styled.div`
	widht: 700px;
	height: 500px;

`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 270px);
  margin-left: 270px;
  // margin-top: 50px;
  padding: 20px;
  max-width: 1068px;
`;

export const ProfileContainer = styled.div`
  // display: flex;
  // flex-direction: row;
  // align-items: center;
  // width: 100%;
  // height: 200px;
  // margin-bottom: 20px;
  // border: 1px solid #ddd;
  // border-radius: 10px;

	margin-top: 140px;
	margin-left: 150px;
	max-width: 800px;
	width: 85%;
`;

export const RecentViewsContainer = styled.div`
  display: flex;
  max-width: 800px;
	width: 80%;
  height: 330px;
  // border: 1px solid #F3F3F3;
  border-radius: 10px;
  padding: 25px;
	margin-left: 150px;

	position: relative;
	flex-direction: column;
	overflow: hidden;

	::-webkit-scrollbar {
    display: none;
	}
`;

export const RecentViewsList = styled.div`
	display: flex;
	flex-direction: row;
	gap: 12px;
	text-align: left;
	overflow-x: auto;
	
`;