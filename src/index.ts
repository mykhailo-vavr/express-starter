import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Ts in js');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.info(`Server run on port ${port}`);
});
