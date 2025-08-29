import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const FilterButtons = ({ filterData, flag }) => {
  const [filterName, setFilterName] = useState();
  const [filterMenu, setFilterMenu] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [{artistFilter,languageFilter,albumFilter,filterTerm}, dispatch] = useStateValue();

  const updateFilterButton = (name) => {
    setFilterMenu(false);
    setFilterName(name);

    if(flag === "Artist"){
        dispatch({type: actionType.SET_ARTIST_FILTER, artistFilter: name})
    }

        if(flag === "Album"){
        dispatch({type: actionType.SET_ALBUM_FILTER, albumFilter: name})
    }
        if(flag === "Language"){
        dispatch({type: actionType.SET_LANGUAGE_FILTER, languageFilter: name})
    }
        if(flag === "Category"){
        dispatch({type: actionType.SET_FILTER_TERM, filterTerm: name})
    }
  };

  const handleImageLoad = (key) => {
    setLoadedImages((prev) => ({ ...prev, [key]: true }));
  };





  return (
    <div className="border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400">
      <p
        className="text-base tracking-wide text-textColor flex items-center gap-2"
        onClick={() => setFilterMenu(!filterMenu)}
      >
        {!filterName && flag}
        {filterName && (
          <>
            {filterName.length > 25
              ? `${filterName.slice(0, 15)}...`
              : `${filterName}`}
          </>
        )}
        <IoChevronDown
          className={`text-base text-textColor duration-150 transition-all ease-in-out 
          ${filterMenu ? "rotate-180" : "rotate-0"}`}
        />
      </p>

      {filterData && filterMenu && (
        <motion.div 
        initial={{opacity:0,y:50}}
        animate={{opacity:1,y:0}}
        exit={{opacity:0,y:50}}
        className="w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll py-2 flex flex-col rounded-md shadow-md absolute top-8 left-0 bg-white">
          {filterData.map((data) => {
            const imageLoaded = loadedImages[data.name];

            return (
              <div
                key={data.name}
                onClick={() => updateFilterButton(data.name)}
                className="flex items-center gap-2 px-4 py-1 hover:bg-gray-200"
              >
                {(flag === "Artist" || flag === "Album") && (
                  <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="w-8 h-8 min-w-[32px] rounded-full object-cover"
                    onLoad={() => handleImageLoad(data.name)}
                  />
                )}
                {imageLoaded && (
                  <p className="tracking-wide text-textColor text-sm">
                    {data.name.length > 25
                      ? `${data.name.slice(0, 15)}...`
                      : `${data.name}`}
                  </p>
                )}
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default FilterButtons;
