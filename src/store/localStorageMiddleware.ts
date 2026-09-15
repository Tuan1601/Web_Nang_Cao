export const STORAGE_KEY = 'sdt_deadlines_v1';

const MUTATION_ACTIONS = new Set([
  'deadlines/addDeadline',
  'deadlines/toggleDeadline',
  'deadlines/deleteDeadline',
  'deadlines/updateDeadline',
  'deadlines/fetchAll/fulfilled',
]);

export const localStorageMiddleware = (storeApi: any) => (next: any) => (action: any) => {
  const result = next(action);

  if (typeof action?.type === 'string' && MUTATION_ACTIONS.has(action.type)) {
    try {
      const items = storeApi.getState()?.deadlines?.items;
      if (Array.isArray(items)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }
    } catch {
    }
  }

  return result;
};
