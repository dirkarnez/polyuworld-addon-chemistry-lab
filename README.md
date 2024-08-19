polyuworld-addon-chemistrylab
=============================
### Terrain
- https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_stl.html
```

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
