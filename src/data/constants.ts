export const AU = 149597870.7;
export const LY = 9460730472580.8;
export const PC = LY * 3.261563777;
export const C = 299792.458;
export const DAY = 86400000;
export const J2000 = Date.UTC(2000,0,1,12);
export type Vec3 = [number,number,number];
export const norm=(v:Vec3)=>Math.hypot(...v);
export const subtract=(a:Vec3,b:Vec3):Vec3=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
