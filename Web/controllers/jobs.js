const express = require("express");
const router = express.Router();

const Jobs = require("../models/jobs");

router.get("/all", (req, res) => {
  Jobs.all((err, docs) => {
    res.json({ jobs: docs });
  });
});

router.get("/recent", (req, res) => {
  Jobs.recent((err, docs) => {
    res.json({ jobs: docs });
  });
});

router.post("/new", (req, res) => {
  Jobs.create(res.body, (err, docs) => {
    res.json({ jobs: docs });
  });
});

export default router;
