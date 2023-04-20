import gql from "graphql-tag";

export const GET_CONTACTS = gql`
  query GET_CONTACTS($search: String, $limit: Float, $pages: Float) {
    getContacts(search: $search, limit: $limit, pages: $pages) {
      contacts {
        address
        countryCode
        createdAt
        email
        firstName
        id
        phone
        lastName
        updatedAt
      }
      totalContacts
    }
  }
`;
