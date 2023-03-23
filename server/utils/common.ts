import * as  bcrypt from 'bcryptjs'
import { createUser, getUser } from '../query/user.query';
import { superAdminPaylod } from '../utils/constant';

// method to register user
export const createAdmin =  async () => {
    let exist = await getUser({email: superAdminPaylod.email});
      if (exist) {
         console.log('Admin Already Created !!!')
         return
      }
    var encryptedPassword = bcrypt.hashSync(superAdminPaylod.password, 8);
    let user = {
        firstName: superAdminPaylod.firstName,
        lastName: superAdminPaylod.lastName,
        email: superAdminPaylod.email,
        password: encryptedPassword,
        phoneNumber: superAdminPaylod.phoneNumber,
        gender: superAdminPaylod.gender,
        role: superAdminPaylod.role
    }
    await createUser(user);
    console.log('Admin Created  Successfully!!!')
}

