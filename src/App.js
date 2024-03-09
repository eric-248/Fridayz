import logo from "./logo.svg";
import "./App.css";
import HomePage from "./HomePage";
import Navbar from "./NavBar";
import FriendPage from "./FriendPage";
import NotFound from "./NotFound";
import ProfilePage from "./ProfilePage";
import Post from "./Post";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//import Login and Register Page
import {Login} from "./Login";
import {Register} from "./Register";

function App() {

  return (
    <BrowserRouter>
      <div className="App">

        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/friends" element={<FriendPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
