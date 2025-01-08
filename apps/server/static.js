const express = require("express");
const router = express.Router();
const path = require("path");

router.use("/public", express.static(path.join(__dirname, "../dist/public")));
router.use("/styles", express.static(path.join(__dirname, "../dist/styles")));
router.use("/", express.static(path.join(__dirname, "../dist/js")));

router.use(
  "/react",
  express.static(path.join(__dirname, "../dist/react-build"))
);
router.get("/react/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/react-build/index.html"));
});

module.exports = router;
