const credentialController = require('../controllers/credential.controller');

module.exports = (app) => {

    app.post('/credentials',
        credentialController.createCredential
    );

}