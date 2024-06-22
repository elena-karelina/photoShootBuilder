import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  id: string | null;
  fullName: string | null;
  city: string | null;
  tg: string | null;
  inst: string | null;
}
export const initialState: UserState = {
  id: null,
  token: null,
  fullName: null,
  city: null,
  tg: null,
  inst: null,
};
interface SetUserPayload {
  token?: string;
  id?: string;
  fullName: string;
  city?: string;
  tg?: string;
  inst?: string;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<SetUserPayload>) {
      state.token = action.payload.token ? action.payload.token : state.token;
      state.id = action.payload.id ? action.payload.id : state.id;
      state.fullName = action.payload.fullName;
      state.city = action.payload.city ? action.payload.city : state.city;
      state.tg = action.payload.tg ? action.payload.tg : state.tg;
      state.inst = action.payload.inst ? action.payload.inst : state.inst;
    },
    removeUser(state) {
      state.token = null;
      state.id = null;
      state.fullName = null;
      state.city = null;
      state.tg = null;
      state.inst = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
