import axios from "axios";

const baseURL = "http://localhost:4000/";

export const validatedUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}api/songs/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${baseURL}api/artists/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}api/albums/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const changingUserRole = async (userId, role) => {
  try {
    const res = await axios.put(`${baseURL}api/users/updateRole/${userId}`, {
      data: {
        role: role,
      },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const removeUser = async (userId) => {
  try {
    const res = await axios.delete(`${baseURL}api/users/deleteUser/${userId}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const saveNewSong = async (data) => {
  try {
    const res = await axios.post(`${baseURL}api/songs/save`, { ...data });
    console.log("Save response:", res.data);
    return res.data.saveSong; // updated line
  } catch (error) {
    console.log("Error saving song:", error);
    return null;
  }
};

export const saveNewArtist = async (data) => {
  try {
    const res = await axios.post(`${baseURL}api/artists/save`, { ...data });
    console.log("Save response:", res.data);
    return res.data.saveArtist; // updated line
  } catch (error) {
    console.log("Error saving song:", error);
    return null;
  }
};

export const savedNewAlbum = async (data) => {
  try {
    const res = await axios.post(`${baseURL}api/albums/save`, { ...data });
    console.log("Save response:", res.data);
    return res.data.saveAlbum; // updated line
  } catch (error) {
    console.log("Error saving song:", error);
    return null;
  }
};



export const deleteSong = async(id) => {
    try {
    const res = await axios.delete(`${baseURL}api/songs/delete/${id}`);
    console.log("Save response:", res.data);
    return res; 
  } catch (error) {
    console.log("Error deleting song:", error);
    return null;
  }
}