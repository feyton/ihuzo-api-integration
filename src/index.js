import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path, { join } from "path";
import { v4 } from "uuid";
import { PaymentPostView, SuccessView } from "./indexApp/views.js";
dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST_NAME || `http://localhost:${PORT}`;
const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

app.get("/success", SuccessView);
app.get("/pay", (req, res) => {
  return res.render("pay");
});
app.post("/pay", PaymentPostView);
app.get("*", (req, res) => {
  const data = {
    tx_id: v4(),
    API_KEY: process.env.API_PUBLIC,
    redirect: `${HOST}/success`,
  };
  return res.render("index", data);
});

app.listen(PORT, () => {
  console.log("Server running", PORT);
});
