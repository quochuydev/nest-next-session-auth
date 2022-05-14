import { Get, Controller, Post, Body } from '@nestjs/common';
import { CrudController } from '../../packages/crud';
import { Setting } from './setting.entity';
import { SettingService } from './setting.service';
import { SettingDto } from './setting.dto';

@Controller('settings')
export class SettingController extends CrudController<Setting> {
  constructor(private readonly settingService: SettingService) {
    super(settingService);
  }

  @Get()
  list() {
    return this.settingService.list();
  }

  @Post('set')
  set(@Body() data: SettingDto): Promise<Setting> {
    return this.settingService.set(data.key, data.value);
  }
}
