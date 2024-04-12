const fs = require('fs').promises;

class ProductManager{

    constructor(path){
        this.path = path
    }


    async newFile(){
        try {
           return await fs.writeFile(`${this.path}`,'');
        } catch (error) {
            console.log("Error al crerar el archivo :", error)
        }
    }

    async getProducts(){
        try {
            const data = await fs.readFile(this.path, { encoding: 'utf8' });

             if (!data || data.trim() === "") {
                return [];
            } else {
                return JSON.parse(data);
            } 
            
        } catch (error) {
             console.error('Error al leer el archivo:');
        }
    }



    async addProduct(productos){
        try {
            const listaProductos = await this.getProducts();
            const newId = listaProductos.length + 1;
            const newProduct = {...productos, id:newId}
            listaProductos.push(newProduct) 
            await fs.writeFile(this.path, JSON.stringify(listaProductos, null, 2))  
        } catch (error) {
            console.log("Error al guardar el producto en el acrhivo")
        }
    }


    async getProductById(idProducto){
        try {
            const listaProductos = await this.getProducts();
            const productoEncontrado = listaProductos.find((producto) => producto.id = idProducto);
            console.log("Producto con ID " ,idProducto, " encontrado: ", productoEncontrado)

        } catch (error) {
            console.error(`No existe producto con id: ${idProducto}`)
        }
    }

    
    async updateProduct(idProducto){
        try {
            const listaProductos = await this.getProducts();
            const productoModificar =  listaProductos.find(producto => producto.id === idProducto);
            productoModificar.price = 900;
            productoModificar.stock = 18;
            await fs.writeFile(this.path, JSON.stringify(listaProductos, null, 2))  
            console.log("Producto modificado")
        } catch (error) {
            console.log("El producto que quieres modificar no existe en la lista")
        }
    }


    async deleteProduct(idProducto){
        try {
            const lista_productos = await this.getProducts();
            const nuevaListaProductos = [];
            lista_productos.find((producto) => {
                if(producto.id != idProducto){
                    nuevaListaProductos.push(producto)
                }
            })
            await fs.writeFile(this.path, JSON.stringify(nuevaListaProductos, null, 2))  
            console.log("Producto eliminado correctamente")
    
        } catch (error) {
            console.log("Error al eliminar el producto")
        }
    }

}

module.exports = ProductManager