import React, { Component } from "react";
import * as THREE from "three";
var OrbitControls = require('three-orbit-controls')(THREE);
export class DrawVectors extends Component {
    constructor(props) {
        super(props);
        this.FirstVector = props.FirstVector;
        this.SecondVector = props.SecondVector; 
        this.Operation = props.Operation;
    }
 
    componentDidMount() {
        if(!this.FirstVector || this.FirstVector.dimension !== this.SecondVector.dimension 
            || (this.FirstVector.dimension > 4 || this.FirstVector.dimension < 2))
            return;

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( 600, 600 );

        var camera = new THREE.PerspectiveCamera( 50, 1, 1, 2000 );
        camera.position.set( 0, 20, 100);
        camera.lookAt( 0, 0, 0 );
        this.controls = new OrbitControls(camera, renderer.domElement );
        this.controls.update();

        this.mount.appendChild( renderer.domElement );

        var scene = new THREE.Scene();
        //create a blue LineBasicMaterial
        var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
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
        if(this.Operation === 1 || this.Operation === 2){
            var vec1 = this.FirstVector.dimension === 2 ? new THREE.Vector2(...this.FirstVector.elements) 
            : new THREE.Vector3(...this.FirstVector.elements); 
            var vec2 = this.FirstVector.dimension === 2 ? new THREE.Vector2(...this.SecondVector.elements) 
            : new THREE.Vector3(...this.SecondVector.elements);  

            var vectorSum = this.Operation === 1 ? vec1.add(vec2) : vec1.sub(vec2);
            const length = vectorSum.length();
            const hex = 0xffffff;
            vectorSum.normalize();
            const origin = this.FirstVector.dimension === 2 ? new THREE.Vector2(0, 0) : new THREE.Vector3(0, 0, 0);
            const arrowHelper = new THREE.ArrowHelper( vectorSum, origin, length, hex , 1, 1);
            scene.add( arrowHelper );
        }
        var geometry = new THREE.BufferGeometry().setFromPoints(points);

        var line = new THREE.Line( geometry, material );

        scene.add( line );
        const axesHelper = new THREE.AxesHelper( 5 );
        scene.add( axesHelper )
        renderer.render( scene, camera );
        function animate() {
        
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        
        }
        animate();
  }

  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
 
}
 