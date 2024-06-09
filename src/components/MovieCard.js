import React from 'react'
import { IMG_URL } from '../utils/constant'

function MovieCard({poster_path}) {
    console.log(poster_path);
    return (
        <>
          <img src={`${IMG_URL}${poster_path}`}/>
        </>
    )
}

export default MovieCard
