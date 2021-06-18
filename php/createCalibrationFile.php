<?php
//collect data sent as XML 
$xmlC = file_get_contents('php://input');

$xmlR = simplexml_load_string($xmlC);
$imgname = $xmlR->NameIn;
$pattern = '/[\.\s\-\_]+/';  // We remove dot dash and bottom dash as micmac seems to remove them when looking for calib...
$imgname = preg_replace($pattern, '', $imgname);
// We write a calib file even if exif. (associated with local chantier descripteur infoss)
$fh2 =  fopen('../data/test/Ori-CalInit/AutoCal_Foc-50000_Cam-'. $imgname . '.xml', 'w+');
//fopen('data/test/Ori-CalInit/AutoCal_Foc-50000_'. $imagename . '.xml', 'w+');
//writing XML string to the new file
fwrite($fh2, $xmlC);
//closing the file handler
fclose($fh2);
?>
