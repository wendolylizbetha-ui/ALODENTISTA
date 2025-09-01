// EFECTO SCROLL
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {threshold:0.2, rootMargin:"0px 0px -50px 0px"};
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
  entries.forEach(entry=>{
    if(!entry.isIntersecting){return;}
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader=>{appearOnScroll.observe(fader);});

// FORMULARIO CITAS
function agendarCita(){
  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const telefono = document.getElementById('telefono').value;
  const fecha = document.getElementById('fecha').value;
  if(!nombre || !correo || !telefono || !fecha){
    alert("Por favor completa todos los campos requeridos.");
    return;
  }

  // Guardar en Firebase
  fetch('https://odontoalo-525d4-default-rtdb.firebaseio.com/citas.json', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({nombre, correo, telefono, fecha})
  }).then(()=>{mostrarAlerta(); limpiarFormulario();})
  .catch(err=>alert("Error al enviar cita: "+err));
}

function mostrarAlerta(){
  const alerta = document.getElementById('alerta');
  alerta.style.display = 'block';
  setTimeout(()=>{alerta.style.display='none';}, 4000);
}

function limpiarFormulario(){
  document.getElementById('nombre').value='';
  document.getElementById('correo').value='';
  document.getElementById('telefono').value='';
  document.getElementById('fecha').value='';
  document.getElementById('mensaje').value='';
}
