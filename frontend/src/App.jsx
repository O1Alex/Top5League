import './App.css';
import AuthProvider from './context/AuthProviders';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {

  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path='/' element= {<Home/>}></Route>
        </Routes>
      </AuthProvider>
    </div>


  );
}

export default App;
