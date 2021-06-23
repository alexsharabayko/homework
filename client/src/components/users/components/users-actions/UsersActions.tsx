import React, { useState } from 'react';
import { Button, FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { UsersCreate } from '../users-create/UsersCreate';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import {
  apiCreateUser,
  setSearch,
  setActiveStatus,
  selectActiveStatus, selectSearch
} from '../../../../redux/slices/users/usersSlice';
import { IUser } from '../../../../domains/user';
import css from './UsersActions.module.scss';
import { UsersStatusSelector } from '../users-status-selector/UsersStatusSelector';

export function UsersActions() {
  const dispatch = useAppDispatch();
  const activeStatus = useAppSelector(selectActiveStatus);
  const search = useAppSelector(selectSearch);
  const [open, setOpen] = useState<boolean>(false);

  const handleUserCreate = (userData: Pick<IUser, 'name' | 'status'>) => {
    dispatch(apiCreateUser(userData));
    setOpen(false);
  };

  return (
    <div className={css.wrapper}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        endIcon={<Icon>add</Icon>}
        onClick={() => setOpen(true)}
      >
        Create
      </Button>

      <div className={css.filters}>
        <div className={css.search}>
            <Input
              placeholder="Type to search"
              startAdornment={<InputAdornment position="start"><Icon>search</Icon></InputAdornment>}
              value={search}
              className={css.input}
              onChange={event => dispatch(setSearch(event.target.value))}
            />
        </div>

        <div>
          <UsersStatusSelector status={activeStatus} onChange={(status) => dispatch(setActiveStatus(status))} allowEmpty={true} />
        </div>
      </div>

      <UsersCreate open={open} onCancel={() => setOpen(false)} onCreate={handleUserCreate}/>
    </div>
  );
}
