/**
 * This is a javascript to fetch 3D coordinates from iTowns 
 * and to save it to an xml file for MicMac computations
 */

//Initialize xml file (appuis.xml)

/*
var xmlXtra = document.implementation.createDocument(null, 'extraInfos', null);
var s1 = xmlXtra.createElement('NameIm');
s1.textContent = image.src.replace(/^.*[\\\/]/, '');
xmlXtra.documentElement.appendChild(s1);
*/
var xmlDoc2;
var dico;

function initXML3D(){

    xmlDoc2 = document.implementation.createDocument(null, 'Global', null);
    //DicoAppuisFlottant

    var image2 = document.getElementById("img");
    var s1 = xmlDoc2.createElement('NameIm');
    s1.textContent = image2.src.replace(/^.*[\\\/]/, '');
    xmlDoc2.documentElement.appendChild(s1);
    //element1.appendChild(s1);

    dico = xmlDoc2.createElement('DicoAppuisFlottant');
    xmlDoc2.documentElement.appendChild(dico);
}

//Function to export 3D coordinates
function export3Dcoord(ptname,x,y,z) {
        
    //update the xml document
    var element1 = xmlDoc2.createElement('OneAppuisDAF');
    dico.appendChild(element1);  //xmlDoc2.documentElement
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


// Function to export in the database through WFS
// Export a THREEJS Camera (quaternion and co) to the database
// tableName for ex frejus
// Beware of the coordinate system. By default, all is in geocentric coordinates 
// as it is used in the 3D scene (orientation and position on earth (geocentric))
function exportToWFS(cam, tableName, source){

       var q = cam.quaternion;
       var f = cam.focal;
       var p = cam.point;
       var s = cam.view;
       var d = cam.distos[0];
       if(d == undefined) {d = {R : new THREE.Vector4(), C : new THREE.Vector2()};}
       var name = cam.originalName; // cam.name; // Beware of url vs name
       var pos = cam.position;
       var epsg = 4978;  // Default epsg
       //                                 <id> '+ Math.floor(Math.random() * 100000) + ' </id>\
       // Sending the transaction to the WFS
       var url_0 = 'http://134.158.75.67:8080/geoserver/wfs'; // 'http://134.158.75.67:8080/geoserver/alegoria/ows?SERVICE=WFS'; // &REQUEST=Transaction'; //&typeName=alegoria%3Afrejus&VERSION=2.0.0';       
       var data3 = '<wfs:Transaction service="WFS" version="1.0.0"\
                       xmlns:wfs="http://www.opengis.net/wfs"\
                       xmlns:topp="http://www.openplans.org/topp"\
                       xmlns:gml="http://www.opengis.net/gml"\
                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
                       xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd http://www.openplans.org/topp http://localhost:8080/geoserver/wfs/DescribeFeatureType?typename=' + tableName + '}">\
                       <wfs:Insert>\
                           <' + tableName + '>\
                               <point>\
                                   <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4978">\
                                       <gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts=" ">' + pos.x +','+ pos.y +','+ pos.z + '</gml:coordinates>\
                                   </gml:Point>\
                               </point>\
                               <name>\
                                   '+ name + '\
                               </name>\
                               <qx>' + q.x + '</qx>\
                               <qy>' + q.y + '</qy>\
                               <qz>' + q.z + '</qz>\
                               <qw>' + q.w + '</qw>\
                               <fx>' + f.x + '</fx>\
                               <fy>' + f.y + '</fy>\
                               <px>' + p.x + '</px>\
                               <py>' + p.y + '</py>\
                               <sk>0.0</sk>\
                               <sx>' + s.width + '</sx>\
                               <sy>' + s.height + '</sy>\
                               <c3>' + d.R.x  + '</c3>\
                               <c5>' + d.R.y  + '</c5>\
                               <c7>' + d.R.z  + '</c7>\
                               <cm>' + d.R.w  + '</cm>\
                               <cx>' + d.C.x  + '</cx>\
                               <cy>' + d.C.y  + '</cy>\
                               <source>' + source  + '</source>\
                               <epsgquaternion>' + epsg  + '</epsgquaternion>\
                           </' + tableName + '>\
                       </wfs:Insert>\
                       </wfs:Transaction>';

       fetch(url_0, {
           method: 'POST', // or 'PUT'
           body: data3, // JSON.stringify(data), // data can be `string` or {object}!
           headers:{
               'Content-Type': 'application/json'
       }
       }).then(res => res.json())
       .then(response => console.log('Success:', JSON.stringify(response)))
       .catch(error => console.error('Error:', error));



}