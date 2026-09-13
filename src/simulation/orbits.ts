import {DAY,J2000,type Vec3} from '../data/constants';
import type {Orbit} from '../data/types';
export function orbitPosition(o:Orbit,time:number):Vec3 {
 const r=Math.PI/180;const M=(o.mean*r+2*Math.PI*((time-J2000)/DAY)/o.period)%(2*Math.PI);
 let E=M;for(let k=0;k<12;k++)E-=(E-o.e*Math.sin(E)-M)/(1-o.e*Math.cos(E));
 const x=o.a*(Math.cos(E)-o.e),y=o.a*Math.sqrt(1-o.e*o.e)*Math.sin(E);
 const w=o.peri*r,n=o.node*r,i=o.i*r;
 const X=(Math.cos(n)*Math.cos(w)-Math.sin(n)*Math.sin(w)*Math.cos(i))*x+(-Math.cos(n)*Math.sin(w)-Math.sin(n)*Math.cos(w)*Math.cos(i))*y;
 const Y=(Math.sin(n)*Math.cos(w)+Math.cos(n)*Math.sin(w)*Math.cos(i))*x+(-Math.sin(n)*Math.sin(w)+Math.cos(n)*Math.cos(w)*Math.cos(i))*y;
 const Z=Math.sin(w)*Math.sin(i)*x+Math.cos(w)*Math.sin(i)*y;
 return [X,Z,-Y]; // ecliptic -> Three.js, right-handed y-up
}
