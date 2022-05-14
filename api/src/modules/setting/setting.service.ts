import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '../../packages/crud';
import { Setting } from './setting.entity';
import constants from './constants';

@Injectable()
export class SettingService extends CrudService<Setting> {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {
    super(settingRepository);
  }

  async list() {
    const settings = await this.settingRepository.find();
    const config: any = {};
    settings.forEach((e: any) => {
      return constants[e.key] ? (config[e.key] = decode(e)) : null;
    });
    return config;
  }

  async get(key: string, _default?: any) {
    const setting = await this.settingRepository.findOne({ key });
    if (!setting) {
      if (typeof _default !== 'undefined') {
        return _default;
      }

      throw new NotFoundException();
    }
    return decode(setting);
  }

  async set(key: string, value: any): Promise<Setting> {
    const setting = await this.settingRepository.findOne({ key });
    if (!setting) {
      throw new NotFoundException();
    }
    Object.assign(setting, { value: encode({ key, value }) });
    return this.settingRepository.save(setting);
  }
}

function encode({ key, value }) {
  switch (constants[key]['type']) {
    case 'json':
      return JSON.stringify(value);
    default:
      return String(value);
  }
}

function decode({ key, value }) {
  switch (constants[key]['type']) {
    case 'number':
      return Number(value);
    case 'json':
      return JSON.parse(value);
    default:
      return value;
  }
}
