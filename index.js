const express = require("express");
const activateGuard = require("./guard");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <h2>🛡️ FB Profile Guard</h2>
    <form method="POST" action="/activate">
      <textarea name="appstate" rows="15" cols="60" placeholder='Paste your appstate JSON here'></textarea><br><br>
      <button type="submit">Activate Guard</button>
    </form>
  `);
});

app.post("/activate", async (req, res) => {
  try {
    const raw = req.body.appstate;
    const appstate = JSON.parse(raw);
    const result = await activateGuard(appstate);
    res.send(`<p>${result}</p><a href="/">⬅ Back</a>`);
  } catch (err) {
    res.status(400).send(`<pre>❌ Error:\n${err.message}</pre><a href="/">⬅ Back</a>`);
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
