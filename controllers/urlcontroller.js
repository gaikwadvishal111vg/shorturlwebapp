import { Url } from "../models/urlModule.js";
import shortid from "shortid";




export const urlShort = async (req, res) =>{
const longUrl = req.body.longUrl;
const shortCode = shortid.generate();
const shortUrl = `${shortCode}`
//save to do
const newUrl = new Url({shortCode, longUrl})
await newUrl.save();
console.log("URL Short Successfully...",newUrl)

res.render("index.ejs", {shortUrl});
};
export const getOriginalUrl = async(req, res) => {
const shortCode = req.params.shortCode

//find on DB
const urlRecord = await Url.findOne({shortCode});
if(urlRecord){
    res.redirect(urlRecord.longUrl)
}else{
    res.status(404).send("URL Not Found....")
}
}