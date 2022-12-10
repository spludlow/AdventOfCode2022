// var lineReader = require('readline').createInterface({
//     input: require('fs').createReadStream('day9/input9.txt')
// });

// class Vector {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }

//     moveLeft = () => {
//         this.x--;
//     }

//     moveRight = () => {
//         this.x++;
//     }

//     moveUp = () => {
//         this.y++;
//     }

//     moveDown = () => {
//         this.y--;
//     }

//     setPos = (vector) => {
//         this.x = vector.x;
//         this.y = vector.y;
//     }

//     getPos = () => {
//         return { x: this.x, y: this.y };
//     }
// }

// let headPos = new Vector(0, 0);
// let tailPos = new Vector(0, 0);
// let prevHead = new Vector(0, 0);

// let posTailVisited = [];
// posTailVisited.push(tailPos.getPos());

// function getDistance(x1, y1, x2, y2) {
//     let y = x2 - x1;
//     let x = y2 - y1;

//     return Math.sqrt(x * x + y * y);
// }

// lineReader.on('line', (line) => {
//     // get input
//     const [dir, num] = line.split(" ");
//     for (let step = 0; step < parseInt(num); step++) {
//         prevHead.setPos(headPos);
//         if (dir === 'R') {
//             headPos.moveRight();
//         } else if (dir === "L") {
//             headPos.moveLeft();
//         } else if (dir === "U") {
//             headPos.moveUp();
//         } else if (dir === "D") {
//             headPos.moveDown();
//         }
//         if (getDistance(tailPos.x, tailPos.y, headPos.x, headPos.y) > Math.sqrt(2)) {
//             tailPos.setPos(prevHead);
//             posTailVisited.push(tailPos.getPos());
//         }
//     }
// });

// lineReader.on('close', () => {
//     posTailVisited = posTailVisited.filter((value, index, self) =>
//         index === self.findIndex((t) => (
//             t.x === value.x && t.y === value.y
//         ))
//     )
//     console.log(posTailVisited.length);
// })

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('day9/input9.txt')
});

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    moveLeft = () => {
        this.x--;
    }

    moveRight = () => {
        this.x++;
    }

    moveUp = () => {
        this.y++;
    }

    moveDown = () => {
        this.y--;
    }

    setPos = (vector) => {
        this.x = vector.x;
        this.y = vector.y;
    }

    getPos = () => {
        return { x: this.x, y: this.y };
    }

    getStringPos = () => {
        return `${this.x}/${this.y}`;
    }
}

let posArray = [];

for (let i = 0; i < 10; i++) {
    posArray.push(new Vector(0, 0));
}

let posTailVisited = new Set();
posTailVisited.add(posArray[9].getStringPos());

lineReader.on('line', (line) => {
    // get input
    const [dir, num] = line.split(" ");
    for (let step = 0; step < parseInt(num); step++) {
        if (dir === 'R') {
            posArray[0].moveRight();
        } else if (dir === "L") {
            posArray[0].moveLeft();
        } else if (dir === "U") {
            posArray[0].moveUp();
        } else if (dir === "D") {
            posArray[0].moveDown();
        }
        for (let i = 0; i < 9; i++) {
            // if head move further than 1 square
            const thisPos = posArray[i];
            const nextPos = posArray[i + 1];
            const diffX = thisPos.x - nextPos.x;
            const diffY = thisPos.y - nextPos.y;
            const diffXAbs = Math.abs(diffX);
            const diffYAbs = Math.abs(diffY);
            if (diffXAbs < 2 && diffYAbs < 2) {
                break;
            }
            if (diffXAbs > 1 && !diffYAbs) {
                nextPos.x += diffX > 0 ? 1 : -1;
            } else if (diffYAbs > 1 && !diffXAbs) {
                nextPos.y += diffY > 0 ? 1 : -1;
            } else {
                nextPos.x += diffX > 0 ? 1 : -1;
                nextPos.y += diffY > 0 ? 1 : -1;
            }
            if (i == 8) {
                posTailVisited.add(posArray[9].getStringPos());
            }
        }
    }
});

lineReader.on('close', () => {
    console.log(posTailVisited.size);
})