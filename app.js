const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const server = http.createServer(app);

app.use(bodyparser.json());

require('./routers/')(app, server);

server.listen(3000, () => {
    console.log('Server on');
    console.log('http://localhost:3000/test')
});