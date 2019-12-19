import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import i18n  from 'i18n';
// errors
import { ErrorHelper } from '../../helpers/errorHelper';
// model
import { IAuth } from '../../models/auth'; 
import { User, IUser } from '../../models/user';
// validator
import { login } from "../../validators/validators/auth";

export default {
  login: async ({ email, password }: ({email: string, password: string})): Promise<IAuth> => {
    try{
      if(!login.isValid({ email, password })) {
        const errors = login.getErrors();
        throw new ErrorHelper(i18n.__('ERROR_422'), 422, [{ message: i18n.__(errors![0].message!), field: errors![0].dataPath.split('/').join('') }]);
      }

      const user: IUser = <IUser>await User.findOne({ email: email });

      if(!user){
        throw new ErrorHelper(i18n.__('ERROR_422'), 422, [{ message: i18n.__('USER_DOES_NOT_EXISTS'), field: 'email' }]);
      }

      const isEqual = await bcrypt.compare(password, user.password);

      if(!isEqual){
        throw new ErrorHelper(i18n.__('ERROR_422'), 422, [{ message: i18n.__('PASSWORD_IS_ICORRECT'), field: 'password' }]);
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        'testappsupersecretkey',
        { expiresIn: '1h' }
      );

      return { userId: user.id, token: token, tokenExpiration: 1, email: user.email };
    }catch(err){
      throw err;
    }
  }
}