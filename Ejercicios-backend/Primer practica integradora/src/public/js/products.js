
const botonesAgregarCarrito = document.querySelectorAll('.btn_agregarProduct');


async function agregarProducto(productId){
    let url = `http://localhost:8080/api/carts/664bd8469d45f413cf90f553/product/${productId}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key: 'value' })
        });

        if (response.ok) {
            alert("Producto agregado")
        }
        
    } catch (error) {
        alert("Error al agregar producto")

    }
}

botonesAgregarCarrito.forEach(boton => {
    boton.addEventListener('click', function() {
        const valorProducto = boton.value;
        console.log(valorProducto);
        agregarProducto(valorProducto)
    });
});