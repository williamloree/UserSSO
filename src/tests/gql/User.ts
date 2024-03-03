export const CreateUser = `mutation CreateUser($input: UserInput) {
    createUser(input: $input) {
      authToken
      createdAt
      email
      id
      updatedAt
    }
  }`;
