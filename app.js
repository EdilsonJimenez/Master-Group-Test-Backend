const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

app.use(bodyparser.json());
app.use(cors());
// app.enable('trust proxy');
require('./routers/')(app, server);

server.listen(5000, () => {
    console.log('Server on');
    console.log('http://localhost:5000')
});