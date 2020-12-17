function webauthlib({ action, images_path, auth_field, upload_link }) {
    switch (action) {
        case 'REGISTER':
            (function () {
                var width = 320; // We will scale the photo width to this
                var height = 0;  // This will be computed based on the input stream

                var streaming = false;

                var video = null;
                var canvas = null;
                var photo = null;
                var startbutton = null;

                image = null;

                function startup() {
                    let div = document.getElementById('auth');
                    div.innerHTML = `
                        <div class="form-row d-flex align-items-start justify-content-around">
                            <div class="form-group col-md-5 p-0 border rounded">
                                <div class="camera m-2" style="height: 320px; text-align: center;">
                                    <video id="video" class="center">Video stream unavailable</video>
                                </div>
                                <div class="text-center p-2"><button id="startbutton" class="btn btn-info"><i class="fa fa-camera"></i></button></div>
                            </div>
                            <div class="form-group col-md-5 border rounded">
                                <div class="output m-2" style="text-align: center;">
                                    <canvas id="canvas" hidden></canvas>
                                    <img id="photo" src="" height="320" width="80%" alt="The screen capture will appear in this box.">
                                </div>
                                <div class="text-center p-2"><span class="btn btn-outline-secondary"><i class="fa fa-spinner"></i></span></div>
                            </div>
                        </div>
                    `

                    let form = $('#auth').parents('form')[0];
                    let field_value = ('#' + auth_field).valueOf();

                    form.addEventListener('submit', async function (e) {
                        e.preventDefault();
                        /**
                         * CODE FOR REGISTERING
                         */
                        if (!!image) {
                            await register_sendPicture(image, field_value, images_path, upload_link).then(success => {
                                success && e.currentTarget.submit();
                            }).catch(error => {
                                console.log(error.message);
                            });
                        } else {
                            let lib_error = document.getElementById("lib_error");
                            !!lib_error && lib_error.classList.contains("text-hidden") && lib_error.classList.remove("text-hidden");
                        }
                        /**
                         * END CODE FOR REGISTERING
                         */
                    }, true);

                    video = document.getElementById('video');
                    canvas = document.getElementById('canvas');
                    photo = document.getElementById('photo');
                    startbutton = document.getElementById('startbutton');

                    navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: false
                    })
                        .then(function (stream) {
                            video.srcObject = stream;
                            video.play();
                        })
                        .catch(function (err) {
                            console.log("An error occurred: " + err);
                        });

                    video.addEventListener('canplay', function (ev) {
                        if (!streaming) {
                            height = video.videoHeight / (video.videoWidth / width);

                            if (isNaN(height)) {
                                height = width / (4 / 3);
                            }

                            video.setAttribute('width', width);
                            video.setAttribute('height', height);
                            canvas.setAttribute('width', width);
                            canvas.setAttribute('height', height);
                            streaming = true;
                        }
                    }, false);

                    startbutton.addEventListener('click', function (ev) {
                        takepicture();
                        ev.preventDefault();
                    }, false);

                    clearphoto();
                }


                function clearphoto() {
                    var context = canvas.getContext('2d');
                    context.fillStyle = "#AAA";
                    context.fillRect(0, 0, canvas.width, canvas.height);

                    var data = canvas.toDataURL('image/png');
                    photo.setAttribute('src', data);
                }

                function takepicture() {
                    var context = canvas.getContext('2d');
                    if (width && height) {
                        canvas.width = width;
                        canvas.height = height;
                        context.drawImage(video, 0, 0, width, height);

                        var data = canvas.toDataURL('image/png');
                        photo.setAttribute('src', data);

                        image = data;
                    } else {
                        clearphoto();
                    }
                }

                window.addEventListener('load', startup, false);
            })();
            break;

        case 'LOGIN':
            (function () {
                var width = 320; // We will scale the photo width to this
                var height = 0;  // This will be computed based on the input stream

                var streaming = false;

                var video = null;
                var canvas = null;
                var photo = null;
                var startbutton = null;
                var api_link = "";

                image = null;

                function startup() {
                    let div = document.getElementById('auth');
                    div.innerHTML = `
                        <div id="lib_error" class="text-hidden alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>Attention !</strong> Image indisponible !
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        <div class="form-group d-flex align-items-center justify-content-between">
                            <div class="col-lg-5">
                                <div class="camera">
                                    <video id="video">Video stream unavailable</video>
                                </div>
                            </div>
                            <div><button id="startbutton" class="btn btn-primary">Capturer l'empreinte</button></div>
                            <div class="col-lg-5">
                                <div class="output">
                                    <canvas id="canvas"></canvas>
                                    <img id="photo" src="" alt="The screen capture will appear in this box.">
                                </div>
                            </div>
                        </div>
                    `
                    let form = $('#auth').parents('form')[0];

                    form.addEventListener('submit', async function (e) {
                        e.preventDefault();
                        if (!!image) {
                            /**
                             * CODE FOR LOGING
                             */
                            let pathImage2 = "../images/" + document.getElementById('name').value + '.png';
                            let image2Html = new Image();
                            image2Html.src = pathImage2;

                            //convert image got by path to base 64
                            let image2 = getBase64Image(image2Html);
                            console.log(image2);
                            await login_sendPictures(image, image2, api_link).then(r => {
                                console.log("Request was successfull");
                            }).catch(reason => {
                                console.log("An error has occured")
                            });
                            /**
                             * END CODE FOR LOGING
                             */

                            e.currentTarget.submit();
                        } else {
                            let lib_error = document.getElementById("lib_error");
                            !!lib_error && lib_error.classList.contains("text-hidden") && lib_error.classList.remove("text-hidden");
                        }
                    }, true);

                    video = document.getElementById('video');
                    canvas = document.getElementById('canvas');
                    photo = document.getElementById('photo');
                    startbutton = document.getElementById('startbutton');

                    navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: false
                    })
                        .then(function (stream) {
                            video.srcObject = stream;
                            video.play();
                        })
                        .catch(function (err) {
                            console.log("An error occurred: " + err);
                        });

                    video.addEventListener('canplay', function (ev) {
                        if (!streaming) {
                            height = video.videoHeight / (video.videoWidth / width);

                            if (isNaN(height)) {
                                height = width / (4 / 3);
                            }

                            video.setAttribute('width', width);
                            video.setAttribute('height', height);
                            canvas.setAttribute('width', width);
                            canvas.setAttribute('height', height);
                            streaming = true;
                        }
                    }, false);

                    startbutton.addEventListener('click', function (ev) {
                        takepicture();
                        ev.preventDefault();
                    }, false);

                    clearphoto();
                }


                function clearphoto() {
                    var context = canvas.getContext('2d');
                    context.fillStyle = "#AAA";
                    context.fillRect(0, 0, canvas.width, canvas.height);

                    var data = canvas.toDataURL('image/png');
                    photo.setAttribute('src', data);
                }

                function takepicture() {
                    var context = canvas.getContext('2d');
                    if (width && height) {
                        canvas.width = width;
                        canvas.height = height;
                        context.drawImage(video, 0, 0, width, height);

                        var data = canvas.toDataURL('image/png');
                        photo.setAttribute('src', data);

                        image = data;
                    } else {
                        clearphoto();
                    }
                }

                window.addEventListener('load', startup, false);
            })();
            break;

        default:
            break;
    }
}


/**
 * Convert an Image to base64 String
 * @param {Image} img Image to convert to base64
 * @returns {String}
 */
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/png");
}


/**
 * Convert a base64 image to blob image
 * @param {String} b64Data Image en String base64
 * @param {String} contentType Content-Type du String base64
 * @param {String} sliceSize Taille de l'image
 * @returns {Blob}
 */
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}


/**
 * Save the taken picture to local images directory
 * @param {Blob} image Image to send for registering
 * @param {String} username Username, the name to attach to the image for authentification
 * @param {String} images_path Local path where to save the images
 * @param {String} upload_link Link of the upload.php file
 * @returns {Object}
 */
const register_sendPicture = async (image, username, images_path, upload_link) => {
    try {
        let block = image.split(";");
        let contentType = (block[0].split(":")[1]).split("/")[1]
        let realData = block[1].split(",")[1];
        let blob = b64toBlob(realData, contentType);

        let data = new FormData();
        data.append('image', blob);
        data.append('username', username);
        data.append('images_path', images_path);

        let upload = await fetch(upload_link, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        });

        if (upload.ok) {
            upload = await upload.json();
            console.log(upload);

            if (upload.success) {
                /**
                 * PROBABLY SHOW ALERT OF SUCCESS ON SENDING IMAGE
                 */
                return;
            } else {
                /**
                 * PROBABLY SHOW ALERT OF FAILURE ON SENDING IMAGE
                 */
                throw new Error("FAILED TO SEND IMAGE");
            }
        } else {
            upload = await upload.json();
            console.log(upload);

            throw new Error("FAILED TO SEND IMAGE");
        }
    } catch (error) {
        console.log(error.message);
        return { success: false, message: error.message };
    }
}


/**
 * Send two images to an api for compairison
 * @param {Image} image1 First image
 * @param {Image} image2 Second image
 * @param {String} api_link Link of the compairison api
 * @returns {void}
 */
const login_sendPictures = async (image1, image2, api_link) => {
    let data = new FormData();
    data.append('image1', image1);
    data.append('image2', image2);

    let upload = await fetch(api_link, {
        method: 'POST',
        body: data
    })

    if (upload.ok) {
        upload = await upload.json();

        console.log("Success : " + upload);
    } else {
        upload = await upload.json();

        console.log("Error : " + upload);
    }
}