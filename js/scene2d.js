/**
 * This is a javascript that handles one of the components of the web app,
 * which is the 2D scene. It retrieves the 2D coordinates of points 
 * identified by the user and stores them in an xml file to finally 
 * send the file via an xmlhttp request to fetch2Dcoord.php
 */


//global variables
var i;
var div, image, image_width, image_height, image_rendwidth, image_rendheight, image_offsetLeft, image_offsetTop;
var xmlDoc, element1;


function initXML2D(){
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
    xmlDoc = document.implementation.createDocument(null, 'SetOfMesureAppuisFlottants', null);
    element1 = xmlDoc.createElement('MesureAppuiFlottant1Im');
    subElement1 = xmlDoc.createElement('NameIm');
    subElement1.textContent = image.src.replace(/^.*[\\\/]/, '');
    xmlDoc.documentElement.appendChild(element1);
    element1.appendChild(subElement1);

    var miniDiv = document.getElementById('miniDiv');
    var img = document.getElementById('img');

    console.log(miniDiv);
}

function getImgCoordOnClick(event){

    
    image_rendwidth = image.offsetWidth; //div width
    image_rendheight =  image.offsetHeight; //div height
    image_offsetLeft = div.offsetLeft; 
    image_offsetTop = div.offsetTop;
    /*A function that translates the user clicks into a 2D image position,
    then it stores the 2D coordinates in an xml file fitting the MicMac format*/
    if(event.shiftKey){
        //increase point number on click
        i += 1;
        console.log(image.naturalWidth, image.offsetWidth);
        //getting real image coordinates pointed at
        var cursor_x = event.pageX;
        var cursor_y = event.pageY;
        var pos_x = (cursor_x - image_offsetLeft + 0.5) * image_width / image_rendwidth;
        var pos_y = (cursor_y - image_offsetTop + 0.5) * image_height / image_rendheight;
        var point = document.createElement("img");
        //display a cross on click
        point.setAttribute('src', "data/cross.png");
        point.setAttribute('style',"position:absolute;visibility:hidden;z-index:20;width:10px;height:10px");
        document.body.appendChild(point);
     //   miniDiv.appendChild(point);
     //  miniDiv.insertBefore(point, img);
        //get center of the cross
        point.style.left = cursor_x - point.offsetWidth / 2; // + "px";
        point.style.top =  cursor_y - point.offsetHeight / 2;// + "px";
        point.style.visibility = "visible" ;
        //display coordinates in the console
        console.log("X: " + pos_x + " Y: " + pos_y);
        //updating the xml document with the new 2D coordinates
        var subElement2 = xmlDoc.createElement('OneMesureAF1I');
        //point name
        var subElement3 = xmlDoc.createElement('NamePt');
        subElement3.textContent = i;
        //2D coordinates
        var subElement4 = xmlDoc.createElement('PtIm');
        subElement4.textContent = pos_x + ' ' + pos_y;  
        element1.appendChild(subElement2);
        subElement2.appendChild(subElement3);
        subElement2.appendChild(subElement4);

        // creating XMLhttpRequest object
        var xhr;
        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE 8 and older
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        //php script to write the xml file
        var url = "php/fetch2dcoord.php";

        //open a connection to the server
        xhr.open("POST", url, true);

        //declaring that the data being sent is in XML format
        xhr.setRequestHeader("Content-Type", "text/xml");

        //send the request
        xhr.send(xmlDoc);
    }
    
}



function export2DCoord(ptname,x,y){

    
    image_rendwidth = image.offsetWidth; //div width
    image_rendheight =  image.offsetHeight; //div height
    image_offsetLeft = div.offsetLeft; 
    image_offsetTop = div.offsetTop;
    /*A function that translates the user clicks into a 2D image position,
    then it stores the 2D coordinates in an xml file fitting the MicMac format*/
   
    console.log(image.naturalWidth, image.offsetWidth);
    //getting real image coordinates pointed at
    var cursor_x = event.pageX;
    var cursor_y = event.pageY;
    var pos_x = x; //(cursor_x - image_offsetLeft + 0.5) * image_width / image_rendwidth;
    var pos_y = y; //(cursor_y - image_offsetTop + 0.5) * image_height / image_rendheight;
    var point = document.createElement("img");
    //display a cross on click
    point.setAttribute('src', "data/cross.png");
    point.setAttribute('style',"position:absolute;visibility:hidden;z-index:20;width:10px;height:10px");
    document.body.appendChild(point);
    //   miniDiv.appendChild(point);
    //  miniDiv.insertBefore(point, img);
    //get center of the cross
    point.style.left = cursor_x - point.offsetWidth / 2; // + "px";
    point.style.top =  cursor_y - point.offsetHeight / 2;// + "px";
    point.style.visibility = "visible" ;
    //display coordinates in the console
    console.log("X: " + x + " Y: " + y);
    //updating the xml document with the new 2D coordinates
    var subElement2 = xmlDoc.createElement('OneMesureAF1I');
    //point name
    var subElement3 = xmlDoc.createElement('NamePt');
    subElement3.textContent = i;
    //2D coordinates
    var subElement4 = xmlDoc.createElement('PtIm');
    subElement4.textContent = x + ' ' + y;  
    element1.appendChild(subElement2);
    subElement2.appendChild(subElement3);
    subElement2.appendChild(subElement4);
    //increase point number on click
    i += 1;
    // creating XMLhttpRequest object
    var xhr;
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 and older
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        //php script to write the xml file
        var url = "php/fetch2dcoord.php";

        //open a connection to the server
        xhr.open("POST", url, true);

        //declaring that the data being sent is in XML format
        xhr.setRequestHeader("Content-Type", "text/xml");

        //send the request
        xhr.send(xmlDoc);
    
}

