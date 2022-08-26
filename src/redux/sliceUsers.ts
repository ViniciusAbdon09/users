import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../services/userServices/models/user-model";
import { userDefault } from "../utils/userDefault";

const INITIAL_STATE: UserModel[] = [userDefault];

const sliceUsers = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  reducers: {
    addUser(state, { payload }: PayloadAction<UserModel>) {
      return [...state, { ...payload, id: state.length + 1 }];
    },
    removeUser(state, { payload }: PayloadAction<number>) {
      return state.filter((user) => user.id !== payload);
    },
    updateUser(state, { payload }: PayloadAction<UserModel>) {
      return state.map((user) => {
        if (Number(user.id) === Number(payload.id)) {
          return payload;
        }

        return user;
      });
    },
  },
});

export default sliceUsers.reducer;
export const { addUser, removeUser, updateUser } = sliceUsers.actions;
export const useUsers = (state: any) => {
  return state.users as UserModel[];
};
