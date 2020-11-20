<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Take picture using webcam</title>
    <link rel="stylesheet" href="../assets/style.css">
</head>
<body>
<div class="contentarea">
    <h1>
        WEB AUTHN
    </h1>
    <table>
        <tbody>
        <tr>
            <td>
                <input type="text" id="name" placeholder="Enter your name">
            </td>
            <td>
                <div class="camera">
                    <video id="video">Video stream unavailable</video>
                </div>
                <div><button id="startbutton">Take photo</button></div>
            </td>
            <td>
                <div class="output">
                    <canvas id="canvas"></canvas>
                    <img id="photo" alt="The screen capture will appear in this box.">
                    <div><button id="send">Send</button></div>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</div>
<script src="../assets/auth.js"></script>
</body>
</html>
