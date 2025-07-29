class eigenschaften{
    constructor(color, energy) {
        this.stepCount = frameCount + 1;
        this.color = color;
        this.energy = energy;
    }

    death() {
        if(this.energy <= 0){
           matrix[this.row][this.col] = new Empty();
        }
    }
}

class Empty { }

class Grass extends eigenschaften{
    constructor() {
        super("green", int(random(0, 3)));
    }

    step() {
        this.energy++;

        if (this.energy >= 7) {
            this.multiply();
            this.energy = 0;
        }
    }

    multiply() {
        let emptyFields = findNeighbourPositions(this.row, this.col, 1, Empty);

        if (emptyFields.length > 0) {
            let randomEmptyField = random(emptyFields);
            let row = randomEmptyField[0];
            let col = randomEmptyField[1];
            matrix[row][col] = new Grass();
        }
    }
}

class GrassEater extends eigenschaften {
    constructor() {
        super("yellow", 5);
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
        
        this.death();
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
}

class MeatEater extends eigenschaften {
    constructor() {
        super("red", 60);
    }

    step() {
        let grassEaterFields = findNeighbourPositions(this.row, this.col, 1, GrassEater);

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
        
        this.death();
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
}

class Ash extends eigenschaften {
    constructor() {
        super("#433737", int(random(40, 50)));
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

class Dragon extends eigenschaften {
    constructor() {
        super("#922121", 1000);
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

        this.death();
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
}


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