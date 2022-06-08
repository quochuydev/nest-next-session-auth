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
import { Device } from "./device.entity";
import { DeviceDto } from "./device.dto";
import { DeviceService } from "./device.service";

@Controller("devices")
export class DeviceController extends CrudController<Device> {
  constructor(private readonly deviceService: DeviceService) {
    super(deviceService);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@AuthUser("id") userId: string, @Body() body: any): Promise<Device> {
    return this.deviceService.create({ userId, ...body });
  }
}
