var express = require('express')
var router = express.Router()

// Funcion para obtener imagen 
// var archivo = document.getElementById('imagen1').file[0]

// var lector = new FileReader();
// lector.readAsDataURL(archivo);

// lector.onloadend = function () {
//     let result = lector.result
//     console.log(result)
// }

router.get('/', function(req, res) {
    req.session.usuarios = {}

    res.render('index', { title: 'Ingreso de datos' })
});

router.post('/chat', function(req, res) {
    let firstUsername = req.body.username1
    let secondUsername = req.body.username2

    let firstUsernameImage = req.body.username1Profile
    let secondUsernameImage = req.body.username2Profile

    console.log(firstUsernameImage)
    console.log(secondUsernameImage)

    req.session.username1 = firstUsername
    req.session.username2 = secondUsername

    req.session.username1Profile = firstUsernameImage 
    req.session.username2Profile = secondUsernameImage  

    res.render('chat', { 
        title: 'Chat privado',
        username1: firstUsername,
        username1Profile: firstUsernameImage,
        username2Profile: secondUsernameImage,
        username2: secondUsername,
    });
});

module.exports = router