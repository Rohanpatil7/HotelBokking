let express = require("express")
const router = express.Router({mergeParams : true});

const wrapAsync = require("../utils/wrapAsync.js")
const expressError = require("../utils/expressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/reviews.js")
const Listing = require("../models/listing.js");
``
// schema Reviews validation middelware
const Validatereview = (req,res,next) =>{
    let result = reviewSchema.validate(req.body)//this is joi api serverside form validation schema syntax
   
    if(result.error){
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new  expressError(402,errMsg)
    }else{
        next();
    }
    
}

// Reviews 
//Post Review Route
router.post("/",Validatereview, wrapAsync(async(req,res) =>{
    
    let listing =  await Listing.findById(req.params.id);
    let newReview = new Review(req.body.reviews);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();   

    console.log("New Review Sent");
    res.send("Riview has been saved !!")
    
    
}))

// Delete Review Route
router.delete("/:reviewId",wrapAsync(async (req,res) =>{
    let{id,reviewId} = req.params

    await Listing.findByIdAndUpdate(id,{$pull : {review : reviewId}})
    await Review.findByIdAndDelete(reviewId)

    res.redirect(`/listings/${id}`)
}))

module.exports = router;