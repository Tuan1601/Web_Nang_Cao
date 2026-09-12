// ==================== APP ====================
// Điều hướng đơn giản giữa 2 trang demo
// Dùng state để tab-switch, không cần React Router

import { useState } from 'react';
import { AccordionDemo } from './pages/AccordionDemo';
import { ProductsPage } from './pages/ProductsPage';
import './App.css';

type Tab = 'accordion' | 'products';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('accordion');

  return (
    <div className="app">
      {/* ========== HEADER ========== */}
      <header className="app-header">
        <div className="app-header-content">
          <div>
            <h1 className="app-title">Buổi 2 — Design Patterns</h1>
            <p className="app-subtitle">React + TypeScript · Compound Component & Custom Hook</p>
          </div>
          <nav className="app-nav">
            <button
              id="tab-accordion"
              className={`nav-tab ${activeTab === 'accordion' ? 'nav-tab--active' : ''}`}
              onClick={() => setActiveTab('accordion')}
            >
              Accordion
            </button>
            <button
              id="tab-products"
              className={`nav-tab ${activeTab === 'products' ? 'nav-tab--active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              usePagination
            </button>
          </nav>
        </div>
      </header>

      {/* ========== MAIN CONTENT ========== */}
      <main className="app-main">
        {activeTab === 'accordion' && <AccordionDemo />}
        {activeTab === 'products' && <ProductsPage />}
      </main>

      {/* ========== FOOTER ========== */}
      <footer className="app-footer">
        <p>Bài tập Buổi 2 </p>
      </footer>
    </div>
  );
}

export default App;
