import React, { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from "../api";
import { FaMusic, FaUser } from "react-icons/fa";
import { MdGroup, MdAlbum } from "react-icons/md";
import { motion } from "framer-motion";

export const DashboardCard = ({ icon, name, count }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      exit={{ opacity: 0, x: 50 }}
      className="p-4 w-36 h-auto gap-2 rounded-lg shadow-md flex flex-col items-center"
    >
      {icon}
      <p className="text-md text-textColor font-semibold">{name}</p>
      <p className="text-md font-semibold text-gray-400">{count}</p>
    </motion.div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] =
    useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        console.log("Fetched users:", data);
        if (data?.success) {
          dispatch({
            type: "SET_ALL_USERS",
            allUsers: data.data,
          });
        }
      });
    }

    if (!allSongs) {
      getAllSongs().then((data) => {
        console.log("Fetched Songs:", data);
        if (data?.success) {
          dispatch({
            type: "SET_ALL_SONGS",
            allSongs: data.data,
          });
        }
      });
    }

    if (!allArtists) {
      getAllArtists().then((data) => {
        console.log("Fetched Artists:", data);
        if (data?.success) {
          dispatch({
            type: "SET_ALL_ARTISTS",
            allArtists: data.data,
          });
        }
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        console.log("Fetched Albums:", data);
        if (data?.success) {
          dispatch({
            type: "SET_ALL_ALBUMS",
            allAlbums: data.data,
          });
        }
      });
    }
  }, [allUsers, allSongs, allArtists, allAlbums]);

  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <DashboardCard
        icon={<MdGroup size={24} />}
        name="Users"
        count={allUsers?.length || 0}
      />
      <DashboardCard
        icon={<FaMusic size={24} />}
        name="Songs"
        count={allSongs?.length || 0}
      />
      <DashboardCard
        icon={<FaUser size={24} />}
        name="Artists"
        count={allArtists?.length || 0}
      />
      <DashboardCard
        icon={<MdAlbum size={24} />}
        name="Albums"
        count={allAlbums?.length || 0}
      />
    </div>
  );
};

export default DashboardHome;
