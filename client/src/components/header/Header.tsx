import React from 'react';
import css from './Header.module.scss';
import { Button } from '@material-ui/core';

export function Header() {
  return (
    <header className={css.header}>
      <div className={css.logo}>Employees</div>

      <div className={css.actions}>
        <Button variant="outlined" color="primary">
          Log in
        </Button>
      </div>
    </header>
  );
}
