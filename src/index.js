import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import FlutterWave from "flutterwave-node-v3";
import got from "got";
import path, { join } from "path";
import { v4 } from "uuid";

dotenv.config();
const flw = new FlutterWave(process.env.API_PUBLIC, process.env.API_SECRET);
const __dirname = path.resolve();
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST_NAME || `http://localhost:${PORT}`;
const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

app.get("/success", async (req, res) => {
  const { status, tx_ref, transaction_id } = req.query;
  const response = await flw.Transaction.verify({ id: transaction_id });
  console.log(response);
  try {
    if (response.data.status === "successful") {
      return res.render("success", response.data);
    } else {
      return res.render("fail", response.data);
    }
  } catch (error) {
    return res.status(400).send("Page not found or Invalid request");
  }
});
app.get("/pay", (req, res) => {
  return res.render("pay");
});
app.post("/pay", async (req, res) => {
  const data = req.body;
  try {
    const response = await got
      .post("https://api.flutterwave.com/v3/payments", {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET}`,
        },
        json: {
          tx_ref: v4(),
          amount: parseInt(data.amount) || 4000,
          currency: "RWF",
          redirect_url: `${HOST}/success`,

          meta: {
            consumer_id: Math.floor(Math.random() * 100),
            consumer_mac: v4(),
          },
          customer: {
            email: data.email || "user@gmail.com",
            phonenumber: "078724157",
            name: data.name || "Test Standard",
          },
          customizations: {
            title: "Feyton Inc ST",
            logo: "https://feyton.co.rw/static/img/favicon.png",
          },
        },
      })
      .json();
    if (data.redirect == "on") {
      return res.redirect(response.data.link);
    } else {
      return res.status(200).json({ link: response.data.link });
    }
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
    redirect: `${HOST}/success`,
  };
  return res.render("index", data);
});

app.listen(PORT, () => {
  console.log("Server running", PORT);
});
