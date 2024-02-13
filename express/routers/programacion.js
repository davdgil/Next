const express= require('express')

const { programacion } = require('../datos/cursos.js').infoCursos;

const routerProgramacion = express.Router();

routerProgramacion.use(express.json())

routerProgramacion.get('/', (req, res) =>{
    res.json(programacion)
})

//POST

routerProgramacion.post('/', (req, res)=>{
    const cursoNuevo = req.body;
    programacion.push(cursoNuevo);
    res.send(JSON.stringify(programacion))
})

//PUT
routerProgramacion.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);

    // Si no lo encuentra, devuelve -1
    if (indice >= 0) {
        programacion[indice] = cursoActualizado;
    }
    
    res.send(JSON.stringify(programacion));
});

//DELETE

routerProgramacion.delete('/:id',(req, res) => {
    const id = req.params.id;
    const indice  = programacion.findIndex(curso => curso.id == id);
    if(indice >= 0){
        programacion.splice(indice, 1)
    }
    res.send(JSON.stringify(programacion));
})
