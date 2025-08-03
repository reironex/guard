const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const guard = require('./guard');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/guard', upload.single('appstate'), async (req, res) => {
  try {
    const raw = fs.readFileSync(req.file.path);
    const appstate = JSON.parse(raw);
    const result = await guard.enableGuard(appstate);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error activating guard.');
  }
});

const PORT = process.env.PORT || 6217;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
