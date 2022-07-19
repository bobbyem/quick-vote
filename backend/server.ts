import express from "express";
import "dotenv/config";
import connectDB from "./config/db";
import router from "./routes/pollRoutes";
import cors from "cors";

const app = express();
const PORT = process.env.port || 3500;
connectDB();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/polls", router);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
