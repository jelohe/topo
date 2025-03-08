import { useState, useEffect, useRef } from 'react';
import { BarcodeDetector } from 'barcode-detector';

export default function Scanner({ onScan = noop, onError = noop }) {
  const videoEl = useRef(null);
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const el = videoEl.current;
    openCamera(el)
      .then(el => detectQrCodes(el))
      .then(uris => onScan(uris))
      .catch(error => {
        setAvailable(false);
        onError(error)
      })
      .finally(() => setLoading(false));

    return () => {
      if (!el || !el.srcObject) return;
      el.srcObject.getTracks().forEach(t => t.stop());
      el.srcObject = null;
    }
  }, [onScan, onError, videoEl]);

  let component;
  if (loading) 
    component = (<p data-testid="loading">Loading</p>);
  else if (!available) 
    component = (<p data-testid="error">Error</p>);

  return (
    <div className="scanner-wrapper">
      { component }
      <video 
        className="scanner"
        ref={videoEl}
        autoPlay
        playsInline
      />
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

