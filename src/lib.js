import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

export function MyRender(scene) {

    // size means how long per line (unit)
    // divisions means how many boxes per line
    // therefore, both must have same value if GridHelper is intended to use as a ruler
    const size = 10000, divisions = 10000;

    const gridHelper = new THREE.GridHelper( size, divisions, 0xFFFFFF, 0x222222 );
    scene.add(gridHelper);

    RectAreaLightUniformsLib.init();

    const envLightColor = 0xfdfbd3;
    const envLightIntensity = 10;
    const floorWidth = 40;
    const floorLength = 100;
    const lightHeight = 10;
    const spacebetweenLights = 5;

    const rectLight1 = new THREE.RectAreaLight( envLightColor, envLightIntensity, 4, lightHeight );
    rectLight1.position.set( -5, lightHeight / 2, floorWidth / 2 );
    scene.add( rectLight1 );

    const rectLight2 = new THREE.RectAreaLight( envLightColor, envLightIntensity, 4, lightHeight );
    rectLight2.position.set( 0, lightHeight / 2, floorWidth / 2 );
    scene.add( rectLight2 );

    const rectLight3 = new THREE.RectAreaLight( envLightColor, envLightIntensity, 4, lightHeight );
    rectLight3.position.set( 5, lightHeight / 2, floorWidth / 2 );
    scene.add( rectLight3 );

    
    const rectLight4 = new THREE.RectAreaLight( envLightColor, envLightIntensity, 4, lightHeight );
    rectLight4.position.set( -5, lightHeight / 2, -(floorWidth / 2) );
    rectLight4.rotation.y = Math.PI;
    scene.add( rectLight4 );

    const rectLight5 = new THREE.RectAreaLight( envLightColor, envLightIntensity, 4, lightHeight );
    rectLight5.position.set( 0, lightHeight / 2, -(floorWidth / 2) );
    rectLight5.rotation.y = Math.PI;
    scene.add( rectLight5 );

    const rectLight6 = new THREE.RectAreaLight( envLightColor, envLightIntensity, 4, lightHeight );
    rectLight6.position.set( 5, lightHeight / 2, -(floorWidth / 2) );
    rectLight6.rotation.y = Math.PI;
    scene.add( rectLight6 );


    scene.add( new RectAreaLightHelper( rectLight1 ) );
    scene.add( new RectAreaLightHelper( rectLight2 ) );
    scene.add( new RectAreaLightHelper( rectLight3 ) );
    scene.add( new RectAreaLightHelper( rectLight4 ) );
    scene.add( new RectAreaLightHelper( rectLight5 ) );
    scene.add( new RectAreaLightHelper( rectLight6 ) );

    // const chemlight = new THREE.RectAreaLight( 0xfdfbd3, 5, 10, 10 ); 
    // chemlight.position.set( 0,0.2,0 );
    // chemlight.rotation.x = Math.PI / 2;
    // scene.add( chemlight);
    // scene.add( new RectAreaLightHelper( chemlight) );

    const geometry = new THREE.BoxGeometry( 10, 0.2, 10 ); 
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cube = new THREE.Mesh( geometry, material ); 
    cube.position.set( 0,0.1,0);
    scene.add( cube );


    const geoFloor = new THREE.PlaneGeometry( floorLength, floorWidth );
    const matStdFloor = new THREE.MeshStandardMaterial( { color: 0xbcbcbc, roughness: 0.1, metalness: 0 } );
    const mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
    mshStdFloor.rotation.x = - Math.PI / 2;
    mshStdFloor.receiveShadow = true;
    scene.add( mshStdFloor );

    const geoKnot = new THREE.TorusKnotGeometry( 1.5, 0.5, 200, 16 );
    const matKnot = new THREE.MeshStandardMaterial( { color: 0xffffff, roughness: 0, metalness: 0 } );
    const meshKnot = new THREE.Mesh( geoKnot, matKnot );
    meshKnot.position.set( 0, 5, 0 );
    scene.add( meshKnot );
}
