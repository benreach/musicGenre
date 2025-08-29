const router = require("express").Router();

const song = require("../models/song");

router.post("/save", async (req, res) => {
  const newSong = song({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    songUrl: req.body.songUrl,
    album: req.body.album,
    artist: req.body.artist,
    language: req.body.language,
    category: req.body.category,
  });

  try {
    const saveSong = await newSong.save();
    return res.status(200).send({ success: true, song: saveSong });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

//Get single song

router.get("/getOne/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await song.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, song: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

//Get all songs

router.get("/getAll", async (req, res) => {
  try {
    const songs = await song.find({}).sort({ createdAt: 1 });
    return res.status(200).send({ success: true, songs: songs });
  } catch (error) {
    return res.status(500).send({ success: false, msg: "Server error", error });
  }
});

//Update song

router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await song.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        songUrl: req.body.songUrl,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
      },
      options
    );
    return res.status(200).send({ success: true, song: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});


//Delete song

router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const result = await song.deleteOne(filter);

  if (result) {
    return res
      .status(200)
      .send({ success: true, msg: "Data Deleted successfully", data: result });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

module.exports = router;
