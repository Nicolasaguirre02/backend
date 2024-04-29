const socket = io();

const total_productos = document.getElementById("total_productos");
let contenedor_listado = document.getElementById('contenedor_listado');

socket.on('listProducts', date => {
    contenedor_listado.innerHTML = "";
    const products = date
    total_productos.innerHTML = `Total productos ${products.length}`

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('card', 'border-primary', 'mb-3');
        productDiv.style.maxWidth = '18rem';

        const productContent = `
            <div class="card-header">${product.title}</div>
            <div class="card-body text-primary">
                <h5 class="card-title">${product.description}</h5>
                <p class="card-text">Price: ${product.price}</p>
                <p class="card-text">Stock: ${product.stock}</p>
                <div class="col-3" style="margin-top: 20px;">
                <button id="eliminarProduct" value=${product.id} class="btn btn-warning">Eliminar</button>
                </div>
            </div>
        `;

        productDiv.innerHTML = productContent;

        contenedor_listado.appendChild(productDiv);


        //Eliminar producto
        productDiv.querySelector('#eliminarProduct').addEventListener('click', () => {
            const productId = product.id;

            socket.emit('eliminarProduct', productId);
        });
    });
})

document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const formData = new FormData(this);
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;

    const newProduct = {
        title:title,
        description:description,
        price:price,
        thumbnail:thumbnail,
        code:code,
        stock:stock
    }
    socket.emit('newProduct', newProduct)
});


 