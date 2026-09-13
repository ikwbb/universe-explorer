# Third-party notices

Universe Explorer's original source code is released under the [MIT License](LICENSE). Dependencies, astronomical data, and imagery retain their own licenses or source terms.

## Runtime libraries

The following direct dependencies are installed through pnpm and are not copied into this repository:

| Project | License |
| --- | --- |
| [React](https://github.com/facebook/react) and React DOM | MIT |
| [Three.js](https://github.com/mrdoob/three.js) | MIT |
| [React Three Fiber](https://github.com/pmndrs/react-three-fiber) | MIT |
| [Drei](https://github.com/pmndrs/drei) | MIT |
| [Lucide](https://github.com/lucide-icons/lucide) | ISC |

Development dependencies include Vite, tsx, and the Vite React plugin under the MIT License, and TypeScript under the Apache License 2.0. Their complete license texts are included in installed packages and their upstream repositories. Transitive dependencies are recorded in `pnpm-lock.yaml` and retain their respective licenses.

## Data and imagery

- Spacecraft state vectors are derived from the [NASA/JPL Horizons System](https://ssd.jpl.nasa.gov/horizons/). NASA/JPL/Caltech are credited as the source. The bundled data is not relicensed by this project's MIT License.
- Planetary elements and physical values are derived from [JPL Solar System Dynamics](https://ssd.jpl.nasa.gov/planets/approx_pos.html) and NASA educational material.
- Stellar and galaxy catalogue values reference [SIMBAD](https://simbad.cds.unistra.fr/simbad/) and NASA sources. Individual database providers may impose attribution or database-use terms.
- The Earth and Moon textures come from the MIT-licensed [Three.js examples repository](https://github.com/mrdoob/three.js/tree/dev/examples/textures/planets). The Earth imagery is based on NASA imagery.

See [DATA_SOURCES.md](DATA_SOURCES.md) for detailed provenance, coordinate conventions, retrieval dates, and scientific limitations.

NASA names and identifiers are used only to identify public missions and data sources. This project is not affiliated with or endorsed by NASA, JPL, Caltech, ESA, JAXA, React, Three.js, or the other projects listed above.
