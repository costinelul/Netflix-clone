import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sha256 from "crypto-js/sha256";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [opacity, setOpacity] = useState(0);
    const [showMessage, setShowMessage] = useState("");
    const navigate = useNavigate();

    async function verifyCredentials(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password: sha256(password).toString(),
            }),
        }).then((res) => res.json());

        if (response.user) {
            document.cookie = `user-id=${response.email}`;
            console.log("a")
            navigate("/browse")
        } else {
            setShowMessage(response.message);
        }
    }
    useEffect(() => {
        setOpacity(1);
    }, []);
    return (
        <>
            <img className="auth_img" src={require("../Browse/components/Navbar/img/logo.png")} alt="logo"></img>
            <form onSubmit={verifyCredentials}>
                <div className="auth_container" style={{ opacity: opacity }}>
                    <span className="span">Login</span>
                    <input
                        value={email}
                        required={true}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setShowMessage("");
                        }}
                        type="email"
                        name="email"
                        placeholder="Your@email.etc"
                    ></input>
                    <input
                        required={true}
                        minLength={6}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setShowMessage("");
                        }}
                        type="password"
                        name="password"
                        placeholder="Password"
                    ></input>
                    <span className="have_account">
                        <span style={{ color: "red" }}>{showMessage}</span> <br></br>
                        Don't have an account? <a href="http://localhost:3000/register">Register now!</a>
                    </span>
                    <button className="auth_button">Login</button>
                </div>
            </form>
            <div className="background">
                <div className="shade"></div>
            </div>
        </>
    );
}
