
let productos = [
    { id: 1, nombre: "Monstera", categoria: "exterior", stock: 5, precio: 13000, rutaImagen: "Monstera.png" },
    { id: 2, nombre: "Calathea", categoria: "exterior", stock: 7, precio: 15500, rutaImagen: "calathea.png" },
    { id: 3, nombre: "Limonero", categoria: "exterior", stock: 4, precio: 17800, rutaImagen: "limonero-1.png" },
    { id: 4, nombre: "Gomero", categoria: "exterior", stock: 9, precio: 11000, rutaImagen: "gomero.png" },
    { id: 5, nombre: "Zebrinha", categoria: "interior", stock: 4, precio: 7100, rutaImagen: "zebrinha.png" },
    {   id: 6, nombre: "Philodendron", categoria: "interior", stock: 7, precio: 850, rutaImagen: "Philodendron.png" },
]

let carrito = []

principal (productos)

function principal (productos){
    renderizarProductos(productos)
        let input = document.getElementById("input")
        input.addEventListener("input", filtrarTarjetas)
        let botonBuscador = document.getElementById("botonBuscador")
        botonBuscador.addEventListener("click", () => filtrarTarjetas(input))

        let botonComprar = document.getElementById("comprar")
        botonComprar.addEventListener("click", finalizarCompra)

        let botonVerOcultar = document.getElementById("verOcultarInfo")
        botonVerOcultar.addEventListener("click", VerOcultarProductosCarrito)
}

function VerOcultarProductosCarrito(e){
    let seccionVentas = document.getElementById("seccionVentas")
    let seccionCarrito = document.getElementById("seccionCarrito")

    seccionVentas.classList.toggle("oculta")
    seccionCarrito.classList.toggle("oculta")
    
    e.target.innerText = e.target.innerText === " Ver carrito" ? " Ver productos" : " Ver carrito" 
} 

function finalizarCompra(){
    alert("¡Gracias por comprar en Verdecora!")
localStorage.removeItem("carrito")
carrito = []
renderizarCarrito()
}

function renderizarProductos(productos){
    let contenedor = document.getElementById("productos")
        contenedor.innerHTML = ""
        productos.forEach(producto => {
            
                let tarjetaProd = document.createElement("div")
                tarjetaProd.className = "producto"

                tarjetaProd.innerHTML = `
                    <img src="./media/${producto.rutaImagen}" />
                    <h3>${producto.nombre}</h3>
                    <h4>${producto.precio}</h4>
                    <button id=${producto.id}>Agregar al carrito</button>
                `

                contenedor.append(tarjetaProd)
                let btnAgrCar = document.getElementById(producto.id)
                btnAgrCar.addEventListener("click", AgregarAlCarrito)
            })
}  
function AgregarAlCarrito(e){
    let idBotonProducto = Number(e.target.id)
    let productoBuscado = productos.find(producto => producto.id === idBotonProducto)
    let productoEnCarrito = carrito.find(producto => producto.id === idBotonProducto)

    if(productoBuscado.stock > 0) {
        productoBuscado.stock--
        if(productoEnCarrito){
            productoEnCarrito.unidades++
            productoEnCarrito.subtotal = productoEnCarrito.precioUnitario * productoEnCarrito.unidades
    } else {
        carrito.push({
            id: productoBuscado.id,
            precio: productoBuscado.precio,
            nombre: productoBuscado.nombre,
            precioUnitario: productoBuscado.precio,
            unidades: 1,
            subtotal: productoBuscado.precio
        })
    }
    renderizarCarrito()
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito()
} 
}

function modificarTotal(){
    let carrito = obtenerCarrito()
    let nodoTotal = document.getElementById("montoTotal")
    nodoTotal.innerText = carrito ? carrito.reduce((acum,prod) => acum + prod.subtotal, 0) : 0
}

function renderizarCarrito(){
    let carrito = obtenerCarrito()
    
    let contenedor = document.getElementById("carrito")
    contenedor.innerHTML = ""
    
    carrito.forEach(producto => {
        let item = document.createElement("tr")
        item.innerText = producto.nombre + " " + producto.precioUnitario + " " + producto.precio + " " + producto.unidades + " " + producto.subtotal
        item.innerHTML = ` 
        <td>${producto.nombre}</td>
        <td>${producto.precioUnitario}</td>
        <td>${producto.unidades}</td>
        <td>${producto.subtotal}</td>
        
        `
        contenedor.append(item)
    }) 
    modificarTotal()

} 


function filtrarTarjetas(){
    let productosFiltrados = productos.filter(producto => producto.nombre.includes(input.value))
    renderizarProductos(productosFiltrados)
}


function obtenerCarrito (){
    let carrito = []
    if (localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
    }
    return carrito
}

