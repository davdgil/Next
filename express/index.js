const express = require('express');
const app = express();

// Simulamos una base de datos con el archivo de cursos.js anterior
const { infoCursos } = require('./cursos.js');

// Cargar variables de entorno
require('dotenv').config();

// Routing
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Escuchar en el puerto definido por la variable de entorno PORT o en el puerto 3000 por defecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor iniciado en el puerto', port);
});
