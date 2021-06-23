import React from 'react';
import { IUser } from '../../../../domains/user';
import { Avatar, Card } from '@material-ui/core';
import css from './UsersList.module.scss';
import { UsersItem } from '../users-item/UsersItem';

interface IProps {
  users: IUser[];
}

export function UsersList(props: IProps) {
  return (
    <ul className={css.list}>
      {props.users.map(user => {
        return <UsersItem user={user} key={user.id} />
      })}
    </ul>
  );
}
