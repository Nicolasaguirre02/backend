const ProdcutManage = require('./app.js');

const productos = new ProdcutManage('./productos.json');

//Crear un nuevo archivo
async function createFile(){
    await productos.newFile()
}
createFile();    //<--- ESTE METODO SOLO SE EJECUTA UNA VEZ YA QUE CREA EL ARCHIVO


//Agregar un nuevo producto
productos.addProduct({
    title:"Producto prueba",
    description:"probando",
    price:"400",
    thumbnail:"thumbnail.com",
    code:"A12v",
    stock:45
})   


//Listar los productos
async function readFileProducts(){
    try {
        const data = await productos.getProducts();
        console.log("Listado de productos: ",data)
    } catch (error) {
        console.log("Error al leer el archivo productos.json")
    }
}
readFileProducts();



//Buscar producto por ID
productos.getProductById(4)  


//Modificar producto por ID
/* productos.updateProduct(1);   */
 

//Eliminar producto por ID
/*  productos.deleteProduct(2);   */