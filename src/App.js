import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./components/layout/header/Header";
import AppRoutes from "./routes";

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <AppRoutes />
    </Router>
  );
};

export default App;
