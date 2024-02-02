const http = require('http')

const servidor = http.createServer((req, res) => {

    res.end("Hola jsjsj") // permite enviar la respuesta al cliente cuando termina el proceso
});


//CREAMOS EL SERVIDOR

const port = 3000;
servidor.listen(port, () => {
    console.log("Escuchando por en localhost por el puerto: ", port)
})