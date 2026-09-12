// ==================== ACCORDION CONTEXT ====================
// Kiến thức Buổi 2 – Compound Component:
//   "Sử dụng Context API để chia sẻ state giữa các component con"
//
// Có 2 tầng context:
//   1. AccordionContext  → toàn bộ Accordion biết "item nào đang mở"
//   2. AccordionItemContext → mỗi Item biết "mình là item nào" (value của nó)

import { createContext, useContext } from 'react';


// ==================== TẦNG 1: AccordionContext ====================
// Kiểu dữ liệu của context
export interface AccordionContextType {
  // activeValue: string nếu có panel đang mở, null nếu tất cả đóng
  activeValue: string | null;
  // Hàm để thay đổi panel đang mở
  setActiveValue: (value: string | null) => void;
}

// Tạo Context với giá trị mặc định là undefined
// → nếu ai đó dùng AccordionTrigger/Panel ngoài <Accordion>, sẽ bị báo lỗi
export const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

// Custom Hook để đọc AccordionContext
// → ném lỗi rõ ràng nếu dùng sai context (không có Provider bao ngoài)
export function useAccordionContext(): AccordionContextType {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordionContext phải được dùng bên trong <Accordion>');
  }
  return context;
}

// ==================== TẦNG 2: AccordionItemContext ====================
// Mỗi <AccordionItem value="item1"> cung cấp context này
// → <AccordionTrigger> và <AccordionPanel> bên trong biết mình thuộc item nào
export interface AccordionItemContextType {
  value: string; // ví dụ: "item1", "item2"
}

export const AccordionItemContext = createContext<AccordionItemContextType | undefined>(undefined);

// Custom Hook để đọc AccordionItemContext
export function useAccordionItemContext(): AccordionItemContextType {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('useAccordionItemContext phải được dùng bên trong <Accordion.Item>');
  }
  return context;
}
