import React from "react";
import Header from "./Header";
import DashboardSongs from "./DashboardSongs";
import DashboardArtist from "./DashboardArtist";
import DashboardAlbum from "./DashboardAlbum";
import Footer from "./Footer";
import { motion } from "framer-motion";
import HomeDashboardSongs from "./HomeDashboardSongs";
import HomeDashboardAlbum from "./HomeDashboardAlbum";
import HomeDashboardArtist from "./HomeDashboardArtist";

const Home = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <Header />
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        <p className="text-2xl text-textColor font-semibold">Popular Songs</p>
        <HomeDashboardSongs />
        <p className="text-2xl text-textColor font-semibold">Popular Artists</p>
        <HomeDashboardArtist />
        <p className="text-2xl text-textColor font-semibold">Popular Albums</p>
        <HomeDashboardAlbum />
      </motion.div>

      <Footer />
    </div>
  );
};

export default Home;
