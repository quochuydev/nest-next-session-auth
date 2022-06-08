import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { NotificationService } from "./notification.service";
import { Notification } from "./notification.entity";
import { NotificationAdminController } from "./notification.admin.controller";
// import { FcmModule } from "../../";
import { Device } from "../device/device.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Device])],
  providers: [NotificationService],
  controllers: [NotificationAdminController],
  exports: [NotificationService],
})
export class NotificationModule {}
