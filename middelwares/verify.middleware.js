const crypto = require('crypto');
const url = require("url");
const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'data', 'credentials.json');

module.exports = (req, res, next) => {
    const retrivedSignature = req.headers['x-signature'];
    const key = req.headers['x-key'];
    const parsedUrl = url.parse(req.url);
  
    if (!key) {
       
        return res.status(403).send();
    }

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            
            return res.status(500).send({ message: "Error en el servidor, vuelve a intentarlo en unos minutos." })
        }
 
        var credentials = JSON.parse(data);
   
        if (credentials[key]) {
       
            const secret = credentials[key];
     
            var params = []
            for (let atr in req.body) {
                params.push(`${atr}=${req.body[atr]}`);
            }
            params.sort();

            var computedSignature = crypto.createHmac("sha256", secret).update(params.join(';')).digest("hex");

            if (computedSignature === retrivedSignature) {
                next();
            }
            return res.status(403).send();

        } else {
            return res.status(403).send();
        }
    });

}