/**
 * Fingerprint authentication library
 * Developed by RII5, EPAC 2020-2021
 * Powered by GENIE INFORMATIQUE TELECOMMUNICATIONS
 * All rights reserved
 * @param {String} action Action name "REGISTER" | "LOGIN"
 * @param {String} auth_field Field in the form that hold value for naming images
 * @param {String} upload_link Link where is located the webauthlib.php file attached to the library
 * @param {String} images_path Path of the folder that hold all users fingerprints images
 * @param {String} images_path_tmp Path of temporary images folder from webauthlib.php folder as specified for images_path
 * @param {String} lang "en" Langage of usage of the library "en" | "fr" | "EN" | "FR"
 * @param {Boolean} fcolumn "false" Align the cards by flex direction column
 * @returns {void}
 */
function webauthlib({ action, auth_field, upload_link, images_path, images_path_tmp, lang, fcolumn }) {
    if (lang === undefined || lang === null || ['fr', 'en', 'FR', 'EN'].findIndex(lg => lg === lang) === -1) {
        lang = 'en';
    }
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
                        <div class="form-row-total m-auto">
                            <style>
                                .text-hidden {
                                    display: none;
                                }
                            </style>
                            <div id="lib_success" class="text-hidden alert alert-success alert-dismissible fade show" role="alert">
                                <strong>${lang.toLowerCase() === 'fr' ? 'Attention' : 'Warning'} !</strong>
                                <span id="lib_success_message"> </span>
                                <button type="button" class="btn-close" onclick="document.getElementById('lib_success').classList.add('text-hidden')"></button>
                            </div>
                            <div id="lib_error" class="text-hidden alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>${lang.toLowerCase() === 'fr' ? 'Attention' : 'Warning'} !</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                <span id="lib_error_message"> </span>
                                <button type="button" class="btn-close" onclick="document.getElementById('lib_error').classList.add('text-hidden')"></button>
                            </div>
                            <div class="row col-md-12 text-center m-auto d-flex flex-${!!fcolumn ? 'column' : 'row'} justify-content-between align-items-center">
                                <div class="col-md-${!!fcolumn ? '12' : '5'} mb-3">
                                    <div class="card shadow m-auto" style="width: 20rem;">
                                        <div class="camera">
                                            <video id="video" class="card-img-top" style="height: 233px; object-fit: cover">${lang.toLowerCase() === 'fr' ? "Video stream indisponible" : "Video stream unavailable"}</video>
                                        </div>
                                        <div class="card-body text-center">
                                            <h3 class="card-title">${lang.toLowerCase() === 'fr' ? 'Caméra' : 'Camera'}</h3>
                                            <div><button id="startbutton" class="btn btn-secondary">${lang.toLowerCase() === 'fr' ? 'Capturer' : 'Take photo'}</button></div>
                                        </div>
                                    </div>
                                </div> 
                                <div class="col-md-${!!fcolumn ? '12' : '5'} mb-3">
                                    <div class="card shadow m-auto h-auto" style="width: 20rem;">
                                        <div class="output">
                                            <canvas id="canvas" class="card-img-top" style="display: none"></canvas>
                                            <img id="photo" src="" class="card-img-top" alt="${lang.toLowerCase() === 'fr' ? 'La capture apparaîtra dans ce champ' : 'The screen capture will appear in this box'}" style="height: 352px">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `

                    let form = $('#auth').parents('form')[0];

                    form.addEventListener('submit', async function (e) {
                        const sub = e.currentTarget;
                        e.preventDefault();

                        if (!!image) {
                            let field_value = $('#' + auth_field).val();
                            await register_sendPicture(image, field_value, (!!images_path && images_path.length > 0) ? images_path : "", upload_link, lang).then(status => {
                                if (status.success) {
                                    let lib_success = document.getElementById("lib_success");
                                    let lib_success_message = document.getElementById("lib_success_message");
                                    lib_success_message.innerText = lang.toLowerCase() === 'fr' ? "Authentification réussie !" : "Authentication succeed !";
                                    !!lib_success && lib_success.classList.contains("text-hidden") && lib_success.classList.remove("text-hidden");

                                    setTimeout(() => {
                                        // sub.submit();
                                    }, 2000);
                                } else {
                                    console.log(status.message);

                                    let lib_error = document.getElementById("lib_error");
                                    let lib_error_message = document.getElementById("lib_error_message");
                                    lib_error_message.innerText = status.message;
                                    !!lib_error && lib_error.classList.contains("text-hidden") && lib_error.classList.remove("text-hidden");
                                }
                            }).catch(error => {
                                console.log(error.message);

                                let lib_error = document.getElementById("lib_error");
                                let lib_error_message = document.getElementById("lib_error_message");
                                lib_error_message.innerText = error.message;
                                !!lib_error && lib_error.classList.contains("text-hidden") && lib_error.classList.remove("text-hidden");
                            });
                        } else {
                            let lib_error = document.getElementById("lib_error");
                            let lib_error_message = document.getElementById("lib_error_message");
                            lib_error_message.innerText = lang.toLowerCase() === 'fr' ? "Image indisponible. Veuillez la reprendre !" : 'Image unavailable. Please take it again !';
                            !!lib_error && lib_error.classList.contains("text-hidden") && lib_error.classList.remove("text-hidden");
                        }
                    }, false);

                    video = document.getElementById('video');
                    canvas = document.getElementById('canvas');
                    photo = document.getElementById('photo');
                    startbutton = document.getElementById('startbutton');

                    navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: false
                    }).then(function (stream) {
                        video.srcObject = stream;
                        video.play();
                    }).catch(function (err) {
                        let lib_error = document.getElementById("lib_error");
                        let lib_error_message = document.getElementById("lib_error_message");
                        lib_error_message.innerText = lang.toLowerCase() === 'fr' ? "Une erreur s'est produite avec la caméra !" : 'An error occured with the camera !';
                        !!lib_error && lib_error.classList.contains("text-hidden") && lib_error.classList.remove("text-hidden");

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
                        // console.log(image);
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
                var api_link = "http://172.20.10.5:5000";

                image = null;

                function startup() {
                    let div = document.getElementById('auth');
                    div.innerHTML = `
                        <div class="form-row-total m-auto">
                            <style>
                                .text-hidden {
                                    display: none;
                                }
                            </style>
                            <div id="lib_success" class="text-hidden alert alert-success alert-dismissible fade show" role="alert">
                                <strong>${lang.toLowerCase() === 'fr' ? 'Attention' : 'Warning'} !</strong>
                                <span id="lib_success_message"> </span>
                                <button type="button" class="btn-close" onclick="document.getElementById('lib_success').classList.add('text-hidden')"></button>
                            </div>
                            <div id="lib_error" class="text-hidden alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>${lang.toLowerCase() === 'fr' ? 'Attention' : 'Warning'} !</strong>
                                <span id="lib_error_message"> </span>
                                <button type="button" class="btn-close" onclick="document.getElementById('lib_error').classList.add('text-hidden')"></button>
                            </div>
                            <div class="row col-md-12 text-center m-auto d-flex flex-${!!fcolumn ? 'column' : 'row'} justify-content-between align-items-center">
                                <div class="col-md-${!!fcolumn ? '12' : '5'} mb-3">
                                    <div class="card shadow m-auto" style="width: 20rem;">
                                        <div class="camera">
                                            <video id="video" class="card-img-top" style="height: 233px; object-fit: cover">${lang.toLowerCase() === 'fr' ? "Video stream indisponible" : "Video stream unavailable"}</video>
                                        </div>
                                        <div class="card-body text-center">
                                            <h3 class="card-title">${lang.toLowerCase() === 'fr' ? 'Caméra' : 'Camera'}</h3>
                                            <div><button id="startbutton" class="btn btn-secondary">${lang.toLowerCase() === 'fr' ? 'Capturer' : 'Take photo'}</button></div>
                                        </div>
                                    </div>
                                </div> 
                                <div class="col-md-${!!fcolumn ? '12' : '5'} mb-3">
                                    <div class="card shadow m-auto h-auto" style="width: 20rem;">
                                        <div class="output">
                                            <canvas id="canvas" class="card-img-top" style="display: none"></canvas>
                                            <img id="photo" src="" class="card-img-top" alt="${lang.toLowerCase() === 'fr' ? 'La capture apparaîtra dans ce champ' : 'The screen capture will appear in this box'}" style="height: 352px">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `

                    let form = $('#auth').parents('form')[0];

                    form.addEventListener('submit', async function (e) {
                        const sub = e.currentTarget;
                        e.preventDefault();
                        if (!!image) {
                            let link = "";
                            let tab = upload_link.split("/");
                            tab = tab.slice(0, tab.length - 1);
                            if (!!images_path && images_path.length > 0) {
                                link = tab.join("/") + "/" + images_path;
                            } else {
                                link = tab.join("/") + "/";
                            }

                            let pathImage1 = link + document.getElementById('name').value.replace(/[ &\/\\#,+()$~%."'`:*?<>{} !@=]/g, "_") + '.png';

                            let block = image.split(";");
                            let contentType = (block[0].split(":")[1]).split("/")[1];
                            let realData = block[1].split(",")[1];
                            let blob_image_2 = b64toBlob(realData, contentType);

                            await login_sendPictures(pathImage1, blob_image_2, document.getElementById('name').value.replace(/[ &\/\\#,+()$~%."'`:*?<>{} !@=]/g, "_"), api_link, upload_link, images_path_tmp, lang).then(response => {
                                if (response.success) {
                                    let lib_success = document.getElementById("lib_success");
                                    let lib_success_message = document.getElementById("lib_success_message");
                                    lib_success_message.innerText = lang.toLowerCase() === 'fr' ? "Authentification réussie !" : "Authentication succeed !";
                                    !!lib_success && lib_success.classList.contains("text-hidden") && lib_success.classList.remove("text-hidden");

                                    setTimeout(() => {
                                        // sub.submit();
                                    }, 2000);
                                } else {
                                    let lib_error = document.getElementById("lib_error");
                                    let lib_error_message = document.getElementById("lib_error_message");
                                    lib_error_message.innerText = response.message;
                                    !!lib_error && lib_error.classList.contains("text-hidden") && lib_error.classList.remove("text-hidden");
                                }
                            }).catch(reason => {
                                let lib_error = document.getElementById("lib_error");
                                let lib_error_message = document.getElementById("lib_error_message");
                                lib_error_message.innerText = lang.toLowerCase() === 'fr' ? "Une erreur s'est produite avec lors de l'authentification !" : 'An error occured during the authentification !';
                                !!lib_error && lib_error.classList.contains("text-hidden") && lib_error.classList.remove("text-hidden");

                                console.log(reason);
                            });
                        } else {
                            let lib_error = document.getElementById("lib_error");
                            let lib_error_message = document.getElementById("lib_error_message");
                            lib_error_message.innerText = lang.toLowerCase() === 'fr' ? "Image indisponible. Veuillez la reprendre !" : 'Image unavailable. Please take it again !';
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
                    }).then(function (stream) {
                        video.srcObject = stream;
                        video.play();
                    }).catch(function (err) {
                        let lib_error = document.getElementById("lib_error");
                        let lib_error_message = document.getElementById("lib_error_message");
                        lib_error_message.innerText = lang.toLowerCase() === 'fr' ? "Une erreur s'est produite avec la caméra !" : 'An error occured with the camera !';
                        !!lib_error && lib_error.classList.contains("text-hidden") && lib_error.classList.remove("text-hidden");

                        console.log("An error occurred : " + err);
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
 * @param {String} upload_link Link of the webauthlib.php file
 * @returns {Object}
 */
const register_sendPicture = async (image, username, images_path, upload_link, lang) => {
    try {
        let block = image.split(";");
        let contentType = (block[0].split(":")[1]).split("/")[1]
        let realData = block[1].split(",")[1];
        let blob = b64toBlob(realData, contentType);

        let data = new FormData();
        data.append('action', 'SAVE_IMAGE');
        data.append('image', blob);
        username = username.replace(/[ &\/\\#,+()$~%."'`:*?<>{} !@=]/g, "_");
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
                return { success: true, message: lang.toLowerCase() === 'fr' ? "Envoi d'image réussie" : "Image sending succeeded" };
            } else {
                throw new Error(lang == 'fr' ? "Échec d'envoi de l'image" : "Failed to send the image");
            }
        } else {
            console.log(upload);

            throw new Error(lang == 'fr' ? "Échec d'envoi de l'image" : "Failed to send the image");
        }
    } catch (error) {
        console.log(error.message);
        return { success: false, message: lang.toLowerCase() === 'fr' ? "Veuillez  vérifier les permissions du dossier des images !" : "Please, verify the images folder permissions !" };
    }
}


/**
 * Send two images to an api for compairison
 * @param {String} pathImage1 First image
 * @param {Blob} blob Second image
 * @param {String} username Authentication field value
 * @param {String} api_link Link of the compairison api
 * @param {String} upload_link Link of webauthlib.php file
 * @param {String} images_path_tmp Folder of temporary images
 * @param {String} lang Langage token
 * @returns {void}
 */
const login_sendPictures = async (pathImage1, blob, username, api_link, upload_link, images_path_tmp, lang) => {
    try {
        //1-save image taken to tmp directory
        let data_tmp = new FormData();
        data_tmp.append('action', 'SAVE_TMP_IMAGE');
        data_tmp.append('image_tmp', blob);
        data_tmp.append('username', username);
        data_tmp.append('images_path', images_path_tmp);

        let upload_tmp = await fetch(upload_link, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: data_tmp
        });

        if (upload_tmp.ok) {
            upload_tmp = await upload_tmp.json();
            console.log(upload_tmp);

            if (upload_tmp.success) {
                //2-call for API to handling images
                let pathImage2 = "";
                let tab = upload_link.split("/");
                tab = tab.slice(0, tab.length - 1);
                pathImage2 = tab.join("/") + "/" + upload_tmp.data.url;

                let data = new FormData();
                console.log(pathImage1);
                console.log(pathImage2);
                data.append('image1', pathImage1);
                data.append('image2', pathImage2);

                let upload = await fetch(api_link, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: data
                });

                if (upload.ok) {
                    upload = await upload.json();
                    console.log(upload);

                    //deleting tmp images folders
                    await deleteImagesFolder(upload_link, images_path_tmp, lang);

                    if (upload.success) {
                        if (upload.data.authenticated) {
                            return { success: true, message: lang === 'fr' || lang === 'FR' ? "Authentificaton réussie" : "Authentication succeeded" };
                        } else {
                            throw new Error(lang === 'fr' ? "Incohérence d'empreintes digitales" : "Fingerprint inconsistency");
                        }
                    } else {
                        throw new Error(lang === 'fr' ? "Échec d'authentification" : "Authentication failed");
                    }
                } else {
                    upload = await upload.json();
                    console.log(upload);

                    throw new Error(lang === 'fr' ? "Échec d'authentification" : "Authentication failed");
                }
            } else {
                throw new Error(lang === 'fr' ? "Échec de sauvegarde de l'image" : "Failed to save the image");
            }
        } else {
            upload_tmp = await upload_tmp.json();
            console.log(upload_tmp);

            throw new Error(lang === 'fr' ? "Échec de sauvegarde de l'image" : "Failed to save the image");
        }
    } catch (error) {
        console.log(error.message);
        return { success: false, message: error.message };
    }
}


/**
 * Delete tmp images from the tmp folder
 * @param {String} upload_link Link of webauthlib.php file
 * @param {String} images_path_tmp Temporary files folder
 * @param {String} lang Language token
 * @returns {void}
 */
const deleteImagesFolder = async (upload_link, images_path_tmp, lang) => {
    try {
        let data = new FormData();
        data.append('action', 'REMOVE_TMP_IMAGE');
        data.append("path_dir", images_path_tmp);

        let remove = await fetch(upload_link, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        });

        if (remove.ok) {
            remove = await remove.json();
            console.log(remove);

            if (remove.success) {
                return { success: true, message: lang.toLowerCase() === 'fr' ? "Suppression réussie" : "Delete succeed" };
            } else {
                throw new Error(lang.toLowerCase() === 'fr' ? "Échec de suppresion" : "Delete operation failed");
            }
        } else {
            console.log(remove);
            throw new Error(lang.toLowerCase() === 'fr' ? "Échec de suppresion" : "Delete operation failed");
        }
    } catch (error) {
        console.log(error.message);
        return { success: false, message: error.message };
    }
}