import React from "react";
import { useSelector } from "react-redux";
import useTrailerVideo from "../hooks/useTrailerVideo";

function VideoBackground({ id }) {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useTrailerVideo(id);

  return (
    <>
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?&autoplay=1&mute=1"}
        title="YouTube video player"
      ></iframe>
    </div>
    </>
  );
}

export default VideoBackground;
