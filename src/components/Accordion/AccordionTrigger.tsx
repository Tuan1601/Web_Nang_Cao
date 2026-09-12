// ==================== ACCORDION TRIGGER ====================
// Kiến thức Buổi 2 – Compound Component:
//   Component con đọc CÙNG LÚC 2 context để thực hiện logic toggle.
//
// Logic toggle:
//   - Nếu item này đang mở (activeValue === value) → đóng lại (setActiveValue(null))
//   - Nếu item này đang đóng → mở nó (setActiveValue(value))
//   → Tự động đóng panel cũ vì setActiveValue ghi đè giá trị trước

import type { ReactNode } from 'react';
import { useAccordionContext, useAccordionItemContext } from './AccordionContext';

interface AccordionTriggerProps {
  children: ReactNode;
}

export function AccordionTrigger({ children }: AccordionTriggerProps) {
  // Đọc Tầng 1: biết "item nào đang mở"
  const { activeValue, setActiveValue } = useAccordionContext();

  // Đọc Tầng 2: biết "mình là item nào"
  const { value } = useAccordionItemContext();

  // So sánh → biết item của mình có đang mở không
  const isOpen = activeValue === value;

  function handleClick() {
    if (isOpen) {
      // Đang mở → click lại để đóng
      setActiveValue(null);
    } else {
      // Đang đóng → mở item này (tự động đóng item cũ vì chỉ có 1 activeValue)
      setActiveValue(value);
    }
  }

  return (
    <button
      className={`accordion-trigger ${isOpen ? 'accordion-trigger--open' : ''}`}
      onClick={handleClick}
      // Accessibility: aria-expanded cho screen reader biết trạng thái
      aria-expanded={isOpen}
    >
      <span>{children}</span>
      {/* Icon mũi tên xoay theo trạng thái */}
      <span className={`accordion-arrow ${isOpen ? 'accordion-arrow--open' : ''}`}>
        ▼
      </span>
    </button>
  );
}
