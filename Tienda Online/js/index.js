const CAR_PRODUCTOS = "productos";

document.addEventListener("DOMContentLoaded", () => {

    loadProcuctsFromLocalStorage();
    loadProductsList();
    getProductsFromLocalStorage();
});



function loadProcuctsFromLocalStorage() {
    console.log("Cargando productos desde el localStorage");

}

async function loadProductsList() {
   
    
    const productos = await getProductsFromDB();

    let html = "";
    productos.forEach(producto => {
        html += `
        <div class="col-md-4 my-3">
            <div class="card shadow-sm">
                <img src="${producto.image}" alt="${producto.name}" class="card-img-top img-fluid" width="10px" alt="Product Image">
                <div class="card-body">
                    <h5 class="card-title">${producto.name}</h5>
                    <p class="card-text">$${producto.price}</p>
                    <p class="card-text">${producto.description}</p>
                    <p class="card-text">Categoría: ${producto.category}</p>
                    <p class="card-text">ID: ${producto.id}</p>
                    <button class="btn btn-primary add-to-cart" data-id=" ${producto.id}" data-name="${producto.name}" onClick="addProductToCart(${producto.id})"  data-price="${producto.price}">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
        `;
    });
    
    document.getElementById("product-list").innerHTML = html;

}

function getProductsFromDB() {

    const url = "dbProducts/dbProducts.js";

    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(result => { 
            return result;
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
    return null;
}

function addProductToCart(idProducto) {
    console.log("Agregando producto al carrito:", idProducto);
    let arrayProductsId = [];
    let localStorageProducts = localStorage.getItem(CAR_PRODUCTOS);
    if (localStorageProducts === null) {
        arrayProductsId.push(idProducto);
        localStorage.setItem(CAR_PRODUCTOS, arrayProductsId);   
    }else{
        let productId = localStorage.getItem(CAR_PRODUCTOS);
        if (productId.length > 0) {
            productId += "," + idProducto;
        }else{
            productId = idProducto;
        }
        localStorage.setItem(CAR_PRODUCTOS, productId);

    }
    getProductsFromLocalStorage();
}

async function getProductsFromLocalStorage() {
    const productos = await getProductsFromDB();

    let localStorageProducts = localStorage.getItem(CAR_PRODUCTOS);

    let html = "";

    if (!localStorageProducts) {
        html = `<p class="text-center">No hay productos en el carrito.</p>`;
    } else {
        let localStorageProductsSplit = localStorageProducts.split(",");
        const idProductoUnique = Array.from(new Set(localStorageProductsSplit)).map(Number);

        idProductoUnique.forEach(id => {
            const producto = productos.find(producto => producto.id === id);
            if (producto) {
                let count = countDuplicatesProducts(id, localStorageProductsSplit);
                html += `
                    <div class="card mb-2 shadow-sm">
                        <div class="row g-0 align-items-center">
                            <!-- Imagen del producto -->
                            <div class="col-3 col-sm-2 text-center">
                                <img src="${producto.image}" alt="${producto.name}" class="img-fluid p-2" style="max-height: 80px; object-fit: contain;">
                            </div>

                            <!-- Información del producto -->
                            <div class="col-9 col-sm-10">
                                <div class="card-body py-2">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h6 class="mb-1">${producto.name}</h6>
                                        <strong class="text-success">$${producto.price * count}</strong>
                                    </div>
                                    <p class="mb-1"><small class="text-muted">Cantidad: ${count}</small></p>

                                    <!-- Controles de cantidad -->
                                    <div class="btn-group btn-group-sm me-2" role="group" aria-label="Cantidad">
                                        <button class="btn btn-outline-secondary" onClick="addIncrementProduct(${producto.id})">+</button>
                                        <button class="btn btn-outline-secondary" onClick="decrementProduct(${producto.id})">-</button>
                                    </div>

                                    <!-- Botón eliminar -->
                                    <button class="btn btn-sm btn-danger cart-product-delete" 
                                            data-id="${producto.id}" 
                                            onClick="deleteProductFromCart(${producto.id})">
                                        Quitar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
    }

    const modalBody = document.getElementById("modal-body");
    if (modalBody) {
        modalBody.innerHTML = html;
    } else {
        console.error('No se encontró el elemento con ID "modal-body"');
    }
}


function countDuplicatesProducts(valor, products) {
    let counts = 0;
    products.forEach(id => {
        if (id == valor) {
            counts++;
        }
    });
    return counts;
}

function deleteProductFromCart(id) {
    console.log("Eliminando producto del carrito:", id);
    let localStorageProducts = localStorage.getItem(CAR_PRODUCTOS);
    if (localStorageProducts) {
        let productId = localStorageProducts.split(",");
        productId = productId.filter(product => product != id);
        localStorage.setItem(CAR_PRODUCTOS, productId);
    }
    getProductsFromLocalStorage();
}

function addIncrementProduct(id) {
    let localStorageProducts = localStorage.getItem(CAR_PRODUCTOS);
    if (localStorageProducts) {
        let productId = localStorageProducts.split(",");
        productId.push(id);
        localStorage.setItem(CAR_PRODUCTOS, productId);
    } else {
        localStorage.setItem(CAR_PRODUCTOS, id);
    }
    getProductsFromLocalStorage();
}

function decrementProduct(id) {
    let localStorageProducts = localStorage.getItem(CAR_PRODUCTOS);
    if (localStorageProducts) {
        let productIdArray = localStorageProducts.split(",");
        const index = productIdArray.indexOf(String(id));
        if (index !== -1) {
            productIdArray.splice(index, 1); // elimina una sola aparición
            localStorage.setItem(CAR_PRODUCTOS, productIdArray.join(","));
        }
    }
    getProductsFromLocalStorage();
}
