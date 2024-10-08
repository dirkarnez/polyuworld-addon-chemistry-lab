/** @jsx createElementEntity */

import { COLLISION_LAYERS, createElementEntity, EntityDef, Fit, FLOATY_OBJECT_FLAGS, getAbsoluteHref, Shape } from "hubs";
import * as THREE from "three";

import {
  Types,
  addComponent,
  defineComponent,
  defineQuery,
  enterQuery,
} from "bitecs";


import {
  App,
  AvatarPOVNode,
  EntityID,
  Held,
  HubsWorld,
  PermissionE,
  SoundDefT,
  SoundEffectsSystem,
  SystemOrderE,
  SystemsE,
  anyEntityWith,
  createNetworkedEntity,
  registerAddon,
} from "hubs";
// import URL_QUACK from "../assets/quack.mp3";
// import URL_SPECIAL_QUACK from "../assets/specialquack.mp3";
import { MyPrefab } from "./my-prefab";

const Quack = defineComponent({
  quacks: Types.f32,
});

type QuackParams = {
  quacks?: number;
};

const DEFAULTS: Required<QuackParams> = {
  quacks: 1,
};

const My_PREFAB_ID = "duck";


// function playSound() {
//   const rand = Math.random();
//   if (rand < 0.01) {
//     APP.scene?.systems["hubs-systems"].soundEffectsSystem.playSoundOneShot(
//       sounds.get(URL_SPECIAL_QUACK)
//     );
//   } else {
//     APP.scene?.systems["hubs-systems"].soundEffectsSystem.playSoundOneShot(
//       sounds.get(URL_QUACK)
//     );
//   }
// }

// const heldQuackQuery = defineQuery([Quack, Held]);
// const heldQuackEnterQuery = enterQuery(heldQuackQuery);

// const quackSystem = (app: App): void => {
//   // heldQuackEnterQuery(app.world).forEach(() => {
//   //   playSound();
//   // });
// };


// function onReady(app: App) {
//   // [URL_QUACK, URL_SPECIAL_QUACK].forEach((url) => {
//   //   const sfxSystem = app.getSystem(
//   //     SystemsE.SoundEffectsSystem
//   //   ) as SoundEffectsSystem;
//   //   sfxSystem.registerSound(url).then((sound: SoundDefT) => {
//   //     sounds.set(sound.url, sound.id);
//   //   });
//   // });
// }

// let sounds = new Map<string, number>();

registerAddon("polyuworld-addon-chemistrylab", {
  name: "Chemistry Lab",
  description: `Chemistry in VR!`,
  onReady: (app: App) => {

  },
  system: { 
    system: (app: App): void => { 

    }, 
    order: SystemOrderE.PostPhysics 
  },
  // inflator: { 
  //   jsx: { 
  //     id: "quack", 
  //     // inflator injects data (as component(s)) to entity and initializes it / them
  //     inflator: (world: HubsWorld, eid: number, params?: QuackParams): EntityID => {
  //       params = Object.assign({}, params, DEFAULTS);
  //       addComponent(world, Quack, eid);
  //       Quack.quacks[eid] = params.quacks!;
  //       return eid;
  //     } 
  //   } 
  // },
  prefab: {
    id: My_PREFAB_ID,
    config: {
      permission: PermissionE.SPAWN_AND_MOVE_MEDIA,
      template: MyPrefab
    },
  },
  chatCommand: { 
    id: "chemlab", 
    command: (app: App, args: string[]) => {
      console.log("i got", args);

      const avatarEid: number = anyEntityWith(app.world, AvatarPOVNode)!;
      const avatarPov: THREE.Object3D = app.world.eid2obj.get(avatarEid)!;
      const eid: number = createNetworkedEntity(APP.world, My_PREFAB_ID, {});
      const obj: THREE.Object3D = app.world.eid2obj.get(eid)!;
      obj.position.copy(avatarPov.localToWorld(new THREE.Vector3(0, 0, -1.5)));
      obj.lookAt(avatarPov.getWorldPosition(new THREE.Vector3()));
      //playSound();
    } 
  },
});


/*
import { addEntity } from "bitecs";
import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { addObject3DComponent } from "../src/utils/jsx-entity";

const eid = addEntity(world);
addObject3DComponent(world, eid, new Mesh(
  new BoxGeometry(1.0, 1.0, 1.0),
  new MeshBasicMaterial({ color: 0xffffff })
));
*/