import {LY} from './constants';import type {SpaceObject} from './types';import {equatorialPosition} from './coordinates';
// Rounded J2000 coordinates and catalogue distances, SIMBAD / RECONS.
const rows:[string,string,number,number,number,string,string,string,string][]=[
 ['proxima','Proxima Centauri',217.4292,-62.6795,4.2465,'M5.5 V','0.12 M☉','0.0016 L☉','Confirmed planets; see NASA Exoplanet Archive'],
 ['alpha-centauri-a','Alpha Centauri A',219.9021,-60.8339,4.344,'G2 V','1.1 M☉','1.52 L☉','Not specified; confirmation status can change'],
 ['alpha-centauri-b','Alpha Centauri B',219.8961,-60.8375,4.344,'K1 V','0.91 M☉','0.50 L☉','Not specified; confirmation status can change'],
 ['barnard','Barnard’s Star',269.4521,4.6934,5.9629,'M4 V','0.16 M☉','0.0035 L☉','See NASA Exoplanet Archive'],
 ['wolf-359','Wolf 359',164.1032,7.0147,7.8558,'M6 V','0.09 M☉','0.001 L☉','Candidate status uncertain'],
 ['lalande','Lalande 21185',165.8330,35.9699,8.304,'M2 V','0.39 M☉','0.02 L☉','See NASA Exoplanet Archive'],
 ['sirius','Sirius',101.2872,-16.7161,8.60,'A1 V + DA2','2.06 M☉ (A)','25.4 L☉ (A)','Binary star; planets not specified'],
 ['epsilon-eridani','Epsilon Eridani',53.2327,-9.4583,10.475,'K2 V','0.82 M☉','0.34 L☉','Known planetary system'],
 ['tau-ceti','Tau Ceti',26.0170,-15.9375,11.912,'G8 V','0.78 M☉','0.49 L☉','Planet candidates; status uncertain']
];
export const nearbyStars:SpaceObject[]=rows.map(([id,name,ra,dec,d,spectral,mass,luminosity,planetarySystem])=>({id,name,kind:'star',color:spectral.startsWith('M')?'#e39f83':spectral.startsWith('A')?'#bbd6ff':'#e6d5a8',physicalRadius:({proxima:.154,'alpha-centauri-a':1.22,'alpha-centauri-b':.86,barnard:.196,'wolf-359':.144,lalande:.392,sirius:1.71,'epsilon-eridani':.74,'tau-ceti':.79}[id]??1)*695700,visualRadius:1,physicalPosition:equatorialPosition(ra,dec,d*LY),renderPosition:[0,0,0],distance:d*LY,spectral,mass,luminosity,planetarySystem,description:id==='proxima'?'The nearest star to the Sun. Even light takes more than four years to cross the distance between us.':`${name} is a neighbor of our Sun. Catalogue position is fixed at J2000; proper motion and binary orbits are not simulated.`,focusDistance:LY*2,aliases:id==='proxima'?['proxima centauri','nearest star']:id==='barnard'?["barnard's star"]:[]}));
