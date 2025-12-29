require("reflect-metadata");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { RoutesProvider } = require("./src/RoutesProvider");
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false, limit: "500mb" }));
app.use(express.json({ limit: "500mb" }));

RoutesProvider(app);

const PORT = process.env.PORT || 3033;
try {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
} catch (error) {
  console.error("Unable to start server:", error);
  throw error;
}
