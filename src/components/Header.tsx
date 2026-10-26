import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="brand">
          <span className="brand__logo">📚</span>
          <span>Mini Library</span>
        </NavLink>

        <nav className="nav">
          <NavLink to="/" end id="nav-home" className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}>
            Sách
          </NavLink>
          <NavLink to="/stats" id="nav-stats" className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}>
            Thống kê
          </NavLink>
          <button
            type="button"
            id="theme-toggle"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng'}
            title={theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
}
