class Producto {
    constructor(id, nombre, precio, descripcionProducto, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcionProducto = descripcionProducto;
        this.cantidad = 1;
        this.img = img;
    }

    descripcionCarrito() {
        return `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${this.img}" class="img-fluid rounded-start" alt="${this.nombre}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${this.nombre}</h5>
                        <p class="card-text">Cantidad: ${this.cantidad}</p>
                        <p class="card-text">Precio: $${this.precio}</p>
                        <button class="btn btn-danger" id="ep-${this.id}">
                            <i class="fas fa-times"></i> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
    }

    descripcion_Producto() {
        return `
        <div class="card border-light" style="width: 18rem;">
            <img src="${this.img}" class="card-img-top" alt="${this.nombre}">
            <div class="card-body">
                <h5 class="card-title">${this.nombre}</h5>
                <p class="card-text">${this.descripcionProducto}</p>
                <p class="card-text">$${this.precio}</p>
                <button class="btn btn-primary" id="ap-${this.id}">Añadir al carrito</button>
            </div>
        </div>`;
    }
}

class CarritoCompraCADEP {
    constructor() {
        this.listaDeCompras = [];
    }

    agregar = (producto) => {
        const productoExistente = this.listaDeCompras.find(productoAumento => productoAumento.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            producto.cantidad = 1;
            this.listaDeCompras.push(producto);
        }
    }

    guardarEnStorage() {
        let listaDeComprasJSON = JSON.stringify(this.listaDeCompras);
        localStorage.setItem("listaCarrito", listaDeComprasJSON);
    }

    recuperarStorage() {
        let listaCarritoJSON = localStorage.getItem("listaCarrito");
        let listaCarritoJS = JSON.parse(listaCarritoJSON);
        let listaAux = [];
        if (listaCarritoJS) {
            listaCarritoJS.forEach(producto => {
                let nuevoProducto = new Producto(producto.id, producto.nombre, producto.precio, producto.descripcionProducto, producto.img);
                nuevoProducto.cantidad = producto.cantidad; 
                listaAux.push(nuevoProducto);
            });
            this.listaDeCompras = listaAux;
        }
    }

    calcularTotal() {
        let total = 0;
        this.listaDeCompras.forEach(producto => {
            total += producto.precio * producto.cantidad;
        });
        return total;
    }

    eliminar(productoEliminar){
        let indice = this.listaDeCompras.findIndex(producto => producto.id == productoEliminar.id)
        this.listaDeCompras.splice(indice,1)
    }

    mostrarEnCarrito() {
        let contenedor_carrito = document.getElementById("contenedor_carrito");
        contenedor_carrito.innerHTML = ""
        this.listaDeCompras.forEach(producto => {
            contenedor_carrito.innerHTML += producto.descripcionCarrito();
        })

        this.listaDeCompras.forEach(producto => {
            const btn_eliminar = document.getElementById(`ep-${producto.id}`)
            btn_eliminar.addEventListener("click", () => {
                this.eliminar(producto)
                this.guardarEnStorage()
                this.mostrarEnCarrito()
            })
        })
        let totalCarritoElement = document.getElementById("totalCarrito");
        totalCarritoElement.textContent = `$${this.calcularTotal()}`;
    
    }
}

class ProductController {
    constructor() {
        this.listaDeProducto = [];
    }

    agregar(producto) {
        this.listaDeProducto.push(producto);
    }

    updateProduct() {
        this.agregar(new Producto(1, "CAMISETA NEGRA ARBITRO ATHIX OFICIAL AFA 2022/23", 15490, "Camiseta de Arbitro", "https://d2r9epyceweg5n.cloudfront.net/stores/002/419/855/products/athix-celeste-indu1-a1517af40a048358a216633833408583-480-0.jpg"));
        this.agregar(new Producto(2, "MEDIAS ATHIX OFICIAL", 3490, "Medias de Arbitro", "https://d2r9epyceweg5n.cloudfront.net/stores/002/419/855/products/medias-negras-athix1-5a533c243a851eac8016635264960961-320-0.jpg"));
        this.agregar(new Producto(3, "SHORT ATHIX OFICIAL AFA 2022/23", 12490, "Short de Arbitro", "https://d2r9epyceweg5n.cloudfront.net/stores/002/419/855/products/short-athix-11-178f425e55342724c416635261647716-320-0.jpg"));
    }

    mostrar() {
        let contenedor_productos = document.getElementById("contenedor_productos");
        this.listaDeProducto.forEach(producto => {
            contenedor_productos.innerHTML += producto.descripcion_Producto();
        });

        this.listaDeProducto.forEach(producto => {
            const btn_ap = document.getElementById(`ap-${producto.id}`);

            btn_ap.addEventListener("click", () => {
                carrito.agregar(producto);
                carrito.guardarEnStorage();
                carrito.mostrarEnCarrito();
            });
        });
    }
}

const carrito = new CarritoCompraCADEP();
carrito.recuperarStorage(); 
carrito.mostrarEnCarrito();

const cp = new ProductController();
cp.updateProduct();
cp.mostrar();