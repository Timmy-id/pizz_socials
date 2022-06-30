import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URL;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, options).then(
  () => {
    console.log('Database Connected');
  },
  (err) => {
    console.log('Error connecting due to: ' + err);
  }
);
