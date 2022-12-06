// var lineReader = require('readline').createInterface({
//     input: require('fs').createReadStream('day5/input5.txt')
//   });

// const stacks = [];
// let stacking = true;
  
// lineReader.on('line', (line) => {
//     if(!line) {
//         stacking = false;
//         return;
//     }
//     if(stacking){
//         if(line.includes("[")){
//             // put boxes in stacks
//             let index = 0;
//             // for every 4th index
//             for(let i = 1; i < line.length; i += 4) {
//                 // if there is a letter
//                 if(line[i].match(/[a-z]/i)) {
//                     // add it to a stack
//                     if(stacks[index]) {
//                         stacks[index].push(line[i]);
//                     } else {
//                         stacks[index] = [line[i]];
//                     }
//                 }
//                 index++;
//             }
//         }
//     } else {
//         // move boxes from stacks
//         const inst = line.match(/\d+/gi); // number of boxes, from, to
//         for(let i = 1; i <= inst[0]; i++) {
//             const moved = stacks[parseInt(inst[1]) - 1].shift();
//             stacks[parseInt(inst[2]) - 1].unshift(moved);
//         }
//     }
// });

// lineReader.on('close', () => {
//     let firstBox = '';
//     stacks.forEach((stack) => {
//         firstBox += stack[0];
//     });
//     console.log(firstBox);
// })
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('day5/input5.txt')
  });

const stacks = [];
let stacking = true;
  
lineReader.on('line', (line) => {
    if(!line) {
        stacking = false;
        return;
    }
    if(stacking){
        if(line.includes("[")){
            // put boxes in stacks
            let index = 0;
            // for every 4th index
            for(let i = 1; i < line.length; i += 4) {
                // if there is a letter
                if(line[i].match(/[a-z]/i)) {
                    // add it to a stack
                    if(stacks[index]) {
                        stacks[index].push(line[i]);
                    } else {
                        stacks[index] = [line[i]];
                    }
                }
                index++;
            }
        }
    } else {
        // move boxes from stacks
        const inst = line.match(/\d+/gi); // number of boxes, from, to
        const moving = [];

        for(let i = 1; i <= inst[0]; i++) {
            moving.push(stacks[parseInt(inst[1]) - 1].shift());
        }
        stacks[parseInt(inst[2]) - 1].unshift(...moving);
    }
});

lineReader.on('close', () => {
    let firstBox = '';
    stacks.forEach((stack) => {
        firstBox += stack[0];
    });
    console.log(firstBox);
})