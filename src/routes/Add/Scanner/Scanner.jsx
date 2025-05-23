import { useState, useEffect, useRef } from 'react';
import camera from './camera';

const defaultOnScan = () => {};
export default function Scanner({ onScan = defaultOnScan }) {
  const videoEl = useRef(null);
  const pollRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const el = videoEl.current;
    function poll() {
      camera.scan(el).then(onScan);
    }
    function startPolling() {
      pollRef.current = setInterval(poll, 250);
    };

    camera.open(el).then(() => {
      setIsLoading(false);
      startPolling();
    }).catch(() => {
      setIsLoading(false);
      setIsAvailable(false)
    });

    return () => {
      clearInterval(pollRef.current);

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
    <div className="scanner-loading">
      <img src="images/spinner.svg" />
    </div>
  );
}

function Error() {
  return (
    <div className="scanner-error">
      <p>Topo cant access your <span className="highlight">camera</span></p>
      <p>Check your device <span className="highlight">permissions</span></p>
    </div>
  );
}
