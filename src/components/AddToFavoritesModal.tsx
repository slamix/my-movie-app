import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../slices/favoritesSlice';
import { setClose } from '../slices/modalSlice';
import type { RootState } from '../slices';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

const AddToFavoritesModal = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state: RootState) => state.modal.currentMovie);
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  const onClose = () => dispatch(setClose());
  const onAdd = () => {
    dispatch(addFavorite(movie));
    dispatch(setClose());
  };

  if (!isOpen || !movie) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, position: 'relative' } }}
    >
      <IconButton
        aria-label="Закрыть"
        onClick={onClose}
        sx={{ position: 'absolute', top: 12, right: 12, zIndex: 1 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle sx={{ fontWeight: 700, fontSize: 22, pb: 1, pr: 5 }}>
        Фильм «{movie.name}»
      </DialogTitle>
      <DialogContent sx={{ pt: 0 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Добавить фильм в избранное?</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 1, display: 'flex', gap: 2 }}>
        <Button variant="outlined" color="inherit" fullWidth onClick={onClose} sx={{ fontWeight: 700 }}>
          Отмена
        </Button>
        <Button variant="contained" color="warning" fullWidth onClick={onAdd} sx={{ fontWeight: 700 }}>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToFavoritesModal; 