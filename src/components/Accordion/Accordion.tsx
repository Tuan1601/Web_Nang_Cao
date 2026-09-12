// ==================== ACCORDION (ROOT) ====================
// Kiến thức Buổi 2 – Compound Component:
//   1. Root component giữ state (useState)
//   2. Cung cấp Context.Provider bao quanh children
//   3. Gắn static properties để API sử dụng như: <Accordion.Item>, <Accordion.Trigger>
//
// API mong muốn:
//   <Accordion>
//     <Accordion.Item value="item1">
//       <Accordion.Trigger>Câu hỏi</Accordion.Trigger>
//       <Accordion.Panel>Câu trả lời</Accordion.Panel>
//     </Accordion.Item>
//   </Accordion>

import type { ReactNode } from 'react';
import { useState } from 'react';
import { AccordionContext } from './AccordionContext';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionPanel } from './AccordionPanel';

interface AccordionProps {
  children: ReactNode;
  // defaultValue: tuỳ chọn, item nào mở sẵn khi load trang
  // Nếu không truyền → tất cả đóng
  defaultValue?: string;
}

// Component chính – giữ state và cung cấp Provider
function AccordionRoot({ children, defaultValue }: AccordionProps) {
  // State duy nhất: item nào đang mở?
  // null = tất cả đóng
  // string = value của item đang mở
  const [activeValue, setActiveValue] = useState<string | null>(defaultValue ?? null);

  return (
    // Provider truyền activeValue và setActiveValue xuống toàn bộ cây con
    // → AccordionTrigger và AccordionPanel đọc được mà không cần prop drilling
    <AccordionContext.Provider value={{ activeValue, setActiveValue }}>
      <div className="accordion">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// ==================== STATIC PROPERTIES ====================
// Gắn các component con vào root để dùng được cú pháp <Accordion.Item>
// Tương tự pattern đã học trong slide Tabs: <Tabs.Tab />, <Tabs.Panel />
AccordionRoot.Item = AccordionItem;
AccordionRoot.Trigger = AccordionTrigger;
AccordionRoot.Panel = AccordionPanel;

// Export với tên Accordion để sử dụng: <Accordion>, <Accordion.Item>, ...
export const Accordion = AccordionRoot;
