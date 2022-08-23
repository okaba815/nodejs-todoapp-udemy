const express = require('express');
const app = express();
const taskRoute = require('./routes/tasks');
const connectDB = require('./db/connect');
const PORT = 5000;
require('dotenv').config();

app.use(express.json());
app.use(express.static('./public'));

//ルーティング設定
app.use('/api/v1/tasks', taskRoute);

//データベース接続
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, console.log('サーバが起動しました'));
  } catch (err) {
    console.log(err);
  }
};

start();
