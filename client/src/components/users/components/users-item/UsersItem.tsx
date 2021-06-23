import React from 'react';
import { IUser } from '../../../../domains/user';
import { Avatar, Card } from '@material-ui/core';
import css from './UsersItem.module.scss';
import { useAppDispatch } from '../../../../redux/hooks';
import { apiUpdateUser } from '../../../../redux/slices/users/usersSlice';
import { UsersStatusSelector } from '../users-status-selector/UsersStatusSelector';

interface IProps {
  user: IUser;
}

export function UsersItem({ user }: IProps) {
  const dispatch = useAppDispatch();

  return (
    <li key={user.id} className={css.item}>
      <Card className={css.card}>
        <Avatar alt={user.name} src={user.avatarUrl} className={css.avatar}/>

        <div className={css.content}>
          <UsersStatusSelector
            status={user.status}
            onChange={status => dispatch(apiUpdateUser(user.id, { status }))}
          />

          <div className={css.name}>
            {user.name}
          </div>
        </div>
      </Card>
    </li>
  );
}
