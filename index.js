const app = express();

const http = require('http');
const { instrument } = require("@socket.io/admin-ui");

const server = http.createServer(app);
var io = require("socket.io")(server, {
cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
},
 });

instrument(io, {
 auth: false,
 mode: "development"
});
