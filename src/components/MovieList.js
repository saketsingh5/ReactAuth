import React from 'react'
import MovieCard from './MovieCard'

function MovieList({genere, moviesList}) {
    console.log(moviesList);
    return (
        <>
            <div className='text-2xl'>{genere}</div>
            {moviesList && moviesList.map((movie)=>{
                <MovieCard poster_path={movie?.poster_path}  />
            })}
        </>
    )
}

export default MovieList
