const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js")
const expressError = require("../utils/expressError.js")
const {listingSchema,reviewSchema} = require("../schema.js");


// schema validation middelware
const Validatelisting = (req,res,next) =>{
    let result = listingSchema.validate(req.body)//this is joi api serverside form validation schema syntax
   
    if(result.error){
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new  expressError(400,errMsg)
    }else{
        next();
    }
    
};

// Listing Inedx Route
router.get("/listings", wrapAsync(async(req,res) =>{
    // try {
    const alllistings = await Listing.find({});
    console.log(alllistings);
    
    res.render("listings/index",{alllistings});
    // } catch (err) {
    // next(err); // Forward errors to the error handling middleware
    // }
}));


//New Route
router.get("/new",(req,res) =>{
    res.render("listings/new.ejs")
})

//cretae Route
router.post("/",Validatelisting, wrapAsync(async (req,res,next) =>{
   
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

}))


//Show Route
router.get("/:id", wrapAsync(async(req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing})
}))


//EDIT Route
router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let{id}= req.params;
    const listing = await Listing.findById(id)
    res.render("listings/edit.ejs",{listing})

})
);

//UpDate Route
router.put("/:id",Validatelisting, wrapAsync(async (req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`)
})
);

//delete Route
router.delete("/:id", wrapAsync(async (req,res) =>{
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings")
}))

module.exports = router;