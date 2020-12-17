<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Take picture using webcam</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <link rel="stylesheet" href="../assets/fontawesome5/css/all.css">
    <style>
        .text-hidden {
            display: none;
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <div class="container mt-5">
            <div class="card col-lg-12 m-auto h-auto border rounded p-0 mt-5" style="background-color: white;">
                <div class="card-header">
                    <h5 class="text-center">
                        WEB AUTH
                    </h5>
                </div>
                <div class="card-body p-3">
                    <form action="#" id="formulaire">
                        <div class="form-group">
                            <input type="text" class="form-control" id="name" placeholder="Enter your name">
                        </div>
                        <div id="auth" class="pt-2"> </div>
                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-success">Se connecter</button><br><br>
                            <a href="register.php" class="p-1 btn">Ou Enregistrer vous ici.</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="../assets/jquery/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
    <script src="../assets/webauthlib.js"></script>
    <script>
        webauthlib({
            action: "LOGIN",
            images_path: "images/",
            upload_link: location.origin + "/WebAuthLib/webauth/upload.php",
            auth_field: "name",
            lang: 'en'
        });
    </script>
</body>

</html>