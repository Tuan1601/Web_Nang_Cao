// ==================== ACCORDION PANEL ====================
// Kiến thức Buổi 2 – Compound Component:
//   Component con đọc context để quyết định có render nội dung không.
//
// Panel chỉ hiển thị khi activeValue === value của item mình

import type { ReactNode } from 'react';
import { useAccordionContext, useAccordionItemContext } from './AccordionContext';

interface AccordionPanelProps {
  children: ReactNode;
}

export function AccordionPanel({ children }: AccordionPanelProps) {
  // Đọc Tầng 1: biết "item nào đang mở"
  const { activeValue } = useAccordionContext();

  // Đọc Tầng 2: biết "mình là item nào"
  const { value } = useAccordionItemContext();

  // So sánh → chỉ render nội dung khi item của mình đang active
  const isOpen = activeValue === value;

  return (
    // Luôn render div để CSS animation có thể hoạt động
    // Dùng aria-hidden cho accessibility
    <div
      className={`accordion-panel ${isOpen ? 'accordion-panel--open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="accordion-panel-content">
        {children}
      </div>
    </div>
  );
}
