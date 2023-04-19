import { useQuery } from '@apollo/react-hooks';
import { GET_CONTACTS } from '../../querys/contacts';

export const useGetContacts = (search) => {
  return useQuery(GET_CONTACTS, {
    variables: { search },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  });
};