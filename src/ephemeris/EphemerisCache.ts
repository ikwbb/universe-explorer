export type Sample=[number,number,number,number,number,number,number];
export interface Ephemeris {id:string;horizonsId:string;source:string;retrievedAt:string;frame:string;units:string;samples:Sample[];url:string;header:string}
export const ephemerisCache=new Map<string,Ephemeris>();
const pending=new Map<string,Promise<void>>();
export function loadEphemeris(id:string){if(ephemerisCache.has(id))return Promise.resolve();if(pending.has(id))return pending.get(id)!;const task=fetch(`/data/${id}.json`).then(r=>{if(!r.ok)throw Error(`No bundled ephemeris for ${id}`);return r.json()}).then((data:Ephemeris)=>{if(!data.samples?.length)throw Error('Empty ephemeris');ephemerisCache.set(id,data)}).finally(()=>pending.delete(id));pending.set(id,task);return task;}
