import type {Vec3} from '../data/constants';
import {findObject} from '../data/catalog';
import {orbitPosition} from './orbits';
import {ephemerisCache} from '../ephemeris/EphemerisCache';
import {interpolate} from '../ephemeris/EphemerisInterpolator';
import {missionById} from '../data/spacecraftCatalog';
export function positionAt(id:string,time:number):Vec3|undefined{const b=findObject(id);if(!b)return;if(b.kind==='spacecraft'){const m=missionById(id)!;if(time<Date.parse(m.launchDate)||(m.missionEndDate&&time>Date.parse(m.missionEndDate)+86400000))return;const data=ephemerisCache.get(id);return data?interpolate(data.samples,time)?.position:undefined;}let p=b.orbit?orbitPosition(b.orbit,time):b.physicalPosition;if(b.orbit?.parent){const parent=positionAt(b.orbit.parent,time);if(parent)p=p.map((v,i)=>v+parent[i])as Vec3;}return p;}
