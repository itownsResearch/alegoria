<?php
//collect data sent as XML 
$xmlC = file_get_contents('php://input');
// We write a calib file even if exif. (associeted with local chantier descripteur infoss)
$fh2 =  fopen('../data/test/MicMac-LocalChantierDescripteur.xml', 'w+');
//fopen('../data/test/Ori-CalInit/AutoCal_Foc-50000_'. $imagename . '.xml', 'w+');
//writing XML string to the new file
fwrite($fh2, $xmlC);
//closing the file handler
fclose($fh2);
?>
