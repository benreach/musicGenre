import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider';
import { getAllArtists } from '../api';
import { actionType } from '../context/reducer';
import {motion} from "framer-motion"
import CardForHomepage from './CardForHomepage';

const HomeDashboardArtist = () => {
    const [{allArtists }, dispatch] = useStateValue();

    useEffect(()=> {
      if(!allArtists){
          getAllArtists().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ARTISTS,
              allArtists: data.artist,
            });
          });
      }

    },[])
  return (
    <motion.div className="w-full p-4 flex items-center justify-center flex-col"         initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}>
      <div className='relative w-full p-4 py-16 border border-gray-300 rounded'>
        <SongContainer data={allArtists} type={"artist"}/>
      </div>
    </motion.div>
  )
}

const SongContainer = ({ data,type }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly mt-4">
      {data &&
        data.map((song, i) => (
          <CardForHomepage key={song._id} data={song} index={i} type={'song'}/>
        ))}
      
    </div>
  );
};

export default HomeDashboardArtist