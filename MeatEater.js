class MeatEater extends eigenschaften {
    constructor() {
        super(["red", "#99004C"], 90);
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

        if (this.energy == meatEaterEnergy) {
            this.multiply();
        }

        if (Index > 0 && random(1, 10) < 2) {
            moveTo(this.row, this.col, GrassEater, 15, function(pos){
                let obj = matrix[pos[0]][pos[1]]
                return obj instanceof Empty || obj instanceof Grass
            });
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

function moveTo(row, col, target, maxDistance, validStepsFunc) {
    let allTargets = findNeighbourPositions(row, col, maxDistance, target)
    let sorted = allTargets.sort(function (a, b) {
        let y1 = row - a[0]
        let x1 = col - a[1]
        let d1 = Math.sqrt(y1 * y1 + x1 * x1)

        let y2 = row - b[0]
        let x2 = col - b[1]
        let d2 = Math.sqrt(y2 * y2 + x2 * x2)

        return d1 - d2
    })
    if (sorted.length > 0) {
        let closestTarget = sorted[0]

        let rowDirection = constrain(closestTarget[0] - row, -1, 1)
        let colDirection = constrain(closestTarget[1] - col, -1, 1)


        let possibleSteps = findNeighbourPositions(row, col, 1, Object)
        let validSteps = possibleSteps.filter(validStepsFunc)
        let stepsInDirection = validSteps.filter(function (e) {
            return (e[0] - row == rowDirection) || (e[1] - col == colDirection)
        })
        if (stepsInDirection.length > 0) {
            let step = random(stepsInDirection)
            updateCreaturePosition(matrix[row][col], step)
        }
    }
}