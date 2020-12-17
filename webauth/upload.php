<?php
$data = ['success' => false];

if (isset($_FILES['image']) && isset($_POST['username']) && isset($_POST['images_path'])) {
    $username = $_POST['username'];
    $images_path = $_POST['images_path'];
    $target_file = $images_path . $username . '.' . $_FILES['image']['type'];    
    $file_type = $_FILES['image']['type'];
    $is_image = getimagesize($_FILES['image']['tmp_name']);

    if ($is_image) {
        if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
            $data['data']['image'] = $username . '.' . $_FILES['image']['type'];
            $data['data']['url'] = $images_path . $data['data']['image'];
            $data['success'] = true;
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
