import { readCacheSalariesMediaGroupRoleAndBonus } from '../../../graphql/container/query/salary';

export const updateBonus = (
  cache,
  createOneBonusHistory,
  companyId,
  employeeId
) => {
  const queryCache = readCacheSalariesMediaGroupRoleAndBonus(
    companyId,
    employeeId
  );
  const data = cache.readQuery(queryCache);
  if (createOneBonusHistory) {
    cache.writeQuery({
      ...queryCache,
      data: {
        salariesByRole: {
          ...data.salariesByRole,
          bonusHistory: [
            createOneBonusHistory,
            ...data.salariesByRole.bonusHistory
          ],
          __typename: 'dataSalariesByRole'
        }
      }
    });
  }
};
