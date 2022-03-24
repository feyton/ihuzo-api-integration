import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import formidable from "express-formidable";
import got from "got";
import path, { join } from "path";
import { v4 } from "uuid";
dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 4000;
const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(formidable());
app.use(express.static(join(__dirname, "public")));

app.get("/success", (req, res) => {
  const { status, tx_ref, transaction_id } = req.query;
  const data = {
    status,
    tx_ref,
    transaction_id,
    name: "Fabrice",
  };
  return res.render("success", data);
});
app.get("/pay", (req, res) => {
  return res.render("pay");
});
app.post("/pay", async (req, res) => {
  try {
    const response = await got
      .post("https://api.flutterwave.com/v3/payments", {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET}`,
        },
        json: {
          tx_ref: v4(),
          amount: 3000,
          currency: "RWF",
          redirect_url: "http://localhost:3000/success",
          meta: {
            consumer_id: 23,
            consumer_mac: "92a3-912ba-1192a",
          },
          customer: {
            email: "user@gmail.com",
            phonenumber: "078724157",
            name: "Yemi Desola",
          },
          customizations: {
            title: "Pied Piper Payments",
            logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png",
          },
        },
      })
      .json();
    console.log(response);
    return res.redirect(response.data.link);
  } catch (err) {
    console.log(err.code);
    console.log(err.response.body);
    return res.send(err);
  }
});
app.get("*", (req, res) => {
  const data = {
    tx_id: v4(),
    name: "Fabrice",
    API_KEY: process.env.API_PUBLIC,
    amount: 3000,
  };
  return res.render("index", data);
});

app.listen(PORT, () => {
  console.log("Server running", PORT);
});
