// look here for help http://svn.osgeo.org/grass/grass/branches/releasebranch_6_4/vector/v.overlay/main.c
//must be array of polygons

// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html

var jsts = require('jsts');

/**
 * Takes two {@link Polygon} features and returnes a combined {@link Polygon} feature. If the input Polygon features are not contiguous, this function returns a {@link MultiPolygon} feature.
 *
 * @module turf/union
 * @category transformation
 * @param {Polygon} poly1 an input Polygon
 * @param {Polygon} poly2 another input Polygon
 * @return {Feature} a combined {@link Polygon} or {@link MultiPolygon} feature
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
module.exports = function(poly1, poly2){
  var reader = new jsts.io.GeoJSONReader();
  var a = reader.read(JSON.stringify(poly1.geometry));
  var b = reader.read(JSON.stringify(poly2.geometry));
  var union = a.union(b);
  var parser = new jsts.io.GeoJSONParser();

  union = parser.write(union);
  return {
    type: 'Feature',
    geometry: union,
    properties: poly1.properties
  };
}
