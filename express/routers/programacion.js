const express = require('express');

const { programacion } = require('../datos/cursos.js').infoCursos;

const routerProgramacion = express.Router();

//Middleware, en concreto esta se encarga de transformar el json en texto a objeto (basado en parser)
routerProgramacion.use(express.json());

routerProgramacion.get('/', (req, res) => {
    //res.send(JSON.stringify(programacion)); 
    //res.send(programacion); //Lo envía automáticamente en JSON
    res.json(programacion); // Te aseguras que está en formato json al hacer el send, porque llama a stringify
});

//GET

routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const data = programacion.filter(curso => curso.lenguaje === lenguaje);

    if (data.length === 0) {
        return res.status(404).send("No se encontró el curso " + lenguaje);
    }


    if (req.query.ordenar === 'vistas') {
        console.log("ordenando");
        res.send(JSON.stringify(data.sort((a, b) => b.vistas - a.vistas))); //Orden DESC, si lo queremos ASC, sería (a.vistas, b.vistas)
    } else {
        res.send(JSON.stringify(data));
    }
});


routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const data = programacion.filter(curso =>
        curso.lenguaje === lenguaje && curso.nivel === nivel);

    if (data.length === 0) {
        //return res.status(404).send("No se encontró el lenguaje ", + lenguaje + " de nivel " + nivel);
        //Otra opcioón es enviar una respuesta vacía
        //return res.status(404).end();
        //O también podemos devolver 204 (not content) si la ruta es válida pero no se encontró contenido
        return res.status(204).end();
    }
    res.send(JSON.stringify(data));
});

//POST

routerProgramacion.post('/', (req, res) => {
    const cursoNuevo = req.body;
    //Aquí irían algunas comprobaciones de formato
    programacion.push(cursoNuevo);
    res.send(JSON.stringify(programacion));
});


// PUT (necesitas enviar todas las propiedades del objeto)

routerProgramacion.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id); //devuleve el índice del array basado en la búsqueda de un campo (comparo un int con un string)
    // Si no lo encuentra, devuelve -1
    if (indice >= 0) {
        programacion[indice] = cursoActualizado;
    } 
    res.send(JSON.stringify(programacion));
});

// PATCH (enviamos solo las propiedades que queremos cambiar)
routerProgramacion.patch('/:id', (req, res) => {
    const infoActualizada = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0) {
        const cursoAModificar = programacion[indice];
        //Modifica solo algunas propiedades del objeto
        Object.assign(cursoAModificar, infoActualizada);
    }
    res.send(JSON.stringify(programacion));
});

// DELETE
routerProgramacion.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0) {
        //Elementos a eliminar desde el índice
        programacion.splice(indice, 1);
    } else {
        res.status(404);
    }
    res.send(JSON.stringify(programacion));
});

module.exports = routerProgramacion;