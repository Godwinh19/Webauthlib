<?php
$data = ['status' => false];

if (isset($_POST['submit'])) {
    $target_file = basename($_FILES['file']['name']);
    $file_type = pathinfo($target_file, PATHINFO_EXTENSION);
    $is_image = getimagesize($_FILES['file']['tmp_name']);

    if ($is_image) {
        $data['image'] =  $_FILES['file']['name'];
        if (move_uploaded_file($_FILES['file']['tmp_name'], $data['image'])) {
            $data['status'] = true;
            $data['uri'] = 'http://localhost/Webauthlib/images/' . $data['image'];
        } else {
            $data['message'] = 'ERROR_ON_UPLOADING_IMAGE';
        }
    } else {
        $data['message'] = 'FILE_IS_NOT_AN_IMAGE';
    }
}

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

echo json_encode($data);
