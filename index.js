const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const guard = require("./guard");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "1mb" }));

app.post("/guard", async (req, res) => {
  try {
    const appstate = req.body.appstate;
    if (!Array.isArray(appstate)) return res.status(400).json({ success: false, message: "Invalid appstate format" });

    const result = await guard(appstate);
    res.json({ success: true, message: result });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
});

app.listen(6217, () => {
  console.log("Server started at http://localhost:6217");
  
});
