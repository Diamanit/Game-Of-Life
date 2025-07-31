class Dragon extends eigenschaften {
    constructor() {
        super(["#922121", "rgb(0, 204, 204)"], 1000);
    }

    step() {
        let MeatEaterFields = findNeighbourPositions(this.row, this.col, 5, MeatEater);
        let grassEaterFields = findNeighbourPositions(this.row, this.col, 2, GrassEater);

        if(MeatEaterFields.length > 0) {
            let randomField = random(MeatEaterFields);
            updateCreaturePosition(this, randomField);
            let Fields = findNeighbourPositions(this.row, this.col, 3, Object, function(obj, nRow, row, nCol, col){
                return nRow-row <= 2 && nCol-col <=2
                // return Math.sqrt((nRow-row)*(nRow-row)+ (nCol-col)*(nCol-col))<=10
            });;
            for(let i=0; i<Fields.length; i++){
                let row = Fields[i][0]
                let col = Fields[i][1]
                if (!(matrix[row][col] instanceof Empty)){
                    matrix[row][col] = new Ash();
                }
            }
            this.energy += 10;

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
