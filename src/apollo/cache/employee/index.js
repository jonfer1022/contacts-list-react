import { EMPLOYEE_QUERY } from '../../../graphql/queries/employees';

export const updateEmployee = (cache, employeeId, employee, separationId) => {
  let newEmployee = employee;

  //parameter optional
  if (separationId) {
    let dataEmployee = cache.readQuery({
      query: EMPLOYEE_QUERY,
      variables: {
        id: employeeId
      }
    });

    newEmployee = {
      ...dataEmployee.employee,
      separation: dataEmployee.employee.separation.filter(
        item => item.id !== separationId
      )
    };
  }

  cache.writeQuery({
    query: EMPLOYEE_QUERY,
    variables: {
      id: employeeId
    },
    data: { employee: newEmployee }
  });
};
