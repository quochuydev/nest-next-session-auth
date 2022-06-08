import { Injectable } from '@nestjs/common';
import { OAuthClient } from './OAuthClient';
import { IUser } from './interfaces';

@Injectable()
export class OauthClientService {
  async getIdentity(provider: string, token: string): Promise<IUser> {
    const strategy = OAuthClient.getStrategy(provider);

    if (!strategy) {
      throw Error('STRATEGY_NOT_REGISTER');
    }

    return strategy.getIdentity(token);
  }

  getProviders(): string[] {
    return OAuthClient.getProviders();
  }
}
