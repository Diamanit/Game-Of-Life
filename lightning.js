class Lightning extends eigenschaften{
    constructor() {
        super(["rgb(0, 217, 255)", "#FFFF00"], int(random(5, 10)));
    }

    step() {
        this.energy--;

        this.death();
    }
}