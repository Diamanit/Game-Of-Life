let matrix = [];
let matrixSize = 200;
let blockSize = 5;

let creaturePropabilities = [
    [Grass, 0.5],
    [GrassEater, 0.05],
    [MeatEater, 0.025],
    [Dragon, 0.0005]
];

function getRandomCreature() {
    let rand = random();
    let sum = 0;
    for (let i = 0; i < creaturePropabilities.length; i++) {
        let creatureCLass = creaturePropabilities[i][0];
        let propability = creaturePropabilities[i][1];
        sum += propability;
        if (rand < sum) {
            return new creatureCLass();
        }
    }
    return new Empty();
}

function fillRandomMatrix() {
    for (let row = 0; row < matrixSize; row++) {
        matrix.push([]);
        for (let col = 0; col < matrixSize; col++) {
            matrix[row][col] = getRandomCreature();
        }
    }
}

function updateCreaturePosition(creature, newPos) {
    let newRow = newPos[0];
    let newCol = newPos[1];
    matrix[newRow][newCol] = creature;
    matrix[creature.row][creature.col] = new Empty();
    creature.row = newRow;
    creature.col = newCol;
}

function findNeighbourPositions(row, col, distance, creatureType) {
    let positions = [];
    for (let nCol = col - distance; nCol <= col + distance; nCol++) {
        for (let nRow = row - distance; nRow <= row + distance; nRow++) {
            let inMatrix = nCol >= 0 && nCol < matrixSize && nRow >= 0 && nRow < matrixSize;
            let isSamePosition = nCol === col && nRow === row;
            if (inMatrix && !isSamePosition && matrix[nRow][nCol] instanceof creatureType) {
                positions.push([nRow, nCol]);
            }
        }
    }
    return positions;
}

function setup() {
    createCanvas(matrixSize * blockSize, matrixSize * blockSize);
    fillRandomMatrix();
    noStroke();
    frameRate(30);
    addEventListeners();
}

function draw() {
    background(200)
    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            let obj = matrix[row][col];

            if (obj instanceof Empty) continue;

            obj.row = row;
            obj.col = col;

            if (obj.stepCount === frameCount) {
                obj.step();
                obj.stepCount++;
            }

            fill(obj.color);
            if (obj instanceof Dragon){
                rect(blockSize * (obj.col-1), blockSize * (obj.row-1), blockSize*2, blockSize*2);

            }else{

                rect(blockSize * obj.col, blockSize * obj.row, blockSize, blockSize);
            }
        }
    }
}

function addEventListeners(){

    let restartBotton = document.images;
    
    console.log(restartBotton);
    
    for(let i = 0; i < restartBotton.length; i++){
        restartBotton[i].addEventListener("mouseover", function(){
            restartBotton[i].src = "neustart (1).png";
        });
        
        restartBotton[i].addEventListener("mouseout", function(){
            restartBotton[i].src = "neustart.png";
        });
        
        restartBotton[i].addEventListener("click", function(){
            fillRandomMatrix();
            frameRate(30);
        });
    }
}