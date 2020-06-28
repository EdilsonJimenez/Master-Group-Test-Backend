const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const file = path.join(process.cwd(), 'data', 'messages.json');

module.exports = {
    getMessage: (req, res) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                
                return res.status(500).send({ message: "Error en el servidor, vuelve a intentarlo en unos minutos" });
            }
            var messages = JSON.parse(data);
            if (messages[req.params.id]) {
                return res.status(200).send(messages[req.params.id]);
            } else {
                return res.status(404).send({ message: "No existe mensaje con id " + req.params.id })
            }
        });
    },

    createMessage: (req, res) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
           
                return res.status(500).send({ message: "Error en el servidor, vuelve a intentarlo en unos minutos" });
            }
            var messages = JSON.parse(data);
            const idMessage = uuid.v1();
            messages[idMessage] = req.body
            messages[idMessage].id = idMessage;
            fs.writeFileSync(file, JSON.stringify(messages), 'utf8');
            return res.status(200).send({ message: "Mensaje creado exitosamente", id: idMessage });
        });
    },

    filterMessages: (req, res) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
              
                return res.status(500).send({ message: "Error en el servidor, vuelve a intentarlo en unos minutos" });
            }
            var messages = JSON.parse(data);
            var messagesFiltered = [];

            for(let message in messages){
         
                for(let tag in messages[message].tags){
          
                    if(messages[message].tags[tag] === req.params.tag){
                        messagesFiltered.push(messages[message]);
                    }
                }
            }

            return res.status(200).send(messagesFiltered);
        });
    }
}