turf-union
===
[![build status](https://secure.travis-ci.org/Turfjs/turf-union.png)](http://travis-ci.org/Turfjs/turf-union)

Combines to polygons into one.

###Install

```sh
npm install turf-union
```

###Parameters

name|description
---|---
polygon1|subject polygon
polygon2|polygon to add

###Usage

```js
union(polygon1, polygon2)
```

###Example

```js
var union = require('turf-union')
var fs = require('fs')

var poly1 = JSON.parse(fs.readFileSync('/path/to/file1.geojson'))
var poly2 = JSON.parse(fs.readFileSync('/path/to/file2.geojson'))

var unioned = union(poly1, poly2)
```
