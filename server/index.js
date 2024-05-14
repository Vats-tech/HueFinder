const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Vibrant = require("node-vibrant");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.get("/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  const apiKey = process.env.API_KEY;
  const serachType = "image";
  const baseURL = "https://www.googleapis.com/customsearch/v1";
  const url = `${baseURL}?key=${apiKey}&q=${encodeURIComponent(
    keyword
  )}&searchType=${serachType}`;
  const response = await axios.get(url);
  const imageData = response.data.items.slice(0, 3);

  const extractedImages = imageData.map((elements) => {
    return elements.link;
  });

  const promises = extractedImages.map((image) => {
    return new Promise((resolve, reject) => {
      Vibrant.from(image)
        .getPalette()
        .then((palette) => {
          resolve(palette);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });

  Promise.all(promises)
    .then((palettes) => {
      // All promises resolved, palettes contains an array of results
      res.json(palettes);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
      res.status(422).json({ error: "Internal server error" });
    });
});

app.use("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log("listening to port", PORT);
});
