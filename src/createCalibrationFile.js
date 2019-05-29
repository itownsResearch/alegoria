/**
 * This is a javascript that handles one of the components of the web app,
 * which is the 2D scene. It retrieves the 2D coordinates of points 
 * identified by the user and stores them in an xml file to finally 
 * send the file via an xmlhttp request to fetch2Dcoord.php
 */

//global variables
var i;
var div, image, image_width, image_height, image_rendwidth, image_rendheight, image_offsetLeft, image_offsetTop;
var xmlDocCalib, element1Calib;


function createCalib(){

    i = 0;
    //store image parameters
    image = document.getElementById("img");
    div = document.getElementById("miniDiv");
    image_width = image.naturalWidth; //image real width
    image_height = image.naturalHeight; //image real height
    image_rendwidth = image.offsetWidth; //div width
    image_rendheight =  image.offsetHeight; //div height
    image_offsetLeft = div.offsetLeft; 
    image_offsetTop = div.offsetTop;


    //initializing the xml document(appuis.xml)
    xmlDocCalib = document.implementation.createDocument(null, 'ExportAPERO', null);
    element1Calib = xmlDocCalib.createElement('CalibrationInternConique');



    subElementName = xmlDocCalib.createElement('NameIn');
    subElementName.textContent = s1.textContent = image.src.replace(/^.*[\\\/]/, '');
    xmlDocCalib.documentElement.appendChild(subElementName);

    subElement1 = xmlDocCalib.createElement('KnownConv');
    subElement1.textContent = 'eConvApero_DistM2C';
    xmlDocCalib.documentElement.appendChild(element1Calib);
    element1Calib.appendChild(subElement1);


    var subElement2 = xmlDocCalib.createElement('PP');
    subElement2.textContent = image_width/2 + ' '+ image_height/2;
    element1Calib.appendChild(subElement2);

    var subElement3 = xmlDocCalib.createElement('F');
    subElement3.textContent = Math.max(image_width, image_height) * 50 / 36;
    element1Calib.appendChild(subElement3);

    var subElement4 = xmlDocCalib.createElement('SzIm');
    subElement4.textContent = image_width + ' '+ image_height;
    element1Calib.appendChild(subElement4);

    var subElement5 = xmlDocCalib.createElement('CalibDistortion');
    element1Calib.appendChild(subElement5);

    var subsubElement5 = xmlDocCalib.createElement('ModRad');
    subElement5.appendChild(subsubElement5);
    var subsubsubElement5 = xmlDocCalib.createElement('CDist');
    subsubsubElement5.textContent = image_width/2 + ' '+ image_height/2;
    subsubElement5.appendChild(subsubsubElement5);


            
    var xhrC;
            
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            
        xhrC = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 and older
        xhrC = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //php script to write the xml file
    var urlC = "../../src/createCalibrationFile.php";

    //open a connection to the server
    xhrC.open("POST", urlC, true);

    //declaring that the data being sent is in XML format
    xhrC.setRequestHeader("Content-Type", "text/xml");

    //send the request
    xhrC.send(xmlDocCalib);


    

}

    



