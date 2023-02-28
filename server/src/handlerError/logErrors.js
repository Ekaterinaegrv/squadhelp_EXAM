const fs = require('fs');
const path = require('path');
const readline = require('readline'); 

const env = process.env.NODE_ENV || 'development';
const devFilePath = path.resolve(__dirname, '..', '..', 'public/logErrors');

const filePath = env === 'production'
  ? '/var/www/html/logErrors'
  : devFilePath;

  
if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  })
  .appendFileSync(`${filePath}/logfile.txt`)

}


module.exports.loggerErrors = (err) => {
    const errorsText = `{message: "${err.message}", time: ${Date.parse(new Date())}, code: ${err.code}, stackTrace: {${err.stack}}} \n`;
    fs.writeFileSync(`${filePath}/logfile.txt`, errorsText, {flag: "a+"});
}

module.exports.writeToFile = (err) => {
  const readInterface = readline.createInterface({ 
    input: fs.createReadStream(`${filePath}/logfile.txt`), 
    console: false 
    });

    readInterface.on('line', function(line) { 
    if (line.includes('{message: "')) {  
  
      const part1 = line.indexOf(',');
      const part2 = line.indexOf('code: ', part1);
      const part3 = line.indexOf(',', part2);
      const part4 = line.indexOf('time: ', part3);
      const part5 = line.indexOf(',', part4);

      const message = line.slice(0, part1);
      const time = line.slice(part4, part5);
      const code = line.slice(part2, part3);
  
      const textToDateFile = `${message}, ${code}, ${time}} \n`;
       
      fs.writeFileSync(`${filePath}/${new Date().toISOString()}.txt`, textToDateFile, {flag: "a+"});

      } 
    
    }).on('close', ()=>{
      fs.truncateSync(`${filePath}/logfile.txt`);
      
    })
}

