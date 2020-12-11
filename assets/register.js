(function() {
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
    }

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);

            sendPicture(data);
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
                currentTarget.nextElementSibling.innerText = "Non correspondance";
            } else {
                currentTarget.nextElementSibling.classList.add('text-hidden');
            }
        } else {
            currentTarget.nextElementSibling.classList.remove('text-hidden');
            currentTarget.nextElementSibling.innerText = currentTarget.value === '' ? "Le champ est requis" : "Nombre de charactères insuffisant";
        }
    }, false);
})

const submitForm = async btn => {
    inputs = document.querySelectorAll('.form-control');
    let data = {};

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];

        data = {
            ...data,
            [input.id]: input.value
        };
    }

    btn.classList.add('disabled');
    let signup = await fetch('localhost', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!signup.ok) {
        console.log(signup);

        btn.innerText = "Echec !";
        btn.classList.replace('btn-info', 'btn-danger');
        setTimeout(() => {
            btn.innerText = "Réessayer";
            btn.classList.replace('btn-danger', 'btn-info');
            btn.classList.remove('disabled');
        }, 5000);
    } else {
        signup = await signup.json();
        console.log(signup);

        if (!signup.success) {
            btn.innerText = "Echec !"
            btn.classList.replace('btn-info', 'btn-danger');
            setTimeout(() => {
                btn.innerText = "Réessayer";
                btn.classList.replace('btn-danger', 'btn-info');
                btn.classList.remove('disabled');
            }, 5000);
        } else {
            btn.classList.remove('disabled');
            btn.innerText = "Succès !"
            btn.classList.replace('btn-info', 'btn-success');
            setTimeout(() => {
                btn.innerText = "S'inscrire";
                btn.classList.replace('btn-success', 'btn-info');
                btn.classList.remove('disabled');
                location.href = 'index.html';
            }, 5000);
        }
    }
}
