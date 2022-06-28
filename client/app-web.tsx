import React from "react";
import PageLayout from "./components/PageLayout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Watch from "./pages/Watch";
import Wallet from "./pages/Wallet";
import UnlockContext from "./components/auth/UnlockContext";
import UnauthorizedContext from "./components/auth/UnauthorizedContext";
import ProfileProvider from "./context/profile/ProfileProvider";
import ProfileSetup from "./context/profile/ProfileSetup";
import ProfilesSetup from "./context/profile/ProfilesSetup";

const App: React.FC = function () {
  // Protected Routes on the frontend are defined here
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route
          path="profile/:username"
          element={
            <UnlockContext>
              <ProfileProvider>
                <ProfileSetup>
                  <Profile />
                </ProfileSetup>
              </ProfileProvider>
            </UnlockContext>
          }
        />
        <Route
          path="profiles/:username"
          element={
            <ProfileProvider>
              <ProfilesSetup>
                <Profile />
              </ProfilesSetup>
            </ProfileProvider>
          }
        />
        <Route
          path="login"
          element={
            <UnauthorizedContext>
              <Login />
            </UnauthorizedContext>
          }
        />
        <Route
          path="register"
          element={
            <UnauthorizedContext>
              <Register />
            </UnauthorizedContext>
          }
        />
        <Route path="watch" element={<Watch />} />
        <Route path="wallet" element={<Wallet />} />
      </Route>
    </Routes>
  );
};

export default App;
