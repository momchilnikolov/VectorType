import React, { Component } from 'react';
import { VectorType } from '../types/vector';
 
import  { DrawVectors } from './DrawVectors';
export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { vectorResult: '', vector1input: '', vector2input: '' };

        this.addVectors = this.addVectors.bind(this);
        this.subtractVectors = this.subtractVectors.bind(this);
        this.dotProduct = this.dotProduct.bind(this);
        this.angleBetween = this.angleBetween.bind(this);
        this.initializeVectors = this.initializeVectors.bind(this);
    }
    initializeVectors(){
        let vector1Coords = this.state.vector1input.split(",");
        let vector2Coords = this.state.vector2input.split(",");
        if(vector1Coords.length !== vector2Coords.length){
            this.setState({
                vectorResult: "Two vectors must have same number of coordinates(dimension).",
                error: true
            });
            return false;
        }

        this.Vector1 = new VectorType(vector1Coords.length, vector1Coords);
        this.Vector2 = new VectorType(vector2Coords.length, vector2Coords);
        this.setState({
            FirstVector: this.Vector1,
            SecondVector: this.Vector2
        });
        return true; 
    }
    addVectors(event) {
        event.preventDefault(); 
        if(!this.initializeVectors()) 
            return false;

        let vectorResult = this.Vector1.add(this.Vector2);

        this.setState({
            vectorResult: vectorResult.toString(),
            VectorSum: vectorResult
        });

    }
    subtractVectors(event) {
        event.preventDefault();
        if(!this.initializeVectors()) 
            return false;

        let vectorResult = this.Vector1.subtract(this.Vector2);
        this.setState({
            vectorResult: vectorResult.toString(),
            VectorSum: vectorResult
        });
    }
    dotProduct(event) {
        event.preventDefault();
        if(!this.initializeVectors()) 
            return false;

        this.setState({
            vectorResult: "dot product is " + this.Vector1.multiply(this.Vector2)
        });
    }
    angleBetween (event) {
        event.preventDefault();
        if(!this.initializeVectors()) 
            return false;
        let angle = this.Vector1.getAngle(this.Vector2);
        this.setState({
            vectorResult: angle + " degrees"
        });
    }
    setVector1 = (e) => {
        let userInput = e.target.value;
        this.setState({
            vector1input: userInput
        });
    }
    setVector2 = (e) => {
        let userInput = e.target.value;
        this.setState({
            vector2input: userInput
        });
    }
  render () {
    return (
      <div>
            <h1>Vector Operations</h1>
            <form>
                <p>Enter the two vector values seperated by commas(e.g 10,-1,0):</p>
                <p>
                    <input type="text" value={this.state.vector1input} onChange={this.setVector1} />&nbsp;&nbsp;
                    <input type="text" value={this.state.vector2input} onChange={this.setVector2} />
                </p>
                <p><button className="btn btn-primary" onClick={this.addVectors}>Add</button>&nbsp;&nbsp;
                <button className="btn btn-primary" onClick={this.subtractVectors}>Subtract</button>&nbsp;&nbsp;
                <button className="btn btn-primary" onClick={this.dotProduct}>Multiply</button>&nbsp;&nbsp;
                <button className="btn btn-primary" onClick={this.angleBetween}>Get Angle</button></p>
                <p aria-live="polite">Result: <strong>{this.state.vectorResult}</strong></p>
                <DrawVectors key={Math.random().toString()} 
                    FirstVector={this.state.FirstVector} 
                    SecondVector={this.state.SecondVector}
                    VectorSum={this.state.VectorSum}></DrawVectors>
            </form>
      </div>
    );
  }
}
