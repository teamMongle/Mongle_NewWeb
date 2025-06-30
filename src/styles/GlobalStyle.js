import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Pretendard', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    line-height: 1.5;
  }

  h1 {
    font-size: 32px;
    line-height: 130%;
  }
  h1.bold {
    font-weight: 700;
  }
  h1.medium {
    font-weight: 500;
  }

  h2 {
    font-size: 28px;
    line-height: 130%;
  }
  h2.bold {
    font-weight: 700;
  }
  h2.medium {
    font-weight: 500;
  }

  h3 {
    font-size: 24px;
    line-height: 140%;
  }
  h3.bold {
    font-weight: 700;
  }
  h3.medium {
    font-weight: 500;
  }

  h4 {
    font-size: 20px;
    line-height: 140%;
  }
  h4.bold {
    font-weight: 700;
  }
  h4.medium {
    font-weight: 500;
  }

  /* b1, b2 스타일 */
  .b1 {
    font-size: 18px;
    line-height: 150%;
  }
  .b1.bold {
    font-weight: 600;
  }
  .b1.medium {
    font-weight: 500;
  }

  .b2 {
    font-size: 16px;
    line-height: 150%;
  }
  .b2.bold {
    font-weight: 600;
  }
  .b2.medium {
    font-weight: 500;
  }

  button {
    font-size: 14px;
    line-height: 150%;
  }
  button.bold {
    font-weight: 600;
  }
  button.medium {
    font-weight: 400;
  }

  .caption {
    font-size: 12px;
    line-height: 150%;
  }
  .caption.bold {
    font-weight: 600;
  }
  .caption.medium {
    font-weight: 400;
  }
`;

export default GlobalStyle;
