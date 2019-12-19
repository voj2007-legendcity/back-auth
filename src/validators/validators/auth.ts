import { IUser } from "../../models/user";
import { crateValidator } from "../validator";
import loginSchema from '../schemas/auth/login.json';

export const login = crateValidator<IUser>(loginSchema);
