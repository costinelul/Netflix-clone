import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Browse from "./pages/Browse/Browse";
import Auth from "./pages/Auth/Auth";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Avatar from "./pages/Avatar/Avatar";
import "./index.css";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Auth />} />
                    <Route path="/register" exact element={<Register />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/browse" exact element={<Browse />} />
                    <Route path="/profile/change-avatar" exact element={<Avatar />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;