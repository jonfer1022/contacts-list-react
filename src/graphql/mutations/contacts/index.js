import gql from 'graphql-tag';

export const ADD_NEW_CONTACT = gql`
  mutation ADD_NEW_CONTACT(
    $firstName: String!, 
    $lastName: String!,
    $countryCode: String!,
    $phone: String!,
    $address: String!,
    $email: String!,
  ) {
    createContact(contactInput: {
      firstName: $firstName, 
      lastName: $lastName,
      countryCode: $countryCode,
      phone: $phone,
      address: $address,
      email: $email,
    })
  }
`;

export const EDIT_CONTACT = gql`
  mutation EDIT_CONTACT(
    $firstName: String!, 
    $lastName: String!,
    $countryCode: String!,
    $phone: String!,
    $address: String!,
    $email: String!,
    $id: String!
  ) {
    editContact(contactInput: {
      firstName: $firstName, 
      lastName: $lastName,
      countryCode: $countryCode,
      phone: $phone,
      address: $address,
      email: $email,
      id: $id
    })
  }
`;

export const DELETE_CONTACT = gql`
  mutation DELETE_CONTACT($removeContactId: String!) {
    removeContact(id: $removeContactId)
  }
`;