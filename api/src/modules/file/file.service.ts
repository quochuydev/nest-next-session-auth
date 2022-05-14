import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as sharp from "sharp";
import * as fs from "fs";

import env from "../../config/enviroment";
import { File } from "./file.entity";
import { IServiceFile } from "./file.interface";
import { genKey } from "./file.util";

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>
  ) {}

  paginate(query: any) {
    return this.fileRepository.find({});
  }

  uploads(files, data): Promise<File[]> {
    return Promise.all(files.map((file) => this.upload(file, data)));
  }

  async upload(file: any, data?: Partial<File>): Promise<File> {
    const payload = await this._upload(file);
    const newFile = new File({
      contentType: file.mimetype,
      size: file.size,
      key: payload.key,
      url: payload.url,
      ...data,
    });
    return newFile.save();
  }

  async _upload(file: any): Promise<IServiceFile> {
    const filename = `${Date.now()}-${file.filename}`;
    const filepath = `${file.destination}/${filename}`;
    await sharp(file.path)
      // .resize(320, 240)
      .jpeg({ quality: 100 })
      .toFile(filepath);
    fs.unlinkSync(file.path);
    return {
      key: filename,
      url: `${env.app.host}/${filepath}`,
    };
  }

  _uploadBuffer(file): IServiceFile {
    return {
      key: genKey(file),
      url: ``,
    };
  }
}
