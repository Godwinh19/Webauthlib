<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS TEST</title>
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
                        Enregistrez vous ici!
                    </h5>
                </div>
                <div class="card-body">
                    <form id="formulaire">
                        <div class="row g-3">
                            <div class="form-group col-md-6">
                                <label for="nom">Nom</label>
                                <input type="text" class="form-control" id="name" required minlength="2">
                                <span class="form-error text-danger p-1
                                        text-hidden" style="font-size: 13px;">Invalid</span>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="prenoms">Prénoms</label>
                                <input type="text" class="form-control" id="prenoms" required minlength="2">
                                <span class="form-error text-danger p-1
                                        text-hidden" style="font-size: 13px;"></span>
                            </div>
                        </div>
                        <div class="row g-3">
                            <div class="form-group col-md-6">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" required>
                                <span class="form-error text-danger p-1
                                        text-hidden" style="font-size: 13px;"></span>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="phone">Téléphone</label>
                                <input type="tel" class="form-control" id="phone" required>
                                <span class="form-error text-danger p-1
                                        text-hidden" style="font-size: 13px;"></span>
                            </div>
                        </div>
                        <div id="auth" class="pt-2"></div>
                        <div class="d-flex align-items-center justify-content-between pt-2">
                            <button class="btn btn-outline-danger" onclick="location.href= 'test.php'"><i class="fa fa-angle-double-left pr-2"></i>Annuler</button>
                            <button type="submit" class="btn btn-success float-right">S'inscrire <i class="fa fa-user-plus ml-2"></i></button>
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
            action: "REGISTER",
            images_path: "images/",
            upload_link: location.origin + "/Webauthlib/webauth/upload.php",
            auth_field: "name",
            lang: 'fr'
        });
    </script>
</body>

</html>