import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

export function MyRender(scene) {
    RectAreaLightUniformsLib.init();

    const rectLight1 = new THREE.RectAreaLight( 0xff0000, 5, 4, 10 );
    rectLight1.position.set( - 5, 5, 5 );
    scene.add( rectLight1 );

    const rectLight2 = new THREE.RectAreaLight( 0x00ff00, 5, 4, 10 );
    rectLight2.position.set( 0, 5, 5 );
    scene.add( rectLight2 );

    const rectLight3 = new THREE.RectAreaLight( 0x0000ff, 5, 4, 10 );
    rectLight3.position.set( 5, 5, 5 );
    scene.add( rectLight3 );

    scene.add( new RectAreaLightHelper( rectLight1 ) );
    scene.add( new RectAreaLightHelper( rectLight2 ) );
    scene.add( new RectAreaLightHelper( rectLight3 ) );

    const geoFloor = new THREE.BoxGeometry( 2000, 0.1, 2000 );
    const matStdFloor = new THREE.MeshStandardMaterial( { color: 0xbcbcbc, roughness: 0.1, metalness: 0 } );
    const mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
    scene.add( mshStdFloor );

    const geoKnot = new THREE.TorusKnotGeometry( 1.5, 0.5, 200, 16 );
    const matKnot = new THREE.MeshStandardMaterial( { color: 0xffffff, roughness: 0, metalness: 0 } );
    const meshKnot = new THREE.Mesh( geoKnot, matKnot );
    meshKnot.position.set( 0, 5, 0 );
    scene.add( meshKnot );
}
