var route_loader = {};

route_info = [
  {
    file: "./connect",
    path: "/licenseSystem/process/lsview",
    method: "lsview",
    type: "post",
  },
];

route_loader.init = function (app, router) {
  console.log("router_loader.Init 호출.");

  initRoutes(app, router);
};

function initRoutes(app, router) {
  console.log("initRoutes 호출됨.");

  for (var i = 0; i < route_info.length; i++) {
    var curItem = route_info[i];
    //
    var curModule = require(curItem.file);
    //
    if (curItem.type == "get") {
      router.route(curItem.path).get(curModule[curItem.method]);
    } else if (curItem.type == "post") {
      router.route(curItem.path).post(curModule[curItem.method]);
    } else {
      console.error("라우팅 함수의 타입을 알 수 없습니다. : " + curItem.type);
    }
  }
  //
  app.use("/", router);
}

module.exports = route_loader;
