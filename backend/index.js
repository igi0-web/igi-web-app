import express from 'express'
import dbConnect from './config/dbConnection.js';
import cprofileRouter from './routes/cprofile.route.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
const app = express();
app.use(express.json());
dbConnect();

app.use("/api/cprofile", cprofileRouter);
app.get("/", (req, res) => {
    res.send("Hello server!");
})





app.use(errorMiddleware);
app.listen(3000, () => {
    console.log("Server is listening on port 3000!");
});

