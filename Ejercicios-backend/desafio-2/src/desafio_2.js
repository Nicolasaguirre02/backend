class ProdcutManage{
    constructor(){
        this.lista = []
    }

    
    getProducts(){
        return this.lista
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const id = this.lista.length;
        const repetido = this.lista.some(prod => prod.code === code );
        if(repetido){
            console.log("Codigo repetido")
            return
        }else{
            const nuevoProducto = {
                id:id,
                title:title,
                description:description,
                price:price,
                thumbnail:thumbnail,
                code:code,
                stock:stock
            }

            this.lista.push(nuevoProducto);
            console.log("Producto agregado correctamente")
        }
    }


    getProductById(id){
        const productoById = this.lista.find((prod) => prod.id === id);
        if(productoById) {
            console.log("Este es el producto por id: ", productoById);
            return productoById;
        }else{
            console.log(`No se encontro producto con id ${id} ` )
        }
    }


    updateProduct(){
        const product_update = this.getProductById(1);
        if(product_update){
            product_update.price = 400;
            product_update.stock=16
        }
    }

    deleteProduct(){
        const product_delte = this.getProductById(0);
        const new_list_product = []
        
        this.lista.find((product) => {
            if(product_delte.id != product.id){
                new_list_product.push(product);
            }
        })
        this.lista = new_list_product
    }
}

const producto = new ProdcutManage;
console.log("Lista vacia de productos", producto.getProducts())
producto.addProduct("producto prueba1", "este es un producto prueba", 200, "sin imagen", "abc123", 25);
producto.addProduct("producto prueba2", "este es un producto prueba", 200, "sin imagen", "abc133", 25);
producto.addProduct("producto prueba3", "este es un producto prueba", 200, "sin imagen", "abc113", 25);
producto.addProduct("producto prueba4", "este es un producto prueba", 200, "sin imagen", "abc12s33", 25);
producto.getProductById(3);
/* producto.updateProduct() */
producto.deleteProduct()
console.log("Lista de productos, con un producto eliminado",producto.getProducts()) 
