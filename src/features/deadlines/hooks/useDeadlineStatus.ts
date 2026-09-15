import { useMemo } from 'react';
import { getDeadlineStatus } from '../utils/deadline.utils';
import type { DeadlineStatusInfo } from '../types/deadline.types';

export function useDeadlineStatus(dueDate: string, completed: boolean): DeadlineStatusInfo {
  return useMemo(
    () => getDeadlineStatus(dueDate, completed),
    [dueDate, completed]
  );
}
