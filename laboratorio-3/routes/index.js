var express = require('express');
var router = express.Router();

// GET pagina principal
router.get('/', function(req, res) {
  req.session.matricula = {}

  res.render('index', { title: 'Principal' });
});

// POST cursos
router.post('/postcursos', (req, res) => {
  var curso = req.body.curso
  var precio

  switch (curso) {
    case 'java':
      precio = 1200
      break;
    
    case 'php':
      precio = 800
      break;

    case 'dotnet':
      precio = 1500
      break;

    default:
      precio = 0
  }

  req.session.matricula.curso = curso;
  req.session.matricula.precio = precio;
  req.session.matricula.modulos = [];

  res.render('modulos', {
    title: 'Nivel de modulo',
    curso: curso,
    precio: precio,
    modulos: ['Basico', 'Intermedio', 'Avanzado']
  })
})

// POST metodo de pago
router.post('/postpago', (req, res) => {
  var modulos = req.body.modulos;

  var pago = req.body.pago;

  req.session.matricula.modulos = modulos;

  req.session.matricula.pago = pago

  res.render('pago', {
    title: 'Tipo de pago',
    curso: req.session.matricula.curso,
    pago: pago,
    modulos: modulos,
    precio: req.session.matricula.precio
  });
})

// POST total
router.post('/posttotal', (req, res) => {
  var matricula = req.session.matricula;

  var modulos = req.session.matricula.modulos;

  var precio;

  if (matricula.curso === 'java') {
    precio = 1200;
  } else if (matricula.curso === 'php') {
    precio = 800;
  } else {
    precio = 1500;
  }

  console.log("Matricula:", matricula)

  var descuento = 0;
    
  var pago = req.body.pago;

  console.log(pago)

  if (pago === 'efectivo') {
    descuento = precio * 0.1;
  }

  var total = precio - descuento;

  console.log(total)

  res.render('total', {
    title: 'Detalle de matrícula',
    curso: matricula.curso,
    modulos: modulos,
    precio: precio,
    descuento: descuento,
    total: total,
    pago: pago
  });
})

module.exports = router;
