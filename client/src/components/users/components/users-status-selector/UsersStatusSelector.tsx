import React from 'react';
import { UserStatus } from '../../../../domains/user';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import css from './UsersStatusSelector.module.scss';
import { USER_STATUS_OPTIONS } from '../../../../constants/user';

interface IProps {
  status?: UserStatus;
  onChange: (status: UserStatus) => void;
  withIcons?: boolean;
  label?: string;
  allowEmpty?: boolean;
}

export function UsersStatusSelector({ status, onChange, label, withIcons = true, allowEmpty = false }: IProps) {
  const renderValue = status || 'none';

  const handleSelect = (event: any) => {
    const value = (event.target.value === 'none' ? '' : event.target.value) as UserStatus;
    onChange(value);
  };

  return (
    <>
      {label ? <InputLabel className={css.label}>{label}</InputLabel> : null}
      <Select
        value={renderValue}
        label={label}
        className={css.select}
        onChange={handleSelect}
      >
        {allowEmpty && <MenuItem value="none">
					Filter by status
				</MenuItem>}
        {USER_STATUS_OPTIONS.map(option => {
          return (
            <MenuItem value={option.status} key={option.status}>
              {withIcons && <span className={css.circle} style={{ borderColor: option.color }}/>}

              <span className={css.title}>{option.title}</span>
            </MenuItem>
          )
        })}
      </Select>
    </>
  );
}
