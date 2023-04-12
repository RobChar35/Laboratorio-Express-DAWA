const http = require('http')
const fs = require('fs');

/* let respeta el scope del archivo actual, mientras que var no.  
   Por lo que se usaria en cualquier parte del programa. 
*/

var parametros = []
var valores = []

http.createServer((req, res) => {
    fs.readFile('./views/index.html', (err, html) => {
        var html_string = html.toString()

        if (req.url.indexOf('?') > 0) {
            var url_data = req.url.split('?')
            arreglo_parametros = url_data[1].split('&')
        }

        for (let i=0; i < arreglo_parametros.length; i++) {
            var parametro = arreglo_parametros[i]
            var param_data = parametro.split('=')
            
            parametros[i] = param_data[0]
            valores[i] = param_data[1]
        }

        for (let i=0; i < parametros.length; i++) {
            html_string = html_string.replace('{'+ parametros[i] +'}', valores[i])
        }

        res.writeHead(200, {'Content-type':'text/html'})
        res.write(html_string)
        res.end()
    })
}).listen(8080)