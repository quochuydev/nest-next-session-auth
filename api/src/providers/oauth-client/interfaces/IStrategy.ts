import { IUser } from './IUser';

export interface IStrategy {
  name: string;
  host?: string;
  identityPath?: string;
  idField?: string;
  emailField?: string;
  nameField?: string;
  getIdentity(accessToken: string): Promise<IUser>;
}
