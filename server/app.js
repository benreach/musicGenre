const express = require('express');
const app = express();
require('dotenv/config');


const cors = require('cors');
app.use(express.json());
const  {default: mongoose} = require('mongoose');


app.use(cors({origin:true}));

app.get("/",(req,res)=> {
    res.json("It's working");
});

 

//User authenication routes
const userRoute = require('./routes/auth');
app.use("/api/users/",userRoute);

//Artist Routes
const artistRoute = require('./routes/artist');
app.use("/api/artists/",artistRoute);

//Album Routes
const albumRoute = require('./routes/albums');
app.use("/api/albums/",albumRoute);

//Song Routes
const songRoute = require('./routes/songs');
app.use("/api/songs/",songRoute);



mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true});
mongoose.connection
.once("open",()=> console.log("Connected"))
.on("error", (error)=> {
    console.log(`ERROR : ${error}`);
});

app.listen(4000,()=> {
    console.log('Listeing on port 4000')
})
