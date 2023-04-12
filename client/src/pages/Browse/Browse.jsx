import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import Row from "./components/Row/Row";
import genres from "../../API";


export default function Browse({userId}) {
    return (
        <>
            <Navbar userId={userId}/>
            <Banner />
            <div style={{ position: "absolute", top: "25vw" }}>
                {genres.map((genre) => {
                    return <Row key={genre.name} title={genre.name} request={genre.request} />;
                })}
            </div>
        </>
    );
}
