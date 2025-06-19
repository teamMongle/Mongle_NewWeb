import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import AppRoutes from "./routes";

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppRoutes />
    </Router>
  );
};

export default App;
// import React from "react";
// import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import New from "./pages/new/New";


// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/new" element={<New />} />
//     </Routes>
//   )
// }

// export default App;
