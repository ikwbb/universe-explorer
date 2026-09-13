import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {Html,useTexture} from '@react-three/drei';
import {Group,Mesh,SRGBColorSpace,PerspectiveCamera} from 'three';
import type {SpaceObject} from '../data/types';
import {navigation} from '../navigation/CameraController';
import {positionAt} from '../simulation/positions';
import {rebase} from '../rendering/ScaleManager';
import {DAY,AU,LY,norm,subtract} from '../data/constants';
function Surface({body}:{body:SpaceObject}){const texture=useTexture(`/textures/${body.id}.jpg`);texture.colorSpace=SRGBColorSpace;return <meshStandardMaterial map={texture} roughness={1}/>}
export function Body({body,time,selected,onSelect,visibleSize,labels,spacecraftSize=true}:{body:SpaceObject;time:number;selected:string;onSelect:(id:string)=>void;visibleSize:boolean;labels:boolean;spacecraftSize?:boolean}){
 const root=useRef<Group>(null!),sphere=useRef<Mesh>(null!),label=useRef<HTMLButtonElement>(null!);const isSelected=selected===body.id;
 useFrame(({camera,size})=>{const p=positionAt(body.id,time);if(!p){root.current.visible=false;if(label.current)label.current.style.display='none';return;}const n=navigation;const r=rebase(p,n.origin,n.span);let visible=norm(r)<100;
 const localScale=body.kind==='spacecraft'?AU*20000:body.orbit?.parent?body.orbit.a*50:body.orbit?body.orbit.a*100:body.distance?body.distance*50:Infinity;
 if(n.span>localScale)visible=false;if((body.id==='sun'||body.id==='sagittarius')&&n.span>LY*600000)visible=false;
 root.current.visible=visible;root.current.position.set(...r);body.physicalPosition=p;body.renderPosition=r;
 let radius=body.physicalRadius/n.span*10;const exaggerated=body.kind==='spacecraft'?spacecraftSize:visibleSize;
 if(exaggerated)radius=Math.max(radius,body.kind==='spacecraft'?.035:body.id==='sun'?.065:.034);
 radius=Math.min(radius,20);body.visualRadius=radius*n.span/10;sphere.current.scale.setScalar(radius);
 if(body.rotation)sphere.current.rotation.y=(((time/DAY*24)/body.rotation)*2*Math.PI)%(2*Math.PI);
 if(label.current){const crowded=(body.orbit&&!body.orbit.parent&&body.orbit.a/n.span<.03&&!isSelected)||(body.kind==='star'&&body.distance&&n.span>body.distance*8&&!isSelected);const show=visible&&labels&&!crowded&&(isSelected||norm(subtract(p,n.origin))<n.span*3);label.current.style.display=show?'block':'none';const distance=root.current.position.distanceTo(camera.position);const pixels=radius/Math.max(.01,distance)*size.height/(2*Math.tan((camera as PerspectiveCamera).fov*Math.PI/360));label.current.style.transform=`translateY(${-Math.min(size.height*.35,pixels)-14}px)`;if(body.id==='sun'&&label.current.lastChild)label.current.lastChild.textContent=n.span>LY*3000?'Solar System · Local Spur':'Sun';}
 });
 return <group ref={root}><mesh ref={sphere} onClick={e=>{e.stopPropagation();onSelect(body.id)}}>{body.kind==='spacecraft'?<octahedronGeometry args={[1,0]}/>:<sphereGeometry args={[1,48,32]}/>}{body.id==='earth'||body.id==='moon'?<Surface body={body}/>:<meshStandardMaterial color={body.color} roughness={.85} emissive={body.color} emissiveIntensity={body.kind==='star'?1.8:body.kind==='spacecraft'?1.1:.05}/>}
 {body.id==='saturn'&&<mesh rotation={[Math.PI/2.3,0,0]}><ringGeometry args={[1.3,2.3,96]}/><meshStandardMaterial color="#b8a48a" side={2} transparent opacity={.6}/></mesh>}
 {body.id==='earth'&&<mesh scale={1.018}><sphereGeometry args={[1,48,32]}/><meshBasicMaterial color="#6fa7df" transparent opacity={.075} side={1}/></mesh>}
 </mesh><Html center zIndexRange={[20,0]}><button ref={label} className={`object-label ${isSelected?'selected':''} ${body.kind==='spacecraft'?'probe-label':''}`} onClick={()=>onSelect(body.id)}>{isSelected&&<span className="label-tick"/>}{body.name}</button></Html></group>;
}
