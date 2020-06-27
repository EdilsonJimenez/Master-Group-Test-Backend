const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'data', 'credentials.json');

module.exports = {

    createCredential : (req, res) => {
        fs.readFile(file, 'utf8', (err, data)=> {
            if(err){
                console.log(err);
                return res.status(500).send({message: "Error en el servidor, vuelve a intentarlo en unos minutos."})
            }

            var credentials = JSON.parse(data);
            // console.log(credentials);
            if(!credentials[req.body.key]){
                credentials[req.body.key] = req.body.shared_secret;
                fs.writeFileSync(file, JSON.stringify(credentials), 'utf8');
                return res.status(204).send({message: "Credencial creada exitosamente."})
            } else {
                return res.status(403).send({message: "Ya existe la llave " + req.body.key})
            }
            // return res.status(200).send(credentials)
        });
    }
}