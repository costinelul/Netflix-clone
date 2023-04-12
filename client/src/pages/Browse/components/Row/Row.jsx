import React, { useEffect, useState } from "react";
import "./styles/row.css";
import "./styles/handles.css";
import "./styles/big_card.css";

export default function Row({ title, request }) {
    const [movies, setMovies] = useState([]);
    const [showArrow, setArrow] = useState(false);
    const [sliderPosition, setSlider] = useState(3.75);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function getMovies() {
            await fetch(request)
                .then((res) => res.json())
                .then((data) =>
                    setMovies(
                        data.results.map((movie) => {
                            return { movieData: movie, bigCard: false };
                        })
                    )
                );
        }
        getMovies();
        async function getGenres() {
            await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=8ea7d1ee3125b40af423f2e171e72a60")
                .then((res) => res.json())
                .then((data) => {
                    setGenres(data.genres);
                });
        }
        getGenres();
    }, [request]);

    function moveSlider(direction) {
        switch (direction) {
            case "left":
                setSlider((prev) => prev + 93);
                break;
            case "right":
                setSlider((prev) => prev - 93);
                break;
            default:
                break;
        }
    }
    // function setBigCard(i) {
    //     const updatedMovies = movies.map((movie, index) => {
    //         if (index === i) return { ...movie, bigCard: !movie.bigCard };
    //         return movie;
    //     });

    //     setMovies(updatedMovies);
    // }
    return (
        <div className="row" onMouseEnter={() => setArrow(true)} onMouseLeave={() => setArrow(false)}>
            <h2 className="title">{title}</h2>
            <NavigationArrows sliderPosition={sliderPosition} moveSlider={moveSlider} showArrow={showArrow} />
            <SliderMovies sliderPosition={sliderPosition} movies={movies} genres={genres} />
        </div>
    );
}

function SliderMovies({ movies, sliderPosition, genres }) {
    return (
        <div className="slider" style={{ transform: `translateX(${sliderPosition}%)` }}>
            {movies.map((movie, index) => {
                return (
                    <div key={movie.movieData.title} className={`movie__container`} style={{ left: `${index * 15.5}vw` }}>
                        <img className={`movie ${movie.bigCard && "big_card_img"}`} src={`https://image.tmdb.org/t/p/original/${movie.movieData.backdrop_path}`} alt="" />
                        {movie.bigCard && <BigCardInfo movie={movie} genres={genres} />}
                    </div>
                );
            })}
        </div>
    );
}
function BigCardInfo({ movie, genres }) {
    return (
        <div className={`big_card_info `}>
            <div className="big_card_buttons">
                <button className="play"></button>
                <button></button>
                <button></button>
                <button style={{ marginLeft: "25%" }}></button>
            </div>
            <div className="big_card_rating">
                <span>Release Date: {movie.movieData.release_date}</span>
                <span>Rating: {movie.movieData.vote_average} </span>
            </div>

            <div className="big_card_genres">
                {movie.movieData.genre_ids.map((id) => {
                    return <li key={id}>{genres.find((genre) => genre.id === id).name}</li>;
                })}
            </div>
        </div>
    );
}

function NavigationArrows({ sliderPosition, moveSlider, showArrow }) {
    return (
        <>
            {sliderPosition < 3.75 && (
                <button className="handle left-handle" onClick={() => moveSlider("left")}>
                    {showArrow && "L"}
                </button>
            )}
            <button className="handle right-handle" onClick={() => moveSlider("right")}>
                {showArrow && "R"}
            </button>
        </>
    );
}
