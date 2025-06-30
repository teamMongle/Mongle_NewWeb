import styled from "styled-components";

export const Button = styled.button`
    display: block;
    align-items: center;
    position: ${({ $isRelative }) => ($isRelative ? "relative" : "absolute")};
    bottom: ${({ $isRelative }) => ($isRelative ? "20px" : "200px")};

    top: 30px;
    right: 0;

    border-radius: 12px;
    background-color: #121212;
    color: white;
    font-size: 16px;
    font-weight: bold;
    width: 80px;
    height: 45px;
    border: none;
    &:hover {
        cursor: pointer;
    }
    &:disabled {
        background-color: #717171;
        cursor: not-allowed;
    }
`

export const TempSaveButton = styled(Button)`
    background-color: #F3F4F6;
    color: #6B7280;
`;

export const PostHeader = styled.div`
    width: 100%;
    max-width: 1051px;
    height: 80px;
    position: relative;
    top: 100px;
    // left: 50%;
    // transform: translateX(-50%);
    margin: 0 auto;

    border-bottom: 2px solid black;
    font-size: 22px;
    font-weight: 800;

    display: flex;
    align-items: center;

    background-color: white;
    // z-index: 10;
`

export const TextArea = styled.textarea`
    display: flex;
    justify-content: center;
    align-items: center;
    // height: 100vh;

    // top : 0;
    width: 100%;
    max-width: calc(100% - 30px);
    height: 70px;
    border-radius: 12px;
    border: none;
    padding: 15px;
    background-color: #F9FAFB;

    text-align: left;
    vertical-align: top;
    line-height: 1.4;
    resize: none;

    &::placeholder {
        font-size: 16px;
        color: #9CA3AF;
        font-weight: 500;
    }

    &:focus {
        outline: none;
        // box-shadow: 0 0 0 2px #3ddac7;
    }
`

export const P = styled.p`
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 16px 5px;
    text-align: left;
    width: 100%;
    max-width: calc(100% - 10px);
`

export const ImageWrapper = styled.div`
    display: flex;
    // gap: 15px;
    // align-items: stretch;
    align-items: flex-start;
    width: 100%;
    max-width: calc(100% - 10px);
    margin-bottom: 10px;
`;

export const AddPhotoButton = styled.button`
    align-self: flex-start;
    display: flex;
    align-items: center;
    justify-content: center;

    // margin: 24px 32px;
    margin-left: 20px;
    margin-bottom: 16px;
    padding: 8px 14px;

    background-color: #121212;
    border-radius: 12px;
    color: white;
    width: 175px;
    height: 45px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    gap: 6px;

    img {
        width: 20px;
        height: 20px;
        object-fit: contain;
    }
`

export const CoverPreview = styled.div`
    // height: 225px;
    // width: 184px;
    // padding: 10px;

    width: 250px;
    height: 264px;
    // border: 1px solid #ccc;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const TermsAndConditions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;

    border-radius: 12px;
    background-color: #F9FAFB;
    font-size: 14px;
    color: #6B7280;
    font-weight: 600;
    min-height: 245px;
    height: auto;
    justify-content: space-between;

    // min-width: 0;
    box-sizing: border-box;

    @media (max-width: 768px) {
        height: auto;
    }
`

export const TermsComment = styled.p`
    padding: 15px 25px;
    margin: 0;

    font-size: 14px;
    color: #9CA3AF;
    margin-bottom: 10px;


    // font-size: 14px;
    // color: #666;
    line-height: 1.5;
    white-space: pre-line;
`

export const Wrapper = styled.div`
    flex-wrap: wrap;
    // gap: 15px;
    position: relative;

    width: 100%;
    // max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    flex-direction: column;

    display: flex;
    justify-content: center;
`;


export const ButtonWrapper = styled.div`
  margin-left: auto;
`;

export const InputWrapper = styled.div`

`;