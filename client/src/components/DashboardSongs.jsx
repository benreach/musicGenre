import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../context/StateProvider";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import SongCard from "./SongCard";

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [{ allSongs }, dispatch] = useStateValue();

  useEffect(() => {
    getAllSongs().then((data) => {
      dispatch({
        type: actionType.SET_ALL_SONGS,
        allSongs: data.songs,
      });
    });
  }, [dispatch]);

  // ✅ Filtered songs derived state
  const filteredSongs = allSongs?.filter((song) =>
    song.name.toLowerCase().includes(songFilter.toLowerCase())
  );

  return (
    <motion.div
      className="w-full p-4 flex items-center justify-center flex-col"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    >
      <div className="w-full flex justify-center items-center gap-20">
        <input
          type="text"
          placeholder="Search songs here..."
          value={songFilter}
          onChange={(e) => setSongFilter(e.target.value)}
          className={`outline-none px-4 py-2 rounded-lg w-52 border bg-transparent duration-150 transition-all ease-in-out text-base ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          } text-gray-400`}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />

        {/* ✅ Uncomment if you want a clear search icon */}
        {/* <i>
          <AiOutlineClear
            className="text-3xl text-textColor cursor-pointer"
            onClick={() => setSongFilter("")}
          />
        </i> */}
      </div>

      <div className="relative w-full my-4 p-4 border border-gray-300 rounded-md">
        <div className="absolute top-0 left-2">
          <p className="text-sm font-semibold text-textColor">
            <span>Count : </span>
            {filteredSongs?.length}
          </p>
        </div>
        <SongContainer data={filteredSongs} type={"song"} />
      </div>
    </motion.div>
  );
};

export const SongContainer = ({ data, type }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly mt-4">
      {data && data.length > 0 ? (
        data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} type={"song"} />
        ))
      ) : (
        <p className="text-center text-gray-500 w-full">No songs found.</p>
      )}
    </div>
  );
};

export default DashboardSongs;
