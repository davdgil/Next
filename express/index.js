const express = require('express');
const app = express();

const { infoCursos } = require('./datos/cursos.js');

require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Hello World')
})


/*
app.get('/api/cursos/programacion', (req, res) => {
    //res.send(infoCursos.programacion);
    res.send(JSON.stringify(infoCursos.programacion));
})

app.get('/api/cursos/matematicas', (req, res) => {
    //res.send(infoCursos.matematicas);
    res.send(JSON.stringify(infoCursos.matematicas));
})

app.get('/api/cursos/programacion/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;

    const data = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);

    if(data.length === 0){
        return res.status(404).send("No se encontro" + lenguaje);
    }

    if(req.query.ordenar === 'vistas'){
        res.send(JSON.stringify(data.sort((a, b) => b.vistas - a.vistas)));
    }else{
        res.send(JSON.stringify(data));
    }
});

app.get('/api/cursos/programacion/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;

    const data = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

    if(data.length === 0){
        return res.status(404).send("No se encontro" + lenguaje + " y de nivel" + nivel);
    }

    if(req.query.ordenar === 'vistas'){
        res.send(JSON.stringify(data.sort((a, b) => b.vistas - a.vistas)));
    }else{
        res.send(JSON.stringify(data));
    }
});

app.get('/api/cursos/matematicas/:tema', (req, res) => {
    const tema = req.params.tema;

    const data = infoCursos.matematicas.filter(curso => curso.tema === tema);

    if(data.length === 0){
        return res.status(404).send("No se encontro" + tema);
    }

    if(req.query.ordenar === 'vistas'){
        res.send(JSON.stringify(data.sort((a, b) => b.vistas - a.vistas)));
    }else{
        res.send(JSON.stringify(data));
    }
});

const routerProgramacion = express.Router();
app.use('/api/cursos/programacion', routerProgramacion);

routerProgramacion.get('/', (req, res) => {
    const lenguaje = req.params.lenguaje;

    const data = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);

    if(data.length === 0){
        return res.status(404).send("No se encontro" + lenguaje);
    }

    if(req.query.ordenar === 'vistas'){
        res.send(JSON.stringify(data.sort((a, b) => b.vistas - a.vistas)));
    }else{
        res.send(JSON.stringify(data));
    }   
})

routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;

    const data = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);

    if(data.length === 0){
        return res.status(404).send("No se encontro" + lenguaje);
    }

    if(req.query.ordenar === 'vistas'){
        res.send(JSON.stringify(data.sort((a, b) => b.vistas - a.vistas)));
    }else{
        res.send(JSON.stringify(data));
    }
})

*/

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor inciado en el puerto', port);
});

