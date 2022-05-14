import { v4 } from 'uuid';
import slugify from 'slugify';
import * as fs from 'fs';
import * as moment from 'moment';

export function genKey(file) {
  const id = v4().split('-')[4];
  return `${id}-${slugify(file.originalname, { lower: true })}`;
}

export const editDestination = (req, file, cb) => {
  const path = `./files/${moment().year()}/${moment().month()}/${moment().date()}`;
  fs.mkdirSync(path, { recursive: true });
  return cb(null, path);
};

export const editFileName = (req, file, callback) => {
  const name = genKey(file);
  callback(null, name);
};
