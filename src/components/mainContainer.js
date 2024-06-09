import React from 'react'
import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

function MainContainer() {
    let movies = useSelector(store=> store?.movies?.nowPlayingMovies);
    console.log(movies);
    if(!movies) return;

    let mainMovie = movies[0];
    console.log(mainMovie);

    const {original_title, overview, id} = mainMovie

    return (
        <>
            <VideoTitle title={original_title} overview={overview}/>
            <VideoBackground id={id}/>
        </>
    )
}

export default MainContainer
