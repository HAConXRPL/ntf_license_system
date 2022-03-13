var express = require("express");
var static = require("serve-static");
var path = require("path");

var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
// 에러 핸들러 모듈 사용
var expressErrorHandler = require("express-error-handler");
//
var config = require("./config/config");
var database_loader = require("./database/database_loader");
var route_loader = require("./routes/route_loader");
// SocketIO 모듈
var cors = require("cors");
//
var app = express();

var server = require("http").Server(app);
var serverio = require("socket.io")(server);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

console.log("config.server_pot-> " + config.server_port);
app.set("port", config.server_port);
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// cors 초기화
app.use(cors());
//
var router = express.Router();

app.get("/", function (req, res) {
  res.render("index");
});

route_loader.init(app, router);

var errorHandler = expressErrorHandler({
  static: {
    404: "./public/404.html",
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

app.listen(app.get("port"), function () {
  console.log("익스프레스로 웹 서버를 실행함 : " + app.get("port"));

  //  database_loader.init(app, config);
});
