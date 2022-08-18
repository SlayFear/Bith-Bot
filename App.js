const  fs = require('fs');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const SESSION_FILE_PATH = './session.json';

let client;
let sessionData;



const withSession = () => {

}

/**
 * Esta funcion GENERA EL QR CODE ***
 */
    const withOutSession = () => {

        console.log('No existe una sessión almacenada');
        client = new Client();
        client.on('qr', qr => {
            qrcode.generate(qr, { small: true });
        });

        client.on('authenticated', (session) => {
            //  Guardamos credenciales de sesión para usar luego
            sessionData = session;
            fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) =>  {
                if(err){
                    console.log( 'Error: '  + err);
                }
            });
        });
        client.initialize();
    }


/** */
(fs.existsSync(SESSION_FILE_PATH)) ? withSession() :  withOutSession();
