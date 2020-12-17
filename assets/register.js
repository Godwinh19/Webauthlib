window.isValid = {
    nom: false,
    prenoms: false,
    email: false,
    phone: false,
    image: false
};
window.ROOT = 'WebAuthLib';

(function () {
    var width = 320; // We will scale the photo width to this
    var height = 0; // This will be computed based on the input stream

    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    function startup() {
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
        window.isValid.image = false;
    }

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
            window.isValid.image = true;
            window.data = data;
            // sendPicture(data);
        } else {
            clearphoto();
        }
    }
    window.addEventListener('load', startup, false);
})();

document.querySelectorAll('.form-control').forEach(inp => {
    inp.addEventListener('keyup', ({ currentTarget }) => {
        if (!!currentTarget.value && currentTarget.value.length > 2) {
            if (currentTarget.id === 'passconf' && currentTarget.value !== document.getElementById('password').value) {
                currentTarget.nextElementSibling.classList.remove('text-hidden');
                window.isValid[currentTarget.id] = false
                currentTarget.nextElementSibling.innerText = "Non correspondance";
            } else if (currentTarget.id === 'phone' && (currentTarget.value.length < 8 || currentTarget.value.length > 15 || !/(?<=\s|^)\d+(?=\s|$)/.test(currentTarget.value))) {
                currentTarget.nextElementSibling.classList.remove('text-hidden');
                window.isValid[currentTarget.id] = false
                currentTarget.nextElementSibling.innerText = "Numero invalide";
            } else {
                window.isValid[currentTarget.id] = true
                currentTarget.nextElementSibling.classList.add('text-hidden');
            }
        } else {
            window.isValid[currentTarget.id] = false
            currentTarget.nextElementSibling.classList.remove('text-hidden');
            currentTarget.nextElementSibling.innerText = currentTarget.value === '' ? "Le champ est requis" : "Nombre de charactères insuffisant";
        }
    }, false);
})

const sendPicture = async (image, inputs, btn) => {
    let block = image.split(";");
    let contentType = (block[0].split(":")[1]).split("/")[1]
    let realData = block[1].split(",")[1];
    let blob = b64toBlob(realData, contentType);

    let data = new FormData();
    data.append('image', blob);
    let imgDir = '../images/';
    let user = inputs.email.replace(/[ &\/\\#,+()$~%."'`:*?<>{} !@=]/g, "_");
    data.append('imgDir', imgDir); // image directory on client's server
    data.append('user', user);  // unique input value
    
    let upload = await fetch(location.origin + '/'+ window.ROOT +'/auth/upload.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: data
    });
    console.log(upload);

    if (upload.ok) {
        upload = await upload.text();
        console.log(upload);

        if (upload.success) {
            btn.classList.remove('disabled');
            btn.innerText = "Succès !"
            btn.classList.replace('btn-info', 'btn-success');
            setTimeout(() => {
                btn.innerText = "S'inscrire";
                btn.classList.replace('btn-success', 'btn-info');
                btn.classList.remove('disabled');
                location.href = 'test.php';
            }, 1000);
        } else {
            btn.innerText = "Echec !"
            btn.classList.replace('btn-info', 'btn-danger');
            setTimeout(() => {
                btn.innerText = "Réessayer";
                btn.classList.replace('btn-danger', 'btn-info');
                btn.classList.remove('disabled');
            }, 5000);
        }
    } else {
        upload = await upload.text();
        console.log(upload);

        btn.innerText = "Echec !";
        btn.classList.replace('btn-info', 'btn-danger');
        setTimeout(() => {
            btn.innerText = "Réessayer";
            btn.classList.replace('btn-danger', 'btn-info');
            btn.classList.remove('disabled');
        }, 5000);
    }
}

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

const submitForm = async btn => {
    console.log(window.isValid)

    if (!(window.isValid.nom && window.isValid.prenoms && window.isValid.phone && window.isValid.email && window.isValid.image)) {
        btn.innerText = "Echec !";
        btn.classList.replace('btn-info', 'btn-danger');
        setTimeout(() => {
            btn.innerText = "Réessayer";
            btn.classList.replace('btn-danger', 'btn-info');
            btn.classList.remove('disabled');
        }, 5000);
        return;
    }

    inputs = document.querySelectorAll('.form-control');
    let data = {};

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];

        data = {
            ...data,
            [input.id]: input.value
        };
    }

    sendPicture(window.data, data, btn);
}
