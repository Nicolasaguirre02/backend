export default class UserDTO{
    constructor(user){
        this.first_name= user.first_name;
        this.last_name = user.last_name;
        this.rol = user.rol;
        this.cart = user.cart;
    }
}