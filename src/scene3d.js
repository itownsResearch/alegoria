/**
 * This is a javascript that handles the second component of the web app, which is the 3D scene
 * it retrieves the 3D coordinates of points identified by the user, then stores them in an xml file
 * and sends the file via an xmlhttp request to fetch3dcoord.php 
 */

//initializing variables
var container = document.getElementById("model");
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var WIDTH = 1024;
var HEIGHT = 768;
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 0.1;
var FAR = 10000;
camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.position.z = 300;
camera.up = new THREE.Vector3( 0, 0, 1 );
scene.add(camera);
// var camera = new THREE.PerspectiveCamera( 40, window.innerWidth/ window.innerHeight, 0.2, 25000 );
var cameraTarget = new THREE.Vector3(8545, 8389, 92);
var controls = new THREE.OrbitControls(camera);
var axesHelper = new THREE.AxesHelper(5);
var loader = new THREE.PLYLoader();
var pc; //point cloud
var pivot;
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.3;
var ptname = 0;

//initializing the xml document(appuis.xml)
var xmlDoc2 = document.implementation.createDocument(null, 'DicoAppuisFlottant', null);

//add axes to scene
scene.add( axesHelper );
//set white color in background and size to 800*800
renderer.setClearColor(0xffffff, 1);
renderer.setSize(800, 480);
//add renderer to div element
container.appendChild(renderer.domElement);
// camera.position.set(100, -400, 2000);
// //update controls to match the new camera position 
// controls.update();

//load micmac ply file
loader.load("../data/chambord_small.ply", function (geometry) {

    //array of each point's position 
    var posArray = geometry.attributes.position.array;
    pivot = new THREE.Vector3(posArray[0], posArray[1], posArray[2]);
    //material of points
    var material = new THREE.PointsMaterial({size: 0.3, vertexColors: THREE.VertexColors,  transparent: true, opacity:0.8});
   
    //change axis direction y to z and z to y (X is red, Y is blue, Z is green)
    for (var i = 0; i < posArray.length; i +=3){

        posArray[i] -= pivot.x;
        // var tempY = posArray[ i + 1];
        // posArray[i + 1] = posArray[i + 2] - pivot.z;
        // posArray[i + 2] = tempY - pivot.y;
        posArray[i + 1] -= pivot.y;
        posArray[i + 2] -= pivot.z;
        
    }
    // camera.position.set(8545, 8389, 92);
    // //update controls to match the new camera position 
    // controls.update();

    geometry.attributes.position.needsUpdate = true;
    //display the hidden point cloud (threejs bug)
    geometry.computeBoundingSphere();

    //add the point cloud to scene
    pc = new THREE.Points(geometry, material);
    scene.add( pc );
    animate();

});

//raycasting
function raycast() {
    
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObject(pc);

    if (intersects.length) {

        //index of the first point intersected
        var index = intersects[0].index;
  
        var newColor = new THREE.Color();
        newColor.setRGB(1, 0, 0);
        
        //change point color to red on click
        pc.geometry.attributes.color.array[index * 3] = newColor.r;
        pc.geometry.attributes.color.array[index * 3 + 1] = newColor.g;
        pc.geometry.attributes.color.array[index * 3 + 2] = newColor.b;
        pc.geometry.attributes.color.needsUpdate = true;
        
        //incrementing point number
        ptname += 1;
        
        //get the coordinates of the intersected point
        var x = pc.geometry.attributes.position.array[index * 3] + pivot.x;
        var y = pc.geometry.attributes.position.array[index * 3 + 1] + pivot.y;
        var z = pc.geometry.attributes.position.array[index * 3 + 2] + pivot.z;

        //update the xml document
        var element1 = xmlDoc2.createElement('OneAppuisDAF');
        xmlDoc2.documentElement.appendChild(element1);
        var subelement1 = xmlDoc2.createElement('Pt');
        subelement1.textContent = x + " " + y + " " + z;
        element1.appendChild(subelement1);
        subelement2 = xmlDoc2.createElement('NamePt');
        subelement2.textContent = ptname;
        element1.appendChild(subelement2);
        subelement3 = xmlDoc2.createElement('Incertitude');
        subelement3.textContent = 1 + " " + 1 + " " + 1;
        element1.appendChild(subelement3);

        console.log(x,y,z);

        //creating XMLhttpRequest object
        var xhr2;
        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            xhr2 = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE 8 and older
            xhr2 = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var url2 = "fetch3dcoord.php";

        //open a connection to the server
        xhr2.open("POST", url2, true);

        //declaring that the data being sent is in XML format
        xhr2.setRequestHeader("Content-Type", "text/xml");

        //send the request
        xhr2.send(xmlDoc2);
        
    }
    
}

//get 3d coordinates of clicked point
function get3dCoordOnClick(event) {
    
    if(event.altKey){
        mouse.x = ((event.clientX - container.offsetLeft) / renderer.domElement.width) * 2 - 1;
        mouse.y = - ((event.clientY - container.offsetTop) / renderer.domElement.height) * 2 + 1;
        raycast();
    }
    
}

function render() {
    camera.lookAt(cameraTarget);
    controls.update();
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}





