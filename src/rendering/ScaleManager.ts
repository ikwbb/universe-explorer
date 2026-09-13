import {AU,LY,PC,type Vec3} from '../data/constants';
export const MIN_SPAN=100,MAX_SPAN=LY*50e6;
export const levels=[{name:'Earth & Moon',short:'Earth',span:45000,anchor:'earth'},{name:'Solar System',short:'Solar System',span:AU*45,anchor:'sun'},{name:'Outer Solar System',short:'Deep space',span:AU*450,anchor:'sun'},{name:'Oort Cloud',short:'Oort Cloud',span:AU*120000,anchor:'sun'},{name:'Stellar Neighborhood',short:'Nearby stars',span:LY*35,anchor:'sun'},{name:'Milky Way',short:'Milky Way',span:LY*150000,anchor:'milky-way'},{name:'Local Group',short:'Local Group',span:LY*6e6,anchor:'milky-way'}];
export function scaleLevel(span:number){return span<AU*.015?0:span<AU*65?1:span<AU*2000?2:span<LY*5?3:span<LY*4000?4:span<LY*700000?5:6;}
export function layerUnit(span:number){if(span<AU*.01)return 1;if(span<AU*1000)return AU;if(span<LY*1000)return LY;if(span<LY*1e6)return PC*1000;return PC*1e6;}
export function rebase(position:Vec3,origin:Vec3,span:number):Vec3 {return [(position[0]-origin[0])/span*10,(position[1]-origin[1])/span*10,(position[2]-origin[2])/span*10];}
export const clampSpan=(span:number)=>Math.min(MAX_SPAN,Math.max(MIN_SPAN,span));
export const lerpLog=(a:number,b:number,t:number)=>Math.abs(a-b)/b<1e-12?b:Math.exp(Math.log(a)+(Math.log(b)-Math.log(a))*t);
export const smooth=(t:number)=>{t=Math.min(1,Math.max(0,t));return t*t*(3-2*t)};
export const lodFade=(span:number,min:number,max:number)=>smooth((Math.log(span)-Math.log(min))/(Math.log(max)-Math.log(min)));
