import React from 'react';
import { FilmSlateIcon, HeartIcon } from '@phosphor-icons/react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header
      style={{
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'white',
        borderBottom: '1px solid var(--vkui--color_separator_common)',
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10), 0 1.5px 4px 0 rgba(0,0,0,0.08)',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <nav
        style={{
          width: '100%',
          maxWidth: 1200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 'clamp(12px, 4vw, 32px)',
          paddingRight: 'clamp(12px, 4vw, 32px)',
        }}
      >
        {/* Кнопка-логотип */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--vkui--color_text_primary)',
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: -1,
            cursor: 'pointer',
            padding: 0,
            margin: 0,
          }}
          aria-label="На главную"
        >
          My movie app
        </button>
        {/* Навигационные иконки */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: pathname === '/' ? 'var(--vkui--color_background_secondary)' : 'none',
              border: 'none',
              borderRadius: 8,
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            aria-label="Главная"
          >
            <FilmSlateIcon size={24} color={pathname === '/' ? '#ffb300' : 'var(--vkui--color_text_primary)'} />
          </button>
          <button
            onClick={() => navigate('/favorites')}
            style={{
              background: pathname === '/favorites' ? 'var(--vkui--color_background_secondary)' : 'none',
              border: 'none',
              borderRadius: 8,
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            aria-label="Избранное"
          >
            <HeartIcon size={24} color={pathname === '/favorites' ? '#ff5c5c' : 'var(--vkui--color_text_primary)'} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;