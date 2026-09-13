# Universe Explorer

Universe Explorer is an interactive 3D journey from Earth through the Solar System, humanity's deep-space probes, nearby stars, the Milky Way, and the Local Group. Its central idea is scale: every outward step reveals how small the previous view really was.

<img width="1920" height="1076" alt="image" src="https://github.com/user-attachments/assets/837c2c86-a99f-4e35-86ef-79c28ba32f2d" />

Built with React, TypeScript, Three.js, React Three Fiber, Drei, and Vite. The app runs entirely in the browser and includes its spacecraft ephemerides for offline use.

## Highlights

- Continuous multiscale navigation with a floating origin and logarithmic camera transitions
- The Sun, planets, major moons, asteroid belt, Kuiper Belt, heliosphere, and Oort Cloud
- Bundled NASA/JPL Horizons trajectories for 20 spacecraft missions
- Historical and predicted trajectory styling, mission timelines, and status-aware markers
- Nearby stars, a procedural Milky Way, Local Group galaxies, and cosmic-address navigation
- Distance measurement, light-travel animation, and a virtual deep-space radio exchange
- Simulation time from 1957 to 2030, from real time to 1 billion× and reverse playback
- True-size and visible-size modes, quality settings, immersive mode, keyboard, mouse, and touch controls

## Quick start

Requirements: Node.js 22 or newer and pnpm 11.

```sh
git clone <your-repository-url>
cd universe-explorer
pnpm install
pnpm dev
```

Open <http://127.0.0.1:5173>. Do not open `index.html` directly with a `file://` URL because the app loads bundled data through HTTP.

Create and serve an optimized build:

```sh
pnpm build
pnpm preview
```

## Controls

| Input | Action |
| --- | --- |
| Drag | Orbit the camera |
| Right-drag | Pan |
| Wheel or `+` / `−` | Zoom |
| Hold `Z` | Continue travelling outward |
| `Space` | Pause or resume simulation time |
| `/` | Search |
| `I` | Toggle immersive mode |
| `Escape` | Close overlays or stop continuous travel |

Search supports aliases such as `V1`, `V2`, `M31`, and `Sgr A*`. Guided entry points include **Humanity's farthest**, **Locate the Sun**, and **Where are we?**

## Scientific model

Universe Explorer is an educational visualization, not a navigation or flight-planning tool.

- Planet positions use approximate Keplerian elements.
- Moon phases and several small-body details are illustrative.
- Spacecraft positions use bundled JPL Horizons vectors and cubic Hermite interpolation. The app does not extrapolate beyond a mission's stored coverage.
- Planned paths use a dashed style and are not presented as observations.
- Stellar coordinates are catalogue based; proper motion and binary-star orbits are not simulated.
- Galactic morphology, individual particles, heliosphere shape, and Oort Cloud boundaries are illustrative or approximate.

See [Data sources and limitations](DATA_SOURCES.md) for the complete provenance record.

## Project structure

```text
src/
  data/          astronomical and mission catalogues
  ephemeris/     cached JPL vectors and interpolation
  navigation/    camera travel and focus behavior
  rendering/     multiscale coordinates and floating origin
  scene/         Three.js objects, particles, and trajectories
  simulation/    orbital motion and simulation clock
  ui/            controls, search, details, and timelines
  shaders/       procedural galaxy shaders
public/
  data/          bundled spacecraft state vectors
  textures/      Earth and Moon textures
tests/           scale, orbit, and ephemeris validation
```

## Validation

```sh
pnpm test
pnpm build
```

The test suite checks scale transitions, floating-origin precision, orbital behavior, all bundled spacecraft datasets, interpolation boundaries, mission end dates, and Voyager's present scale and light delay.

## Updating spacecraft data

The repository already contains the data required at runtime. To download the base Horizons datasets again:

```sh
pnpm data:download -- --force
```

Review every changed dataset before committing it. JPL coverage varies by mission, and the existing bundle includes denser samples around selected encounters and recent orbital intervals that the base downloader does not recreate.

## License

Original source code is available under the [MIT License](LICENSE). Third-party libraries, data, and imagery retain their original licenses or source terms; see [Third-party notices](THIRD_PARTY_NOTICES.md).
