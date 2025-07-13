import { createSlice } from "@reduxjs/toolkit";
import type { APIMovie } from "../types/types";

type CurrentMovie = APIMovie | null;

interface ModalState {
  currentMovie: CurrentMovie;
  isOpen: boolean;
}

const initialState: ModalState = {
  currentMovie: null,
  isOpen: false,
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpen: (state, { payload }) => {
      state.currentMovie = payload;
      state.isOpen = true;
    },
    setClose: (state) => {
      state.currentMovie = null;
      state.isOpen = false;
    }
  }
});

export const { setOpen, setClose } = modalSlice.actions;
export default modalSlice.reducer;