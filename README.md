polyuworld-addon-chemistry-lab
==============================
### Terrain
- [Coding Challenge 11: 3D Terrain Generation with Perlin Noise in Processing - YouTube](https://www.youtube.com/watch?v=IKB1hWWedMk)
- https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_stl.html
```js

    // Ground

				const plane = new THREE.Mesh(
					new THREE.PlaneGeometry( 40, 40 ),
					new THREE.MeshPhongMaterial( { color: 0xcbcbcb, specular: 0x474747 } )
				);
				plane.rotation.x = - Math.PI / 2;
				plane.position.y = - 0.5;
				scene.add( plane );

				plane.receiveShadow = true;
scene.add( new THREE.HemisphereLight( 0x8d7c7c, 0x494966, 3 ) );
```

### Generate Ground
```js
const gridSize = 10; // Number of planes in each direction
const planeSize = 1; // Size of each plane

// Create a material for the planes
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });

// Create the grid using multiple planes
for (let i = -gridSize; i <= gridSize; i++) {
    for (let j = -gridSize; j <= gridSize; j++) {
        const geometry = new THREE.PlaneGeometry(planeSize, planeSize);
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(i * planeSize, 1, j * planeSize);
        plane.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
        APP.scene.sceneEl.object3D.add(plane);
    }
}
```

### Debug
```
const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( geometry, material ); 
cube.position.set(0, 1.8, 0);
APP.scene.sceneEl.object3D.add(cube); // scene.add in aframe
```
