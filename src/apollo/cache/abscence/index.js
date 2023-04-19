import { ABSCENCES_QUERY } from '../../../graphql/queries/abscence';

export const removeAbscenceEmployee = (cache, employeeId, id) => {
  let dataAbscence = cache.readQuery({
    query: ABSCENCES_QUERY,
    variables: { id: employeeId }
  });

  dataAbscence.abscences = dataAbscence.abscences.filter(
    item => item.id !== id
  );

  cache.writeQuery({
    query: ABSCENCES_QUERY,
    variables: { id: employeeId },
    data: { abscences: dataAbscence.abscences }
  });
};

export const addAbscenceEmployee = (cache, employeeId, abscence) => {
  let dataAbscence = cache.readQuery({
    query: ABSCENCES_QUERY,
    variables: { id: employeeId }
  });
  dataAbscence.abscences.push(abscence);
  cache.writeQuery({
    query: ABSCENCES_QUERY,
    variables: { id: employeeId },
    data: { abscences: dataAbscence.abscences }
  });
};
