import { Link } from "react-router-dom";
import "./styles/auth.css";

export default function Auth() {
    return (
        <>
            <img className="auth_img" src={require("../Browse/components/Navbar/img/logo.png")} alt='logo'></img>
            <div className="auth_options">
                <div className="auth_text">
                    <p style={{ fontSize: "3vw", fontWeight: "bold", marginBottom: "0" }}>Unlimited movies, TV shows, and more.</p>
                    <p style={{ fontSize: "2vw", marginTop: "0" }}>Plans now start at EUR4.99/month.</p>
                </div>
                <div className="auth_buttons">
                    <Link to="register">
                        <button className="auth_button" style={{ color: "whitesmoke" }}>
                            Register
                        </button>
                    </Link>
                    <Link to="login">
                        <button className="auth_button">Login</button>
                    </Link>
                </div>
            </div>
            <div className="background">
                <div className="shade"></div>
            </div>
        </>
    );
}
