import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

export function MyRender(scene) {
    RectAreaLightUniformsLib.init();


    //         const lights = [];
    // lights[ 0 ] = new THREE.DirectionalLight( 0xffffff, 3 );
    // lights[ 1 ] = new THREE.DirectionalLight( 0xffffff, 3 );
    // lights[ 2 ] = new THREE.DirectionalLight( 0xffffff, 3 );
    
    // lights[ 0 ].position.set( 0, 200, 0 );
    // lights[ 1 ].position.set( 100, 200, 100 );
    // lights[ 2 ].position.set( - 100, - 200, - 100 );
    
    // scene.add( lights[ 0 ] );
    // scene.add( lights[ 1 ] );
    // scene.add( lights[ 2 ] );
    
    // size means how long per line (unit)
    // divisions means how many boxes per line
    // therefore, both must have same value if GridHelper is intended to use as a ruler
    const size = 10000, divisions = 10000;
    
    const gridHelper = new THREE.GridHelper( size, divisions, 0xFFFFFF, 0x222222 );
    scene.add(gridHelper);
    
    
    
    
    const rectLight1 = new THREE.RectAreaLight( 0xfdfbd3, 5, 4, 10 );
    rectLight1.position.set( - 5, 5, 5 );
    scene.add( rectLight1 );
    
    const rectLight2 = new THREE.RectAreaLight( 0xfdfbd3, 5, 4, 10 );
    rectLight2.position.set( 0, 5, 5 );
    scene.add( rectLight2 );
    
    const rectLight3 = new THREE.RectAreaLight( 0xfdfbd3, 5, 4, 10 );
    rectLight3.position.set( 5, 5, 5 );
    scene.add( rectLight3 );
    
    scene.add( new RectAreaLightHelper( rectLight1 ) );
    scene.add( new RectAreaLightHelper( rectLight2 ) );
    scene.add( new RectAreaLightHelper( rectLight3 ) );
    
    const geoFloor = new THREE.PlaneGeometry( 20, 20 );
    const matStdFloor = new THREE.MeshStandardMaterial( { color: 0xbcbcbc, roughness: 0.1, metalness: 0 } );
    const mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
    mshStdFloor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    scene.add( mshStdFloor );
    
    const geoKnot = new THREE.TorusKnotGeometry( 1.5, 0.5, 200, 16 );
    const matKnot = new THREE.MeshStandardMaterial( { color: 0x00ff00, roughness: 0, metalness: 0 } );
    const meshKnot = new THREE.Mesh( geoKnot, matKnot );
    meshKnot.position.set( 0, 5, 0 );
    scene.add( meshKnot );
}
