import userModel from "../dao/models/users.model.js";
import UserRepository from "../dao/repositories/Users.repositoy.js";

const userData = new UserRepository(userModel);


async function recoverPasswordService(email){
    //console.log("desde service", email)
    return await userData.recoverPasswordRepository(email);
}

async function getUserIdService(id){
    return await userData.getUserIDRepository(id)
}

async function putPasswordUserService(userID, user){
    return await userData.modifyUser(userID, user);
}

async function modifyRoleService(userId, user){
    return await userData.modifyUser(userId, user)
}


export default {
    recoverPasswordService,
    putPasswordUserService,
    modifyRoleService,
    getUserIdService
}