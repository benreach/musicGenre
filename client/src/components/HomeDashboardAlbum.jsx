import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider';
import { getAllAlbums } from '../api';
import { actionType } from '../context/reducer';
import { SongContainer } from './DashboardSongs';
import SongCard from './SongCard';
import CardForHomepage from './CardForHomepage';

const HomeDashboardAlbum = () => {
    const [{allAlbums }, dispatch] = useStateValue();

    useEffect(()=> {
      if(!allAlbums){
          getAllAlbums().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ALBUMS,
              allAlbums: data.album,
            });
          });
      }

    },[])
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className='relative w-full p-4 py-16 border border-gray-300 rounded'>
        <AlbumContainer data={allAlbums} />
      </div>
    </div>
  )
}


export const AlbumContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly mt-4">
      {data &&
        data.map((song, i) => (
          <CardForHomepage key={song._id} data={song} index={i}/>
        ))}
      
    </div>
  );
};

export default HomeDashboardAlbum