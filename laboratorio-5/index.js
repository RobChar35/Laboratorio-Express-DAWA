// Importar las dependencias
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path')

// Rutas de la aplicacion
const indexRouter = require('./routes/route') 

// express-session
const session = require('express-session')

// Middleware de express para socket.io
const sharedsession = require("express-socket.io-session");

// Configurar el middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

const sessionMiddleware = session({
    secret: 'key',
    resave: false,
    saveUninitialized: true
});

app.use(sessionMiddleware) // Se puede crear una variable que contiene los datos del middleware para usarlo dentro de "app.use()"

// Configuraciones para el view engine
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Usando "ejs" como view engine
app.set('view engine', 'ejs')

// Ruta para agregar el nombre de usuario y foto de perfil
app.use('/', indexRouter)   


// Ruta para el funcionamiento del chat
app.use('/chat', indexRouter)

// Mediante nuestro socket, podemos usar nuestra sesion para que los datos se guarden y puedan ser utilizados
io.use(sharedsession(sessionMiddleware, {
    autoSave: true
}))

// Escuchar la conexión de Socket.IO
io.on('connection', function(socket){
    console.log('Usuario conectado');
    
    // Escuchar el evento 'chat message 1' para el chat 1
    socket.on('chat message 1', function(msg){
        /* 
            "handshake" es un objeto que contiene los datos del usuario y el servidor 
            al inicio de una conexion WebSocket. El handshake es una negociación inicial 
            que se utiliza para establecer la conexión y las opciones de comunicación.
            Esto solo funciona con el modulo "express-socket.io-session".
        */
        
        console.log('Mensaje del usuario ' + socket.handshake.session.username1 + ': ' + msg); 
        
        io.emit('chat message 1', msg);
    });
    
    // Escuchar el evento 'chat message 2' para el chat 2
    socket.on('chat message 2', function(msg){
        console.log('Mensaje del usuario ' + socket.handshake.session.username2 + ': ' + msg);
        io.emit('chat message 2', msg);
    });
    
    // Escuchar la desconexión del usuario
    socket.on('disconnect', function(){
        console.log('Usuario desconectado');
    });
});

// Iniciar el servidor HTTP en el puerto 3000
http.listen(3000, function(){
    console.log('Servidor escuchando en http://localhost:3000');
});