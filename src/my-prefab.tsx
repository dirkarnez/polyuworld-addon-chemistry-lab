/** @jsx createElementEntity */
import { COLLISION_LAYERS, createElementEntity, EntityDef, Fit, FLOATY_OBJECT_FLAGS, getAbsoluteHref, Shape } from "hubs";
import * as THREE from "three";

export function MyPrefab(): EntityDef {

    const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
        
    return (
        <entity 
            name="MyPrefab"
            networked
            networkedTransform
            object3D={new THREE.Mesh( geometry, material )} 
            holdable
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