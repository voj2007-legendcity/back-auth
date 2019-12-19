import graphqlHttp from 'express-graphql';
import { GraphQLError } from 'graphql';
// graphql
import graphqlSchema from '../graphql/schema';
import graphqlResolver from '../graphql/resolver';
// error
import { ErrorHelper } from '../helpers/errorHelper';

export default graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: process.env.NODE_ENV === 'dev',
  customFormatErrorFn: (err: GraphQLError) => {
    if (!err.originalError) {
      return err;
    }

    const error: ErrorHelper = new GraphQLError(err.message || 'An error occurred.');
    error.code = (err.originalError as ErrorHelper).code || 500;
    error.data = (err.originalError as ErrorHelper).data;
    return error;
  }
});