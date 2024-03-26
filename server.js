require('dotenv').config();
const http = require('http');
const app = require('./app');
// 

let port = process.env.PORT || 8888;
let host = process.env.HOST

let server = http.createServer(app);

server.listen(9999,()=>{
    console.log(`My server gets started on ${host}:${port}`);
})