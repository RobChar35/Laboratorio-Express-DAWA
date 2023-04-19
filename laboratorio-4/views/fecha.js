const date = new Date();

const fecha = document.getElementById('fecha')

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const dia = urlParams.get('dia')
const mes = urlParams.get('mes')
const anio = urlParams.get('anio')

const objetivo = new Date(anio, mes - 1, dia);

const diferencia = objetivo.getTime() - date.getTime();

const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

contendorHora.innerHTML = 
` 
    Faltan ${dias} días para el ${dia}/${mes}/${anio}
`