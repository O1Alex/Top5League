import { Routes, Route } from "react-router-dom";

import CreatePlayer from "../pages/CreatePlayer";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PlayersOfTheMonth from "../pages/PlayersOfTheMonth";
import Register from "../pages/Register";
import UpdatePlayer from "../pages/UpdatePlayer";
import MyChallenge from "../pages/MyChallenge";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/monthlyplayers" element={<PlayersOfTheMonth />} />
      <Route path="/createplayer" element={<CreatePlayer />} />
      <Route path="/updateplayer" element={<UpdatePlayer />} />
      <Route path="/mychallenge" element={<MyChallenge />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}