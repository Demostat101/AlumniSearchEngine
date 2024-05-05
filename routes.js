const express = require("express");
const User = require("./user");
const router = express.Router();
const cloudinary = require("./utils/cloudinary");
const upload = require("./utils/multer");




//  insert image

router.post("/", upload.single("image"), async(req, res)=>{
    const result = await cloudinary.uploader.upload(req.file.path);
    try {
        res.json(result)
    } catch (error) {
        console.log(error);
    }
})

// insert a user into database route

router.post("/users",upload.single("image"),async (req,res)=>{

    const result = await cloudinary.uploader.upload(req.file.path);

    try {
        const user = new User({
            first_name:req.body.first_name,
            surname:req.body.surname,
            email:req.body.email,
            phone:req.body.phone,
            image: result.secure_url,
            gender:req.body.gender,
            stack:req.body.stack,
            cohort:req.body.cohort,
            cloudinary_id:result.public_id
        });
        await user.save();
        res.send(user)
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }

 });

// get all users

router.get("/users",async (req, res)=>{
    try {
        const users = await User.find({});
        res.send(users);
       
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});



// search by Name
router.get("/users/:first_name", async (req, res)=>{
   const first_name = req.params.first_name;
   console.log(first_name);
    try {
        const users = await User.find({
            $or:[
                {first_name:{$regex:first_name,$options:"i"}},
                {surname:{$regex:first_name,$options:"i"}},
                {cohort:{$regex:first_name,$options:"i"}}
                
            ]
        });
        
        
        res.json(users);
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }

});

// update a user

router.put("/users/:id", async (req,res)=>{
    const {id} = req.params;
    const {first_name, surname, email, phone, image, gender, stack, cohort} = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, {first_name, surname, email, phone, image, gender, stack, cohort}, {new:true});
        res.send(user);
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


// delete a user

router.delete("/users/:id", async (req,res)=>{
    const {id} = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        await cloudinary.uploader.destroy(user.cloudinary_id);
        res.send(user);
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

module.exports = router