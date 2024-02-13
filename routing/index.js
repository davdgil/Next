const http = require('http');
const cursos = require('./cursos');
const path = require('path');

const servidor = http.createServer((req, res) => {

    switch (req.method) {
        case 'GET':
            return manejarSolicitudesGET(req, res);
        case 'POST':
            console.log("Hola POST");
            return manejarSolicitudesPOST(req, res);
        default:
            res.statusCode = 501;
            res.setHeader('Content-Type', 'text/plain')
            res.end('Metodo no implementado');
    }

});

function manejarSolicitudesGET(req, res) {
    let ruta = req.url;

    if (ruta === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain')
        res.end('Bienvenido al servidor de cursos')
    } else if (ruta === '/cursos') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify(cursos.infoCursos))

    } else if (ruta === '/cursos/programacion') {

        return res.end(JSON.stringify(cursos.infoCursos.programacion))
    }
}

function manejarSolicitudesPOST(req, res) {
    let ruta = req.url;
    if (ruta === "/cursos/programacion") {
        let body = '';
        req.on('data', (content) => {
            body += content.toString();
        });

        req.on('end', () => {
            body = JSON.parse(body)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Curso creado exitosamente' }));
        });
    }
}
//CREAMOS EL SERVIDOR

const port = 3000;
servidor.listen(port, () => {
    console.log("Escuchando en localhost por el puerto: ", port)
})
