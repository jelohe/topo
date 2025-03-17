import { useState, useEffect, useRef } from 'react';
import { openCamera, detectQrCodes } from './camera';

const defaultOnScan = () => {};
export default function Scanner({ onScan = defaultOnScan }) {
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
      {isLoading && <Loading />}
      {isUnavailable && <Error />}
      <video 
        className={`scanner ${isReady ? '': 'is-hidden'}`}
        ref={videoEl}
        autoPlay
        playsInline
      />
    </div>
  );
}

function Loading() {
  return (
    <div data-testid="loading" className="scanner-loading">
      <img src="images/spinner.svg" />
    </div>
  );
}

function Error() {
  return (
    <div
      data-testid="error"
      className="scanner-error content is-large"
    >
      <p>Topo cant access your <span className="has-text-primary">camera</span>, check your device <span className="has-text-primary">permissions</span></p>
    </div>
  );
}
