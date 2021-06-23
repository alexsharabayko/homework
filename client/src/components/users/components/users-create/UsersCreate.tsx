import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@material-ui/core';
import { UsersStatusSelector } from '../users-status-selector/UsersStatusSelector';
import { IUser, UserStatus } from '../../../../domains/user';
import css from './UsersCreate.module.scss';

interface IProps {
  open: boolean;
  onCancel: () => void;
  onCreate: (data: Pick<IUser, 'name' | 'status'>) => void;
}

export function UsersCreate({ open, onCancel, onCreate }: IProps) {
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<UserStatus>(UserStatus.WORKING);

  const handleSubmit = () => {
    onCreate({ name, status });
    setName('');
    setStatus(UserStatus.WORKING);
  };

  const handleCancel = () => {
    onCancel();
    setName('');
    setStatus(UserStatus.WORKING);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
    >
      <div className={css.wrapper}>
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Create New User
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              label="Name"
              value={name}
              onChange={event => setName(event.target.value)}
              className={css.text}
            />
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <UsersStatusSelector
            label="Status"
            status={status}
            withIcons={false}
            onChange={newStatus => setStatus(newStatus)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
