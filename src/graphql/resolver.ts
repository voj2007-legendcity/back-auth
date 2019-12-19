import userResolver from './resolvers/user';
import authResolver from './resolvers/auth';

const resolver = {
  ...userResolver,
  ...authResolver
};
export default resolver;