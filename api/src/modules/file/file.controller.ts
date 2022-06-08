import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Get,
  Param,
  Res,
  Query,
} from "@nestjs/common";
import { diskStorage } from "multer";
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";
import { FileService } from "./file.service";
import { editDestination, editFileName } from "./file.util";
import env from "../../config/enviroment";

const options = "local"
  ? {
      limits: { fileSize: 30 * 1024 * 1024 },
      storage: diskStorage({
        destination: editDestination,
        filename: editFileName,
      }),
    }
  : {
      limits: { fileSize: 30 * 1024 * 1024 },
    };

@Controller("/files")
export class FileController {
  constructor(private fileService: FileService) {}

  @Get()
  paginate(@Query() query: any) {
    return this.fileService.paginate(query);
  }

  @Post()
  @UseInterceptors(FilesInterceptor("files", 10, options))
  async uploads(@Body() data: { type: string }, @UploadedFiles() upload: any) {
    console.log({ upload });

    const result = {
      files: await this.fileService.uploads(upload, data),
    };
    console.log("controller", result);

    return result;
  }

  @Get("/:year/:month/:date/:filename")
  getImage(@Param() param, @Res() res) {
    const { year, month, date, filename } = param;
    const data = res.sendFile(filename, {
      root: `./files/${year}/${month}/${date}`,
    });
    return { status: 200, data };
  }
}
