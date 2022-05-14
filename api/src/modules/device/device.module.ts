import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeviceService } from './device.service';
import { Device } from './device.entity';
import { DeviceController } from './device.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  providers: [DeviceService],
  controllers: [DeviceController],
  exports: [DeviceService],
})
export class DeviceModule {}
