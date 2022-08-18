//------ARRAY DE ARTICULOS
let stockCelulares = [
    {id: 'item1', tipo: 'celular', articulo: 'Iphone SE2', precio: 40000, img: '../assets/img/celulares/iphonese2.jpg'},
    {id: 'item2', tipo: 'celular', articulo: 'Iphone 11', precio: 45000, img: '../assets/img/celulares/iphone11.jpg'},
    {id: 'item3', tipo: 'celular', articulo: 'Iphone 12 Mini', precio: 50000, img: '../assets/img/celulares/iphone12mini.jpg'},
    {id: 'item4', tipo: 'celular', articulo: 'Iphone 12', precio: 55000, img: '../assets/img/celulares/iphone12.jpg'},
    {id: 'item5', tipo: 'celular', articulo: 'Iphone 13 Mini', precio: 60000, img: '../assets/img/celulares/iphone13mini.jpg'},
    {id: 'item6', tipo: 'celular', articulo: 'Iphone 13', precio:65000 , img: '../assets/img/celulares/iphone13.jpg'},
    {id: 'item7', tipo: 'celular', articulo: 'Iphone 13 Pro', precio: 70000, img: '../assets/img/celulares/iphone13pro.jpg'},
    {id: 'item8', tipo: 'celular', articulo: 'Iphone 13 ProMax', precio: 80000, img: '../assets/img/celulares/iphone13promax.jpg'},
    {id: 'item9', tipo: 'reloj', articulo: 'Apple Watch 3 38mm', precio: 20000, img: '../assets/img/relojes/watch3-38mm.jpg'},
    {id: 'item10', tipo: 'reloj', articulo: 'Apple Watch 3 42mm', precio: 25000, img: '../assets/img/relojes/watch3-42mm.jpg'},
    {id: 'item11', tipo: 'reloj', articulo: 'Apple Watch 6 40mm', precio: 30000, img: '../assets/img/relojes/watch6-40mm.jpg'},
    {id: 'item12', tipo: 'reloj', articulo: 'Apple Watch 6 44mm', precio: 35000, img: '../assets/img/relojes/watch6-44mm.jpg'},
    {id: 'item13', tipo: 'reloj', articulo: 'Apple Watch SE 40mm', precio: 40000, img: '../assets/img/relojes/watchSE-40mm.jpg'},
    {id: 'item14', tipo: 'reloj', articulo: 'Apple Watch SE 44mm', precio: 45000, img: '../assets/img/relojes/watchSE-44mm.jpg'},
    {id: 'item15', tipo: 'reloj', articulo: 'Apple Watch 7 41mm', precio: 50000, img: '../assets/img/relojes/watch7-41mm.jpg'},
    {id: 'item16', tipo: 'reloj', articulo: 'Apple Watch 7 45mm', precio: 55000, img: '../assets/img/relojes/watch7-45mm.jpg'},
] 

const contenedorCelulares = document.querySelector('.contCel')

//Inyectar Productos

const cargarProductos = (productos) => {
    //vacio vista
    while( contenedorCelulares.hasChildNodes() ){
        contenedorCelulares.removeChild(contenedorCelulares.lastChild);
    }
    //cargar vista
    productos.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('cardCel')
        div.innerHTML = `
        <div class="card-1 card ${producto.tipo}" id="${producto.id}">
            <img class="imgCel" src="${producto.img}" alt="${producto.articulo}">
            <h3>${producto.articulo}</h3>
            <span class="product-price">$${producto.precio}</span>
            <button class="add-to-cart" id="agregar-${producto.id}">Agregar al Carrito</button>
        </div>
        `
        contenedorCelulares.appendChild(div)
        const boton = div.getElementsByClassName('add-to-cart')[0]
        
        boton.addEventListener('click', ()=>{
            seleccionarArticulos(producto);
        })
    })
}

cargarProductos(stockCelulares)

//----GUARDAR ARCHIVOS EN STORAGE PARA DESPUES PODER AGREGARLOS AL CARRITO


const seleccionarArticulos = (prod) => {
    if(localStorage.getItem('listaArticulosSeleccionados') == null){
        const articulosSeleccionados = [];
        articulosSeleccionados.push(prod);
        localStorage.setItem('listaArticulosSeleccionados', JSON.stringify(articulosSeleccionados));
    }else{
        const listaNueva = JSON.parse(localStorage.getItem('listaArticulosSeleccionados'));
        listaNueva.push(prod);
        localStorage.setItem('listaArticulosSeleccionados', JSON.stringify(listaNueva));
    }
    Toastify({
        text: "El producto se agrego al carrito",
        className: "info",
        style: {
            background: 'black'
        }
    }).showToast();
    actualizarCarrito();
}

//----FILTRAR POR TIPO

let btnFiltroCelular = document.getElementById('celular')
let btnFiltroReloj = document.getElementById('reloj')
let btnTodo = document.getElementById('todo')

btnTodo.addEventListener('click', (e) => {
    cargarProductos(stockCelulares)
})

btnFiltroCelular.addEventListener('click',(e) => {
    let celularecitos = stockCelulares.filter(producto => producto.tipo == "celular")
    cargarProductos(celularecitos )
})
btnFiltroReloj.addEventListener('click',(e) => {
    let relojitos = stockCelulares.filter(producto => producto.tipo == "reloj")
    cargarProductos(relojitos )
})
