// 处理整个程序所要用的依赖
const morgan  = require('morgan')
import path from "path";
import express from 'express'
import  bodyParser from 'body-parser';
import journalRouter from './routes/index';
import { createWriteStream } from "fs";

const app = express();

app.use((req: any, res: any, next: any) => {
  // console.log(req.app.get("env"));
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

const accessLogStream = createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a"
});
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));  //解析表单格式
app.use(bodyParser.json()) //解析json 数据格式
app.use('/api',express.static(path.join(__dirname, 'apidoc')));

app.use('/journal',journalRouter);
export default app;