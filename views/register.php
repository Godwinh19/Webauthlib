<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS TEST</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <style>
        .text-hidden {
            display: none;
        }
    </style>
</head>

<body>
<div class="wrapper">
    <div class="container mt-5">
        <div class="card col-lg-10 m-auto h-auto border rounded p-0 mt-5" style="background-color: white;">
            <div class="card-header">
                <h5 class="text-center">
                    Enregistrez vous ici!
                </h5>
            </div>
            <div class="card-body">
                <form id="formulaire">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="nom">Nom</label>
                            <input type="text" class="form-control" id="nom" required minlength="2">
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
                    <div class="form-row">
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
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <div class="camera">
                                <video id="video">Video stream unavailable</video>
                            </div>
                            <div><button id="startbutton" class="btn btn-primary">Take photo</button></div>
                        </div>
                        <div class="form-group col-md-6">
                            <div class="output">
                                <canvas id="canvas" hidden></canvas>
                                <img id="photo" src="" alt="The screen capture will appear in this box.">
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                        <button class="btn btn-outline-danger" onclick="location.href= 'test.php'">Annuler</button>
                        <span id='submit' class="btn btn-info float-right" onclick="submitForm(this)">S'inscrire</span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script src="../assets/register.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
</body>

</html>