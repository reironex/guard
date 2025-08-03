const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const guard = require("./guard");

const app = express();
const PORT = process.env.PORT || 6217;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/activate", async (req, res) => {
  const appstate = req.body.appstate;
  if (!appstate) return res.json({ success: false, message: "No appstate!" });

  try {
    const result = await guard(appstate);
    res.json(result);
  } catch (e) {
    res.json({ success: false, message: "Failed to activate guard." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
