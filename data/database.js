import mongoose from "mongoose";


export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
    dbName: "backend_practice",
})
.then(() => console.log("Database successfully connected"))
.catch((e) => console.log(console.error()));
};