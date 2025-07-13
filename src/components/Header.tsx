import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const go = (to: string) => {
    navigate(`${to}${search}`, { replace: false });
  };

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        bgcolor: 'white',
        color: 'text.primary',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10), 0 1.5px 4px 0 rgba(0,0,0,0.08)',
        height: { xs: 48, sm: 56 },
        justifyContent: 'center',
      }}
    >
      <Toolbar
        sx={{
          width: '100%',
          minHeight: { xs: '48px !important', sm: '56px !important' },
          px: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        disableGutters
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1200,
            mx: 'auto',
            px: { xs: 1, sm: 4 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            gap: { xs: 1, sm: 0 },
          }}
        >
          {/* Логотип */}
          <Button
            onClick={() => go('/')}
            sx={{
              color: 'text.primary',
              fontWeight: 700,
              fontSize: { xs: 16, sm: 20 },
              letterSpacing: -1,
              textTransform: 'none',
              p: 0,
              m: 0,
              minWidth: 0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              maxWidth: { xs: 160, sm: 240 },
            }}
            aria-label="На главную"
          >
            My movie app
          </Button>

          {/* Навигация */}
          <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1.5 } }}>
            <IconButton
              onClick={() => go('/')}
              sx={{
                bgcolor: pathname === '/' ? '#f5f5f5' : 'transparent',
                borderRadius: 2,
                p: { xs: 0.5, sm: 1 },
                transition: 'background 0.2s',
              }}
              aria-label="Главная"
            >
              <MovieCreationOutlinedIcon
                sx={{
                  color: pathname === '/' ? '#ffb300' : 'text.primary',
                  fontSize: { xs: 22, sm: 24 },
                }}
              />
            </IconButton>

            <IconButton
              onClick={() => go('/favorites')}
              sx={{
                bgcolor: pathname === '/favorites' ? '#f5f5f5' : 'transparent',
                borderRadius: 2,
                p: { xs: 0.5, sm: 1 },
                transition: 'background 0.2s',
              }}
              aria-label="Избранное"
            >
              {pathname === '/favorites' ? (
                <FavoriteIcon
                  sx={{ color: '#ff5c5c', fontSize: { xs: 22, sm: 24 } }}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{ color: 'text.primary', fontSize: { xs: 22, sm: 24 } }}
                />
              )}
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
