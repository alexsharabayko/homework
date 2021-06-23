import { createSlice } from '@reduxjs/toolkit';
import { IUser, UserStatus } from '../../../domains/user';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { AppThunk, RootState } from '../../store';
import axios from 'axios';
import { IListResponse } from '../../../domains/common';

export interface ICounterState {
  list: IUser[];
  search?: string;
  activeStatus?: UserStatus;
}

const initialState: ICounterState = {
  list: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state: ICounterState, action: PayloadAction<IUser[]>) => {
      state.list = action.payload;
    },

    updateUser: (state: ICounterState, action: PayloadAction<IUser>) => {
      state.list = state.list.map(user => {
        return user.id === action.payload.id ? action.payload : user;
      });
    },

    addUser: (state: ICounterState, action: PayloadAction<IUser>) => {
      state.list = state.list.concat([action.payload]);
    },

    setSearch: (state: ICounterState, action: PayloadAction<string | undefined>) => {
      state.search = action.payload;
    },

    setActiveStatus: (state: ICounterState, action: PayloadAction<UserStatus | undefined>) => {
      state.activeStatus = action.payload;
    },
  },
});

export const { setUsers, addUser, updateUser, setSearch, setActiveStatus } = usersSlice.actions;

export const apiFetchUsers = (): AppThunk<Promise<void>> => {
  return (dispatch, getState) => {
    return axios.get<IListResponse<IUser>>('http://localhost:8877/users')
      .then(res => {
        dispatch(setUsers(res.data.rows));
      });
  };
};

export const apiCreateUser = (userData: Pick<IUser, 'name' | 'status'>): AppThunk<Promise<void>> => {
  return (dispatch, getState) => {
    return axios.post<IUser>(`http://localhost:8877/users`, userData)
      .then(res => {
        dispatch(addUser(res.data));
      });
  };
};

export const apiUpdateUser = (id: number, userData: Partial<IUser>): AppThunk<Promise<void>> => {
  return (dispatch, getState) => {
    return axios.patch<IUser>(`http://localhost:8877/users/${id}`, userData)
      .then(res => {
        dispatch(updateUser(res.data));
      });
  };
};

export const selectSearch= (state: RootState) => state.users.search;
export const selectActiveStatus = (state: RootState) => state.users.activeStatus;

export const selectUsers = (state: RootState) => {
  const search = selectSearch(state);
  const activeStatus = selectActiveStatus(state);
  let users = state.users.list;

  if (activeStatus) {
    users = users.filter(user => user.status === activeStatus);
  }

  if (search) {
    users = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
  }

  return users;
};
