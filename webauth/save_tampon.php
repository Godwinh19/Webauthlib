<?php
$data = ['success' => false];

if (isset($_FILES['image_tmp'])) {
    $username = $_POST['username'];
    $images_path = $_POST['images_path'];
    $ext=explode("/",$_FILES['image_tmp']['type'])[1];
    $target_file = $images_path . $username . '.' .$ext ;

    $file_type = $_FILES['image_tmp']['type'];
    $is_image = getimagesize($_FILES['image_tmp']['tmp_name']);

    if ($is_image) {
        if (move_uploaded_file($_FILES['image_tmp']['tmp_name'], $target_file))
        {
            $data['data']['image_tmp'] = $username . '.' . $ext;
            $data['data']['url'] = $images_path . $data['data']['image_tmp'];
            $data['success'] = true;
        }
        else {
            $data['message'] = 'ERROR_ON_SAVING_IMAGE';
        }
    } else {
        $data['message'] = 'FILE_IS_NOT_AN_IMAGE';
    }
}

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

echo json_encode($data);
