import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  latitude: 14.990560497078805,
  latitudeDelta: 0.1,
  longitude: 103.10202894732356,
  longitudeDelta: 0.1,
};

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    setPositionSlice: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setPositionSlice} = positionSlice.actions;

export default positionSlice.reducer;
