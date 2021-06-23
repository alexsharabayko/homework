import React, { useEffect } from 'react';
import { UsersActions } from './components/users-actions/UsersActions';
import { UsersList } from './components/users-list/UsersList';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { apiFetchUsers, selectUsers } from '../../redux/slices/users/usersSlice';
import css from './Users.module.scss';

export function Users() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);

  useEffect(() => {
    dispatch(apiFetchUsers());
  }, []);

  return (
    <div className={css.wrapper}>
      <UsersActions/>

      <UsersList users={users} />
    </div>
  );
}
