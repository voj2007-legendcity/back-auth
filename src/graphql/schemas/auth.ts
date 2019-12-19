export default {
  types: `
    type Auth {
      email: String
      userId: ID!
      token: String!
      tokenExpiration: Int!
    }
  `,
  query: `
    login(email: String!, password: String!): Auth!
  `
}