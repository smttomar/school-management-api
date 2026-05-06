import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./congfig/db.js";
import schoolRoutes from "./routes/schoolRoutes.js";

dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use("/api/schools", schoolRoutes);

app.get("/", (req, res) => {
    res.send("School Management API is Running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
