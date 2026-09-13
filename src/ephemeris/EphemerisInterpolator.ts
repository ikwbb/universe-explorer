import type {Sample} from './EphemerisCache';
import type {Vec3} from '../data/constants';
// JD TDB is treated as UTC for display, a ~minute offset. Never extrapolate coverage.
export const toJD=(ms:number)=>ms/86400000+2440587.5;
export const fromJD=(jd:number)=>(jd-2440587.5)*86400000;
export function interpolate(samples:Sample[],time:number):{position:Vec3;velocity:Vec3}|undefined{
 const jd=toJD(time);if(!samples.length||jd<samples[0][0]||jd>samples.at(-1)![0])return;
 let lo=0,hi=samples.length-1;while(hi-lo>1){const mid=(lo+hi)>>1;if(samples[mid][0]<=jd)lo=mid;else hi=mid;}
 const a=samples[lo],b=samples[hi];const seconds=(b[0]-a[0])*86400,t=seconds?(jd-a[0])*86400/seconds:0;
 // Cubic Hermite preserves supplied endpoint velocities and smooth motion.
 const p:number[]=[],v:number[]=[];for(let k=1;k<=3;k++){p.push((2*t**3-3*t*t+1)*a[k]+(t**3-2*t*t+t)*seconds*a[k+3]+(-2*t**3+3*t*t)*b[k]+(t**3-t*t)*seconds*b[k+3]);v.push(seconds?((6*t*t-6*t)*a[k]+(3*t*t-4*t+1)*seconds*a[k+3]+(-6*t*t+6*t)*b[k]+(3*t*t-2*t)*seconds*b[k+3])/seconds:a[k+3]);}
 return {position:[p[0],p[2],-p[1]],velocity:[v[0],v[2],-v[1]]};
}
