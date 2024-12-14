// this is our Data Listing mongoose.Model 

const mongoose  = require("mongoose");

// const mongoose = require('mongoose') we require mongoose here
const Schema = mongoose.Schema //mongoose Schema stored in Schema Variable 

const listingSchema = new Schema(
    {
        title :{
            type: String,
            required:true // mandatory filed
        },
        description :String,
        image :{
            
            filename: { type: String },
            url:{ type: String, require:true, 
                default:"https://unsplash.com/photos/man-sitting-on-rock-surrounded-by-water--Q_t4SCN8c4",
                set:(v) => v === "" ? "https://unsplash.com/photos/man-sitting-on-rock-surrounded-by-water--Q_t4SCN8c4" :v, }
        },
        price :Number,
        location :String,
        country :String,
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    }
)

listingSchema.post("findOneAndDelete",async(req,res) => {
    if (Listing){
        await review.deleteMany({_id: { $in: Listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema); // we created Lisiting model here 
module.exports = Listing // the above data export to other moduls for use by the way of variable Listing
