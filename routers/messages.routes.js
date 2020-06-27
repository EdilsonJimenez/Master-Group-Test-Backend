const messageController = require('../controllers/message.controller');
const verifyMiddelware = require('../middelwares/verify.middleware');


module.exports = (app) => {
    app.get('/message/:id', [
        verifyMiddelware,
        messageController.getMessage
    ]);

    app.post('/message', [
        verifyMiddelware,
        messageController.createMessage
    ]);
}