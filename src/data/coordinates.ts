import type {Vec3} from './constants';
// J2000 equatorial right ascension / declination to ecliptic, then y-up.
export function equatorialPosition(raDegrees:number,decDegrees:number,distance:number):Vec3{const rad=Math.PI/180,ra=raDegrees*rad,dec=decDegrees*rad,eps=23.43928*rad;const x=distance*Math.cos(dec)*Math.cos(ra),y=distance*Math.cos(dec)*Math.sin(ra),z=distance*Math.sin(dec);return [x,-y*Math.sin(eps)+z*Math.cos(eps),-(y*Math.cos(eps)+z*Math.sin(eps))];}
