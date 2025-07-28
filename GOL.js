class Empty { }

// Grass starts with a random energy between 0 and 2.
// It gains 1 energy every frame.
// When it reaches 7 energy, it creates a new grass object
// in an empty neighbour cell and resets its energy to 0.
class Grass {
    constructor() {
        this.stepCount = frameCount + 1;
        this.color = "green";

        // set initial energy to a random value between 0 and 2
        // to make grass grow look more natural
        this.energy = int(random(0, 3));
    }

    step() {
        // every step, grass gains 1 energy
        this.energy++;

        // if grass has 7 energy, multiply and reset energy
        if (this.energy >= 7) {
            this.multiply();
            this.energy = 0;
        }
    }

    multiply() {
        // look for empty neighbour cells
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);

        // if there is at least one empty cell,
        // choose a random one and create a new grass object
        if (emptyFields.length > 0) {
            let randomEmptyField = random(emptyFields);
            let row = randomEmptyField[0];
            let col = randomEmptyField[1];
            matrix[row][col] = new Grass();
        }
    }
}

// GrassEater looks for grass in its neighbour cells.
// If it finds grass, it moves to that cell, eats the grass and gains 1 energy.
// If it doesn't find grass, it moves to a random empty neighbour cell and loses 1 energy.
// If it has 10 energy, it creates a new grass eater object in an empty neighbour cell
// and loses 5 energy.
// If it has 0 energy, it dies and becomes an empty cell.
class GrassEater {
    constructor() {
        this.stepCount = frameCount + 1;
        this.color = "yellow";
        this.energy = 5;
    }

    step() {
        let grassFields = findNeighbourPositions(this.row, this.col, 1, Grass);
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);

        if (grassFields.length > 0) {
            let randomGrassField = random(grassFields);
            updateCreaturePosition(this, randomGrassField);
            this.energy++;

        } else {
            if (emptyFields.length>0){
                let randomEmptyField = random(emptyFields);
                updateCreaturePosition(this, randomEmptyField);
            }
            this.energy--;

        }

        if(this.energy == 10){
            this.multiply();
        }
        
        if(this.energy == 0){
            this.deadth();
        }
        

    }

    multiply() {
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);

        if (emptyFields.length > 0) {
            let randomEmptyField = random(emptyFields);
            let row = randomEmptyField[0];
            let col = randomEmptyField[1];
            matrix[row][col] = new GrassEater();
            this.energy -= 5;

        }
    }

    deadth() {
        if(this.energy == 0){
           matrix[this.row][this.col] = new Empty();
        }
    }
}

// MeatEater looks for grass eater in its neighbour cells.
// If it finds grass eater, it moves to that cell, eats the grass eater and gains 10 energy.
// If it doesn't find grass eater, it loses 1 energy.
// If it has 120 energy, it creates a new meat eater object in an empty neighbour cell
// and loses 100 energy.
class MeatEater {
    constructor() {
        this.stepCount = frameCount + 1;
        this.color = "red";
        this.energy = 60;
    }

    step() {
        let grassEaterFields = findNeighbourPositions(this.row, this.col, 1, GrassEater);
        //let VogelFields = findNeighbourPositions(this.row, this.col, 1, Vogel);
        //let EiFields = findNeighbourPositions(this.row, this.col, 1, Ei);

       // let allFields = [...grassEaterFields, ...VogelFields, ...EiFields]

        if (grassEaterFields.length > 0) {
            let randomField = random(grassEaterFields);
            updateCreaturePosition(this, randomField);
            this.energy += 10;
        } else {
            this.energy--;

        }

        if(this.energy == 120){
            this.multiply();
        }
        
        if(this.energy == 0){
            this.deadth();
        }
    }

    multiply() {
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);

        if (emptyFields.length > 0) {
            let randomEmptyField = random(emptyFields);
            let row = randomEmptyField[0];
            let col = randomEmptyField[1];
            matrix[row][col] = new MeatEater();
        }
    }

    deadth() {
        if(this.energy == 0){
           matrix[this.row][this.col] = new Empty();
        }
    }

}

class Ash {
    constructor() {
        this.stepCount = frameCount + 1;
        this.color = "#433737";
        this.energy = int(random(40, 50));

    }

    step(){
        this.energy--;
        this.dicappearance();

    }

    dicappearance(){
        if(this.energy == 0){
            matrix[this.row][this.col] = new Empty();
         }
    }
}

class Dragon {
    constructor() {
        this.stepCount = frameCount + 1;
        this.color = "#922121";
        this.energy = 1000;

    }

    step() {
        let MeatEaterFields = findNeighbourPositions(this.row, this.col, 2, MeatEater);

        if(MeatEaterFields.length > 0) {
            let randomField = random(MeatEaterFields);
            updateCreaturePosition(this, randomField);
            let Fields = findNeighbourPositions(this.row, this.col, 2, Object);
            for(let i=0; i<Fields.length; i++){
                let row = Fields[i][0]
                let col = Fields[i][1]
                if (!(matrix[row][col] instanceof Empty)){
                    matrix[row][col] = new Ash();
                }
            }
            this.energy += 5;

        } else if(MeatEaterFields.length == 0){
            this.bewegung();
        }

        if(this.energy == 0){
            this.deadth();
        }
    }

    bewegung(){
        let grassFields = findNeighbourPositions(this.row, this.col, 1, Grass);
        let EmptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);

        this.energy--;

        if (grassFields.length > 0 && this.energy % 5 == 0) {
            let randomGrassField = random(grassFields);
            updateCreaturePosition(this, randomGrassField);
    
        } else if(EmptyFields.length > 0 && this.energy % 5 == 0){
            let randomGrassField2 = random(EmptyFields);
            updateCreaturePosition(this, randomGrassField2);
        }
    }

    deadth() {
        if(this.energy == 0){
           matrix[this.row][this.col] = new Empty();
        }
    }
}

// list of lists. Contains all creatures.
let matrix = [];
// size of the matrix, how many cells in width and height
let matrixSize = 200;
// display size in pixels of each cell
let blockSize = 5;

// What probability each creature has to be created
let creaturePropabilities = [
    [Grass, 0.25],
    [GrassEater, 0.05],
    [MeatEater, 0.025],
    [Dragon, 0.0005]
];

// Choose a random creature based on the probabilities
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

// randomly fill the matrix with creatures based on the probabilities
function fillRandomMatrix() {
    for (let row = 0; row < matrixSize; row++) {
        matrix.push([]);
        for (let col = 0; col < matrixSize; col++) {
            matrix[row][col] = getRandomCreature();
        }
    }
}


// update the position of a creature in the matrix
// Creates a new empty object in the old position
function updateCreaturePosition(creature, newPos) {
    let newRow = newPos[0];
    let newCol = newPos[1];
    matrix[newRow][newCol] = creature;
    matrix[creature.row][creature.col] = new Empty();
    creature.row = newRow;
    creature.col = newCol;
}


// for a given position, find all neighbour positions contain a certain
// creature type and are within a certain distance
// returns a list of [row, col] positions
// example: findNeighbourPositions(10, 10, 1, Empty) will return all empty cells
// around position 10, 10 within a distance of 1. If all cells are empty, it will return
// [[9, 9], [9, 10], [9, 11], [10, 9], [10, 11], [11, 9], [11, 10], [11, 11]]
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

// setup the canvas and fill the matrix with creatures
// Will be called once at the start
function setup() {
    createCanvas(matrixSize * blockSize, matrixSize * blockSize);
    fillRandomMatrix();
    noStroke();
    frameRate(30);
}

// game loop. This will be called every frame
// It will draw the matrix and update the creatures
function draw() {
    background(200)
    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            let obj = matrix[row][col];

            // skip empty cells
            if (obj instanceof Empty) continue;

            // set the row and col of the creature
            obj.row = row;
            obj.col = col;

            // this prevents newly created creatures from being updated in the same step
            // and creatures that move from being updated multiple times in one frame
            if (obj.stepCount === frameCount) {
                obj.step();
                obj.stepCount++;
            }

            // draw the creature
            fill(obj.color);
            if (obj instanceof Dragon){
                rect(blockSize * (obj.col-1), blockSize * (obj.row-1), blockSize*2, blockSize*2);

            }else{

                rect(blockSize * obj.col, blockSize * obj.row, blockSize, blockSize);
            }
        }
    }
}