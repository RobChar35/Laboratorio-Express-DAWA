const express = require('express');
const app = express();

// Import para las rutas de la tarea (portfolio)
const portfolioRouter = require('./routes/route')

// Configurar el motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

// Aplicacion de la carpeta "public"
app.use(express.static('public'));

// Rutas para renderizar la tarea de la pagina para un portafolio
app.use('/', portfolioRouter)
app.use('/habilidades', portfolioRouter)
app.use('/contacto', portfolioRouter)

// Ruta para renderizar la plantilla Pug
app.get('/pug', (req, res) => {
  res.render('index', { nombre: 'Usuario Pug' });
});

app.get('/miplantilla-pug', (req, res) => {
  res.render('miplantilla', { mensaje: '¡Hola desde la plantilla Pug!' });
});

app.get('/perfil/:id', (req, res) => {
  const userId = req.params.id;
  // Aquí puedes buscar los datos del usuario en una base de datos, por ejemplo
  const user = { id: userId, nombre: 'Usuario ' + userId };
  res.render('perfil', { user: user });
});

// Configurar EJS como motor de plantillas para una ruta específica
app.engine('ejs', require('ejs').renderFile);

// Ruta para renderizar la plantilla EJS
app.get('/ejs', (req, res) => {
  res.render('index.ejs', { nombre: 'Usuario EJS' });
});

app.get('/miplantilla-ejs', (req, res) => {
  res.render('miplantilla.ejs', { mensaje: '¡Hola desde la plantilla EJS!' });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Aplicación web dinámica ejecutándose en el puerto 3000');
});
