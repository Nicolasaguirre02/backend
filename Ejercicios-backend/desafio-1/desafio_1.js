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
            console.log("Este es el producto por id: ", productoById)
        }else{
            console.log(`No se encontro producto con id ${id} ` )
        }
    }
}

const ver = new ProdcutManage;
console.log(ver.getProducts())
ver.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);
ver.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);
console.log(ver.getProducts());
ver.getProductById(1);