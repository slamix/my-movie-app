import React from 'react';
import { Panel } from '@vkontakte/vkui';
import Header from '../components/Header';
import { HeartIcon } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';
import type { RootState } from '../slices';

// Мок-данные (дублируем, если нет экспорта)

const MoviePage: React.FC = () => {
  const activeMovie = useSelector((state: RootState) => state.activeMovie.activeMovie);

  if (!activeMovie) {
    return (
      <Panel>
        <Header />
        <div style={{ maxWidth: 600, margin: '60px auto', textAlign: 'center', color: '#888', fontSize: 22 }}>
          Фильм не найден
        </div>
      </Panel>
    );
  }

  const readyGenres = activeMovie.genres.map((genre) => genre.name).join(', ')

  return (
    <Panel style={{ background: 'var(--vkui--color_background_secondary)', minHeight: '100vh' }}>
      <Header />
      <div style={{
        maxWidth: 1100,
        margin: '32px auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 40,
        background: '#fff',
        borderRadius: 24,
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
        padding: 36,
        alignItems: 'flex-start',
      }}>
        {/* Постер */}
        <div style={{ flex: '0 0 320px', maxWidth: 320, width: '100%' }}>
          <img
            src={activeMovie.poster.url}
            alt={activeMovie.name}
            style={{ width: '100%', borderRadius: 18, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)' }}
          />
        </div>
        {/* Информация */}
        <div style={{ flex: '1 1 340px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'space-between', height: '100%' }}>
          <div>
            {/* Название */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0, color: '#111', lineHeight: 1.1 }}>{activeMovie.name} <span style={{ fontWeight: 400, fontSize: 26, color: '#888' }}>({activeMovie.year})</span></h1>
            </div>
            {/* Описание */}
            <div style={{ fontSize: 19, color: '#222', lineHeight: 1.5, margin: '16px 0 8px 0' }}>{activeMovie.description}</div>
            {/* Характеристики */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
              <div style={{ minWidth: 180, fontSize: 17, color: '#444', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div><span style={{ color: '#888' }}>Рейтинг:</span> <span style={{ fontWeight: 700, color: '#ff6600', fontSize: 20 }}>★ {activeMovie.rating.kp.toFixed(1)}</span></div>
                <div><span style={{ color: '#888' }}>Год выхода:</span> <span>{activeMovie.year}</span></div>
                <div><span style={{ color: '#888' }}>Жанры:</span> <span>{readyGenres}</span></div>
              </div>
            </div>
          </div>
          {/* Кнопка добавить в избранное */}
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#fff',
              border: '2px solid #ff6600',
              color: '#ff6600',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 15,
              padding: '7px 16px',
              cursor: 'pointer',
              boxShadow: '0 1.5px 4px 0 rgba(255,102,0,0.08)',
              transition: 'background 0.15s, color 0.15s, border 0.15s',
              marginTop: 32,
              alignSelf: 'flex-start',
            }}
            onClick={() => {}}
          >
            <HeartIcon size={18} color="#ff6600" weight="duotone" />
            <span>В избранное</span>
          </button>
        </div>
      </div>
    </Panel>
  );
};

export default MoviePage;