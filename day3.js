var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input3.txt')
  });

  var prioritySum = 0;
  var elfGroup = [];
  var index = 0;
  
  lineReader.on('line', function (line) {
    elfGroup[index] = line;

    if(elfGroup.length !== 3) {
        index++;
        return;
    }

    elfGroup.sort((a,b) => b.length - a.length);

    for(let i = 0; i < elfGroup[0].length; i++){
        const letter = elfGroup[0][i];
        // check second group
        if(elfGroup[1].includes(letter)) {
            // check third group
            if(elfGroup[2].includes(letter)) {
                // get priority number
                if(letter === letter.toUpperCase()){
                    prioritySum += elfGroup[0].charCodeAt(i) - 38;
                } else {
                    prioritySum += elfGroup[0].charCodeAt(i) - 96;
                }
                elfGroup = [];
                index = 0;
                return;
            }
        }
    }

  });

  lineReader.on("close", () => {
    console.log(prioritySum);
  })
