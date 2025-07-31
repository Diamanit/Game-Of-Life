class Empty { }

class eigenschaften{
    constructor(colorList, energy) {
        this.stepCount = frameCount + 1;
        this.color = colorList;
        this.energy = energy;
    }

    death() {
        if(this.energy <= 0){
           matrix[this.row][this.col] = new Empty();
        }
    }
}
