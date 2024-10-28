import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./db/connect.js";
import { app } from "./app.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(`MONGODB connection failed: `, err);
    });
