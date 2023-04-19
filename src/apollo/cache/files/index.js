import { readCacheDocumentSignedEmployeeCustomQuery } from '../../../graphql/container/query/documentSigned';

export const updateFiles = (
  cache,
  createOneDocumentsSigned,
  employeeId,
  username = undefined
) => {
  const queryCache = readCacheDocumentSignedEmployeeCustomQuery(
    employeeId,
    {
      limit: 10,
      skip: 0,
      name: '',
      type: undefined
    },
    username
  );
  const data = cache.readQuery(queryCache);
  if (createOneDocumentsSigned) {
    cache.writeQuery({
      ...queryCache,
      data: {
        ...data,
        documentsSignedsCustom: {
          ...data.documentsSignedsCustom,
          documentsSigneds: [
            createOneDocumentsSigned,
            ...data.documentsSignedsCustom.documentsSigneds
          ],
          __typename: 'DocumentsSigneds'
        }
      }
    });
  }
};
