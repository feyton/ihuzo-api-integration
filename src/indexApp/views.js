import dotenv from "dotenv";
import FlutterWave from "flutterwave-node-v3";
import got from "got";
import { v4 } from "uuid";
dotenv.config();
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST_NAME || `http://localhost:${PORT}`;
const flw = new FlutterWave(process.env.API_PUBLIC, process.env.API_SECRET);
export const IndexView = async (req, res) => {};

export const SuccessView = async (req, res) => {
  const { status, tx_ref, transaction_id } = req.query;
  if (status == "cancelled") {
    return res.render("cancel", { status, tx_ref });
  } else {
    try {
      const response = await flw.Transaction.verify({ id: transaction_id });
      if (response.data.status === "successful") {
        return res.render("success", response.data);
      } else {
        return res.render("fail", response.data);
      }
    } catch (error) {
      return res.status(400).send("Page not found or Invalid request");
    }
  }
};

export const PaymentPostView = async (req, res) => {
  const data = req.body;
  console.log(data);
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
      console.log(response);
      return res.redirect(response.data.link);
    } else {
      return res.status(200).json({ link: response.data.link });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
};
