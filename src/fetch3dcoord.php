<?php
   
    //collect data sent as XML 
    $xml2 = file_get_contents('php://input');

    $x = new SimpleXMLElement($xml2);
    $imagename = $x->NameIm;
    $imagename = preg_replace('/\\.[^.\\s]{3,4}$/', '', $imagename);

    //open a file handler with read and write permission
    $fh2 = fopen('../outputs/test/gcp_'. $imagename . '.xml', 'w+');
    //writing XML string to the new file
    fwrite($fh2, $xml2);
    //closing the file handler
    fclose($fh2);
    echo($xml2);
?>