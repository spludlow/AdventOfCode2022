// var lineReader = require('readline').createInterface({
//     input: require('fs').createReadStream('day6/input6.txt')
//   });

// let index = 0;
  
// lineReader.on('line', (line) => {
//     const signal = line.split("");
//     let previous = [];
//     for(let i = 0; i < signal.length; i++) {
//         const char = signal[i];
//         previous.push(char);
//        if(previous.length >= 4) {
//         const hasDuplicates = (new Set(previous)).size !== previous.length;
//         if(!hasDuplicates) {
//             index = i+1;
//             break;
//         }
//         previous.shift();
//        }
//     }
// });

// lineReader.on('close', () => {
//     console.log(index);
// })

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('day6/input6.txt')
  });

let index = 0;
  
lineReader.on('line', (line) => {
    const signal = line.split("");
    let previous = [];
    for(let i = 0; i < signal.length; i++) {
        const char = signal[i];
        previous.push(char);
       if(previous.length >= 14) {
        const hasDuplicates = (new Set(previous)).size !== previous.length;
        if(!hasDuplicates) {
            index = i+1;
            break;
        }
        previous.shift();
       }
    }
});

lineReader.on('close', () => {
    console.log(index);
})