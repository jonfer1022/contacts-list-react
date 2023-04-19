import gql from "graphql-tag";

export const GET_CONTACTS = gql`
  query GET_CONTACTS($search: String) {
    getContacts(search: $search) {
      address
      countryCode
      createdAt
      email
      firstName
      id
      lastName
      phone
      updatedAt
    }
  }
`;
