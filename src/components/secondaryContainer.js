import { toBeRequired } from '@testing-library/jest-dom/matchers'
import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

function SecondaryContainer() {

   const movies = useSelector(store=>store.movies)  
    //console.log(movies);

    return (
        <>
          { movies && <MovieList genere={'Now Playing'} moviesList={movies?.nowPlayingMovies} />}
        </>
    )
}

export default SecondaryContainer
