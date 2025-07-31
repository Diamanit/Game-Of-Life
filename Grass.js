class Grass extends eigenschaften{
    constructor() {
        super(["green", "rgb(230, 230, 230)"], int(random(0, 3)));
    }

    step() {
        this.energy++;

        if (this.energy >= grassEnergy) {
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
