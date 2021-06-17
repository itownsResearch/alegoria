function addBuildingOrientedImageLayer(itowns, view, orientedImageLayer) {
  console.log("addBuildingOrientedImageLayer");

  function altitudeBuildings(properties) {
      //console.log(properties.z_min, properties.hauteur);
      return properties.z_min - properties.hauteur - 3;
  }

  function extrudeBuildings(properties) {
      if (properties.id.indexOf('bati_remarquable') === 0)
          return properties.hauteur;
          else
          return properties.hauteur; // + 20;
  }


  function colorBuildings(properties) {
      if (properties.id.indexOf('bati_remarquable') === 0) {
          return color.set(0x5555ff);
      } else if (properties.id.indexOf('bati_industriel') === 0) {
          return color.set(0xff5555);
      }
      return color.set(0xeeeeee);
  }

  // prepare WFS source for the buildings
  const wfsBuildingSource1 = new itowns.WFSSource({
      url: 'https://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/wfs?',
      version: '2.0.0',
      typeName: 'BDTOPO_BDD_WLD_WGS84G:bati_remarquable,BDTOPO_BDD_WLD_WGS84G:bati_indifferencie,BDTOPO_BDD_WLD_WGS84G:bati_industriel',
      crs: 'EPSG:4326',
      ipr: 'IGN',
      format: 'application/json',
      zoom: { min: 15, max: 15 },
  });

  // create geometry layer for the buildings
  const wfsBuildingLayer1 = new itowns.GeometryLayer('Buildings', new itowns.THREE.Group(), {
      update: itowns.FeatureProcessing.update,
      convert: itowns.Feature2Mesh.convert({
          altitude: altitudeBuildings,
          extrude: extrudeBuildings }),

      // when a building is created, it get the projective texture mapping, from oriented image layer.
      onMeshCreated: (mesh) => mesh.traverse(object => object.material = orientedImageLayer.material),
      source: wfsBuildingSource1,
    //  overrideAltitudeInToZero: true,
  });

  // add the created building layer, and debug UI
  view.addLayer(wfsBuildingLayer1).then(function addDebugUI(buildingLayer) {
      var gui = debug.GeometryDebug.createGeometryDebugUI(menuGlobe.gui, view, buildingLayer);
      debug.GeometryDebug.addWireFrameCheckbox(gui, view, buildingLayer);
  });

  // Test to project on a 3D model
  // model.traverse(function _(obj) { obj.material = olayer.material; });

  var wfsBuildingSource = new itowns.WFSSource({
      url: 'https://wxs.ign.fr/vboe9ia0y4tnpi7pxabn4dbj/geoportail/wfs?',//3ht7xcw6f7nciopo16etuqp2/geoportail/wfs?',
      version: '3.0.0',
      typeName: 'BDTOPO_V3:batiment', //'BDTOPO_BDD_WLD_WGS84G:bati_remarquable,BDTOPO_BDD_WLD_WGS84G:bati_indifferencie,BDTOPO_BDD_WLD_WGS84G:bati_industriel',
      crs: 'EPSG:3857',//'EPSG:4326',
      ipr: 'IGN',
      format: 'application/json',
      zoom: { min: 15, max: 15 },

  });
}

function addBuildingLayer(itowns, view) {

  console.log("addBuildingLayer");
  var wfsBuildingSource2 = new itowns.WFSSource({
      url: 'https://wxs.ign.fr/3ht7xcw6f7nciopo16etuqp2/geoportail/wfs?',
      version: '2.0.0',
      typeName: 'BDTOPO_BDD_WLD_WGS84G:bati_remarquable,BDTOPO_BDD_WLD_WGS84G:bati_indifferencie,BDTOPO_BDD_WLD_WGS84G:bati_industriel',
      crs: 'EPSG:4326',
      ipr: 'IGN',
      format: 'application/json',
      zoom: { min: 15, max: 15 },
      extent: {
          west: -10,
          east: 15.18,
          south: 40.437,
          north: 55,
      },
  });


  function acceptFeature(properties) {
    return !!properties.hauteur;
  }

  let meshes = [];
  const wfsBuildingLayer2 = new itowns.GeometryLayer('WFS Building', new itowns.THREE.Group(), {
      update: itowns.FeatureProcessing.update,
      convert: itowns.Feature2Mesh.convert({
          //color: colorBuildings,
          batchId: function (property, featureId) { return featureId; },
          //altitude: altitudeBuildings,
          //extrude: extrudeBuildings
        }),
      onMeshCreated: function scaleZ(mesh) {
          mesh.scale.z = 0.01;
          meshes.push(mesh);
        //  meshesForeverever.push(mesh);
      },
      filter: acceptFeature,
      //overrideAltitudeInToZero: true,
      source: wfsBuildingSource2
  });
  view.addLayer(wfsBuildingLayer2);


  function scaler() {
      var i;
      var mesh;
      if (meshes.length) {
          view.notifyChange(view.camera.camera3D, true);
      }
      for (i = 0; i < meshes.length; i++) {
          mesh = meshes[i];
          if (mesh) {
              mesh.scale.z = Math.min(
                  1.0, mesh.scale.z + 0.1);
              mesh.updateMatrixWorld(true);
          }
      }
      meshes = meshes.filter(function filter(m) { return m.scale.z < 1; });
  };

  view.addFrameRequester(itowns.MAIN_LOOP_EVENTS.BEFORE_RENDER, scaler);
}
