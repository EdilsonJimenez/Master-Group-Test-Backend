const credentialController = require('../controllers/credential.controller');
const verifyMiddleware = require('../middelwares/verify.middleware');

module.exports = (app) => {
    
    app.post('/credentials', [
        verifyMiddleware,
        credentialController.createCredential
        ]   
    );

}