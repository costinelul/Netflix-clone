import React, { useEffect } from "react";
import { useState } from "react";
import genres from "../../../../API";
import "./styles/banner.css";

export default function Banner() {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        async function getRandomMovie() {
            await fetch(genres.find((genre) => (genre.name = "trending")).request)
                .then((res) => res.json())
                .then((data) => setMovie(data.results[Math.floor(Math.random() * data.results.length)]));
        }
        getRandomMovie();
    }, []);

    function truncate(string, n) {
        return string?.length > n ? string.substring(0, n) + "..." : string;
    }
    return (
        <div className="banner" style={movie.backdrop_path ? { backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` } : {}}>
            <div className="shadow"></div>
            <div className="info">
                <h1 className="movie_title">{movie.title}</h1>
                <div className="buttons">
                    <button className="play__btn">
                        <span style={{ marginRight: "-2.5vw" }}>Play</span>
                    </button>
                    <button className="info__btn">
                        <span style={{ marginRight: "-2.5vw" }}>More Info</span>
                    </button>
                </div>
                <p className="overview">{truncate(movie.overview, 150)}</p>
            </div>
            <div className="bottom__fade"></div>
        </div>
    );
}
