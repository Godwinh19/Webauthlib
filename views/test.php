<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Take picture using webcam</title>
    <link rel="stylesheet" href="../assets/css/bootstrap4.min.css">
    <link rel="stylesheet" href="../assets/style.css">
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
                <div class="card-body">
                    <form action="" id="formulaire">
                        <div class="form-group">
                            <input type="text" class="form-control" id="name" placeholder="Enter your name">
                        </div>
                        <div id="auth" form="formulaire">
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-info">Send</button>
                        </div>
                    </form>


                    <!--<div class="form-group d-flex align-items-center justify-content-between">
                        <div class="col-lg-5">
                            <div class="camera">
                                <video id="video">Video stream unavailable</video>
                            </div>
                            <div><button id="startbutton" class="btn">Take photo</button></div>
                        </div>
                        <div class="col-lg-5">
                            <div class="output">
                                <canvas id="canvas"></canvas>
                                <img id="photo" src="../assets/tmp.jpg" alt="The screen capture will appear in this box.">
                                <div><button id="send">Send</button></div>
                            </div>
                        </div>
                    </div>-->
                    <a href="register.php" class="p-5">Ou Enregistrer vous ici.</a>
                </div>
            </div>
        </div>
    </div>
    <script src="../assets/jquery/jquery.min.js"></script>
    <script src="../assets/jquery/bootstrap.min.js"></script>
    <script src="../assets/auth.js"></script>
</body>

</html>