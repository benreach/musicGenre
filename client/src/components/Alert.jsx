import React from "react";
import { BsEmojiWink, BsEmojiExpressionless } from "react-icons/bs";
import {motion} from "framer-motion";


const Alert = ({ type }) => {
  return (
    <motion.div
    initial={{translateY: -200,opacity: 0}}
    animate= {{translateY: 0, opacity: 1}}
    exit={{translateY: 0,opacity: 0}}
    key={type}
      className={`fixed top-4 py-1 px-6 rounded-md backdrop-blur-md flex items-center justify-center shadow-md ${
        type === "success" && "bg-green-500"
      } ${type === "danger" && "bg-red-500"}`}
    >
      {type === "success" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiWink className="text-3xl text-primary" />
          <p className="text-sm font-semibold text-primary ">Data send</p>
        </div>
      )}
      {type === "danger" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiExpressionless className="text-2xl" />
          <p className="text-sm font-semibold text-primary ">Something went wrong...</p>
        </div>
      )}
    </motion.div>
  );
};

export default Alert;
