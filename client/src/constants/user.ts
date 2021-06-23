import { IUserStatusOption, UserStatus } from '../domains/user';

export const USER_STATUS_OPTIONS: IUserStatusOption[] = [
  {
    status: UserStatus.WORKING,
    title: 'Working',
    color: '#4caf50',
  },
  {
    status: UserStatus.LUNCH,
    title: 'On Lunch',
    color: '#ff9800',
  },
  {
    status: UserStatus.VACATION,
    title: 'On Vacation',
    color: '#f44336',
  },
  {
    status: UserStatus.TRIP,
    title: 'Business Trip',
    color: '#dc004e',
  }
];
