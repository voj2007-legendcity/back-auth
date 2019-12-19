import { buildSchema } from 'graphql';

import UserSchema from './schemas/user';
import AuthSchema from './schemas/auth';

export default buildSchema(`
  ${UserSchema.types}
  ${AuthSchema.types}

  ${UserSchema.inputs}

  type RootQuery {
    ${UserSchema.query}
    ${AuthSchema.query}
  }

  type RootMutation {
    ${UserSchema.mutation}
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);