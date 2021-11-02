const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.end('Request fulfilled');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
