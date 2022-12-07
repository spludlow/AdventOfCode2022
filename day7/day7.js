var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('day7/input7.txt')
  });


class DirNode {
    constructor(name) {
        this.name = name;
        this.descendants = [];
        this.parent = null;
        this.size = 0;
    }
}

class FileEx {
    constructor(size) {
        this.size = size;
    }
}

const rootDir = new DirNode('/');

const directories = [rootDir];

var curDir = rootDir;
  
lineReader.on('line', (line) => {
    const inputs = line.split(" ");
    if(inputs[0] === "$") {
        // if line starts with $
        if(inputs[1] === "cd") {
            if(inputs[2] === "..") {
                // go up parent
                curDir = curDir.parent;
            } else if(inputs[2] === "/") {
                curDir = rootDir;
            } else {
                // set current node
                curDir = curDir.descendants.find((node) => node.name === inputs[2]);
            }
        }
    } else {
        // this should be children of the current node
        if(inputs[0] === 'dir') {
            // make a new directory
            const newDir = new DirNode(inputs[1]);
            newDir.parent = curDir;
            curDir.descendants.push(newDir);
            directories.push(newDir);
        } else {
            // add file
            const size = parseInt(inputs[0]);
            curDir.descendants.push(new FileEx(size));
            curDir.size += size;
            let parentDir = curDir.parent;
            while(parentDir){
                parentDir.size += size;
                parentDir = parentDir.parent;
            }
        }
    }
});

lineReader.on('close', () => {
    let maxSize = 70000000;
    let unused = 30000000;
    let emptySize = unused  - (maxSize - rootDir.size);
    let delSize = null;
    directories.forEach((dir) => {
        if(dir.size >= emptySize) {
            if(!delSize){
                delSize = dir.size;
            } else if (dir.size < delSize){
                delSize = dir.size;
            }
        }
    });
    console.log(delSize);
})