// Traer productos almacenados en el STORAGE
let elementosCarritos = JSON.parse(localStorage.getItem('listaArticulosSeleccionados'))


let carritoOk = document.getElementsByClassName('carrito')[0];

// Inyectar Productos almacenados
const mostrarProductos = () =>{
    elementosCarritos.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('divCarrito')
        div.innerHTML = `
        <tr>
            <td><img src="${producto.img}" alt="${producto.id}"></td>
            <td><span id="nombre">${producto.articulo}</span></td>
            <td><div id="precio">$${producto.precio}</div></td>
            <td><button class="remove-btn">X</button></td>
        </tr>
        `
        carritoOk.appendChild(div)
    
    
    
        const boton = div.getElementsByClassName('remove-btn')[0]
        boton.addEventListener('click', (e) => {
            Toastify({
                text: "Se elimino el producto",
                className: "info",
                style: {
                    background: 'black'
                }
            }).showToast();
            eliminarPorducto(producto)
            borrarDeLaVista(e)
            actualizarPrecio()
        })
    })
}
if(elementosCarritos == null || elementosCarritos.length == 0){
    const div = document.createElement('div')
        div.classList.add('divCarritoVacio')
        div.innerHTML = `
        <div>El carrito esta vacio.</div>
        `
        carritoOk.appendChild(div)
}else{
    mostrarProductos()
}


//F(x) eliminar productos
const eliminarPorducto = (prod) => {
    let index = elementosCarritos.indexOf(prod)
    elementosCarritos.splice(index,1)

    localStorage.setItem('listaArticulosSeleccionados', JSON.stringify(elementosCarritos));
    actualizarCarrito();
}

function borrarDeLaVista(e) {
    btn = e.target
    btn.parentElement.remove()
}




let precioTotal = document.getElementsByClassName('precioTotal')[0]
console.log(precioTotal);

const actualizarPrecio = () =>{
    let precioSumado = elementosCarritos.reduce((valorFinal,elem)=>{
        return valorFinal + elem.precio
    },0)
    precioTotal.innerHTML = precioSumado
}
actualizarPrecio()

//Boton Para Pagar
let btnPagar = document.querySelector('.pagar')
btnPagar.addEventListener('click', ()=>{
    numeroRandom = parseInt(Math.random() * pokemons.length)
    comentarioRandom = parseInt(Math.random() * comentario.length)
    obtenerPokemon()
    Swal.fire({
        icon: 'error',
        title: 'No se pudo realizar la compra',
        text:`¡Vuelva a intentarlo luego! \n
        De todos modos te regalaremos la funda del Pokemon que te toco ahora.`,
        confirmButtonColor: '#261514',
      })
})



//Pokemon

let numeroRandom = 0
let nombrePokemon = 0
let imgPokemon = 0



let pokemons = ['ditto','charizard','onix','pikachu','bulbasaur','charmander','squirtle','rattata','ekans','zubat','meowth','gyarados','dragonite','mewtwo','mew'];
let comentario = ['Gran Pokemon','Wow','Increible','De los Mejores'];



let contenedorPokemon = document.querySelector('#contendorPokemon')



const obtenerPokemon = ()=>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemons[numeroRandom]}`)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            console.log(resultado)
            nombrePokemon = resultado.name.toUpperCase()
            imgPokemon = resultado.sprites.front_default
            console.log(nombrePokemon)
            console.log(imgPokemon)
            for(let i = 0; i < 1; i++){
                const div = document.createElement('div')
                contenedorPokemon.innerHTML += `
                <div class="card mt-4" style="width: 18rem;">
                    <img src="${imgPokemon}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title d-flex justify-content-center">${nombrePokemon}</h5>
                        <p class="card-text d-flex justify-content-center">${comentario[comentarioRandom]}</p>
                    </div>
                </div>
                `
                contenedorPokemon.appendChild(div)
            }
        })
        .catch(error => console.log(error))
}