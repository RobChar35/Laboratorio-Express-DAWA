const contendorHora = document.getElementById('listaHora')

const date = new Date();
const hora = date.getHours();
const minutos = date.getMinutes();
const segundos = date.getSeconds();


let ampm = 'AM';
let formato12 = hora


if (hora >= 12) {
    ampm = 'PM';
  }
  
  if (hora > 12) {
    formato12 = hora - 12;
  }
  
  if (hora === 0) {
    formato12 = 12;
  }

contendorHora.innerHTML = 
` 
    <ul> 
        <li>Hora 24 horas: ${hora}:${minutos}:${segundos}</li>
        <li>Hora 12 horas: ${formato12}:${minutos}:${segundos}</li>
    </ul>
`