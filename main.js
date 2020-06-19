var form = document.querySelector('form');
var video = document.querySelector('video');
var barcodeText = document.querySelector('#barcode-text');

var barcodeDetector = new BarcodeDetector({
    formats: [
        // 'aztec',
        // 'code_128',
        // 'code_39',
        // 'code_93',
        // 'codabar',
        // 'data_matrix',
        // 'ean_13',
        // 'ean_8',
        // 'itf',
        // 'pdf417',
        // 'qr_code',
        'upc_a',
        // 'upc_e'
    ]
});

// This method will be called every 1/2 second to try to read a bar
// code out of the video element. We will make the source for the
// video elment a getUserMedia stream which has access to the user's
// camera.
let updateBarcodes = async () => {
    try {
        console.log('detecting barcodes');

        let barcodes = await barcodeDetector.detect(video);

        console.log({barcodes});
        if (barcodes.length) {
            barcodeText.innerText = barcodes[0].rawValue;
        }
    } catch (error) {
        console.error('error', error);
    }
    setTimeout(updateBarcodes, 500);
};

// Wait for the user to click the "Request Camera Permission" so we
// don't ask for permission on page load.
form.addEventListener('submit', (event) => {
    event.preventDefault();

    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            // This requests the camera facing away from the user.
            facingMode: 'environment',
            width: 640,
            height: 640,
        }
    }).then(mediaStream => {
        // Once the user media stream is loaded into the video
        // element, start trying to read barcodes from the video
        // element.
        video.onloadedmetadata = () => {
            video.play();
            updateBarcodes();
        };

        // Use the userMediaStream as the source for the video element.
        video.srcObject = mediaStream;
    });
});
