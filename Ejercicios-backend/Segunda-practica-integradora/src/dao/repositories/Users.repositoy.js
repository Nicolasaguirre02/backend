export default class UserRepository{
    constructor(model){
        this.model = model
    };

    async recoverPasswordRepository(mail){
       // console.log("Desde el reposi", await this.model.findOne(mail))
        return await this.model.findOne(mail); 
    }

    async getUserIDRepository(id) {
        return await this.model.findById(id);
    }


    async modifyUser(userID, user) {
        console.log("Desde el reposi", await this.model.updateOne({ _id: userID }, user))
        return await this.model.updateOne({ _id: userID }, user);
    }


    async ultimaConexionModel(user){
        user.last_connection = new Date();
        await user.save();
    }

}