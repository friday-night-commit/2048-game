import type { Request } from 'express';

import multer from 'multer';

const storage = multer.diskStorage({
  filename(_: Request, file: Express.Multer.File, cb: any) {
    cb(null, `${file.originalname}`);
  },
});

const fileFilter = (
  _: Request,
  file: Express.Multer.File,
  cb: (ar1: any, ar2: boolean) => void
) => {
  // eslint-disable-next-line no-console
  console.log('UPLOADS');
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const limits = {
  fileSize: 1024 * 1024 * 50,
};

module.exports = multer({ storage, fileFilter, limits });
