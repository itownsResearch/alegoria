<?php
//collect data sent as XML 
$xml = file_get_contents('php://input');
$x = new SimpleXMLElement($xml);
$imagename = $x->MesureAppuiFlottant1Im->NameIm;
$imagename = preg_replace('/\\.[^.\\s]{3,4}$/', '', $imagename);

//open a file handler with read and write permission
$fh = fopen('../data/test/appuis_'. $imagename . '.xml', 'w+');
//writing XML string to the new file
fwrite($fh, $xml);
//closing the file handler
fclose($fh);
echo($xml);
?>
