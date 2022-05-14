import {
  Controller,
  UseGuards,
  HttpCode,
  Post,
  HttpStatus,
  Body,
  Put,
  Param,
} from "@nestjs/common";

import { AuthUser } from "../../core/decorators";
import { CrudController } from "../../packages/crud";
import { Notification } from "./notification.entity";
import { NotificationDto } from "./notification.dto";
import { NotificationService } from "./notification.service";

@Controller("notifications")
export class NotificationAdminController extends CrudController<Notification> {
  constructor(private readonly notificationService: NotificationService) {
    super(notificationService);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @AuthUser("id") userId: string,
    @Body() body: any
  ): Promise<Notification> {
    return this.notificationService.create({ userId, ...body });
  }
}
