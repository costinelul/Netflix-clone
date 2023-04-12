import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sha256 from "crypto-js/sha256";
import "../Login/login.css";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [showPassMatch, setPassMatch] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const navigate = useNavigate();

    async function registerUser(e) {
        e.preventDefault();
        if (passwordMatch) {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password: sha256(password).toString(),
                }),
            });
            const data = await response.json();
            setStatus(data.status);
            setTimeout(() => {
                if (data.status === "Success") navigate("/login");
            }, 1000);
        }
    }

    function checkMatch(e) {
        setPasswordMatch(false);
        if (password && e.target.value && password === e.target.value) {
            setPasswordMatch(true);
        }
    }

    useEffect(() => {
        setOpacity(1);
    }, []);
    return (
        <>
            <img className="auth_img" src={require("../Browse/components/Navbar/img/logo.png")} alt="logo"></img>
            <form onSubmit={registerUser}>
                <div className="auth_container" style={{ opacity: opacity }}>
                    <span className="span">Register</span>
                    <input value={email} required={true} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Your@email.etc"></input>
                    <input
                        required={true}
                        minLength={6}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            checkMatch(e);
                        }}
                        type="password"
                        name="password"
                        placeholder="Password"
                    ></input>
                    <span className="status span" style={{ color: `${passwordMatch ? "green" : "red"}` }}>
                        {showPassMatch && (passwordMatch ? "It's a match" : "Not a match")}
                    </span>
                    <input
                        required={true}
                        onChange={(e) => {
                            checkMatch(e);
                            setPassMatch(true);
                        }}
                        type="password"
                        placeholder="Confirm password"
                    ></input>
                    <span className="status span">{status === "Success" ? "User created! Redirecting to login..." : status}</span>
                    <span className="have_account">
                        Already have an account? <a href="http://localhost:3000/login">Login now!</a>
                    </span>
                    <button className="auth_button">Submit</button>
                </div>
            </form>
            <div className="background">
                <div className="shade"></div>
            </div>
        </>
    );
}
