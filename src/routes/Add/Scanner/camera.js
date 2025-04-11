import 'barcode-detector/polyfill';

function open(el) {
  return new Promise((resolve, reject) => {
    const config = {
      video: {
        facingMode: { ideal: 'environment' },
      },
    };

    navigator
      .mediaDevices
      .getUserMedia(config)
      .then(stream => {
        el.srcObject = stream;
        el.onplaying = () => resolve(el);
      })
      .catch(err => {
        console.log(err);
        reject(err)
      });
  });
}

function scan(el) {
  const config = { formats: ["qr_code"], };
  const barcodeDetector = new BarcodeDetector(config);
  return barcodeDetector.detect(el);
}

export default { open, scan };
