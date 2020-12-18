<?php
$data = ['success' => false];

if (isset($_POST['action']) && strlen($_POST['action']) > 0) {
    switch ($_POST['action']) {
        case 'SAVE_IMAGE':
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
            break;

        case 'SAVE_TMP_IMAGE':
            if (isset($_FILES['image_tmp'])) {
                $username = $_POST['username'];
                $images_path = $_POST['images_path'];
                $ext = explode("/", $_FILES['image_tmp']['type'])[1];
                $target_file = $images_path . $username . '.' . $ext;

                $file_type = $_FILES['image_tmp']['type'];
                $is_image = getimagesize($_FILES['image_tmp']['tmp_name']);

                if ($is_image) {
                    if (move_uploaded_file($_FILES['image_tmp']['tmp_name'], $target_file)) {
                        $data['data']['image_tmp'] = $username . '.' . $ext;
                        $data['data']['url'] = $images_path . $data['data']['image_tmp'];
                        $data['success'] = true;
                    } else {
                        $data['message'] = 'ERROR_ON_SAVING_IMAGE';
                    }
                } else {
                    $data['message'] = 'FILE_IS_NOT_AN_IMAGE';
                }
            }
            break;

        case 'REMOVE_TMP_IMAGE':
            /*
            * Php delete function that deals with directories recursively
            */
            function delTree($dir)
            {
                $files = array_diff(scandir($dir), array('.', '..'));

                foreach ($files as $file) {
                    (is_dir("$dir/$file")) ? delTree("$dir/$file") : unlink("$dir/$file");
                }
                //    return rmdir($dir);
            }

            $path = $_POST['path_dir'];
            delTree($path);
            $data = ['success' => true];
            $data['message'] = "Successfully deleting";
            break;

        default:
            break;
    }
}


header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

echo json_encode($data);
