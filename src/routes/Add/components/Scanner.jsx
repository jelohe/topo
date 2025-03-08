import { useEffect, useRef } from 'react';
import { BarcodeDetector } from 'barcode-detector';

export default function Scanner({ onScan = noop, onError = noop }) {
  const videoEl = useRef(null);

  useEffect(() => {
    const el = videoEl.current;
    openCamera(el)
      .then(el => findQr(el))
      .then(uris => onScan(uris))
      .catch(error => onError(error));

    return () => {
      if (!el || !el.srcObject) return;
      el.srcObject.getTracks().forEach(t => t.stop());
      el.srcObject = null;
    }
  }, [onScan, onError]);

  return (
    <video 
      className="scanner"
      ref={videoEl}
      data-testid="cam"
      autoPlay
      playsInline
    />
  );
}

function openCamera(el) {
  return new Promise((resolve, reject) => {
    const config = { video: true };

    navigator
      .mediaDevices
      .getUserMedia(config)
      .then(stream => {
        el.srcObject = stream;
        el.onplaying = () => resolve(el);
      })
      .catch(reject);
  });
}

function findQr(el) {
  const barcodeCfg = { formats: ["qr_code"], };
  const barcodeDetector = new BarcodeDetector(barcodeCfg);
  return barcodeDetector.detect(el);
};

const noop = () => {};

