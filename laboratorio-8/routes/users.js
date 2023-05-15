const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const SALT_WORK_FACTOR = 10; // limite de texto encriptado

const router = express.Router();

// estructura de la aplicacion en MongoDB 
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const Usuario = mongoose.model('Usuario', userSchema);

// reglas de validacion con express-validator
const validateForm = [
  body('name').notEmpty().withMessage('Nombre requerido'),
  body('email')
    .isEmail().withMessage('Dirección de correo electrónico no válida')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Contraseña requerida')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .isLength({ max: 20 }).withMessage('La contraseña no puede exceder los 20 caracteres')
    .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula')
    .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
    .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un dígito numérico')
    .matches(/[!@#$%^&*]/).withMessage('La contraseña debe contener al menos un carácter especial')
];

// Routers
router.get('/', async (req, res) => {
  const users = await Usuario.find();
  res.render('index', { users, errors: [] });
});

router.post('/', validateForm, async (req, res) => {
  // validacion de los datos ingresados
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    const users = await Usuario.find();
    return res.render('index', { users, errors: errors.array()})
  }
  
  // encriptacion de datos en post con bcrypt
  req.body.password = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);

  const newUser = new Usuario(req.body);
  
  try {
    await newUser.save();
    req.flash('success', 'Usuario creado correctamente')
  } catch (err) {
    req.flash('error', 'Error al crear el usuario')
  }
  
  res.redirect('/users');
});

router.get('/edit/:id', async (req, res) => {
  const user = await Usuario.findById(req.params.id);
  res.render('partials/edit', { user });
});

router.post('/update/:id', validateForm, async (req, res) => {
  // validacion de los datos ingresados
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const user = await Usuario.findById(req.params.id);
    console.log(errors.array())
    return res.render('partials/edit', { user, errors: errors.array()})
  }
  
  // encriptacion de datos en put con bcrypt
  req.body.password = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);

  try {
    await Usuario.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success', 'Usuario editado correctamente')
  } catch (err) {
    req.flash('error', 'Error al editar el usuario')
  }
  
  res.redirect('/users');
});

router.get('/delete/:id', async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.redirect('/users');
});

module.exports = router;