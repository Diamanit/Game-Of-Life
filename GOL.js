let matrix = [];
let matrixSize = 200;
let blockSize = 5;
let jahreszeit = [0, 1];
let Index = 0;
let framerate = 30;

let grassEnergy = 7;
let grassEaterEnergy = 10;
let meatEaterEnergy = 120;
let meatEaterAnzahl = 0.025;

let creaturePropabilities = [
    [Grass, 0.5],
    [GrassEater, 0.05],
    [MeatEater, meatEaterAnzahl],
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

function findNeighbourPositions(row, col, distance, creatureType, filter) {
    if(filter == undefined){
        filter = (...args)=>true
    }
    let positions = [];
    for (let nCol = col - distance; nCol <= col + distance; nCol++) {
        for (let nRow = row - distance; nRow <= row + distance; nRow++) {
            let inMatrix = nCol >= 0 && nCol < matrixSize && nRow >= 0 && nRow < matrixSize;
            let isSamePosition = nCol === col && nRow === row;
            if (inMatrix && !isSamePosition && matrix[nRow][nCol] instanceof creatureType && filter(matrix[nRow][nCol], nRow, row, nCol, col)) {
                positions.push([nRow, nCol]);
            }
        }
    }
    return positions;
}

let zaehler;

function setup() {
    createCanvas(matrixSize * blockSize, matrixSize * blockSize);
    fillRandomMatrix();
    noStroke();
    frameRate(30);
    grassInHTML = document.getElementById("grass");
    grassEaterInHTML = document.getElementById("grasseater");
    meatEaterInHTML = document.getElementById("meateater");
    dragonInHTML = document.getElementById("dragon");       
}    

let grassInHTML;
let grassEaterInHTML;
let meatEaterInHTML;
let dragonInHTML;

function draw() {
    zaehler = {
        "grass": 0,
        "grasseater": 0,
        "meateater": 0,
        "dragon": 0
    }

    background(200)
    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            let obj = matrix[row][col];

            if (obj instanceof Grass) zaehler.grass += 1;
            if (obj instanceof GrassEater) zaehler.grasseater += 1;
            if (obj instanceof MeatEater) zaehler.meateater += 1;
            if (obj instanceof Dragon) zaehler.dragon += 1;

            if (obj instanceof Empty) continue;

            obj.row = row;
            obj.col = col;

            if (obj.stepCount === frameCount) {
                obj.step();
                obj.stepCount++;
            }

            let c = obj.color
            if(Array.isArray(obj.color)){
                c = obj.color[jahreszeit[Index]]
            }
            // console.log(obj.color, c)
            fill(c);

            if (obj instanceof Dragon){
                rect(blockSize * (obj.col-1), blockSize * (obj.row-1), blockSize*2, blockSize*2);

            }else{

                rect(blockSize * obj.col, blockSize * obj.row, blockSize, blockSize);
            }
        }
    }

    grassInHTML.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&#x2022;&nbsp;&nbsp;&nbsp;&nbsp;Grass - gr&uuml;n " + zaehler.grass;
    grassEaterInHTML.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&#x2022;&nbsp;&nbsp;&nbsp;&nbsp;Grassfresser - gelb " + zaehler.grasseater;
    meatEaterInHTML.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&#x2022;&nbsp;&nbsp;&nbsp;&nbsp;Fleischfresser - rot " + zaehler.meateater;
    dragonInHTML.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&#x2022;&nbsp;&nbsp;&nbsp;&nbsp;Drachen - weinrot " + zaehler.dragon;
    // console.log(zähler);

    // c.data.datasets[0].data = [zaehler.grass, zaehler.grasseater, zaehler.meateater, zaehler.dragon];
    c.data.datasets[0].data.push(zaehler.grass);
    c.update();

}
let lightningActive = false;
let dragonActive = false;



document.addEventListener("DOMContentLoaded", function (){

    let restartButton = document.getElementsByClassName("restartButton");
    let blitzButton = document.getElementsByClassName("blitzButton");
    let dragonButton = document.getElementsByClassName("dragonSpawn");
    let jahresZeitButton = document.getElementsByClassName("jahresZeitButton");
    
    for(let i = 0; i < restartButton.length; i++){
        restartButton[i].addEventListener("mouseover", function(){
            restartButton[i].src = "neustart (1).png";
        });
        
        restartButton[i].addEventListener("mouseout", function(){
            restartButton[i].src = "neustart.png";
        });
        
        restartButton[i].addEventListener("click", function(){
            fillRandomMatrix();
            frameRate(framerate);
        });

        restartButton[i].addEventListener("mousedown", function(){
            restartButton[i].style.backgroundColor = "#252525";
        });

        restartButton[i].addEventListener("mouseup", function(){
            restartButton[i].style.backgroundColor = "#363636";
        });
    }

    for(let i = 0; i < blitzButton.length; i++){
        blitzButton[i].addEventListener("mousedown", function(){
            blitzButton[i].style.backgroundColor = "rgb(0, 124, 146)";
        });

        blitzButton[i].addEventListener("mouseup", function(){
            blitzButton[i].style.backgroundColor = "rgb(0, 217, 255)";
        });

        blitzButton[i].addEventListener("click", function(){
            lightningActive = !lightningActive
            dragonActive = false
            dragonButton[i].style.boxShadow = "#1b1b1b 10px 10px 20px";

            if(!lightningActive){
                blitzButton[i].style.boxShadow = "#1b1b1b 10px 10px 20px";
            } else {
                blitzButton[i].style.boxShadow = "#363636 10px 10px 20px";
            }

        });
    }

    for(let i = 0; i < dragonButton.length; i++){
        dragonButton[i].addEventListener("mousedown", function(){
            dragonButton[i].style.backgroundColor = "rgb(50, 0, 0)";
        });

        dragonButton[i].addEventListener("mouseup", function(){
            dragonButton[i].style.backgroundColor = "rgb(150, 0, 0)";
        });

        dragonButton[i].addEventListener("click", function(){
            dragonActive = !dragonActive
            lightningActive = false;
            blitzButton[i].style.boxShadow = "#1b1b1b 10px 10px 20px";

            if(!dragonActive){
                dragonButton[i].style.boxShadow = "#1b1b1b 10px 10px 20px";
            } else {
                dragonButton[i].style.boxShadow = "#363636 10px 10px 20px";
            }

        });
    }

    for(let i = 0; i < jahresZeitButton.length; i++){
        jahresZeitButton[i].addEventListener("mousedown", function(){
            jahresZeitButton[i].style.backgroundColor = "rgb(90, 90, 90)";
            jahresZeitButton[i].style.boxShadow = "#363636 10px 10px 20px";
        });

        jahresZeitButton[i].addEventListener("mouseup", function(){
            jahresZeitButton[i].style.backgroundColor = "rgb(136, 136, 136)";
            jahresZeitButton[i].style.boxShadow = "#1b1b1b 10px 10px 20px";
        });

        jahresZeitButton[i].addEventListener("click", function(){
            if(Index < jahreszeit.length-1){
                frameRate(10);
                Index++;
                framerate = 10;
                grassEnergy = 15;
                grassEaterEnergy = 20;
                meatEaterEnergy = 240;
                meatEaterAnzahl = 0.005;
            } else if(Index >= jahreszeit.length-1){
                frameRate(30);
                framerate = 30;
                Index = 0;
                grassEnergy = 7;
                grassEaterEnergy = 10;
                meatEaterEnergy = 120;
                meatEaterAnzahl = 0.025; 
            }
        });
    }
});


function mouseClicked(){
    if(lightningActive){

        let row = Math.round(mouseY / blockSize);
        let col = Math.round(mouseX / blockSize);

        let circle = findNeighbourPositions(row, col, 5, Object, (o, nRow, row, nCol, col)=>{
            return Math.sqrt((nRow-row)*(nRow-row) + (nCol-col)*(nCol-col))<=5
        })
        for(let i = 0; i < circle.length; i++){
            let row = circle[i][0]
            let col = circle[i][1]
            matrix[row][col] = new Ash();
        }

        let richtung = 1

        if(row <=200 && col <= 200){
            for(let i = row; i >= 0; i--){

                let rnd = random(0, 10);
                if (rnd < 3){
                    richtung = -(richtung);
                }

                matrix[i][col += richtung] = new Lightning();
            }
        }
    }

    if(dragonActive){

        let row = Math.round(mouseY / blockSize);
        let col = Math.round(mouseX / blockSize);

        if(row <=200 && col <= 200){
                matrix[row][col] = new Dragon();
        }
    }
}