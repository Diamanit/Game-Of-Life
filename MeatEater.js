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
