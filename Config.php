<?php
require_once 'utils.php';

class Config{

    function __construct()
    {
        $this->database_connection();
    }
    // for default, images are save in assets/images
    public $SAVE_IMAGE_PATH = '';//ASSETS .'/images';
    private $token = '';
    public $app_id = '';

    public $store_to_database = TRUE;
    public $db = array(
        'hostname' => '127.0.0.1',
        'username' => 'root',
        'password' => '',
        'database' => 'webauth'
    );

    /*Database configuration
    Use case for mysql
    public $database = ''; //TO-DO: save user navigator for more security to the database
    */
    public function database_connection(){
        if ($this->store_to_database){
            try{
                $host="mysql:host=".$this->db['hostname'].";dbname=".$this->db['database'];
                $user_name= $this->db['username'];
                $user_password= $this->db['password'];
                return new PDO($host,$user_name,$user_password);
            }

            catch(Exception $e){
                exit("Connection Error".$e->getMessage());
            }
        }
    }

}
