<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Take picture using webcam</title>
    <link rel="stylesheet" href="../assets/css/bootstrap4.min.css">
    <link rel="stylesheet" href="../assets/style.css">
    <link rel="stylesheet" href="../assets/fontawesome5/css/all.css">
</head>

<body>
    <div class="container p-3 mt-5">
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
            <a href="register.php" class="p-5">Ou Enregistrer vous ici.</a>
        </div>
    </div>
    <script src="../assets/jquery/jquery.min.js"></script>
    <script src="../assets/jquery/bootstrap.min.js"></script>
    <script src="../assets/auth.js"></script>
</body>

</html>