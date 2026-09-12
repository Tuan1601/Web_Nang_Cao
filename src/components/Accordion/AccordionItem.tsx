// ==================== ACCORDION ITEM ====================
// Kiến thức Buổi 2 – Compound Component:
//   Component con cung cấp context cục bộ (AccordionItemContext)
//   để các component cháu (Trigger, Panel) biết mình thuộc item nào.

import type { ReactNode } from 'react';
import { AccordionItemContext } from './AccordionContext';

interface AccordionItemProps {
  // value là ID định danh của item này, ví dụ: "item1", "faq-shipping"
  value: string;
  children: ReactNode;
}

export function AccordionItem({ value, children }: AccordionItemProps) {
  return (
    // Cung cấp AccordionItemContext.Provider với value của item này
    // → mọi component con (Trigger, Panel) đọc context này để biết
    //   "mình đang ở trong item có value = '...'"
    <AccordionItemContext.Provider value={{ value }}>
      <div className="accordion-item">
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}
