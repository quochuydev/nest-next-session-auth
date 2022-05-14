import { IStrategy } from '../interfaces';
import { BaseStrategy } from './base.strategy';

export class GoogleStrategy extends BaseStrategy implements IStrategy {
  name = 'google-plus-strategy';

  host = 'oauth2.googleapis.com';

  identityPath = '/tokeninfo?access_token=';

  idField = 'sub';

  nameField = 'name';
}
