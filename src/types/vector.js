import { VectorIterator } from "./vectorIterator";

export class VectorType {
    constructor(vsize, arr) {
        this.elements = [];

        for (let x = 0; x < vsize; x++) {
            this.elements[x] = arr ? +arr[x] : x;
        }
    }
    add(vector) {
        let newVector = new VectorType(vector.dimension, vector);
        for (let x = 0; x < this.dimension; x++) {
            newVector.elements[x] = this.elements[x] + vector.elements[x];
        }
        return newVector;
    }
    subtract(vector) {
        let newVector = new VectorType(vector.dimension, vector);
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
    getAngle (vector) {
        let result = this.multiply(vector) / (this.unit * vector.unit);
        let radians = Math.acos(result);
        
        return Math.round(radians * (180/Math.PI),2);
    }

    get unit() {
        let result = 0; 
        for(let coord of this.elements){
            result += Math.pow(coord,2);
        }
        let unitVector = Math.sqrt(result); 
        return unitVector;
    }
    get dimension() {
        return this.elements.length;
    }
    get(x) {
        return this.elements[x];
    }
    set(x, value) {
        this.elements[x] = value;
    }
 
}
VectorType.prototype.toString = function () {
   let returnStr = '<';
   for (let x = 0; x < this.elements.length; x++) {
       returnStr += `${this.elements[x]}${x < this.elements.length - 1 ? "," : ""}`;
   }
   returnStr += '>';
   return returnStr;
};
 
VectorType.prototype[Symbol.iterator] = function () {
    return new VectorIterator(this);
};