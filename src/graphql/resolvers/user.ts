import { Request } from 'express';
import bcrypt from 'bcryptjs';
import i18n  from 'i18n';
// errors
import { ErrorHelper } from '../../helpers/errorHelper';
// model
import { IUser, User, InputCreate, InputUpdate, InputUpdatePassword, InputID, InputFetch } from '../../models/user';
// validator
import { createUser, updateUser, updateUserPassword, deleteUser, readUser } from "../../validators/validators/user";

const ITEMS_PER_PAGE = 10;

export default {
  createUser: async ({ input }: InputCreate): Promise<IUser> => {
    try{
      if(!createUser.isValid(input)) {
        const errors = createUser.getErrors();
        throw new ErrorHelper(i18n.__('ERROR_422'), 422, [{ message: i18n.__(errors![0].message!), field: errors![0].dataPath.split('/').join('') }]);
      }

      if(await User.findOne({ email: input.email })){
        throw new ErrorHelper(i18n.__('ERROR_422'), 422, [{ message: i18n.__('USER_ALREADY_EXISTS'), field: 'email' }]);
      }

      const hashedPw: string = await bcrypt.hash(input.password, 12);
      const user: IUser = new User({
        name: null,
        email: input.email,
        role: 'ROLE_USER',
        status: 0,
        password: hashedPw
      });
      const createdUser: IUser = await user.save();
      return { ...<PromiseLike<IUser>>createdUser._doc, _id: createdUser.id, password: null };
    }catch(err){
      throw err;
    }
  },

  updateUser: async ({ input }: InputUpdate): Promise<IUser> => {
    try{
      if(!updateUser.isValid(input)) {
        const errors = updateUser.getErrors();
        throw new ErrorHelper(i18n.__('ERROR_400'), 400, [{ message: i18n.__(errors![0].message!), field: errors![0].dataPath.split('/').join('') }]);
      }

      const user: IUser = <IUser>await User.findById(input._id);

      if(!user){
        throw new ErrorHelper(i18n.__('ERROR_400'), 400, [{ message: i18n.__('USER_DOES_NOT_EXISTS') }]);
      }

      user.name = input.name;
      user.role = input.role;
      user.status = input.status;
  
      const updatedUser: IUser = await user.save();
      return { ...<PromiseLike<IUser>>updatedUser._doc };
    }catch(err){
      throw err;
    }
  },

  updatePasswordUser: async ({ input }: InputUpdatePassword): Promise<IUser> => {
    try{
      if(!updateUserPassword.isValid(input)) {
        const errors = updateUserPassword.getErrors();
        throw new ErrorHelper(i18n.__('ERROR_400'), 400, [{ message: i18n.__(errors![0].message!), field: errors![0].dataPath.split('/').join('') }]);
      }

      const user: IUser = <IUser>await User.findById(input._id);
      
      if(!user){
        throw new ErrorHelper(i18n.__('ERROR_400'), 400, [{ message: i18n.__('USER_DOES_NOT_EXISTS') }]);
      }else{
        const isEqual = await bcrypt.compare(input.password, user.password);

        if (!isEqual) {
          throw new ErrorHelper(i18n.__('ERROR_400'), 400, [{ message: i18n.__('PASSWORD_IS_NOT_EQUALS'), field: 'password' }]);
        }
      }

      const hashedPw: string = await bcrypt.hash(input.newPassword, 12);
      user.password = hashedPw;
  
      const updatedUser: IUser = await user.save();
      return { ...<PromiseLike<IUser>>updatedUser._doc };
    }catch(err){
      throw err;
    }
  },

  deleteUser: async ({ input }: InputID): Promise<boolean> => {
    try{
      if(!deleteUser.isValid(input)) {
        const errors = deleteUser.getErrors();
        throw new ErrorHelper(i18n.__('ERROR_400'), 400, [{ message: i18n.__(errors![0].message!), field: errors![0].dataPath.split('/').join('') }]);
      }

      const user: IUser = <IUser>await User.findById(input._id);
      
      if(!user){
        throw new ErrorHelper(i18n.__('ERROR_400'), 422, [{ message: i18n.__('USER_IS_INVALID') }]);
      }

      await User.deleteOne({ _id: user._id });
      return true;
    }catch(err){
      throw err;
    }
  },

  readUser: async ({ input }: InputID, req: Request): Promise<IUser> => {
    try{
      if(!readUser.isValid(input)) {
        const errors = readUser.getErrors();
        throw new ErrorHelper(i18n.__('ERROR_400'), 400, [{ message: i18n.__(errors![0].message!), field: errors![0].dataPath.split('/').join('') }]);
      }

      const user: IUser = <IUser>await User.findById(input._id);
      
      if(!user){
        throw new ErrorHelper(i18n.__('ERROR_400'), 422, [{ message: i18n.__('USER_IS_INVALID') }]);
      }

      return { ...<PromiseLike<IUser>>user._doc, password: null };
    }catch(err){
      throw err;
    }

  },

  fetchUsers: async ({ input }: InputFetch): Promise<IUser[]> => {
    try{
      const users: IUser[] = <IUser[]>await User.find(input.condition).limit(ITEMS_PER_PAGE).sort({ createdAt: -1 });
      return users.map((user: IUser): IUser => {
        return { ...<any>user._doc, password: null };
      });
    }catch(err){
      throw err;
    }
  }

}