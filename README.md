# WEBAUTHLIB

## Description


## TO-DO before using
- Download the ***[webauthlib.zip]*** file that contains different assets for the library : 
    - *webauthlib.js*
    - *webauthlib.php*
    - *tmp/*
    - *images/*

- Uncompress and put the folder in your project. Put the folder in a location where not available for every users because this folder will hold all your images

- Give all permissions to folder and recursively

## Dependancies
The library uses bootstrap 5 and jquery. You can use a CDN if wanted.

## How to use
- Link the page with the library js file 
    ```
    <script src="[parents]/webauthlib/webauthlib.js"></script>
    ```
- Next, add a script tag that will call the library :
    ```
    <script>
        webauthlib({
            action: "LOGIN" | "REGISTER",
            
            images_path: "images/",         /* You can overide it by changing the folder name in the folder */
            
            images_path_tmp: "tmp/",        /* You can overide it by changing the folder name in the folder */
            
            upload_link: "[parents]/webauthlib/webauthlib.php",
            
            auth_field: "my_field",         /* Name of input field holding the authentication key value */
            
            lang: "fr" | "FR" | "en" | "EN",
            
            fcolumn: "false" | "true",      /* Align the cards by flex direction column
        });
    </script>
    ```

## About