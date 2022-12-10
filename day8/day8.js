// var lineReader = require('readline').createInterface({
//     input: require('fs').createReadStream('day8/input8.txt')
// });

// const trees = [];

// lineReader.on('line', (line) => {
//     const heights = line.split('');
//     trees.push(heights);
// });

// lineReader.on('close', () => {
//     let numVisible = 0;
//     let numRows = trees.length;
//     let numCols = trees[0].length;

//     // first + last row is visible
//     numVisible += numCols * 2;
//     // first + last of middle rows visible
//     numVisible += (numRows - 2) * 2;

//     // check for others visible
//     for (let row = 1; row < numRows - 1; row++) {
//         for (let col = 1; col < numCols - 1; col++) {
//             const height = trees[row][col];
//             const leftTrees = trees[row].slice(0, col);
//             const rightTrees = trees[row].slice(col + 1);
//             const upTrees = [];
//             const downTrees = []
//             trees.forEach((r, i) => {
//                 if (i < row) {
//                     upTrees.push(r[col]);
//                 } else if (i > row) {
//                     downTrees.push(r[col]);
//                 }
//             });
//             let visible = false;
//             const treesCompare = [leftTrees, rightTrees, upTrees, downTrees];
//             treesCompare.forEach((direction) => {
//                 if (direction.every((tree) => parseInt(tree) < height)) {
//                     visible = true;
//                 }
//             });
//             if (visible) numVisible++;
//         }
//     }

//     console.log(numVisible);
// })

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('day8/input8.txt')
});

const trees = [];

lineReader.on('line', (line) => {
    const heights = line.split('');
    trees.push(heights);
});

lineReader.on('close', () => {
    let highScore = 0;
    let numRows = trees.length;
    let numCols = trees[0].length;

    // check for others visible
    for (let row = 1; row < numRows - 1; row++) {
        for (let col = 1; col < numCols - 1; col++) {
            const height = trees[row][col];
            const leftTrees = trees[row].slice(0, col);
            const rightTrees = trees[row].slice(col + 1);
            const upTrees = [];
            const downTrees = []
            trees.forEach((r, i) => {
                if (i < row) {
                    upTrees.push(r[col]);
                } else if (i > row) {
                    downTrees.push(r[col]);
                }
            });
            const treesCompare = [leftTrees.reverse(), rightTrees, upTrees.reverse(), downTrees];
            let treeScore = [];
            treesCompare.forEach((direction) => {
                let dirScore = 0;
                for (let i = 0; i <= direction.length - 1; i++) {
                    const tree = parseInt(direction[i]);
                    if (tree < height) {
                        dirScore++;
                    } else {
                        dirScore++;
                        break;
                    }
                }
                treeScore.push(dirScore);
            });
            const score = treeScore.reduce((ac, cur) => ac * cur, 1);

            if (score > highScore) highScore = score;
        }
    }

    console.log(highScore);
})