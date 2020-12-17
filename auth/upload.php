<?php
$data = ['success' => false];

if (isset($_FILES['image']) && isset($_POST['user']) && isset($_POST['imgDir'])) {
    $user = $_POST['user'];
    $imgDir = $_POST['imgDir'];
    $target_file = $imgDir . $user . '.' . $_FILES['image']['type'];    
    $file_type = $_FILES['image']['type'];
    $is_image = getimagesize($_FILES['image']['tmp_name']);

    if ($is_image) {
        if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
            $data['data']['image'] = $user . '.' . $_FILES['image']['type'];
            $data['data']['url'] = $imgDir . $data['data']['image'];
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
