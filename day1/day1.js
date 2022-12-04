const elfArray = [];
let index = 0;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input1.txt')
  });
  
  lineReader.on('line', function (line) {
    if(line) {
        elfArray[index] = (elfArray[index] || 0) + parseInt(line);
    } else {
        index++;
    }
  });

  lineReader.on("close", () => {
    elfArray.sort((a,b) => parseInt(b) - parseInt(a));
    console.log(elfArray[0] + elfArray[1] + elfArray[2]);
  })
