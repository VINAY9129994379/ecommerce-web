const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();
const Product = require('./models/Product'); // Import your Product model
const User = require('./models/userModel');




const app = express(); // Initialize express

app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Enable CORS

const port = 5000;

// Basic route
app.get("/", (req, res) => {
    res.send("Express is running");
});

//register api
app.post('/signup',async(req,res)=>{
    let check = await User.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing"})
    }
    let cart ={};
    for(let i=0; i<300; i++){
        cart[i]=0;
    }
    const user=new User({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
     await user.save();
     const data={
        user:{
            id:user.id
        }
     }
     const token =jwt.sign(data, 'secret_ecom');
     res.json({success:true,token})
})


//login api
app.post('/login',async(req,res)=>{
    let user =await User.findOne({email:req.body.email});
    if(user){
        const passcompare=req.body.password===user.password;
        if(passcompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token =jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong email id"});
    }
})

app.get('/newcollections',async(req,res)=>{
    let products=await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

//creating endpoint for popular in women section
app.get('/popularinwomen',async(req,res)=>{
    let products=await Product.find({category:"women"});
    let popular_in_women=products.slice(0,4);
    console.log("popular in women fetched");
    res.send(popular_in_women);
})

const fetchUser= async(req,res,next)=>{
    const token =req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"please authenticate using validate token"})
    }
    else{
        try{
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        }
        catch(error){
            res.status(401).send({errors:"please authentication using a validate token"});
        }
    }
}

app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("Added",req.body.itemId);
    let userData=await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")

})

//creating endpoint to remove product from cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData=await User.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
userData.cartData[req.body.itemId] -=1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("removed")

})

//creating  endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData=await User.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

// Configure multer storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Serve static images
app.use('/images', express.static('upload/images'));

// Endpoint to upload images
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});



// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));


// Add product
// Add product
// Add product with custom id
app.post('/addproduct', async (req, res) => {  
    try {
        const { id, name, image, category, new_price, old_price, available } = req.body;
             // Fetch the last product's custom ID and increment it
             let products = await Product.find({}).sort({ id: -1 }).limit(1); // Sort by ID descending
             let newId = 1; // Default ID if no products exist
             if (products.length > 0) {
                 newId = products[0].id + 1; // Increment the last product's ID
             }
     

        const product = new Product({
            id:newId,            // Custom id passed from request body
            name,
            image,
            category,
            new_price,
            old_price,
            available
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


   

// Get all products
app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log('All products found');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to remove a product by `id`
app.post('/removeproduct', async (req, res) => { 
    try {
        const { id, name } = req.body;
        const product = await Product.findOneAndDelete({ id });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        console.log('Removed');
        res.json({
            success: true,
            name: name || product.name // Send the name if available
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing product', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
