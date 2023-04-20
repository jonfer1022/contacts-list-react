import { useQuery } from '@apollo/react-hooks';
import { GET_CONTACTS } from '../../querys/contacts';

export const useGetContacts = (search, limit, pages) => {
  return useQuery(GET_CONTACTS, {
    variables: { search, limit, pages },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  });
};