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

video.onloadedmetadata = () => {
    video.play();
    updateBarcodes();
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            facingMode: 'environment',
            width: 640,
            height: 640,
        }
    }).then(mediaStream => {
        window.mediaStream = mediaStream;
        video.srcObject = mediaStream;
    });
});
