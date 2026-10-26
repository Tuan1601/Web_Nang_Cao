import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectWarning } from '../booksSelectors';
import { clearWarning } from '../booksSlice';

export function WarningToast() {
  const dispatch = useAppDispatch();
  const warning = useAppSelector(selectWarning);

  useEffect(() => {
    if (!warning) return;
    const timer = setTimeout(() => dispatch(clearWarning()), 4000);
    return () => clearTimeout(timer);
  }, [warning, dispatch]);

  if (!warning) return null;

  return (
    <div className="toast" role="alert">
      <span className="toast__icon">⚠️</span>
      <span>{warning}</span>
      <button type="button" id="close-warning" className="toast__close" aria-label="Đóng" onClick={() => dispatch(clearWarning())}>
        ×
      </button>
    </div>
  );
}
