
//global variables
var i;
var div, image, image_width, image_height, image_rendwidth, image_rendheight, image_offsetLeft, image_offsetTop;
var xmlDocCalib, element1Calib;


function createMicmacChantierDescripteur(){

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
    xmlDocCalib = document.implementation.createDocument(null, 'Global', null);
    element1Calib = xmlDocCalib.createElement('ChantierDescripteur');


    subElementName = xmlDocCalib.createElement('LocCamDataBase');
    subElementNameDat = xmlDocCalib.createElement('CameraEntry');
    subElementNameDatName = xmlDocCalib.createElement('Name');
    subElementNameDatName.textContent = image.src.replace(/^.*[\\\/]/, '');
    subElementNameDatSzCaptMm = xmlDocCalib.createElement('SzCaptMm');
    subElementNameDatSzCaptMm.textContent = ' 4.9 8.7 ';
    subElementNameDatShortName = xmlDocCalib.createElement('ShortName');
    subElementNameDatShortName.textContent = image.src.replace(/^.*[\\\/]/, '');

    xmlDocCalib.documentElement.appendChild(element1Calib);
    element1Calib.appendChild(subElementName);
    subElementName.appendChild(subElementNameDat);
    subElementNameDat.appendChild(subElementNameDatName);
    subElementNameDat.appendChild(subElementNameDatSzCaptMm);
    subElementNameDat.appendChild(subElementNameDatShortName);


    KeyedNamesAssociations = xmlDocCalib.createElement('KeyedNamesAssociations');
    Calcs = xmlDocCalib.createElement('Calcs');
    Arrite = xmlDocCalib.createElement('Arrite');
    Arrite.textContent = ' 1 1 ';
    Direct = xmlDocCalib.createElement('Direct');
    PatternTransform = xmlDocCalib.createElement('PatternTransform');
    PatternTransform .textContent = '(.*).jpg ';
    CalcName = xmlDocCalib.createElement('CalcName');
    CalcName.textContent = image.src.replace(/^.*[\\\/]/, '');
    Key = xmlDocCalib.createElement('Key');
    Key.textContent = 'NKS-Assoc-STD-CAM ';
 
    element1Calib.appendChild(KeyedNamesAssociations);
    KeyedNamesAssociations.appendChild(Calcs);
    Calcs.appendChild(Arrite);
    Calcs.appendChild(Direct);
    Direct.appendChild(PatternTransform );
    Direct.appendChild(CalcName);
    KeyedNamesAssociations.appendChild(Key);

    KeyedNamesAssociations = xmlDocCalib.createElement('KeyedNamesAssociations');
    Calcs = xmlDocCalib.createElement('Calcs');
    Arrite = xmlDocCalib.createElement('Arrite');
    Arrite.textContent = ' 1 1 ';
    Direct = xmlDocCalib.createElement('Direct');
    PatternTransform = xmlDocCalib.createElement('PatternTransform');
    PatternTransform .textContent = '(.*).jpg ';
    CalcName = xmlDocCalib.createElement('CalcName');
    CalcName.textContent = '50.0';
    Key = xmlDocCalib.createElement('Key');
    Key.textContent = 'NKS-Assoc-STD-FOC ';
 
    element1Calib.appendChild(KeyedNamesAssociations);
    KeyedNamesAssociations.appendChild(Calcs);
    Calcs.appendChild(Arrite);
    Calcs.appendChild(Direct);
    Direct.appendChild(PatternTransform );
    Direct.appendChild(CalcName);
    KeyedNamesAssociations.appendChild(Key);


    var xhrC2;
            
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            
        xhrC2 = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 and older
        xhrC2 = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //php script to write the xml file
    var urlC2 = "createMicmacChantierDescripteur.php";

    //open a connection to the server
    xhrC2.open("POST", urlC2, true);

    //declaring that the data being sent is in XML format
    xhrC2.setRequestHeader("Content-Type", "text/xml");

    //send the request
    xhrC2.send(xmlDocCalib);


    

}

    



