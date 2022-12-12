// class Monkey {
//     items = [];
//     operation = (old) => old;
//     testDiv = 1;
//     tMonk = null;
//     fMonk = null;
//     numInspect = 0;

//     constructor() {
//     }

//     inspect = (old) => {
//         this.numInspect++;
//         return Math.floor(this.operation(old) / 3);
//     }

//     test = () => {
//         this.items.forEach((oldWorry) => {
//             const newWorry = this.inspect(oldWorry);
//             if (newWorry % this.testDiv === 0) {
//                 this.tMonk.items.push(newWorry);
//             } else {
//                 this.fMonk.items.push(newWorry);
//             }
//         });
//         this.items = [];
//     }
// }

// var lineReader = require('readline').createInterface({
//     input: require('fs').createReadStream('day11/input11.txt')
// });

// const mSections = [];
// let index = 0;
// const monkeys = [new Monkey()];

// lineReader.on('line', (line) => {
//     if (line === "") {
//         index++;
//         monkeys.push(new Monkey());
//     } else {
//         if (mSections[index]) {
//             mSections[index].push(line.trim());
//         } else {
//             mSections[index] = [line.trim()];
//         }
//     }
// });

// lineReader.on('close', () => {

//     mSections.forEach((section, sNum) => {
//         const monkey = monkeys[sNum];
//         section.forEach((line) => {
//             const [name, input] = line.split(": ");
//             switch (name) {
//                 case 'Starting items':
//                     const items = input.split(", ");
//                     monkey.items = items.map(i => parseInt(i));
//                     break;
//                 case 'Operation':
//                     const returnVal = input.split("= ")[1];
//                     monkey.operation = eval(`(old) => {return ${returnVal};}`)
//                     break;
//                 case 'Test':
//                     const div = input.split(" ")[2];
//                     monkey.testDiv = parseInt(div);
//                     break;
//                 case 'If true':
//                     const t = parseInt(input.split(" ")[3]);
//                     monkey.tMonk = monkeys[t];
//                     break;
//                 case 'If false':
//                     const f = parseInt(input.split(" ")[3]);
//                     monkey.fMonk = monkeys[f];
//                     break;
//                 default:
//                     break;
//             }
//         })
//     });

//     for (let i = 0; i < 20; i++) {
//         monkeys.forEach((monkey) => {
//             monkey.test();
//         });
//     }

//     const inspectNums = monkeys.map((monkey) => monkey.numInspect);
//     inspectNums.sort((a, b) => b - a);
//     console.log(inspectNums);

//     console.log(inspectNums[0] * inspectNums[1]);
// });

class Monkey {
    items = [];
    operation = (old) => old;
    testDiv = 1;
    tMonk = null;
    fMonk = null;
    numInspect = 0;

    constructor() {
    }

    inspect = (old) => {
        this.numInspect++;
        return this.operation(old);
    }

    test = (divisor) => {
        this.items.forEach((oldWorry) => {
            const newWorry = this.inspect(oldWorry) % allDivisors;
            if (newWorry % this.testDiv === 0) {
                this.tMonk.items.push(newWorry);
            } else {
                this.fMonk.items.push(newWorry);
            }
        });
        this.items = [];
    }
}

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('day11/input11.txt')
});

const mSections = [];
let index = 0;
const monkeys = [new Monkey()];
let allDivisors = 1;

lineReader.on('line', (line) => {
    if (line === "") {
        index++;
        monkeys.push(new Monkey());
    } else {
        if (mSections[index]) {
            mSections[index].push(line.trim());
        } else {
            mSections[index] = [line.trim()];
        }
    }
});

lineReader.on('close', () => {

    mSections.forEach((section, sNum) => {
        const monkey = monkeys[sNum];
        section.forEach((line) => {
            const [name, input] = line.split(": ");
            switch (name) {
                case 'Starting items':
                    const items = input.split(", ");
                    monkey.items = items.map(i => parseInt(i));
                    break;
                case 'Operation':
                    const returnVal = input.split("= ")[1];
                    monkey.operation = eval(`(old) => {return ${returnVal};}`)
                    break;
                case 'Test':
                    const div = input.split(" ")[2];
                    monkey.testDiv = parseInt(div);
                    allDivisors *= parseInt(div);
                    break;
                case 'If true':
                    const t = parseInt(input.split(" ")[3]);
                    monkey.tMonk = monkeys[t];
                    break;
                case 'If false':
                    const f = parseInt(input.split(" ")[3]);
                    monkey.fMonk = monkeys[f];
                    break;
                default:
                    break;
            }
        })
    });

    for (let i = 0; i < 10000; i++) {
        monkeys.forEach((monkey) => {
            monkey.test();
        });
    }

    const inspectNums = monkeys.map((monkey) => monkey.numInspect);
    inspectNums.sort((a, b) => b - a);

    console.log(inspectNums[0] * inspectNums[1]);
});
