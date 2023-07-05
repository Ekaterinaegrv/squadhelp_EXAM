const fs = require('fs');
const path = require('path');
const {LOG_FILE, BACKUP_FIlE} = require('../constants')
const env = process.env.NODE_ENV || 'development';
const devFilePath = path.resolve(__dirname, '..', '..', 'public/logErrors');

const filePath = env === 'production'
  ? '/var/www/html/logErrors'
  : devFilePath;

const timestamp = Date.parse(new Date());

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  })
  .appendFileSync(`${filePath}/${LOG_FILE}`)
}
const writeToFile = (file, errorData, option) => {
  fs.writeFile(`${filePath}/${file}`, errorData, option ? option : null, (writeErr) => {
    if (writeErr) {
      console.error('Failed to log error:', writeErr);
    } else {
      console.log('Error logged successfully:', file);
    }
  });
}
module.exports.loggerErrors = (err) => {
    const error = {
      message: err.message,
      time: timestamp,
      code: err.code,
      stackTrace: err.stack
    };
    fs.readFile(`${filePath}/${LOG_FILE}`, 'utf8', (err, data) => {
      if (err) {
        console.error(`Failed to read log file: ${filePath}/${LOG_FILE}`, err);
        return;
      }  
      let errorLog = [];

      if (data.length > 0) {
        try {
          errorLog = JSON.parse(data);
        } catch (parseError) {
          console.error('Failed to parse log file:', parseError);
          return;
        }
      }
      errorLog.push(error);

      const errorData = JSON.stringify(errorLog, null, 2);
      
      writeToFile(LOG_FILE, errorData, { flag: 'w' });
    });
}

module.exports.createErrorBackupFile = (err) => {
  fs.readFile(`${filePath}/${LOG_FILE}`, 'utf8', (err, data) => {
    if (err) {
      console.error(`Failed to read log file: ${filePath}/${LOG_FILE}`, err);
      return;
    }
    let errorLog = [];
    let transformedData

    if (data.length > 0) {
      try {
        errorLog = JSON.parse(data);
        transformedData = transformLogFile(errorLog)
      } catch (parseError) {
        console.error('Failed to parse log file:', parseError);
        return;
      }
    
    writeToFile(BACKUP_FIlE, transformedData);

    fs.truncate(`${filePath}/${LOG_FILE}`, 0, (err) => {
      if (err) {
        console.error('Failed to clear log file:', err);
      } else {
        console.log('Log file cleared successfully:', LOG_FILE);
      }
    });
  }
  });
}

function transformLogFile(data) {

  const transformedLines = [];
  let error;
  for (let line of data) {
    try {
      const transformedError = {
        message: line.message,
        code: line.code,
        time: line.time
      };

      transformedLines.push(transformedError); 
      error = JSON.stringify(transformedLines, null, 2); 
      
    } catch (err) {
      console.error('Failed to parse error:', err);
    }
  }
  return error;
};
