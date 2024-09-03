/** @jsx createElementEntity */
import { COLLISION_LAYERS, createElementEntity, EntityDef, Fit, FLOATY_OBJECT_FLAGS, getAbsoluteHref, Shape } from "hubs";
import * as THREE from "three";

import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader';

const offset = new THREE.Vector3();
const pdbLoader = new PDBLoader();

export function MyPrefab(): EntityDef {

    // const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
    // const material = new THREE.MeshPhongMaterial( {color: 0x00ff00} ); 
    // new THREE.Group().children[0].geometry
	const root = new THREE.Group();

	// const lights = [];
	// lights[ 0 ] = new THREE.DirectionalLight( 0xffffff, 3 );
	// lights[ 1 ] = new THREE.DirectionalLight( 0xffffff, 3 );
	// lights[ 2 ] = new THREE.DirectionalLight( 0xffffff, 3 );

	// lights[ 0 ].position.set( 0, 200, 0 );
	// lights[ 1 ].position.set( 100, 200, 100 );
	// lights[ 2 ].position.set( - 100, - 200, - 100 );

	// root.add( lights[ 0 ] );
	// root.add( lights[ 1 ] );
	// root.add( lights[ 2 ] );

    const pdb = pdbLoader.parse(`
HEADER    NONAME 22-Apr-10                                              NONE   1
TITLE                                                                   NONE   2
AUTHOR    Chemical Structure Services at http://cactus.nci.nih.gov      NONE   3
REVDAT   1  22-Apr-10     0                                             NONE   4
ATOM      1  C           0      -2.561   1.251  -0.000  0.00  0.00           C+0
ATOM      2  C           0      -3.261  -1.161  -0.000  0.00  0.00           C+0
ATOM      3  C           0       1.534   2.629   0.000  0.00  0.00           C+0
ATOM      4  C           0       2.247  -2.176  -0.000  0.00  0.00           C+0
ATOM      5  O           0      -0.438  -2.428   0.000  0.00  0.00           O+0
ATOM      6  O           0       2.994   0.384   0.000  0.00  0.00           O+0
ATOM      7  C           0      -0.016  -1.285  -0.000  0.00  0.00           C+0
ATOM      8  C           0       1.791   0.208   0.000  0.00  0.00           C+0
ATOM      9  C           0      -0.911  -0.194  -0.000  0.00  0.00           C+0
ATOM     10  C           0      -0.403   1.099  -0.000  0.00  0.00           C+0
ATOM     11  N           0      -1.445   1.934  -0.000  0.00  0.00           N+0
ATOM     12  N           0       0.971   1.277  -0.000  0.00  0.00           N+0
ATOM     13  N           0       1.312  -1.048  -0.000  0.00  0.00           N+0
ATOM     14  N           0      -2.286  -0.068   0.000  0.00  0.00           N+0
ATOM     15  H           0      -3.552   1.680   0.004  0.00  0.00           H+0
ATOM     16  H           0      -3.503  -1.433   1.028  0.00  0.00           H+0
ATOM     17  H           0      -4.168  -0.840  -0.514  0.00  0.00           H+0
ATOM     18  H           0      -2.839  -2.025  -0.514  0.00  0.00           H+0
ATOM     19  H           0       1.673   2.965   1.028  0.00  0.00           H+0
ATOM     20  H           0       2.495   2.623  -0.514  0.00  0.00           H+0
ATOM     21  H           0       0.851   3.307  -0.514  0.00  0.00           H+0
ATOM     22  H           0       2.478  -2.456  -1.028  0.00  0.00           H+0
ATOM     23  H           0       3.164  -1.888   0.513  0.00  0.00           H+0
ATOM     24  H           0       1.793  -3.024   0.514  0.00  0.00           H+0
CONECT    1   14   11   15    0                                         NONE  29
CONECT    2   14   16   17   18                                         NONE  30
CONECT    3   12   19   20   21                                         NONE  31
CONECT    4   13   22   23   24                                         NONE  32
CONECT    5    7    0    0    0                                         NONE  33
CONECT    6    8    0    0    0                                         NONE  34
CONECT    7    9   13    5    0                                         NONE  35
CONECT    8   12    6   13    0                                         NONE  36
CONECT    9   10    7   14    0                                         NONE  37
CONECT   10    9   12   11    0                                         NONE  38
CONECT   11   10    1    0    0                                         NONE  39
CONECT   12   10    8    3    0                                         NONE  40
CONECT   13    7    4    8    0                                         NONE  41
CONECT   14    9    1    2    0                                         NONE  42
END                                                                     NONE  43
`);

        			const geometryAtoms = pdb.geometryAtoms;
					const geometryBonds = pdb.geometryBonds;
					const json = pdb.json;

					const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
					const sphereGeometry = new THREE.IcosahedronGeometry( 1, 3 );

					geometryAtoms.computeBoundingBox();
					geometryAtoms.boundingBox?.getCenter( offset ).negate();

					geometryAtoms.translate( offset.x, offset.y, offset.z );
					geometryBonds.translate( offset.x, offset.y, offset.z );

					let positions = geometryAtoms.getAttribute( 'position' );
					const colors = geometryAtoms.getAttribute( 'color' );

					const position = new THREE.Vector3();
					const color = new THREE.Color();

					for ( let i = 0; i < positions.count; i ++ ) {

						position.x = positions.getX( i );
						position.y = positions.getY( i );
						position.z = positions.getZ( i );

						color.r = colors.getX( i );
						color.g = colors.getY( i );
						color.b = colors.getZ( i );

						const material = new THREE.MeshPhongMaterial( { color: color } );

						const object = new THREE.Mesh( sphereGeometry, material );
						object.position.copy( position );
						object.position.multiplyScalar( 1 );
						object.scale.multiplyScalar( 0.3 );
						root.add( object );

						const atom = json.atoms[ i ];

						// const text = document.createElement( 'div' );
						// text.className = 'label';
						// text.style.color = 'rgb(' + atom[ 3 ][ 0 ] + ',' + atom[ 3 ][ 1 ] + ',' + atom[ 3 ][ 2 ] + ')';
						// text.textContent = atom[ 4 ];

						// const label = new CSS2DObject( text );
						// label.position.copy( object.position );
						// root.add( label );

					}

					positions = geometryBonds.getAttribute( 'position' );

					const start = new THREE.Vector3();
					const end = new THREE.Vector3();

					for ( let i = 0; i < positions.count; i += 2 ) {

						start.x = positions.getX( i );
						start.y = positions.getY( i );
						start.z = positions.getZ( i );

						end.x = positions.getX( i + 1 );
						end.y = positions.getY( i + 1 );
						end.z = positions.getZ( i + 1 );

						start.multiplyScalar( 1 );
						end.multiplyScalar( 1 );

						const object = new THREE.Mesh( boxGeometry, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
						object.position.copy( start );
						object.position.lerp( end, 0.5 );
						object.scale.set(0.06, 0.06, start.distanceTo( end ) );
						object.lookAt( end );
						root.add( object );

					}

        
    return (
        <entity 
            name="MyPrefab"
            networked
            networkedTransform
            object3D={/*new THREE.Mesh( geometry, material )*/root } 
            holdable
			cursorRaycastable
			remoteHoverTarget
			handCollisionTarget
			offersRemoteConstraint
			offersHandConstraint
            floatyObject={{
              flags: FLOATY_OBJECT_FLAGS.HELIUM_WHEN_LARGE
            }}
            rigidbody={{
              collisionGroup: COLLISION_LAYERS.INTERACTABLES,
              collisionMask:
                COLLISION_LAYERS.HANDS |
                COLLISION_LAYERS.ENVIRONMENT |
                COLLISION_LAYERS.INTERACTABLES |
                COLLISION_LAYERS.AVATAR
            }}
            physicsShape={{
              fit: Fit.MANUAL,
              type: Shape.CYLINDER,
              halfExtents: [0.25, 0.5, 0.45]
            }}
            scale={[1, 1, 1]}
            inspectable
            deletable
            hoverableVisuals
        />
    )
};
