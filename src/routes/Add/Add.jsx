import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { BarcodeDetector } from 'barcode-detector';
import Header from '@/components/Header';
import useVault from '@/useVault';

function CustomHeader() {
  const navigate = useNavigate();
  return (
    <Header>
      <button onClick={() => navigate('/')} className="button">
        back
      </button>
    </Header>
  )
}

export default function Add() {
  const { bulkUpdate } = useVault();
  const navigate = useNavigate();
  const videoEl = useRef(null);

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      videoEl.current.srcObject = stream;
      scan(videoEl.current, uris => {
        if (!bulkUpdate(uris)) navigate('/');
      });
    }).catch(error => {
      console.error(error);
    });

  return (
    <>
      <CustomHeader />
      <video 
        ref={videoEl}
        data-testid="cam"
      />
    </>
  );
}

function scan(el, onScan) {
  const barcodeCfg = {
    formats: ["qr_code"],
  };
  const barcodeDetector = new BarcodeDetector(barcodeCfg);

  barcodeDetector
    .detect(el)
    .then(uris => onScan(uris))
    .catch(err => console.error(err));
};
