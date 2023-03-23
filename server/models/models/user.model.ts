
export interface IUser {
    _id?: String;
    firstName: String;
    lastName: String,
    email: String;
    password: String,
    phoneNumber: String,
    gender: String,
    role?: String,
    isActive?: Boolean;
}