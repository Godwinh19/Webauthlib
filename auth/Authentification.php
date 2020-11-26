<?php

class Authentification{
    function __construct(){
    include '../utils.php';
    }

    /**
     * To save new user image with the image name his username
     * @param $user_name
     * @param $image
     */
    public function save_image($user_name, $image){

    }

    /**
     *
     * Check if user exist according to his name
     * @param $username
     */
    public function verify_user($username){
        //var_dump(glob(ASSETS .'/*jpg'));die();

        $files = glob(ASSETS .'/*jpg');
        foreach ($files as $file){
            echo "filename: ".$file." <br />";
        }
    }

    /**
     * Get given username the image in SAVE_IMAGE_PATH directory
     * @param $username
     */
    public function get_image($username){

    }
}
$auth = new Authentification();
$auth->verify_user("helo");