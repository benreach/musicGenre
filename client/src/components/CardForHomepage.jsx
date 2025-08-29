import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import { deleteSong, getAllSongs } from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const CardForHomepage = ({ data, index, type }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [{ alertType, allArtists, allAlbums, allSongs,isSongPlaying,songIndex }, dispatch] =
    useStateValue();

  const deleteObject = ({ data }) => {
    setIsDelete(true);
    deleteSong(data._id).then((res) => {
      if (res) {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "success",
        });

        setInterval(() => {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          });
        }, 8000);

        getAllSongs().then((data) => {
          console.log(data.songs);
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: data.songs,
          });
        });
      }
    });
  };

  const addToContext = () => {
    if(!isSongPlaying){
      dispatch({
        type: actionType.SET_ISSONG_PLAYING,
        isSongPlaying: true,
      })
    };

        if(songIndex !== index){
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      })
    }


  };
  return (
    <motion.div
      onClick={type === "song" && addToContext}
      whileHover={{ scale: 1.05 }}
      className="relative w-40 min-w-210 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex items-center flex-col"
    >
      <motion.div className="h-auto w-full">
        <motion.img
          src={data.imageUrl}
          className="w-full h-full rounded-t-lg object-cover"
          onLoad={() => setImageLoaded(true)}
        />
      </motion.div>

      {imageLoaded && (
        <>
          <p className="text-base text-center text-headingColor font-semibold my-2 ">
            {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}
            {data.artist && (
              <span className="block text-sm text-gray-400 my-1">
                {data.artist}
              </span>
            )}
          </p>
          <p className="text-yellow-500 font-semibold my-2 text-center">
            {data.category}
          </p>
        </>
      )}
    </motion.div>
  );
};

export default CardForHomepage;
