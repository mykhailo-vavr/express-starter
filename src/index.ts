import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import auth from './routers/auth';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', auth);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.info(`Server run on port ${port}`);
});
