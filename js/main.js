//Mensaje de bienvenida
let persona;
let personaStorage = sessionStorage.getItem("Nombre");

if(personaStorage){
  let persona = personaStorage;
  let bienvenida = `Bienvenido ${persona} a Pepe Markets`;
  alert(bienvenida);
}else{
  persona= prompt("Ingrese su nombre");
  sessionStorage.setItem("Nombre", persona);
  alert(`Bienvenido ${persona} a Pepe Markets`);
}