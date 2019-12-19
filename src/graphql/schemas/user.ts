export default {
  inputs: `
    input UserInputCreate {
      email: String!
      password: String!
    }

    input UserInputUpdate {
      _id: ID!
      name: String!
      role: String!
      status: String!
    }

    input UserInputUpdatePassword {
      _id: ID!
      password: String!
      newPassword: String!
    }

    input UserInputID {
      _id: ID!
    }

    input UserInputFetch {
      condition: String
    }
  `,
  types: `
    type User {
      _id: ID!
      name: String
      email: String!
      role: String!
      password: String
      status: String
      resetToken: String
      resetTokenExpiration: String
    }
  `,
  query: `
    readUser(input: UserInputID): User!
    fetchUsers(input: UserInputFetch): [User]!
  `,
  mutation: `
    createUser(input: UserInputCreate): User!
    updateUser(input: UserInputUpdate): User!
    updatePasswordUser(input: UserInputUpdatePassword): User!
    deleteUser(input: UserInputID): Boolean!
  `
};