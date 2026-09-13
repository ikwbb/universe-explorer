import {useMemo,useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {BufferGeometry,Float32BufferAttribute,Group} from 'three';
import type {SpaceObject} from '../data/types';
import {orbitPosition} from '../simulation/orbits';
import {positionAt} from '../simulation/positions';
import {navigation} from '../navigation/CameraController';
import {rebase} from '../rendering/ScaleManager';
import {DAY,J2000} from '../data/constants';
export function Orbit({body,time,planes=false}:{body:SpaceObject;time:number;planes?:boolean}){const ref=useRef<Group>(null!);const geometry=useMemo(()=>{const o=body.orbit!;const a=[];for(let i=0;i<=192;i++)a.push(...orbitPosition({...o,a:1},J2000+o.period*DAY*i/192));const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute(a,3));return g},[body]);useFrame(()=>{const n=navigation,o=body.orbit!;ref.current.position.set(...rebase(o.parent?positionAt(o.parent,time)??[0,0,0]:[0,0,0],n.origin,n.span));ref.current.scale.setScalar(o.a/n.span*10);ref.current.visible=n.span<o.a*120&&n.span>o.a*.08;});return <group ref={ref}><lineLoop geometry={geometry}><lineBasicMaterial color={body.color} transparent opacity={.23}/></lineLoop>{planes&&<mesh rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1,64]}/><meshBasicMaterial color={body.color} transparent opacity={.025} side={2} depthWrite={false}/></mesh>}</group>}
