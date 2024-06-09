
import React from 'react'
import useNowPlaying from '../hooks/useNowPlaying'
import Header from './Header'
import MainContainer from './mainContainer';
import SecondaryContainer from './secondaryContainer';

function Browse() {
    useNowPlaying();
    return (
        <>
            <Header />
            <MainContainer />
            <SecondaryContainer />
        </>
    )
}

export default Browse
