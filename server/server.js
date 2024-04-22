const jsonServer = require("json-server");

// Import the library:
const cors = require("cors");

const server = jsonServer.create();

// Then use it before your routes are set up:
server.use(cors());

const router = jsonServer.router("../public/data/db.json");
// const middlewares = jsonServer.defaults();
// server.use(middlewares);

server.use("/", router);

server.listen(3001, () => {
  console.log("Mock api server listening at localhost:3001");
  console.log(router.db);
});
