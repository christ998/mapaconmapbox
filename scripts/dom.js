function createMap({estilo, center, zoom}) {
  mapboxgl.accessToken = 'pk.eyJ1Ijoiem9ycm9tcGEiLCJhIjoiY2tzMjZwdXYwMDB4cjJyc21hb2NvNHlwMiJ9.BDv_dfjwQfXeHfephScitQ';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: `mapbox://styles/mapbox/${estilo}`, // style URL
    center: [center[1], center[0]], // starting position [lng, lat]
    zoom: zoom // starting zoom
  })
  return map
}

function createMarker(map, {lat, lon}) {
  const marker = new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map)
}

function createPolygonOneByOne(map, polygonObject) {
  if (map.isStyleLoaded()){
    addPolygon()
  }
  map.on('load', addPolygon)

  // Add a data source containing GeoJSON data.
  function addPolygon() {

    map.addSource(polygonObject['name'], {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          //   // These coordinates outline Maine.
          'coordinates': polygonObject['coordinates']

        }
      }

    });
    addLayer()
    addPopup()
  }

  // Add a new layer to visualize the polygon.
  function addLayer() {
    map.addLayer({
      'id': 'idLayer-' + polygonObject['name'],
      'type': 'fill',
      'source': polygonObject['name'], // reference the data source
      'layout': {
        'visibility': polygonObject['display']
      },
      'paint': {
        'fill-color': polygonObject['fillColour'], // blue color fill
        'fill-opacity': polygonObject['fillOpacity'],
      }
    });
    // Add a black outline around the polygon.
    map.addLayer({
      'id': 'outline-' + polygonObject['name'],
      'type': 'line',
      'source': polygonObject['name'],
      'layout': {
        'visibility': polygonObject['display']
      },
      'paint': {
        'line-color': polygonObject['lineColour'],
        'line-width': polygonObject['lineWidth']
      }
    })
  };

  function addPopup() {
    // When a click event occurs on a feature in the states layer,
    // open a popup at the location of the click, with description
    // HTML from the click event's properties.
    map.on('click', 'idLayer-' + polygonObject['name'], (e) => {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].source)
        .addTo(map);
    });

    // Change the cursor to a pointer when
    // the mouse is over the states layer.
    map.on('mouseenter', 'idLayer-' + polygonObject['name'], () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change the cursor back to a pointer
    // when it leaves the states layer.
    map.on('mouseleave', 'idLayer-' + polygonObject['name'], () => {
      map.getCanvas().style.cursor = '';
    });
  }


}


function createPolygon(map, polygonObject) {
  map.on('load', addPolygon);

  // Add a data source containing GeoJSON data.
  function addPolygon() {
    map.addSource(polygonObject['properties']['name'], {
      'type': 'geojson',
      'data': polygonObject
      // 'type': 'Feature',
      // 'geometry': {
      //   'type': 'Polygon',
      //   // These coordinates outline Maine.
      //   'coordinates': polygonObject['vertexes']
      //
      // }

    });
    addLayer()
    addPopup()
  }

  // Add a new layer to visualize the polygon.
  function addLayer() {
    map.addLayer({
      'id': 'idLayer-' + polygonObject['properties']['name'],
      'type': 'fill',
      'source': polygonObject['properties']['name'], // reference the data source
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-color': polygonObject['properties']['fill'], // blue color fill
        'fill-opacity': polygonObject['properties']['fill-opacity'],
      }
    });
    // Add a black outline around the polygon.
    map.addLayer({
      'id': 'outline-' + polygonObject['properties']['name'],
      'type': 'line',
      'source': polygonObject['properties']['name'],
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'line-color': polygonObject['properties']['stroke'],
        'line-width': polygonObject['properties']['stroke-width']
      }
    })
  };

  function addPopup() {
    // When a click event occurs on a feature in the states layer,
    // open a popup at the location of the click, with description
    // HTML from the click event's properties.
    map.on('click', 'idLayer-' + polygonObject['properties']['name'], (e) => {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].source)
        .addTo(map);
    });

    // Change the cursor to a pointer when
    // the mouse is over the states layer.
    map.on('mouseenter', 'idLayer-' + polygonObject['properties']['name'], () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change the cursor back to a pointer
    // when it leaves the states layer.
    map.on('mouseleave', 'idLayer-' + polygonObject['properties']['name'], () => {
      map.getCanvas().style.cursor = '';
    });
  }

}

function addAllPolygons(map, allPolygons) {
  allPolygons['features'].forEach((item) => createPolygon(map, item))
}

function changeDisplay(map, name, visibility) {
  // const visibility = map.getLayoutProperty(`idLayer-${name}`, 'visibility')
  if (visibility == 'none') {
    map.setLayoutProperty(`idLayer-${name}`, 'visibility', 'none')
    map.setLayoutProperty(`outline-${name}`, 'visibility', 'none')
  } else {
    map.setLayoutProperty(`idLayer-${name}`, 'visibility', 'visible')
    map.setLayoutProperty(`outline-${name}`, 'visibility', 'visible')
  }
}

function removeSource(map, source) {
  map.removeLayer('idLayer-' + source)
  map.removeLayer('outline-' + source)
  map.removeSource(source)
}


export {
  createMap,
  createMarker,
  createPolygon,
  addAllPolygons,
  changeDisplay,
  createPolygonOneByOne,
  removeSource
}



