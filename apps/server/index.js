const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const path = require("path");

const serviceAccount = require("../../tryallframeworks-firebase-adminsdk-p2tx8-be3d9d5a4e.json");
const { initializeApp, cert } = require("firebase-admin/app");

initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tryallframeworks.fierbaseio.com",
});

server.use(bodyParser.json());

server.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

//////

const dbRouter = require("./db");
const staticRouter = require("./static");
server.use("/api", dbRouter);
server.use("/", staticRouter);

server.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

server.listen("8080", () => {
  console.log("Server open");
});
