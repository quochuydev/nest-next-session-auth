import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response, Request } from 'express';
import { I18nService } from 'nestjs-i18n';
import * as _ from 'lodash';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const data = <any>exception.getResponse();

    const _host = _.cloneDeep(host);
    if (_host.contextType === 'graphql') {
      return exception;
    }

    if (typeof data.message === 'string') {
      const lang = request.header('lang') || 'en';
      const message = await this.i18n.translate(`error.${data.message}`, {
        lang,
      });
    }

    response.status(status).json(data);
  }
}
