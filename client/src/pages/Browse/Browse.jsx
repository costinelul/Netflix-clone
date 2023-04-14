import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import Row from "./components/Row/Row";
import genres from "../../API";
import { Navigate } from "react-router-dom";

export default function Browse() {
    const userId = document.cookie.split("=")[1];
    return (
        <>
            {userId ? (
                <>
                    <Navbar userId={userId} />
                    <Banner />
                    <div style={{ position: "absolute", top: "25vw" }}>
                        {genres.map((genre) => {
                            return <Row key={genre.name} title={genre.name} request={genre.request} />;
                        })}
                    </div>
                </>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
}
