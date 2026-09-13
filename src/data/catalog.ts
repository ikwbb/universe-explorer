import {solarSystem} from './solarSystem';
import {moons} from './moons';
import {spacecraftCatalog} from './spacecraftCatalog';
import {nearbyStars} from './nearbyStars';
import {milkyWay,sagittarius,nearbyGalaxies} from './galaxies';
export const catalog=[...solarSystem,...moons,...spacecraftCatalog,...nearbyStars,milkyWay,sagittarius,...nearbyGalaxies];
export const findObject=(id:string)=>catalog.find(b=>b.id===id);
