import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import("./database/connection.js");
import router from "./routes/router.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log("running on port", process.env.PORT);
});

app.use(router);
app.get("/", (req, res) => {
  res.status(201).json("server start");
});
