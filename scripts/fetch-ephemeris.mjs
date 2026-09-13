import fs from 'node:fs/promises';
const force=process.argv.includes('--force');
const targets=[
 ['voyager-1','-31','1977-09-06','2030-01-01'],['voyager-2','-32','1977-08-21','2030-01-01'],
 ['pioneer-10','-23','1972-03-04','2030-01-01'],['pioneer-11','-24','1973-04-07','2030-01-01'],
 ['new-horizons','-98','2006-01-20','2030-01-01'],['juno','-61','2011-08-06','2026-10-01'],
 ['galileo','-77','1989-10-20','2003-09-21'],['cassini','-82','1997-10-16','2017-09-15'],
 ['parker','-96','2018-08-13','2026-10-01'],['solar-orbiter','-144','2020-02-11','2026-10-01'],
 ['ulysses','-55','1990-10-07','2009-06-30'],['osiris','-64','2016-09-09','2026-10-01'],
 ['hayabusa2','-37','2014-12-04','2026-10-01'],['rosetta','-226','2004-03-03','2016-09-30'],
 ['dawn','-203','2007-09-28','2018-11-01'],['lucy','-49','2021-10-17','2026-10-01'],
 ['psyche','-255','2023-10-14','2026-10-01'],['europa-clipper','-159','2024-10-15','2026-10-01'],
 ['juice','-28','2023-04-15','2026-10-01'],['huygens','-150','2004-12-26','2005-01-14']
];
const dir=new URL('../public/data/',import.meta.url);await fs.mkdir(dir,{recursive:true});
export function parseVectors(result){const body=result.split('$$SOE')[1]?.split('$$EOE')[0];if(!body)throw new Error(result.slice(-1800));return body.trim().split('\n').map(line=>{const a=line.split(',').map(s=>s.trim());return [Number(a[0]),...a.slice(2,8).map(Number)];}).filter(a=>a.length===7&&a.every(Number.isFinite));}
async function request(id,start,stop,step='30 d'){
 const q=new URLSearchParams({format:'json',COMMAND:`'${id}'`,OBJ_DATA:"'YES'",MAKE_EPHEM:"'YES'",EPHEM_TYPE:"'VECTORS'",CENTER:"'500@10'",START_TIME:`'${start}'`,STOP_TIME:`'${stop}'`,STEP_SIZE:`'${step}'`,VEC_TABLE:"'2'",CSV_FORMAT:"'YES'",OUT_UNITS:"'KM-S'",REF_PLANE:"'ECLIPTIC'",REF_SYSTEM:"'ICRF'",VEC_CORR:"'NONE'"});
 const url=`https://ssd.jpl.nasa.gov/api/horizons.api?${q}`;
 const res=await fetch(url,{signal:AbortSignal.timeout(45000)});if(!res.ok)throw new Error(`HTTP ${res.status}`);const json=await res.json();if(json.error)throw new Error(json.error);return {samples:parseVectors(json.result),url,header:json.result.split('$$SOE')[0]};
}
const manifest={retrievedAt:new Date().toISOString(),source:'NASA/JPL Horizons',frame:'Heliocentric ecliptic J2000',units:'km, km/s; epochs JD TDB',missions:{}};
for(const [slug,id,start,stop]of targets){try{
 const file=new URL(`${slug}.json`,dir);try{const cached=JSON.parse(await fs.readFile(file,'utf8'));if(!force&&cached.samples?.length>1){manifest.missions[slug]={count:cached.samples.length,start:cached.samples[0][0],end:cached.samples.at(-1)[0]};console.log('Cached',slug);continue}}catch{}
 let data;try{data=await request(id,start,stop,slug==='huygens'?'6 h':'30 d')}catch(e){console.log('Full interval unavailable',slug,String(e).slice(0,180));data=await request(id,slug==='huygens'?start:'2026-09-01',slug==='huygens'?stop:'2026-09-30','1 d')}
 if(!data.samples.length)throw new Error('Empty table');
 await fs.writeFile(file,JSON.stringify({id:slug,horizonsId:id,source:'NASA/JPL Horizons',retrievedAt:manifest.retrievedAt,frame:manifest.frame,units:manifest.units,...data}));
 manifest.missions[slug]={count:data.samples.length,start:data.samples[0][0],end:data.samples.at(-1)[0]};console.log('Saved',slug,data.samples.length);
 }catch(e){manifest.missions[slug]={error:String(e)};console.log('Unavailable',slug,String(e).slice(0,300))}}
await fs.writeFile(new URL('manifest.json',dir),JSON.stringify(manifest,null,2));
