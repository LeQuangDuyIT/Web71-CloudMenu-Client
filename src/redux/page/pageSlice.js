import { createSlice } from '@reduxjs/toolkit';
import { fetchPagesOfUser } from './pageActions';

const initialState = {
  openPageCreateForm: false,
  pageList: [],
  activePage: null,
  isLoading: false,
  reload: null
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setOpenPageCreateForm: state => {
      state.openPageCreateForm = !state.openPageCreateForm;
    },
    setActivePage: (state, action) => {
      state.activePage = state.pageList.find(page => page._id === action.payload);
    },
    reloadPage: state => {
      state.reload = Math.random();
    }
  },
  extraReducers: builder =>
    builder
      .addCase(fetchPagesOfUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPagesOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pageList = action.payload;
      })
      .addCase(fetchPagesOfUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
});

export const { setActivePage, reloadPage, setOpenPageCreateForm } = pageSlice.actions;

export default pageSlice.reducer;
