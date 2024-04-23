const fs = require('fs').promises;

class Cart{
    constructor(){
        this.path = "carrito.json";
    }

    async getCarts() {
        try {
            const data = await fs.readFile(this.path, {encoding: 'utf8'});

            if(!data || data.trim() === ""){
                return
            }
            else{
                return JSON.parse(data)
            }
        } catch (error) {
            console.log("Error al leer el arc")
        }
    }


    async addCart(cart) {
        try {
            const listaCarts = await this.getCarts();
            const newId = listaCarts.length + 1;
            const newCart = {id:newId, ...cart};
            listaCarts.push(newCart);
            await fs.writeFile(this.path, JSON.stringify(listaCarts, null, 2))  
        } catch (error) {
            console.log("Error al guardar un nuevo carrito")
        }
    }


    async getCartById(idCart){
        try {
            const listCarts = await this.getCarts();
            const cart = listCarts.find( carts => carts.id == idCart );

            if(cart){
                return cart
            }
        } catch (error) {
            console.log("No existe un carrito con ese ID")
        }
    }


    /* Agrega un nuevo producto a la lista del carrito */
    async addToListProducts(idCart, idProducto){
        try {
            const listCarts = await this.getCarts();
            const carritoAgregar = listCarts.filter(list => list.id != idCart);// En esta lista se guardan todos los carritos menos el seleccionado por el id, para al final sumarlo con los existentes
            
            const cartSelect = await this.getCartById(idCart); //Guarda el carrito seleccionado con el id del parametro
            let listProducts = cartSelect.products; //Guarda la LISTA de productos que tiene el carrito
            let productFromCart = listProducts.find(producto => producto.product == idProducto); //Guarda el producto seleccionado por el ID {idProducto, cantidad}

            if(!productFromCart){ //Si el producto no existe, crea uno nuevo
                const newProduct = {
                    product:idProducto,
                    quantity:1
                };
                listProducts.push(newProduct)

            }else{ //Si ya existe el producto dentro del carrito, solo suma uno
                let quantityProduct  = parseInt(productFromCart.quantity) + 1; 
                productFromCart.quantity = quantityProduct ;
            }

            carritoAgregar.push(cartSelect);
            await fs.writeFile(this.path, JSON.stringify(carritoAgregar, null, 2))  
           
        } catch (error) {
            console.log("Error al guardar el producto")
        }
    }


  
 
}

module.exports = Cart;