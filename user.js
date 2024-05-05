const mongoose = require("mongoose");
const { any } = require("./utils/multer");
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required:true
    },

    surname: {
        type: String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type: String,
        required:false
        
    },
    image: {
        type:String,
        
    },
    cloudinary_id: {
        type:String,
        required:false
        
    },
    gender: {
        type:String,
        required: true
    },
    stack: {
        type:String,
        required: true
    },
    cohort: {
        type:String,
        required: true
    },
    created: {
        type:Date,
        required: true,
        default: Date.now
    }
});

    const User = mongoose.model("User", userSchema);

module.exports = User;