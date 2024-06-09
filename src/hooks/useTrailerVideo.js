
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { addTrailerVideo } from "../utils/movieSlice"
import { API_OPTIONS } from "../utils/constant"

const useTrailerVideo = (id)=>{
    const dispatch = useDispatch()

    let getMovieClip = async ()=>{
        let data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, API_OPTIONS)
        let json = await data.json();
        let {results} = json

        let filterData = results.filter(result => result.type==='Trailer');
        let trailer = filterData.length ? filterData[0] : results[0];
        // console.log(trailer);
        dispatch(addTrailerVideo(trailer))
    }

    useEffect(()=>{
        getMovieClip();
    }, [])
}

export default useTrailerVideo