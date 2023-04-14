import React, { useEffect, useState } from "react";
import UserSettings from "../UserSettings/UserSettings";
import "./styles/navbar.css";

export default function Navbar({ userId }) {
    const [showBlack, setShow] = useState(false);

    useEffect(() => {
        function transitionNavbar() {
            if (window.scrollY > 100) setShow(true);
            else setShow(false);
        }
        window.addEventListener("scroll", transitionNavbar);
        return () => window.removeEventListener("scroll", transitionNavbar);
    }, []);
    return (
        <div className={`navbar ${showBlack && "navbar__black"}`}>
            <img className="logo" src={require("./img/logo.png")} alt="NETFLIX LOGO" />
            {/* <div className="nabar__options">
                <span className="option">My List</span>
            </div> */}
            <UserSettings userId={userId} />
        </div>
    );
}
