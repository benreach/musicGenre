import React from "react";
import DashboardSongs from "./DashboardSongs";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";
import HomeDashboardSongs from "./HomeDashboardSongs";

const Music = () => {
  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    >
      <Header />

      <motion.div
        className=""
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        <HomeDashboardSongs />
      </motion.div>

      <Footer />
    </motion.div>
  );
};

export default Music;
