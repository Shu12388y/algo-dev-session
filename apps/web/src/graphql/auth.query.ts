export const signup_mutation = `
mutation Auth($email: String!, $firstname: String!, $password: String!) {
  signup(
    email: $email
    firstname: $firstname
    password: $password
  ) {
    status
    message
    data
  }
}
`;

export const signin_mutation = `
mutation Auth($email: String!, $password: String!) {
  sigin(
    email: $email
    password: $password
  ) {
    status
    message
    data
  }
}
`;
