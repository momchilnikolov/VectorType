export class VectorIterator {
    constructor(vector) {
        this.x = 0;
        this.vector = vector;
    }

    next() {
        if (this.x === this.vector.vsize) return { done: true };

        let value = {
            x: this.x,
            value: this.vector.get(this.x)
        };
        this.x++;
        return { value, done: false };
    }
}