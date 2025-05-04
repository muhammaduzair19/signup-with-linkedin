import connectDB from "./db/index.js";
import { app } from "./app.js";
import { PORT } from "./config/config.js";

//DB CONNECTION with SERVER RUNNING
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT} 🚀🚀🚀`);
        });
    })
    .catch((error) => {
        console.log("MONGO DB CONNECTION ERROR", error);
    });

/*
 ANOTHER WAY FOR MONGODB CONNECTION
(async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(conn.connection.host);
        app.on('error', (error) => {
            console.log('MONGO DB CONNECTION ERROR', error)
        });

        app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log('MONGO DB CONNECTION ERROR', error)
    }
})();

*/
