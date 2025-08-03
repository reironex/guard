const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const guard = require('./guard');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/guard', upload.single('appstate'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const rawData = fs.readFileSync(filePath, 'utf8');
    const appstate = JSON.parse(rawData);

    const result = await guard.enableGuard(appstate);
    fs.unlinkSync(filePath); // delete temp uploaded file
    res.send(`<h2>${result}</h2><a href="/">← Back</a>`);
  } catch (err) {
    console.error(err);
    res.status(500).send(`<h2>❌ Failed to activate guard.</h2><a href="/">← Back</a>`);
  }
});

const PORT = process.env.PORT || 6217;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
