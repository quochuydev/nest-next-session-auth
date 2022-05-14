import { IStrategy } from '../interfaces';
import { BaseStrategy } from './base.strategy';

export class FacebookStrategy extends BaseStrategy implements IStrategy {
  name = 'facebook-strategy';

  host = 'graph.facebook.com';

  identityPath =
    '/v7.0/me?fields=id,email,name,first_name,last_name,gender,birthday,about&access_token=';
}
