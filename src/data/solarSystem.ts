import {AU} from './constants';
import type {SpaceObject} from './types';
// J2000 approximate elements, JPL SSD. Positions are educational two-body estimates.
const rows: [string,number,number,number,number,number,number,number,number,number,string,string,number,string][] = [
 ['Mercury',.38709927,.20563593,7.00497902,48.33076593,77.45779628,252.2503235,87.969,2439.7,1407.6,'#a99b90','3.301 × 10²³ kg',0,'The smallest planet moves around the Sun in just 88 days.'],
 ['Venus',.72333566,.00677672,3.39467605,76.67984255,131.60246718,181.9790995,224.701,6051.8,-5832.5,'#deb982','4.867 × 10²⁴ kg',0,'A rocky world wrapped in a dense, heat-trapping atmosphere.'],
 ['Earth',1.00000261,.01671123,-.00001531,0,102.93768193,100.46457166,365.256,6371,23.934,'#77b4e3','5.972 × 10²⁴ kg',1,'Our home. A small, living world in an extraordinary expanse of space.'],
 ['Mars',1.52371034,.0933941,1.84969142,49.55953891,-23.94362959,-4.55343205,686.98,3389.5,24.623,'#d78261','6.417 × 10²³ kg',2,'A cold desert world with the tallest volcano in the Solar System.'],
 ['Jupiter',5.202887,.04838624,1.30439695,100.47390909,14.72847983,34.39644051,4332.59,69911,9.925,'#d5b89b','1.898 × 10²⁷ kg',0,'The giant of our planetary system, surrounded by a world of moons.'],
 ['Saturn',9.53667606,.05386179,2.48599187,113.66242448,92.59887831,49.95424423,10759.22,58232,10.656,'#dbc69c','5.683 × 10²⁶ kg',0,'Billions of pieces of ice and rock form Saturn’s remarkable rings.'],
 ['Uranus',19.18916464,.04725744,.77263783,74.01692503,170.9542763,313.23810451,30688.5,25362,-17.24,'#9dd8d9','8.681 × 10²⁵ kg',0,'An ice giant that rotates almost on its side.'],
 ['Neptune',30.06992276,.00859048,1.77004347,131.78422574,44.96476227,-55.12002969,60182,24622,16.11,'#658fda','1.024 × 10²⁶ kg',0,'The most distant major planet takes 165 years to circle the Sun.'],
 ['Pluto',39.482,.2488,17.14,110.30,224.07,238.93,90560,1188.3,-153.3,'#c6b1a0','1.303 × 10²² kg',5,'A dwarf planet in the Kuiper Belt, visited by New Horizons in 2015.'],
 ['Ceres',2.7675,.0758,10.594,80.3,153.9,95.99,1680,469.7,9.074,'#9faaa9','9.384 × 10²⁰ kg',0,'The largest object in the asteroid belt.']
];
export const solarSystem:SpaceObject[]=[{id:'sun',name:'Sun',kind:'star',color:'#ffda91',physicalRadius:695700,visualRadius:1,physicalPosition:[0,0,0],renderPosition:[0,0,0],description:'The star that holds our Solar System together. Sunlight reaches Earth in about eight minutes.',mass:'1.989 × 10³⁰ kg',spectral:'G2 V',luminosity:'1 L☉',rotation:609.12,focusDistance:AU*.08},...rows.map(([name,a,e,i,node,peri,mean,period,radius,rotation,color,mass,moons,description]):SpaceObject=>({id:name.toLowerCase(),name,kind:['Pluto','Ceres'].includes(name)?'dwarf':'planet',color,physicalRadius:radius,visualRadius:1,physicalPosition:[0,0,0],renderPosition:[0,0,0],description,mass,rotation,moons:moons?`${moons}`:'See NASA catalogue (counts change)',orbit:{a:a*AU,e,i,node,peri:peri-node,mean:mean-peri,period},focusDistance:radius*7}))];
