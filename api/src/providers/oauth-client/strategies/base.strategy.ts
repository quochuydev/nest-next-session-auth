import * as https from 'https';
import * as _ from 'lodash';
import { IStrategy, IUser } from '../interfaces';

export abstract class BaseStrategy implements IStrategy {
  name: string;

  host: string;

  identityPath: string;

  idField = 'id';

  emailField = 'email';

  nameField = 'name';

  async getIdentity(accessToken: string): Promise<IUser> {
    const path = this.identityPath + accessToken;
    const options = {
      protocol: 'https:',
      hostname: this.host,
      port: 443,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': 0,
      },
    };
    return new Promise((resolve, reject) => {
      const req = https
        .request(options, (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            data = <any>JSON.parse(data);
            console.log(data);
            resolve({
              providerId: _.get(data, this.idField, null),
              email: _.get(data, this.emailField, ''),
              name: _.get(data, this.nameField, ''),
            });
          });
        })
        .on('error', (err) => {
          reject(err);
        });
      req.end();
    });
  }
}
