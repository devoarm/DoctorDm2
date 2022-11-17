import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  f_name: '',
  l_name: '',
  cid: '',
  email: '',
  uid: '',
  phone:'',
  photoURL: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSlice: (state, action) => {
      state.f_name = action.payload.f_name;
      state.l_name = action.payload.l_name;
      state.cid = action.payload.cid;
      state.uid = action.payload.uid;
      state.photoURL = action.payload.photoURL;
      state.phone = action.payload.phone;
    },
    logout: state => {
      state.f_name = '';
      state.l_name = '';
      state.cid = '';
      state.uid = '';
      state.photoURL = '';
      state.phone = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUserSlice} = userSlice.actions;

export default userSlice.reducer;
