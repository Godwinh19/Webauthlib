<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Take picture using webcam</title>
    <link rel="stylesheet" href="../assets/css/bootstrap4.min.css">
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="../assets/style.css">
    <link rel="stylesheet" href="../assets/fontawesome5/css/all.css">
</head>

<body>
    <div class="container p-3">
        <div class="contentarea col-lg-10 border rounded m-auto">
            <h2 class="p-2">
                WEB AUTH
            </h2>
            <hr>
            <div class="form-group">
                <input type="text" class="form-control" id="name" placeholder="Enter your name">
            </div>
            <div class="form-group d-flex align-items-center justify-content-between">
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
            </div>
            <a href="register.html" class="p-5">Ou Enregistrer vous ici.</a>
        </div>
    </div>
    <script src="../assets/jquery/jquery.min.js"></script>
    <script src="../assets/jquery/bootstrap.min.js"></script>
    <!-- <script src="https://co de.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script> -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script> -->
    <script src="../assets/auth.js"></script>
</body>

</html>