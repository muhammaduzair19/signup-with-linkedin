
import express from "express";
import cors from "cors";

const app = express();



//CORS
app.use(cors(
    {
        origin: process.env.CORSORIGIN,
        credentials: true
    }
));


//JSON PARSER
app.use(express.json({ limit: "5mb" }));

//URL ENCODED
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

//FOR STATIC FILES
app.use(express.static('public'))






//routes Import
import userRoutes from "./routes/user.routes.js";

//configure routes
app.use('/api/v1/users', userRoutes);


app.get('/', (req, res) => {
    res.send("Hello Im here")
})



export { app }