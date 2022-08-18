// actualizar contador carrito
const actualizarCarrito = ()=>{
    let elementosCarritos = JSON.parse(localStorage.getItem('listaArticulosSeleccionados'));
    let contadorCarrito = document.getElementsByClassName('numero')[0];
    contadorCarrito.innerHTML = elementosCarritos.length
}

actualizarCarrito()