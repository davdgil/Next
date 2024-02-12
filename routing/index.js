
const http = require('http')

const cursos = require('./cursos')

const servidor = http.createServer((req, res) => {

    switch(req){
        case 'GET': 
            return manejarSolicitudesGET(req, res);


        default:
            res.statusCode = 501;
            res.setHeader('Content-Type', 'text/plain')
            res.end('Metodo no implementado');
    }
   
});

function manejarSolicitudesGET(req, res){
    const path = req.url;

    if (path === '/'){
        res.statusCode = 200;
        es.setHeader('Content-Type', 'text/plain')
        res.end('Bienvenido al servidor de cursos')
    }else if(path === '/cursos'){
        res.statusCode = 200;
        es.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify(cursos.infoCursos))

    }else if(path === '/cursos/programacion'){
        
        return res.end(JSON.stringify(cursos.infoCursos.programacion))
    }
}
//CREAMOS EL SERVIDOR

const port = 3000;
servidor.listen(port, () => {
    console.log("Escuchando por en localhost por el puerto: ", port)
})


