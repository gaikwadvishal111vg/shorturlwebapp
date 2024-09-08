import express from 'express';
import mongoose from 'mongoose';
import { urlShort,getOriginalUrl } from './controllers/urlcontroller.js';
const app = express();
app.use(express.urlencoded({extended:true}))
const port = 3000;
const hostname = "127.0.0.1";
// Moongoose connecting Database without using async and await
mongoose.connect("mongodb://127.0.0.1:27017/shorturl")
.then(() => app.listen(port,hostname, () => console.log("server Started")))
.catch((err)    => console.error(err));

app.get('/', (req, res)=>{
    res.render("index.ejs",{shortUrl:null});
})

// here we handle url submission
app.post('/shorten', urlShort);
//redirect original url using short url
app.get('/:shortCode',getOriginalUrl);
app.listen(port, () => 
    console.log(`server is running on port ${port}`));
