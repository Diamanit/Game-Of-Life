class Empty { }

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
