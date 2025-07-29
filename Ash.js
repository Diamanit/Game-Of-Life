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
