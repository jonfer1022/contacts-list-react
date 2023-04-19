import { ApolloClient, InMemoryCache } from '@apollo/client';

// import { onError } from 'apollo-link-error';
// import { ApolloLink, from } from 'apollo-link';
// import { URL } from '../services/Utils/getUtils';
// import {
//   CONTEXT_CREATION_FAILED_TOKEN,
//   CONTEXT_CREATION_FAILED_DENIED,
//   JWT_EXPIRED
// } from '../services/Constants/getLabels';
// import { alertError } from '../utils/customSwal';
// import { routesPublic } from '../services/Constants/paths';

// const httpLink = new HttpLink({
//   uri: process.env.REACT_APP_URL
// });

// const afterWareLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     console.log("graphQLErrors ", graphQLErrors);
//     // graphQLErrors.forEach(error => {
//     //   switch (error.message) {
//     //     case CONTEXT_CREATION_FAILED_TOKEN:
//     //       // sessionStorage.removeItem('token');
//     //       localStorage.removeItem('token');
//     //       window.location.href = '403';
//     //       break;

//     //     case CONTEXT_CREATION_FAILED_DENIED:
//     //       // sessionStorage.removeItem('token');
//     //       localStorage.removeItem('token');
//     //       window.location.href = '403';
//     //       break;

//     //     case JWT_EXPIRED:
//     //       // sessionStorage.removeItem('token');
//     //       localStorage.removeItem('token');
//     //       window.location.href = `${window.location.origin}`;
//     //       break;

//     //     // we need access to email and name, to implement this here
//     //     // case 'GraphQL error: Permission denied':
//     //     //   window.location.href += `403?email=${email}&name=${name}`;
//     //     //   break;

//     //     default:
//     //       // TODO modify all the call with graph and add Alert
//     //       console.log('-----> ~ afterWareLink ~ error', error);
//     //       // window.location.href = `${window.location.origin}${routesPublic.linkError}`;
//     //       // alertError(error.message);
//     //       //window.location.href = `${window.location.origin}/404?error=${error.message}`;
//     //       break;
//     //   }
//     // });
//   } else {
//     console.log(networkError);
//   }
// });

// const authLink = new ApolloLink((operation, forward) => {
//   // Get the authentication token from local storage if it exists
//   // const token = window.sessionStorage.getItem('token');
//   const token = window.localStorage.getItem('token');

//   // Use the setContext method to set the HTTP headers.
//   operation.setContext({
//     headers: {
//       Authorization: token ? `Bearer ${token}` : ''
//     }
//   });

//   // Call the next link in the middleware chain.
//   return forward(operation);
// });

export const Client = new ApolloClient({
  uri: process.env.REACT_APP_URL,
  // link: from([authLink, afterWareLink, httpLink]),
  cache: new InMemoryCache()
});
