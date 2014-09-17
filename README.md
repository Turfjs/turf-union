# turf-union [![build status][travis-badge]][travis-badge-url]

Find the union of geographic features.

## Usage

```js
var union = require('turf-union');
var result = union(polyA, polyB);

/*
{
  type: 'Feature',
  geometry: union geometry,
  properties: properties from polyA
}
*/
```

Where `polyA` and `polyB` are GeoJson Feature objects, with valid geometry.

[travis-badge]: https://secure.travis-ci.org/Turfjs/turf-union.svg
[travis-badge-url]: http://travis-ci.org/Turfjs/turf-union
