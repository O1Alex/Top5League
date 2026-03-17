import CreatePlayer from "../pages/CreatePlayer";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PlayersOfTheMonth from "../pages/PlayersOfTheMonth";
import Register from "../pages/Register";
import UpdatePlayer from "../pages/UpdatePlayer";

const AppRoutes =[
    {path: "/", element: <Home />},
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "/monthlyplayers", element: <PlayersOfTheMonth />},
    {path: "/createplayer", element: <CreatePlayer />},
    {path: "/updateplayer", element: <UpdatePlayer />},
    {path: "*", element: <ErrorPage />}

]
export default AppRoutes;
