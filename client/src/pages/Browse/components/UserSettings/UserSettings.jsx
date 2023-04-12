import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function UserSettings({ userId }) {
    const [profilePicture, setProfilePicture] = useState("");
    const [showDropDown, setShowDropDown] = useState(false);
    const [mouseOverArrow, setMouseOverArrow] = useState(false);
    const [userName, setUserName] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [showChangeUserName, setShowChangeUserName] = useState(false);
    const [showChangeAvatar, setShowChangeAvatar] = useState(false);
    const [newAvatar, setNewAvatar] = useState("");

    let mouseOverSettings = false;
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserSettings() {
            const userSettings = await fetch(`http://localhost:5000/settings/user${userId}`).then((res) => res.json());
            setProfilePicture(userSettings.settings.profilePicture);
            setUserName(userSettings.settings.userName);
        }
        fetchUserSettings();
    }, [userId]);

    function signOut() {
        document.cookie = "user-id=";
        navigate("/");
    }

    async function changeUserName() {
        await fetch("http://localhost:5000/change-settings/username", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: userId,
                username: newUserName,
            }),
        });
        setUserName(newUserName);
    }

    async function changeAvatar() {
        await fetch("http://localhost:5000/change-settings/profile-picture", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: userId,
                profilePicture: newAvatar,
            }),
        });
        setProfilePicture(newAvatar);
    }

    return (
        <>
            <div className="choose_picture"></div>
            <span className="greeting">Hello, {userName}</span>
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
                    <span className="pointer" onClick={() => setShowChangeAvatar(true)}>
                        Change avatar
                    </span>
                    <br></br>
                    <br></br>
                    <span className="pointer" onClick={() => setShowChangeUserName(true)}>
                        Change Username
                    </span>
                    <br></br>
                    <br></br>
                    <span className="pointer" onClick={signOut}>
                        Sign Out
                    </span>
                </div>
            ) : null}
            {showChangeUserName ? (
                <div className="change_username">
                    <label htmlFor="username">Enter new username:</label>
                    <input onChange={(e) => setNewUserName(e.target.value)} name="username"></input>
                    <div className="change_username_buttons">
                        <button className="auth_button" onClick={changeUserName}>
                            Submit
                        </button>
                        <button className="auth_button" onClick={() => setShowChangeUserName(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : null}
            {showChangeAvatar ? (
                <div className="change_username">
                    <label htmlFor="avatar">Enter new avatar URL:</label>
                    <input onChange={(e) => setNewAvatar(e.target.value)} name="avatar"></input>
                    <div className="change_username_buttons">
                        <button className="auth_button" onClick={changeAvatar}>
                            Submit
                        </button>
                        <button className="auth_button" onClick={() => setShowChangeAvatar(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default UserSettings;
