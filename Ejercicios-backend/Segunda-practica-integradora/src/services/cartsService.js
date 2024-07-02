
import dataCarts from '../persistence/cartsData.js'

async function getAllCartsService(){
      return  await dataCarts.getAllCartsData();
}

async function getCartIdService(idCart){
    return await dataCarts.getCartIdData(idCart);
}

async function newCartService(newCart){
    return dataCarts.newCartData(newCart);
}


async function newProductToCartService(idCart, idProduct){
    let cartSelect = await dataCarts.getCartIdData(idCart); //Guarda el carrito seleccionado con el id del parametro
    let listProducts = cartSelect.products; //Guarda la LISTA de productos que tiene el carrito
   /*  let productFromCart = listProducts.find(producto => producto.product == idProduct); */ //Guarda el producto seleccionado por el ID {idProducto, cantidad}

   const existeProduct = listProducts.findIndex(producto => producto.product.toString() === idProduct);

    console.log("Lista a correr", listProducts)

    if (existeProduct > -1) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        listProducts[existeProduct].quantity += 1;
    } else {
        // Si el producto no está en el carrito, agrégalo
        listProducts.push({ product: idProduct, quantity: 1 });
    }

    /* if(!productFromCart){ //Si el producto no existe, crea uno nuevo
        const newProduct = {
            product:idProduct,
            quantity:1
        };
        listProducts.push(newProduct)

    }else{ //Si ya existe el producto dentro del carrito, solo suma uno
        let quantityProduct  = parseInt(productFromCart.quantity) + 1; 
        productFromCart.quantity = quantityProduct ;
    }
 */
        console.log("Esto se enviara----", cartSelect)

        await dataCarts.newProductToCartData(cartSelect);
        return cartSelect
}

async function deletProdcutFromCartService(idCart, idProduct){
    let cartSelect = await dataCarts.getCartIdData(idCart);
    let listProducts = cartSelect.products;
    cartSelect.products = listProducts.filter(producto => producto.product != idProduct);
    await dataCarts.deletProdcutFromCartData(cartSelect);
    return cartSelect
}


async function deleteAllProductsFromCarService(idCart){
        let cartSelect = await dataCarts.getCartIdData(idCart);
        cartSelect.products = [];
        await dataCarts.getCartIdData(cartSelect);
        return cartSelect
}

export default{
    getAllCartsService,
    getCartIdService,
    newCartService,
    newProductToCartService,
    deletProdcutFromCartService,
    deleteAllProductsFromCarService
}