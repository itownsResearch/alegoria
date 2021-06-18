<?php

$img_name = $_GET['imagename'];
//Method to execute a command in the terminal
function terminal($command)
{
    //system
    //add MicMac to global Path
    $path = '/var/www/micmac/bin';
    putenv('PATH=' . getenv('PATH') . PATH_SEPARATOR . $path);
    if(function_exists('system'))
    {
        ob_start();
        system($command , $return_var);
        $output = ob_get_contents();
        ob_end_clean();
    }
    //passthru
    else if(function_exists('passthru'))
    {
        ob_start();
        passthru($command , $return_var);
        $output = ob_get_contents();
        ob_end_clean();
    }

    //exec
    else if(function_exists('exec'))
    {
        exec($command , $output , $return_var);
        $output = implode("n" , $output);
    }

    //shell_exec
    else if(function_exists('shell_exec'))
    {
        $output = shell_exec($command) ;
    }

    else
    {
        $output = 'Command execution not possible on this system';
        $return_var = 1;
    }

    return array('output' => $output , 'status' => $return_var);
}

//MicMac inputs
$path_to_output = "../data/test";
$path_to_data = "../data";
//$img_name = "FRAN_0207_0628_L.jpg";
$calib_file = "Ori-CalInit";
$imagename = preg_replace('/\\.[^.\\s]{3,4}$/', '', $img_name);
$gcp_file = 'gcp_'. $imagename . '.xml';
$appuis_file = 'appuis_'. $imagename . '.xml';

//copy image from data directory to outputs directory for micmac reasons...
//copy($path_to_data."\\".$img_name,$path_to_output."\\".$img_name);
copy($path_to_data.DIRECTORY_SEPARATOR.$img_name,$path_to_output.DIRECTORY_SEPARATOR.$img_name);

//change current directory to outputs directory
chdir($path_to_output);

//MicMac command to compute image orientation based on calibration file, 2D image coordinates file, and 3D ground control points file
$cmd = "mm3d aspro" . " " . $img_name . " " . $calib_file . " " . $gcp_file . " " . $appuis_file;
echo $cmd ;

// $cmd = "mm3d Init11P " . $gcp_file . " " . $appuis_file . " Rans=[500,6]"  ;

//retrieve MicMac command output and store it into an array
$output_array = terminal($cmd);

//encode the output as json
echo json_encode($output_array);

?>
