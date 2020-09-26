import { VectorIterator } from "./vectorIterator";

export class Vector {
    constructor(vsize, arr) {
        this.elements = [];

        for (let x = 0; x < vsize; x++) {
            this.elements[x] = arr ? +arr[x] : x;
        }
    }
    add(vector) {
        let newVector = new Vector(vector.dimension, vector);
        for (let x = 0; x < this.dimension; x++) {
            newVector.elements[x] = this.elements[x] + vector.elements[x];
        }
        return newVector;
    }
    subtract(vector) {
        let newVector = new Vector(vector.dimension, vector);
        for (let x = 0; x < this.dimension; x++) {
            newVector.elements[x] = this.elements[x] - vector.elements[x];
        }
        return newVector;
    }
    multiply(vector){
         
        let dotProduct = this.elements.reduce((acc, curr, i) => {
            return acc + (curr * vector.elements[i]);
        }, 0)

        return dotProduct;
    }
    get(x) {
        return this.elements[x];
    }
    get dimension() {
        return this.elements.length;
    }
    set(x, value) {
        this.elements[x] = value;
    }
 
}
Vector.prototype.toString = function () {
   let i = 97, returnStr = '';
   for (let x = 0; x < this.elements.length; x++) {
       returnStr += `${this.elements[x]}${String.fromCharCode(i)}${x < this.elements.length - 1 ? "+" : ""}`;
       i++;
   }

   return returnStr;
};
 
Vector.prototype[Symbol.iterator] = function () {
    return new VectorIterator(this);
};