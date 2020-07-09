<?php

// We first write the image (itowns scene rendered) to the server
	define('UPLOAD_DIR', '../data/');
    $img = $_POST['imgBase64'];
    $imgName = $_POST['imgName'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $file = UPLOAD_DIR . sceneiTowns . '.png';
	//$file = UPLOAD_DIR . uniqid() . '.png';
	$success = file_put_contents($file, $data);
	//send request to ocr 
    print $success ? $file : 'Unable to save the file.';


// We then launch the script to compute the point

    //Method to execute a command in the terminal
    function terminal($command)
    {
        //system    
        //add MicMac to global Path
        $path = '/var/www/localhost/alegoriaX';
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

    terminal(" ./scriptArnaud.sh " . $imgName);  // old.tif is in data/
    //terminal(" ./scriptArnaud.sh old.jpg");  // old.tif is in data/

?>