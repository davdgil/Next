
const http = require('http')

const cursos = require('./cursos')

const servidor = http.createServer((req, res) => {

    switch(req){
        case 'GET': 
            return manejarSolicitudesGET(req, res);
        case 'POST':
            return 0;
    }
});

function manejarSolicitudesGET(req, res){
    const path = req.url;

    if (path === '/'){
        return res.end("Error 404")
    }else if(path === '/cursos'){
        
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


