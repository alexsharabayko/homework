import React from 'react';
import css from './App.module.scss';
import { Users } from './components/users/Users';
import { Header } from './components/header/Header';

export function App() {
  return (
    <div className={css.app}>
      <Header />

      <div className={css.content}>
        <Users />
      </div>
    </div>
  );
}
