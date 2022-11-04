import React from "react";
import PageLayout from "./components/PageLayout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Watch from "./pages/Watch";
import Wallet from "./pages/Wallet";
import Profiles from "./pages/Profiles";
import useResize from "./hooks/general/useResize";

const App: React.FC = function () {
  // Protected Routes on the frontend are defined here
  useResize();
  
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path=":username" element={<Profile />} />
        <Route path="profiles/:username" element={<Profiles />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="watch" element={<Watch />} />
        <Route path="wallet" element={<Wallet />} />
      </Route>
    </Routes>
  );
};

export default App;
