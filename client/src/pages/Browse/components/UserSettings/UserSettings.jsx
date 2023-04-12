import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function UserSettings({ userId }) {
    const [profilePicture, setProfilePicture] = useState("");
    const [showDropDown, setShowDropDown] = useState(false);
    const [mouseOverArrow, setMouseOverArrow] = useState(false);
    let mouseOverSettings = false;
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfilePicture() {
            const userSettings = await fetch(`http://localhost:5000/settings/user${userId}`).then((res) => res.json());
            setProfilePicture(userSettings.settings.profilePicture);
        }
        fetchProfilePicture();
    }, [userId]);

    function signOut(){
        document.cookie = "user-id=";
        navigate("/");
    }
    return (
        <>
            <div className="choose_picture"></div>
            <img className="profile_picture pointer" src={profilePicture} alt="profile"></img>
            <div
                className="arrow pointer"
                style={{ transform: mouseOverArrow && "rotate(270deg)" }}
                onMouseEnter={() => {
                    setMouseOverArrow(true);
                    setShowDropDown(true);
                }}
                onMouseLeave={() =>
                    setTimeout(() => {
                        if (!mouseOverSettings) {
                            setMouseOverArrow(false);
                            setShowDropDown(false);
                        }
                    }, 200)
                }
            ></div>
            {showDropDown ? (
                <div
                    className="user_settings"
                    onMouseLeave={() => {
                        setMouseOverArrow(false);
                        setShowDropDown(false);
                    }}
                    onMouseEnter={() => (mouseOverSettings = true)}
                >
                    <span className="pointer">Change avatar</span>
                    <br></br>
                    <br></br>
                    <span className="pointer" onClick={signOut}>Sign Out</span>
                </div>
            ) : null}
        </>
    );
}

export default UserSettings;
