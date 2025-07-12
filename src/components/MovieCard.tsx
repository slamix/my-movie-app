import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@phosphor-icons/react';
import { setActive } from '../slices/activeMovieSlice';
import type { APIMovie } from '../api/types';
import { useDispatch } from 'react-redux';

interface MovieCardProps {
  movie: APIMovie
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 340,
        minWidth: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--vkui--color_background_content)',
        borderRadius: 16,
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.12), 0 1.5px 4px 0 rgba(0,0,0,0.10)',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
        position: 'relative',
        border: '1.5px solid var(--vkui--color_separator_common)',
      }}
    >
      <Link to={`/movie/${movie.id}`} onClick={() => dispatch(setActive(movie))} style={{ textDecoration: 'none', color: 'inherit', display: 'block', flex: 1 }}>
        <div style={{ width: '100%', aspectRatio: '2/3', background: 'var(--vkui--color_background_secondary)', position: 'relative' }}>
          <img
            src={movie.poster.url}
            alt={movie.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Оценка — справа сверху */}
          <div style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'var(--vkui--color_background_secondary)',
            color: 'var(--vkui--color_text_primary)',
            borderRadius: 8,
            padding: '2px 10px',
            fontSize: 15,
            fontWeight: 600,
            zIndex: 2,
            boxShadow: 'var(--vkui--shadow_card)',
          }}>
            ★ {movie.rating.kp.toFixed(1).toString()}
          </div>
        </div>
        <div style={{ padding: '16px 16px 18px 16px', background: 'var(--vkui--color_background_content)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 17, color: 'var(--vkui--color_text_primary)', lineHeight: '20px', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{movie.name}</span>
            {/* Кнопка 'В избранное' */}
            <button
              style={{
                background: 'var(--vkui--color_background_secondary)',
                border: 'none',
                width: 36,
                height: 36,
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              tabIndex={-1}
              aria-label="Добавить в избранное"
            >
              <HeartIcon size={22} color="#ff5c5c" weight="duotone" />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--vkui--color_text_secondary)', fontSize: 15 }}>{movie.year}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;