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
    //herokuにあげると、gitignoreしたmongoDBへの接続URLがわからないので、DB接続ができない
    //これはパスワードを直書きしたくない為です。なので、heroku上では環境変数で渡すことにする。ローカルでは.envを見ればいい
    await connectDB(process.env.MONGO_HEROKU_URL || process.env.MONGO_URL);
    //ローカル環境では5000番が使えるが、
    //herokuでは5000番が使えないので、以下のようにherokuで使えるポートを指定する「process.env.PORT」
    app.listen(process.env.PORT || PORT, console.log('サーバが起動しました'));
  } catch (err) {
    console.log(err);
  }
};

start();
