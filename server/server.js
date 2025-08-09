const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const CodeSchema = new mongoose.Schema({
  html: String,
  ts: String,
  css: String,
  createdAt: { type: Date, default: Date.now }
});
const Code = mongoose.model('Code', CodeSchema);

app.post('/save', async (req, res) => {
  const code = new Code(req.body);
  await code.save();
  res.json({ message: 'Saved' });
});

app.get('/codes', async (req, res) => {
  const codes = await Code.find().sort({ createdAt: -1 }).limit(10);
  res.json(codes);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
