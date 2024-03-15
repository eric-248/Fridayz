import "./App.css";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import FriendPage from "./FriendPage";
import NotFound from "./NotFound";
import ProfilePage from "./ProfilePage";
import Posts from "./Posts";
import Beans from "./Beans";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OtherProfile from "./OtherProfile";

//import Login and Register Page
import { Login } from "./Login";
import { Register } from "./Register";
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
            <Route path="/Posts" element={<Posts />}></Route>
            <Route path="/Beans" element={<Beans />}></Route>
            <Route path="/profile/:username" element={<OtherProfile />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
