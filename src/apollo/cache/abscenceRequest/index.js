import {
  ABSCENCES_REQUEST_PENDING_QUERY,
  ABSCENCES_REQUEST_DASHBOARD_EMPLOYEE_QUERY,
  ABSCENCES_REQUEST_QUERY
} from '../../../graphql/queries/abscenceRequest';
import { EMPLOYEE_PROFILE_PTO } from '../../../graphql/queries/employees';
export const removeAbscenceRequestPending = (cache, employeeId, abscence) => {
  let existingAbscenceRequest = cache.readQuery({
    query: ABSCENCES_REQUEST_PENDING_QUERY,
    variables: {
      id: employeeId
    }
  });
  let newAbscenceRequest = existingAbscenceRequest.abscenceRequests.filter(
    item => abscence.id !== item.id
  );
  cache.writeQuery({
    query: ABSCENCES_REQUEST_PENDING_QUERY,
    variables: {
      id: employeeId
    },
    data: { abscenceRequests: newAbscenceRequest }
  });
};

export const addAbscenceRequestRoleEmployee = (
  cache,
  employeeId,
  dataCreateOneAbscenceRequest
) => {
  let dataAbscenceRequest = cache.readQuery({
    query: ABSCENCES_REQUEST_DASHBOARD_EMPLOYEE_QUERY,
    variables: { id: employeeId }
  });

  let newAbscenceRequest = [
    dataCreateOneAbscenceRequest.createOneAbscenceRequest,
    ...dataAbscenceRequest.abscenceRequests
  ];

  cache.writeQuery({
    query: ABSCENCES_REQUEST_DASHBOARD_EMPLOYEE_QUERY,
    variables: { id: employeeId },
    data: { abscenceRequests: [...newAbscenceRequest] }
  });
};

export const addAbscenceRequestRoleAdmin = (
  cache,
  employeeId,
  abscenceRequest
) => {
  let dataAbscenceRequest = cache.readQuery({
    query: ABSCENCES_REQUEST_QUERY,
    variables: { id: employeeId }
  });

  let newAbscenceRequest = [
    ...dataAbscenceRequest.abscenceRequests,
    abscenceRequest
  ];

  cache.writeQuery({
    query: ABSCENCES_REQUEST_QUERY,
    variables: { id: employeeId },
    data: { abscenceRequests: [...newAbscenceRequest] }
  });
};

export const removeAbscenceRequestEmployee = (cache, employeeId, id) => {
  let dataAbscenceRequest = cache.readQuery({
    query: ABSCENCES_REQUEST_QUERY,
    variables: { id: employeeId }
  });

  let newAbscenceRequests = [
    ...dataAbscenceRequest.abscenceRequests.filter(item => item.id !== id)
  ];

  cache.writeQuery({
    query: ABSCENCES_REQUEST_QUERY,
    variables: { id: employeeId },
    data: { abscenceRequests: [...newAbscenceRequests] }
  });
};

export const changeStatusToDeclinedPto = (cache, employeeId, id) => {
  const { meProfilePTO } = cache.readQuery({
    query: EMPLOYEE_PROFILE_PTO,
    variables: { id: employeeId }
  });
  let newAbscenceRequests = [
    ...meProfilePTO.abscenceRequests.map(item => {
      if (id === item.id) {
        return { ...item, status: 'DECLINED' };
      }
      return item;
    })
  ];

  cache.writeQuery({
    query: EMPLOYEE_PROFILE_PTO,
    variables: { id: employeeId },
    data: { ...meProfilePTO, abscenceRequests: newAbscenceRequests }
  });
};
