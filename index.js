// look here for help http://svn.osgeo.org/grass/grass/branches/releasebranch_6_4/vector/v.overlay/main.c
//must be array of polygons

// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html

var jsts = require('jsts');

/**
 * Takes two polygons and combines them into one polgyon.
 *
 * @module turf/union
 * @param {Polygon} poly1 an input Polygon
 * @param {Polygon} poly2 another input Polygon
 * @return {Polygon} a combined Polygon
 * @example
 * var a = turf.polygon([[[10,0],[20,10],[20,0],[10,0]]]);
 * a.properties.fill = '#0f0';
 * var b = turf.polygon([[[10+5,0+5],[20+5,10+5],
 *   [20+5,0+5],[10+5,0+5]]]);
 * b.properties.fill = '#00f';
 * var union = turf.union(a, b);
 * //=a
 * //=b
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
