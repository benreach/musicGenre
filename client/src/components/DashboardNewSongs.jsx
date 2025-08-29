import React, { useEffect, useRef, useState } from "react";
import FilterButtons from "./FilterButton";
import { filterByLanguage, filters } from "../utils/supportFunctions";
import { useStateValue } from "../context/StateProvider";
import {
  getAllAlbums,
  getAllArtists,
  getAllSongs,
  savedNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../api";
import { actionType } from "../context/reducer";
import { BiCloudUpload } from "react-icons/bi";
import { motion } from "framer-motion";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { MdDelete } from "react-icons/md";
import { storage } from "../config/firebase.config";

const DashboardNewSongs = () => {
  const [songName, setSongName] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [songImageCover, setSongImageCover] = useState(null);

  const [audioImageCover, setAudioImageCover] = useState(null);
  const [audioUploadingProgress, setAudioUploadingProgress] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const [artistImageCover, setArtistImageCover] = useState(null);
  const [artistUploadingProgress, setArtistUploadingProgress] = useState(0);
  const [isArtistUploading, setIsArtistUploading] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const [albumImageCover, setAlbumImageCover] = useState(null);
  const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0);
  const [isAlbumUploading, setIsAlbumUploading] = useState(false);
  const [albumName, setAlbumName] = useState("");

  const [
    {
      allArtists,
      allSongs,
      allAlbums,
      artistFilter,
      languageFilter,
      albumFilter,
      filterTerm,
      alertType,
    },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.data,
        });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.data,
        });
      });
    }
  }, [allArtists, allAlbums, dispatch, allSongs]);

  const deleteFileObeject = (url, isImage) => {
    if (isImage) {
      setIsImageLoading(true);
      setIsAudioLoading(true);
      setArtistImageCover(true);
      setAlbumImageCover(true);
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });

      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 8000);
    }
    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });

      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 8000);
      setSongImageCover(null);
      setAudioImageCover(null);
      setIsImageLoading(false);
      setIsAudioLoading(false);
      setArtistImageCover(null);
      setIsArtistUploading(false);
      setIsAlbumUploading(false);
      setAlbumImageCover(null);
    });
  };

  const saveSong = () => {
    if (!audioImageCover || !songImageCover) {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });

      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 8000);
    } else {
      setIsAudioLoading(true);
      setIsImageLoading(true);

      const data = {
        name: songName,
        imageUrl: songImageCover,
        songUrl: audioImageCover,
        album: albumFilter,
        artist: artistFilter,
        language: languageFilter,
        category: filterTerm,
      };
      saveNewSong(data).then((res) => {
        console.log(`Response: ${res}`);
        getAllSongs().then((data) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: data.songs,
          });
        });
      });
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });

      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 8000);
      setSongName("");
      setIsAudioLoading(false);
      setIsImageLoading(false);
      setSongImageCover(null);
      setAudioImageCover(null);
      dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
      dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
    }
  };

  const saveArtist = () => {
    if (!artistImageCover || !artistName || !twitter || !instagram) {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });

      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 8000);
    } else {
      setIsArtistUploading(true);
      const data = {
        name: artistName,
        imageUrl: artistImageCover,
        twitter: `www.twitter.com/${twitter}`,
        instagram: `www.instagram.com/${instagram}`,
      };
      saveNewArtist(data).then((res) => {
        getAllArtists().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ARTISTS,
            allArtists: data.artist,
          });
        });
      });
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });

      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 8000);
      setIsArtistUploading(false);
      setArtistImageCover(null);
      setTwitter("");
      setInstagram("");
      setArtistName("");
    }
  };

  const saveAlbum = () => {
    if (!albumImageCover || !albumName) {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });

      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 8000);
    } else {
      setIsAlbumUploading(true);
      const data = {
        name: albumName,
        imageUrl: albumImageCover,
      };
      savedNewAlbum(data).then((res) => {
        getAllAlbums().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: data.album,
          });
        });
      });
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });

      setInterval(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 8000);
      setAlbumImageCover(null);
      setIsAlbumUploading(false);
      setAlbumName("");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 gap-4">
      <div></div>
      <input
        type="text"
        placeholder="Type your song name..."
        className="w-full p-3 rounded-md text-base outline-none text-textColor bg-transparent shadow-md border border-gray-300"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <div className="w-full flex items-center flex-wrap justify-between gap-4">
        {allArtists && allAlbums ? (
          <>
            <FilterButtons filterData={allArtists} flag="Artist" />
            <FilterButtons filterData={allAlbums} flag="Album" />
            <FilterButtons filterData={filterByLanguage} flag="Language" />
            <FilterButtons filterData={filters} flag="Category" />
          </>
        ) : (
          <p className="text-gray-500 text-sm">Loading filters...</p>
        )}
      </div>
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isImageLoading && <FileLoader progress={imageUploadProgress} />}
        {!isImageLoading && (
          <>
            {!songImageCover ? (
              <FileUploader
                updateState={setSongImageCover}
                setProgress={setImageUploadProgress}
                isLoading={setIsImageLoading}
                isImage={true}
                dispatch={dispatch}
              />
            ) : (
              <div className="w-full relative h-full rounded-full">
                <img
                  src={songImageCover}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-400 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-150 transition-all ease-in-out"
                  onClick={() => deleteFileObeject(songImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* audio file */}

      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isImageLoading && <FileLoader progress={audioUploadingProgress} />}
        {!isAudioLoading && (
          <>
            {!audioImageCover ? (
              <FileUploader
                updateState={setAudioImageCover}
                setProgress={setAudioUploadingProgress}
                isLoading={setIsAudioLoading}
                isImage={false}
                dispatch={dispatch}
              />
            ) : (
              <div className="w-full relative h-full rounded-full flex items-center justify-center">
                <span>Preview: </span>
                <audio src={audioImageCover} controls></audio>
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-400 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-150 transition-all ease-in-out"
                  onClick={() => deleteFileObeject(audioImageCover, false)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex items-center justify-center w-60 p-4 cursor-pointer">
        {isImageLoading && isAudioLoading ? (
          <DisableButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 py-2 w-full rounded-md text-white bg-red-500 hover:shadow-lg"
            onClick={saveSong}
          >
            Save song
          </motion.button>
        )}
      </div>

      {/* Artist image */}
      <p className="text-xl font-semibold text-headingColor">Artist Details</p>
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isArtistUploading && <FileLoader progress={artistUploadingProgress} />}
        {!isArtistUploading && (
          <>
            {!artistImageCover ? (
              <FileUploader
                updateState={setArtistImageCover}
                setProgress={setArtistUploadingProgress}
                isLoading={setIsArtistUploading}
                isImage={true}
                dispatch={dispatch}
              />
            ) : (
              <div className="w-full relative h-full rounded-full">
                <img
                  src={artistImageCover}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-400 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-150 transition-all ease-in-out"
                  onClick={() => deleteFileObeject(artistImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* artist name  */}
      <input
        type="text"
        placeholder="Artist name, e.g.REACH"
        className="w-full p-3 rounded-md text-base outline-none bg-transparent shadow-md border border-gray-300 font-semibold text-gray-400"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />

      {/* twitter  */}
      <div className="flex items-center rounded-md shadow-md border p-3 border-gray-300 w-full">
        <p className="text-base font-semibold text-gray-400">
          www.twitter.com/
        </p>
        <input
          type="text"
          placeholder="your id"
          className="w-full rounded-md text-base outline-none bg-transparent font-semibold text-gray-400"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
      </div>

      {/* Instagram  */}
      <div className="flex items-center rounded-md shadow-md border p-3 border-gray-300 w-full">
        <p className="text-base font-semibold text-gray-400">
          www.instagram.com/
        </p>
        <input
          type="text"
          placeholder="your id"
          className="w-full rounded-md text-base outline-none bg-transparent font-semibold text-gray-400 "
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-center w-60 p-4 cursor-pointer">
        {isImageLoading && isAudioLoading ? (
          <DisableButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 py-2 w-full rounded-md text-white bg-red-500 hover:shadow-lg"
            onClick={saveArtist}
          >
            Save Artist
          </motion.button>
        )}
      </div>

      {/* Album  */}
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isAlbumUploading && <FileLoader progress={albumUploadingProgress} />}
        {!isAlbumUploading && (
          <>
            {!albumImageCover ? (
              <FileUploader
                updateState={setAlbumImageCover}
                setProgress={setAlbumUploadingProgress}
                isLoading={setIsAlbumUploading}
                isImage={true}
                dispatch={dispatch}
              />
            ) : (
              <div className="w-full relative h-full rounded-full">
                <img
                  src={albumImageCover}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-400 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-150 transition-all ease-in-out"
                  onClick={() => deleteFileObeject(albumImageCover, true)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {/* Album name  */}
      <input
        type="text"
        placeholder="Album name..."
        className="w-full p-3 rounded-md text-base outline-none bg-transparent shadow-md border border-gray-300 font-semibold text-gray-400"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
      />

      <div className="flex items-center justify-center w-60 p-4 cursor-pointer">
        {isAlbumUploading ? (
          <DisableButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 py-2 w-full rounded-md text-white bg-red-500 hover:shadow-lg"
            onClick={saveAlbum}
          >
            Save Album
          </motion.button>
        )}
      </div>
    </div>
  );
};

export const FileLoader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-red-600 animate-ping rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl"></div>
      </div>
    </div>
  );
};

export const FileUploader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
  dispatch,
}) => {
  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];

    const storageRef = ref(
      storage,
      `${isImage ? "Images" : "Audios"}/${Date.now()}-${uploadedFile.name}`
    );

    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "danger",
        });

        setInterval(() => {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          });
        }, 8000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
        });
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "success",
        });

        setInterval(() => {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          });
        }, 8000);
      }
    );
  };
  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            Click to upload {isImage ? "an image" : "an audio"}{" "}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-file"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        className="w-0 h-0"
        onChange={uploadFile}
      />
    </label>
  );
};

const DisableButton = () => {
  return (
    <button
      disabled
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
    >
      <svg
        aria-hidden="true"
        role="status"
        class="inline w-4 h-4 me-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
      Loading...
    </button>
  );
};

export default DashboardNewSongs;
