export enum UserStatus {
  WORKING = 'working',
  LUNCH = 'lunch',
  VACATION = 'vacation',
  TRIP = 'trip',
}

export interface IUser {
  id: number;
  name: string;
  status: UserStatus;
  updatedAt: string;
  createdAt: string;
  avatarUrl?: string;
}

export interface IUserStatusOption {
  status: UserStatus;
  title: string;
  color: string;
}

