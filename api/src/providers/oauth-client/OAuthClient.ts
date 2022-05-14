import { FacebookStrategy, GoogleStrategy, IStrategy } from './strategies';

export class OAuthClient {
  private strategies: { [key: string]: IStrategy } = {};

  private static singleton: OAuthClient;

  constructor() {
    this.strategies.facebook = new FacebookStrategy();
    this.strategies.google = new GoogleStrategy();
  }

  private static getInstance(): OAuthClient {
    if (!OAuthClient.singleton) {
      OAuthClient.singleton = new OAuthClient();
    }
    return OAuthClient.singleton;
  }

  static getStrategy(key: string): IStrategy | undefined {
    return OAuthClient.getInstance().strategies[key];
  }

  static getProviders(): string[] {
    const { strategies } = this.getInstance();
    return Object.keys(strategies);
  }

  static register(key: string, strategy: IStrategy): void {
    console.log(`[OAuthClient] Register key: ${key}`);
    OAuthClient.getInstance().strategies[key] = strategy;
  }
}
