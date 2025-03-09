import { useState, useEffect, useRef } from 'react';
import { BarcodeDetector } from 'barcode-detector';

export default function Scanner({ onScan = noop }) {
  const videoEl = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const el = videoEl.current;
    openCamera(el)
      .then(el => detectQrCodes(el))
      .then(uris => onScan(uris))
      .catch(() => setIsAvailable(false))
      .finally(() => setIsLoading(false));

    return () => {
      if (!el || !el.srcObject) return;
      el.srcObject.getTracks().forEach(t => t.stop());
      el.srcObject = null;
    }
  }, [onScan, videoEl]);

  const isUnavailable = !isLoading && !isAvailable;
  const isReady = !isLoading && isAvailable;

  return (
    <div className="scanner-wrapper">
      <Loading renderIf={isLoading} />
      <Error renderIf={isUnavailable} />
      <video 
        className={`scanner ${isReady ? '': 'is-hidden'}`}
        ref={videoEl}
        autoPlay
        playsInline
      />
    </div>
  );
}

function Loading({ renderIf }) {
  if (!renderIf) return null;
  return (
    <div data-testid="loading" className="scanner-loading">
      <img src="images/spinner.svg" />
    </div>
  );
}

function Error({ renderIf }) {
  if (!renderIf) return null;
  return (
    <div
      data-testid="error"
      className="scanner-error content is-large"
    >
      <p>Topo cant access your <span className="has-text-primary">camera</span>, check your device <span className="has-text-primary">permissions</span></p>
    </div>
  );
}

function openCamera(el) {
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

function detectQrCodes(el) {
  const config = { formats: ["qr_code"], };
  const barcodeDetector = new BarcodeDetector(config);
  return barcodeDetector.detect(el);
};

const noop = () => {};

