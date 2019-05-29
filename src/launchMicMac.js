function launchMicMac(event, imgName){
    
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            /*
            var output_array = JSON.parse(this.responseText);
            var output = output_array['output'];
            var returned_value = output_array['status'];
            console.log(output);
            if(returned_value==0){
                alert("MicMac calculations are done!");
                window.location.href = 'oriented_images.html';
                
            }else{
                alert("MicMac failed to calculate orientation, for more info press on F12");
            }
            */

           //window.location.href = 'oriented_images.html';
           window.open('oriented_images.html?imgname=' + imgName);
       }
    };

    xmlhttp.open("GET", "launchMicMac.php" +"?"+ "imagename=" + imgName, true);
    xmlhttp.send();

}
