<?php
/*
 * php delete function that deals with directories recursively
 */
function delTree($dir)
{
    $files = array_diff(scandir($dir), array('.', '..'));

    foreach ($files as $file) {
        (is_dir("$dir/$file")) ? delTree("$dir/$file") : unlink("$dir/$file");
    }

//    return rmdir($dir);
}


// 
$path=$_POST['path_dir'];
delTree($path);
$data = ['success' => true];
$data['message']="Successfully deleting";

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

echo json_encode($data);


