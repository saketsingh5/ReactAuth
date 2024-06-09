import {useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { addNowPlayingMovies } from '../utils/movieSlice';
import { API_OPTIONS } from '../utils/constant';

const useNowPlaying = ()=>{
    const dispatch = useDispatch()

    const nowPlayingMovies = async ()=>{
    
      
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
        const json = await data.json();
        const { results } = json;
        dispatch(addNowPlayingMovies(results))
    
        console.log(results);
    }
    
    useEffect(()=>{
        nowPlayingMovies() 
    }, [])
}


export default useNowPlaying
