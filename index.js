var gh = require('gh-clipping-algorithm');

/**
 * Takes two {@link Polygon|polygons} and returns a combined polygon. If the input polygons are not contiguous, this function returns a {@link MultiPolygon} feature.
 *
 * @module turf/union
 * @category transformation
 * @param {Feature<Polygon>} poly1 input polygon
 * @param {Feature<Polygon>} poly2 another input polygon
 * @return {Feature<(Polygon|MultiPolygon)>} a combined {@link Polygon} or {@link MultiPolygon} feature
 * @example
 * var poly1 = {
 *   "type": "Feature",
 *   "properties": {
 *     "fill": "#0f0"
 *   },
 *   "geometry": {
 *     "type": "Polygon",
 *     "coordinates": [[
 *       [-82.574787, 35.594087],
 *       [-82.574787, 35.615581],
 *       [-82.545261, 35.615581],
 *       [-82.545261, 35.594087],
 *       [-82.574787, 35.594087]
 *     ]]
 *   }
 * };
 * var poly2 = {
 *   "type": "Feature",
 *   "properties": {
 *     "fill": "#00f"
 *   },
 *   "geometry": {
 *     "type": "Polygon",
 *     "coordinates": [[
 *       [-82.560024, 35.585153],
 *       [-82.560024, 35.602602],
 *       [-82.52964, 35.602602],
 *       [-82.52964, 35.585153],
 *       [-82.560024, 35.585153]
 *     ]]
 *   }
 * };
 * var polygons = {
 *   "type": "FeatureCollection",
 *   "features": [poly1, poly2]
 * };
 *
 * var union = turf.union(poly1, poly2);
 *
 * //=polygons
 *
 * //=union
 */
module.exports = function(poly1, poly2) {
  // console.log(poly1);
  var a = poly1.coordinates ? poly1.coordinates : poly1.geometry.coordinates;
  var b = poly2.coordinates ? poly2.coordinates : poly2.geometry.coordinates;
  var u = gh.union(a, b);

  var feature = {
    "type": "Feature",
    "properties": {},
    "geometry": {}
  };

  if (!u || u.length == 0) {
    return undefined;
  }

  if (gh.utils.isMultiPolygon(u)) {
    if (u.length > 1) {
      feature.geometry.type = "MultiPolygon";
      feature.geometry.coordinates = u;
    } else {
      feature.geometry.type = "Polygon";
      feature.geometry.coordinates = u[0];
    }
  } else if (gh.utils.isPolygon(u)) {
    feature.geometry.type = "Polygon";
    feature.geometry.coordinates = u;
  }

  if (poly1.properties) {
    feature.properties = poly1.properties;
  }

  return feature;
};
