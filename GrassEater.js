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
