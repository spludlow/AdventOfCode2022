
const handShape = {
    A: {
        shape: 'Rock',
        loses: 'Paper',
        beats: 'Scissors',
    },
    B: {
        shape: 'Paper',
        loses: 'Scissors',
        beats: 'Rock',
    },
    C: {
        shape: 'Scissors',
        loses: 'Rock',
        beats: 'Paper',
    },
};

const points = {
    Rock: 1,
    Paper: 2,
    Scissors: 3,
}

var finalPoints = 0;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input2.txt')
  });
  
  lineReader.on('line', function (line) {
    const inputs = line.split(" ");
    const opponent = handShape[inputs[0]];
    let us = null;
    const roundResult = inputs[1];

    if(roundResult === 'X'){
        // lose
        us = opponent.beats;
    } else if (roundResult === 'Y') {
        // draw
        finalPoints += 3;
        us = opponent.shape;
    } else {
        // win
        finalPoints += 6;
        us = opponent.loses;
    }

    finalPoints += points[us];
    
  });

  lineReader.on("close", () => {
    console.log(finalPoints);
  })
