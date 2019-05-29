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
var xmlDoc2 = document.implementation.createDocument(null, 'Global', null);
//DicoAppuisFlottant

//var image = document.getElementById("img");
var s1 = xmlDoc2.createElement('NameIm');
s1.textContent = image.src.replace(/^.*[\\\/]/, '');
xmlDoc2.documentElement.appendChild(s1);
//element1.appendChild(s1);

var dico = xmlDoc2.createElement('DicoAppuisFlottant');
xmlDoc2.documentElement.appendChild(dico);

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

    var url2 = "../../src/fetch3dcoord.php";

    //open a connection to the server
    xhr2.open("POST", url2, true);

    //declaring that the data being sent is in XML format
    xhr2.setRequestHeader("Content-Type", "text/xml");

    //send the request
    xhr2.send(xmlDoc2);
         
}