import { BarcodeDetector } from 'barcode-detector';

export function openCamera(el) {
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

export function detectQrCodes(el) {
  const config = { formats: ["qr_code"], };
  const barcodeDetector = new BarcodeDetector(config);
  return barcodeDetector.detect(el);
};
