import app from './app.js';
import connectDb from './db/connectdb.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Is Running on Port ${PORT}`);
});

connectDb();