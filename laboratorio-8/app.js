require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const usersRouter = require('./routes/users');

const session = require('express-session')
const flash = require('connect-flash')

const app = express();

app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: false
}))

app.use(flash())

app.use((req, res, next) => {
  res.locals.flash = req.flash()
  next()
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected!'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.redirect('/users');
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
