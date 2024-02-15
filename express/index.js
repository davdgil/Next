/* 0 Inicializar */
const express = require('express');
const app = express();

//Simulamos una base de datos con el archivo de cursos.js anterior.
const { infoCursos } = require('./datos/cursos.js');

//Cargamos el fichero process.env
require('dotenv').config();

/* 6 Routers  (los llevaremos a otro fichero los express.Router()) */
//const routerProgramacion = express.Router();
const routerProgramacion = require('./routers/programacion.js');
app.use('/api/cursos/programacion', routerProgramacion); //El Router irá expandiendo esta base inicial

//const routerMatematicas = express.Router();
const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas', routerMatematicas);



/* 2 Routing */
app.get('/', (req, res) => {
  res.send('Bienvenido a la clase de Express')
});

app.get('/api/cursos', (req, res) => {
  //res.send(infoCursos); // envía el objeto
  res.send(JSON.stringify(infoCursos)); // envía texto
});

/* Programación (los llevamos a Routers)

//app.get('/api/cursos/programacion', (req, res) => {
routerProgramacion.get('/', (req, res) => {
  res.send(JSON.stringify(infoCursos.programacion));
});

// 3 Parámetros 
//De ruta, no es escalable si tuviésemos muchos cursos
//app.get('api/cursos/programacion/python', (req, res) => { });
//De url, con los ":"
//app.get('/api/cursos/programacion/:lenguaje', (req, res) => {
routerProgramacion.get('/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const data = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);

  if(data.length === 0) {
    return res.status(404).send("No se encontró el curso " + lenguaje);
  }

  // 5 Parámetros query 
  //Ordenamos por el número de vistas, si no ponemos (a, b) se ordena alfabéticamente
  if (req.query.ordenar === 'vistas') {
    console.log("ordenando");
    res.send(JSON.stringify(data.sort((a, b) => b.vistas - a.vistas ))); //Orden DESC, si lo queremos ASC, sería (a.vistas, b.vistas)
  } else {
    res.send(JSON.stringify(data));
  }
});

// 4 Usamos más de un parámetro 
//app.get('/api/cursos/programacion/:lenguaje/:nivel', (req, res) => {
  routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const data = infoCursos.programacion.filter(curso => 
      curso.lenguaje ===  lenguaje && curso.nivel === nivel);
  
    if (data.length ===0) {
      return res.status(404).send("No se encontró el lenguaje ", + lenguaje + " de nivel " + nivel);
    }
    res.send(JSON.stringify(data));
  });
*/

/* Matemáticas (los llevamos a routers)
//app.get('/api/cursos/matematicas', (req, res) => {
routerMatematicas.get('/', (req, res) => {
    res.send(JSON.stringify(infoCursos.matematicas));
});

//app.get('/api/cursos/matematicas/:tema', (req, res) => {
routerMatematicas.get('/:tema', (req, res) => {
  const tema = req.params.tema;
  const data = infoCursos.matematicas.filter(curso => curso.tema === tema);

  if (data.length === 0) {
    return res.status(404).send("No se encontró el tema " + tema);
  }
  res.send(JSON.stringify(data));
});
*/

/* 1 Listening */
// Cuando estemos en producción (en la nube), el puerto se puede asignar de forma dinámica, por lo que probamos con process.env.PORT y si no, usamos el 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Servidor iniciado en el puerto', port);
});