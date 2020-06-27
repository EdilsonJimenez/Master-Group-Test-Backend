module.exports = function (app, server) {

    require('./credentials.routes')(app);
    require('./messages.routes')(app);
}