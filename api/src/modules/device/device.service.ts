import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FcmService } from 'src/providers/fcm/fcm.service';
import { Repository } from 'typeorm';
import { CrudService } from '../../packages/crud';
import { Device } from './device.entity';

@Injectable()
export class DeviceService extends CrudService<Device> {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    private readonly fcmService: FcmService,
  ) {
    super(deviceRepository);
  }
}
