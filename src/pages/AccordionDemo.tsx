// ==================== ACCORDION DEMO ====================
// Trang demo Accordion với nội dung FAQ về React/TypeScript
// Component này CHỈ chịu trách nhiệm hiển thị UI
// Không biết gì về logic mở/đóng panel – Context xử lý hết

import { Accordion } from '../components/Accordion';

// Dữ liệu FAQ – typed rõ ràng, không dùng any
interface FaqItem {
  value: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    value: 'compound-component',
    question: 'Compound Component là gì?',
    answer:
      'Compound Component là pattern tổ chức nhiều component nhỏ phối hợp với nhau để tạo thành một UI hoàn chỉnh. ' +
      'Các component con chia sẻ state thông qua Context API thay vì prop drilling.',
  },
  {
    value: 'context-api',
    question: 'Tại sao Accordion cần Context API?',
    answer:
      'Accordion.Trigger cần biết panel mình có đang mở không, và Accordion.Panel cần biết có nên hiển thị không. ' +
      'Nếu truyền props thông thường → prop drilling qua nhiều tầng. Context giải quyết vấn đề này bằng cách ' +
      'chia sẻ state trực tiếp từ root đến bất kỳ component con nào.',
  },
  {
    value: 'custom-hook',
    question: 'Khi nào nên dùng Custom Hook thay vì HOC?',
    answer:
      'Theo Buổi 2: Dùng Custom Hook khi muốn chia sẻ logic không kèm UI cố định. ' +
      'Dùng HOC khi cần bọc nhiều component bằng cùng một logic (ví dụ: withAuth). ' +
      'Custom Hook hiện đại hơn và tránh được vấn đề "wrapper hell" của HOC.',
  },
  {
    value: 'generic-typescript',
    question: 'Generic <T> trong usePagination giúp ích gì?',
    answer:
      'Generic <T> giúp usePagination hoạt động với bất kỳ kiểu dữ liệu nào: Product[], Order[], Customer[]. ' +
      'TypeScript sẽ tự động suy luận kiểu của currentItems dựa vào T, ' +
      'không cần dùng any và vẫn có đầy đủ type safety.',
  },
  {
    value: 'single-responsibility',
    question: 'Tại sao logic pagination không nên nằm trong UI component?',
    answer:
      'Single Responsibility Principle: mỗi module chỉ nên có một lý do để thay đổi. ' +
      'Nếu logic nằm trong component: khi thay đổi logic phải sửa component UI, khi thay đổi UI phải cẩn thận logic. ' +
      'Tách ra Custom Hook → có thể test logic độc lập, tái sử dụng ở nhiều component khác nhau.',
  },
];

export function AccordionDemo() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Bài 1 — Accordion</h1>
        <p className="page-subtitle">
          Compound Component + Context API · Kiến thức Buổi 2
        </p>
      </div>

      <div className="demo-section">
        <h2 className="demo-title"> FAQ — React & Design Patterns</h2>

        {/* API sử dụng giống hệt slide đã học:
            <Accordion>
              <Accordion.Item value="...">
                <Accordion.Trigger>...</Accordion.Trigger>
                <Accordion.Panel>...</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
        */}
        <Accordion defaultValue="compound-component">
          {FAQ_DATA.map((faq) => (
            <Accordion.Item key={faq.value} value={faq.value}>
              <Accordion.Trigger>{faq.question}</Accordion.Trigger>
              <Accordion.Panel>{faq.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
