var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input4.txt')
  });

  let count = 0;

  lineReader.on('line', (line) => {
    let range = line.split(",");
    range = range.map((input) => {
        const inputs = input.split("-");
        const start = parseInt(inputs[0]);
        const end = parseInt(inputs[1]);
        return {start, end};
    });

    if(range[0].start <= range[1].start && range[0].end >= range[1].start){
        // if range 0 start is less than range 1 start
        // and range 0 end is greater than range 1 start
        count++;
    } else if (range[1].start <= range[0].start && range[1].end >= range[0].start){
        // or vice versa
        count++;
    }
  });

  
  lineReader.on("close", () => {
    console.log(count);
  });