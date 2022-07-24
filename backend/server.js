import express from "express";
import "dotenv/config";
import connectDB from "./config/db";
import router from "./routes/pollRoutes";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.port || 3500;
connectDB();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/polls", router);

//Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend/build")));
  app.use(express.static("public"));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
