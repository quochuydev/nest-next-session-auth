import { Module } from '@nestjs/common';
import { OauthClientService } from './oauth-client.service';

@Module({
  providers: [OauthClientService],
  exports: [OauthClientService],
})
export class OauthClientModule {}
