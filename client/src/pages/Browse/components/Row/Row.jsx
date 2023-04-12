import React, { useEffect, useState } from "react";
import "./styles/row.css";
import "./styles/handles.css";

export default function Row({ title, request }) {
    const [movies, setMovies] = useState([]);
    const [showArrow, setArrow] = useState(false);
    const [sliderPosition, setSlider] = useState(3.75);

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
  
    return (
        <div className="row" onMouseEnter={() => setArrow(true)} onMouseLeave={() => setArrow(false)}>
            <h2 className="title">{title}</h2>
            <NavigationArrows sliderPosition={sliderPosition} moveSlider={moveSlider} showArrow={showArrow} />
            <SliderMovies sliderPosition={sliderPosition} movies={movies} />
        </div>
    );
}

function SliderMovies({ movies, sliderPosition }) {
    return (
        <div className="slider" style={{ transform: `translateX(${sliderPosition}%)` }}>
            {movies.map((movie, index) => {
                return (
                    <div key={movie.movieData.title} className={`movie__container`} style={{ left: `${index * 15.5}vw` }}>
                        <img className="movie" src={`https://image.tmdb.org/t/p/original/${movie.movieData.backdrop_path}`} alt="" />
                    </div>
                );
            })}
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
