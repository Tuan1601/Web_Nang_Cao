import type { Category } from '../types/book';

const EXACT_BOOK_COVERS: Record<string, string> = {
  'Clean Code': 'https://covers.openlibrary.org/b/isbn/9780132350884-M.jpg',
  'Design Patterns': 'https://covers.openlibrary.org/b/isbn/9780201633610-M.jpg',
  'The Pragmatic Programmer': 'https://covers.openlibrary.org/b/isbn/9780201616224-M.jpg',
  'Introduction to Algorithms': 'https://covers.openlibrary.org/b/isbn/9780262033848-M.jpg',
  'Computer Networking: A Top-Down Approach': 'https://covers.openlibrary.org/b/isbn/9780133594140-M.jpg',
  'Operating System Concepts': 'https://covers.openlibrary.org/b/isbn/9781119800361-M.jpg',
  'Computer Organization and Design': 'https://covers.openlibrary.org/b/isbn/9780124077263-M.jpg',
  'Database System Concepts': 'https://covers.openlibrary.org/b/isbn/9780073523323-M.jpg',
  'You Don’t Know JS Yet': 'https://covers.openlibrary.org/b/isbn/9781491904244-M.jpg',
  'Eloquent JavaScript': 'https://covers.openlibrary.org/b/isbn/9781593279509-M.jpg',
  'Effective TypeScript': 'https://covers.openlibrary.org/b/isbn/9781492053743-M.jpg',
  'Learning React': 'https://covers.openlibrary.org/b/isbn/9781491954621-M.jpg',
  'Node.js Design Patterns': 'https://covers.openlibrary.org/b/isbn/9781839214110-M.jpg',
  'Programming TypeScript': 'https://covers.openlibrary.org/b/isbn/9781492052593-M.jpg',
  'Refactoring': 'https://covers.openlibrary.org/b/isbn/9780134757599-M.jpg',
  'Domain-Driven Design': 'https://covers.openlibrary.org/b/isbn/9780321125217-M.jpg',
  'Clean Architecture': 'https://covers.openlibrary.org/b/isbn/9780134494166-M.jpg',
  'Head First Design Patterns': 'https://covers.openlibrary.org/b/isbn/9780596007126-M.jpg',
  'Code Complete': 'https://covers.openlibrary.org/b/isbn/9780735619678-M.jpg',
  'The Mythical Man-Month': 'https://covers.openlibrary.org/b/isbn/9780201835953-M.jpg',
  'Artificial Intelligence: A Modern Approach': 'https://covers.openlibrary.org/b/isbn/9780136042594-M.jpg',
  'Deep Learning': 'https://covers.openlibrary.org/b/isbn/9780262035612-M.jpg',
  'Hands-On Machine Learning': 'https://covers.openlibrary.org/b/isbn/9781492032649-M.jpg',
  'Python Crash Course': 'https://covers.openlibrary.org/b/isbn/9781593279288-M.jpg',
  'Automate the Boring Stuff with Python': 'https://covers.openlibrary.org/b/isbn/9781593275990-M.jpg',
  'Fluent Python': 'https://covers.openlibrary.org/b/isbn/9781491946008-M.jpg',
  'Learning SQL': 'https://covers.openlibrary.org/b/isbn/9781492057611-M.jpg',
  'Designing Data-Intensive Applications': 'https://covers.openlibrary.org/b/isbn/9781449373320-M.jpg',
  'The Linux Command Line': 'https://covers.openlibrary.org/b/isbn/9781593273897-M.jpg',
  'Pro Git': 'https://covers.openlibrary.org/b/isbn/9781484200773-M.jpg',
  'The DevOps Handbook': 'https://covers.openlibrary.org/b/isbn/9781942788003-M.jpg',
  'Site Reliability Engineering': 'https://covers.openlibrary.org/b/isbn/9781491929124-M.jpg',
  'Compilers: Principles, Techniques, and Tools': 'https://covers.openlibrary.org/b/isbn/9780321486813-M.jpg',
  'The Art of Computer Programming': 'https://covers.openlibrary.org/b/isbn/9780201896831-M.jpg',
  'Principles of Economics': 'https://covers.openlibrary.org/b/isbn/9780357038314-M.jpg',
  'Kinh tế học vĩ mô': 'https://covers.openlibrary.org/b/isbn/9781305971509-M.jpg',
  'The Wealth of Nations': 'https://covers.openlibrary.org/b/isbn/9780140432084-M.jpg',
  'Capital in the Twenty-First Century': 'https://covers.openlibrary.org/b/isbn/9780674430006-M.jpg',
  'Freakonomics': 'https://covers.openlibrary.org/b/isbn/9780060731328-M.jpg',
  'Thinking, Fast and Slow': 'https://covers.openlibrary.org/b/isbn/9780374275631-M.jpg',
  'The Intelligent Investor': 'https://covers.openlibrary.org/b/isbn/9780060555665-M.jpg',
  'A Random Walk Down Wall Street': 'https://covers.openlibrary.org/b/isbn/9780393330335-M.jpg',
  'Corporate Finance': 'https://covers.openlibrary.org/b/isbn/9780134083278-M.jpg',
  'Principles of Marketing': 'https://covers.openlibrary.org/b/isbn/9780134492513-M.jpg',
  'Marketing Management': 'https://covers.openlibrary.org/b/isbn/9780133856460-M.jpg',
  'Contagious: Why Things Catch On': 'https://covers.openlibrary.org/b/isbn/9781451686579-M.jpg',
  'Blue Ocean Strategy': 'https://covers.openlibrary.org/b/isbn/9781591396192-M.jpg',
  'Good to Great': 'https://covers.openlibrary.org/b/isbn/9780066620992-M.jpg',
  'The Lean Startup': 'https://covers.openlibrary.org/b/isbn/9780307887894-M.jpg',
  'Zero to One': 'https://covers.openlibrary.org/b/isbn/9780804139298-M.jpg',
  'The Personal MBA': 'https://covers.openlibrary.org/b/isbn/9781591845577-M.jpg',
  'Competitive Strategy': 'https://covers.openlibrary.org/b/isbn/9780684841489-M.jpg',
  'Macroeconomics': 'https://covers.openlibrary.org/b/isbn/9780134472119-M.jpg',
  'Microeconomics': 'https://covers.openlibrary.org/b/isbn/9780134184241-M.jpg',
  'English Grammar in Use': 'https://covers.openlibrary.org/b/isbn/9781108457651-M.jpg',
  'Advanced Grammar in Use': 'https://covers.openlibrary.org/b/isbn/9781107693586-M.jpg',
  'English Vocabulary in Use: Elementary': 'https://covers.openlibrary.org/b/isbn/9781316631522-M.jpg',
  'Practical English Usage': 'https://covers.openlibrary.org/b/isbn/9780194202466-M.jpg',
  'The Official Cambridge Guide to IELTS': 'https://covers.openlibrary.org/b/isbn/9781107620698-M.jpg',
  'Genki I: An Integrated Course in Elementary Japanese': 'https://covers.openlibrary.org/b/isbn/9784789017305-M.jpg',
  'Genki II: An Integrated Course in Elementary Japanese': 'https://covers.openlibrary.org/b/isbn/9784789017329-M.jpg',
  'Nhà Giả Kim': 'https://covers.openlibrary.org/b/isbn/9780061122415-M.jpg',
  'Ông Già Và Biển Cả': 'https://covers.openlibrary.org/b/isbn/9780684801223-M.jpg',
  'Những Người Khốn Khổ': 'https://covers.openlibrary.org/b/isbn/9780451419439-M.jpg',
  'Đắc Nhân Tâm': 'https://covers.openlibrary.org/b/isbn/9780671027032-M.jpg',
  'Tư Duy Nhanh Và Chậm': 'https://covers.openlibrary.org/b/isbn/9780374275631-M.jpg',
  'Đi Tìm Lẽ Sống': 'https://covers.openlibrary.org/b/isbn/9780807014295-M.jpg',
  'Im Lặng: Sức Mạnh Của Người Hướng Nội': 'https://covers.openlibrary.org/b/isbn/9780307352156-M.jpg',
  'Trí Tuệ Xúc Cảm': 'https://covers.openlibrary.org/b/isbn/9780553383713-M.jpg',
  'Phi Lý Trí': 'https://covers.openlibrary.org/b/isbn/9780061353246-M.jpg',
  'Tâm Lý Học Đám Đông': 'https://covers.openlibrary.org/b/isbn/9780486419565-M.jpg',
  'Lược Sử Thời Gian': 'https://covers.openlibrary.org/b/isbn/9780553380163-M.jpg',
  'Vũ Trụ Trong Vỏ Hạt Dẻ': 'https://covers.openlibrary.org/b/isbn/9780553802023-M.jpg',
  'Sapiens: Lược Sử Loài Người': 'https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg',
  'Homo Deus: Lược Sử Tương Lai': 'https://covers.openlibrary.org/b/isbn/9780062464316-M.jpg',
  'Nguồn Gốc Các Loài': 'https://covers.openlibrary.org/b/isbn/9780140432053-M.jpg',
  'Cosmos': 'https://covers.openlibrary.org/b/isbn/9780345539434-M.jpg',
  'The Selfish Gene': 'https://covers.openlibrary.org/b/isbn/9780199291151-M.jpg',
  'Súng, Vi Trùng Và Thép': 'https://covers.openlibrary.org/b/isbn/9780393317558-M.jpg',
  'The Silk Roads': 'https://covers.openlibrary.org/b/isbn/9781101912379-M.jpg',
  'SPQR: Lịch Sử La Mã Cổ Đại': 'https://covers.openlibrary.org/b/isbn/9781631492228-M.jpg',
  'Lịch Sử Thế Giới': 'https://covers.openlibrary.org/b/isbn/9780300143324-M.jpg',
  'Cộng Hòa': 'https://covers.openlibrary.org/b/isbn/9780140455113-M.jpg',
  'Thế Giới Của Sophie': 'https://covers.openlibrary.org/b/isbn/9780374530716-M.jpg',
  'Meditations': 'https://covers.openlibrary.org/b/isbn/9780812968255-M.jpg',
  'Beyond Good and Evil': 'https://covers.openlibrary.org/b/isbn/9780140449235-M.jpg',
  'The Art of War': 'https://covers.openlibrary.org/b/isbn/9781590302255-M.jpg',
  'Man’s Search for Meaning': 'https://covers.openlibrary.org/b/isbn/9780807014295-M.jpg',
  '7 Thói Quen Hiệu Quả': 'https://covers.openlibrary.org/b/isbn/9780743269513-M.jpg',
  'Atomic Habits': 'https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg',
  'Deep Work': 'https://covers.openlibrary.org/b/isbn/9781455586691-M.jpg',
  'The Power of Habit': 'https://covers.openlibrary.org/b/isbn/9780812981605-M.jpg',
  'Mindset': 'https://covers.openlibrary.org/b/isbn/9780345472327-M.jpg',
  'How to Win Friends and Influence People': 'https://covers.openlibrary.org/b/isbn/9780671027032-M.jpg',
  'Essentialism': 'https://covers.openlibrary.org/b/isbn/9780804137386-M.jpg',
  'The Body: A Guide for Occupants': 'https://covers.openlibrary.org/b/isbn/9780385539999-M.jpg',
  'Being Mortal': 'https://covers.openlibrary.org/b/isbn/9781250081247-M.jpg',
  'The Gene: An Intimate History': 'https://covers.openlibrary.org/b/isbn/9781476733500-M.jpg',
  'Why We Sleep': 'https://covers.openlibrary.org/b/isbn/9781501144318-M.jpg',
  'The Emperor of All Maladies': 'https://covers.openlibrary.org/b/isbn/9781439170915-M.jpg',
  'Into the Wild': 'https://covers.openlibrary.org/b/isbn/9780385486804-M.jpg',
  'Eat, Pray, Love': 'https://covers.openlibrary.org/b/isbn/9780143038412-M.jpg',
  'A Walk in the Woods': 'https://covers.openlibrary.org/b/isbn/9780307279460-M.jpg',
  'Wild': 'https://covers.openlibrary.org/b/isbn/9780307476074-M.jpg',
  'The Story of Art': 'https://covers.openlibrary.org/b/isbn/9780714832470-M.jpg',
  'Ways of Seeing': 'https://covers.openlibrary.org/b/isbn/9780140135152-M.jpg',
  'Steal Like an Artist': 'https://covers.openlibrary.org/b/isbn/9780761169253-M.jpg',
  'The Design of Everyday Things': 'https://covers.openlibrary.org/b/isbn/9780465050659-M.jpg',
  'Understanding Comics': 'https://covers.openlibrary.org/b/isbn/9780060976255-M.jpg',
  'The Rule of Law': 'https://covers.openlibrary.org/b/isbn/9780141034539-M.jpg',
  'Justice: What’s the Right Thing to Do?': 'https://covers.openlibrary.org/b/isbn/9780374180652-M.jpg',
  'The Concept of Law': 'https://covers.openlibrary.org/b/isbn/9780199644704-M.jpg',
  'On Liberty': 'https://covers.openlibrary.org/b/isbn/9780140432077-M.jpg',
  'Pedagogy of the Oppressed': 'https://covers.openlibrary.org/b/isbn/9780826412768-M.jpg',
  'How Learning Works': 'https://covers.openlibrary.org/b/isbn/9780470484104-M.jpg',
  'Make It Stick': 'https://covers.openlibrary.org/b/isbn/9780674729018-M.jpg',
  'Mindstorms': 'https://covers.openlibrary.org/b/isbn/9780465046744-M.jpg',
  'Hoàng Tử Bé': 'https://covers.openlibrary.org/b/isbn/9780156012195-M.jpg',
  'Alice Ở Xứ Sở Thần Tiên': 'https://covers.openlibrary.org/b/isbn/9780141439761-M.jpg',
  'Charlie Và Nhà Máy Sô-cô-la': 'https://covers.openlibrary.org/b/isbn/9780142410318-M.jpg',
  'Matilda': 'https://covers.openlibrary.org/b/isbn/9780142410370-M.jpg',
  'Charlotte’s Web': 'https://covers.openlibrary.org/b/isbn/9780064400558-M.jpg',
  'The Little House on the Prairie': 'https://covers.openlibrary.org/b/isbn/9780064400022-M.jpg',
  'Harry Potter Và Hòn Đá Phù Thủy': 'https://covers.openlibrary.org/b/isbn/9780439708180-M.jpg',
};

interface CategoryTheme {
  start: string;
  end: string;
  accent: string;
  icon: string;
}

const CATEGORY_THEMES: Record<Category, CategoryTheme> = {
  CNTT: { start: '#0b132b', end: '#1c2541', accent: '#38bdf8', icon: '💻' },
  'Kinh tế': { start: '#0f172a', end: '#1e293b', accent: '#f59e0b', icon: '📈' },
  'Ngoại ngữ': { start: '#064e3b', end: '#065f46', accent: '#34d399', icon: '🌐' },
  'Văn học': { start: '#450a0a', end: '#7f1d1d', accent: '#fca5a5', icon: '📜' },
  'Tâm lý': { start: '#2e1065', end: '#4c1d95', accent: '#c084fc', icon: '🧠' },
  'Khoa học': { start: '#0f172a', end: '#312e81', accent: '#818cf8', icon: '🔬' },
  'Lịch sử': { start: '#431407', end: '#7c2d12', accent: '#fdba74', icon: '🏛️' },
  'Triết học': { start: '#1c1917', end: '#292524', accent: '#cbd5e1', icon: '🗿' },
  'Kỹ năng sống': { start: '#14532d', end: '#166534', accent: '#86efac', icon: '🌱' },
  'Y học': { start: '#881337', end: '#9f1239', accent: '#fda4af', icon: '🩺' },
  'Du lịch': { start: '#082f49', end: '#075985', accent: '#38bdf8', icon: '🧭' },
  'Nghệ thuật': { start: '#701a75', end: '#86198f', accent: '#f472b6', icon: '🎨' },
  'Pháp luật': { start: '#18181b', end: '#27272a', accent: '#fbbf24', icon: '⚖️' },
  'Giáo dục': { start: '#1e3a8a', end: '#1e40af', accent: '#60a5fa', icon: '🎓' },
  'Thiếu nhi': { start: '#7c2d12', end: '#c2410c', accent: '#fde047', icon: '⭐' },
};

function wrapLines(text: string, maxChars = 17, maxLines = 4): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if (!current) {
      current = word;
    } else if ((current + ' ' + word).length <= maxChars) {
      current += ' ' + word;
    } else {
      lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (current && lines.length < maxLines) {
    lines.push(current);
  }
  return lines;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function createSvgBookCover(
  title: string,
  author: string,
  category: Category,
  year?: number,
): string {
  const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES['CNTT'];
  const lines = wrapLines(title, 16, 4);
  const fontSize = lines.length <= 2 ? 18 : lines.length === 3 ? 16 : 14;
  const startY = 170 - ((lines.length - 1) * (fontSize + 6)) / 2;

  const displayYear = year ? (year < 0 ? `${Math.abs(year)} TCN` : String(year)) : '';

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 420" width="100%" height="100%">
  <defs>
    <linearGradient id="cov-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.start}" />
      <stop offset="100%" stop-color="${theme.end}" />
    </linearGradient>
    <linearGradient id="cov-spine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.3)" />
      <stop offset="25%" stop-color="rgba(255,255,255,0.08)" />
      <stop offset="70%" stop-color="rgba(0,0,0,0.3)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.6)" />
    </linearGradient>
    <filter id="cov-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.5)" />
    </filter>
  </defs>

  <rect width="300" height="420" rx="10" fill="url(#cov-bg)" />

  <rect x="36" y="18" width="246" height="384" rx="6" fill="none" stroke="${theme.accent}" stroke-opacity="0.35" stroke-width="1.5" />
  <rect x="42" y="24" width="234" height="372" rx="4" fill="none" stroke="${theme.accent}" stroke-opacity="0.15" stroke-dasharray="4 3" stroke-width="1" />

  <g transform="translate(160, 48)">
    <rect x="-65" y="-14" width="130" height="28" rx="14" fill="rgba(255,255,255,0.12)" stroke="${theme.accent}" stroke-opacity="0.5" stroke-width="1" />
    <text x="0" y="5" font-family="'Be Vietnam Pro', -apple-system, sans-serif" font-size="11" font-weight="700" text-anchor="middle" fill="#ffffff" letter-spacing="1">
      ${theme.icon} ${escapeXml(category.toUpperCase())}
    </text>
  </g>

  <g filter="url(#cov-shadow)">
    <text x="160" y="${startY}" font-family="'Be Vietnam Pro', -apple-system, sans-serif" font-weight="800" text-anchor="middle" fill="#ffffff">
      ${lines
        .map(
          (line, i) =>
            `<tspan x="160" dy="${i === 0 ? 0 : fontSize + 7}" font-size="${fontSize}">${escapeXml(line)}</tspan>`,
        )
        .join('')}
    </text>
  </g>

  <path d="M 90 280 L 140 280 M 180 280 L 230 280" stroke="${theme.accent}" stroke-width="1.5" stroke-opacity="0.6" />
  <circle cx="160" cy="280" r="3.5" fill="${theme.accent}" />

  <text x="160" y="320" font-family="'Be Vietnam Pro', -apple-system, sans-serif" font-size="10" font-weight="600" text-anchor="middle" fill="${theme.accent}" letter-spacing="1.5">
    TÁC GIẢ
  </text>
  <text x="160" y="342" font-family="'Be Vietnam Pro', -apple-system, sans-serif" font-size="13" font-weight="700" text-anchor="middle" fill="#ffffff">
    ${escapeXml(author.length > 25 ? author.slice(0, 24) + '…' : author)}
  </text>

  <g transform="translate(160, 380)">
    <rect x="-55" y="-10" width="110" height="20" rx="10" fill="rgba(0,0,0,0.3)" />
    <text x="0" y="4" font-family="'Be Vietnam Pro', -apple-system, sans-serif" font-size="9" font-weight="600" text-anchor="middle" fill="rgba(255,255,255,0.75)" letter-spacing="0.5">
      ${escapeXml(displayYear ? `NXB ${displayYear}` : 'THƯ VIỆN KHOA')}
    </text>
  </g>

  <rect x="0" y="0" width="24" height="420" fill="url(#cov-spine)" />
  <line x1="24" y1="0" x2="24" y2="420" stroke="rgba(0,0,0,0.5)" stroke-width="1.5" />
  <line x1="25" y1="0" x2="25" y2="420" stroke="rgba(255,255,255,0.18)" stroke-width="1" />

  <line x1="2" y1="70" x2="22" y2="70" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />
  <line x1="2" y1="140" x2="22" y2="140" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />
  <line x1="2" y1="280" x2="22" y2="280" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />
  <line x1="2" y1="350" x2="22" y2="350" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />
</svg>
`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function getBookCoverUrl(
  title: string,
  author: string,
  category: Category,
  year?: number,
): string {
  if (EXACT_BOOK_COVERS[title]) {
    return EXACT_BOOK_COVERS[title];
  }
  return createSvgBookCover(title, author, category, year);
}
