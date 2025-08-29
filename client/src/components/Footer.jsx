import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="w-full bg-gray-100 border-t border-gray-300 py-4 flex flex-col md:flex-row items-center justify-between px-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    >
      <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} The Genre. All rights reserved.</p>

      <div className="flex items-center gap-4 mt-2 md:mt-0">
        <a
          href="https://yourwebsite.com"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-150"
        >
          Website
        </a>
        <a
          href="/privacy"
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-150"
        >
          Privacy Policy
        </a>
        <a
          href="/terms"
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-150"
        >
          Terms
        </a>
      </div>
    </motion.footer>
  );
};

export default Footer;
