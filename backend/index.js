import express from 'express'
import dbConnect from './config/dbConnection.js';
const app = express();
dbConnect();


app.get("/", (req, res) => {
    res.send("Hello server!");
})






app.listen(3000, () => {
    console.log("Server is listening on port 3000!");
});