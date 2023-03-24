const fs = require('fs');
const path = require('path');
const multer = require('multer');
const ServerError = require('../errors/ServerError');
const env = process.env.NODE_ENV || 'development';
const devFilePath = path.resolve(__dirname, '..', '..', 'public/images');

  const filePath = env === 'production'
      ? '/var/www/html/images/'
      : devFilePath;

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, {
        recursive: true,
      });
 }

const uploadFile = (file, next) => {
  if (file) {
      const storage = multer.diskStorage({
          destination: function (req, file, cb) {
              cb(null, filePath)
          },
          filename: function (req, file, cb) {
              cb(null, Date.now() + file.originalname)
          }
      })
      if(file === 'files') {
        return multer({ storage }).array('files', 3);
      } else {
        return multer({ storage }).single(file);
      } 
      
  } else {
      next(new ServerError());
  }
}

module.exports = uploadFile;