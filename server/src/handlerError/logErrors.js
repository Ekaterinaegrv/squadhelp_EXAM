const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const devFilePath = path.resolve(__dirname, '..', '..', 'public/logErrors');

const filePath = env === 'production'
  ? '/var/www/html/logErrors'
  : devFilePath;

  
if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  }).appendFileSync(`${filePath}/logfile.txt`);

}


module.exports.loggerErrors = (err) => {
    const errorsText = `{message: "${err.message}", 
    time: ${Date.parse(new Date())}, 
    code: ${err.code}, 
    stackTrace: {${err.stack}}
   } \n`;
    fs.writeFileSync(`${filePath}/logfile.txt`, errorsText, {flag: "a+"});
}