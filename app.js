// Basic require stuff
let express = require("express")
const app = express();
const mongoose = require('mongoose')
const MONGO_URL ="mongodb://127.0.0.1:27017/wonderlost"
const path = require("path");

// const Listing = require("../mega mega project/models/listing.js");
const methodOverride = require("method-override")
const ejsmate = require('ejs-mate');
// const { nextTick } = require("process");
// const wrapAsync = require("./utils/wrapAsync.js")
const expressError = require("./utils/expressError.js")
// const listings = require("./routes/listing.js")
// const Review = require("./models/reviews.js")

// const {listingSchema, reviewSchema} = require("./schema.js");
// const { request } = require("http");
// const { log } = require("console");

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views")) //this path of views we created   
app.use(express.urlencoded({extended:true})) //this is our decoder
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);// use ejs-locals for all ejs templates
app.use(express.static(path.join(__dirname,"/public")))


// database connection checking
main().then(()=>{
    console.log("Your Are Connected to DB");
}).catch(err => {
    console.log(err);
})

// async function for connection of database
async function main(){
    await mongoose.connect(MONGO_URL)
}

const listings2 = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");

app.use("/listngs",listings2)
app.use("/listings/:id/reviews",reviews)

// home page Route
app.get("/",(req,res)=>{
    res.send("You are on Root page")
})

// app.get("/cook",(req,res) =>{
//     res.cookie("Renger","express").send("cookie set")
// })


//this code for non existing routs or pages
app.use("*",(req,res,next) =>{
    next(new expressError(404,"page not found"));

})

// costume Error Handling
app.use((err,req,res,next) =>{
    let {statusCode = 500,message = "something went wrong!!"} = err;
    res.status(statusCode);
    res.render("errorpage.ejs",{err})
    // res.status(statusCode).send(message)
    // res.send("Something went wrong !!")
})

// port testing
app.listen(8080, ()=>{
    console.log("Listing from port 8080");
})