// JPL disallows browser CORS requests. Refresh with scripts/fetch-ephemeris.mjs,
// then load the same-origin bundle. No proxy backend or per-frame API calls.
export {loadEphemeris} from './EphemerisCache';
