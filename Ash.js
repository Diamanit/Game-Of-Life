class Ash extends eigenschaften {
    constructor() {
        super(["#433737", "rgb(0, 217, 255)"], int(random(10, 30)));
    }

    step(){
        this.energy--;
        this.death();
    }
}
