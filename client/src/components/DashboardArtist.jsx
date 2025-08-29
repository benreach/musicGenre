import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider';
import { getAllArtists } from '../api';
import { actionType } from '../context/reducer';
import { SongContainer } from './DashboardSongs';
import {motion} from "framer-motion"

const DashboardArtist = () => {
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

export default DashboardArtist