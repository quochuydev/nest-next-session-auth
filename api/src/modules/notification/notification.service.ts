import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FcmService } from 'src/providers/fcm/fcm.service';
import { IsNull, Not, Repository } from 'typeorm';

import { CrudService } from '../../packages/crud';
import { Device } from '../device/device.entity';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService extends CrudService<Notification> {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    private readonly fcmService: FcmService,
  ) {
    super(notificationRepository);
  }

  async create(data: Partial<Notification>): Promise<Notification> {
    const devices = await this.deviceRepository.find({
      where: { token: Not(IsNull()) },
    });
    const tokens = devices.map((e) => e.token);
    console.log('tokens', tokens.length);

    const notification = new Notification(data);
    if (tokens.length) {
      this.fcmService.sendNotification(
        tokens,
        {
          data: {
            title: data.title,
          },
          notification: {
            title: data.title,
            body: data.body,
          },
        },
        false,
      );
    }
    return this.notificationRepository.save(notification);
  }
}
