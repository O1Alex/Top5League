import { Routes, Route } from "react-router-dom";

import CreatePlayer from "../pages/CreatePlayer";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PlayersOfTheMonth from "../pages/PlayersOfTheMonth";
import Register from "../pages/Register";
import UpdatePlayer from "../pages/UpdatePlayer";
import MyChallenge from "../pages/MyChallenge";
import UsersList from "../pages/UsersList";
import CreateLineup from "../pages/CreateLineup";
import Result from "../pages/Result";
import UpdateLineup from "../pages/UpdateLineup";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/monthlyplayers" element={<PlayersOfTheMonth />} />
      <Route path="/createplayer/:monthId" element={<CreatePlayer />} />
      <Route path="/updateplayer/:id" element={<UpdatePlayer />} />
      <Route path="/mychallenge" element={<MyChallenge />} />
      <Route path="/userslist" element={<UsersList />} />
      <Route path="/createlineup" element={<CreateLineup />} />
      <Route path="/updatelineup" element={<UpdateLineup />} />
      <Route path="/mychallenge" element={<MyChallenge />} />
      <Route path="/result" element={<Result />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}