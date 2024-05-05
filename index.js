const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 3500;

const app = express();

app.use(bodyParser.json());
app.use("/", routes);
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// route

app.use("/user",routes)



app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})
