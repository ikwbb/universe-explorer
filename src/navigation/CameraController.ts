import {norm,subtract,type Vec3} from '../data/constants';
import {clampSpan,lerpLog,smooth} from '../rendering/ScaleManager';
export interface Flight {from:Vec3;to:Vec3;fromSpan:number;toSpan:number;wide:number;elapsed:number;duration:number}
export class Navigation {
 origin:Vec3=[0,0,0]; span=45000;targetSpan=45000;flight:Flight|null=null;follow='earth';zooming=false;paused=false;initialized=false;
 fly(to:Vec3,span:number,follow=''){this.paused=false;this.follow=follow;this.targetSpan=clampSpan(span);this.flight={from:[...this.origin],to:[...to],fromSpan:this.span,toSpan:this.targetSpan,wide:Math.max(this.span,span,norm(subtract(to,this.origin))*1.6),elapsed:0,duration:3.8};}
 tick(dt:number,position?:(id:string)=>Vec3|undefined){if(this.paused)return;if(this.zooming){this.flight=null;this.targetSpan=clampSpan(this.targetSpan*Math.exp(dt*1.8));}if(this.flight){const f=this.flight;f.elapsed+=Math.min(dt,.1);const t=f.elapsed/f.duration;if(t<.3)this.span=lerpLog(f.fromSpan,f.wide,smooth(t/.3));else if(t<.65){this.span=f.wide;const a=smooth((t-.3)/.35);this.origin=f.from.map((v,i)=>v+(f.to[i]-v)*a)as Vec3;}else{this.origin=[...f.to];this.span=lerpLog(f.wide,f.toSpan,smooth((t-.65)/.35));}if(t>=1){this.origin=[...f.to];this.span=f.toSpan;this.flight=null;}}else{this.span=lerpLog(this.span,this.targetSpan,1-Math.exp(-dt*8));if(this.follow){const p=position?.(this.follow);if(p)this.origin=[...p];}}}
 zoom(delta:number){this.flight=null;this.paused=false;this.targetSpan=clampSpan(this.targetSpan*Math.exp(delta));}
}
export const navigation=new Navigation();
