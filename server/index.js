const { getColorFromURL, getPaletteFromURL } = require("color-thief-node");
const express = require("express");
const axios = require("axios");
const mime = require("mime-types");
const cors = require("cors");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

async function getColorsFromImage(response) {
  const imageData = response.data.items.slice(0, 100);
  const extractedImages = imageData.map((elements) => {
    return elements.link;
  });

  const supportedMimeTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml", // Optional, check if supported by your implementation
  ]);

  const promises = extractedImages
    .filter((image) => {
      const mimeType = mime.lookup(image);
      return supportedMimeTypes.has(mimeType);
    })
    .map((image) => {
      return new Promise((resolve, reject) => {
        getPaletteFromURL(image)
          .then((palette) => {
            resolve(palette);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });

  try {
    const palettes = await Promise.all(promises);
    return palettes;
  } catch (error_1) {
    // Handle errors
    res.status(422).json({ error: "Internal server error" });
  }
}

app.get("/:keyword", async (req, res) => {
  const query = req.params.keyword;
  const apiKey = process.env.API_KEY;
  try {
    const baseURL = `https://www.googleapis.com/customsearch/v1?key=${apiKey}`;
    const response = await axios.get(baseURL, {
      params: {
        q: query,
        searchType: "image", // This restricts results to images only
        num: 10,
      },
    });

    const result = await getColorsFromImage(response);
    res.json(result);
  } catch (error) {
    // Check if the error is from the external API
    if (error.response) {
      // Error from Google Custom Search API
      const statusCode = error.response.status;
      const errorMessage = error.response.data.error.message;
      // Send the error to the client
      // return res.status(statusCode).json({
      //   error: true,
      //   message: `Google API Error: ${errorMessage}`,
      // });
      res.json(error);
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500).json({
        error: true,
        message: "No response received from Google API",
      });
    } else {
      // Something happened in setting up the request that triggered an error
      res.status(500).json({
        error: true,
        message: `Error in setting up the request: ${error.message}`,
      });
    }
  }
});

app.use("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log("listening to port", PORT);
});
