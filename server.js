require("dotenv").config();
const express = require("express");
const { MulterError } = require("multer");
const app = express();
const multer = require("multer");
const upload = multer({dest:"uploads"});
const mongoose = require("mongoose");
const File = require("./models/Files");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const nodemailer = require("nodemailer");
const sendMail = require("./models/sendMail");

app.set("view engine", "ejs");
app.use(express.static('public'));
mongoose.connect(process.env.DATABASE_URL,()=>{
    mongoose.set("strictQuery",true);
        if(mongoose.connection.readyState === 1)
        console.log("Database connected.");
});

app.post("/send/:id",sendMail);

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/file/:id",async function(req,res){
    const file= await File.findById(req.params.id);

    await file.save();
    res.download(file.path,file.originalName);

})

app.post("/upload",upload.single("file"),async function(req,res){
    const fileData={
        path: req.file.path,
        originalName:req.file.originalname        
    }
    const file=await File.create(fileData);
    res.header('origin', req.headers.origin)
    res.redirect(`/upload/${file.id}`)
}); 

app.get("/upload/:id",async function(req,res){
    const id  = req.params.id;
    // http://localhost:3000/
    // console.log(req.headers)
    res.render("download",{fileLink: `http://${req.headers.host}/file/${id}`, fileid: id});
})

app.listen(process.env.PORT,function(){
    console.log("Server is running at port 3000..");
});