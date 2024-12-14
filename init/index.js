const mongoose = require("mongoose")
const initData = require("./data.js")
const Lisiting = require("../models/listing.js")

const MONGO_URL ="mongodb://127.0.0.1:27017/wonderlost"

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

const initDB = async () =>{
    await Lisiting.deleteMany({}); //delete perviovsly  saved data
    await Lisiting.insertMany(initData.data); // insert new data
    console.log("DB Was Init");
    
}

initDB()