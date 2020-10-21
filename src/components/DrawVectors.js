import React, { Component } from "react";
import * as THREE from "three";

export class DrawVectors extends Component {
    constructor(props) {
        super(props);
        this.FirstVector = props.FirstVector;
        this.SecondVector = props.SecondVector; 
        this.VectorSum = props.VectorSum;
        //this.initializeOrbits = this.initializeOrbits.bind(this);
    }
 
    componentDidMount() {
        if(!this.FirstVector || this.FirstVector.dimension !== this.SecondVector.dimension 
            || (this.FirstVector.dimension > 3 || this.FirstVector.dimension < 2))
            return;

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( 600, 600 );

        var camera = new THREE.PerspectiveCamera( 50, 1, 1, 2000 );
        camera.position.set( 20, 20, 100 );
        camera.lookAt( 0, 0, 0 );
        //this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.mount.appendChild( renderer.domElement );

        var scene = new THREE.Scene();
        //create a blue LineBasicMaterial
        var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
        var points = [];
        //var vector2 = [];
        if(this.FirstVector.dimension === 2) {
            points.push( new THREE.Vector2(0,0) );
            points.push( new THREE.Vector2(...this.FirstVector.elements));
            points.push( new THREE.Vector2(0,0) );
            points.push( new THREE.Vector2(...this.SecondVector.elements));
        } else {
            points.push( new THREE.Vector3(0,0,0) );
            points.push( new THREE.Vector3(...this.FirstVector.elements));
            points.push( new THREE.Vector3(0,0,0) );
            points.push( new THREE.Vector3(...this.SecondVector.elements));
        }  
        if(this.VectorSum){
            points.push( this.FirstVector.dimension === 2 ? new THREE.Vector2(0,0) : new THREE.Vector3(0,0,0));
            points.push( this.FirstVector.dimension === 2 ? new THREE.Vector2(...this.VectorSum.elements) 
            : new THREE.Vector3(...this.VectorSum.elements));  
        }
        var geometry = new THREE.BufferGeometry().setFromPoints(points);

        var line = new THREE.Line( geometry, material );

        scene.add( line );
 
        renderer.render( scene, camera );
 
  }
//   initializeOrbits() {
//     this.controls.rotateSpeed = 1.0;
//     this.controls.zoomSpeed = 1.2;
//     this.controls.panSpeed = 0.8;
//   }
  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}
 