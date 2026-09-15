# 🎓 Student Deadline Tracker

> Ứng dụng theo dõi deadline bài tập cho sinh viên – Bài tập tổng hợp môn **Lập trình Web nâng cao**

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-latest-764abc?style=flat-square&logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)

---

## 📋 Giới thiệu

**Student Deadline Tracker** giúp sinh viên quản lý hàng chục deadline bài tập từ nhiều môn học, tránh nộp trễ hoặc bỏ sót.

### Tính năng chính

- ✅ Xem danh sách deadline với đầy đủ thông tin (môn học, tên bài, hạn nộp, độ ưu tiên, trạng thái)
- ✅ Thêm deadline mới qua modal form có validation
- ✅ Đánh dấu hoàn thành / bỏ hoàn thành
- ✅ Xóa deadline (có confirm)
- ✅ Lọc: Tất cả / Chưa xong / Quá hạn / Hoàn thành
- ✅ Hiển thị "Còn X ngày" / "Quá hạn Y ngày" / "Hạn hôm nay"
- ✅ Dashboard thống kê (tổng / chưa xong / quá hạn / hoàn thành)
- ✅ Skeleton loading khi fetch dữ liệu
- ✅ Responsive: Mobile → Tablet → Desktop

---

## 🛠 Công nghệ sử dụng

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| Next.js | 15 (App Router) | Framework React SSR/SSG |
| TypeScript | 5 (strict mode) | Type safety |
| Redux Toolkit | latest | State management |
| React Redux | latest | React bindings cho Redux |
| Tailwind CSS | 4 | Styling |
| lucide-react | latest | Icon library |

---

## ⚙️ Cài đặt

```bash
# Clone project (hoặc copy folder)
cd student-deadline-tracker

# Cài dependencies
npm install
```

## 🚀 Chạy project

```bash
# Development mode
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

```bash
# Build production
npm run build
```

---

## 📁 Cấu trúc thư mục

```
src/
├── app/
│   ├── api/
│   │   └── deadlines/
│   │       └── route.ts          # Mock API – GET /api/deadlines
│   ├── globals.css
│   ├── layout.tsx                 # Root layout + Inter font
│   ├── page.tsx                   # Trang chính (dashboard)
│   └── providers.tsx              # Redux Provider
│
├── store/
│   ├── store.ts                   # configureStore, RootState, AppDispatch
│   └── hooks.ts                   # useAppDispatch, useAppSelector
│
├── features/
│   └── deadlines/
│       ├── components/
│       │   ├── DeadlineCard.tsx   # Card hiển thị 1 deadline
│       │   ├── DeadlineEmpty.tsx  # Empty state
│       │   ├── DeadlineFilters.tsx # Compound Component bộ lọc
│       │   ├── DeadlineForm.tsx   # Form thêm deadline
│       │   ├── DeadlineList.tsx   # Grid danh sách
│       │   ├── DeadlineSkeleton.tsx # Loading skeleton
│       │   └── DeadlineStats.tsx  # Dashboard thống kê
│       ├── hooks/
│       │   ├── useDeadlineForm.ts # Custom Hook quản lý form
│       │   └── useDeadlineStatus.ts # Custom Hook tính trạng thái
│       ├── types/
│       │   └── deadline.types.ts  # Type definitions (Buổi 1)
│       ├── utils/
│       │   └── deadline.utils.ts  # Pure functions + Type Guard
│       └── deadlinesSlice.ts      # Redux slice + thunk + selectors
│
└── shared/
    ├── components/
    │   ├── Badge.tsx
    │   ├── Button.tsx
    │   └── Modal.tsx
    └── types/
        └── api.types.ts           # ApiResponse<T> Generic
```

---

## 🏗 Redux Architecture

```
APP START
    ↓
dispatch(fetchDeadlines())        ← createAsyncThunk
    ↓
GET /api/deadlines                ← Next.js Route Handler
    ↓
pending  → status = 'loading'     ← Skeleton UI
    ↓
fulfilled → items = data          ← state.deadlines.items
    ↓
useAppSelector(selectFilteredDeadlines)
    ↓
DeadlineList → DeadlineCard[]
```

---

## 🔌 API Mock

**Endpoint:** `GET /api/deadlines`

**Response format:**
```json
{
  "statusCode": 200,
  "message": "Lấy danh sách deadline thành công",
  "data": [...]
}
```

- Delay giả lập: **700ms**
- Trả về **8 deadline mẫu** từ nhiều môn học
- Có đủ: còn nhiều ngày, còn 1 ngày, hôm nay, quá hạn, đã hoàn thành

---

## 📚 Buổi 1 – TypeScript nâng cao

| Kiến thức | Vị trí trong project |
|---|---|
| **Generic `ApiResponse<T>`** | `src/shared/types/api.types.ts` |
| **Interface** | `src/features/deadlines/types/deadline.types.ts` |
| **Union Types** (`Priority`, `DeadlineStatus`) | `deadline.types.ts` |
| **Utility Type `Omit`** (`CreateDeadlineInput`) | `deadline.types.ts` |
| **Utility Type `Partial<Pick<>>`** (`UpdateDeadlineInput`) | `deadline.types.ts` |
| **Type Guard** (`isDeadline`) | `deadline.utils.ts` |
| **Type Narrowing** (`isPriority`) | `deadline.utils.ts` |

### Chi tiết

```typescript
// Generic
interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

// Utility Types
type CreateDeadlineInput = Omit<Deadline, 'id' | 'createdAt' | 'completed'>;
type UpdateDeadlineInput = Partial<Pick<Deadline, 'title' | 'dueDate' | 'priority'>>;

// Type Guard
function isDeadline(value: unknown): value is Deadline { ... }
```

---

## 🪝 Buổi 2 – Kiến trúc & Design Pattern trong React

| Kiến thức | Vị trí trong project |
|---|---|
| **Custom Hook `useDeadlineStatus`** | `features/deadlines/hooks/useDeadlineStatus.ts` |
| **Custom Hook `useDeadlineForm`** | `features/deadlines/hooks/useDeadlineForm.ts` |
| **Compound Component** | `features/deadlines/components/DeadlineFilters.tsx` |
| **Context API** | Bên trong `DeadlineFilters.tsx` |
| **Separation of Concerns** | Hook tách logic khỏi UI |

### Chi tiết

```tsx
// Custom Hook
const { label, daysRemaining, status, isOverdue } = useDeadlineStatus(dueDate, completed);

// Compound Component
<DeadlineFilters>
  <DeadlineFilters.List>
    <DeadlineFilters.Item value="all">Tất cả</DeadlineFilters.Item>
    <DeadlineFilters.Item value="pending">Chưa xong</DeadlineFilters.Item>
  </DeadlineFilters.List>
</DeadlineFilters>
```

---

## 🗃 Buổi 3 – Redux Toolkit + TypeScript

| Kiến thức | Vị trí trong project |
|---|---|
| **`configureStore`** | `src/store/store.ts` |
| **`RootState`, `AppDispatch`** | `src/store/store.ts` |
| **`TypedUseSelectorHook`** | `src/store/hooks.ts` |
| **`useAppDispatch`, `useAppSelector`** | `src/store/hooks.ts` |
| **`createSlice`** | `features/deadlines/deadlinesSlice.ts` |
| **`PayloadAction<T>`** | `deadlinesSlice.ts` |
| **`createAsyncThunk<Deadline[], void>`** | `deadlinesSlice.ts` |
| **`extraReducers` (pending/fulfilled/rejected)** | `deadlinesSlice.ts` |
| **Selectors** | `deadlinesSlice.ts` |
| **Feature-based structure** | `src/features/deadlines/` |

### Chi tiết

```typescript
// createAsyncThunk
export const fetchDeadlines = createAsyncThunk<Deadline[], void>(
  'deadlines/fetchAll',
  async (_, { rejectWithValue }) => { ... }
);

// extraReducers
builder
  .addCase(fetchDeadlines.pending, (state) => { state.status = 'loading' })
  .addCase(fetchDeadlines.fulfilled, (state, action) => { state.items = action.payload })
  .addCase(fetchDeadlines.rejected, (state, action) => { state.error = ... })
```

---

## ❓ Câu hỏi vấn đáp thường gặp

Xem phần **"GIẢI THÍCH ĐỂ THUYẾT TRÌNH"** phía dưới trong source code (`deadlinesSlice.ts`, `deadline.types.ts`, `DeadlineFilters.tsx`).
