import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import { useStateValue } from "../context/StateProvider";
import { MdClose } from "react-icons/md";
import { actionType } from "../context/reducer";
import "react-h5-audio-player/lib/styles.css";

const MusicPlayer = () => {
  const [{ isSongPlaying, allSongs, songIndex }, dispatch] = useStateValue();

  const nextTrack = () => {
    if (songIndex > allSongs.length - 1) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex + 1,
      });
    }
  };

  const previousTrack = () => {
    if (songIndex === 0) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex - 1,
      });
    }
  };

  const closePlayer = () => {
    dispatch({
      type: actionType.SET_ISSONG_PLAYING,
      isSongPlaying: false,
    });
  };
  return (
    <div className="w-full flex items-center gap-3 overflow-hidden relative border-t-2 border-gray-50">
      <MdClose
        className="absolute right-2 top-1 cursor-pointer z-10 text-xl hover:text-red-500"
        onClick={closePlayer}
      />

      <div className="w-full flex items-center gap-3 p-4 relative">
        <img
          src={allSongs[songIndex]?.imageUrl}
          alt=""
          className="w-20 h-20 object-cover rounded-md"
        />
        <div className="flex items-center flex-col">
          <p className="text-md text-headingColor font-semibold">
            {`${
              allSongs[songIndex]?.name.length > 20
                ? allSongs[songIndex]?.name.slice(0, 20)
                : allSongs[songIndex]?.name
            }`}{" "}
            <span></span>
          </p>
          <p className="text-md text-headingColor font-semibold">
            {`${
              allSongs[songIndex]?.artist.length > 25
                ? allSongs[songIndex]?.artist.slice(0, 25)
                : allSongs[songIndex]?.artist
            }`}{" "}
          </p>
        </div>
        <p className="text-sm text-green-500 font-semibold rounded-full bg-blue-200 p-2 capitalize">
          {allSongs[songIndex].category}
        </p>

        <div className="flex-1">
          <AudioPlayer
            src={allSongs[songIndex]?.songUrl}
            onPlay={() => console.log("is playing")}
            autoPlay
            showSkipControls
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>
      </div>
    </div>
  );
};

// export const PlaylistCard = () =>{
//   const [{ isSongPlaying, allSongs, songIndex }, dispatch] = useStateValue();

//   return (
//     <div>PlaylistCard</div>
//   )
// }

export default MusicPlayer;
