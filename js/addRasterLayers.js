function addRasterLayers(itowns, view, menuGlobe) {

  // Add one imagery layer to the scene
  // This layer is defined in a json file but it could be defined as a plain js
  // object. See Layer* for more info.
  itowns.Fetcher.json('../../itowns/examples/layers/JSONLayers/Ortho.json').then(function _(config) {
      config.source = new itowns.WMTSSource(config.source);
      var layer = new itowns.ColorLayer('Ortho', config);
      view.addLayer(layer).then(menuGlobe.addLayerGUI.bind(menuGlobe));
  });

  /*          // USA ORTHO WMTS
  itowns.Fetcher.json('../itowns-photogrammetric-camera/examples/layers/JSONLayers/us.json').then(function _(config) {
      config.source = new itowns.WMTSSource(config.source);
      var layerUS = new itowns.ColorLayer('USGS', config);
      view.addLayer(layerUS).then(menuGlobe.addLayerGUI.bind(menuGlobe));
  });
  */
  // Add two elevation layers.
  // These will deform iTowns globe geometry to represent terrain elevation.
  function addElevationLayerFromConfig(config) {
      config.source = new itowns.WMTSSource(config.source);
      var layer = new itowns.ElevationLayer(config.id, config);
      view.addLayer(layer).then(menuGlobe.addLayerGUI.bind(menuGlobe));
  }
  itowns.Fetcher.json('../../itowns/examples/layers/JSONLayers/WORLD_DTM.json').then(addElevationLayerFromConfig);
  itowns.Fetcher.json('../../itowns/examples/layers/JSONLayers/IGN_MNT_HIGHRES.json').then(addElevationLayerFromConfig);

}
