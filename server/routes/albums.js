const router = require("express").Router();


const album = require("../models//album");


//
router.post("/save", async (req, res) => {
  const newAlbum = album({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
  });

  try {
    const saveAlbum = await newAlbum.save();
    return res.status(200).send({ success: true, album: saveAlbum });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});


//Get single album

router.get("/getOne/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await album.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, album: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

//Get all albums

router.get("/getAll", async (req, res) => {
  try {
    const albums = await album.find({}).sort({ createdAt: 1 });
    return res.status(200).send({ success: true, data: albums });
  } catch (error) {
    return res.status(500).send({ success: false, msg: "Server error", error });
  }
});


//Update artist

router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await album.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
      },
      options
    );
    return res.status(200).send({ success: true, album: result });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});

//Delete artist

router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const result = await album.deleteOne(filter);

  if (result) {
    return res
      .status(200)
      .send({ success: true, msg: "Data Deleted successfully", album: result });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});

module.exports = router;


