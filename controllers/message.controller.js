const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const file = path.join(process.cwd(), 'data', 'messages.json');

module.exports = {
    getMessage: (req, res) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: "Error en el servidor, vuelve a intentarlo en unos minutos" });
            }
            var messages = JSON.stringify(data);
            if (messages[req.params.id]) {

            } else {
                return res.status(404).send({ message: "No existe mensaje con id " + req.params.id })
            }
        });
    },

    createMessage: (req, res) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ message: "Error en el servidor, vuelve a intentarlo en unos minutos" });
            }
            var messages = JSON.parse(data);
            const idMessage = uuid.v1();
            console.log(idMessage)
            messages[idMessage] = req.body
            fs.writeFileSync(file, JSON.stringify(messages), 'utf8');
            return res.status(200).send({ message: "Mensaje creado exitosamente", id: idMessage });
            // if(messages[req.params.id]){

            // } else {
            //     return res.status(404).send({message: "No existe mensaje con id " + req.params.id})
            // }
        });
    }
}