// var lineReader = require('readline').createInterface({
//     input: require('fs').createReadStream('day10/input10.txt')
// });

// let x = 1;
// let cycle = 0;

// let signalStrength = 0;

// checkCycle = () => {
//     return cycle % 40 === 20;
// }

// increaseCycle = () => {
//     cycle++;
//     if (checkCycle()) {
//         signalStrength += cycle * x;
//     }
// }

// lineReader.on('line', (line) => {
//     const [action, val] = line.split(" ");

//     if (action === "noop") {
//         increaseCycle();
//     } else {
//         increaseCycle();
//         increaseCycle();
//         x += parseInt(val);
//     }
// });

// lineReader.on('close', () => {
//     console.log(signalStrength);
// })
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('day10/input10.txt')
});

let x = 1;
let cycle = 0;

const crt = [];

checkCycle = () => {
}

increaseCycle = () => {
    if (cycle >= x - 1 && cycle <= x + 1) {
        crt.push("#");
    } else {
        crt.push(".");
    }

    if (cycle >= 39 && cycle % 39 === 0) {
        cycle = 0;
    } else {
        cycle++;
    }
}

lineReader.on('line', (line) => {
    const [action, val] = line.split(" ");
    if (action === "noop") {
        increaseCycle();
    } else {
        increaseCycle();
        increaseCycle();
        x += parseInt(val);
    }
});

lineReader.on('close', () => {
    for (let i = 0; i < 6; i++) {
        console.log(crt.slice(i * 40, (i + 1) * 40).join(""));
    }
})