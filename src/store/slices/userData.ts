// Add redux toolkit slice with user data, to begin with handle favorite coins array

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface UserDataState {
  favoriteCoins: string[];
}

const initialState: UserDataState = {
  favoriteCoins: [],
};

export const userDataSlice = createSlice({
  name: 'userDataSlice',
  initialState,
  reducers: {
    addFavoriteCoin: (state, action: PayloadAction<string>) => {
      state.favoriteCoins.push(action.payload);
    },
    removeFavoriteCoin: (state, action: PayloadAction<string>) => {
      state.favoriteCoins = state.favoriteCoins.filter(
        coin => coin !== action.payload,
      );
    },
  },
});

export const {addFavoriteCoin, removeFavoriteCoin} = userDataSlice.actions;
export const favouriteCoinsSelector = (state: RootState) =>
  state.userDataSlice.favoriteCoins;
