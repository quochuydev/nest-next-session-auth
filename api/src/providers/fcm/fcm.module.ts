import {
  DynamicModule,
  Global,
  Logger,
  Module,
  Provider,
} from '@nestjs/common';
import { FcmService } from './fcm.service';
import { FCM_OPTIONS } from './fcm.constants';
import { FcmOptions } from './fcm-options.interface';

@Global()
@Module({})
export class FcmModule {
  static forRoot(options: FcmOptions): DynamicModule {
    const optionsProvider: Provider = {
      provide: FCM_OPTIONS,
      useValue: options,
    };

    const loggerProvider: Provider = {
      provide: Logger,
      useValue: new Logger('FcmService'),
    };

    return {
      module: FcmModule,
      providers: [FcmService, optionsProvider, loggerProvider],
      exports: [FcmService],
    };
  }
}
