const ProdcutManage = require('./app.js');

const productos = new ProdcutManage('../','productos.json');

//Crear un nuevo archvio
async function crearNuevoArchvio(){
    await productos.crearArchivo()
}
/* crearNuevoArchvio(); */ //<--- ESTE METODO SOLO SE EJECUTA UNA VEZ YA QUE CREA EL ARCHIVO

//Agregfar un nuevo producto
async function crearNuevoProducto(title, description, price, thumbnail, code, stock){
    try {
        const listaProductos = await productos.getProducts();
        const id_generar = listaProductos.length
        const nuevoProducto = {
            id:id_generar + 1,
            title:title,
            description:description,
            price:price,
            thumbnail:thumbnail,
            code:code,
            stock:stock
        }
        listaProductos.push(nuevoProducto);

        productos.addProduct(listaProductos)

        console.log("Producto agregado correctamente"); 
        
    } catch (error) {
        console.log("Error al crear un nuevo producto")
    }
}
crearNuevoProducto("producto prueba1", "este es un producto prueba", 200, "sin imagen", "abc123", 25); 
crearNuevoProducto("producto prueba1", "este es un producto prueba", 200, "sin imagen", "abc123", 25); 



async function leerArchvioProductos(){
    try {
        const data = await productos.getProducts();
        console.log(data)
    } catch (error) {
        console.log("Error al leer el archivo productos.json")
    }
}
leerArchvioProductos(); 









//Buscar producto por ID
async function getProductById(id){
    try {
        const lista_productos = await productos.getProducts();
        const producto =  lista_productos.find(produc => produc.id == id);
        console.log("Este es el producto por ID: ",producto)
    } catch (error) {
        console.log("Error al buscar un producto por ID")
    }
}
/* getProductById(1); */





//Modificar producto por ID
async function updateProduct(id){
    try {
        const lista_productos = await productos.getProducts();
        const productoModificar =  lista_productos.find(produc => produc.id == id);
        productoModificar.price = 900;
        productoModificar.stock = 18;
        productos.addProduct(lista_productos);
        console.log("Producto modificado correctamente")
    } catch (error) {
        console.log("Error al modificar producto")
    }
}
/* updateProduct(2); */




//Eliminar producto por ID
async function deleteProduct(id){
    try {
        const lista_productos = await productos.getProducts();
        const nuevaListaProductos = [];
        lista_productos.find((produc) => {
            if(produc.id != id){
                nuevaListaProductos.push(produc)
            }
        })
        productos.addProduct(nuevaListaProductos)
        console.log("Producto eliminado correctamente")

    } catch (error) {
        console.log("Error al eliminar el producto")
    }
}
/* deleteProduct(id); */