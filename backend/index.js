import express from 'express'
import dbConnect from './config/dbConnection.js';
import cprofileRouter from './routes/cprofile.route.js';
import newsRouter from './routes/news.route.js';
import certificatesRouter from './routes/certificates.route.js'
import projectsRouter from "./routes/projects.route.js"
import productsRouter from "./routes/products.route.js"
import authRouter from "./routes/auth.route.js"
import { errorMiddleware } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import path from 'path'
import adminsRouter from "./routes/admins.route.js"
import cors from 'cors'
const app = express();
// Allow requests from your frontend domain
const corsOptions = {
    origin: 'https://igi-lebanon.com',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Include Authorization header for JWT
    credentials: true, // Allow cookies to be sent in cross-origin requests
  };
  
  app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

dbConnect();

app.use("/api/cprofile", cprofileRouter);
app.use("/api/news", newsRouter);
app.use("/api/certificates", certificatesRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/admins", adminsRouter)



app.use(errorMiddleware);

app.listen(3000, () => {
    console.log("Server is listening on port 3000!");
});



